import { marketBoardCacheTtl, readThroughCache } from "./cache";
import { fetchJson } from "./http";
import { createMockFallbackAdapter } from "./types";
import type { MarketBoardProviderPayload } from "./types";
import type { FlowItemDto, LeadingStockDto, MarketBriefDto, MarketSnapshotDto, Tone } from "../types";

const requiredEnv = ["KIS_APP_KEY", "KIS_APP_SECRET"];
const kisBaseUrl = "https://openapi.koreainvestment.com:9443";

let tokenCache: { accessToken: string; expiresAt: number } | undefined;

function getKisCredentials() {
  return {
    appKey: process.env.KIS_APP_KEY,
    appSecret: process.env.KIS_APP_SECRET,
    htsId: process.env.KIS_HTS_ID,
    enableMinuteCharts: process.env.KIS_ENABLE_MINUTE_CHARTS === "true"
  };
}

type KisTokenResponse = {
  access_token?: string;
  expires_in?: number;
  access_token_token_expired?: string;
};

type KisVolumeRankItem = {
  hts_kor_isnm?: string;
  mksc_shrn_iscd?: string;
  data_rank?: string;
  stck_prpr?: string;
  prdy_vrss?: string;
  prdy_ctrt?: string;
  acml_vol?: string;
  avrg_vol?: string;
  vol_inrt?: string;
  acml_tr_pbmn?: string;
  avrg_tr_pbmn?: string;
};

type KisVolumeRankResponse = {
  rt_cd?: string;
  msg_cd?: string;
  msg1?: string;
  output?: KisVolumeRankItem[];
};

type KisMinuteChartItem = {
  stck_bsop_date?: string;
  stck_cntg_hour?: string;
  stck_prpr?: string;
  stck_hgpr?: string;
  stck_lwpr?: string;
  cntg_vol?: string;
  acml_tr_pbmn?: string;
};

type KisMinuteChartResponse = {
  rt_cd?: string;
  msg_cd?: string;
  msg1?: string;
  output2?: KisMinuteChartItem[];
};

type KisIndexPriceResponse = {
  rt_cd?: string;
  msg_cd?: string;
  msg1?: string;
  output?: {
    bstp_nmix_prpr?: string;
    bstp_nmix_prdy_vrss?: string;
    bstp_nmix_prdy_ctrt?: string;
  };
};

type KisIndexConfig = {
  id: string;
  label: string;
  symbol: string;
  kisCode: string;
  note: string;
};

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

async function getKisAccessToken(credentials: ReturnType<typeof getKisCredentials>) {
  const now = Date.now();

  if (tokenCache && tokenCache.expiresAt > now + 60_000) {
    return tokenCache.accessToken;
  }

  const response = await fetchJson<KisTokenResponse>(`${kisBaseUrl}/oauth2/tokenP`, {
    method: "POST",
    timeoutMs: 5000,
    headers: {
      "Content-Type": "application/json; charset=UTF-8"
    },
    body: JSON.stringify({
      grant_type: "client_credentials",
      appkey: credentials.appKey,
      appsecret: credentials.appSecret
    })
  });

  if (!response.access_token) {
    throw new Error("KIS token missing");
  }

  tokenCache = {
    accessToken: response.access_token,
    expiresAt: now + Math.max((response.expires_in ?? 86_400) - 300, 60) * 1000
  };

  return tokenCache.accessToken;
}

function buildKisUrl(path: string, params: Record<string, string>) {
  const url = new URL(path, kisBaseUrl);

  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.set(key, value);
  });

  return url.toString();
}

function parseNumeric(value?: string) {
  const normalized = value?.replace(/,/g, "").trim();
  const numeric = normalized ? Number(normalized) : 0;

  return Number.isFinite(numeric) ? numeric : 0;
}

function formatSignedPercent(value?: string) {
  const numeric = parseNumeric(value);

  if (!numeric) return "0.00%";

  return `${numeric > 0 ? "+" : ""}${numeric.toFixed(2)}%`;
}

