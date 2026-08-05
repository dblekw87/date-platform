import { marketBoardCacheTtl, readThroughCache } from "./cache";
import { fetchJson } from "./http";
import { createMockFallbackAdapter } from "./types";
import type { MarketBoardProviderPayload } from "./types";
import type { LeadingStockDto, MarketBriefDto, MarketSnapshotDto, Tone } from "../types";

const requiredEnv = ["TOSS_INVEST_CLIENT_ID", "TOSS_INVEST_CLIENT_SECRET"];
const tossBaseUrl = "https://openapi.tossinvest.com";

type TossTokenResponse = {
  access_token?: string;
  expires_in?: number;
  token_type?: string;
};

type TossApiResponse<T> = {
  result?: T;
};

type TossRankingType = "MARKET_TRADING_AMOUNT" | "MARKET_TRADING_VOLUME" | "TOP_GAINERS";
type TossMarketCountry = "KR" | "US";

type TossRankingItem = {
  rank?: number;
  symbol?: string;
  rankingType?: TossRankingType;
  rankingTypes?: TossRankingType[];
  rankingRanks?: Partial<Record<TossRankingType, number>>;
  currency?: "KRW" | "USD";
  price?: {
    lastPrice?: string;
    basePrice?: string;
    changeRate?: string | null;
  };
  tradingVolume?: string;
  tradingAmount?: string;
};

type TossRankingResponse = {
  rankedAt?: string | null;
  rankings?: TossRankingItem[];
};

type TossStockInfo = {
  symbol?: string;
  name?: string;
  englishName?: string;
  market?: string;
  securityType?: string;
  isCommonShare?: boolean;
  status?: string;
  koreanMarketDetail?: {
    liquidationTrading?: boolean;
    nxtSupported?: boolean;
    krxTradingSuspended?: boolean;
    nxtTradingSuspended?: boolean | null;
  } | null;
};

type TossPriceLimitResponse = {
  upperLimitPrice?: string | null;
  lowerLimitPrice?: string | null;
};

type TossExchangeRateResponse = {
  rate?: string;
  midRate?: string;
  basisPoint?: string;
  rateChangeType?: "UP" | "DOWN" | "FLAT";
  validFrom?: string;
};

type TossMarketIndicatorPrice = {
  symbol?: string;
  timestamp?: string | null;
  lastPrice?: string;
};

type IntradayInsight = {
  burst: string;
  intraday: string;
};

type TradeInsight = {
  detail: string;
};

type ThemeScore = {
  theme: string;
  turnover: number;
  count: number;
  leaders: string[];
};

let tokenCache: { accessToken: string; expiresAt: number } | undefined;

function getTossCredentials() {
  return {
    clientId: process.env.TOSS_INVEST_CLIENT_ID,
    clientSecret: process.env.TOSS_INVEST_CLIENT_SECRET
  };
}

async function getTossAccessToken(credentials: ReturnType<typeof getTossCredentials>) {
  const now = Date.now();

  if (tokenCache && tokenCache.expiresAt > now + 60_000) {
    return tokenCache.accessToken;
  }

  const body = new URLSearchParams({
    grant_type: "client_credentials",
    client_id: credentials.clientId ?? "",
    client_secret: credentials.clientSecret ?? ""
  });
  const response = await fetchJson<TossTokenResponse>(`${tossBaseUrl}/oauth2/token`, {
    method: "POST",
    timeoutMs: 5000,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "application/json"
    },
    body
  });

  if (!response.access_token) {
    throw new Error("Toss token missing");
  }

  tokenCache = {
    accessToken: response.access_token,
    expiresAt: now + Math.max((response.expires_in ?? 86_400) - 300, 60) * 1000
  };

  return tokenCache.accessToken;
}

function tossUrl(path: string, params?: Record<string, string>) {
  const url = new URL(path, tossBaseUrl);

  Object.entries(params ?? {}).forEach(([key, value]) => {
    url.searchParams.set(key, value);
  });

  return url.toString();
}

async function tossGet<T>(path: string, token: string, params?: Record<string, string>) {
  return fetchJson<TossApiResponse<T>>(tossUrl(path, params), {
    timeoutMs: 5500,
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json"
    }
  });
}

function parseDecimal(value?: string | null) {
  const numeric = Number(value);

  return Number.isFinite(numeric) ? numeric : 0;
}

function formatSignedPercentFromRatio(value?: string | null) {
  const percent = parseDecimal(value) * 100;

  return `${percent > 0 ? "+" : ""}${percent.toFixed(2)}%`;
}

