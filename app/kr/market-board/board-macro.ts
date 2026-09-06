/**
 * 매크로 카드 줄.
 *
 * 왼쪽에서 오른쪽으로 미국 방향, 그것이 국내에 닿는 자리, 나머지 세계, 그리고
 * 모든 것을 재는 가격 순입니다. 순서와 대체값이 한곳에 있어야 하는 이유는
 * marketCardOrder에 없는 id가 조용히 버려지기 때문입니다 -- 카드 네 개를 받아
 * 놓고 한 번도 그리지 못한 적이 있습니다.
 */

import type { MarketBoardData } from "./types";
import type { MarketSnapshot } from "./board-types";

// The macro row, read left to right: US direction first, then what it lands on
// at home, then the rest of the world, then the prices everything is measured
// against. Ids not listed here are dropped, which is how four new cards were
// fetched and never drawn.
export const marketCardOrder = [
  "nasdaq-future",
  "sp500-future",
  "dow-future",
  "phlx-sox",
  "kospi-day-future",
  "kospi200-future",
  "kospi-night-future",
  "kosdaq-night-future",
  "kosdaq150-future",
  "nikkei-future",
  "wti",
  "gold",
  "usd-krw",
  "us10y",
  "btc"
];

export const marketCardFallbacks: Record<string, Pick<MarketSnapshot, "label" | "market" | "instrumentType" | "symbol" | "note" | "source">> = {
  "nasdaq-future": { label: "NASDAQ 100 선물", market: "US", instrumentType: "future", symbol: "NQ=F", note: "E-mini NASDAQ 100 · 10분 지연", source: "market" },
  "dow-future": { label: "DOW 선물", market: "US", instrumentType: "future", symbol: "YM=F", note: "E-mini DOW 30 · 10분 지연", source: "market" },
  "nikkei-future": { label: "NIKKEI225 선물", market: "GLOBAL", instrumentType: "future", symbol: "NIY=F", note: "CME NIKKEI225 · 10분 지연", source: "market" },
  "kosdaq150-future": { label: "KOSDAQ150 선물", market: "KR", instrumentType: "future", symbol: "F-KQ150", note: "KIS 연결선물", source: "kis" },
  "kospi200-future": { label: "KOSPI200 선물", market: "KR", instrumentType: "future", symbol: "F-K200", note: "KIS 연결선물", source: "kis" },
  "sp500-future": { label: "S&P 500 선물", market: "US", instrumentType: "future", symbol: "ES=F", note: "E-mini S&P 500 · 10분 지연", source: "market" },
  "phlx-sox": { label: "반도체 ETF", market: "US", instrumentType: "index", symbol: "SOXX", note: "SOX 원지수에 선물이 없어 SOXX · 미국 시간외 반영", source: "market" },
  "kospi-day-future": { label: "KOSPI", market: "KR", instrumentType: "index", symbol: "KOSPI", note: "KIS 국내업종 현재지수", source: "kis" },
  "kospi-night-future": { label: "KOSPI200", market: "KR", instrumentType: "index", symbol: "KOSPI200", note: "KIS 국내업종 현재지수", source: "kis" },
  wti: { label: "WTI 선물", market: "GLOBAL", instrumentType: "commodity", symbol: "CL=F", note: "NYMEX WTI 원유 · 10분 지연", source: "market" },
  "kosdaq-night-future": { label: "KOSDAQ", market: "KR", instrumentType: "index", symbol: "KOSDAQ", note: "KIS 국내업종 현재지수", source: "kis" },
  "russell-future": { label: "RUSSELL 2000 선물", market: "US", instrumentType: "future", symbol: "RTY", note: "미국 중소형주 기준", source: "market" },
  gold: { label: "금 선물", market: "GLOBAL", instrumentType: "commodity", symbol: "GC=F", note: "COMEX 금 · 10분 지연", source: "market" },
  "usd-krw": { label: "원/달러 환율", market: "KR", instrumentType: "fx", symbol: "USD/KRW", note: "Yahoo USD/KRW 실시간", source: "market" },
  btc: { label: "BTC", market: "CRYPTO", instrumentType: "crypto", symbol: "BTC", note: "CoinGecko BTC/USD 24시간 변화", source: "market" },
  vix: { label: "VIX", market: "US", instrumentType: "index", symbol: "VIX", note: "위험 회피 참고지수", source: "market" },
  us10y: { label: "10Y 금리", market: "US", instrumentType: "rate", symbol: "US10Y", note: "U.S. Treasury Daily Yield Curve", source: "market" }
};

export function marketChangeLabel(item?: MarketBoardData["macroSnapshot"][number]) {
  if (!item) return "확인 중";

  return item.changeRate ?? item.change ?? item.value;
}

export function fallbackMarketCard(id: string, timestamp?: string): MarketSnapshot {
  const fallback = marketCardFallbacks[id] ?? marketCardFallbacks["nasdaq-future"];

  return {
    id,
    ...fallback,
    value: "대기",
    tone: "flat",
    timestamp: timestamp ?? new Date().toISOString()
  };
}

export function isWaitingMarketCard(item: MarketSnapshot) {
  return item.value === "대기" || item.value === "확인 대기";
}

export function isLongMarketValue(item: MarketSnapshot) {
  return item.value.length >= 7;
}

export function intradayParts(value?: string) {
  const text = value ?? "";
  const [pricePart, changePart] = text.split(/\s*·\s*/);

  return {
    price: pricePart?.trim() || text,
    change: changePart?.trim() || ""
  };
}