function formatTurnover(value?: string) {
  const numeric = parseNumeric(value);

  if (!numeric) return "확인 중";

  const eok = numeric / 100_000_000;

  if (eok >= 10_000) return `${Math.round(eok / 10_000).toLocaleString("ko-KR")}조`;
  if (eok >= 100) return `${Math.round(eok).toLocaleString("ko-KR")}억`;

  return `${eok.toFixed(1)}억`;
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

function toneFromChange(change?: number): Tone {
  if (!change) return "flat";

  return change > 0 ? "up" : "down";
}

function minuteRequestTime() {
  return new Intl.DateTimeFormat("sv-SE", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
    timeZone: "Asia/Seoul"
  }).format(new Date()).replaceAll(":", "");
}

function minuteStamp(item: KisMinuteChartItem) {
  return `${item.stck_bsop_date ?? ""}${item.stck_cntg_hour ?? ""}`;
}

function buildIntradayPosition(items: KisMinuteChartItem[]) {
  const bars = [...items]
    .filter((item) => item.stck_prpr && item.cntg_vol)
    .sort((a, b) => minuteStamp(a).localeCompare(minuteStamp(b)));

  if (bars.length < 2) return undefined;

  const latest = bars[bars.length - 1];
  const previous = bars[bars.length - 2];
  const latestPrice = parseNumeric(latest.stck_prpr);
  const previousPrice = parseNumeric(previous.stck_prpr);
  const high = Math.max(...bars.map((item) => parseNumeric(item.stck_hgpr || item.stck_prpr)));
  const vwapBase = bars.reduce((sum, item) => {
    const highPrice = parseNumeric(item.stck_hgpr || item.stck_prpr);
    const lowPrice = parseNumeric(item.stck_lwpr || item.stck_prpr);
    const closePrice = parseNumeric(item.stck_prpr);
    const volume = parseNumeric(item.cntg_vol);

    return {
      amount: sum.amount + ((highPrice + lowPrice + closePrice) / 3) * volume,
      volume: sum.volume + volume
    };
  }, { amount: 0, volume: 0 });
  const vwap = vwapBase.volume ? vwapBase.amount / vwapBase.volume : 0;
  const oneMinuteRate = previousPrice ? ((latestPrice - previousPrice) / previousPrice) * 100 : 0;
  const highGap = high ? ((high - latestPrice) / high) * 100 : 0;
  const position = latestPrice >= vwap ? "VWAP 위" : "VWAP 아래";
  const highNote = highGap <= 1 ? "당일 고점 근처" : "고점 대비 눌림";

  return `${position} · 최근 1분 ${oneMinuteRate > 0 ? "+" : ""}${oneMinuteRate.toFixed(2)}% · ${highNote}`;
}

function toLeadingStock(item: KisVolumeRankItem, index: number): LeadingStockDto | null {
  const symbol = item.mksc_shrn_iscd?.trim();
  const name = item.hts_kor_isnm?.trim();

  if (!symbol || !name) return null;

  const changeRate = formatSignedPercent(item.prdy_ctrt);
  const volumeIncrease = parseNumeric(item.vol_inrt);
  const rank = item.data_rank?.trim() || String(index + 1);

  return {
    id: `kis-kr-leader-${symbol}`,
    symbol,
    name,
    market: "KR",
    marketLabel: "국내 거래대금",
    burst: volumeIncrease > 0 ? `거래량증가율 ${volumeIncrease.toFixed(1)}%` : `누적거래량 ${parseNumeric(item.acml_vol).toLocaleString("ko-KR")}주`,
    turnover: formatTurnover(item.acml_tr_pbmn || item.avrg_tr_pbmn),
    intraday: `현재가 ${parseNumeric(item.stck_prpr).toLocaleString("ko-KR")}원 · ${changeRate}`,
    reason: `KIS 거래대금순위 #${rank} · 거래량과 거래대금 동반 확인`,
    caution: "뉴스·공시 원문과 장중 거래대금 유지 여부 확인",
    timestamp: new Date().toISOString(),
    source: "kis"
  };
}

async function loadKisMinuteChart(symbol: string, credentials: ReturnType<typeof getKisCredentials>, token: string) {
  const response = await fetchJson<KisMinuteChartResponse>(
    buildKisUrl("/uapi/domestic-stock/v1/quotations/inquire-time-itemchartprice", {
      FID_ETC_CLS_CODE: "",
      FID_COND_MRKT_DIV_CODE: "J",
      FID_INPUT_ISCD: symbol,
      FID_INPUT_HOUR_1: minuteRequestTime(),
      FID_PW_DATA_INCU_YN: "N"
    }),
    {
      timeoutMs: 3500,
      headers: {
        authorization: `Bearer ${token}`,
        appkey: credentials.appKey ?? "",
        appsecret: credentials.appSecret ?? "",
        tr_id: "FHKST03010200",
        custtype: "P",
        "Content-Type": "application/json; charset=UTF-8"
      }
    }
  );

  if (response.rt_cd && response.rt_cd !== "0") {
    throw new Error(`KIS minute ${response.msg_cd ?? "error"}`);
  }

  return buildIntradayPosition(response.output2 ?? []);
}

