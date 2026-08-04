import { marketBoardCacheTtl, readThroughCache } from "./cache";
import { fetchJson } from "./http";
import { createMockFallbackAdapter } from "./types";
import type { MarketBoardProviderPayload } from "./types";
import type { MarketSnapshotDto, Tone } from "../types";

const requiredEnv = ["FINNHUB_API_KEY"];
const kisBaseUrl = "https://openapi.koreainvestment.com:9443";

let kisTokenCache: { accessToken: string; expiresAt: number } | undefined;

type FinnhubQuote = {
  c?: number;
  d?: number;
  dp?: number;
  h?: number;
  l?: number;
  o?: number;
  pc?: number;
  t?: number;
};

type CoingeckoSimplePrice = {
  bitcoin?: {
    usd?: number;
    usd_24h_change?: number;
  };
};

type KisTokenResponse = {
  access_token?: string;
  expires_in?: number;
};

type KisIndexPriceResponse = {
  rt_cd?: string;
  msg_cd?: string;
  msg1?: string;
  output?: {
    bstp_nmix_prpr?: string;
    bstp_nmix_prdy_vrss?: string;
    bstp_nmix_prdy_ctrt?: string;
    acml_vol?: string;
    acml_tr_pbmn?: string;
  };
};

type MarketQuoteConfig = {
  id: string;
  label: string;
  market: MarketSnapshotDto["market"];
  instrumentType: MarketSnapshotDto["instrumentType"];
  symbol: string;
  finnhubSymbol: string;
  note: string;
  precision?: number;
};

type KisIndexConfig = {
  id: string;
  label: string;
  symbol: string;
  kisCode: string;
  note: string;
};

const finnhubMacroQuotes: MarketQuoteConfig[] = [
  {
    id: "sp500-future",
    label: "S&P 500 ETF",
    market: "US",
    instrumentType: "index",
    symbol: "SPY",
    finnhubSymbol: "SPY",
    note: "S&P 500 선물 대체 확인용 ETF"
  },
  {
    id: "nasdaq-future",
    label: "NASDAQ 100 ETF",
    market: "US",
    instrumentType: "index",
    symbol: "QQQ",
    finnhubSymbol: "QQQ",
    note: "NASDAQ 선물 대체 확인용 ETF"
  },
  {
    id: "phlx-sox",
    label: "반도체 ETF",
    market: "US",
    instrumentType: "index",
    symbol: "SOXX",
    finnhubSymbol: "SOXX",
    note: "SOX 원지수 대체 확인용 반도체 ETF"
  },
  {
    id: "gold",
    label: "금 ETF",
    market: "GLOBAL",
    instrumentType: "commodity",
    symbol: "GLD",
    finnhubSymbol: "GLD",
    note: "금선물 대체 확인용 ETF"
  },
  {
    id: "wti",
    label: "WTI ETF",
    market: "GLOBAL",
    instrumentType: "commodity",
    symbol: "USO",
    finnhubSymbol: "USO",
    note: "WTI 선물 대체 확인용 ETF"
  }
];

const kisIndexQuotes: KisIndexConfig[] = [
  {
    id: "kospi-day-future",
    label: "KOSPI",
    symbol: "KOSPI",
    kisCode: "0001",
    note: "KIS 국내업종 현재지수"
  },
  {
    id: "kosdaq-night-future",
    label: "KOSDAQ",
    symbol: "KOSDAQ",
    kisCode: "1001",
    note: "KIS 국내업종 현재지수"
  },
  {
    id: "kospi-night-future",
    label: "KOSPI200",
    symbol: "K200",
    kisCode: "2001",
    note: "KIS 국내업종 현재지수"
  }
];

function toneFromChange(change?: number): Tone {
  if (!change) return "flat";

  return change > 0 ? "up" : "down";
}

function formatValue(value?: number, precision = 2) {
  if (typeof value !== "number" || !Number.isFinite(value)) return "확인 중";

  return value.toLocaleString("ko-KR", {
    maximumFractionDigits: precision,
    minimumFractionDigits: precision
  });
}

function formatChangeRate(value?: number) {
  if (typeof value !== "number" || !Number.isFinite(value)) return undefined;

  return `${value > 0 ? "+" : ""}${value.toFixed(2)}%`;
}

function getFinnhubCredentials() {
  return {
    apiKey: process.env.FINNHUB_API_KEY,
    kisAppKey: process.env.KIS_APP_KEY,
    kisAppSecret: process.env.KIS_APP_SECRET
  };
}

async function getKisAccessToken(credentials: ReturnType<typeof getFinnhubCredentials>) {
  const now = Date.now();

  if (kisTokenCache && kisTokenCache.expiresAt > now + 60_000) {
    return kisTokenCache.accessToken;
  }

  const response = await fetchJson<KisTokenResponse>(`${kisBaseUrl}/oauth2/tokenP`, {
    method: "POST",
    timeoutMs: 5000,
    headers: {
      "Content-Type": "application/json; charset=UTF-8"
    },
    body: JSON.stringify({
      grant_type: "client_credentials",
      appkey: credentials.kisAppKey,
      appsecret: credentials.kisAppSecret
    })
  });

  if (!response.access_token) {
    throw new Error("KIS token missing");
  }

  kisTokenCache = {
    accessToken: response.access_token,
    expiresAt: now + Math.max((response.expires_in ?? 86_400) - 300, 60) * 1000
  };

  return kisTokenCache.accessToken;
}

