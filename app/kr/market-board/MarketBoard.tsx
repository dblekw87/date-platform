"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { SiteHeader } from "../../_components/SiteHeader";
import styles from "../../page.module.scss";
import type { DisclosureRegion, LeaderRegion, MarketBoardData, MarketBoardTabId } from "./types";

const refreshIntervalMs = 60_000;

type DisclosureFilterId = "all" | "new" | "small-cap" | "ma" | "sale" | "issuance";
type LeaderFilterId = "turnover" | "gainers" | "volume" | "etf" | "risk";
type NewsFilterId = "all" | "us" | "kr" | "theme" | "macro";
type LeadingStock = MarketBoardData["usLeadingStocks"][number];
type MarketSnapshot = MarketBoardData["macroSnapshot"][number];
type Headline = MarketBoardData["headlineFlow"][number];
type Disclosure = MarketBoardData["usDisclosures"][number];
type CalendarEvent = MarketBoardData["calendarItems"][number];

const disclosureFilters: Array<{ id: DisclosureFilterId; label: string }> = [
  { id: "all", label: "전체" },
  { id: "new", label: "새 공시" },
  { id: "small-cap", label: "소형주" },
  { id: "ma", label: "인수합병" },
  { id: "sale", label: "매각" },
  { id: "issuance", label: "증자·지분" }
];

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

