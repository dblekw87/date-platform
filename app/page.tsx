"use client";

import Link from "next/link";
import { useState } from "react";
import styles from "./page.module.scss";

type EvidenceItem = {
  id: string;
  title: string;
  summary: string;
  source: string;
  freshness: string;
  boundary: string;
  related: string;
};

const navigationItems = [
  { label: "Home", href: "/", enabled: true },
  { label: "Discover", href: null, enabled: false },
  { label: "Research", href: "/research", enabled: true },
  { label: "Monitoring", href: null, enabled: false },
  { label: "Journal", href: null, enabled: false },
  { label: "Community", href: null, enabled: false },
  { label: "Search", href: null, enabled: false },
  { label: "Profile", href: null, enabled: false }
];

const snapshotGroups = [
  {
    group: "국내",
    items: [
      { name: "KOSPI", value: "Mock Prototype 2,7xx.xx", change: "Mock +0.00%", status: "Prototype open", updated: "Mock time" },
      { name: "KOSDAQ", value: "Mock Prototype 8xx.xx", change: "Mock -0.00%", status: "Prototype open", updated: "Mock time" }
    ]
  },
  {
    group: "미국",
    items: [
      { name: "NASDAQ", value: "Mock Prototype 1x,xxx.xx", change: "Mock +0.00%", status: "Prototype delayed", updated: "Mock time" },
      { name: "S&P500", value: "Mock Prototype 5,xxx.xx", change: "Mock -0.00%", status: "Prototype delayed", updated: "Mock time" }
    ]
  },
  {
    group: "자산",
    items: [
      { name: "USD/KRW", value: "Mock Prototype 1,xxx.xx", change: "Mock +0.00%", status: "Prototype FX", updated: "Mock time" },
      { name: "BTC", value: "Mock Prototype xx,xxx USD", change: "Mock -0.00%", status: "Prototype crypto", updated: "Mock time" }
    ]
  }
];

const evidenceItems: EvidenceItem[] = [
  {
    id: "EV-117",
    title: "정책 금리 변화와 환율 민감도가 동시에 관찰되는 근거",
    summary: "환율과 성장주 민감도가 같은 방향으로 움직이는지 오늘 먼저 확인해야 하는 Prototype Evidence입니다.",
    source: "Mock Source: 리서치 메모 A",
    freshness: "Freshness: Prototype updated time",
    boundary: "Boundary: Interpretation, not original evidence",
    related: "Related: USD/KRW / NASDAQ / 국내 성장주"
  },
  {
    id: "EV-122",
    title: "시장 폭 차이가 특정 테마에 집중되는지 확인",
    summary: "대표 지수보다 내부 확산 여부가 약한 상태로 보이는지 비교하는 읽기용 근거입니다.",
    source: "Mock Source: 제공처 B",
    freshness: "Freshness: Prototype updated time",
    boundary: "Boundary: Source cue is incomplete traceability",
    related: "Related: KOSPI / KOSDAQ / Theme"
  },
  {
    id: "EV-104",
    title: "오전 이벤트 이후 모니터링 신호가 유지되는지 검토",
    summary: "관심 종목의 반복 관찰 조건과 실제 Evidence cue가 같은 맥락인지 확인합니다.",
    source: "Mock Source: 뉴스 요약 C",
    freshness: "Freshness: Prototype updated time",
    boundary: "Boundary: Prototype summary",
    related: "Related: Watchlist / Signal / Timeline"
  }
];

const monitoringItems = [
  { title: "환율 민감도 관찰", status: "Mock active", detail: "USD/KRW 변화와 성장주 Evidence 연결 후보" },
  { title: "시장 폭 약화", status: "Mock watch", detail: "KOSDAQ 내부 확산 지표 확인 필요" },
  { title: "이벤트 재확인", status: "Mock calm", detail: "오후 일정 전까지 추가 Source 대기" }
];

const timelineItems = [
  { time: "09:30", title: "시장 기준점 형성", detail: "대표 지수와 환율 Prototype 상태 확인" },
  { time: "10:15", title: "핵심 Evidence 갱신 후보", detail: "Source와 Freshness boundary 확인 필요" },
  { time: "11:20", title: "Monitoring Preview 변화", detail: "관심 Entity trigger가 반복되는지 관찰" },
  { time: "13:00", title: "Research 진입 후보", detail: "선택 Evidence를 /research에서 깊게 검토" }
];

