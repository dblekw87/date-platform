import { marketBoardCacheTtl, readThroughCache } from "./cache";
import { fetchJson } from "./http";
import { createMockFallbackAdapter } from "./types";
import type { MarketBoardProviderPayload } from "./types";
import type { FlowItemDto, LeadingStockDto } from "../types";

const requiredEnv = ["KIS_APP_KEY", "KIS_APP_SECRET"];
const kisBaseUrl = "https://openapi.koreainvestment.com:9443";

let tokenCache: { accessToken: string; expiresAt: number } | undefined;

function getKisCredentials() {
  return {
    appKey: process.env.KIS_APP_KEY,
    appSecret: process.env.KIS_APP_SECRET,
    htsId: process.env.KIS_HTS_ID
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

  return response.output ?? [];
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

    const krLeadingStocks = (await loadKisVolumeRank(credentials))
      .map(toLeadingStock)
      .filter((item): item is LeadingStockDto => Boolean(item))
      .slice(0, 10);

    return krLeadingStocks.length > 0 ? {
      krLeadingStocks,
      flowItems: buildKisFlowItems(krLeadingStocks)
    } : {};
  });
}

export const kisMarketBoardAdapter = createMockFallbackAdapter(
  "kis",
  "한국투자증권 Open API",
  requiredEnv,
  { timeoutMs: 6500 }
);

kisMarketBoardAdapter.load = loadKisMarketData;
