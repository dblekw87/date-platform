"use client";

import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useMemo, useState } from "react";
import { SiteHeader } from "../../_components/SiteHeader";
import { DayLeaders } from "./DayLeaders";
import { PairTrades } from "./PairTrades";
import { SurgeCandidates } from "./SurgeCandidates";
import styles from "../../page.module.scss";
import type { DisclosureRegion, LeaderRegion, MarketBoardData, MarketBoardTabId } from "./types";

const refreshIntervalMs = 60_000;

/**
 * "전체", "새 공시", "중소형주", and then one id per tag the day's filings
 * actually carry, written as `tag:증자·지분`.
 *
 * The chips used to be a fixed list matched with English regexes, which for
 * domestic filings meant 90% of a day matched nothing at all — pressing 소형주,
 * 매각 or 인수합병 opened an empty box. Building them from the payload means a
 * chip exists only when there is something behind it.
 */
type DisclosureFilterId = string;
type LeaderFilterId = "turnover" | "gainers" | "volume" | "etf" | "risk";
type NewsFilterId = "all" | "us" | "kr" | "theme" | "macro";
type LeadingStock = MarketBoardData["usLeadingStocks"][number];
type MarketSnapshot = MarketBoardData["macroSnapshot"][number];
type Headline = MarketBoardData["headlineFlow"][number];
type Disclosure = MarketBoardData["usDisclosures"][number];
type CalendarEvent = MarketBoardData["calendarItems"][number];

function buildDisclosureFilters(items: Disclosure[]) {
  const byTag = new Map<string, number>();

  items.forEach((item) => {
    (item.tags ?? []).forEach((tag) => byTag.set(tag, (byTag.get(tag) ?? 0) + 1));
  });

  const smallCaps = items.filter((item) => item.issuerType === "small-cap" || item.issuerType === "mid-cap").length;
  const fresh = items.filter((item) => item.isNew).length;

  return [
    { count: items.length, id: "all", label: "전체" },
    ...(fresh > 0 ? [{ count: fresh, id: "new", label: "새 공시" }] : []),
    ...(smallCaps > 0 ? [{ count: smallCaps, id: "small-cap", label: "중소형주" }] : []),
    ...[...byTag]
      .sort((left, right) => right[1] - left[1])
      .map(([tag, count]) => ({ count, id: `tag:${tag}`, label: tag }))
  ];
}

const leaderFilters: Array<{ id: LeaderFilterId; label: string }> = [
  { id: "turnover", label: "거래대금" },
  { id: "gainers", label: "상승률" },
  { id: "volume", label: "거래량" },
  { id: "etf", label: "ETF" },
  { id: "risk", label: "주의" }
];

const newsFilters: Array<{ id: NewsFilterId; label: string }> = [
  { id: "all", label: "전체" },
  { id: "us", label: "미국 뉴스" },
  { id: "kr", label: "국내 뉴스" },
  { id: "theme", label: "테마" },
  { id: "macro", label: "매크로" }
];

// Sunday first, the way a Korean calendar is read.
const weekdayLabels = ["일", "월", "화", "수", "목", "금", "토"];
// The macro row, read left to right: US direction first, then what it lands on
// at home, then the rest of the world, then the prices everything is measured
// against. Ids not listed here are dropped, which is how four new cards were
// fetched and never drawn.
const marketCardOrder = [
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

const trendIconByTone = {
  up: "/market-board/trend-up.svg",
  down: "/market-board/trend-down.svg",
  flat: "/market-board/trend-flat.svg"
} satisfies Record<MarketBoardData["macroSnapshot"][number]["tone"], string>;
const rankIcons = ["/market-board/rank-a.svg", "/market-board/rank-b.svg", "/market-board/rank-c.svg"];
const marketCardFallbacks: Record<string, Pick<MarketSnapshot, "label" | "market" | "instrumentType" | "symbol" | "note" | "source">> = {
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

function DateLogo() {
  return (
    <svg aria-hidden="true" fill="none" height="28" viewBox="0 0 55 28" width="55" xmlns="http://www.w3.org/2000/svg">
      <path d="M32.61 27.3V3.9H28.13V0H41.39V3.9H36.9V27.3H32.61Z" fill="black" />
      <path d="M14.26 27.3L18.7 0H24.51L28.96 27.3H24.67L21.45 6.3L18.23 27.3H14.25H14.26Z" fill="black" />
      <path d="M0 0H6.55C10.84 0 12.95 2.38 12.95 6.75V20.56C12.95 24.93 10.84 27.31 6.55 27.31H0V0ZM4.29 23.4H6.47C7.84 23.4 8.65 22.7 8.65 20.75V6.55C8.65 4.6 7.83 3.9 6.47 3.9H4.29V23.4Z" fill="black" />
      <path d="M47.17 3.9H54.58V0H42.88V27.3H54.58V23.4H47.17V15.02H53.05V11.11H47.17V3.9Z" fill="black" />
    </svg>
  );
}

function EnglishText({ text }: { text: string }) {
  const parts = text.split(/([A-Za-z0-9&.'+-]+(?:\s+[A-Za-z0-9&.'+-]+)*)/g);

  return (
    <>
      {parts.map((part, index) => (
        /[A-Za-z]/.test(part) ? <span className={styles.englishText} key={`${part}-${index}`}>{part}</span> : part
      ))}
    </>
  );
}

function todaySeoulDate() {
  return new Intl.DateTimeFormat("sv-SE", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    timeZone: "Asia/Seoul"
  }).format(new Date());
}

function buildCalendarDays(anchorDate: string) {
  const [year, month] = anchorDate.split("-").map(Number);
  const firstDate = new Date(Date.UTC(year, month - 1, 1));
  const lastDay = new Date(Date.UTC(year, month, 0)).getUTCDate();
  // getUTCDay is already Sunday-indexed, so the week needs no shifting. It used
  // to be rotated by six to start on Monday.
  const leadingBlanks = firstDate.getUTCDay();
  const cellCount = Math.ceil((leadingBlanks + lastDay) / 7) * 7;

  return Array.from({ length: cellCount }, (_, index) => {
    const day = index - leadingBlanks + 1;

    if (day < 1 || day > lastDay) {
      return null;
    }

    return {
      date: `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`,
      day
    };
  });
}

function formatCalendarMonth(value: string) {
  const [year, month] = value.split("-");

  return `${year}년 ${Number(month)}월`;
}

function formatCalendarDayLabel(value: string) {
  const [, month, day] = value.split("-");

  return `${Number(month)}월 ${Number(day)}일`;
}

function calendarTimeNote(item: CalendarEvent) {
  if (item.publishedAt) {
    return `한국 확인 ${formatDateTimeMinute(item.publishedAt)}`;
  }

  if (item.market === "미국" && item.type === "실적") {
    return `${formatCalendarDayLabel(item.date)} 미국 현지일 · 한국은 다음날 새벽 확인 가능`;
  }

  if (item.market === "미국") {
    return `${formatCalendarDayLabel(item.date)} 미국 현지일`;
  }

  return `${formatCalendarDayLabel(item.date)} 한국 기준`;
}

function calendarDaySummary(events: CalendarEvent[]) {
  const domestic = events.filter((event) => event.market === "국내").length;
  const us = events.filter((event) => event.market === "미국").length;

  return [
    domestic > 0 ? `국내 ${domestic}` : null,
    us > 0 ? `미국 ${us}` : null
  ].filter(Boolean);
}

function upcomingCalendarItems(items: CalendarEvent[], fromDate: string) {
  return items
    .filter((item) => item.date >= fromDate)
    .sort((left, right) => left.date.localeCompare(right.date) || left.type.localeCompare(right.type) || left.title.localeCompare(right.title))
    .slice(0, 8);
}

function formatDateTimeMinute(value?: string) {
  if (!value) return "확인 대기";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value.length >= 16 ? value.slice(0, 16).replace("T", " ") : value;
  }

  return new Intl.DateTimeFormat("sv-SE", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "Asia/Seoul"
  }).format(date);
}

function AdSlot({ label }: { label: string }) {
  return (
    <aside className={styles.adSlot} aria-label={label}>
      <span>{label}</span>
    </aside>
  );
}

function formatDateOnly(value?: string) {
  const formatted = formatDateTimeMinute(value);

  return formatted === "확인 대기" ? todaySeoulDate() : formatted.slice(0, 10);
}

function formatTimeOnly(value?: string) {
  const formatted = formatDateTimeMinute(value);

  return formatted === "확인 대기" ? "--:--" : formatted.slice(11, 16);
}

function OriginalLink({ href }: { href?: string }) {
  return href && href !== "#" ? (
    <a className={styles.originalLink} href={href} rel="noreferrer" target="_blank">
      링크
      <span className={styles.linkIcon} aria-hidden="true">↗</span>
    </a>
  ) : <span>원문 대기</span>;
}

function HeadlineLink({ item }: { item: Headline }) {
  if (!item.originalUrl || item.originalUrl === "#") {
    return <span>{item.text}</span>;
  }

  return (
    <a href={item.originalUrl} rel="noreferrer" target="_blank">
      {item.text}
      <span className={styles.linkIcon} aria-hidden="true">↗</span>
    </a>
  );
}

function displaySource(source?: string) {
  if (!source) return "출처 확인";
  if (source === "mock") return "참고값";
  if (source === "kis") return "시장 데이터";
  if (source === "market") return "시장 데이터";

  return source;
}

function displayProviderMessage(message: string) {
  return message.replace(/mock/gi, "비활성");
}

function ProviderStatusStrip({ board }: { board: MarketBoardData }) {
  const checkedAt = board.providerStatuses[0]?.checkedAt;

  return (
    <section className={styles.providerStrip} aria-label="데이터 연결 상태">
      <strong>데이터 연결 상태{checkedAt ? ` · ${formatDateTimeMinute(checkedAt)}` : ""}</strong>
      <div>
        {board.providerStatuses.map((provider) => (
          <span data-status={provider.status} key={provider.id} title={displayProviderMessage(provider.message)}>
            {provider.label}
          </span>
        ))}
      </div>
    </section>
  );
}

function IssuerLabel({ issuerType }: { issuerType?: Disclosure["issuerType"] }) {
  if (issuerType === "small-cap") {
    return <span>소형주</span>;
  }

  if (issuerType === "mid-cap") {
    return <span>중형주</span>;
  }

  if (issuerType === "large-cap") {
    return <span>대형주</span>;
  }

  return null;
}

function matchesDisclosureFilter(item: Disclosure, filterId: DisclosureFilterId) {
  if (filterId === "new") return Boolean(item.isNew);
  if (filterId === "small-cap") return item.issuerType === "small-cap" || item.issuerType === "mid-cap";
  if (filterId.startsWith("tag:")) return (item.tags ?? []).includes(filterId.slice(4));

  return true;
}

