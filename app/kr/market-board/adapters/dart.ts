import { marketBoardCacheTtl, readThroughCache } from "./cache";
import { fetchJson } from "./http";
import { createMockFallbackAdapter } from "./types";
import type { MarketBoardProviderPayload } from "./types";
import type { DisclosureItemDto } from "../types";

const requiredEnv = ["DART_API_KEY"];

function getDartCredentials() {
  return {
    apiKey: process.env.DART_API_KEY
  };
}

type DartDisclosure = {
  corp_code: string;
  corp_name: string;
  stock_code?: string;
  report_nm: string;
  rcept_no: string;
  flr_nm: string;
  rcept_dt: string;
};

type DartListResponse = {
  status: string;
  message: string;
  list?: DartDisclosure[];
};

function yyyymmdd(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}${month}${day}`;
}

function classifyDartDisclosure(item: DartDisclosure) {
  const text = item.report_nm;

  if (/합병|분할|영업양수|영업양도|타법인주식및출자증권취득|타법인 주식/.test(text)) return { urgency: "M&A", tags: ["인수합병"], action: "거래 구조와 자금 조달 방식 확인" };
  if (/단일판매|공급계약|수주/.test(text)) return { urgency: "계약", tags: ["공급계약"], action: "계약 금액, 기간, 매출 대비 비중 확인" };
  if (/유상증자|전환사채|신주인수권|CB|BW/.test(text)) return { urgency: "자금조달", tags: ["증자·지분"], action: "납입일, 할인율, 전환 조건 확인" };
  if (/최대주주|대표이사|경영권/.test(text)) return { urgency: "지배구조", tags: ["경영권"], action: "변경 전후 지분과 보호예수 확인" };
  if (/잠정실적|매출액|손익구조/.test(text)) return { urgency: "실적", tags: ["실적"], action: "일회성 여부와 전년 대비 변화 확인" };

  return { urgency: "공시", tags: ["DART"], action: "공시 원문과 제출 시각 확인" };
}

function toDartDisclosureItem(item: DartDisclosure): DisclosureItemDto {
  const classified = classifyDartDisclosure(item);
  const filedAt = `${item.rcept_dt.slice(0, 4)}-${item.rcept_dt.slice(4, 6)}-${item.rcept_dt.slice(6, 8)}T09:00:00+09:00`;

  return {
    id: `dart-${item.rcept_no}`,
    market: "KR",
    source: "DART",
    urgency: classified.urgency,
    companyName: item.corp_name,
    symbol: item.stock_code,
    issuerType: "unknown",
    eventType: classified.urgency,
    accessionNumber: item.rcept_no,
    formType: "공시",
    title: `${item.corp_name} · ${item.report_nm}`,
    filedAt,
    originalUrl: `https://dart.fss.or.kr/dsaf001/main.do?rcpNo=${item.rcept_no}`,
    tags: classified.tags,
    action: classified.action
  };
}

async function loadDartDisclosures(): Promise<MarketBoardProviderPayload> {
  return readThroughCache("market-board:dart:disclosures", marketBoardCacheTtl.disclosure, async () => {
    const credentials = getDartCredentials();

    if (!credentials.apiKey) {
      return {};
    }

    const from = new Date();
    from.setDate(from.getDate() - 7);

    const url = new URL("https://opendart.fss.or.kr/api/list.json");
    url.searchParams.set("crtfc_key", credentials.apiKey);
    url.searchParams.set("bgn_de", yyyymmdd(from));
    url.searchParams.set("page_count", "100");
    url.searchParams.set("sort", "date");
    url.searchParams.set("sort_mth", "desc");

    const response = await fetchJson<DartListResponse>(url.toString(), { timeoutMs: 1800 });

    if (response.status !== "000" || !response.list) {
      return {};
    }

    const krDisclosures = response.list
      .filter((item) => item.rcept_no && item.report_nm)
      .map(toDartDisclosureItem)
      .slice(0, 30);

    return krDisclosures.length > 0 ? { krDisclosures } : {};
  });
}

export const dartMarketBoardAdapter = createMockFallbackAdapter(
  "dart",
  "DART Open API",
  requiredEnv,
  { timeoutMs: 1800 }
);

dartMarketBoardAdapter.load = loadDartDisclosures;