async function loadKisVolumeRank(credentials: ReturnType<typeof getKisCredentials>) {
  const token = await getKisAccessToken(credentials);
  const response = await fetchJson<KisVolumeRankResponse>(
    buildKisUrl("/uapi/domestic-stock/v1/quotations/volume-rank", {
      FID_COND_MRKT_DIV_CODE: "J",
      FID_COND_SCR_DIV_CODE: "20171",
      FID_INPUT_ISCD: "0000",
      FID_DIV_CLS_CODE: "1",
      FID_BLNG_CLS_CODE: "3",
      FID_TRGT_CLS_CODE: "111111111",
      FID_TRGT_EXLS_CLS_CODE: "000000",
      FID_INPUT_PRICE_1: "",
      FID_INPUT_PRICE_2: "",
      FID_VOL_CNT: "",
      FID_INPUT_DATE_1: ""
    }),
    {
      timeoutMs: 5000,
      headers: {
        authorization: `Bearer ${token}`,
        appkey: credentials.appKey ?? "",
        appsecret: credentials.appSecret ?? "",
        tr_id: "FHPST01710000",
        custtype: "P",
        "Content-Type": "application/json; charset=UTF-8"
      }
    }
  );

  if (response.rt_cd && response.rt_cd !== "0") {
    throw new Error(`KIS volume-rank ${response.msg_cd ?? "error"}`);
  }

  return { items: response.output ?? [], token };
}