function matchesLeaderFilter(stock: LeadingStock, filterId: LeaderFilterId, ranks?: Map<string, number>) {
  const labelText = `${stock.burst} ${stock.turnover} ${stock.intraday} ${stock.reason} ${stock.caution}`;
  const etf = isEtfLeader(stock);

  if (filterId === "gainers" || filterId === "turnover" || filterId === "volume") {
    const rank = ranks?.get(stock.id) ?? null;

    return rank !== null && rank <= 30;
  }
  if (filterId === "etf") return etf;
  // The exchange's own designation first. The text match stays for the US side
  // and for warnings the board writes itself, but a 관리종목 is a fact about the
  // listing rather than a phrase that happened to appear in a label.
  if (filterId === "risk") {
    return (stock.cautionLabels?.length ?? 0) > 0
      || /거래정지|정리매매|관리종목|투자경고|투자위험|단기과열|상장폐지|상장상태|VI 발동|변동성완화/i.test(labelText);
  }

  return true;
}

function matchesNewsFilter(item: Headline, filterId: NewsFilterId) {
  const labelText = `${item.source} ${item.label} ${item.text}`;

  if (filterId === "us") return item.region === "US";
  if (filterId === "kr") return item.region === "KR";
  if (filterId === "theme") return /테마|전력|바이오|정책|AI/i.test(labelText);
  if (filterId === "macro") return /매크로|금리|CPI|환율|달러|선물/i.test(labelText);

  return true;
}

function newsFilterCount(items: MarketBoardData["headlineFlow"], filterId: NewsFilterId) {
  return items.filter((item) => matchesNewsFilter(item, filterId)).length;
}

function relatedHeadlineTags(item: Headline) {
  return [
    ...(item.relatedSymbols ?? []).map((symbol) => `종목 ${symbol}`),
    ...(item.relatedThemes ?? []).map((theme) => `테마 ${theme}`)
  ];
}

/**
 * The theme a row belongs to.
 *
 * `reason` is the backend's sentence and the theme is its first clause, which
 * makes this parse the whole page's single point of failure: a row assembled
 * without one took the board down with "Cannot read properties of undefined
 * (reading 'split')". The DTO says the field is required and the backend is
 * plain JavaScript, so nothing checks that promise at the boundary. Prefer the
 * typed field, read the sentence only as a fallback, and never assume either.
 */
function leaderTheme(stock: LeadingStock) {
  if (stock.theme && stock.theme !== "미분류") return stock.theme;

  const [theme] = (stock.reason ?? "").split(" · ");

  if (
    !theme ||
    theme === "개별 이슈" ||
    theme === "미분류" ||
    /KIS|토스증권|거래대금|거래량|상승률|순위|표시순위/i.test(theme)
  ) return inferThemeFromLeader(stock);

  return theme;
}

function isEtfLeader(stock: LeadingStock) {
  return leaderTheme(stock) === "ETF" ||
    /(^|\s)(KODEX|TIGER|ACE|RISE|SOL|PLUS|HANARO|KOSEF|KBSTAR|ARIRANG|TIMEFOLIO|히어로즈|마이티|HK)|ETF|ETN|인버스|레버리지|채권|회사채|국고채|액티브|Nifty|TOP10/i.test(`${stock.name ?? ""} ${stock.reason ?? ""}`);
}

function inferThemeFromLeader(stock: LeadingStock) {
  const text = `${stock.symbol} ${stock.name} ${stock.reason} ${stock.marketLabel}`;

  if (/매드업|MADUP/i.test(text)) return "AI 광고";
  if (/유니켐|UNICHEM|011330/i.test(text)) return "비건가죽";
  if (/SURG|SurgePays/i.test(text)) return "핀테크 결제";
  if (/PAVS|Paranovus/i.test(text)) return "AI 게임";
  if (/AZI|Autozi/i.test(text)) return "자동차 애프터마켓";
  if (/반도체|HBM|DRAM|NAND|chip|semiconductor/i.test(text)) return "반도체";
  if (/AI|인공지능|소프트웨어|마케팅|광고|플랫폼|software|marketing|advertising|platform/i.test(text)) return "AI 서비스";
  if (/게임|엔터|game|entertainment/i.test(text)) return "AI 게임";
  if (/결제|핀테크|통신|MVNO|wireless|payment|fintech|telecom/i.test(text)) return "핀테크 결제";
  if (/자동차|전장|시트|가죽|피혁|내장재|auto|vehicle|leather|car owner/i.test(text)) return "자동차 애프터마켓";
  if (/바이오|제약|신약|임상|bio|biotech|pharma/i.test(text)) return "바이오";
  if (/전력|변압기|원전|에너지|power|utility|energy|nuclear/i.test(text)) return "전력망";
  if (/저유동|low.?float|급등|상승률|거래량|중소형|소형|small.?cap/i.test(text)) return stock.market === "US" ? "소형주 급등" : "거래대금 급증";

  return stock.market === "US" ? "소형주 급등" : "거래대금 급증";
}

// Labels that describe how a stock surfaced rather than what it belongs to.
// Grouping under one of these invents a theme — "거래대금 급증" is not a sector,
// and a row of unrelated names beneath it reads as a finding when it is not.
const nonThemeLabels = new Set(["ETF", "미분류", "개별 이슈", "거래대금 급증", "소형주 급등"]);

function isThemeLeaderCandidate(stock: LeadingStock) {
  return !isEtfLeader(stock) && !nonThemeLabels.has(leaderTheme(stock));
}

/**
 * Groups the leaders by theme and ranks the groups by how hard they moved.
 *
 * Every member counts the same, matching the backend's theme brief. Weighting
 * by turnover handed the score to whichever member traded most, so 반도체 was
 * ranked on 삼성전자 alone and a theme of mid caps up 20% placed below a mega
 * cap up 2%. Turnover concentration is what the 주도주 list above measures; this
 * one is about which stocks moved as a group.
 */
function rankedThemeGroups(stocks: LeadingStock[]) {
  const byTheme = new Map<string, LeadingStock[]>();

  stocks.filter(isThemeLeaderCandidate).forEach((stock) => {
    const theme = leaderTheme(stock);

    byTheme.set(theme, [...(byTheme.get(theme) ?? []), stock]);
  });

  return [...byTheme.entries()]
    .map(([theme, members]) => {
      const totalChange = members.reduce((total, stock) => total + (stock.changeRateValue ?? 0), 0);

      return {
        theme,
        // Ordered by how far each has moved, so the one leading the theme reads
        // as 1등주 and the names still trailing it come after — the comparison
        // this list exists to make.
        members: [...members].sort((left, right) =>
          (right.changeRateValue ?? 0) - (left.changeRateValue ?? 0)
          || (right.turnoverValue ?? 0) - (left.turnoverValue ?? 0)),
        changeRate: members.length > 0 ? totalChange / members.length : 0
      };
    })
    // A single name is a 주도주, which has its own list above, so a one-stock
    // group here would promise a 2등주 that does not exist.
    .filter((group) => group.members.length >= 2 && group.changeRate > 0)
    .sort((left, right) => right.changeRate - left.changeRate)
    .slice(0, 3);
}

/**
 * The two sessions a domestic stock traded in today, each with its hours named.
 *
 * The live rate follows whichever book is open, which is why the board read
 * 쿠콘 at +23.17% while 토스, quoting the 19:59 book, read +19.03%. Rather than
 * choosing, the row shows the regular close and the evening close side by side;
 * the gap between them is the part worth reading, because a name that gave back
 * its limit after hours does not open like one that held it.
 *
 * Returns null when there is no second figure to show — a US row, or a domestic
 * one before the evening has traded — and the row falls back to one number.
 */
function sessionRatePair(stock: LeadingStock) {
  const rates = stock.sessionChangeRates;

  if (rates?.regular === undefined || rates.after === undefined) return null;

  return [
    { hours: "09:00–15:30", label: "정규장", value: rates.regular },
    { hours: "15:40–20:00", label: "애프터", value: rates.after }
  ];
}

function signedPercent(value: number) {
  return `${value > 0 ? "+" : ""}${value.toFixed(2)}%`;
}

function leaderChangeRate(stock: LeadingStock) {
  const match = `${stock.burst} ${stock.intraday}`.match(/[+-]\d+(?:\.\d+)?%/);

  return match?.[0] ?? "확인";
}

function changeTone(value: string) {
  const trimmed = value.trim();

  if (trimmed.startsWith("+")) return "up";
  if (trimmed.startsWith("-")) return "down";

  return "flat";
}

function metricChangeTone(value: string, fallback?: "up" | "down" | "flat") {
  const percentMatch = value.match(/[+-]\d+(?:\.\d+)?%/);

  if (percentMatch) return changeTone(percentMatch[0]);
  if (fallback) return fallback;

  return "flat";
}

function marketChangeLabel(item?: MarketBoardData["macroSnapshot"][number]) {
  if (!item) return "확인 중";

  return item.changeRate ?? item.change ?? item.value;
}

function fallbackMarketCard(id: string, timestamp?: string): MarketSnapshot {
  const fallback = marketCardFallbacks[id] ?? marketCardFallbacks["nasdaq-future"];

  return {
    id,
    ...fallback,
    value: "대기",
    tone: "flat",
    timestamp: timestamp ?? new Date().toISOString()
  };
}

/**
 * Marks a stock doing an outsized share of its day's turnover in the last few
 * minutes — the burst that a cumulative figure hides. A fifth of the day inside
 * a ten-minute window is well above an even pace and worth looking at now.
 */
function isSurging(stock: LeadingStock) {
  return (stock.recentTurnoverShare ?? 0) >= 0.2 && Boolean(stock.recentTurnover);
}

function themeRankLabel(groups: { theme: string }[], index: number) {
  return groups[index]?.theme ?? "확인 대기";
}

/**
 * One theme in the strength list, expanding to the stocks that make it up.
 *
 * Uses details/summary so the disclosure works without script and stays
 * reachable by keyboard and screen reader. A theme carrying a single name has
 * nothing to reveal, so it renders as a plain row.
 */
