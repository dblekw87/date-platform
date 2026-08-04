import { marketBoardCacheTtl, readThroughCache } from "./cache";
import { fetchJson } from "./http";
import { normalizeNewsFeed, type RawNewsFeed } from "./news-normalizer";
import { recordNewsHeadlineEvents, recordNewsHeadlines } from "./news-state";
import { createMockFallbackAdapter } from "./types";
import type { MarketBoardProviderPayload } from "./types";

const requiredEnv = ["MARKET_BOARD_NEWS_FEED_URL", "NAVER_API_HUB_KEY", "NEWSAPI_KEY", "FINNHUB_API_KEY", "BENZINGA_API_KEY"];

function getNewsCredentials() {
  return {
    feedUrl: process.env.MARKET_BOARD_NEWS_FEED_URL,
    naverApiHubKey: process.env.NAVER_API_HUB_KEY,
    newsApiKey: process.env.NEWSAPI_KEY,
    finnhubApiKey: process.env.FINNHUB_API_KEY,
    benzingaApiKey: process.env.BENZINGA_API_KEY
  };
}

async function loadNewsHeadlines(): Promise<MarketBoardProviderPayload> {
  return readThroughCache("market-board:news:headlines", marketBoardCacheTtl.news, async () => {
    const credentials = getNewsCredentials();

    if (!credentials.feedUrl && !credentials.naverApiHubKey && !credentials.newsApiKey && !credentials.finnhubApiKey && !credentials.benzingaApiKey) {
      return {};
    }

    if (!credentials.feedUrl) {
      return {};
    }

    const feed = await fetchJson<RawNewsFeed>(credentials.feedUrl, { timeoutMs: 1800 });
    const headlineFlow = normalizeNewsFeed(feed);
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
