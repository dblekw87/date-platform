import { marketBoardCacheTtl, readThroughCache } from "./cache";
import { createMockFallbackAdapter } from "./types";
import type { MarketBoardProviderPayload } from "./types";

const requiredEnv = ["KRX_API_KEY"];

function getKrxCredentials() {
  return {
    apiKey: process.env.KRX_API_KEY
  };
}

async function loadKrxMarketData(): Promise<MarketBoardProviderPayload> {
  return readThroughCache("market-board:krx:market", marketBoardCacheTtl.market, async () => {
    const credentials = getKrxCredentials();

    if (!credentials.apiKey) {
      return {};
    }

    return {};
  });
}

export const krxMarketBoardAdapter = createMockFallbackAdapter(
  "krx",
  "KRX Open API / KIND",
  requiredEnv,
  { timeoutMs: 1800 }
);

krxMarketBoardAdapter.load = loadKrxMarketData;