function ThemeGroupRow({
  group,
  nameOf,
  rankIndex
}: {
  group: { theme: string; members: LeadingStock[] };
  nameOf: (stock: LeadingStock) => string;
  rankIndex: number;
}) {
  const [lead] = group.members;

  // Every ranked theme opens, including one holding a single name: a row that
  // looks the same as its neighbours but does nothing when clicked reads as
  // broken.
  return (
    <details className={styles.themeGroup}>
      <summary>
        <Image alt="" aria-hidden="true" height={20} src={rankIcons[rankIndex] ?? rankIcons[2]} width={20} />
        <span><EnglishText text={group.theme} /></span>
        {/* Beside the theme, so turnover stays right-aligned down the column. */}
        <em>{group.members.length}종목</em>
        <i />
        <small>{nameOf(lead)}</small>
        <b>{lead.turnover}</b>
      </summary>
      <ol className={styles.themeMembers}>
        {group.members.map((stock, index) => (
          <li key={stock.id}>
            <em>{index + 1}등주</em>
            <span><EnglishText text={nameOf(stock)} /></span>
            {isSurging(stock) ? (
              <mark title={`최근 ${stock.recentWindowMinutes}분 ${stock.recentTurnover}`}>급증</mark>
            ) : null}
            <i />
            <b data-tone={changeTone(leaderChangeRate(stock))}>{leaderChangeRate(stock)}</b>
            <small>{stock.turnover}</small>
          </li>
        ))}
      </ol>
    </details>
  );
}

function providerStatusFor(board: MarketBoardData, providerId: MarketBoardData["providerStatuses"][number]["id"]) {
  return board.providerStatuses.find((provider) => provider.id === providerId);
}

function themeUnavailableMessage(board: MarketBoardData, region: "KR" | "US") {
  const provider = region === "US" ? providerStatusFor(board, "toss") : providerStatusFor(board, "kis");

  if (provider?.status === "error") {
    return `${provider.label} 오류로 강세 테마 데이터를 표시하지 못했습니다.`;
  }

  if (provider?.status === "mock") {
    return `${provider.label} 환경변수가 없어 강세 테마 provider가 비활성 상태입니다.`;
  }

  return "강세 테마 후보가 아직 수신되지 않았습니다.";
}

function leaderUnavailableMessage(board: MarketBoardData, region: "KR" | "US") {
  const provider = region === "US" ? providerStatusFor(board, "market") : providerStatusFor(board, "kis");

  if (provider?.status === "error") {
    return `${provider.label} 오류로 주도주를 집계하지 못했습니다.`;
  }

  if (provider?.status === "mock") {
    return `${provider.label} 환경변수가 없어 주도주 provider가 비활성 상태입니다.`;
  }

  return "거래대금이 한쪽으로 쏠린 종목이 아직 없습니다.";
}

function isWaitingMarketCard(item: MarketSnapshot) {
  return item.value === "대기" || item.value === "확인 대기";
}

function isLongMarketValue(item: MarketSnapshot) {
  return item.value.length >= 7;
}

function intradayParts(value?: string) {
  const text = value ?? "";
  const [pricePart, changePart] = text.split(/\s*·\s*/);

  return {
    price: pricePart?.trim() || text,
    change: changePart?.trim() || ""
  };
}

function leaderVolumeOnly(stock: LeadingStock) {
  return (stock.burst ?? "")
    .replace(/상한가 도달\s*·\s*/g, "")
    .replace(/\s*·\s*[+-]\d+(?:\.\d+)?%/g, "")
    .replace(/\s*[+-]\d+(?:\.\d+)?%/g, "")
    .trim();
}

/**
 * The figure each filter ranks on, taken from the data rather than the prose.
 *
 * This read the rank out of the reason sentence with a regular expression, and
 * on 2026-08-19 every filter returned zero of thirty in both markets. Domestic
 * rows say "거래대금 순위 #8" and the pattern wanted "거래대금 #8" — one space —
 * while the US rows carry no rank sentence at all, so nothing could ever match.
 * A wording change on the server silently emptied the board, which is what
 * parsing a sentence for a number buys.
 *
 * Every one of these is already a number on the DTO.
 */
function leaderMetric(stock: LeadingStock, filterId: Extract<LeaderFilterId, "turnover" | "gainers" | "volume">) {
  if (filterId === "gainers") return stock.changeRateValue ?? null;
  if (filterId === "volume") return stock.volumeRatioValue ?? stock.volumeValue ?? null;

  return stock.turnoverValue ?? null;
}

/** Positions within the list being shown, best first, one-indexed. */
function leaderRanks(stocks: LeadingStock[], filterId: Extract<LeaderFilterId, "turnover" | "gainers" | "volume">) {
  const ordered = stocks
    .filter((stock) => leaderMetric(stock, filterId) !== null)
    .sort((left, right) => (leaderMetric(right, filterId) ?? 0) - (leaderMetric(left, filterId) ?? 0));

  return new Map(ordered.map((stock, index) => [stock.id, index + 1]));
}

function sortLeadingStocks(stocks: MarketBoardData["usLeadingStocks"], filterId: LeaderFilterId) {
  if (filterId !== "turnover" && filterId !== "gainers" && filterId !== "volume" && filterId !== "etf") return stocks;

  // US ETFs carry no turnover outside the regular session — Yahoo reports zero
  // volume on pre and post bars — so ranking them by it would leave the tab in
  // whatever order the fetch happened to return.
  const rankFilter = filterId === "etf"
    ? (stocks.some((stock) => Number(stock.turnoverValue) > 0) ? "turnover" : "gainers")
    : filterId;
  const ranks = leaderRanks(stocks, rankFilter);

  return [...stocks].sort((left, right) => (ranks.get(left.id) ?? 999) - (ranks.get(right.id) ?? 999));
}

/**
 * 시가총액을 읽히는 단위로. 거래정지는 규모와 같이 봐야 뜻이 생깁니다 — 한화가
 * 멈춘 것과 코스닥 소형주가 멈춘 것은 같은 사건이 아닙니다.
 */
function formatKrwSize(value: number | null) {
  if (value === null || !Number.isFinite(value) || value <= 0) return "확인 중";

  if (value >= 1_000_000_000_000) return `${(value / 1_000_000_000_000).toFixed(1)}조`;

  return `${Math.round(value / 100_000_000).toLocaleString("ko-KR")}억`;
}

const issuerSizeLabels: Record<string, string> = {
  "large-cap": "대형주",
  "mid-cap": "중형주",
  "small-cap": "소형주",
  unknown: "규모 미상"
};

function normalizeForMatch(value: string) {
  return value.toLowerCase().replace(/\s+/g, "");
}

// A US ticker is two or three letters, and looking for it as a bare substring
// finds it inside ordinary words: "MP" sits in "Tempus" and "employment", "MU"
// in "communication", "TEM" in "system". That is how every MP Materials row
// ended up captioned with a Tempus AI headline - 18 matches, none of them about
// the company. Latin aliases now need a word boundary on both sides, which also
// means they have to be tested against the text as written rather than the
// space-stripped form. Korean has no word boundaries to find, so Korean aliases
// keep the old match.
function aliasMatchesText(alias: string, raw: string, matchCase = false) {
  if (/[가-힣]/.test(alias)) return normalizeForMatch(raw).includes(normalizeForMatch(alias));

  const haystack = matchCase ? raw : raw.toLowerCase();
  const needle = matchCase ? alias : alias.toLowerCase();
  const isWordCharacter = (character: string) => /[a-z0-9]/i.test(character);

  for (let at = haystack.indexOf(needle); at !== -1; at = haystack.indexOf(needle, at + 1)) {
    const before = at === 0 ? "" : haystack[at - 1];
    const after = haystack[at + needle.length] ?? "";

    if (!isWordCharacter(before) && !isWordCharacter(after)) return true;
  }

  return false;
}

function stockNameAliases(stock: LeadingStock) {
  const aliases = new Set([
    stock.name,
    // The comma belongs to the suffix: "Moderna, Inc." was leaving "Moderna,"
    // behind, which matches no headline, because headlines write "Moderna and".
    stock.name.replace(/[,\s]+(inc\.?|corporation|corp\.?|ltd\.?|plc|co\.?)$/i, "").replace(/[,\s]+$/, ""),
    stock.symbol
  ]);

  if (stock.name.includes("SK하이닉스")) aliases.add("하이닉스");
  if (stock.name.includes("삼성전자")) aliases.add("삼전");
  if (stock.symbol === "AMD") aliases.add("Advanced Micro Devices");
  if (stock.symbol === "INTC") aliases.add("Intel");
  if (stock.symbol === "MU") aliases.add("Micron Technology");
  if (stock.symbol === "NVDA") aliases.add("Nvidia");
  if (stock.symbol === "SNDK") aliases.add("Sandisk");

  return [...aliases].map((alias) => alias.trim()).filter(Boolean);
}

function headlineMatchesLeader(item: Headline, stock: LeadingStock) {
  if (item.region !== stock.market) return false;
  if (item.relatedSymbols?.includes(stock.symbol)) return true;

  const text = `${item.source} ${item.label} ${item.text} ${item.originalText ?? ""}`;

  return stockNameAliases(stock).some((alias) => {
    if (/^\d+$/.test(alias) && alias.length < 5) return false;

    // The ticker itself is matched case-sensitively: lowercased, "MRNA" is the
    // ordinary word "mRNA" and "MP" is inside "employment". The same guard
    // exists in the backend's tagger, which is where the Moderna row was
    // actually getting a Tempus AI headline from; this is the fallback path for
    // headlines the backend did not tag. Company names stay case-insensitive,
    // since headlines are inconsistent about those.
    return aliasMatchesText(alias, text, alias === stock.symbol);
  });
}

function isLikelyIndividualCompanyHeadline(item: Headline, stock: LeadingStock) {
  if (headlineMatchesLeader(item, stock)) return false;

  const text = `${item.source} ${item.label} ${item.text} ${item.originalText ?? ""}`;
  const broadMarketSignal = /업종|섹터|테마|시장|증시|코스피|코스닥|나스닥|수급|정책|정부|규제|금리|환율|지수|전망|투자심리|랠리|강세|약세|호황|불황|industry|sector|market|policy|regulation|outlook/i.test(text);
  const individualSignal = /주가|주식|자사주|회장|대표|임원|계약|공급|임상|승인|실적|매출|영업이익|인수|합병|급락|급등|베팅|지분|CB|BW|유증|stock|shares|ceo|chairman|contract|trial|approval|earnings|revenue/i.test(text);

  return individualSignal && !broadMarketSignal;
}

function headlineMatchesTheme(item: Headline, stock: LeadingStock) {
  const theme = leaderTheme(stock);

  if (item.region !== stock.market && item.region !== "GLOBAL") return false;
  if (!theme || theme === "개별 이슈" || theme === "ETF") return false;
  if (isLikelyIndividualCompanyHeadline(item, stock)) return false;
  if (item.relatedThemes?.includes(theme)) return true;

  return `${item.label} ${item.text}`.includes(theme);
}

