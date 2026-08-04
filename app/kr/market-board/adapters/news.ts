import { marketBoardCacheTtl, readThroughCache } from "./cache";
import { fetchJson } from "./http";
import { dedupeNews, normalizeNewsFeed, type RawNewsFeed, type RawNewsItem } from "./news-normalizer";
import { recordNewsHeadlineEvents, recordNewsHeadlines } from "./news-state";
import { createMockFallbackAdapter } from "./types";
import type { MarketBoardProviderPayload } from "./types";

const requiredEnv = ["MARKET_BOARD_NEWS_FEED_URL", "NAVER_API_HUB_KEY", "NEWSAPI_KEY", "FINNHUB_API_KEY", "BENZINGA_API_KEY"];
const naverNewsQueries = ["반도체", "AI 인프라", "전력설비", "금리", "환율"];
const globalNewsQueries = ["semiconductor", "AI infrastructure", "interest rates", "market futures"];

function getNewsCredentials() {
  return {
    feedUrl: process.env.MARKET_BOARD_NEWS_FEED_URL,
    naverApiHubKeyId: process.env.NAVER_API_HUB_KEY_ID,
    naverApiHubKey: process.env.NAVER_API_HUB_KEY,
    newsApiKey: process.env.NEWSAPI_KEY,
    finnhubApiKey: process.env.FINNHUB_API_KEY,
    benzingaApiKey: process.env.BENZINGA_API_KEY
  };
}

async function settleFeeds(loaders: Array<() => Promise<RawNewsFeed>>) {
  const results = await Promise.allSettled(loaders.map((loader) => loader()));

  return results.flatMap((result) => {
    if (result.status !== "fulfilled") return [];

    return normalizeNewsFeed(result.value);
  });
}

function buildQueryUrl(baseUrl: string, params: Record<string, string | number | undefined>) {
  const url = new URL(baseUrl);

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== "") {
      url.searchParams.set(key, String(value));
    }
  });

  return url.toString();
}

function loadNaverNewsFeed(query: string, credentials: ReturnType<typeof getNewsCredentials>) {
  return async (): Promise<RawNewsFeed> => {
    if (!credentials.naverApiHubKeyId || !credentials.naverApiHubKey) return [];

    const url = buildQueryUrl("https://naverapihub.apigw.ntruss.com/search/v1/news", {
      query,
      display: 20,
      start: 1,
      sort: "date",
      format: "json"
    });
    const response = await fetchJson<{ items?: Array<RawNewsItem & { description?: string }> }>(url, {
      timeoutMs: 1800,
      headers: {
        "X-NCP-APIGW-API-KEY-ID": credentials.naverApiHubKeyId,
        "X-NCP-APIGW-API-KEY": credentials.naverApiHubKey
      }
    });

    return {
      items: (response.items ?? []).map((item) => ({
        ...item,
        source: item.source ?? "NAVER",
        provider: "NAVER",
        category: query,
        originalUrl: item.originallink || item.link,
        text: item.title || item.description
      }))
    };
  };
}

function loadNewsApiFeed(query: string, credentials: ReturnType<typeof getNewsCredentials>) {
  return async (): Promise<RawNewsFeed> => {
    if (!credentials.newsApiKey) return [];

    return await fetchJson<RawNewsFeed>(buildQueryUrl("https://newsapi.org/v2/everything", {
      q: query,
      language: "en",
      sortBy: "publishedAt",
      pageSize: 20,
      apiKey: credentials.newsApiKey
    }), { timeoutMs: 1800 });
  };
}

function loadFinnhubFeed(category: string, credentials: ReturnType<typeof getNewsCredentials>) {
  return async (): Promise<RawNewsFeed> => {
    if (!credentials.finnhubApiKey) return [];

    return await fetchJson<RawNewsItem[]>(buildQueryUrl("https://finnhub.io/api/v1/news", {
      category,
      token: credentials.finnhubApiKey
    }), { timeoutMs: 1800 });
  };
}

function loadBenzingaFeed(credentials: ReturnType<typeof getNewsCredentials>) {
  return async (): Promise<RawNewsFeed> => {
    if (!credentials.benzingaApiKey) return [];

    const response = await fetchJson<Array<RawNewsItem & { author?: string; created?: string; updated?: string }>>(
      buildQueryUrl("https://api.benzinga.com/api/v2/news", {
        pageSize: 40,
        displayOutput: "headline"
      }),
      {
        timeoutMs: 1800,
        headers: {
          Authorization: `token ${credentials.benzingaApiKey}`,
          Accept: "application/json"
        }
      }
    );

    return response.map((item) => ({
      ...item,
      provider: "Benzinga",
      source: item.source ?? item.author ?? "Benzinga",
      publishedAt: item.publishedAt ?? item.created ?? item.updated,
      originalUrl: item.originalUrl ?? item.url
    }));
  };
}

async function loadNewsHeadlines(): Promise<MarketBoardProviderPayload> {
  return readThroughCache("market-board:news:headlines", marketBoardCacheTtl.news, async () => {
    const credentials = getNewsCredentials();

    if (!credentials.feedUrl && !credentials.naverApiHubKey && !credentials.newsApiKey && !credentials.finnhubApiKey && !credentials.benzingaApiKey) {
      return {};
    }

    const loaders: Array<() => Promise<RawNewsFeed>> = [];

    if (credentials.feedUrl) {
      loaders.push(() => fetchJson<RawNewsFeed>(credentials.feedUrl as string, { timeoutMs: 1800 }));
    }

    naverNewsQueries.forEach((query) => loaders.push(loadNaverNewsFeed(query, credentials)));
    globalNewsQueries.forEach((query) => loaders.push(loadNewsApiFeed(query, credentials)));
    loaders.push(loadFinnhubFeed("general", credentials));
    loaders.push(loadFinnhubFeed("forex", credentials));
    loaders.push(loadBenzingaFeed(credentials));

    const headlineFlow = dedupeNews(await settleFeeds(loaders))
      .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
      .slice(0, 80);
    const newHeadlineIds = await recordNewsHeadlines(headlineFlow.map((item) => item.id));
    const detectedAt = new Date().toISOString();
    const headlineFlowWithState = headlineFlow.map((item) => ({
      ...item,
      isNew: newHeadlineIds.has(item.id)
    }));

    await recordNewsHeadlineEvents(headlineFlowWithState.filter((item) => item.isNew).map((item) => ({
      id: item.id,
      source: item.source,
      label: item.label,
      text: item.text,
      publishedAt: item.publishedAt,
      originalUrl: item.originalUrl,
      detectedAt
    })));

    return headlineFlowWithState.length > 0 ? { headlineFlow: headlineFlowWithState } : {};
  });
}

export const newsMarketBoardAdapter = createMockFallbackAdapter(
  "news",
  "뉴스 공급자",
  requiredEnv,
  { credentialStrategy: "any", timeoutMs: 1800 }
);

newsMarketBoardAdapter.load = loadNewsHeadlines;
