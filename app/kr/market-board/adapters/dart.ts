import { marketBoardCacheTtl, readThroughCache } from "./cache";
import { createMockFallbackAdapter } from "./types";
import type { MarketBoardProviderPayload } from "./types";

const requiredEnv = ["DART_API_KEY"];

function getDartCredentials() {
  return {
    apiKey: process.env.DART_API_KEY
  };
}

async function loadDartDisclosures(): Promise<MarketBoardProviderPayload> {
  return readThroughCache("market-board:dart:disclosures", marketBoardCacheTtl.disclosure, async () => {
    const credentials = getDartCredentials();

    if (!credentials.apiKey) {
      return {};
    }

    return {};
  });
}

export const dartMarketBoardAdapter = createMockFallbackAdapter(
  "dart",
  "DART Open API",
  requiredEnv,
  { timeoutMs: 1800 }
);

dartMarketBoardAdapter.load = loadDartDisclosures;