function headlineCauseLabel(item: Headline) {
  const text = `${item.label} ${item.text} ${item.originalText ?? ""}`;

  if (/실적|가이던스|컨센서스|earnings|guidance|revenue|results|quarter|q[1-4]|eps|sales|forecast/i.test(text)) return "실적";
  if (/공시|sec|8-k|10-q|10-k|s-1|424b|13d|13g|filing|disclosure/i.test(text)) return "공시";
  if (/인수|합병|m&a|merger|acquisition|tender/i.test(text)) return "M&A";

  return "뉴스";
}

function headlineCauseScore(item: Headline, stock: LeadingStock) {
  const label = headlineCauseLabel(item);
  const directScore = headlineMatchesLeader(item, stock) ? 100 : 0;
  const causeScore = label === "실적" ? 30 : label === "공시" ? 20 : label === "M&A" ? 18 : 0;

  return directScore + causeScore;
}

function relatedLeaderNews(stock: LeadingStock, headlines: Headline[]) {
  return headlines
    .filter((item) => headlineMatchesLeader(item, stock))
    .sort((left, right) => {
      const scoreDiff = headlineCauseScore(right, stock) - headlineCauseScore(left, stock);

      return scoreDiff || right.publishedAt.localeCompare(left.publishedAt);
    });
}

function relatedThemeNews(stock: LeadingStock, headlines: Headline[]) {
  return headlines.filter((item) => headlineMatchesTheme(item, stock));
}

function relatedDisclosures(stock: LeadingStock, disclosures: Disclosure[]) {
  const aliases = stockNameAliases(stock);

  return disclosures.filter((item) => {
    const text = `${item.symbol ?? ""} ${item.companyName ?? ""} ${item.title} ${item.tags.join(" ")} ${item.eventType ?? ""}`;

    return item.symbol === stock.symbol || aliases.some((alias) => alias && aliasMatchesText(alias, text));
  });
}

type LeaderRankSet = { gainers: Map<string, number>; turnover: Map<string, number>; volume: Map<string, number> };

function leaderRankSummary(stock: LeadingStock, ranks: LeaderRankSet) {
  return [
    ranks.turnover.get(stock.id) ? `거래대금 #${ranks.turnover.get(stock.id)}` : null,
    ranks.gainers.get(stock.id) ? `상승률 #${ranks.gainers.get(stock.id)}` : null,
    ranks.volume.get(stock.id) ? `거래량 #${ranks.volume.get(stock.id)}` : null
  ].filter(Boolean).join(" · ");
}

function leaderRankSummaryForFilter(stock: LeadingStock, filterId: LeaderFilterId, ranks: LeaderRankSet) {
  if (filterId === "turnover") return ranks.turnover.get(stock.id) ? `거래대금 #${ranks.turnover.get(stock.id)}` : "거래대금 순위";
  if (filterId === "gainers") return ranks.gainers.get(stock.id) ? `상승률 #${ranks.gainers.get(stock.id)}` : "상승률 순위";
  if (filterId === "volume") return ranks.volume.get(stock.id) ? `거래량 #${ranks.volume.get(stock.id)}` : "거래량 순위";
  if (filterId === "etf") return ranks.turnover.get(stock.id) ? `ETF 거래대금 #${ranks.turnover.get(stock.id)}` : "ETF";

  return leaderRankSummary(stock, ranks) || "주의";
}

function leaderSignalForFilter(stock: LeadingStock, filterId: LeaderFilterId) {
  const region = stock.market === "US" ? "미국" : "국내";

  if (filterId === "turnover") return `${region} 거래대금 주도`;
  if (filterId === "gainers") return `${region} 상승률 주도`;
  if (filterId === "volume") return `${region} 거래량 주도`;
  if (filterId === "etf") return `${region} ETF`;
  if (filterId === "risk") return `${region} 주의`;

  return stock.marketLabel;
}

function leaderReasonForFilter(stock: LeadingStock, filterId: LeaderFilterId, ranks: LeaderRankSet) {
  const theme = leaderTheme(stock);
  const rank = leaderRankSummaryForFilter(stock, filterId, ranks);

  if (filterId === "turnover" || filterId === "etf") {
    return `${theme} · 토스증권 ${rank} · 거래대금 ${stock.turnover}`;
  }
  if (filterId === "gainers") {
    return `${theme} · 토스증권 ${rank} · 상승률 ${leaderChangeRate(stock)}`;
  }
  if (filterId === "volume") {
    return `${theme} · 토스증권 ${rank} · 거래량 ${leaderVolumeOnly(stock)}`;
  }
  if (filterId === "risk") {
    return `${rank} · ${stock.caution}`;
  }

  return stock.reason;
}

