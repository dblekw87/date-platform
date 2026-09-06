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
import type { DisclosureFilterId, LeaderFilterId, NewsFilterId } from "./board-types";
import { AdSlot, DateLogo, EnglishText, HeadlineLink, IssuerLabel, NightTriggerNote, OriginalLink, ProviderStatusStrip, ThemeGroupRow } from "./board-parts";
import { buildCalendarDays, calendarDaySummary, calendarTimeNote, formatCalendarDayLabel, formatCalendarMonth, upcomingCalendarItems, weekdayLabels } from "./board-calendar";
import { buildDisclosureFilters, leaderFilters, leaderRanks, leaderVolumeOnly, matchesDisclosureFilter, matchesLeaderFilter, matchesNewsFilter, newsFilterCount, newsFilters, relatedHeadlineTags, sortLeadingStocks } from "./board-filters";
import { changeTone, displaySource, formatDateOnly, formatDateTimeMinute, formatKrwSize, formatTimeOnly, groupByTier, metricChangeTone, readingAgeDays, readingAgeLabel, signedPercent, todaySeoulDate, trendIconByTone } from "./board-format";
import { fallbackMarketCard, intradayParts, isLongMarketValue, isWaitingMarketCard, marketCardOrder, marketChangeLabel } from "./board-macro";
import { headlineCauseLabel, issuerSizeLabels, leaderReasonForFilter, leaderSignalForFilter, relatedDisclosures, relatedLeaderNews, relatedThemeNews } from "./board-evidence";
import { leaderChangeRate, leaderTheme, rankedThemeGroups, sessionRatePair, themeRankLabel } from "./board-themes";
import { leaderUnavailableMessage, themeUnavailableMessage } from "./board-status";