function formatPrice(value?: string, currency?: string) {
  const numeric = parseDecimal(value);

  if (!numeric) return "확인 중";

  const formatted = numeric.toLocaleString("ko-KR", {
    maximumFractionDigits: currency === "USD" ? 2 : 0,
    minimumFractionDigits: currency === "USD" ? 2 : 0
  });

  return currency === "USD" ? `$${formatted}` : `${formatted}원`;
}

function formatTradingAmount(value?: string, currency?: string) {
  const numeric = parseDecimal(value);

  if (!numeric) return "거래대금 확인 중";

  if (currency === "USD") {
    if (numeric >= 1_000_000_000) return `$${(numeric / 1_000_000_000).toFixed(1)}B`;
    if (numeric >= 1_000_000) return `$${Math.round(numeric / 1_000_000).toLocaleString("ko-KR")}M`;

    return `$${Math.round(numeric).toLocaleString("ko-KR")}`;
  }

  const eok = numeric / 100_000_000;

  if (eok >= 10_000) return `${(eok / 10_000).toFixed(1)}조`;
  if (eok >= 100) return `${Math.round(eok).toLocaleString("ko-KR")}억`;

  return `${eok.toFixed(1)}억`;
}

function formatTradingVolume(value?: string) {
  const numeric = parseDecimal(value);

  if (!numeric) return "거래량 확인 중";
  if (numeric >= 1_000_000) return `${(numeric / 1_000_000).toFixed(1)}M주`;

  return `${Math.round(numeric).toLocaleString("ko-KR")}주`;
}

function isEtfLikeSecurity(stock?: TossStockInfo, name = "") {
  return stock?.securityType === "ETF" ||
    stock?.securityType === "ETN" ||
    /(^|\s)(KODEX|TIGER|ACE|RISE|SOL|PLUS|HANARO|KOSEF|KBSTAR|ARIRANG|TIMEFOLIO|히어로즈|마이티|HK)|ETF|ETN|인버스|레버리지|채권|회사채|국고채|액티브|Nifty|TOP10/i.test(name);
}

function isLikelyNonOperatingEquityName(name: string) {
  return /스팩|SPAC|우선주|우B|우C/i.test(name);
}

const symbolThemeMap: Record<string, string> = {
  "000660": "반도체",
  "005930": "반도체",
  "009150": "MLCC·전자부품",
  "001820": "MLCC·전자부품",
  "042700": "반도체",
  "000990": "반도체",
  "058470": "반도체",
  "036930": "반도체",
  "108860": "AI·소프트웨어",
  "011070": "전자부품·전장",
  "950160": "바이오",
  "034020": "원전",
  "298040": "전력기기",
  "010060": "화학·에너지",
  "336260": "수소·연료전지",
  "402340": "인터넷·플랫폼",
  AMD: "반도체",
  INTC: "반도체",
  MU: "반도체",
  NVDA: "반도체",
  SKHY: "반도체",
  SNDK: "반도체",
  TSM: "반도체",
  AVGO: "반도체",
  AXTI: "반도체",
  WDC: "반도체",
  MRVL: "광통신·네트워크",
  COHR: "광통신·네트워크",
  MSFT: "AI·소프트웨어",
  GOOGL: "인터넷·플랫폼",
  GOOG: "인터넷·플랫폼",
  PLTR: "AI·방산",
  NBIS: "AI·소프트웨어",
  APP: "AI·소프트웨어",
  APPS: "AI·소프트웨어",
  TSLA: "자동차·전장",
  GEV: "전력기기",
  VST: "전력기기",
  CEG: "원전",
  PLUG: "수소·연료전지",
  BE: "수소·연료전지",
  SPCX: "항공우주"
};

