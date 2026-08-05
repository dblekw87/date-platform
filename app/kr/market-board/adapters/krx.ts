import { marketBoardCacheTtl, readThroughCache } from "./cache";
import { fetchJson, fetchText } from "./http";
import { createMockFallbackAdapter } from "./types";
import type { MarketBoardProviderPayload } from "./types";
import type { CalendarEventDto } from "../types";

const requiredEnv = ["KRX_CALENDAR_FEED_URL"];
const kindListingUrl = "https://kind.krx.co.kr/listinvstg/listingcompany.do";
const kindOfferingUrl = "https://kind.krx.co.kr/listinvstg/pubofrprogcom.do";

type KrxCalendarFeed = CalendarEventDto[] | {
  items?: KrxCalendarFeedItem[];
  data?: KrxCalendarFeedItem[];
  result?: KrxCalendarFeedItem[];
};

type KrxCalendarFeedItem = Partial<CalendarEventDto> & {
  listingDate?: string;
  ipoDate?: string;
  subscriptionDate?: string;
  companyName?: string;
  name?: string;
  symbol?: string;
  code?: string;
  marketName?: string;
  eventType?: string;
  url?: string;
  link?: string;
};

function getKrxCredentials() {
  return {
    calendarFeedUrl: process.env.KRX_CALENDAR_FEED_URL
  };
}

function dayLabel(date: string) {
  const parsed = new Date(`${date}T00:00:00+09:00`);

  if (Number.isNaN(parsed.getTime())) return "";

  return new Intl.DateTimeFormat("ko-KR", {
    weekday: "short",
    timeZone: "Asia/Seoul"
  }).format(parsed).replace(".", "");
}

function compactDate(value?: string) {
  const match = value?.match(/(\d{4})[-.]?(\d{2})[-.]?(\d{2})/);

  return match ? `${match[1]}-${match[2]}-${match[3]}` : undefined;
}

function todaySeoulDate() {
  return new Intl.DateTimeFormat("sv-SE", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    timeZone: "Asia/Seoul"
  }).format(new Date());
}

function addDays(date: string, days: number) {
  const parsed = new Date(`${date}T00:00:00+09:00`);
  parsed.setUTCDate(parsed.getUTCDate() + days);

  return parsed.toISOString().slice(0, 10);
}

function decodeHtml(value: string) {
  return value
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&quot;/gi, "\"")
    .replace(/&#39;/gi, "'")
    .replace(/\s+/g, " ")
    .trim();
}

function stripTags(value: string) {
  return decodeHtml(value.replace(/<br\s*\/?>/gi, " ").replace(/<[^>]*>/g, " "));
}

function rowCells(html: string) {
  return [...html.matchAll(/<td\b[^>]*>([\s\S]*?)<\/td>/gi)].map((match) => stripTags(match[1]));
}

function rowMarket(html: string) {
  const alt = html.match(/<img\b[^>]*alt=['"]([^'"]+)['"]/i)?.[1];

  return alt ? decodeHtml(alt) : undefined;
}

function rowDetailUrl(html: string) {
  const detail = html.match(/fnDetailView\('([^']+)','([^']+)'\)/);

  if (!detail) return "https://kind.krx.co.kr/listinvstg/listingcompany.do?method=searchListingTypeMain";

  const params = new URLSearchParams({
    method: "searchListComDetailMain",
    scrnGb: "new",
    isurCd: detail[1],
    bzProcsNo: detail[2]
  });

  return `https://kind.krx.co.kr/listinvstg/listcomdetail.do?${params.toString()}`;
}

function htmlRows(html: string) {
  return [...html.matchAll(/<tr\b[^>]*>([\s\S]*?)<\/tr>/gi)].map((match) => match[0]);
}

async function postKindHtml(url: string, body: URLSearchParams, refererMethod: string) {
  return fetchText(url, {
    method: "POST",
    timeoutMs: 5500,
    headers: {
      "Accept": "text/html, */*; q=0.01",
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
      "Referer": `${url}?method=${refererMethod}`,
      "X-Requested-With": "XMLHttpRequest"
    },
    body
  });
}

function kindDateRange(pastDays: number, futureDays: number) {
  const today = todaySeoulDate();

  return {
    fromDate: addDays(today, -pastDays),
    toDate: addDays(today, futureDays)
  };
}