async function loadFinnhubQuote(config: MarketQuoteConfig, apiKey: string): Promise<MarketSnapshotDto | null> {
  const url = new URL("https://finnhub.io/api/v1/quote");
  url.searchParams.set("symbol", config.finnhubSymbol);
  url.searchParams.set("token", apiKey);

  const quote = await fetchJson<FinnhubQuote>(url.toString(), { timeoutMs: 2200 });

  if (!quote.c) return null;

  const timestamp = quote.t ? new Date(quote.t * 1000).toISOString() : new Date().toISOString();

  return {
    id: config.id,
    label: config.label,
    market: config.market,
    instrumentType: config.instrumentType,
    symbol: config.symbol,
    value: formatValue(quote.c, config.precision ?? 2),
    change: typeof quote.d === "number" ? formatValue(quote.d, config.precision ?? 2) : undefined,
    changeRate: formatChangeRate(quote.dp),
    tone: toneFromChange(quote.dp),
    note: config.note,
    timestamp,
    source: "market"
  };
}

function parseNumeric(value?: string) {
  const numeric = Number(value?.replace(/,/g, "").trim() ?? "");

  return Number.isFinite(numeric) ? numeric : undefined;
}

async function loadKisIndexQuote(config: KisIndexConfig, credentials: ReturnType<typeof getFinnhubCredentials>, token: string): Promise<MarketSnapshotDto | null> {
  if (!credentials.kisAppKey || !credentials.kisAppSecret) return null;

  const url = new URL("/uapi/domestic-stock/v1/quotations/inquire-index-price", kisBaseUrl);
  url.searchParams.set("FID_COND_MRKT_DIV_CODE", "U");
  url.searchParams.set("FID_INPUT_ISCD", config.kisCode);

  const response = await fetchJson<KisIndexPriceResponse>(url.toString(), {
    timeoutMs: 3500,
    headers: {
      authorization: `Bearer ${token}`,
      appkey: credentials.kisAppKey,
      appsecret: credentials.kisAppSecret,
      tr_id: "FHPUP02100000",
      custtype: "P",
      "Content-Type": "application/json; charset=UTF-8"
    }
  });

  if (response.rt_cd && response.rt_cd !== "0") {
    throw new Error(`KIS index ${response.msg_cd ?? "error"}`);
  }

  const current = parseNumeric(response.output?.bstp_nmix_prpr);

  if (!current) return null;

  const change = parseNumeric(response.output?.bstp_nmix_prdy_vrss);
  const changeRate = parseNumeric(response.output?.bstp_nmix_prdy_ctrt);

  return {
    id: config.id,
    label: config.label,
    market: "KR",
    instrumentType: "index",
    symbol: config.symbol,
    value: formatValue(current, 2),
    change: typeof change === "number" ? formatValue(change, 2) : undefined,
    changeRate: formatChangeRate(changeRate),
    tone: toneFromChange(changeRate),
    note: config.note,
    timestamp: new Date().toISOString(),
    source: "kis"
  };
}

async function loadBitcoinSnapshot(): Promise<MarketSnapshotDto | null> {
  const response = await fetchJson<CoingeckoSimplePrice>(
    "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd&include_24hr_change=true",
    { timeoutMs: 2200 }
  );
  const price = response.bitcoin?.usd;

  if (!price) return null;

  const changeRate = response.bitcoin?.usd_24h_change;

  return {
    id: "btc",
    label: "BTC",
    market: "CRYPTO",
    instrumentType: "crypto",
    symbol: "BTC/USD",
    value: formatValue(price, 0),
    changeRate: formatChangeRate(changeRate),
    tone: toneFromChange(changeRate),
    note: "CoinGecko BTC/USD 24시간 변화",
    timestamp: new Date().toISOString(),
    source: "market"
  };
}

async function loadMarketSnapshot(): Promise<MarketBoardProviderPayload> {
  return readThroughCache("market-board:market:macro", marketBoardCacheTtl.market, async () => {
    const credentials = getFinnhubCredentials();
    const loaders: Array<Promise<MarketSnapshotDto | null>> = [loadBitcoinSnapshot()];

    if (credentials.apiKey) {
      loaders.push(...finnhubMacroQuotes.map((config) => loadFinnhubQuote(config, credentials.apiKey as string)));
    }

    if (credentials.kisAppKey && credentials.kisAppSecret) {
      const token = await getKisAccessToken(credentials);

      loaders.push(...kisIndexQuotes.map((config) => loadKisIndexQuote(config, credentials, token)));
    }

    const results = await Promise.allSettled(loaders);
    const macroSnapshot = results
      .flatMap((result) => result.status === "fulfilled" && result.value ? [result.value] : []);

    return macroSnapshot.length > 0 ? { macroSnapshot } : {};
  });
}

export const marketDataMarketBoardAdapter = createMockFallbackAdapter(
  "market",
  "시장 데이터",
  requiredEnv,
  { credentialStrategy: "any", publicWithoutCredentials: true, timeoutMs: 5500 }
);

marketDataMarketBoardAdapter.load = loadMarketSnapshot;