function classifyTheme(symbol: string, name: string) {
  const text = `${symbol} ${name}`;
  const mappedTheme = symbolThemeMap[symbol.toUpperCase()];

  if (isEtfLikeSecurity(undefined, name)) return "ETF";
  if (mappedTheme) return mappedTheme;

  if (/반도체|메모리|비메모리|파운드리|hbm|ddr|dram|nand|wafer|웨이퍼|패키징|후공정|소부장|semiconductor|\bchips?\b/i.test(text)) return "반도체";
  if (/2차전지|배터리|전해액|양극재|음극재|분리막|리튬|니켈|battery|lithium|cathode|anode/i.test(text)) return "2차전지";
  if (/수소|연료전지|hydrogen|fuel cell/i.test(text)) return "수소·연료전지";
  if (/신재생|재생에너지|태양광|풍력|해상풍력|renewable|solar|wind/i.test(text)) return "재생에너지";
  if (/원전|원자력|nuclear|uranium|우라늄|smr/i.test(text)) return "원전";
  if (/전력기기|전력|변압기|송전|배전|전선|초고압|전기설비|grid|transformer|power equipment|utility/i.test(text)) return "전력기기";
  if (/바이오|제약|신약|임상|항암|진단|의료기기|bio|biotech|pharma|medical|diagnostics|therapeutics|fda/i.test(text)) return "바이오";
  if (/ai defense|defense ai|military ai|국방 ai|방산 ai/i.test(text)) return "AI·방산";
  if (/ai|인공지능|소프트웨어|클라우드|데이터센터|보안|cyber|software|cloud|data center|saas/i.test(text)) return "AI·소프트웨어";
  if (/로봇|자동화|robot|automation/i.test(text)) return "로봇";
  if (/항공우주|우주|위성|로켓|발사체|space|spacex|aerospace|satellite|rocket|launch/i.test(text)) return "항공우주";
  if (/조선|방산|함정|미사일|ship|shipbuilding|defense|missile/i.test(text)) return "조선·방산";
  if (/mlcc|적층세라믹|콘덴서|커패시터|capacitor|ceramic capacitor/i.test(text)) return "MLCC·전자부품";
  if (/카메라모듈|기판|패키지기판|광학솔루션|전자부품|전장부품|camera module|substrate|optical solution|electronics component/i.test(text)) return "전자부품·전장";
  if (/자동차|전기차|자율주행|전장|타이어|vehicle|vehicles|ev\b|autonomous|mobility|auto parts/i.test(text)) return "자동차·전장";
  if (/광통신|광모듈|광부품|광네트워크|optical|photonics|coherent|networking|data infrastructure/i.test(text)) return "광통신·네트워크";
  if (/통신|5g|6g|네트워크|rf|telecom|network|wireless/i.test(text)) return "통신장비";
  if (/인터넷|플랫폼|커머스|웹툰|핀테크|검색|portal|platform|commerce|fintech/i.test(text)) return "인터넷·플랫폼";
  if (/게임|엔터|음원|콘텐츠|미디어|드라마|웹소설|game|gaming|entertainment|media|content/i.test(text)) return "게임·엔터";
  if (/화장품|미용|의류|패션|소비재|cosmetic|beauty|fashion|consumer/i.test(text)) return "소비재";
  if (/은행|보험|증권|금융|brokerage|bank|insurance|financial/i.test(text)) return "금융";
  if (/건설|건자재|시멘트|인프라|철도|construction|cement|infrastructure/i.test(text)) return "건설·인프라";
  if (/철강|비철|구리|알루미늄|소재|steel|copper|aluminum|materials/i.test(text)) return "소재";
  if (/화학|정유|석유|가스|lng|lpg|chemical|oil|crude|gas|refining/i.test(text)) return "화학·에너지";
  if (/해운|항공|물류|운송|shipping|airline|logistics|transport/i.test(text)) return "운송";

  return "개별 이슈";
}

function isSupportedSecurityType(stock?: TossStockInfo) {
  if (!stock?.securityType) return true;

  return ["STOCK", "FOREIGN_STOCK", "DEPOSITARY_RECEIPT", "REIT", "ETF", "ETN"].includes(stock.securityType);
}

function toneFromBasisPoint(value?: string): Tone {
  const numeric = parseDecimal(value);

  if (!numeric) return "flat";

  return numeric > 0 ? "up" : "down";
}

function mergeRankingItems(primary: TossRankingItem[], secondary: TossRankingItem[]) {
  const bySymbol = new Map<string, TossRankingItem>();
  const normalizeRankingTypes = (item: TossRankingItem) => item.rankingTypes ?? (item.rankingType ? [item.rankingType] : []);
  const normalizeRankingRanks = (item: TossRankingItem) => ({
    ...(item.rankingType && item.rank ? { [item.rankingType]: item.rank } : {}),
    ...(item.rankingRanks ?? {})
  });
  const mergeItem = (current: TossRankingItem, next: TossRankingItem): TossRankingItem => {
    const rankingTypes = [...new Set([...normalizeRankingTypes(current), ...normalizeRankingTypes(next)])];
    const rankingRanks = {
      ...normalizeRankingRanks(current),
      ...normalizeRankingRanks(next)
    };

    return {
      ...current,
      ...next,
      rank: current.rank,
      rankingType: rankingTypes.includes("MARKET_TRADING_AMOUNT") ? "MARKET_TRADING_AMOUNT" : current.rankingType ?? next.rankingType,
      rankingTypes,
      rankingRanks,
      currency: current.currency ?? next.currency,
      price: next.price ?? current.price,
      tradingAmount: parseDecimal(next.tradingAmount) > 0 ? next.tradingAmount : current.tradingAmount,
      tradingVolume: parseDecimal(next.tradingVolume) > 0 ? next.tradingVolume : current.tradingVolume
    };
  };

  primary.forEach((item) => {
    if (item.symbol) bySymbol.set(item.symbol, item);
  });
  secondary.forEach((item) => {
    if (!item.symbol) return;

    const current = bySymbol.get(item.symbol);

    bySymbol.set(item.symbol, current ? mergeItem(current, item) : item);
  });

  return [...bySymbol.values()];
}

