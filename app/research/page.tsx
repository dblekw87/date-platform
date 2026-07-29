"use client";

import { useMemo, useState } from "react";
import styles from "./page.module.scss";

type EvidenceItem = {
  id: string;
  title: string;
  sources: string[];
  status: string;
  relatedContext: string;
  openQuestion: string | null;
};

type MonitoringItem = {
  id: string;
  rule: string;
  signal: string;
  status: "확인 필요" | "정상 범위";
  owner: string;
  scope: string;
};

type InterestedEntity = {
  symbol: string;
  name: string;
  reason: string;
  state: string;
};

const workspaceNavigation = ["대시보드", "탐색", "리서치", "모니터", "저널"];
const workspaceViews = ["개요", "근거", "타임라인", "모니터링"];

const marketSnapshotItems = [
  {
    name: "KOSPI",
    value: "Mock Prototype 2,7xx.xx",
    change: "Mock +0.00%",
    status: "Prototype market open",
    updated: "Updated: Mock time placeholder"
  },
  {
    name: "KOSDAQ",
    value: "Mock Prototype 8xx.xx",
    change: "Mock -0.00%",
    status: "Prototype market open",
    updated: "Updated: Mock time placeholder"
  },
  {
    name: "NASDAQ",
    value: "Mock Prototype 1x,xxx.xx",
    change: "Mock +0.00%",
    status: "Prototype delayed status",
    updated: "Updated: Mock time placeholder"
  },
  {
    name: "S&P 500",
    value: "Mock Prototype 5,xxx.xx",
    change: "Mock -0.00%",
    status: "Prototype delayed status",
    updated: "Updated: Mock time placeholder"
  },
  {
    name: "USD/KRW",
    value: "Mock Prototype 1,xxx.xx",
    change: "Mock +0.00%",
    status: "Prototype FX status",
    updated: "Updated: Mock time placeholder"
  },
  {
    name: "BTC",
    value: "Mock Prototype xx,xxx USD",
    change: "Mock -0.00%",
    status: "Prototype crypto status",
    updated: "Updated: Mock time placeholder"
  }
];

const marketBlocks = [
  { label: "시장 상태", value: "Mock: 방향 검토", state: "보조 상태: 판단 전" },
  { label: "시장 폭", value: "Mock: 분산 확인", state: "보조 상태: 근거 필요" },
  { label: "변동성", value: "Mock: 구간 관찰", state: "보조 상태: 이벤트 대기" },
  { label: "거시 신호", value: "Mock: 영향 범위 확인", state: "보조 상태: 출처 검토" }
];

const evidenceItems: EvidenceItem[] = [
  {
    id: "EV-104",
    title: "짧은 제목",
    sources: ["제공처 A"],
    status: "출처 확인 필요",
    relatedContext: "시장 상태 / 매출 전망",
    openQuestion: "동일 업종에도 같은 신호가 반복되는가?"
  },
  {
    id: "EV-117",
    title: "정책 금리 변화와 환율 민감도가 동시에 반영되는 긴 제목의 근거 항목",
    sources: ["제공처 B", "리서치 메모 C"],
    status: "타임라인 연결됨",
    relatedContext: "이벤트 흐름 / 거시 신호",
    openQuestion: null
  },
  {
    id: "EV-122",
    title: "섹터 폭 차이",
    sources: ["제공처 D"],
    status: "비교 대기",
    relatedContext: "시장 폭 / 관심 대상",
    openQuestion: "현재 관찰 목록과 연결할 기준이 충분한가?"
  }
];

const eventFlowItems = [
  { time: "09:30", label: "시장 맥락 열림", detail: "Overview에서 방향 검토가 시작된 상태" },
  { time: "10:15", label: "근거가 관심 목록에 연결됨", detail: "선택 근거와 관심 대상의 관계 확인 필요" },
  { time: "11:20", label: "모니터링 규칙 변경됨", detail: "알림 기준 변경 후 소유 범위 재확인" },
  { time: "13:00", label: "판단 맥락 대기", detail: "Return Context에 복귀 단서 보존" }
];

const monitoringItems: MonitoringItem[] = [
  {
    id: "MN-01",
    rule: "매출 전망 조정이 관심 대상과 같은 방향으로 2회 이상 반복될 때",
    signal: "브릭 에너지 관련 근거가 오전 이벤트 흐름과 연결됨",
    status: "확인 필요",
    owner: "Dashboard Workspace",
    scope: "관심 목록 / 에너지"
  },
  {
    id: "MN-02",
    rule: "변동성 구간이 확대되더라도 출처가 단일 제공처에 머물 때",
    signal: "추가 출처 없음, 기존 관찰 범위 유지",
    status: "정상 범위",
    owner: "Monitor Workspace",
    scope: "시장 상태 / 변동성"
  }
];

