"use client";

import { useEffect, useMemo, useState } from "react";
import styles from "../../page.module.scss";
import type { DisclosureRegion, LeaderRegion, MarketBoardData, MarketBoardTabId } from "./types";

const refreshIntervalMs = 60_000;

type DisclosureFilterId = "all" | "new" | "small-cap" | "ma" | "sale" | "issuance";
type LeaderFilterId = "all" | "turnover" | "breakout" | "pullback" | "risk";
type NewsFilterId = "all" | "us" | "kr" | "theme" | "macro";

const disclosureFilters: Array<{ id: DisclosureFilterId; label: string }> = [
  { id: "all", label: "전체" },
  { id: "new", label: "새 공시" },
  { id: "small-cap", label: "소형주" },
  { id: "ma", label: "인수합병" },
  { id: "sale", label: "매각" },
  { id: "issuance", label: "증자·지분" }
];

const leaderFilters: Array<{ id: LeaderFilterId; label: string }> = [
  { id: "all", label: "전체" },
  { id: "turnover", label: "거래대금" },
  { id: "breakout", label: "돌파" },
  { id: "pullback", label: "눌림" },
  { id: "risk", label: "주의" }
];

const newsFilters: Array<{ id: NewsFilterId; label: string }> = [
  { id: "all", label: "전체" },
  { id: "us", label: "미국 뉴스" },
  { id: "kr", label: "국내 뉴스" },
  { id: "theme", label: "테마" },
  { id: "macro", label: "매크로" }
];

const calendarDays = Array.from({ length: 35 }, (_, index) => {
  const day = index - 5 + 1;

  if (day < 1) {
    return null;
  }

  return {
    date: `2026-08-${String(day).padStart(2, "0")}`,
    day
  };
});

const weekdayLabels = ["월", "화", "수", "목", "금", "토", "일"];

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
  return href && href !== "#" ? <a href={href}>원문</a> : <span>원문 대기</span>;
}