async function loadRanking(token: string, marketCountry: TossMarketCountry, type: TossRankingType, duration: "realtime" | "1d", count = 40) {
  const response = await tossGet<TossRankingResponse>("/api/v1/rankings", token, {
    type,
    marketCountry,
    duration,
    excludeInvestmentCaution: "false",
    count: String(count)
  });

  const result = response.result ?? { rankings: [] };

  return {
    ...result,
    rankings: (result.rankings ?? []).map((item) => ({
      ...item,
      rankingType: type,
      rankingTypes: [type],
      rankingRanks: item.rank ? { [type]: item.rank } : {}
    }))
  };
}

async function loadRankingOrEmpty(token: string, marketCountry: TossMarketCountry, type: TossRankingType, duration: "realtime" | "1d", count = 40) {
  try {
    return await loadRanking(token, marketCountry, type, duration, count);
  } catch {
    if (count > 30) {
      try {
        return await loadRanking(token, marketCountry, type, duration, 30);
      } catch {
        return { rankedAt: null, rankings: [] };
      }
    }

    return { rankedAt: null, rankings: [] };
  }
}

async function loadStocks(token: string, symbols: string[]) {
  if (symbols.length === 0) return new Map<string, TossStockInfo>();

  const response = await tossGet<TossStockInfo[]>("/api/v1/stocks", token, {
    symbols: symbols.slice(0, 200).join(",")
  });
  const bySymbol = new Map<string, TossStockInfo>();

  (response.result ?? []).forEach((stock) => {
    if (stock.symbol) bySymbol.set(stock.symbol, stock);
  });

  return bySymbol;
}

async function loadPriceLimits(token: string, symbols: string[]) {
  const entries = await Promise.allSettled(symbols.slice(0, 8).map(async (symbol) => {
    const response = await tossGet<TossPriceLimitResponse>("/api/v1/price-limits", token, { symbol });

    return [symbol, response.result] as const;
  }));
  const bySymbol = new Map<string, TossPriceLimitResponse>();

  entries.forEach((entry) => {
    if (entry.status === "fulfilled" && entry.value[1]) {
      bySymbol.set(entry.value[0], entry.value[1]);
    }
  });

  return bySymbol;
}

function isLimitUp(item: TossRankingItem, limit?: TossPriceLimitResponse) {
  const lastPrice = parseDecimal(item.price?.lastPrice);
  const upperLimitPrice = parseDecimal(limit?.upperLimitPrice);

  return upperLimitPrice > 0 && lastPrice >= upperLimitPrice;
}

function hasRankingType(item: TossRankingItem, type: TossRankingType) {
  return (item.rankingTypes ?? (item.rankingType ? [item.rankingType] : [])).includes(type);
}

function rankingRank(item: TossRankingItem, type: TossRankingType) {
  return item.rankingRanks?.[type] ?? (item.rankingType === type ? item.rank : undefined);
}

function rankCandidateScore(item: TossRankingItem, limit?: TossPriceLimitResponse) {
  const amount = parseDecimal(item.tradingAmount);
  const volume = parseDecimal(item.tradingVolume);
  const changeRate = parseDecimal(item.price?.changeRate) * 100;
  const amountScore = Math.log10(Math.max(amount, 1));
  const volumeScore = Math.log10(Math.max(volume, 1));
  const limitScore = isLimitUp(item, limit) ? 10_000 : 0;
  const turnoverRank = rankingRank(item, "MARKET_TRADING_AMOUNT");
  const gainerRank = rankingRank(item, "TOP_GAINERS");
  const volumeRank = rankingRank(item, "MARKET_TRADING_VOLUME");
  const turnoverRankScore = turnoverRank ? 5_500 - Math.min(turnoverRank, 50) * 35 : 0;
  const gainerScore = gainerRank ? 1_500 - Math.min(gainerRank, 50) * 18 : 0;
  const volumeRankScore = volumeRank ? 1_800 - Math.min(volumeRank, 50) * 16 : 0;
  const extremeMoveScore = changeRate >= 100 ? 3_000 : changeRate >= 50 ? 1_500 : changeRate >= 20 ? 600 : 0;

  return limitScore + turnoverRankScore + gainerScore + volumeRankScore + extremeMoveScore + amountScore * 22 + volumeScore * 4 + Math.max(changeRate, 0) * 5;
}

