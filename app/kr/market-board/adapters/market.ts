import { marketBoardCacheTtl, readThroughCache } from "./cache";
import { fetchJson, fetchText } from "./http";
import { createMockFallbackAdapter } from "./types";
import type { MarketBoardProviderPayload } from "./types";
import type { MarketSnapshotDto, Tone } from "../types";

const requiredEnv = ["FINNHUB_API_KEY"];

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

type FrankfurterRateResponse = {
  amount?: number;
  base?: string;
  date?: string;
  rates?: {
    KRW?: number;
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
    apiKey: process.env.FINNHUB_API_KEY
  };
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

async function loadUsdKrwSnapshot(): Promise<MarketSnapshotDto | null> {
  const response = await fetchJson<FrankfurterRateResponse>("https://api.frankfurter.app/latest?from=USD&to=KRW", { timeoutMs: 2200 });
  const rate = response.rates?.KRW;

  if (!rate) return null;

  return {
    id: "usd-krw",
    label: "원/달러 환율",
    market: "KR",
    instrumentType: "fx",
    symbol: "USD/KRW",
    value: formatValue(rate, 2),
    tone: "flat",
    note: `Frankfurter ${response.date ?? "latest"} 기준`,
    timestamp: response.date ? `${response.date}T00:00:00+00:00` : new Date().toISOString(),
    source: "market"
  };
}

function treasuryField(entry: string, field: string) {
  const match = entry.match(new RegExp(`<d:${field}[^>]*>([^<]+)<\\/d:${field}>`));

  return match?.[1];
}

async function loadUs10ySnapshot(): Promise<MarketSnapshotDto | null> {
  const year = new Date().getUTCFullYear();
  const xml = await fetchText(`https://home.treasury.gov/resource-center/data-chart-center/interest-rates/pages/xml?data=daily_treasury_yield_curve&field_tdr_date_value=${year}`, { timeoutMs: 3500 });
  const entries = [...xml.matchAll(/<entry>[\s\S]*?<\/entry>/g)].map((match) => match[0]);
  const parsed = entries
    .map((entry) => {
      const date = treasuryField(entry, "NEW_DATE");
      const value = Number(treasuryField(entry, "BC_10YEAR"));

      return date && Number.isFinite(value) ? { date, value } : null;
    })
    .filter((item): item is { date: string; value: number } => Boolean(item));
  const latest = parsed.at(-1);
  const previous = parsed.at(-2);

  if (!latest) return null;

  const change = previous ? latest.value - previous.value : undefined;

  return {
    id: "us10y",
    label: "10Y 금리",
    market: "US",
    instrumentType: "rate",
    symbol: "US10Y",
    value: `${latest.value.toFixed(2)}%`,
    change: typeof change === "number" ? `${change > 0 ? "+" : ""}${change.toFixed(2)}%p` : undefined,
    tone: toneFromChange(change),
    note: "U.S. Treasury Daily Yield Curve",
    timestamp: latest.date.replace("T00:00:00", "T21:00:00+00:00"),
    source: "market"
  };
}

async function loadMarketSnapshot(): Promise<MarketBoardProviderPayload> {
  return readThroughCache("market-board:market:macro", marketBoardCacheTtl.market, async () => {
    const credentials = getFinnhubCredentials();
    const loaders: Array<Promise<MarketSnapshotDto | null>> = [
      loadBitcoinSnapshot(),
      loadUsdKrwSnapshot(),
      loadUs10ySnapshot()
    ];

    if (credentials.apiKey) {
      loaders.push(...finnhubMacroQuotes.map((config) => loadFinnhubQuote(config, credentials.apiKey as string)));
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