const weekdayLabels = ["월", "화", "수", "목", "금", "토", "일"];
const marketCardOrder = [
  "nasdaq-future",
  "sp500-future",
  "phlx-sox",
  "kospi-day-future",
  "kospi-night-future",
  "wti",
  "kosdaq-night-future",
  // "russell-future",
  "gold",
  "usd-krw",
  "btc",
  // "vix",
  "us10y"
];
const trendIconByTone = {
  up: "/market-board/trend-up.svg",
  down: "/market-board/trend-down.svg",
  flat: "/market-board/trend-flat.svg"
} satisfies Record<MarketBoardData["macroSnapshot"][number]["tone"], string>;
const rankIcons = ["/market-board/rank-a.svg", "/market-board/rank-b.svg", "/market-board/rank-c.svg"];
const marketCardFallbacks: Record<string, Pick<MarketSnapshot, "label" | "market" | "instrumentType" | "symbol" | "note" | "source">> = {
  "nasdaq-future": { label: "NASDAQ 100 ETF", market: "US", instrumentType: "future", symbol: "QQQ", note: "NASDAQ 선물 대체 확인용 ETF", source: "market" },
  "sp500-future": { label: "S&P 500 ETF", market: "US", instrumentType: "future", symbol: "SPY", note: "S&P 500 선물 대체 확인용 ETF", source: "market" },
  "phlx-sox": { label: "반도체 ETF", market: "US", instrumentType: "index", symbol: "SOXX", note: "SOX 원지수 대체 확인용 반도체 ETF", source: "market" },
  "kospi-day-future": { label: "KOSPI", market: "KR", instrumentType: "index", symbol: "KOSPI", note: "KIS 국내업종 현재지수", source: "kis" },
  "kospi-night-future": { label: "KOSPI200", market: "KR", instrumentType: "index", symbol: "KOSPI200", note: "KIS 국내업종 현재지수", source: "kis" },
  wti: { label: "WTI ETF", market: "GLOBAL", instrumentType: "commodity", symbol: "USO", note: "WTI 선물 대체 확인용 ETF", source: "market" },
  "kosdaq-night-future": { label: "KOSDAQ", market: "KR", instrumentType: "index", symbol: "KOSDAQ", note: "KIS 국내업종 현재지수", source: "kis" },
  "russell-future": { label: "RUSSELL 2000 선물", market: "US", instrumentType: "future", symbol: "RTY", note: "미국 중소형주 기준", source: "market" },
  gold: { label: "금 ETF", market: "GLOBAL", instrumentType: "commodity", symbol: "GLD", note: "금선물 대체 확인용 ETF", source: "market" },
  "usd-krw": { label: "원/달러 환율", market: "KR", instrumentType: "fx", symbol: "USD/KRW", note: "Frankfurter 기준", source: "market" },
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
  const mondayOffset = (firstDate.getUTCDay() + 6) % 7;
  const cellCount = Math.ceil((mondayOffset + lastDay) / 7) * 7;

  return Array.from({ length: cellCount }, (_, index) => {
    const day = index - mondayOffset + 1;

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
    <a href={href} rel="noreferrer" target="_blank">
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

function displayMarketNote(note: string) {
  return note.replace(/^KIS\s+/i, "");
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

function IssuerLabel({ issuerType }: { issuerType?: "large-cap" | "small-cap" | "unknown" }) {
  if (issuerType === "small-cap") {
    return <span>소형주</span>;
  }

  if (issuerType === "large-cap") {
    return <span>대형주</span>;
  }

  return null;
}

function matchesDisclosureFilter(item: MarketBoardData["usDisclosures"][number], filterId: DisclosureFilterId) {
  const eventType = item.eventType ?? "";
  const labelText = `${item.urgency} ${item.formType} ${item.title} ${item.tags.join(" ")} ${eventType}`;

  if (filterId === "new") return Boolean(item.isNew);
  if (filterId === "small-cap") return item.issuerType === "small-cap";
  if (filterId === "ma") return /M&A|인수|합병|merger|acquisition|business combination|tender offer/i.test(labelText);
  if (filterId === "sale") return /매각|자산처분|disposition|asset sale|sale of assets|divestiture/i.test(labelText);
  if (filterId === "issuance") return /증자|발행|지분|13D|13G|S-1|424B/i.test(labelText);

  return true;
}

function matchesLeaderFilter(stock: LeadingStock, filterId: LeaderFilterId) {
  const labelText = `${stock.burst} ${stock.turnover} ${stock.intraday} ${stock.reason} ${stock.caution}`;
  const etf = isEtfLeader(stock);

  if (filterId === "gainers") {
    const rank = leaderRankFor(stock, "gainers");

    return rank !== null && rank <= 30;
  }
  if (filterId === "turnover") {
    const rank = leaderRankFor(stock, "turnover");

    return rank !== null && rank <= 30;
  }
  if (filterId === "volume") {
    const rank = leaderRankFor(stock, "volume");

    return rank !== null && rank <= 30;
  }
  if (filterId === "etf") return etf;
  if (filterId === "risk") return /거래정지|정리매매|관리종목|투자경고|투자위험|단기과열|상장폐지|상장상태|VI 발동|변동성완화/i.test(labelText);

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

function leaderTheme(stock: LeadingStock) {
  const [theme] = stock.reason.split(" · ");

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
    /(^|\s)(KODEX|TIGER|ACE|RISE|SOL|PLUS|HANARO|KOSEF|KBSTAR|ARIRANG|TIMEFOLIO|히어로즈|마이티|HK)|ETF|ETN|인버스|레버리지|채권|회사채|국고채|액티브|Nifty|TOP10/i.test(`${stock.name} ${stock.reason}`);
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

function isThemeLeaderCandidate(stock: LeadingStock) {
  return !isEtfLeader(stock);
}

/**
 * Groups the leaders by theme instead of keeping one stock per theme.
 *
 * A theme usually leads with more than one name, and which names those are is
 * the point — so each theme carries its full membership, ordered by the ranking
 * it arrived in, for the accordion to reveal.
 */
function rankedThemeGroups(stocks: LeadingStock[]) {
  const byTheme = new Map<string, LeadingStock[]>();

  stocks.filter(isThemeLeaderCandidate).forEach((stock) => {
    const theme = leaderTheme(stock);

    byTheme.set(theme, [...(byTheme.get(theme) ?? []), stock]);
  });

  return [...byTheme.entries()]
    .map(([theme, members]) => ({ theme, members }))
    .slice(0, 3);
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
  const [lead, ...rest] = group.members;
  // The count sits beside the theme so the turnover figures stay right-aligned
  // across rows whether or not a theme can expand.
  const row = (badge?: React.ReactNode) => (
    <>
      <Image alt="" aria-hidden="true" height={20} src={rankIcons[rankIndex] ?? rankIcons[2]} width={20} />
      <span><EnglishText text={group.theme} /></span>
      {badge}
      <i />
      <small>{nameOf(lead)}</small>
      <b>{lead.turnover}</b>
    </>
  );

  if (rest.length === 0) return row();

  return (
    <details className={styles.themeGroup}>
      <summary>
        {row(<em>{group.members.length}종목</em>)}
      </summary>
      <ol className={styles.themeMembers}>
        {group.members.map((stock, index) => (
          <li key={stock.id}>
            <em>{index + 1}등주</em>
            <span><EnglishText text={nameOf(stock)} /></span>
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

function isWaitingMarketCard(item: MarketSnapshot) {
  return item.value === "대기" || item.value === "확인 대기";
}

function isLongMarketValue(item: MarketSnapshot) {
  return item.value.length >= 7;
}

function intradayParts(value: string) {
  const [pricePart, changePart] = value.split(/\s*·\s*/);

  return {
    price: pricePart?.trim() || value,
    change: changePart?.trim() || ""
  };
}

function leaderVolumeOnly(stock: LeadingStock) {
  return stock.burst
    .replace(/상한가 도달\s*·\s*/g, "")
    .replace(/\s*·\s*[+-]\d+(?:\.\d+)?%/g, "")
    .replace(/\s*[+-]\d+(?:\.\d+)?%/g, "")
    .trim();
}

function leaderRankFor(stock: LeadingStock, filterId: Extract<LeaderFilterId, "turnover" | "gainers" | "volume">) {
  const patterns = {
    turnover: /(?:거래대금|거래대금순위) #(\d+)/i,
    gainers: /상승률 #(\d+)/i,
    volume: /거래량 #(\d+)/i
  };
  const match = `${stock.marketLabel} ${stock.reason}`.match(patterns[filterId]);

  return match?.[1] ? Number(match[1]) : null;
}

function sortLeadingStocks(stocks: MarketBoardData["usLeadingStocks"], filterId: LeaderFilterId) {
  if (filterId !== "turnover" && filterId !== "gainers" && filterId !== "volume" && filterId !== "etf") return stocks;

  return [...stocks].sort((left, right) => {
    const rankFilter = filterId === "etf" ? "turnover" : filterId;
    const leftRank = leaderRankFor(left, rankFilter) ?? 999;
    const rightRank = leaderRankFor(right, rankFilter) ?? 999;

    return leftRank - rightRank;
  });
}

function normalizeForMatch(value: string) {
  return value.toLowerCase().replace(/\s+/g, "");
}

function stockNameAliases(stock: LeadingStock) {
  const aliases = new Set([
    stock.name,
    stock.name.replace(/\s+(inc\.?|corporation|corp\.?|ltd\.?|plc|co\.?)$/i, ""),
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

  const text = normalizeForMatch(`${item.source} ${item.label} ${item.text} ${item.originalText ?? ""}`);

  return stockNameAliases(stock).some((alias) => {
    if (/^\d+$/.test(alias) && alias.length < 5) return false;

    return text.includes(normalizeForMatch(alias));
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
  const aliases = stockNameAliases(stock).map(normalizeForMatch);

  return disclosures.filter((item) => {
    const text = normalizeForMatch(`${item.symbol ?? ""} ${item.companyName ?? ""} ${item.title} ${item.tags.join(" ")} ${item.eventType ?? ""}`);

    return item.symbol === stock.symbol || aliases.some((alias) => alias && text.includes(alias));
  });
}

function leaderRankSummary(stock: LeadingStock) {
  return [
    leaderRankFor(stock, "turnover") ? `거래대금 #${leaderRankFor(stock, "turnover")}` : null,
    leaderRankFor(stock, "gainers") ? `상승률 #${leaderRankFor(stock, "gainers")}` : null,
    leaderRankFor(stock, "volume") ? `거래량 #${leaderRankFor(stock, "volume")}` : null
  ].filter(Boolean).join(" · ");
}

function leaderRankSummaryForFilter(stock: LeadingStock, filterId: LeaderFilterId) {
  if (filterId === "turnover") return leaderRankFor(stock, "turnover") ? `거래대금 #${leaderRankFor(stock, "turnover")}` : "거래대금 순위";
  if (filterId === "gainers") return leaderRankFor(stock, "gainers") ? `상승률 #${leaderRankFor(stock, "gainers")}` : "상승률 순위";
  if (filterId === "volume") return leaderRankFor(stock, "volume") ? `거래량 #${leaderRankFor(stock, "volume")}` : "거래량 순위";
  if (filterId === "etf") return leaderRankFor(stock, "turnover") ? `ETF 거래대금 #${leaderRankFor(stock, "turnover")}` : "ETF";

  return leaderRankSummary(stock) || "주의";
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

function leaderReasonForFilter(stock: LeadingStock, filterId: LeaderFilterId) {
  const theme = leaderTheme(stock);
  const rank = leaderRankSummaryForFilter(stock, filterId);

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
  const [liveBoard, setLiveBoard] = useState(board);
  const [isRefreshing, setIsRefreshing] = useState(false);
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
  const krThemeLeaders = rankedThemeGroups(liveBoard.krLeadingStocks);
  const usThemeLeaders = rankedThemeGroups(liveBoard.usLeadingStocks);
  const latestHeadline = useMemo(() => [...liveBoard.headlineFlow].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))[0], [liveBoard.headlineFlow]);
  const headlineSourceCount = new Set(liveBoard.headlineFlow.map((item) => item.source)).size;
  const originalLinkCount = liveBoard.headlineFlow.filter((item) => item.originalUrl && item.originalUrl !== "#").length;
  const newsProvider = liveBoard.providerStatuses.find((provider) => provider.id === "news");
  const newHeadlineCount = liveBoard.headlineFlow.filter((item) => item.isNew).length;
  const activeDisclosures = disclosureRegion === "us" ? liveBoard.usDisclosures : liveBoard.krDisclosures;
  const filteredDisclosures = activeDisclosures.filter((item) => matchesDisclosureFilter(item, disclosureFilter));
  const activeDisclosureDescription = liveBoard.disclosureTabs.find((tab) => tab.id === disclosureRegion)?.description;
  const effectiveLeaderRegion: LeaderRegion = leaderRegion === "us" && liveBoard.usLeadingStocks.length === 0 && liveBoard.krLeadingStocks.length > 0 ? "kr" : leaderRegion;
  const activeLeadingStocks = effectiveLeaderRegion === "us" ? liveBoard.usLeadingStocks : liveBoard.krLeadingStocks;
  const filteredLeadingStocks = sortLeadingStocks(activeLeadingStocks.filter((stock) => matchesLeaderFilter(stock, leaderFilter)), leaderFilter);
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
  const smallCapDisclosureCount = activeDisclosures.filter((item) => item.issuerType === "small-cap").length;

  useEffect(() => {
    let ignore = false;
    let timeoutId: ReturnType<typeof setTimeout> | undefined;

    async function refreshBoard() {
      if (document.visibilityState !== "visible") {
        timeoutId = setTimeout(refreshBoard, refreshIntervalMs);
        return;
      }

      setIsRefreshing(true);

      try {
        const response = await fetch("/api/market-board", { cache: "no-store" });

        if (!response.ok) return;

        const nextBoard = await response.json() as MarketBoardData;

        if (!ignore) setLiveBoard(nextBoard);
      } finally {
        if (!ignore) {
          setIsRefreshing(false);
          timeoutId = setTimeout(refreshBoard, refreshIntervalMs);
        }
      }
    }

    void refreshBoard();

    return () => {
      ignore = true;
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

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
                <small>{displayMarketNote(item.note)}</small>
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
              <span>소형주 포함</span>
              <strong>{smallCapDisclosureCount}건</strong>
            </div>
          </section>
          <div className={styles.disclosureFilters} role="group" aria-label="공시 필터">
            {disclosureFilters.map((filter) => (
              <button aria-pressed={disclosureFilter === filter.id} key={filter.id} onClick={() => setDisclosureFilter(filter.id)} type="button">
                {filter.label}
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
                <strong>{leaderDataUnavailable ? "대기" : `${activeLeadingStocks.filter((stock) => matchesLeaderFilter(stock, "turnover")).length}개`}</strong>
              </div>
              <div>
                <span>상승률 확인</span>
                <strong>{leaderDataUnavailable ? "대기" : `${activeLeadingStocks.filter((stock) => matchesLeaderFilter(stock, "gainers")).length}개`}</strong>
              </div>
              <div>
                <span>거래량 확인</span>
                <strong>{leaderDataUnavailable ? "대기" : `${activeLeadingStocks.filter((stock) => matchesLeaderFilter(stock, "volume")).length}개`}</strong>
              </div>
            </section>
            <div className={styles.leaderFilterTabs} role="group" aria-label="거래 집중 필터">
              {leaderFilters.map((filter) => (
                <button aria-pressed={leaderFilter === filter.id} key={filter.id} onClick={() => setLeaderFilter(filter.id)} type="button">
                  {filter.label}
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
                        <strong className={styles.leaderRate} data-change={changeTone(rate)}>{rate}</strong>
                        <div className={styles.leaderReason}>
                          <span>{leaderSignalForFilter(stock, leaderFilter)}</span>
                          <small>{rowNews.length + rowThemeNews.length + rowDisclosures.length > 0 ? `뉴스 ${rowNews.length}건 · 테마 ${rowThemeNews.length}건 · 공시 ${rowDisclosures.length}건` : "토스증권 랭킹 데이터"}</small>
                          {latestNews ? <small>최신 뉴스: {latestNews.text}</small> : <small>{leaderReasonForFilter(stock, leaderFilter)}</small>}
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
                      <span>{leaderSignalForFilter(selectedLeader, leaderFilter)}</span>
                      <h3 id="leader-insight-title">{selectedLeader.name} 랭킹 근거</h3>
                      <p>{leaderReasonForFilter(selectedLeader, leaderFilter)}</p>
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
                      <li>선물 원본이 아닌 <EnglishText text="ETF" />/공식 금리 기준으로 참고합니다.</li>
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
              <div className={styles.themeAnalysisGrid}>
                <article className={styles.themeSection}>
                  <span>시황 · 국내 강세 테마</span>
                  <div>
                    <h3>
                      금일 강세 테마는 1위 {themeRankLabel(krThemeLeaders, 0)},<br />
                      2위 {themeRankLabel(krThemeLeaders, 1)},<br />
                      3위 {themeRankLabel(krThemeLeaders, 2)}입니다.
                    </h3>
                    <strong>국내 강세 테마 · 거래대금순위</strong>
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