function selectLeaderCandidates(
  items: TossRankingItem[],
  priceLimits: Map<string, TossPriceLimitResponse>,
  count: number
) {
  const bySymbol = new Map<string, TossRankingItem>();
  const add = (item: TossRankingItem) => {
    if (item.symbol && !bySymbol.has(item.symbol)) bySymbol.set(item.symbol, item);
  };

  [...items]
    .sort((left, right) =>
      rankCandidateScore(right, priceLimits.get(right.symbol ?? "")) -
      rankCandidateScore(left, priceLimits.get(left.symbol ?? ""))
    )
    .slice(0, count)
    .forEach(add);
  items
    .filter((item) => hasRankingType(item, "TOP_GAINERS"))
    .sort((left, right) => (rankingRank(left, "TOP_GAINERS") ?? 999) - (rankingRank(right, "TOP_GAINERS") ?? 999))
    .slice(0, 30)
    .forEach(add);
  items
    .filter((item) => hasRankingType(item, "MARKET_TRADING_AMOUNT"))
    .sort((left, right) => (rankingRank(left, "MARKET_TRADING_AMOUNT") ?? 999) - (rankingRank(right, "MARKET_TRADING_AMOUNT") ?? 999))
    .slice(0, 30)
    .forEach(add);
  items
    .filter((item) => hasRankingType(item, "MARKET_TRADING_VOLUME"))
    .sort((left, right) => (rankingRank(left, "MARKET_TRADING_VOLUME") ?? 999) - (rankingRank(right, "MARKET_TRADING_VOLUME") ?? 999))
    .slice(0, 30)
    .forEach(add);

  return [...bySymbol.values()].sort((left, right) =>
    rankCandidateScore(right, priceLimits.get(right.symbol ?? "")) -
    rankCandidateScore(left, priceLimits.get(left.symbol ?? ""))
  );
}

async function loadUsdKrwSnapshot(token: string): Promise<MarketSnapshotDto | null> {
  const response = await tossGet<TossExchangeRateResponse>("/api/v1/exchange-rate", token, {
    baseCurrency: "USD",
    quoteCurrency: "KRW"
  });
  const rate = response.result?.rate;

  if (!rate) return null;

  return {
    id: "usd-krw",
    label: "원/달러 환율",
    market: "KR",
    instrumentType: "fx",
    symbol: "USD/KRW",
    value: parseDecimal(rate).toLocaleString("ko-KR", {
      maximumFractionDigits: 2,
      minimumFractionDigits: 2
    }),
    change: response.result?.basisPoint ? `${response.result.basisPoint}bp` : undefined,
    tone: toneFromBasisPoint(response.result?.basisPoint),
    note: `토스증권 참고 환율${response.result?.midRate ? ` · 기준 ${response.result.midRate}` : ""}`,
    timestamp: response.result?.validFrom ?? new Date().toISOString(),
    source: "toss"
  };
}

const marketIndicatorLabels: Record<string, { label: string; instrumentType: MarketSnapshotDto["instrumentType"]; note: string; precision?: number }> = {
  KOSPI: {
    label: "KOSPI",
    instrumentType: "index",
    note: "토스증권 Market Indicators"
  },
  KOSDAQ: {
    label: "KOSDAQ",
    instrumentType: "index",
    note: "토스증권 Market Indicators"
  },
  KR_BOND_10Y: {
    label: "한국 10Y",
    instrumentType: "rate",
    note: "토스증권 국채 금리",
    precision: 3
  }
};

async function loadMarketIndicatorSnapshots(token: string): Promise<MarketSnapshotDto[]> {
  const response = await tossGet<TossMarketIndicatorPrice[]>("/api/v1/market-indicators/prices", token, {
    symbols: Object.keys(marketIndicatorLabels).join(",")
  });

  return (response.result ?? []).flatMap((item) => {
    const symbol = item.symbol;
    const config = symbol ? marketIndicatorLabels[symbol] : undefined;
    const value = parseDecimal(item.lastPrice);

    if (!symbol || !config || !value) return [];

    return [{
      id: `toss-${symbol.toLowerCase().replaceAll("_", "-")}`,
      label: config.label,
      market: "KR",
      instrumentType: config.instrumentType,
      symbol,
      value: config.instrumentType === "rate"
        ? `${value.toFixed(config.precision ?? 2)}%`
        : value.toLocaleString("ko-KR", {
          maximumFractionDigits: config.precision ?? 2,
          minimumFractionDigits: config.precision ?? 2
        }),
      tone: "flat",
      note: config.note,
      timestamp: item.timestamp ?? new Date().toISOString(),
      source: "toss"
    } satisfies MarketSnapshotDto];
  });
}

function stockDisplayName(item: TossRankingItem, stock?: TossStockInfo) {
  return stock?.name || stock?.englishName || item.symbol || "Unknown";
}

