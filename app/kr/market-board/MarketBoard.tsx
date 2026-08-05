"use client";

import { useEffect, useMemo, useState } from "react";
import styles from "../../page.module.scss";
import type { DisclosureRegion, LeaderRegion, MarketBoardData, MarketBoardTabId } from "./types";

const refreshIntervalMs = 60_000;

type DisclosureFilterId = "all" | "new" | "small-cap" | "ma" | "sale" | "issuance";
type LeaderFilterId = "turnover" | "gainers" | "volume" | "etf" | "risk";
type NewsFilterId = "all" | "us" | "kr" | "theme" | "macro";
type LeadingStock = MarketBoardData["usLeadingStocks"][number];
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

function OriginalLink({ href }: { href?: string }) {
  return href && href !== "#" ? <a href={href} rel="noreferrer" target="_blank">원문</a> : <span>원문 대기</span>;
}

function displaySource(source?: string) {
  if (!source) return "출처 확인";
  if (source === "mock") return "참고값";
  if (source === "market") return "시장 데이터";

  return source;
}

function displayProviderMessage(message: string) {
  return message
    .replace(/mock fallback/gi, "보조 데이터 유지")
    .replace(/mock/gi, "참고값");
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

    return !etf && rank !== null && rank <= 30;
  }
  if (filterId === "turnover") {
    const rank = leaderRankFor(stock, "turnover");

    return !etf && rank !== null && rank <= 30;
  }
  if (filterId === "volume") {
    const rank = leaderRankFor(stock, "volume");

    return !etf && rank !== null && rank <= 30;
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

  return theme || "개별 이슈";
}

function isEtfLeader(stock: LeadingStock) {
  return leaderTheme(stock) === "ETF" ||
    /(^|\s)(KODEX|TIGER|ACE|RISE|SOL|PLUS|HANARO|KOSEF|KBSTAR|ARIRANG|TIMEFOLIO|히어로즈|마이티|HK)|ETF|ETN|인버스|레버리지|채권|회사채|국고채|액티브|Nifty|TOP10/i.test(`${stock.name} ${stock.reason}`);
}