function listingRequestBody() {
  const range = kindDateRange(90, 90);

  return new URLSearchParams({
    method: "searchListingTypeSub",
    forward: "listingtype_sub",
    currentPageSize: "50",
    pageIndex: "1",
    orderMode: "1",
    orderStat: "D",
    marketType: "",
    searchCorpName: "",
    searchCorpNameTmp: "",
    country: "",
    industry: "",
    repMajAgntDesignAdvserComp: "",
    repMajAgntComp: "",
    designAdvserComp: "",
    secuGrpArr: "ST|FS",
    secuGrpArrStr: "ST|FS",
    listTypeArr: "01",
    listTypeArrStr: "01",
    choicTypeArr: "02",
    choicTypeArrStr: "02|03|04|05|06",
    fromDate: range.fromDate,
    toDate: range.toDate
  });
}

function offeringRequestBody() {
  const range = kindDateRange(365, 1);

  return new URLSearchParams({
    method: "searchPubofrProgComSub",
    forward: "pubofrprogcom_sub",
    currentPageSize: "50",
    pageIndex: "1",
    orderMode: "1",
    orderStat: "D",
    searchMode: "",
    searchCodeType: "",
    marketType: "",
    searchCorpName: "",
    searchCorpNameTmp: "",
    isurCd: "",
    repIsuSrtCd: "",
    bzProcsNo: "",
    detailMarket: "",
    repMajAgntDesignAdvserComp: "",
    repMajAgntComp: "",
    designAdvserComp: "",
    fromDate: range.fromDate,
    toDate: range.toDate
  });
}

function normalizeListingRow(row: string, index: number): CalendarEventDto | null {
  const cells = rowCells(row);
  const [name, listedAt, type, securityType, industry, country, broker, offerPrice, amount, product, firstShares] = cells;
  const date = compactDate(listedAt);

  if (!date || !name || name === "회사명") return null;

  const market = rowMarket(row);

  return {
    id: `kind-listing-${date}-${name}-${index}`,
    date,
    day: dayLabel(date),
    type: "신규상장",
    title: `${name} 신규상장`,
    market: "국내",
    check: "상장일 기준가, 유통 가능 물량, 공모가 대비 흐름",
    detail: [
      market ? `시장 ${market}` : null,
      type,
      securityType,
      industry,
      country,
      broker ? `주관 ${broker}` : null,
      offerPrice && offerPrice !== "-" ? `공모가 ${offerPrice}` : null,
      amount && amount !== "-" ? `공모금액 ${amount}` : null,
      product && product !== "-" ? `주요제품 ${product}` : null,
      firstShares && firstShares !== "-" ? `최초상장주식수 ${firstShares}주` : null
    ].filter(Boolean).join(" · "),
    source: "KIND 신규상장기업현황",
    originalUrl: rowDetailUrl(row)
  };
}

function normalizeOfferingRows(row: string, index: number): CalendarEventDto[] {
  const cells = rowCells(row);
  const [name, submittedAt, demandSchedule, subscriptionSchedule, paymentDate, offerPrice, amount, expectedListingDate, broker] = cells;

  if (!name || name === "회사명") return [];

  const market = rowMarket(row);
  const baseDetail = [
    market ? `시장 ${market}` : null,
    submittedAt ? `신고서 ${submittedAt}` : null,
    demandSchedule ? `수요예측 ${demandSchedule}` : null,
    subscriptionSchedule ? `청약 ${subscriptionSchedule}` : null,
    paymentDate ? `납입 ${paymentDate}` : null,
    offerPrice && offerPrice !== "-" ? `공모가 ${offerPrice}` : null,
    amount && amount !== "-" ? `공모금액 ${amount}백만원` : null,
    broker ? `주관 ${broker}` : null
  ].filter(Boolean).join(" · ");
  const detailUrl = "https://kind.krx.co.kr/listinvstg/pubofrprogcom.do?method=searchPubofrProgComMain";
  const events: CalendarEventDto[] = [];
  const subscriptionStart = compactDate(subscriptionSchedule);
  const expectedListing = compactDate(expectedListingDate);

  if (subscriptionStart) {
    events.push({
      id: `kind-offering-subscription-${subscriptionStart}-${name}-${index}`,
      date: subscriptionStart,
      day: dayLabel(subscriptionStart),
      type: "공모주",
      title: `${name} 청약 시작`,
      market: "국내",
      check: "청약 일정, 확정 공모가, 환불·납입일",
      detail: baseDetail || "공모 세부 일정을 확인합니다.",
      source: "KIND 공모기업현황",
      originalUrl: detailUrl
    });
  }

  if (expectedListing) {
    events.push({
      id: `kind-offering-listing-${expectedListing}-${name}-${index}`,
      date: expectedListing,
      day: dayLabel(expectedListing),
      type: "신규상장",
      title: `${name} 상장예정`,
      market: "국내",
      check: "상장예정일, 유통 가능 물량, 공모가 대비 기준",
      detail: baseDetail || "상장예정 세부 조건을 확인합니다.",
      source: "KIND 공모기업현황",
      originalUrl: detailUrl
    });
  }

  return events;
}