async function loadKisIndexQuote(config: KisIndexConfig, credentials: ReturnType<typeof getKisCredentials>, token: string): Promise<MarketSnapshotDto | null> {
  const response = await fetchJson<KisIndexPriceResponse>(
    buildKisUrl("/uapi/domestic-stock/v1/quotations/inquire-index-price", {
      FID_COND_MRKT_DIV_CODE: "U",
      FID_INPUT_ISCD: config.kisCode
    }),
    {
      timeoutMs: 3500,
      headers: {
        authorization: `Bearer ${token}`,
        appkey: credentials.appKey ?? "",
        appsecret: credentials.appSecret ?? "",
        tr_id: "FHPUP02100000",
        custtype: "P",
        "Content-Type": "application/json; charset=UTF-8"
      }
    }
  );

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

async function loadKisIndexSnapshots(credentials: ReturnType<typeof getKisCredentials>, token: string) {
  const results = await Promise.allSettled(kisIndexQuotes.map((config) => loadKisIndexQuote(config, credentials, token)));

  return results.flatMap((result) => result.status === "fulfilled" && result.value ? [result.value] : []);
}

function indexSnapshotById(items: MarketSnapshotDto[], id: string) {
  return items.find((item) => item.id === id);
}

function buildKisMarketBrief(macroSnapshot: MarketSnapshotDto[]): MarketBriefDto[] {
  const kospi = indexSnapshotById(macroSnapshot, "kospi-day-future");
  const kosdaq = indexSnapshotById(macroSnapshot, "kosdaq-night-future");
  const kospi200 = indexSnapshotById(macroSnapshot, "kospi-night-future");

  if (!kospi && !kosdaq && !kospi200) return [];

  return [
    {
      id: "kr-market",
      region: "국내 시황",
      title: `${kospi ? `KOSPI ${kospi.changeRate ?? kospi.value}` : "KOSPI 확인 중"}, ${kosdaq ? `KOSDAQ ${kosdaq.changeRate ?? kosdaq.value}` : "KOSDAQ 확인 중"} 흐름입니다.`,
      points: [
        kospi ? `KOSPI ${kospi.value}${kospi.changeRate ? ` · ${kospi.changeRate}` : ""}` : "KOSPI 확인 대기",
        kospi200 ? `KOSPI200 ${kospi200.value}${kospi200.changeRate ? ` · ${kospi200.changeRate}` : ""}` : "KOSPI200 확인 대기",
        kosdaq ? `KOSDAQ ${kosdaq.value}${kosdaq.changeRate ? ` · ${kosdaq.changeRate}` : ""}` : "KOSDAQ 확인 대기"
      ],
      source: "kis",
      timestamp: new Date().toISOString()
    }
  ];
}

async function attachMinutePositions(leaders: LeadingStockDto[], credentials: ReturnType<typeof getKisCredentials>, token: string) {
  if (!credentials.enableMinuteCharts) {
    return leaders;
  }

  const targetLeaders = leaders.slice(0, 5);
  const results = await Promise.allSettled(targetLeaders.map((leader) => loadKisMinuteChart(leader.symbol, credentials, token)));
  const intradayBySymbol = new Map<string, string>();

  results.forEach((result, index) => {
    if (result.status === "fulfilled" && result.value) {
      intradayBySymbol.set(targetLeaders[index].symbol, result.value);
    }
  });

  return leaders.map((leader) => ({
    ...leader,
    intraday: intradayBySymbol.get(leader.symbol) ?? leader.intraday
  }));
}

function buildKisFlowItems(leaders: LeadingStockDto[]): FlowItemDto[] {
  const top = leaders[0];
  const timestamp = new Date().toISOString();

  return [
    {
      id: "flow-foreign",
      label: "외국인",
      status: "개장 후 확인",
      detail: "투자자별 수급 API 연결 전까지 거래대금 집중 종목과 분리해서 봅니다.",
      source: "kis",
      timestamp
    },
    {
      id: "flow-institution",
      label: "기관",
      status: "보조 확인",
      detail: "기관 수급은 다음 단계에서 KIS/KRX 투자자별 데이터로 연결합니다.",
      source: "kis",
      timestamp
    },
    {
      id: "flow-turnover",
      label: "거래대금",
      status: top ? `${top.name} 선두` : "확인 중",
      detail: top ? `KIS 거래대금순 기준 ${top.turnover} · ${top.intraday}` : "KIS 거래대금순 데이터를 확인합니다.",
      source: "kis",
      timestamp
    },
    {
      id: "flow-volume",
      label: "거래량",
      status: leaders.length > 0 ? `${leaders.length}개 포착` : "확인 중",
      detail: "거래량 증가율과 누적 거래대금을 함께 봅니다.",
      source: "kis",
      timestamp
    },
    {
      id: "flow-etf",
      label: "ETF",
      status: "보조 확인",
      detail: "ETF와 업종 지표는 주도주 후보의 섹터 동조 여부 확인용입니다.",
      source: "kis",
      timestamp
    },
    {
      id: "flow-chart",
      label: "차트",
      status: "마지막",
      detail: "현재가는 KIS 기준으로 확인하고, 분봉 위치는 다음 단계에서 캔들 API로 연결합니다.",
      source: "kis",
      timestamp
    },
    {
      id: "flow-risk",
      label: "리스크",
      status: "필수",
      detail: "거래대금 상위라도 뉴스·공시 원문과 장중 유지 여부를 분리해 확인합니다.",
      source: "kis",
      timestamp
    }
  ];
}

async function loadKisMarketData(): Promise<MarketBoardProviderPayload> {
  return readThroughCache("market-board:kis:market", marketBoardCacheTtl.market, async () => {
    const credentials = getKisCredentials();

    if (!credentials.appKey || !credentials.appSecret) {
      return {};
    }

    const volumeRank = await loadKisVolumeRank(credentials);
    const macroSnapshot = await loadKisIndexSnapshots(credentials, volumeRank.token);
    const krLeadingStocks = await attachMinutePositions(volumeRank.items
      .map(toLeadingStock)
      .filter((item): item is LeadingStockDto => Boolean(item))
      .slice(0, 10), credentials, volumeRank.token);

    return {
      ...(krLeadingStocks.length > 0 ? {
        krLeadingStocks,
        flowItems: buildKisFlowItems(krLeadingStocks)
      } : {}),
      ...(macroSnapshot.length > 0 ? {
        macroSnapshot,
        marketBrief: buildKisMarketBrief(macroSnapshot)
      } : {})
    };
  });
}

export const kisMarketBoardAdapter = createMockFallbackAdapter(
  "kis",
  "한국투자증권 Open API",
  requiredEnv,
  { timeoutMs: 9000 }
);

kisMarketBoardAdapter.load = loadKisMarketData;