const refreshIntervalMs = 60_000;

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
  const limitPairs = liveBoard.krLimitPairs ?? [];
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
                {/* 전일 대비. 값과 화살표만 있으면 방향은 알아도 크기를 모릅니다 --
                    KOSPI 6,912.95에 빨간 화살표가 붙은 것과 +0.88%는 다른 정보입니다.
                    DTO에 처음부터 있던 값인데 카드가 안 읽고 있었습니다. */}
                {item.changeRate ? (
                  <span className={styles.marketChangeRate} data-rate={changeTone(item.changeRate)}>
                    {item.changeRate}
                  </span>
                ) : null}
                {/* The instrument note is dropped on purpose — "KIS 국내업종
                    현재지수", "SOX 원지수에는 선물이 없어 SOXX" — it is reference
                    material rather than a reading, and its length varied enough
                    to leave neighbouring cards misaligned. Source and time still
                    say where the number came from. */}
                <em>
                  {displaySource(item.source)} · {formatDateTimeMinute(item.timestamp)}
                  {readingAgeLabel(readingAgeDays(item.timestamp)) ? (
                    <span className={styles.marketStale}>{readingAgeLabel(readingAgeDays(item.timestamp))}</span>
                  ) : null}
                </em>
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
              {/* 이 패널은 짝꿍매매가 아닙니다.
                  
                  짝꿍매매는 같은 테마 1등주가 상한가에 잠겼을 때 2등주를 잡는
                  매매이고, 그것은 아래 "짝꿍매매 후보"가 상한가를 조건으로 걸어
                  따로 냅니다. 여기는 상한가를 요구하지 않으므로 그 이름을 쓰면
                  안 됩니다 — 두 패널이 같은 이름을 달고 하나는 상한가가 아닌
                  종목을 보여주면, 읽는 쪽은 조건이 지켜지지 않는다고 읽습니다.

                  여기가 보여주는 것은 함께 움직인 테마와 그 안에서 오른 종목들이고,
                  그 자체로 값이 있습니다 — 1등주가 달린 테마의 상승 멤버는 익일
                  시가 갭이 +0.46%p로, 그날 오르기만 한 종목(+0.07%p)의 여섯 배입니다.
                  다른 트레이드일 뿐입니다. */}
              <div className={`${styles.pairTradeRow} ${krAfterPairs.length > 0 ? styles.pairTradeRowSplit : ""}`}>
                <PairTrades
                  emptyMessage={leaderUnavailableMessage(liveBoard, "KR")}
                  label="시황 · 함께 움직인 테마 · 정규장 09:00–15:30"
                  pairs={liveBoard.krPairTrades ?? []}
                />
                {/* The NXT evening, which is a different book with different
                    liquidity — so it is a separate panel rather than more rows.
                    Hidden until 15:40, when there is an evening to describe. */}
                {krAfterPairs.length > 0 ? (
                  <PairTrades
                    label="시황 · 함께 움직인 테마 · NXT 애프터마켓 15:40–20:00"
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
              {/* 짝꿍매매 후보. 같은 테마 1등주가 상한가에 잠기면 그 종목을
                  사려던 수요가 2등주로 넘칩니다 — 가격제한폭이 있는 시장에서만
                  생기는 자리라, 미국판이 없는 이유이기도 합니다. 스캘핑에 가까운
                  매매라 목록이 장중 내내 바뀝니다. */}
              {limitPairs.length > 0 ? (
                <article className={styles.themeSection}>
                  <span>
                    매매참고 · 짝꿍매매 후보 · {limitPairs[0]?.sessionDate}
                    {limitPairs[0]?.provisional ? " 장중" : " 종가"}
                  </span>
                  <div>
                    <h3>
                      1등주가 상한가에 가거나 근처까지 간 테마 {limitPairs.length}개입니다.<br />
                      그 테마의 2등주를 봅니다.
                    </h3>
                    <strong>같은 테마 · 1등주 상한가 또는 15%↑ 진행중 · 간격 좁은 순</strong>
                    {groupByTier(limitPairs).map((group) => (
                      <div className={styles.candidateGroup} key={group.tier}>
                        <p className={styles.candidateGrade}>
                          <span className={styles.candidateGradeName}>{group.tier}</span>
                          {group.rows[0]?.measured ? (
                            /* 기준을 등급 줄 자체에 답니다. 아래 주의문에도 적혀 있지만
                               등급만 훑고 지나가는 사람은 그 문단을 안 읽고, 그러면 지금
                               장중에 들어가도 이 숫자가 나온다고 읽힙니다. 실제로는
                               장중 진입은 이 값과 무관합니다 — 아래 문단 참고. */
                            <span className={styles.candidateGradeScore}>
                              과거 {group.rows[0].measured.samples.toLocaleString("ko-KR")}건 ·
                              종가 매수 → 익일 시가 매도 · 시장 평균보다
                              {group.rows[0].measured.excessMean >= 0 ? " +" : " "}
                              {group.rows[0].measured.excessMean.toFixed(2)}%p ·
                              상회 {Math.round(group.rows[0].measured.beatRate * 100)}%
                            </span>
                          ) : group.tier === "상한가 진행중" ? (
                            /* 잠기기 전에 잡는 자리라 일봉 성적표가 없습니다 — 종가로는
                               "가는 중"과 "못 간 것"이 구분되지 않습니다. 대신 분봉으로
                               본 것만 말합니다. 4일이라 통계가 아니라 관찰입니다. */
                            <span className={styles.candidateGradeScore}>
                              잠기기 전 · 성적표 없음 · 분봉 4일 관찰으로는 이 자리 뒤 1등주가 상한가에
                              닿은 것이 16%뿐이고, 2등주는 평균 +4.0%p 더 갔습니다(3%p 이상 51%)
                            </span>
                          ) : (
                            /* 성적이 없으면 비워 두지 않고 없다고 적습니다. 빈 자리는
                               위 등급의 숫자가 여기에도 해당하는 것처럼 읽힙니다. */
                            <span className={styles.candidateGradeScore}>
                              과거 표본이 100건에 못 미쳐 성적을 붙이지 않았습니다
                            </span>
                          )}
                        </p>
                        <ol className={styles.candidateList}>
                          {group.rows.map((pair) => (
                            /*
                              1등주와 2등주를 같은 크기로 세웁니다.

                              1등주는 근거 줄에 간격·테마와 나란히 12px 회색으로 있었습니다.
                              그런데 이 매매의 조건은 **1등주가 상한가에 잠겼다**는 것이고,
                              2등주만 크게 보이면 판단의 절반이 안 보입니다. 2026-08-28에
                              1등주로 파루 +159.96%가 올라온 적이 있는데 -- 상한가가 30%인데
                              160%면 신규상장이라는 뜻이고, 조건이 성립하지 않는 자리였습니다.
                              그 숫자가 눈에 띄는 자리에 있었으면 바로 걸렸을 것입니다.

                              위가 1등주, 아래가 사는 쪽입니다. 읽는 순서가 매매 순서와 같습니다.
                            */
                            <li className={styles.candidatePair} key={pair.id}>
                              <span className={styles.candidateRole}>1등주</span>
                              <span className={styles.candidateName}>{pair.leader.name}</span>
                              <span className={styles.candidateMove}>+{pair.leader.changeRateValue.toFixed(2)}%</span>
                              <span className={styles.candidateRole} data-buy="true">2등주</span>
                              <span className={styles.candidateName} data-buy="true">{pair.second.name}</span>
                              <span className={styles.candidateMove} data-buy="true">+{pair.second.changeRateValue.toFixed(2)}%</span>
                              <span className={styles.candidateFacts}>
                                <span className={styles.candidateGap}>간격 {pair.leadGap.toFixed(2)}%p</span>
                                <span className={styles.candidateTheme}>{pair.theme}</span>
                                {/*
                                  테마 자체가 얼마나 앞섰는가.

                                  짝은 공유 테마가 하나라도 있으면 서므로 한 종목이 여러 카드의
                                  1등주로 동시에 나옵니다. 2026-08-31 사토시홀딩스가 드론과
                                  건강기능식품 두 카드에 5분 간격으로 올라왔는데, 편입이 넷이라
                                  틀린 카드는 없지만 +30%로 민 힘은 하나였습니다. 이 숫자 없이는
                                  화면만 보고 어느 쪽이 진짜인지 가릴 수 없었습니다.

                                  회원 수를 붙이는 것은 셋짜리 평균과 마흔짜리 평균을 같은
                                  무게로 읽으면 안 되기 때문입니다.
                                */}
                                {pair.themeMembers === 0 ? (
                                  <span className={styles.candidateThemeMove} data-change="flat">나머지 없음</span>
                                ) : pair.themeMove === null ? null : (
                                  <span
                                    className={styles.candidateThemeMove}
                                    data-change={pair.themeMove > 0 ? "up" : pair.themeMove < 0 ? "down" : "flat"}
                                  >
                                    나머지 {pair.themeMove > 0 ? "+" : ""}{pair.themeMove.toFixed(2)}%p
                                    {pair.themeMembers === null ? "" : ` · ${pair.themeMembers}종목`}
                                  </span>
                                )}
                              </span>
                            </li>
                          ))}
                        </ol>
                      </div>
                    ))}
                    <p className={styles.closeBetCaveat}>
                      {limitPairs[0]?.provisional ? (
                        <>
                          <b>{formatTimeOnly(limitPairs[0]?.observedAt ?? undefined)} 기준입니다.</b>{" "}
                          1등주가 상한가에서 풀리거나 2등주가 더 가면 목록이 바뀝니다.{" "}
                        </>
                      ) : null}
                      성적은 <b>종가에 사서 익일 시가에 판</b> 값입니다. 1등주가 실제로 잠기고 간격이
                      2%p 이내일 때만 크게 좋았습니다(612건 +5.55%p·상회 76%). 같은 상한가라도 간격
                      2~5%p는 +0.16%p로 사실상 0입니다. 1등주 높이로만 보면 20~25% −0.10%p,
                      25~27% +0.40%p, 27~29% +0.79%p로 오르다가 잠기는 순간 +2.58%p로 뜁니다.
                      문턱을 27%에 둔 이유입니다.{" "}
                      {/* 2026-09-02 실측. 분봉이 쌓이면 장중 구간으로 다시 재겠다고 이 자리에
                          적어 두었던 약속의 답입니다. 답이 부정이라 지우지 않고 남깁니다 --
                          등급 숫자만 있고 이 문단이 없으면, 지금 들어가도 저 숫자가 나온다고
                          읽힙니다. */}
                      <b>장중에 들어가 장중에 나오는 구간은 성립하지 않았습니다.</b> 1등주가 잠긴 뒤
                      2등주가 간격 6%p 안으로 붙은 순간에 사는 것으로 12개 장 314건을 쟀더니 마감까지
                      평균 −1.47%·상회 38%였고, 같은 분에 비슷하게 올라 있던 무관한 종목
                      (29,237건 +0.06%)보다 나빴습니다. <b>장중에는 간격이 좁을수록 나쁩니다</b> —
                      0~2%p −3.84% · 2~4%p −1.72% · 4~6%p −1.23%로 위 등급 순서가 뒤집힙니다.
                      익일 시가까지 들고 갈 때 밀착이 최고인 것과 달리, 장중에 밀착은 이미 다 갔다는
                      뜻입니다. 청산은 빠를수록 낫지만(+5분 −0.31%) 어느 구간도 플러스가 아닙니다.
                      <NightTriggerNote candidates={limitPairs} items={marketTrendItems} />
                    </p>
                  </div>
                </article>
              ) : null}
              {/* 종가배팅 후보. 조건은 50만 종목-밤에서 골라낸 것이고, 행마다
                  그 등급이 과거에 실제로 어땠는지를 답니다 — 숫자 없이 종목만
                  늘어놓으면 추천으로 읽히기 때문입니다. 앞세우는 값이 승률이
                  아니라 초과폭인 것도 측정이 그렇게 말해서입니다. */}
              {closeBetCandidates.length > 0 ? (
                <article className={styles.themeSection}>
                  <span>
                    매매참고 · 종가배팅 후보 · {closeBetCandidates[0]?.sessionDate}
                    {closeBetCandidates[0]?.provisional ? " 장중" : " 종가"}
                  </span>
                  <div>
                    <h3>
                      {closeBetCandidates[0]?.provisional
                        ? <>지금 조건을 만족한 종목은 {closeBetCandidates.length}개입니다.<br />마감까지 계속 바뀝니다.</>
                        : <>오늘 조건을 만족한 종목은 {closeBetCandidates.length}개입니다.<br />종가 매수 · 익일 시가 매도를 기준으로 잰 값입니다.</>}
                    </h3>
                    <strong>60일 고점 돌파 직후 · 윗꼬리 30% 미만 · 회전율 5%↑ · 당일 대·중형 5%↑ 소형 10%↑</strong>
                    {groupByTier(closeBetCandidates).map((group) => (
                      <div className={styles.candidateGroup} key={group.tier}>
                        <p className={styles.candidateGrade}>
                          <span className={styles.candidateGradeName}>{group.tier}주</span>
                          {group.rows[0]?.measured ? (
                            <span className={styles.candidateGradeScore}>
                              과거 {group.rows[0].measured.samples.toLocaleString("ko-KR")}건 ·
                              시장 평균보다 {group.rows[0].measured.excessMean >= 0 ? "+" : ""}
                              {group.rows[0].measured.excessMean.toFixed(2)}%p ·
                              상회 {Math.round(group.rows[0].measured.beatRate * 100)}% ·
                              갭상승 {Math.round(group.rows[0].measured.gapUpRate * 100)}%
                            </span>
                          ) : null}
                        </p>
                        <ol className={styles.candidateList}>
                          {group.rows.map((candidate) => (
                            <li className={styles.candidateRow} key={candidate.id}>
                              <span className={styles.candidateName}>{candidate.name}</span>
                              <span className={styles.candidateMove}>+{candidate.changeRateValue.toFixed(2)}%</span>
                              <span className={styles.candidateFacts}>
                                <span className={styles.candidateLead}>회전율 {candidate.turnoverRatio}%</span>
                                <span className={styles.candidateGap}>60일 고점 +{candidate.breakMargin}% 돌파</span>
                              </span>
                              {/* 재료를 근거로 답니다. 조건은 가격과 거래량뿐이라 목록만
                                  보면 왜 이 종목인지 알 수 없고, 그 답은 기사에 있습니다.
                                  15:30까지 나온 것만 -- 그 뒤 기사는 진입 시점에 없었고
                                  대개 결과 보도입니다. */}
                              {/* payload가 이 필드보다 오래됐을 수 있습니다 -- 보드는
                                  스냅샷에서도 그려지고 백엔드가 먼저 재기동되지 않을
                                  수도 있습니다. 없으면 없는 대로 그립니다. */}
                              {(candidate.evidence ?? []).length > 0 ? (
                                <ul className={styles.candidateEvidence}>
                                  {(candidate.evidence ?? []).map((item) => (
                                    <li key={`${candidate.id}-${item.at}-${item.headline}`}>
                                      <b>{item.at}</b>
                                      {item.url
                                        ? <a href={item.url} rel="noreferrer" target="_blank">{item.headline}</a>
                                        : <span>{item.headline}</span>}
                                    </li>
                                  ))}
                                </ul>
                              ) : (
                                /* 비워 두면 "아직 안 붙었다"로 읽힙니다. 재료가 없는 것도
                                   판단 재료입니다 -- 실측에서 뉴스 없는 쪽이 +1.05%p로
                                   있는 쪽(+3.38%p)보다 뚜렷이 낮았습니다. */
                                <p className={styles.candidateEvidenceEmpty}>15:30까지 붙은 기사 없음</p>
                              )}
                            </li>
                          ))}
                        </ol>
                      </div>
                    ))}
                    {/* 밤은 예측하지 않습니다. 예측할 수도 없으니 숫자에 섞지 않고
                        옆에 적어 둡니다. */}
                    <p className={styles.closeBetCaveat}>
                      {closeBetCandidates[0]?.provisional ? (
                        <>
                          <b>{formatTimeOnly(closeBetCandidates[0]?.observedAt ?? undefined)} 기준 장중 값입니다.</b>{" "}
                          종가와 윗꼬리는 마감까지 바뀌므로 목록도 바뀝니다.{" "}
                        </>
                      ) : null}
                      위 숫자는 그날 밤 시장 평균 갭을 뺀 초과분입니다. <b>갭이 오르든 내리든 익일
                      시가에 그냥 판다</b>는 전제로 쟀으니 갭하락도 손절로 들어가 있고, 버티는 경우는
                      여기 없습니다. 밤 자체는 이 목록이 답하지 못합니다. 시장 전체가 내리는 밤엔
                      조건과 무관하게 같이 내립니다.
                      {marketTrendItems.qqq ? ` 현재 NASDAQ 100 선물 ${marketChangeLabel(marketTrendItems.qqq)}.` : ""}
                      <NightTriggerNote candidates={closeBetCandidates} items={marketTrendItems} />
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