function stockRiskNote(stock?: TossStockInfo, limit?: TossPriceLimitResponse, item?: TossRankingItem) {
  const risk: string[] = [];
  const detail = stock?.koreanMarketDetail;
  const lastPrice = parseDecimal(item?.price?.lastPrice);
  const upperLimitPrice = parseDecimal(limit?.upperLimitPrice);

  if (upperLimitPrice && lastPrice >= upperLimitPrice) risk.push("상한가 도달");
  else if (upperLimitPrice && lastPrice / upperLimitPrice >= 0.98) risk.push("상한가 근접");
  if (detail?.liquidationTrading) risk.push("정리매매");
  if (detail?.krxTradingSuspended || detail?.nxtTradingSuspended) risk.push("거래정지 확인");
  if (stock?.status && stock.status !== "ACTIVE") risk.push(`상장상태 ${stock.status}`);
  if (stock?.securityType && !["STOCK", "FOREIGN_STOCK", "DEPOSITARY_RECEIPT", "REIT", "ETF", "ETN"].includes(stock.securityType)) {
    risk.push(stock.securityType);
  }

  return risk.length > 0 ? `${risk.join(" · ")} · 공시와 뉴스 원문 확인` : "공시·뉴스 원문과 장중 거래대금 유지 여부 확인";
}

function rankingSignalLabel(item: TossRankingItem, market: "KR" | "US", limitUp: boolean) {
  if (limitUp) return "국내 상한가 주도";
  if (hasRankingType(item, "MARKET_TRADING_AMOUNT")) return market === "US" ? "미국 거래대금 주도" : "국내 거래대금 주도";
  if (hasRankingType(item, "TOP_GAINERS")) return market === "US" ? "미국 상승률 주도" : "국내 상승률 주도";
  if (hasRankingType(item, "MARKET_TRADING_VOLUME")) return market === "US" ? "미국 거래량 주도" : "국내 거래량 주도";

  return market === "US" ? "미국 거래대금 주도" : "국내 거래대금 주도";
}

function rankingReasonLabels(item: TossRankingItem) {
  const labels: string[] = [];
  const turnoverRank = rankingRank(item, "MARKET_TRADING_AMOUNT");
  const gainerRank = rankingRank(item, "TOP_GAINERS");
  const volumeRank = rankingRank(item, "MARKET_TRADING_VOLUME");

  if (turnoverRank) labels.push(`거래대금 #${turnoverRank}`);
  if (gainerRank) labels.push(`상승률 #${gainerRank}`);
  if (volumeRank) labels.push(`거래량 #${volumeRank}`);

  return labels.length > 0 ? labels.join(" · ") : `거래대금 #${item.rank ?? 0}`;
}

function toLeadingStock(
  item: TossRankingItem,
  market: "KR" | "US",
  stock: TossStockInfo | undefined,
  limit: TossPriceLimitResponse | undefined,
  candleInsight: IntradayInsight | undefined,
  tradeInsight: TradeInsight | undefined,
  index: number
): LeadingStockDto | null {
  const symbol = item.symbol?.trim();

  if (!symbol) return null;

  const currency = item.currency ?? (market === "US" ? "USD" : "KRW");
  const changeRate = formatSignedPercentFromRatio(item.price?.changeRate);
  const rawTradingAmount = parseDecimal(item.tradingAmount);
  const rawTradingVolume = parseDecimal(item.tradingVolume);
  const amount = formatTradingAmount(item.tradingAmount, currency);
  const volume = formatTradingVolume(item.tradingVolume);
  const rank = rankingRank(item, "MARKET_TRADING_AMOUNT") ?? rankingRank(item, "TOP_GAINERS") ?? rankingRank(item, "MARKET_TRADING_VOLUME") ?? item.rank ?? index + 1;
  const currentPrice = formatPrice(item.price?.lastPrice, currency);
  const name = stockDisplayName(item, stock);
  const limitUp = isLimitUp(item, limit);
  const theme = isEtfLikeSecurity(stock, name) ? "ETF" : classifyTheme(symbol, name);

  if (
    !isSupportedSecurityType(stock) ||
    isLikelyNonOperatingEquityName(name) ||
    rawTradingAmount <= 0 ||
    rawTradingVolume <= 0
  ) {
    return null;
  }

  const burst = candleInsight
    ? `${limitUp ? "상한가 도달 · " : ""}${candleInsight.burst} · ${changeRate}`
    : `${limitUp ? "상한가 도달 · " : ""}${volume} · ${changeRate}`;
  const intraday = candleInsight
    ? candleInsight.intraday
    : `현재가 ${currentPrice} · 전일 대비 ${changeRate}`;
  const tradeDetail = tradeInsight ? ` · ${tradeInsight.detail}` : "";

  return {
    id: `toss-${market.toLowerCase()}-leader-${symbol}`,
    symbol,
    name,
    market,
    marketLabel: rankingSignalLabel(item, market, limitUp),
    burst,
    turnover: amount,
    intraday,
    reason: `${theme} · 토스증권 ${rankingReasonLabels(item)} · 표시순위 #${rank} · 거래량 ${volume} · 거래대금 ${amount}${tradeDetail}`,
    caution: stockRiskNote(stock, limit, item),
    timestamp: new Date().toISOString(),
    source: "toss"
  };
}