const interestedEntities: InterestedEntity[] = [
  {
    symbol: "BRK",
    name: "브릭 에너지",
    reason: "선택 근거와 모니터링 알림이 같은 맥락을 공유",
    state: "확인 필요"
  },
  {
    symbol: "ALP",
    name: "알파 시스템즈",
    reason: "시장 폭 차이와 연결 가능성이 있으나 열린 질문 없음",
    state: "관찰"
  },
  {
    symbol: "CRN",
    name: "크론 마켓",
    reason: "현재 신호는 정상 범위에 머물러 복귀 우선순위 낮음",
    state: "대기"
  }
];

export default function Home() {
  const [activeWorkspace, setActiveWorkspace] = useState(workspaceNavigation[0]);
  const [activeView, setActiveView] = useState(workspaceViews[0]);
  const [selectedEvidence, setSelectedEvidence] = useState(evidenceItems[0]);
  const [selectedEntity, setSelectedEntity] = useState(interestedEntities[0]);
  const [selectedMonitoring, setSelectedMonitoring] = useState(monitoringItems[0]);

  const returnContextRows = useMemo(
    () => [
      ["선택 근거", selectedEvidence.id],
      ["현재 맥락", activeView],
      ["관련 대상", selectedEntity.symbol],
      ["출처", selectedEvidence.sources.join(" / ")],
      ["상태", selectedEvidence.status],
      ["열린 질문", selectedEvidence.openQuestion ?? "없음"]
    ],
    [activeView, selectedEntity.symbol, selectedEvidence]
  );

  return (
    <main className={styles.shell}>
      <aside className={styles.workspaceNavigation} aria-label="작업공간 전환">
        <div className={styles.navHeader}>
          <span className={styles.kicker}>Phase 17.1</span>
          <strong>DATE</strong>
          <small>작업공간 전환</small>
        </div>
        <div className={styles.navList}>
          {workspaceNavigation.map((item) => (
            <button
              className={item === activeWorkspace ? styles.selectedControl : styles.control}
              key={item}
              onClick={() => setActiveWorkspace(item)}
              type="button"
            >
              {item}
            </button>
          ))}
        </div>
        <div className={styles.navFooter}>
          <span>Entry Navigation</span>
          <span>Workspace boundary</span>
        </div>
      </aside>

      <section className={styles.dashboardScreen} aria-label="대시보드 화면">
        <header className={styles.screenHeader}>
          <div>
            <span className={styles.kicker}>Dashboard Workspace</span>
            <h1>대시보드 구조 와이어프레임</h1>
          </div>
          <nav className={styles.viewNavigation} aria-label="현재 작업공간 보기 전환">
            <span>Workspace View</span>
            <div>
              {workspaceViews.map((view) => (
                <button
                  className={view === activeView ? styles.selectedControl : styles.control}
                  key={view}
                  onClick={() => setActiveView(view)}
                  type="button"
                >
                  {view}
                </button>
              ))}
            </div>
          </nav>
        </header>

        <section className={styles.overviewSection} aria-labelledby="overview-title">
          <div className={styles.sectionHeader}>
            <div>
              <span className={styles.kicker}>Official Section</span>
              <h2 id="overview-title">Overview</h2>
            </div>
            <span>Market Snapshot / Market Interpretation / Attention Evidence Preview / Event Flow Cue</span>
          </div>

          <div className={styles.marketSnapshotBlock} aria-label="Market Snapshot">
            <div className={styles.blockHeader}>
              <h3>Market Snapshot</h3>
              <span>대표 지수와 주요 자산의 현재 상태를 빠르게 확인</span>
            </div>
            <div className={styles.marketSnapshotGrid}>
              {marketSnapshotItems.map((item) => (
                <article className={styles.snapshotItem} key={item.name}>
                  <span>{item.name}</span>
                  <strong>{item.value}</strong>
                  <small>{item.change}</small>
                  <em>{item.status}</em>
                  <small>{item.updated}</small>
                </article>
              ))}
            </div>
          </div>

          <div className={styles.marketInterpretationBlock} aria-label="Market Interpretation">
            <div className={styles.blockHeader}>
              <h3>Market Interpretation</h3>
              <span>시장 상태, 시장 폭, 변동성, 거시 신호를 해석하는 요약</span>
            </div>
            <div className={styles.marketStateGrid}>
              {marketBlocks.map((block) => (
                <article className={styles.summaryItem} key={block.label}>
                  <span>{block.label}</span>
                  <strong>{block.value}</strong>
                  <small>{block.state}</small>
                </article>
              ))}
            </div>
          </div>

          <div className={styles.overviewGrid}>
            <div className={styles.blockGroup} aria-label="Attention Evidence Preview">
              <div className={styles.blockHeader}>
                <h3>Attention Evidence Preview</h3>
                <span>선택/비선택, 출처 수, 열린 질문 검증</span>
              </div>
              <div className={styles.evidenceList}>
                {evidenceItems.map((item) => (
                  <button
                    className={item.id === selectedEvidence.id ? styles.selectedEvidenceItem : styles.evidenceItem}
                    key={item.id}
                    onClick={() => setSelectedEvidence(item)}
                    type="button"
                  >
                    <span>{item.id}</span>
                    <strong>{item.title}</strong>
                    <small>Source: {item.sources.join(" / ")}</small>
                    <small>Status: {item.status}</small>
                    <small>Related: {item.relatedContext}</small>
                    <em>Open Question: {item.openQuestion ?? "없음"}</em>
                  </button>
                ))}
              </div>
            </div>

            <div className={styles.blockGroup} aria-label="Event Flow Cue">
              <div className={styles.blockHeader}>
                <h3>Event Flow Cue</h3>
                <span>시간 순서와 근거 연결 단서</span>
              </div>
              <ol className={styles.eventFlowList}>
                {eventFlowItems.map((item) => (
                  <li key={`${item.time}-${item.label}`}>
                    <span>{item.time}</span>
                    <div>
                      <strong>{item.label}</strong>
                      <small>{item.detail}</small>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        <section className={styles.monitoringSection} aria-labelledby="monitoring-title">
          <div className={styles.sectionHeader}>
            <div>
              <span className={styles.kicker}>Official Section</span>
              <h2 id="monitoring-title">Monitoring Preview</h2>
            </div>
            <span>Monitoring Alerts / Interested Entity Preview</span>
          </div>

          <div className={styles.monitoringGrid}>
            <div className={styles.blockGroup} aria-label="Monitoring Alerts">
              <div className={styles.blockHeader}>
                <h3>Monitoring Alerts</h3>
                <span>알림 발생 상태와 정상 상태 구분</span>
              </div>
              <div className={styles.monitoringList}>
                {monitoringItems.map((item) => (
                  <button
                    className={item.id === selectedMonitoring.id ? styles.selectedMonitoringItem : styles.monitoringItem}
                    key={item.id}
                    onClick={() => setSelectedMonitoring(item)}
                    type="button"
                  >
                    <span>{item.id}</span>
                    <strong>{item.rule}</strong>
                    <small>Signal: {item.signal}</small>
                    <small>Status: {item.status}</small>
                    <small>Owner: {item.owner}</small>
                    <small>Scope: {item.scope}</small>
                  </button>
                ))}
              </div>
            </div>

            <div className={styles.blockGroup} aria-label="Interested Entity Preview">
              <div className={styles.blockHeader}>
                <h3>Interested Entity Preview</h3>
                <span>관심 대상 복귀 가능성</span>
              </div>
              <div className={styles.entityList}>
                {interestedEntities.map((item) => (
                  <button
                    className={item.symbol === selectedEntity.symbol ? styles.selectedEntityItem : styles.entityItem}
                    key={item.symbol}
                    onClick={() => setSelectedEntity(item)}
                    type="button"
                  >
                    <span>{item.symbol}</span>
                    <strong>{item.name}</strong>
                    <small>{item.reason}</small>
                    <em>{item.state}</em>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>
      </section>

      <aside className={styles.returnContext} aria-label="Return Context">
        <div className={styles.sectionHeader}>
          <div>
            <span className={styles.kicker}>Official Section</span>
            <h2>Return Context</h2>
          </div>
          <span>Selected Context Panel</span>
        </div>

        <div className={styles.returnContextPrimary}>
          <span>Selected Entity 또는 Evidence</span>
          <strong>{selectedEvidence.title}</strong>
          <small>{selectedEntity.name} / {selectedMonitoring.status}</small>
        </div>

        <dl className={styles.returnContextRows}>
          {returnContextRows.map(([label, value]) => (
            <div key={label}>
              <dt>{label}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>

        <div className={styles.returnContextBlock}>
          <strong>Related Evidence</strong>
          <p>{selectedEvidence.relatedContext}</p>
        </div>

        <div className={styles.returnContextBlock}>
          <strong>Available Action</strong>
          <button disabled type="button">
            Prototype action disabled
          </button>
        </div>
      </aside>
    </main>
  );
}
