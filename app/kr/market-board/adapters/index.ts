import { dartMarketBoardAdapter } from "./dart";
import { kisMarketBoardAdapter } from "./kis";
import { krxMarketBoardAdapter } from "./krx";
import { newsMarketBoardAdapter } from "./news";
import { secMarketBoardAdapter } from "./sec";
import { tossMarketBoardAdapter } from "./toss";
import type { MarketBoardProviderAdapter } from "./types";

export const marketBoardProviderAdapters: MarketBoardProviderAdapter[] = [
  tossMarketBoardAdapter,
  kisMarketBoardAdapter,
  krxMarketBoardAdapter,
  dartMarketBoardAdapter,
  secMarketBoardAdapter,
  newsMarketBoardAdapter
];

export type { MarketBoardProviderAdapter, MarketBoardProviderPayload, ProviderId } from "./types";