function buildTossBrief(macroSnapshot: MarketSnapshotDto[], krLeaders: LeadingStockDto[], usLeaders: LeadingStockDto[]): MarketBriefDto[] {
  const usdKrw = macroSnapshot.find((item) => item.id === "usd-krw");
  const timestamp = new Date().toISOString();
  const briefs: MarketBriefDto[] = [];

  if (krLeaders.length > 0 || usLeaders.length > 0) {
    briefs.push({
      id: "toss-leadership",
      region: "주도주",
      title: `${krLeaders[0]?.name ?? "국내"} / ${usLeaders[0]?.name ?? "미국"} 거래대금 상위 흐름입니다.`,
      points: [
        krLeaders[0] ? `국내 ${krLeaders[0].name} ${krLeaders[0].turnover} · ${krLeaders[0].burst}` : "국내 랭킹 확인 대기",
        usLeaders[0] ? `미국 ${usLeaders[0].name} ${usLeaders[0].turnover} · ${usLeaders[0].burst}` : "미국 랭킹 확인 대기",
        "상승 원인은 SEC/DART/뉴스 타임라인과 분리해서 확인합니다."
      ],
      source: "toss",
      timestamp
    });
  }

  if (usdKrw) {
    briefs.push({
      id: "toss-fx",
      region: "환율",
      title: `원/달러 ${usdKrw.value} 기준입니다.`,
      points: [
        usdKrw.note,
        "미국 주식 수익률과 국내 수출주 반응을 볼 때 참고값으로 사용합니다."
      ],
      source: "toss",
      timestamp
    });
  }

  return briefs;
}

function topThemeScores(
  items: TossRankingItem[],
  stocks: Map<string, TossStockInfo>,
  market: "KR" | "US"
) {
  const byTheme = new Map<string, ThemeScore>();

  items.forEach((item) => {
    const symbol = item.symbol?.trim();

    if (!symbol) return;

    const stock = stocks.get(symbol);
    const name = stockDisplayName(item, stock);

    if (!isSupportedSecurityType(stock) || isLikelyNonOperatingEquityName(name) || isEtfLikeSecurity(stock, name)) return;

    const theme = isEtfLikeSecurity(stock, name) ? "ETF" : classifyTheme(symbol, name);
    const turnover = parseDecimal(item.tradingAmount);
    const score = byTheme.get(theme) ?? {
      theme,
      turnover: 0,
      count: 0,
      leaders: []
    };

    score.turnover += turnover;
    score.count += 1;
    if (score.leaders.length < 3) score.leaders.push(name);
    byTheme.set(theme, score);
  });

  return [...byTheme.values()]
    .filter((score) => score.theme !== "개별 이슈" && score.theme !== "ETF" && score.turnover > 0)
    .sort((left, right) => right.turnover - left.turnover)
    .slice(0, market === "KR" ? 4 : 3);
}

function buildThemeBriefs(
  krThemes: ThemeScore[],
  usThemes: ThemeScore[]
): MarketBriefDto[] {
  const timestamp = new Date().toISOString();
  const briefs: MarketBriefDto[] = [];
  const toPoint = (score: ThemeScore, currency: "KRW" | "USD") =>
    `${score.theme}: ${formatTradingAmount(String(score.turnover), currency)} · ${score.leaders.join(", ")}`;

  if (krThemes.length > 0) {
    briefs.push({
      id: "toss-kr-theme-leadership",
      region: "시황 · 국내 테마",
      title: `${krThemes[0].theme} 거래대금 집중이 가장 큽니다.`,
      points: [
        ...krThemes.slice(0, 3).map((score) => toPoint(score, "KRW")),
        "테마는 DATE 룰 기반 분류입니다. 세부 원인은 뉴스·공시 확인이 필요합니다."
      ],
      source: "toss",
      timestamp
    });
  }

  if (usThemes.length > 0) {
    briefs.push({
      id: "toss-us-theme-leadership",
      region: "시황 · 미국 테마",
      title: `${usThemes[0].theme} 거래대금 집중이 가장 큽니다.`,
      points: [
        ...usThemes.slice(0, 3).map((score) => toPoint(score, "USD")),
        "미국 급등주는 SEC/뉴스 타임라인과 분리해서 원인 후보를 확인합니다."
      ],
      source: "toss",
      timestamp
    });
  }

  return briefs;
}