async function loadKindListingCalendarItems() {
  const html = await postKindHtml(kindListingUrl, listingRequestBody(), "searchListingTypeMain");

  return htmlRows(html)
    .map(normalizeListingRow)
    .filter((item): item is CalendarEventDto => Boolean(item));
}

async function loadKindOfferingCalendarItems() {
  const html = await postKindHtml(kindOfferingUrl, offeringRequestBody(), "searchPubofrProgComMain");

  return htmlRows(html).flatMap(normalizeOfferingRows);
}

function rawKrxCalendarItems(feed: KrxCalendarFeed) {
  if (Array.isArray(feed)) return feed as KrxCalendarFeedItem[];

  return feed.items ?? feed.data ?? feed.result ?? [];
}

function normalizeKrxCalendarItem(item: KrxCalendarFeedItem, index: number): CalendarEventDto | null {
  const date = compactDate(item.date ?? item.listingDate ?? item.ipoDate ?? item.subscriptionDate);
  const name = item.companyName ?? item.name ?? item.title;

  if (!date || !name) return null;

  const eventType = `${item.type ?? ""} ${item.eventType ?? ""} ${item.title ?? ""}`;
  const type: CalendarEventDto["type"] = /상장|listing/i.test(eventType) ? "신규상장" : "공모주";
  const symbol = item.symbol ?? item.code;

  return {
    id: item.id ?? `krx-calendar-${date}-${symbol ?? index}`,
    date,
    day: item.day ?? dayLabel(date),
    type,
    title: type === "신규상장" ? `${name} 신규상장` : `${name} 공모 일정`,
    market: "국내",
    check: type === "신규상장" ? "상장일 유통물량과 기준가" : "수요예측, 청약일, 환불일",
    detail: [
      symbol ? `종목코드 ${symbol}` : null,
      item.marketName ? `시장 ${item.marketName}` : null,
      item.detail
    ].filter(Boolean).join(" · ") || "상장/공모 세부 조건과 유통 가능 물량을 확인합니다.",
    source: item.source ?? "KRX/KIND",
    originalUrl: item.originalUrl ?? item.url ?? item.link
  };
}

async function loadKrxCalendarItems(credentials: ReturnType<typeof getKrxCredentials>) {
  if (!credentials.calendarFeedUrl) return [];

  const feed = await fetchJson<KrxCalendarFeed>(credentials.calendarFeedUrl, {
    timeoutMs: 3500,
    headers: {
      Accept: "application/json"
    }
  });

  return rawKrxCalendarItems(feed)
    .map(normalizeKrxCalendarItem)
    .filter((item): item is CalendarEventDto => Boolean(item))
    .slice(0, 40);
}

async function loadKrxMarketData(): Promise<MarketBoardProviderPayload> {
  return readThroughCache("market-board:krx:market:v4", marketBoardCacheTtl.calendar, async () => {
    const credentials = getKrxCredentials();
    const today = todaySeoulDate();
    const fromDate = addDays(today, -45);
    const toDate = addDays(today, 180);
    const results = await Promise.allSettled([
      loadKindListingCalendarItems(),
      loadKindOfferingCalendarItems(),
      loadKrxCalendarItems(credentials)
    ]);
    const calendarItems = results.flatMap((result) => result.status === "fulfilled" ? result.value : []);
    const uniqueItems = [...new Map(calendarItems.map((item) => [item.id, item])).values()]
      .filter((item) => item.date >= fromDate && item.date <= toDate)
      .sort((left, right) => left.date.localeCompare(right.date) || left.type.localeCompare(right.type) || left.title.localeCompare(right.title))
      .slice(0, 80);

    return uniqueItems.length > 0 ? { calendarItems: uniqueItems } : {};
  });
}

export const krxMarketBoardAdapter = createMockFallbackAdapter(
  "krx",
  "KRX Open API / KIND",
  requiredEnv,
  { credentialStrategy: "any", publicWithoutCredentials: true, timeoutMs: 6000 }
);

krxMarketBoardAdapter.load = loadKrxMarketData;