const interestedEntities = [
  { symbol: "BRK", name: "브릭 에너지", cue: "Evidence 연결 후보", state: "Mock watch" },
  { symbol: "ALP", name: "알파 시스템즈", cue: "성장주 민감도", state: "Mock focus" },
  { symbol: "CRN", name: "크론 마켓", cue: "시장 폭 확인", state: "Mock calm" },
  { symbol: "USD/KRW", name: "달러/원", cue: "Macro link", state: "Mock active" }
];

export default function Home() {
  const [selectedEvidence, setSelectedEvidence] = useState<EvidenceItem | null>(null);

  return (
    <main className={styles.homeShell}>
      <header className={styles.globalHeader}>
        <Link className={styles.logo} href="/" aria-label="DATE Home">
          DATE
        </Link>
        <nav className={styles.globalNavigation} aria-label="Global Navigation">
          {navigationItems.map((item) =>
            item.enabled && item.href ? (
              <Link className={item.href === "/" ? styles.activeNavLink : styles.navLink} href={item.href} key={item.label}>
                {item.label}
              </Link>
            ) : (
              <button className={styles.disabledNavLink} disabled key={item.label} type="button">
                {item.label}
                <span>준비 중</span>
              </button>
            )
          )}
        </nav>
        <div className={styles.guestHeaderActions} aria-label="Guest Header Actions">
          <button type="button">Search</button>
          <button type="button">Theme</button>
          <button type="button">Notify</button>
          <button type="button">Login</button>
        </div>
      </header>

      <div className={styles.pageFrame}>
        <div className={styles.contentFlow}>
          <section className={styles.hero} aria-labelledby="hero-title">
            <div className={styles.heroCopy}>
              <span className={styles.kicker}>Today · Prototype market 기준 시점</span>
              <h1 id="hero-title">오늘 시장은 환율과 시장 폭을 먼저 확인하는 흐름입니다.</h1>
              <p>
                Mock 요약입니다. 실제 실시간 수치가 아니라 Home Content Shell의 정보 흐름을 검증하기 위한 Prototype 상태입니다.
              </p>
              <div className={styles.heroMetrics} aria-label="오늘 핵심 상태">
                <span>핵심 Evidence 3개</span>
                <span>Monitoring Mock active 2건</span>
                <span>Research 진입 후보 1건</span>
              </div>
              <div className={styles.heroActions}>
                <a href="#todays-evidence">오늘의 근거 보기</a>
                <Link href="/research">시장 분석 시작</Link>
              </div>
            </div>

            <form className={styles.searchPanel} role="search" aria-label="Global Search">
              <label htmlFor="home-search">종목명, ETF, 테마, 뉴스, Evidence 검색</label>
              <div>
                <input id="home-search" placeholder="예: KOSPI, 반도체, 환율, EV-117" type="search" />
                <button disabled type="button">Prototype 검색</button>
              </div>
              <small>Search는 target type을 확인한 뒤 Research 또는 Evidence로 연결되는 Entry입니다.</small>
            </form>
          </section>

          <section className={styles.snapshotSection} aria-labelledby="snapshot-title">
            <div className={styles.sectionIntro}>
              <span className={styles.kicker}>Market Snapshot</span>
              <h2 id="snapshot-title">대표 시장 빠른 확인</h2>
              <p>Market Interpretation과 분리된 Mock 현재 상태 strip입니다.</p>
            </div>
            <div className={styles.snapshotGroups}>
              {snapshotGroups.map((group) => (
                <div className={styles.snapshotGroup} key={group.group}>
                  <strong>{group.group}</strong>
                  {group.items.map((item) => (
                    <article className={styles.snapshotItem} key={item.name}>
                      <span>{item.name}</span>
                      <b>{item.value}</b>
                      <small>{item.change}</small>
                      <em>{item.status} · Updated {item.updated}</em>
                    </article>
                  ))}
                </div>
              ))}
            </div>
          </section>

          <section className={styles.evidenceSection} id="todays-evidence" aria-labelledby="evidence-title">
            <div className={styles.sectionIntro}>
              <span className={styles.kicker}>Today Evidence</span>
              <h2 id="evidence-title">오늘 먼저 읽을 근거</h2>
              <p>Source, Freshness, Boundary를 유지한 콘텐츠형 Evidence preview입니다.</p>
            </div>
            <div className={styles.evidenceLayout}>
              <button className={styles.leadEvidence} onClick={() => setSelectedEvidence(evidenceItems[0])} type="button">
                <span>{evidenceItems[0].id}</span>
                <strong>{evidenceItems[0].title}</strong>
                <p>{evidenceItems[0].summary}</p>
                <small>{evidenceItems[0].source}</small>
                <small>{evidenceItems[0].freshness}</small>
                <em>{evidenceItems[0].boundary}</em>
              </button>
              <div className={styles.evidenceList}>
                {evidenceItems.slice(1).map((item) => (
                  <button className={styles.evidenceRow} key={item.id} onClick={() => setSelectedEvidence(item)} type="button">
                    <span>{item.id}</span>
                    <strong>{item.title}</strong>
                    <p>{item.summary}</p>
                    <small>{item.source}</small>
                    <em>{item.boundary}</em>
                  </button>
                ))}
              </div>
            </div>
          </section>

          <aside className={styles.nativeAd} aria-label="Native Advertisement Placeholder">
            <span>Native Advertisement Placeholder</span>
            <strong>Prototype ad slot</strong>
            <small>실제 광고 또는 Google AdSense가 연결되지 않은 구조 검증 영역입니다.</small>
          </aside>

          <section className={styles.monitoringSection} aria-labelledby="monitoring-title">
            <div className={styles.sectionIntro}>
              <span className={styles.kicker}>Today Monitoring</span>
              <h2 id="monitoring-title">오늘 관찰 중인 변화</h2>
            </div>
            <div className={styles.monitoringPreview}>
              {monitoringItems.map((item) => (
                <article key={item.title}>
                  <span>{item.status}</span>
                  <strong>{item.title}</strong>
                  <p>{item.detail}</p>
                </article>
              ))}
            </div>
          </section>

          <section className={styles.timelineSection} aria-labelledby="timeline-title">
            <div className={styles.sectionIntro}>
              <span className={styles.kicker}>Timeline Preview</span>
              <h2 id="timeline-title">시간 흐름</h2>
            </div>
            <ol className={styles.timelineFeed}>
              {timelineItems.map((item) => (
                <li key={`${item.time}-${item.title}`}>
                  <time>{item.time}</time>
                  <div>
                    <strong>{item.title}</strong>
                    <p>{item.detail}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          <section className={styles.entitySection} aria-labelledby="entity-title">
            <div className={styles.sectionIntro}>
              <span className={styles.kicker}>Interested Entity</span>
              <h2 id="entity-title">관심 대상 Preview</h2>
            </div>
            <div className={styles.entityStrip}>
              {interestedEntities.map((item) => (
                <article key={item.symbol}>
                  <span>{item.symbol}</span>
                  <strong>{item.name}</strong>
                  <small>{item.cue}</small>
                  <em>{item.state}</em>
                </article>
              ))}
            </div>
          </section>
        </div>

        <aside className={styles.adRail} aria-label="Optional Right Advertisement Rail">
          <span>Optional Right Advertisement Rail</span>
          <strong>Prototype ad rail</strong>
          <small>1920px 이상에서만 표시되는 보조 광고 영역입니다.</small>
        </aside>
      </div>

      <footer className={styles.footer}>
        <span>DATE Prototype</span>
        <span>Market Entry · Evidence Boundary · Monitoring Preview</span>
      </footer>

      {selectedEvidence ? (
        <div className={styles.drawerOverlay} role="presentation" onClick={() => setSelectedEvidence(null)}>
          <aside
            aria-labelledby="evidence-drawer-title"
            aria-modal="true"
            className={styles.evidenceDrawer}
            onClick={(event) => event.stopPropagation()}
            role="dialog"
          >
            <div className={styles.drawerHeader}>
              <span>{selectedEvidence.id}</span>
              <button onClick={() => setSelectedEvidence(null)} type="button">닫기</button>
            </div>
            <h2 id="evidence-drawer-title">{selectedEvidence.title}</h2>
            <p>{selectedEvidence.summary}</p>
            <dl>
              <div>
                <dt>Source</dt>
                <dd>{selectedEvidence.source}</dd>
              </div>
              <div>
                <dt>Freshness</dt>
                <dd>{selectedEvidence.freshness}</dd>
              </div>
              <div>
                <dt>Boundary</dt>
                <dd>{selectedEvidence.boundary}</dd>
              </div>
              <div>
                <dt>Related</dt>
                <dd>{selectedEvidence.related}</dd>
              </div>
            </dl>
            <Link href="/research">Research에서 계속 보기</Link>
          </aside>
        </div>
      ) : null}
    </main>
  );
}