async function loadTossMarketData(): Promise<MarketBoardProviderPayload> {
  return readThroughCache("market-board:toss:market:v4", marketBoardCacheTtl.market, async () => {
    const credentials = getTossCredentials();

    if (!credentials.clientId || !credentials.clientSecret) {
      return {};
    }

    const token = await getTossAccessToken(credentials);
    const [krTurnover, krVolume, krGainers, usTurnover, usVolume, usGainers, usdKrw, marketIndicators] = await Promise.all([
      loadRankingOrEmpty(token, "KR", "MARKET_TRADING_AMOUNT", "realtime", 80),
      loadRankingOrEmpty(token, "KR", "MARKET_TRADING_VOLUME", "realtime", 80),
      loadRankingOrEmpty(token, "KR", "TOP_GAINERS", "1d", 80),
      loadRankingOrEmpty(token, "US", "MARKET_TRADING_AMOUNT", "realtime", 80),
      loadRankingOrEmpty(token, "US", "MARKET_TRADING_VOLUME", "realtime", 80),
      loadRankingOrEmpty(token, "US", "TOP_GAINERS", "1d", 80),
      loadUsdKrwSnapshot(token).catch(() => null),
      loadMarketIndicatorSnapshots(token).catch(() => [])
    ]);
    const krCandidateItems = mergeRankingItems(
      mergeRankingItems(krGainers.rankings ?? [], krTurnover.rankings ?? []),
      krVolume.rankings ?? []
    ).slice(0, 90);
    const usCandidateItems = mergeRankingItems(
      mergeRankingItems(usGainers.rankings ?? [], usTurnover.rankings ?? []),
      usVolume.rankings ?? []
    ).slice(0, 90);
    const krCandidateSymbols = krCandidateItems.flatMap((item) => item.symbol ? [item.symbol] : []);
    const usCandidateSymbols = usCandidateItems.flatMap((item) => item.symbol ? [item.symbol] : []);
    const [krStocks, usStocks, krPriceLimits] = await Promise.all([
      loadStocks(token, krCandidateSymbols),
      loadStocks(token, usCandidateSymbols),
      loadPriceLimits(token, krCandidateSymbols)
    ]);
    const krRankingItems = selectLeaderCandidates(krCandidateItems, krPriceLimits, 30);
    const usRankingItems = selectLeaderCandidates(usCandidateItems, new Map(), 30);
    const krCandleInsights = new Map<string, IntradayInsight>();
    const usCandleInsights = new Map<string, IntradayInsight>();
    const krTradeInsights = new Map<string, TradeInsight>();
    const usTradeInsights = new Map<string, TradeInsight>();
    const krLeadingStocks = krRankingItems
      .map((item, index) => toLeadingStock(
        item,
        "KR",
        krStocks.get(item.symbol ?? ""),
        krPriceLimits.get(item.symbol ?? ""),
        krCandleInsights.get(item.symbol ?? ""),
        krTradeInsights.get(item.symbol ?? ""),
        index
      ))
      .filter((item): item is LeadingStockDto => Boolean(item));
    const usLeadingStocks = usRankingItems
      .map((item, index) => toLeadingStock(
        item,
        "US",
        usStocks.get(item.symbol ?? ""),
        undefined,
        usCandleInsights.get(item.symbol ?? ""),
        usTradeInsights.get(item.symbol ?? ""),
        index
      ))
      .filter((item): item is LeadingStockDto => Boolean(item));
    const macroSnapshot = [...marketIndicators, ...(usdKrw ? [usdKrw] : [])];
    const marketBrief = [
      ...buildTossBrief(macroSnapshot, krLeadingStocks, usLeadingStocks),
      ...buildThemeBriefs(
        topThemeScores(krRankingItems, krStocks, "KR"),
        topThemeScores(usRankingItems, usStocks, "US")
      )
    ];

    return {
      ...(macroSnapshot.length > 0 ? { macroSnapshot } : {}),
      ...(marketBrief.length > 0 ? { marketBrief } : {}),
      ...(krLeadingStocks.length > 0 ? { krLeadingStocks } : {}),
      ...(usLeadingStocks.length > 0 ? { usLeadingStocks } : {})
    };
  });
}

export const tossMarketBoardAdapter = createMockFallbackAdapter(
  "toss",
  "토스증권 Open API",
  requiredEnv,
  { timeoutMs: 9000 }
);

tossMarketBoardAdapter.load = loadTossMarketData;
