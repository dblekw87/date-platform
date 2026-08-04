import { marketBoardCacheTtl, readThroughCache } from "./cache";
import { fetchJson } from "./http";
import { dedupeNews, normalizeNewsFeed, type RawNewsFeed, type RawNewsItem } from "./news-normalizer";
import { recordNewsHeadlineEvents, recordNewsHeadlines } from "./news-state";
import { createMockFallbackAdapter } from "./types";
import type { MarketBoardProviderPayload } from "./types";

const requiredEnv = ["MARKET_BOARD_NEWS_FEED_URL", "NAVER_API_HUB_KEY", "NEWSAPI_KEY", "FINNHUB_API_KEY", "BENZINGA_API_KEY"];
const naverNewsQueries = ["반도체", "AI 인프라", "전력설비", "금리", "환율"];
const koreanNewsQueries = ["반도체", "AI 인프라", "전력설비", "금리", "환율"];
const globalNewsQueries = ["semiconductor", "AI infrastructure", "interest rates", "market futures"];

function getNewsCredentials() {
  return {
    feedUrl: process.env.MARKET_BOARD_NEWS_FEED_URL,
    naverApiHubKeyId: process.env.NAVER_API_HUB_KEY_ID,
    naverApiHubKey: process.env.NAVER_API_HUB_KEY,
    newsApiKey: process.env.NEWSAPI_KEY,
    finnhubApiKey: process.env.FINNHUB_API_KEY,
    benzingaApiKey: process.env.BENZINGA_API_KEY,
    papagoClientId: process.env.NAVER_PAPAGO_CLIENT_ID,
    papagoClientSecret: process.env.NAVER_PAPAGO_CLIENT_SECRET
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
        region: "KR",
        category: query,
        originalUrl: item.originallink || item.link,
        text: item.title || item.description
      }))
    };
  };
}

function loadNewsApiFeed(query: string, credentials: ReturnType<typeof getNewsCredentials>, options: { language: "en" | "ko"; region: "US" | "KR" }) {
  return async (): Promise<RawNewsFeed> => {
    if (!credentials.newsApiKey) return [];

    const response = await fetchJson<RawNewsFeed>(buildQueryUrl("https://newsapi.org/v2/everything", {
      q: query,
      language: options.language,
      sortBy: "publishedAt",
      pageSize: 20,
      apiKey: credentials.newsApiKey
    }), { timeoutMs: 1800 });

    return Array.isArray(response) ? response.map((item) => ({ ...item, region: options.region })) : {
      ...response,
      articles: response.articles?.map((item) => ({ ...item, provider: "NewsAPI", region: options.region, category: query }))
    };
  };
}

function loadFinnhubFeed(category: string, credentials: ReturnType<typeof getNewsCredentials>) {
  return async (): Promise<RawNewsFeed> => {
    if (!credentials.finnhubApiKey) return [];

    const response = await fetchJson<RawNewsItem[]>(buildQueryUrl("https://finnhub.io/api/v1/news", {
      category,
      token: credentials.finnhubApiKey
    }), { timeoutMs: 1800 });

    return response.map((item) => ({ ...item, provider: "Finnhub", region: "US", category }));
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
      region: "US",
      source: item.source ?? item.author ?? "Benzinga",
      publishedAt: item.publishedAt ?? item.created ?? item.updated,
      originalUrl: item.originalUrl ?? item.url
    }));
  };
}

function shouldTranslateHeadline(item: { region: string; text: string }) {
  return item.region === "US" && !/[가-힣]/.test(item.text);
}

async function translateHeadline(text: string, credentials: ReturnType<typeof getNewsCredentials>) {
  if (!credentials.papagoClientId || !credentials.papagoClientSecret) return undefined;

  const response = await fetchJson<{ message?: { result?: { translatedText?: string } } }>("https://openapi.naver.com/v1/papago/n2mt", {
    method: "POST",
    timeoutMs: 2500,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
      "X-Naver-Client-Id": credentials.papagoClientId,
      "X-Naver-Client-Secret": credentials.papagoClientSecret
    },
    body: new URLSearchParams({
      source: "en",
      target: "ko",
      text
    })
  });

  return response.message?.result?.translatedText;
}

async function translateUsHeadlines<T extends Array<{ region: string; text: string; originalText?: string }>>(items: T, credentials: ReturnType<typeof getNewsCredentials>) {
  if (!credentials.papagoClientId || !credentials.papagoClientSecret) return items;

  const translated = await Promise.allSettled(items.map(async (item) => {
    if (!shouldTranslateHeadline(item)) return item;

    const translatedText = await translateHeadline(item.text, credentials);

    return translatedText ? { ...item, originalText: item.text, text: translatedText } : item;
  }));

  return translated.map((result, index) => result.status === "fulfilled" ? result.value : items[index]) as T;
}

function balanceHeadlinesByRegion<T extends Array<{ region: string; publishedAt: string }>>(items: T) {
  const sorted = [...items].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
  const krHeadlines = sorted.filter((item) => item.region === "KR").slice(0, 30);
  const usHeadlines = sorted.filter((item) => item.region === "US").slice(0, 40);
  const globalHeadlines = sorted.filter((item) => item.region === "GLOBAL").slice(0, 10);

  return [...krHeadlines, ...usHeadlines, ...globalHeadlines]
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt)) as T;
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
    koreanNewsQueries.forEach((query) => loaders.push(loadNewsApiFeed(query, credentials, { language: "ko", region: "KR" })));
    globalNewsQueries.forEach((query) => loaders.push(loadNewsApiFeed(query, credentials, { language: "en", region: "US" })));
    loaders.push(loadFinnhubFeed("general", credentials));
    loaders.push(loadFinnhubFeed("forex", credentials));
    loaders.push(loadBenzingaFeed(credentials));

    const headlineFlow = await translateUsHeadlines(balanceHeadlinesByRegion(dedupeNews(await settleFeeds(loaders))), credentials);
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