export function MarketBoard({
  board,
  initialTab = "market",
  userLabel
}: {
  board: MarketBoardData;
  initialTab?: MarketBoardTabId;
  userLabel?: string;
}) {
  // Server render supplies the first board, so the query starts with data and
  // only takes over the periodic refresh. Refetching pauses while the tab is
  // hidden and resumes on focus, so a backgrounded tab does not poll the
  // upstream providers for nothing.
  const { data: liveBoard, isFetching: isRefreshing } = useQuery({
    queryKey: ["market-board"],
    queryFn: async () => {
      const response = await fetch("/api/market-board", { cache: "no-store" });

      if (!response.ok) throw new Error(`시장 보드 갱신 실패 (${response.status})`);

      return await response.json() as MarketBoardData;
    },
    initialData: board,
    refetchInterval: refreshIntervalMs
  });
  const [activeTab, setActiveTab] = useState<MarketBoardTabId>(initialTab);
  const [newsFilter, setNewsFilter] = useState<NewsFilterId>("all");
  const [disclosureRegion, setDisclosureRegion] = useState<DisclosureRegion>("us");
  const [disclosureFilter, setDisclosureFilter] = useState<DisclosureFilterId>("all");
  const [leaderRegion, setLeaderRegion] = useState<LeaderRegion>("us");
  const [leaderFilter, setLeaderFilter] = useState<LeaderFilterId>("turnover");
  const [selectedLeaderId, setSelectedLeaderId] = useState<string | null>(null);
  const [selectedCalendarDate, setSelectedCalendarDate] = useState(todaySeoulDate);
  const activeDescription = useMemo(() => liveBoard.tabs.find((tab) => tab.id === activeTab)?.description, [activeTab, liveBoard.tabs]);
  const sortedHeadlines = useMemo(
    () => [...liveBoard.headlineFlow].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt)),
    [liveBoard.headlineFlow]
  );
  const filteredHeadlines = sortedHeadlines.filter((item) => matchesNewsFilter(item, newsFilter));
  const marketCards = useMemo(() => {
    const byId = new Map(liveBoard.macroSnapshot.map((item) => [item.id, item]));
    const fallbackTimestamp = liveBoard.providerStatuses[0]?.checkedAt;

    return marketCardOrder.map((id) => byId.get(id) ?? fallbackMarketCard(id, fallbackTimestamp));
  }, [liveBoard.macroSnapshot, liveBoard.providerStatuses]);
  const marketSnapshotById = useMemo(() => new Map(marketCards.map((item) => [item.id, item])), [marketCards]);
  const marketTrendItems = {
    qqq: marketSnapshotById.get("nasdaq-future"),
    spy: marketSnapshotById.get("sp500-future"),
    soxx: marketSnapshotById.get("phlx-sox"),
    us10y: marketSnapshotById.get("us10y"),
    kospi: marketSnapshotById.get("kospi-day-future"),
    kosdaq: marketSnapshotById.get("kosdaq-night-future"),
    kospi200: marketSnapshotById.get("kospi-night-future"),
    usdKrw: marketSnapshotById.get("usd-krw"),
    btc: marketSnapshotById.get("btc")
  };
  const krAfterPairs = liveBoard.krAfterPairs ?? [];
  // Each session gets the themes that were strong in it. The recorded rows are
  // preferred because the live leader board only ever describes the book that
  // is open right now; the live list stands in for the regular session while
  // that is the open book, since its pool reaches names the sweep has not
  // sampled yet.
  const sessionThemeStocks = liveBoard.krSessionThemeStocks;
  const krThemeLeaders = rankedThemeGroups(
    (sessionThemeStocks?.regular?.length ?? 0) > 0 ? sessionThemeStocks!.regular : liveBoard.krLeadingStocks
  );
  const krAfterThemeLeaders = rankedThemeGroups(sessionThemeStocks?.after ?? []);
  const krHaltedStocks = liveBoard.krHaltedStocks ?? [];
  const closeBetCandidates = liveBoard.krCloseBetCandidates ?? [];
  // 정지된 대형주는 시장이 읽어야 할 사건이고 소형주는 목록입니다. 같은 크기로
  // 늘어놓으면 한화가 멈춘 것이 쉰 몇 번째 코스닥 종목과 나란히 묻힙니다.
  const notableHalts = krHaltedStocks.filter((stock) => stock.issuerType === "large-cap" || stock.issuerType === "mid-cap");
  const smallHalts = krHaltedStocks.filter((stock) => stock.issuerType !== "large-cap" && stock.issuerType !== "mid-cap");
  const usThemeLeaders = rankedThemeGroups(liveBoard.usLeadingStocks);
  const latestHeadline = useMemo(() => [...liveBoard.headlineFlow].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))[0], [liveBoard.headlineFlow]);
  const headlineSourceCount = new Set(liveBoard.headlineFlow.map((item) => item.source)).size;
  const originalLinkCount = liveBoard.headlineFlow.filter((item) => item.originalUrl && item.originalUrl !== "#").length;
  const newsProvider = liveBoard.providerStatuses.find((provider) => provider.id === "news");
  const newHeadlineCount = liveBoard.headlineFlow.filter((item) => item.isNew).length;
  const activeDisclosures = disclosureRegion === "us" ? liveBoard.usDisclosures : liveBoard.krDisclosures;
  const disclosureFilters = useMemo(() => buildDisclosureFilters(activeDisclosures), [activeDisclosures]);
  // Switching region changes which chips exist, and a chip that is no longer
  // offered must not keep filtering the list down to nothing.
  const activeDisclosureFilter = disclosureFilters.some((filter) => filter.id === disclosureFilter) ? disclosureFilter : "all";
  const filteredDisclosures = activeDisclosures.filter((item) => matchesDisclosureFilter(item, activeDisclosureFilter));
  const activeDisclosureDescription = liveBoard.disclosureTabs.find((tab) => tab.id === disclosureRegion)?.description;
  const effectiveLeaderRegion: LeaderRegion = leaderRegion === "us" && liveBoard.usLeadingStocks.length === 0 && liveBoard.krLeadingStocks.length > 0 ? "kr" : leaderRegion;
  const activeLeadingStocks = effectiveLeaderRegion === "us" ? liveBoard.usLeadingStocks : liveBoard.krLeadingStocks;
  // ETFs stay out of activeLeadingStocks and out of every ranking drawn from it:
  // KODEX 인버스 traded 1.2조 today and would have taken the top of the turnover
  // tab from the stocks the board is about. The domestic ones arrive in their own
  // list, and the US feed carries its own inside the leaders already.
  const etfLeadingStocks = effectiveLeaderRegion === "us"
    ? (liveBoard.usEtfLeaders ?? [])
    : (liveBoard.krEtfLeaders ?? []);
  // Ranked over the list being shown rather than per row, so each filter orders
  // by its own figure instead of all three sharing one number.
  const turnoverRanks = leaderRanks(activeLeadingStocks, "turnover");
  const gainerRanks = leaderRanks(activeLeadingStocks, "gainers");
  const volumeRanks = leaderRanks(activeLeadingStocks, "volume");
  const ranksFor = (filterId: LeaderFilterId) =>
    filterId === "gainers" ? gainerRanks : filterId === "volume" ? volumeRanks : turnoverRanks;
  const leaderRankSet = { gainers: gainerRanks, turnover: turnoverRanks, volume: volumeRanks };
  const membersOf = (filterId: LeaderFilterId) => filterId === "etf"
    ? etfLeadingStocks
    : activeLeadingStocks.filter((stock) => matchesLeaderFilter(stock, filterId, ranksFor(filterId)));
  /*
   * Tabs with something behind them, each carrying its count.
   *
   * 주의 is domestic by construction — the designations come from the exchange's
   * own flags and no free US feed carries an equivalent — so on the US side that
   * tab could only ever open empty. ETF was the same before the pool stopped
   * requiring a 1% move. A tab that cannot fill should not be offered.
   */
  const availableLeaderFilters = leaderFilters
    .map((filter) => ({ ...filter, count: membersOf(filter.id).length }))
    .filter((filter) => filter.count > 0);
  const activeLeaderFilter = availableLeaderFilters.some((filter) => filter.id === leaderFilter)
    ? leaderFilter
    : availableLeaderFilters[0]?.id ?? leaderFilter;
  const filteredLeadingStocks = sortLeadingStocks(membersOf(activeLeaderFilter), activeLeaderFilter);
  const leaderDataUnavailable = activeLeadingStocks.length === 0;
  const selectedLeader = filteredLeadingStocks.find((stock) => stock.id === selectedLeaderId) ?? filteredLeadingStocks[0];
  const activeLeaderDisclosures = selectedLeader?.market === "US" ? liveBoard.usDisclosures : liveBoard.krDisclosures;
  const selectedLeaderNews = selectedLeader ? relatedLeaderNews(selectedLeader, sortedHeadlines).slice(0, 8) : [];
  const selectedThemeNews = selectedLeader ? relatedThemeNews(selectedLeader, sortedHeadlines).filter((item) => !selectedLeaderNews.some((news) => news.id === item.id)).slice(0, 8) : [];
  const selectedDisclosures = selectedLeader ? relatedDisclosures(selectedLeader, activeLeaderDisclosures).slice(0, 8) : [];
  const selectedIntradayParts = selectedLeader ? intradayParts(selectedLeader.intraday) : null;
  const selectedEvidenceCount = selectedLeaderNews.length + selectedThemeNews.length + selectedDisclosures.length;
  const calendarDays = useMemo(() => buildCalendarDays(selectedCalendarDate), [selectedCalendarDate]);
  const calendarToday = useMemo(() => todaySeoulDate(), []);
  const selectedCalendarItems = liveBoard.calendarItems
    .filter((item) => item.date === selectedCalendarDate)
    .sort((left, right) => left.type.localeCompare(right.type) || left.title.localeCompare(right.title));
  const upcomingItems = upcomingCalendarItems(liveBoard.calendarItems, calendarToday);
  const secProvider = liveBoard.providerStatuses.find((provider) => provider.id === "sec");
  const newDisclosureCount = activeDisclosures.filter((item) => item.isNew).length;
  const smallCapDisclosureCount = activeDisclosures.filter((item) => item.issuerType === "small-cap" || item.issuerType === "mid-cap").length;

  return (
    <main className={styles.page}>
      <SiteHeader active="market" userLabel={userLabel} />

      <section className={styles.summary} aria-labelledby="kr-home-title">
        <div>
          <p className={styles.eyebrow}>오늘 확인할 핵심 정보</p>
          <h1 id="kr-home-title">시장의 흐름을 한 눈에 파악하세요</h1>
        </div>
        <aside className={styles.statusBox} aria-label="오늘 확인 순서">
          <div className={styles.currentTime}>
            <strong>현재 시각</strong>
            <time dateTime={liveBoard.providerStatuses[0]?.checkedAt ?? todaySeoulDate()}>
              <span>{formatDateOnly(liveBoard.providerStatuses[0]?.checkedAt)}</span>
              {formatTimeOnly(liveBoard.providerStatuses[0]?.checkedAt)}
            </time>
          </div>
          <div className={styles.checkOrder}>
            <strong>DATE 확인 순서</strong>
            <p>시장 정보를 참고용으로 제공합니다. 투자 판단과 매매 의견은 포함하지 않습니다.</p>
            <ol>
              {liveBoard.tabs.map((tab) => <li key={tab.id}>{tab.label}</li>)}
            </ol>
          </div>
        </aside>
      </section>

      <nav className={styles.tabs} aria-label="홈 탭">
        {liveBoard.tabs.map((tab) => (
          <a
            aria-pressed={activeTab === tab.id}
            data-tab={tab.id}
            href={tab.id === "market" ? "/" : `/?tab=${tab.id}`}
            key={tab.id}
            onClick={(event) => {
              event.preventDefault();
              setActiveTab(tab.id);
              window.history.replaceState(null, "", tab.id === "market" ? "/" : `/?tab=${tab.id}`);
            }}
            role="button"
          >
            {tab.label}
          </a>
        ))}
      </nav>

      <p className={styles.tabDescription}>{activeDescription}</p>

      {activeTab === "market" ? (
        <section className={styles.tabPanel} data-tab="market" aria-labelledby="market-panel-title">
          <div className={styles.sectionHeader}>
            <p className={styles.eyebrow}>시황</p>
            <h2 id="market-panel-title">시황 : 개장 전 후 참고할 시장 기준점</h2>
            <p className={styles.sectionLead}>미국 매크로와 국내 개장 기준점을 먼저 확인합니다.</p>
          </div>
          <div className={styles.macroGrid}>
            {marketCards.map((item) => (
              <article data-long-value={isLongMarketValue(item) ? "true" : undefined} data-pending={isWaitingMarketCard(item) ? "true" : undefined} data-tone={item.tone} key={item.id}>
                <strong><EnglishText text={item.label} /></strong>
                <div className={styles.marketMetricLine}>
                  <span data-change={metricChangeTone(item.value, item.tone)}>{item.value}</span>
                  {!isWaitingMarketCard(item) ? (
                    <Image alt="" aria-hidden="true" className={styles.marketTrendIcon} height={16} src={trendIconByTone[item.tone]} width={16} />
                  ) : null}
                </div>
                {/* The instrument note is dropped on purpose — "KIS 국내업종
                    현재지수", "SOX 원지수에는 선물이 없어 SOXX" — it is reference
                    material rather than a reading, and its length varied enough
                    to leave neighbouring cards misaligned. Source and time still
                    say where the number came from. */}
                <em>{displaySource(item.source)} · {formatDateTimeMinute(item.timestamp)}</em>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      {activeTab === "news" ? (
        <section className={styles.tabPanel} data-tab="news" aria-labelledby="news-panel-title">
          <div className={styles.sectionHeader}>
            <p className={styles.eyebrow}>뉴스</p>
            <h2 id="news-panel-title">뉴스 : 시간순으로 확인하는 최신 헤드라인</h2>
            <p className={styles.sectionLead}>미국 뉴스, 국내 뉴스, 테마 흐름, 헤드라인 흐름을 확인합니다.</p>
          </div>
          <section className={styles.newsSignalBar} aria-label="뉴스 확인 상태">
            <div>
              <span>최근 헤드라인</span>
              <strong>{formatDateTimeMinute(latestHeadline?.publishedAt)}</strong>
            </div>
            <div>
              <span>새 헤드라인</span>
              <strong>{newHeadlineCount}건</strong>
            </div>
            <div>
              <span>갱신 상태</span>
              <strong>{isRefreshing ? "갱신 중" : formatDateTimeMinute(newsProvider?.checkedAt)}</strong>
            </div>
          </section>
          <div className={styles.newsFilters} role="group" aria-label="뉴스 필터">
            {newsFilters.map((filter) => (
              <button aria-pressed={newsFilter === filter.id} key={filter.id} onClick={() => setNewsFilter(filter.id)} type="button">
                {filter.label} {newsFilterCount(sortedHeadlines, filter.id)}
              </button>
            ))}
          </div>
          <section className={styles.realtimeNews} aria-labelledby="headline-flow-title" aria-live="polite">
            <header>
              <div>
                <h3 id="headline-flow-title">실시간 뉴스</h3>
                <p>뉴스는 참고 사항입니다. 가격 변동의 원인으로 연결하지 않습니다.</p>
              </div>
              <span>원문 {originalLinkCount}/{liveBoard.headlineFlow.length}</span>
              <span>출처 {headlineSourceCount}개</span>
            </header>
            <div className={styles.newsTickerHeader} aria-hidden="true">
              <span>시간</span>
              <span>키워드</span>
              <span>헤드라인</span>
              <span>출처</span>
            </div>
            <ol>
              {filteredHeadlines.map((item) => (
                <li data-new={item.isNew ? "true" : undefined} key={item.id}>
                  <time>{formatDateTimeMinute(item.publishedAt)}</time>
                  <strong>{item.label}</strong>
                  <span>
                    <HeadlineLink item={item} />
                    {item.originalText ? <small>{item.originalText}</small> : null}
                    {relatedHeadlineTags(item).length > 0 ? <small>{relatedHeadlineTags(item).join(" · ")}</small> : null}
                  </span>
                  <span>{displaySource(item.source)}</span>
                </li>
              ))}
            </ol>
            {filteredHeadlines.length === 0 ? <p className={styles.emptyDisclosure}>선택한 필터에 해당하는 헤드라인이 없습니다.</p> : null}
          </section>
        </section>
      ) : null}

      {activeTab === "calendar" ? (
        <section className={styles.tabPanel} data-tab="calendar" aria-labelledby="calendar-panel-title">
          <div className={styles.sectionHeader}>
            <p className={styles.eyebrow}>일정</p>
            <h2 id="calendar-panel-title">날짜가 정해진 이벤트를 캘린더로 봅니다.</h2>
          </div>
          <div className={styles.calendarShell}>
            <header>
              <strong>{formatCalendarMonth(selectedCalendarDate)}</strong>
              <span>오늘 {formatCalendarDayLabel(calendarToday)} 기준</span>
            </header>
            <div className={styles.weekdays} aria-hidden="true">
              {weekdayLabels.map((label) => <span key={label}>{label}</span>)}
            </div>
            <div className={styles.monthGrid} role="grid" aria-label="2026년 8월 일정">
              {calendarDays.map((day, index) => {
                const events = day ? liveBoard.calendarItems.filter((item) => item.date === day.date) : [];
                const summaries = calendarDaySummary(events);

                return (
                  <button
                    aria-label={day ? `${formatCalendarDayLabel(day.date)} 일정 ${events.length}개` : "빈 날짜"}
                    aria-pressed={day?.date === selectedCalendarDate}
                    className={!day ? styles.emptyDay : undefined}
                    data-today={day?.date === calendarToday ? "true" : undefined}
                    disabled={!day}
                    key={`${index}-${day?.date ?? "empty"}`}
                    onClick={() => day ? setSelectedCalendarDate(day.date) : undefined}
                    type="button"
                  >
                    {day ? <strong>{day.day}</strong> : null}
                    {summaries.map((summary) => <span key={`${day?.date}-${summary}`}>{summary}</span>)}
                    {events.length > 0 ? <em>{events.length}건</em> : null}
                  </button>
                );
              })}
            </div>
          </div>
          {upcomingItems.length > 0 ? (
            <section className={styles.upcomingCalendar} aria-labelledby="upcoming-calendar-title">
              <h3 id="upcoming-calendar-title">다가오는 주요 일정</h3>
              <ol>
                {upcomingItems.map((item) => (
                  <li key={`${item.id}-${item.date}`}>
                    <time>{formatCalendarDayLabel(item.date)}</time>
                    <span>{item.type} · {item.market}</span>
                    <strong>{item.title}</strong>
                    <small>{calendarTimeNote(item)} · {displaySource(item.source)}</small>
                  </li>
                ))}
              </ol>
            </section>
          ) : null}
          <section className={styles.calendarDetail} aria-live="polite" aria-labelledby="calendar-detail-title">
            <span>{formatCalendarDayLabel(selectedCalendarDate)}</span>
            <h3 id="calendar-detail-title">선택한 날짜의 이벤트</h3>
            {selectedCalendarItems.length > 0 ? (
              <div className={styles.calendarEvents}>
                {selectedCalendarItems.map((item) => (
                  <article key={`${item.date}-${item.title}`}>
                    <b>{item.type} · {item.market}</b>
                    <h4>{item.title}</h4>
                    <small>{calendarTimeNote(item)} · {displaySource(item.source)} · <OriginalLink href={item.originalUrl} /></small>
                    <dl>
                      <div>
                        <dt>먼저 볼 것</dt>
                        <dd>{item.check}</dd>
                      </div>
                      <div>
                        <dt>상세 확인</dt>
                        <dd>{item.detail}</dd>
                      </div>
                    </dl>
                  </article>
                ))}
              </div>
            ) : <p className={styles.emptyCalendar}>등록된 주요 이벤트가 없습니다.</p>}
          </section>
        </section>
      ) : null}

      {activeTab === "breaking" ? (
        <section className={styles.tabPanel} data-tab="breaking" aria-labelledby="breaking-panel-title">
          <div className={styles.sectionHeader}>
            <p className={styles.eyebrow}>속보·공시</p>
            <h2 id="breaking-panel-title">공시와 속보는 원문 확인용 참고 정보로만 봅니다.</h2>
          </div>
          <div className={styles.disclosureTabs} role="group" aria-label="공시 지역 선택">
            {liveBoard.disclosureTabs.map((tab) => (
              <button aria-pressed={disclosureRegion === tab.id} key={tab.id} onClick={() => setDisclosureRegion(tab.id)} type="button">
                {tab.label}
              </button>
            ))}
          </div>
          <p className={styles.disclosureDescription}>{activeDisclosureDescription}</p>
          <section className={styles.liveDisclosureBar} aria-label="공시 갱신 상태">
            <div>
              <span>SEC 갱신</span>
              <strong>{formatDateTimeMinute(secProvider?.checkedAt)}</strong>
            </div>
            <div>
              <span>새 공시</span>
              <strong>{newDisclosureCount}건</strong>
            </div>
            <div>
              <span>중소형주</span>
              <strong>{smallCapDisclosureCount}건</strong>
            </div>
          </section>
          <div className={styles.disclosureFilters} role="group" aria-label="공시 필터">
            {disclosureFilters.map((filter) => (
              <button aria-pressed={activeDisclosureFilter === filter.id} key={filter.id} onClick={() => setDisclosureFilter(filter.id)} type="button">
                {filter.label} <b>{filter.count}</b>
              </button>
            ))}
          </div>
          <div className={styles.breakingList}>
            {filteredDisclosures.map((item) => (
              <article data-new={item.isNew ? "true" : undefined} key={item.id}>
                <header>
                  <span>{item.source} {item.formType}</span>
                  <IssuerLabel issuerType={item.issuerType} />
                  {item.isNew ? <em>NEW</em> : null}
                  <b>{item.urgency}</b>
                </header>
                <h3>{item.title}</h3>
                <p>{item.tags.join(" · ")}</p>
                <small>{formatDateTimeMinute(item.filedAt)}{item.accessionNumber ? ` · 접수 ${item.accessionNumber}` : ""} · <OriginalLink href={item.originalUrl} /></small>
                <strong>{item.action}</strong>
              </article>
            ))}
          </div>
          {filteredDisclosures.length === 0 ? <p className={styles.emptyDisclosure}>선택한 필터에 해당하는 공시가 없습니다.</p> : null}
        </section>
      ) : null}

      {activeTab === "flow" ? (
        <section className={styles.tabPanel} data-tab="flow" aria-labelledby="flow-panel-title">
          <div className={styles.sectionHeader}>
            <p className={styles.eyebrow}>수급·차트</p>
            <h2 id="flow-panel-title">거래량과 거래대금은 참고 정보로만 확인합니다.</h2>
          </div>
          <div className={styles.flowGrid}>
            {liveBoard.flowItems.map((item) => (
              <article key={item.id}>
                <strong>{item.label}</strong>
                <span>{item.status}</span>
                <p>{item.detail}</p>
              </article>
            ))}
          </div>
          <section className={styles.chartBoard} aria-labelledby="chart-board-title">
            <h3 id="chart-board-title">차트 참고 체크포인트</h3>
            <div>
              <span>추세 위치</span>
              <span>거래대금</span>
              <span>거래량 변화</span>
              <span>뉴스·공시 근거</span>
              <span>위험 구간</span>
            </div>
          </section>
          <section className={styles.leaderBoard} aria-labelledby="leader-board-title">
            <div className={styles.sectionHeader}>
              <p className={styles.eyebrow}>거래 집중 종목</p>
              <h2 id="leader-board-title">거래가 집중된 종목을 뉴스·공시 근거와 함께 확인합니다.</h2>
            </div>
            <div className={styles.leaderTabs} role="group" aria-label="시장 선택">
              {liveBoard.leaderTabs.map((tab) => (
                <button aria-pressed={effectiveLeaderRegion === tab.id} key={tab.id} onClick={() => setLeaderRegion(tab.id)} type="button">
                  {tab.label}
                </button>
              ))}
            </div>
            <section className={styles.leaderSignalBar} aria-label="거래 집중 요약">
              <div>
                <span>표시 종목</span>
                <strong>{leaderDataUnavailable ? "데이터 대기" : `${filteredLeadingStocks.length}/${activeLeadingStocks.length}`}</strong>
              </div>
              <div>
                <span>거래대금 확인</span>
                <strong>{leaderDataUnavailable ? "대기" : `${activeLeadingStocks.filter((stock) => matchesLeaderFilter(stock, "turnover", turnoverRanks)).length}개`}</strong>
              </div>
              <div>
                <span>상승률 확인</span>
                <strong>{leaderDataUnavailable ? "대기" : `${activeLeadingStocks.filter((stock) => matchesLeaderFilter(stock, "gainers", gainerRanks)).length}개`}</strong>
              </div>
              <div>
                <span>거래량 확인</span>
                <strong>{leaderDataUnavailable ? "대기" : `${activeLeadingStocks.filter((stock) => matchesLeaderFilter(stock, "volume", volumeRanks)).length}개`}</strong>
              </div>
            </section>
            <div className={styles.leaderFilterTabs} role="group" aria-label="거래 집중 필터">
              {availableLeaderFilters.map((filter) => (
                <button aria-pressed={activeLeaderFilter === filter.id} key={filter.id} onClick={() => setLeaderFilter(filter.id)} type="button">
                  {filter.label} <b>{filter.count}</b>
                </button>
              ))}
            </div>
            <div className={styles.leaderWorkspace}>
              <div>
                <div className={styles.leaderRows} role="table" aria-label="주도주 목록">
                  <div className={styles.leaderRowHeader} role="row">
                    <span>순위</span>
                    <span>종목</span>
                    <span>테마</span>
                    <span>거래대금</span>
                    <span>거래량</span>
                    <span>상승률</span>
                    <span>기준</span>
                  </div>
                  {filteredLeadingStocks.map((stock, index) => {
                    const rowNews = relatedLeaderNews(stock, sortedHeadlines);
                    const rowThemeNews = relatedThemeNews(stock, sortedHeadlines);
                    const rowDisclosures = relatedDisclosures(stock, stock.market === "US" ? liveBoard.usDisclosures : liveBoard.krDisclosures);
                    const latestNews = rowNews[0] ?? rowThemeNews[0];
                    // A theme match is a headline about the sector, not about
                    // this company - Moderna's row was showing a story on an
                    // unrelated biotech under the caption 최신 뉴스. The counts
                    // beside it already say 뉴스 0건 · 테마 1건; the caption was
                    // the only part still claiming more than it had.
                    const latestNewsLabel = rowNews[0] ? "최신 뉴스" : "테마 뉴스";
                    const rate = leaderChangeRate(stock);

                    return (
                      <article
                        aria-selected={selectedLeader?.id === stock.id}
                        data-change={changeTone(rate)}
                        key={stock.id}
                        onClick={() => setSelectedLeaderId(stock.id)}
                        role="row"
                        tabIndex={0}
                        onKeyDown={(event) => {
                          if (event.key === "Enter" || event.key === " ") {
                            event.preventDefault();
                            setSelectedLeaderId(stock.id);
                          }
                        }}
                      >
                        <span className={styles.leaderRank}>#{index + 1}</span>
                        <div className={styles.leaderName}>
                          <strong>{stock.name}</strong>
                          <small>{stock.symbol}</small>
                        </div>
                        <span className={styles.leaderTheme}>{leaderTheme(stock)}</span>
                        <strong className={styles.leaderMetric}>{stock.turnover}</strong>
                        <span className={styles.leaderMetric}>{leaderVolumeOnly(stock)}</span>
                        {sessionRatePair(stock) ? (
                          <div className={styles.leaderSessionRates}>
                            {sessionRatePair(stock)!.map((session) => (
                              <span key={session.label} title={`${session.label} ${session.hours}`}>
                                <small>{session.label}</small>
                                <strong data-change={changeTone(signedPercent(session.value))}>{signedPercent(session.value)}</strong>
                              </span>
                            ))}
                          </div>
                        ) : (
                          <strong className={styles.leaderRate} data-change={changeTone(rate)}>{rate}</strong>
                        )}
                        <div className={styles.leaderReason}>
                          <span>{leaderSignalForFilter(stock, activeLeaderFilter)}</span>
                          <small>{rowNews.length + rowThemeNews.length + rowDisclosures.length > 0 ? `뉴스 ${rowNews.length}건 · 테마 ${rowThemeNews.length}건 · 공시 ${rowDisclosures.length}건` : "토스증권 랭킹 데이터"}</small>
                          {latestNews ? <small>{latestNewsLabel}: {latestNews.text}</small> : <small>{leaderReasonForFilter(stock, activeLeaderFilter, leaderRankSet)}</small>}
                          <em>{rowNews.length + rowThemeNews.length + rowDisclosures.length > 0 ? "뉴스·공시 원문 확인 가능" : "뉴스·공시 매칭 대기"}</em>
                        </div>
                      </article>
                    );
                  })}
                </div>
                {filteredLeadingStocks.length === 0 ? (
                  <p className={styles.emptyDisclosure}>
                    {leaderDataUnavailable ? "주도주 provider가 응답하지 않았습니다. 상단 데이터 연결 상태를 확인해주세요." : "선택한 필터에 해당하는 종목이 없습니다."}
                  </p>
                ) : null}
              </div>
              {selectedLeader ? (
                <section className={styles.leaderInsightPanel} aria-labelledby="leader-insight-title">
                  <header>
                    <div>
                      <span>{leaderSignalForFilter(selectedLeader, activeLeaderFilter)}</span>
                      <h3 id="leader-insight-title">{selectedLeader.name} 랭킹 근거</h3>
                      <p>{leaderReasonForFilter(selectedLeader, activeLeaderFilter, leaderRankSet)}</p>
                    </div>
                    <strong>{selectedEvidenceCount > 0 ? `뉴스 ${selectedLeaderNews.length} · 테마 ${selectedThemeNews.length} · 공시 ${selectedDisclosures.length}` : "토스 랭킹만 수신"}</strong>
                  </header>
                  <div className={styles.leaderInsightGrid}>
                    <article>
                      <h4>관련 뉴스</h4>
                      {selectedLeaderNews.length > 0 ? (
                        <ol>
                          {selectedLeaderNews.slice(0, 4).map((item) => (
                            <li key={item.id}>
                              <b>{headlineCauseLabel(item)} · {item.source} · {formatDateTimeMinute(item.publishedAt)}</b>
                              <HeadlineLink item={item} />
                            </li>
                          ))}
                        </ol>
                      ) : <p>직접 연결된 종목 뉴스가 없습니다.</p>}
                    </article>
                    <article>
                      <h4>관련 공시</h4>
                      {selectedDisclosures.length > 0 ? (
                        <ol>
                          {selectedDisclosures.slice(0, 4).map((item) => (
                            <li key={item.id}>
                              <b>{item.source} {item.formType} · {formatDateTimeMinute(item.filedAt)}</b>
                              <span>{item.title}</span>
                              <OriginalLink href={item.originalUrl} />
                            </li>
                          ))}
                        </ol>
                      ) : <p>매칭된 공시는 없습니다.</p>}
                    </article>
                    <article>
                      <h4>테마 뉴스</h4>
                      {selectedThemeNews.length > 0 ? (
                        <ol>
                          {selectedThemeNews.slice(0, 4).map((item) => (
                            <li key={item.id}>
                              <b>{item.source} · {formatDateTimeMinute(item.publishedAt)}</b>
                              <HeadlineLink item={item} />
                            </li>
                          ))}
                        </ol>
                      ) : <p>{leaderTheme(selectedLeader)} 테마 뉴스가 없습니다.</p>}
                    </article>
                    <article>
                      <h4>랭킹 기준</h4>
                      <dl>
                        <div>
                          <dt>거래대금</dt>
                          <dd>{selectedLeader.turnover}</dd>
                        </div>
                        <div>
                          <dt>거래량</dt>
                          <dd>{leaderVolumeOnly(selectedLeader)}</dd>
                        </div>
                        <div>
                          <dt>현재 위치</dt>
                          <dd className={styles.leaderIntradayBadges}>
                            <span>{selectedIntradayParts?.price}</span>
                            {selectedIntradayParts?.change ? (
                              <span data-change={metricChangeTone(selectedIntradayParts.change)}>
                                {selectedIntradayParts.change}
                              </span>
                            ) : null}
                          </dd>
                        </div>
                      </dl>
                      <p>{selectedLeader.caution}</p>
                    </article>
                  </div>
                </section>
              ) : null}
            </div>
          </section>
        </section>
      ) : null}

      <div className={styles.adGrid}>
        <AdSlot label={liveBoard.adSlots.find((slot) => slot.id === "top")?.label ?? "상단 광고 영역"} />
        <AdSlot label={liveBoard.adSlots.find((slot) => slot.id === "middle")?.label ?? "중단 광고 영역"} />
      </div>
      {activeTab === "trade" ? (
        <section className={styles.tabPanel} data-tab="trade" aria-labelledby="trade-panel-title">
          <div className={styles.sectionHeader}>
            <p className={styles.eyebrow}>매매참고</p>
            <h2 id="trade-panel-title">주도주와 테마, 아직 따라오지 않은 자리를 함께 봅니다.</h2>
            <p className={styles.sectionLead}>시황을 확인한 뒤 실제로 무엇을 볼지 좁히는 화면입니다. 예측이 아니라 간격과 근거입니다.</p>
          </div>
          <div className={styles.marketTrendDetails}>
              {/* 주도주 comes before 강세 테마: the day's concentration is read
                  first, and the theme list answers what moved with it. */}
              <div className={styles.themeAnalysisGrid}>
                <DayLeaders
                  emptyMessage={leaderUnavailableMessage(liveBoard, "KR")}
                  label="시황 · 국내 주도주"
                  leaders={liveBoard.krDayLeaders ?? []}
                />
                <DayLeaders
                  emptyMessage={leaderUnavailableMessage(liveBoard, "US")}
                  label="미국 주도주"
                  leaders={liveBoard.usDayLeaders ?? []}
                />
              </div>
              {/* 짝꿍매매 sits between the two lists it is derived from and
                  belongs to neither. 주도주 ranks the turnover top of the
                  market; a 짝꿍 is smaller than the stock it follows and is
                  almost never in that ranking, so it needs its own row. */}
              <div className={`${styles.pairTradeRow} ${krAfterPairs.length > 0 ? styles.pairTradeRowSplit : ""}`}>
                <PairTrades
                  emptyMessage={leaderUnavailableMessage(liveBoard, "KR")}
                  label="시황 · 국내 짝꿍매매 · 정규장 09:00–15:30"
                  pairs={liveBoard.krPairTrades ?? []}
                />
                {/* The NXT evening, which is a different book with different
                    liquidity — so it is a separate panel rather than more rows.
                    Hidden until 15:40, when there is an evening to describe. */}
                {krAfterPairs.length > 0 ? (
                  <PairTrades
                    label="시황 · 국내 짝꿍매매 · NXT 애프터마켓 15:40–20:00"
                    pairs={krAfterPairs}
                  />
                ) : null}
              </div>
              {/* 거래정지, and it reads before the theme lists rather than
                  after them. A halted stock has no turnover, so it is in no
                  ranking and the board could not show one at all — and it is
                  the one thing on this page you must not learn about after
                  buying. Risk comes before opportunity, and this is the only
                  panel on the board wearing red so it is found without being
                  looked for. */}
              {krHaltedStocks.length > 0 ? (
                <article className={styles.haltPanel}>
                  <span>매매참고 · 거래정지</span>
                  <div>
                    <p className={styles.haltLead}>
                      <b>{krHaltedStocks.length}종목</b>
                      {/* 두 조각으로 나눕니다. 한 문장으로 두면 360px에서
                          날짜가 "2026-08-" / "21 기준"으로 잘립니다. */}
                      <em>해제 전까지 매수·매도가 모두 막힙니다</em>
                      <em>{krHaltedStocks[0]?.sessionDate} 기준</em>
                    </p>
                    {/* 대형·중형만 카드로. 정지된 대형주는 시장 전체가 읽어야 할
                        사건이고, 소형주 쉰 몇 개를 같은 크기로 늘어놓으면 그 둘을
                        오히려 덮습니다. */}
                    {notableHalts.length > 0 ? (
                      <ul className={styles.haltCards}>
                        {notableHalts.map((stock) => (
                          <li key={stock.id} data-size={stock.issuerType}>
                            <strong>{stock.name}</strong>
                            <b>{issuerSizeLabels[stock.issuerType] ?? "규모 미상"}</b>
                            <span>시총 {formatKrwSize(stock.marketCapValue)}</span>
                            {/* 사유는 공시가 걸린 종목에만 있습니다. 없는 자리에
                                "사유 미상"을 적으면 모르는 것을 아는 척하는 줄이
                                한 줄 더 늘 뿐입니다. */}
                            {stock.haltReason ? <i>{stock.haltReason}</i> : null}
                            <small>{stock.symbol} · {stock.market}{stock.haltedAt ? ` · ${formatDateOnly(stock.haltedAt)} 공시` : ""}</small>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                    {smallHalts.length > 0 ? (
                      <details className={styles.haltRest}>
                        <summary>소형주 {smallHalts.length}종목 더 보기</summary>
                        <ul>
                          {smallHalts.map((stock) => (
                            <li key={stock.id}>
                              <strong>{stock.name}</strong>
                              <span>{formatKrwSize(stock.marketCapValue)}</span>
                              <small>{stock.symbol} · {stock.market}</small>
                            </li>
                          ))}
                        </ul>
                      </details>
                    ) : null}
                  </div>
                </article>
              ) : null}
              <div className={styles.themeAnalysisGrid}>
                <article className={styles.themeSection}>
                  <span>시황 · 국내 강세 테마 · 정규장 09:00–15:30</span>
                  <div>
                    <h3>
                      정규장 강세 테마는 1위 {themeRankLabel(krThemeLeaders, 0)},<br />
                      2위 {themeRankLabel(krThemeLeaders, 1)},<br />
                      3위 {themeRankLabel(krThemeLeaders, 2)}입니다.
                    </h3>
                    <strong>국내 강세 테마 · 정규장 · 거래대금순위</strong>
                    <ol>
                      {krThemeLeaders.map((group, index) => (
                        <li key={group.theme}>
                          <ThemeGroupRow group={group} nameOf={(stock) => stock.name} rankIndex={index} />
                        </li>
                      ))}
                    </ol>
                    {krThemeLeaders.length === 0 ? <p className={styles.emptyDisclosure}>{themeUnavailableMessage(liveBoard, "KR")}</p> : null}
                  </div>
                </article>
                {/* The evening is a different book with different liquidity, so
                    it gets its own panel rather than replacing the day's. Hidden
                    until 15:40, when there is an evening to describe. */}
                {krAfterThemeLeaders.length > 0 ? (
                  <article className={styles.themeSection}>
                    <span>시황 · 국내 강세 테마 · NXT 애프터마켓 15:40–20:00</span>
                    <div>
                      <h3>
                        애프터마켓 강세 테마는 1위 {themeRankLabel(krAfterThemeLeaders, 0)},<br />
                        2위 {themeRankLabel(krAfterThemeLeaders, 1)},<br />
                        3위 {themeRankLabel(krAfterThemeLeaders, 2)}입니다.
                      </h3>
                      <strong>국내 강세 테마 · NXT 애프터마켓 · 거래대금순위</strong>
                      <ol>
                        {krAfterThemeLeaders.map((group, index) => (
                          <li key={group.theme}>
                            <ThemeGroupRow group={group} nameOf={(stock) => stock.name} rankIndex={index} />
                          </li>
                        ))}
                      </ol>
                    </div>
                  </article>
                ) : null}
                <article className={styles.themeSection}>
                  <span>미국 강세 테마</span>
                  <div>
                    <h3>
                      금일 강세 테마는 1위 {themeRankLabel(usThemeLeaders, 0)},<br />
                      2위 {themeRankLabel(usThemeLeaders, 1)},<br />
                      3위 {themeRankLabel(usThemeLeaders, 2)}입니다.
                    </h3>
                    <strong>미국 강세 테마</strong>
                    <ol>
                      {usThemeLeaders.map((group, index) => (
                        <li key={group.theme}>
                          <ThemeGroupRow group={group} nameOf={(stock) => stock.symbol} rankIndex={index} />
                        </li>
                      ))}
                    </ol>
                    {usThemeLeaders.length === 0 ? <p className={styles.emptyDisclosure}>{themeUnavailableMessage(liveBoard, "US")}</p> : null}
                  </div>
                </article>
              </div>
              {/* 종가배팅 후보. 조건은 50만 종목-밤에서 골라낸 것이고, 행마다
                  그 등급이 과거에 실제로 어땠는지를 답니다 — 숫자 없이 종목만
                  늘어놓으면 추천으로 읽히기 때문입니다. 앞세우는 값이 승률이
                  아니라 초과폭인 것도 측정이 그렇게 말해서입니다. */}
              {closeBetCandidates.length > 0 ? (
                <article className={styles.themeSection}>
                  <span>매매참고 · 종가배팅 후보 · {closeBetCandidates[0]?.sessionDate} 종가</span>
                  <div>
                    <h3>
                      오늘 조건을 만족한 종목은 {closeBetCandidates.length}개입니다.<br />
                      종가 매수 · 익일 시가 매도를 기준으로 잰 값입니다.
                    </h3>
                    <strong>60일 고점 돌파 직후 · 윗꼬리 30% 미만 · 당일 10%↑ · 거래량 2배↑</strong>
                    <ol>
                      {closeBetCandidates.map((candidate) => (
                        <li key={candidate.id}>
                          <b>{candidate.name}</b>
                          <span>{candidate.tier}등급 · 당일 +{candidate.changeRateValue.toFixed(2)}%</span>
                          <span>거래량 {candidate.volumeRatio}배 · 고점 +{candidate.breakMargin}% 돌파</span>
                          {candidate.measured ? (
                            <i>
                              같은 조건 과거 {candidate.measured.samples.toLocaleString("ko-KR")}건 ·
                              시장 평균보다 {candidate.measured.excessMean >= 0 ? "+" : ""}
                              {candidate.measured.excessMean.toFixed(2)}%p ·
                              평균 상회 {Math.round(candidate.measured.beatRate * 100)}% ·
                              갭상승 {Math.round(candidate.measured.gapUpRate * 100)}%
                            </i>
                          ) : null}
                        </li>
                      ))}
                    </ol>
                    {/* 밤은 예측하지 않습니다. 예측할 수도 없으니 숫자에 섞지 않고
                        옆에 적어 둡니다. */}
                    <p className={styles.closeBetCaveat}>
                      위 숫자는 <b>그날 밤 시장 평균 갭을 뺀 초과분</b>입니다. 밤 자체는 예측 대상이 아닙니다 —
                      미국 증시가 무너지거나 전쟁이 나면 조건과 무관하게 전 종목이 갭하락합니다.
                      {marketTrendItems.qqq ? ` 현재 NASDAQ 100 선물 ${marketChangeLabel(marketTrendItems.qqq)}.` : ""}
                    </p>
                  </div>
                </article>
              ) : null}
              {/* 급등 후보 reads last and alone. Every list above it is in the
                  past tense — what led, what rose, what was strong — and this
                  one is the only forward-looking list on the board, so it does
                  not share a row with them. */}
              <div className={styles.surgeCandidateRow}>
                <SurgeCandidates
                  candidates={liveBoard.usSurgeCandidates ?? []}
                  emptyMessage="미국 일봉 이력이 쌓이면 급등 후보가 계산됩니다."
                  label="미국 급등 후보"
                  movers={liveBoard.usPremarketMovers ?? []}
                />
              </div>
          </div>
        </section>
      ) : null}
      {activeTab === "market" ? (
        <>
          <section className={`${styles.tabPanel} ${styles.marketFlowPanel}`} data-tab="market-flow" aria-labelledby="market-flow-title">
            <div className={styles.sectionHeader}>
              <p className={styles.eyebrow}>시황 흐름</p>
              <h2 id="market-flow-title">시황 : 개장 전 후 참고할 흐름</h2>
              <p className={styles.sectionLead}>미국 매크로와 국내 개장 기준점을 먼저 확인합니다.</p>
            </div>
            <div className={styles.marketTrendDetails}>
              <div className={styles.trendSectionGrid}>
                <article className={styles.trendContent}>
                  <span>미국시황</span>
                  <div>
                    <h3>
                      <EnglishText text={marketTrendItems.qqq?.label ?? "NASDAQ 100 ETF"} />{" "}
                      <b data-tone={marketTrendItems.qqq?.tone}>{marketChangeLabel(marketTrendItems.qqq)}</b>
                      <br />
                      <EnglishText text={marketTrendItems.spy?.label ?? "S&P 500 ETF"} />{" "}
                      <b data-tone={marketTrendItems.spy?.tone}>{marketChangeLabel(marketTrendItems.spy)}</b> 흐름입니다
                    </h3>
                    <ul>
                      <li>반도체 기준 <EnglishText text={marketTrendItems.soxx?.symbol ?? "SOXX"} /> <b data-tone={marketTrendItems.soxx?.tone}>{marketChangeLabel(marketTrendItems.soxx)}</b></li>
                      <li>10년물 {marketTrendItems.us10y?.value ?? "확인 중"} · <b data-tone={marketTrendItems.us10y?.tone}>{marketChangeLabel(marketTrendItems.us10y)}</b></li>
                      <li>지수·상품은 실제 선물이며 <EnglishText text="CME" /> 기준 10분 지연입니다.</li>
                    </ul>
                  </div>
                </article>
                <article className={styles.trendContent}>
                  <span>국내시황</span>
                  <div>
                    <h3>
                      <EnglishText text="KOSPI" /> <b data-tone={marketTrendItems.kospi?.tone}>{marketChangeLabel(marketTrendItems.kospi)}</b>
                      <br />
                      <EnglishText text="KOSDAQ" /> <b data-tone={marketTrendItems.kosdaq?.tone}>{marketChangeLabel(marketTrendItems.kosdaq)}</b> 흐름입니다
                    </h3>
                    <ul>
                      <li><EnglishText text={marketTrendItems.kospi?.label ?? "KOSPI"} /> {marketTrendItems.kospi?.value ?? "확인 중"} · <b data-tone={marketTrendItems.kospi?.tone}>{marketChangeLabel(marketTrendItems.kospi)}</b></li>
                      <li><EnglishText text={marketTrendItems.kospi200?.label ?? "KOSPI200"} /> {marketTrendItems.kospi200?.value ?? "확인 중"} · <b data-tone={marketTrendItems.kospi200?.tone}>{marketChangeLabel(marketTrendItems.kospi200)}</b></li>
                      <li><EnglishText text={marketTrendItems.kosdaq?.label ?? "KOSDAQ"} /> {marketTrendItems.kosdaq?.value ?? "확인 중"} · <b data-tone={marketTrendItems.kosdaq?.tone}>{marketChangeLabel(marketTrendItems.kosdaq)}</b></li>
                    </ul>
                  </div>
                </article>
                <article className={styles.trendContent}>
                  <span>환율 시황</span>
                  <div>
                    <h3>
                      원/달러 <b data-tone="flat">{marketTrendItems.usdKrw?.value ?? "확인 중"}</b>
                      <br />
                      <EnglishText text="BTC" /> <b data-tone={marketTrendItems.btc?.tone}>{marketChangeLabel(marketTrendItems.btc)}</b> 기준입니다
                    </h3>
                    <ul>
                      <li>{marketTrendItems.usdKrw?.note ?? "Frankfurter 기준"}</li>
                      <li><EnglishText text="CoinGecko BTC/USD" /> 24시간 변화</li>
                      <li>국내 개장 전 수출주와 위험선호 참고값으로만 봅니다.</li>
                    </ul>
                  </div>
                </article>
              </div>
            </div>
          </section>
          <div className={styles.adGrid}>
            <AdSlot label={liveBoard.adSlots.find((slot) => slot.id === "bottom")?.label ?? "하단 광고 영역"} />
            <AdSlot label="말단 광고 영역" />
          </div>
        </>
      ) : null}
      <ProviderStatusStrip board={liveBoard} />
      <footer className={styles.siteFooter}>
        <strong aria-label="DATE">
          <DateLogo />
        </strong>
        <span>copyright(c) DATE All rights reserved</span>
      </footer>
    </main>
  );
}