function ProviderStatusStrip({ board }: { board: MarketBoardData }) {
  const checkedAt = board.providerStatuses[0]?.checkedAt;

  return (
    <section className={styles.providerStrip} aria-label="데이터 연결 상태">
      <strong>데이터 연결 상태{checkedAt ? ` · ${formatDateTimeMinute(checkedAt)}` : ""}</strong>
      <div>
        {board.providerStatuses.map((provider) => (
          <span data-status={provider.status} key={provider.id} title={provider.message}>
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

function matchesLeaderFilter(stock: MarketBoardData["usLeadingStocks"][number], filterId: LeaderFilterId) {
  const labelText = `${stock.burst} ${stock.turnover} ${stock.intraday} ${stock.reason} ${stock.caution}`;

  if (filterId === "turnover") return /\$|억|거래대금|M/i.test(labelText);
  if (filterId === "breakout") return /돌파|고점|상한가/i.test(labelText);
  if (filterId === "pullback") return /눌림|VWAP|반등/i.test(labelText);
  if (filterId === "risk") return /주의|부담|스프레드|확인|유지 필요/i.test(labelText);

  return true;
}

function matchesNewsFilter(item: MarketBoardData["headlineFlow"][number], filterId: NewsFilterId) {
  const labelText = `${item.source} ${item.label} ${item.text}`;

  if (filterId === "us") return item.region === "US";
  if (filterId === "kr") return item.region === "KR";
  if (filterId === "theme") return /테마|전력|바이오|정책|AI/i.test(labelText);
  if (filterId === "macro") return /매크로|금리|CPI|환율|달러|선물/i.test(labelText);

  return true;
}

export function MarketBoard({ board }: { board: MarketBoardData }) {
  const [liveBoard, setLiveBoard] = useState(board);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState<MarketBoardTabId>("market");
  const [newsFilter, setNewsFilter] = useState<NewsFilterId>("all");
  const [disclosureRegion, setDisclosureRegion] = useState<DisclosureRegion>("us");
  const [disclosureFilter, setDisclosureFilter] = useState<DisclosureFilterId>("all");
  const [leaderRegion, setLeaderRegion] = useState<LeaderRegion>("us");
  const [leaderFilter, setLeaderFilter] = useState<LeaderFilterId>("all");
  const [selectedCalendarDate, setSelectedCalendarDate] = useState("2026-08-04");
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
  const filteredLeadingStocks = activeLeadingStocks.filter((stock) => matchesLeaderFilter(stock, leaderFilter));
  const selectedCalendarItems = liveBoard.calendarItems.filter((item) => item.date === selectedCalendarDate);
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
                <em>{item.source} · {formatDateTimeMinute(item.timestamp)}</em>
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
                {filter.label}
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
                  <b>{item.source}{item.isNew ? " · NEW" : ""}</b>
                  <strong>{item.label}</strong>
                  <span>
                    {item.text}
                    {item.originalText ? <small>{item.originalText}</small> : null}
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
              <strong>2026년 8월</strong>
              <span>오늘 8월 4일 기준</span>
            </header>
            <div className={styles.weekdays} aria-hidden="true">
              {weekdayLabels.map((label) => <span key={label}>{label}</span>)}
            </div>
            <div className={styles.monthGrid} role="grid" aria-label="2026년 8월 일정">
              {calendarDays.map((day, index) => {
                const events = day ? liveBoard.calendarItems.filter((item) => item.date === day.date) : [];

                return (
                  <button
                    aria-label={day ? `8월 ${day.day}일 일정 ${events.length}개` : "빈 날짜"}
                    aria-pressed={day?.date === selectedCalendarDate}
                    className={!day ? styles.emptyDay : undefined}
                    disabled={!day}
                    key={`${index}-${day?.date ?? "empty"}`}
                    onClick={() => day ? setSelectedCalendarDate(day.date) : undefined}
                    type="button"
                  >
                    {day ? <strong>{day.day}</strong> : null}
                    {events.slice(0, 2).map((event) => <span key={`${event.date}-${event.title}`}>{event.type}</span>)}
                    {events.length > 2 ? <em>+{events.length - 2}</em> : null}
                  </button>
                );
              })}
            </div>
          </div>
          <section className={styles.calendarDetail} aria-live="polite" aria-labelledby="calendar-detail-title">
            <span>{selectedCalendarDate.replace("2026-08-", "8월 ")}일</span>
            <h3 id="calendar-detail-title">선택한 날짜의 이벤트</h3>
            {selectedCalendarItems.length > 0 ? (
              <div className={styles.calendarEvents}>
                {selectedCalendarItems.map((item) => (
                  <article key={`${item.date}-${item.title}`}>
                    <b>{item.type} · {item.market}</b>
                    <h4>{item.title}</h4>
                    <small>{item.source} · {formatDateTimeMinute(item.publishedAt ?? item.date)} · <OriginalLink href={item.originalUrl} /></small>
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
              <h2 id="leader-board-title">거래량과 거래대금이 함께 잡히는 종목을 참고로 봅니다.</h2>
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
                <span>돌파·눌림</span>
                <strong>{activeLeadingStocks.filter((stock) => matchesLeaderFilter(stock, "breakout") || matchesLeaderFilter(stock, "pullback")).length}개</strong>
              </div>
            </section>
            <div className={styles.leaderFilterTabs} role="group" aria-label="거래 집중 필터">
              {leaderFilters.map((filter) => (
                <button aria-pressed={leaderFilter === filter.id} key={filter.id} onClick={() => setLeaderFilter(filter.id)} type="button">
                  {filter.label}
                </button>
              ))}
            </div>
            <div className={styles.leaderRows}>
              {filteredLeadingStocks.map((stock, index) => (
                <article key={stock.id}>
                  <header>
                    <span>{stock.marketLabel}</span>
                    <b>#{index + 1}</b>
                    <strong>{stock.name}</strong>
                  </header>
                  <dl>
                    <div>
                      <dt>순간 거래량</dt>
                      <dd>{stock.burst}</dd>
                    </div>
                    <div>
                      <dt>거래대금</dt>
                      <dd>{stock.turnover}</dd>
                    </div>
                    <div>
                      <dt>분봉 위치</dt>
                      <dd>{stock.intraday}</dd>
                    </div>
                  </dl>
                  <p>{stock.reason}</p>
                  <small>{stock.caution}</small>
                </article>
              ))}
            </div>
            {filteredLeadingStocks.length === 0 ? <p className={styles.emptyDisclosure}>선택한 필터에 해당하는 종목이 없습니다.</p> : null}
          </section>
        </section>
      ) : null}

      <AdSlot label={liveBoard.adSlots.find((slot) => slot.id === "bottom")?.label ?? "하단 광고 영역"} />
    </main>
  );
}