function leaderChangeRate(stock: LeadingStock) {
  const match = `${stock.burst} ${stock.intraday}`.match(/[+-]\d+(?:\.\d+)?%/);

  return match?.[0] ?? "확인";
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

export function MarketBoard({ board }: { board: MarketBoardData }) {
  const [liveBoard, setLiveBoard] = useState(board);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState<MarketBoardTabId>("market");
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
  const latestHeadline = useMemo(() => [...liveBoard.headlineFlow].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))[0], [liveBoard.headlineFlow]);
  const headlineSourceCount = new Set(liveBoard.headlineFlow.map((item) => item.source)).size;
  const originalLinkCount = liveBoard.headlineFlow.filter((item) => item.originalUrl && item.originalUrl !== "#").length;
  const newsProvider = liveBoard.providerStatuses.find((provider) => provider.id === "news");
  const newHeadlineCount = liveBoard.headlineFlow.filter((item) => item.isNew).length;
  const activeDisclosures = disclosureRegion === "us" ? liveBoard.usDisclosures : liveBoard.krDisclosures;
  const filteredDisclosures = activeDisclosures.filter((item) => matchesDisclosureFilter(item, disclosureFilter));
  const activeDisclosureDescription = liveBoard.disclosureTabs.find((tab) => tab.id === disclosureRegion)?.description;
  const activeLeadingStocks = leaderRegion === "us" ? liveBoard.usLeadingStocks : liveBoard.krLeadingStocks;
  const filteredLeadingStocks = sortLeadingStocks(activeLeadingStocks.filter((stock) => matchesLeaderFilter(stock, leaderFilter)), leaderFilter);
  const selectedLeader = filteredLeadingStocks.find((stock) => stock.id === selectedLeaderId) ?? filteredLeadingStocks[0];
  const activeLeaderDisclosures = selectedLeader?.market === "US" ? liveBoard.usDisclosures : liveBoard.krDisclosures;
  const selectedLeaderNews = selectedLeader ? relatedLeaderNews(selectedLeader, sortedHeadlines).slice(0, 8) : [];
  const selectedThemeNews = selectedLeader ? relatedThemeNews(selectedLeader, sortedHeadlines).filter((item) => !selectedLeaderNews.some((news) => news.id === item.id)).slice(0, 8) : [];
  const selectedDisclosures = selectedLeader ? relatedDisclosures(selectedLeader, activeLeaderDisclosures).slice(0, 8) : [];
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

    timeoutId = setTimeout(refreshBoard, refreshIntervalMs);

    return () => {
      ignore = true;
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  return (
    <main className={styles.page}>
      <header className={styles.siteHeader}>
        <strong>DATE</strong>
        <span>{isRefreshing ? "시장 확인 보드 · Updating" : "시장 확인 보드"}</span>
      </header>

      <ProviderStatusStrip board={liveBoard} />

      <section className={styles.summary} aria-labelledby="kr-home-title">
        <div>
          <p className={styles.eyebrow}>오늘 확인할 것만 빠르게 보기</p>
          <h1 id="kr-home-title">시황, 뉴스, 일정, 공시와 수급을 한 화면에서 봅니다.</h1>
          <p>이 화면은 참고 정보를 정리합니다. 가격 변동 원인 단정이나 투자 행동 제안은 하지 않습니다.</p>
        </div>
        <aside className={styles.statusBox} aria-label="오늘 확인 순서">
          <strong>확인 순서</strong>
          <ol>
            <li>시황</li>
            <li>뉴스</li>
            <li>일정</li>
            <li>속보·공시</li>
            <li>수급·차트</li>
          </ol>
        </aside>
      </section>

      <AdSlot label={liveBoard.adSlots.find((slot) => slot.id === "top")?.label ?? "상단 광고 영역"} />

      <nav className={styles.tabs} aria-label="홈 탭">
        {liveBoard.tabs.map((tab) => (
          <button aria-pressed={activeTab === tab.id} key={tab.id} onClick={() => setActiveTab(tab.id)} type="button">
            {tab.label}
          </button>
        ))}
      </nav>

      <p className={styles.tabDescription}>{activeDescription}</p>

      <AdSlot label={liveBoard.adSlots.find((slot) => slot.id === "middle")?.label ?? "중단 광고 영역"} />

      {activeTab === "market" ? (
        <section className={styles.tabPanel} aria-labelledby="market-panel-title">
          <div className={styles.sectionHeader}>
            <p className={styles.eyebrow}>시황</p>
            <h2 id="market-panel-title">개장 전후 참고할 시장 기준점입니다.</h2>
          </div>
          <div className={styles.macroGrid}>
            {liveBoard.macroSnapshot.map((item) => (
              <article data-tone={item.tone} key={item.id}>
                <strong>{item.label}</strong>
                <span>{item.value}</span>
                <small>{item.note}</small>
                <em>{displaySource(item.source)} · {formatDateTimeMinute(item.timestamp)}</em>
              </article>
            ))}
          </div>
          <div className={`${styles.briefGrid} ${styles.marketBriefGrid}`}>
            {liveBoard.marketBrief.filter((brief) => brief.region.includes("시황") || brief.region.includes("매크로")).map((brief) => (
              <article key={brief.id}>
                <span>{brief.region}</span>
                <h3>{brief.title}</h3>
                <ul>
                  {brief.points.map((point) => <li key={point}>{point}</li>)}
                </ul>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      {activeTab === "news" ? (
        <section className={styles.tabPanel} aria-labelledby="news-panel-title">
          <div className={styles.sectionHeader}>
            <p className={styles.eyebrow}>뉴스</p>
            <h2 id="news-panel-title">실시간으로 올라오는 헤드라인만 시간순으로 봅니다.</h2>
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
              <strong>{formatDateTimeMinute(newsProvider?.checkedAt)}</strong>
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
              <span>구분</span>
              <span>키워드</span>
              <span>헤드라인</span>
              <span>원문</span>
            </div>
            <ol>
              {filteredHeadlines.map((item) => (
                <li data-new={item.isNew ? "true" : undefined} key={item.id}>
                  <time>{formatDateTimeMinute(item.publishedAt)}</time>
                  <b>{item.source}{item.sourceDetail ? ` · ${item.sourceDetail}` : ""}{item.isNew ? " · NEW" : ""}</b>
                  <strong>{item.label}</strong>
                  <span>
                    {item.text}
                    {item.originalText ? <small>{item.originalText}</small> : null}
                    {relatedHeadlineTags(item).length > 0 ? <small>{relatedHeadlineTags(item).join(" · ")}</small> : null}
                  </span>
                  <OriginalLink href={item.originalUrl} />
                </li>
              ))}
            </ol>
            {filteredHeadlines.length === 0 ? <p className={styles.emptyDisclosure}>선택한 필터에 해당하는 헤드라인이 없습니다.</p> : null}
          </section>
        </section>
      ) : null}

      {activeTab === "calendar" ? (
        <section className={styles.tabPanel} aria-labelledby="calendar-panel-title">
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
                    <small>{displaySource(item.source)}</small>
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
                    <small>{displaySource(item.source)} · {formatDateTimeMinute(item.publishedAt ?? item.date)} · <OriginalLink href={item.originalUrl} /></small>
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
        <section className={styles.tabPanel} aria-labelledby="breaking-panel-title">
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
        <section className={styles.tabPanel} aria-labelledby="flow-panel-title">
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
            <h3 id="chart-board-title">차트 확인 기준</h3>
            <div>
              <span>전일 고점</span>
              <span>VWAP</span>
              <span>첫 눌림</span>
              <span>거래대금 유지</span>
              <span>갭 상승 부담</span>
            </div>
          </section>
          <section className={styles.leaderBoard} aria-labelledby="leader-board-title">
            <div className={styles.sectionHeader}>
              <p className={styles.eyebrow}>거래 집중 종목</p>
              <h2 id="leader-board-title">상승률이 크고 거래량이 동반되는 급등주를 참고로 봅니다.</h2>
            </div>
            <div className={styles.leaderTabs} role="group" aria-label="시장 선택">
              {liveBoard.leaderTabs.map((tab) => (
                <button aria-pressed={leaderRegion === tab.id} key={tab.id} onClick={() => setLeaderRegion(tab.id)} type="button">
                  {tab.label}
                </button>
              ))}
            </div>
            <section className={styles.leaderSignalBar} aria-label="거래 집중 요약">
              <div>
                <span>표시 종목</span>
                <strong>{filteredLeadingStocks.length}/{activeLeadingStocks.length}</strong>
              </div>
              <div>
                <span>거래대금 확인</span>
                <strong>{activeLeadingStocks.filter((stock) => matchesLeaderFilter(stock, "turnover")).length}개</strong>
              </div>
              <div>
                <span>상승률 확인</span>
                <strong>{activeLeadingStocks.filter((stock) => matchesLeaderFilter(stock, "gainers")).length}개</strong>
              </div>
              <div>
                <span>거래량 확인</span>
                <strong>{activeLeadingStocks.filter((stock) => matchesLeaderFilter(stock, "volume")).length}개</strong>
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

                    return (
                      <article
                        aria-selected={selectedLeader?.id === stock.id}
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
                        <strong className={styles.leaderRate}>{leaderChangeRate(stock)}</strong>
                        <div className={styles.leaderReason}>
                          <span>{leaderSignalForFilter(stock, leaderFilter)}</span>
                          <small>뉴스 {rowNews.length}건 · 테마 {rowThemeNews.length}건 · 공시 {rowDisclosures.length}건</small>
                          {latestNews ? <small>최신 뉴스: {latestNews.text}</small> : <small>{leaderReasonForFilter(stock, leaderFilter)}</small>}
                          <em>{rowNews.length + rowThemeNews.length + rowDisclosures.length > 0 ? "직접 뉴스와 같은 시장 테마 후보 확인" : stock.caution}</em>
                        </div>
                      </article>
                    );
                  })}
                </div>
                {filteredLeadingStocks.length === 0 ? <p className={styles.emptyDisclosure}>선택한 필터에 해당하는 종목이 없습니다.</p> : null}
              </div>
              {selectedLeader ? (
                <section className={styles.leaderInsightPanel} aria-labelledby="leader-insight-title">
                  <header>
                    <div>
                      <span>{leaderSignalForFilter(selectedLeader, leaderFilter)}</span>
                      <h3 id="leader-insight-title">{selectedLeader.name} 원인 후보</h3>
                      <p>{leaderReasonForFilter(selectedLeader, leaderFilter)}</p>
                    </div>
                    <strong>뉴스 {selectedLeaderNews.length} · 테마 {selectedThemeNews.length} · 공시 {selectedDisclosures.length}</strong>
                  </header>
                  <div className={styles.leaderInsightGrid}>
                    <article>
                      <h4>관련 뉴스</h4>
                      {selectedLeaderNews.length > 0 ? (
                        <ol>
                          {selectedLeaderNews.slice(0, 4).map((item) => (
                            <li key={item.id}>
                              <b>{headlineCauseLabel(item)} · {item.source} · {formatDateTimeMinute(item.publishedAt)}</b>
                              <span>{item.text}</span>
                              <OriginalLink href={item.originalUrl} />
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
                              <span>{item.text}</span>
                              <OriginalLink href={item.originalUrl} />
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
                          <dd>{selectedLeader.intraday}</dd>
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

      <AdSlot label={liveBoard.adSlots.find((slot) => slot.id === "bottom")?.label ?? "하단 광고 영역"} />
    </main>
  );
}
