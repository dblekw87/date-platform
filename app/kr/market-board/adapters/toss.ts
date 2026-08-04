import { marketBoardCacheTtl, readThroughCache } from "./cache";
import { createMockFallbackAdapter } from "./types";
import type { MarketBoardProviderPayload } from "./types";

const requiredEnv = ["TOSS_INVEST_CLIENT_ID", "TOSS_INVEST_CLIENT_SECRET"];

function getTossCredentials() {
  return {
    clientId: process.env.TOSS_INVEST_CLIENT_ID,
    clientSecret: process.env.TOSS_INVEST_CLIENT_SECRET
  };
}

async function loadTossMarketData(): Promise<MarketBoardProviderPayload> {
  return readThroughCache("market-board:toss:market", marketBoardCacheTtl.market, async () => {
    const credentials = getTossCredentials();

    if (!credentials.clientId || !credentials.clientSecret) {
      return {};
    }

    return {};
  });
}

export const tossMarketBoardAdapter = createMockFallbackAdapter(
  "toss",
  "토스증권 Open API",
  requiredEnv,
  { timeoutMs: 1800 }
);

tossMarketBoardAdapter.load = loadTossMarketData;
