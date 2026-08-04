import { marketBoardCacheTtl, readThroughCache } from "./cache";
import { createMockFallbackAdapter } from "./types";
import type { MarketBoardProviderPayload } from "./types";

const requiredEnv = ["KIS_APP_KEY", "KIS_APP_SECRET"];

function getKisCredentials() {
  return {
    appKey: process.env.KIS_APP_KEY,
    appSecret: process.env.KIS_APP_SECRET,
    htsId: process.env.KIS_HTS_ID
  };
}

async function loadKisMarketData(): Promise<MarketBoardProviderPayload> {
  return readThroughCache("market-board:kis:market", marketBoardCacheTtl.market, async () => {
    const credentials = getKisCredentials();

    if (!credentials.appKey || !credentials.appSecret) {
      return {};
    }

    return {};
  });
}

export const kisMarketBoardAdapter = createMockFallbackAdapter(
  "kis",
  "한국투자증권 Open API",
  requiredEnv,
  { timeoutMs: 1800 }
);

kisMarketBoardAdapter.load = loadKisMarketData;
