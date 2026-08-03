import Link from "next/link";
import styles from "./page.module.scss";

const marketRail = [
  { label: "NASDAQ 선물", value: "위험 선호 확인", state: "미국장 기준", note: "기술주 반응" },
  { label: "10Y 금리", value: "방향 확인", state: "macro 변수", note: "성장주 부담" },
  { label: "달러지수", value: "강도 확인", state: "환율 변수", note: "외국인 수급" },
  { label: "VIX", value: "관찰", state: "심리 변수", note: "변동성 체온" },
  { label: "WTI", value: "확인", state: "원자재", note: "인플레 변수" },
  { label: "USD/KRW", value: "연동 확인", state: "국내 연결", note: "개장 전 기준" }
];

const changeItems = [
  {
    time: "09:12",
    freshness: "18분 전",
    type: "미국장 headline",
    title: "나스닥 선물 반등 구간에서 AI 인프라 투자 headline이 함께 관찰됩니다.",
    sourceState: "원문 확인 필요",
    summaryState: "요약은 해석 레이어",
    question: "금리와 달러가 같은 방향으로 완화되는지 함께 확인해야 합니다.",
    next: "미국장 본장 초반 금리 / 나스닥 반응 재확인",
    candidateState: "관련 종목 연결은 보류",
    candidates: ["AI 인프라", "반도체", "전력"]
  },
  {
    time: "09:28",
    freshness: "2분 전",
    type: "공식 이벤트",
    title: "이번 주 CPI와 FOMC 발언 일정이 기술주 변동성 구간과 겹칩니다.",
    sourceState: "공식 확인됨",
    summaryState: "요약 사용 가능",
    question: "발표 전 포지션 조정보다 이벤트 전 변동성 확대 가능성을 확인합니다.",
    next: "발표 시간과 이전 컨센서스 비교",
    candidateState: "시장 변수 우선",
    candidates: ["금리", "달러", "나스닥"]
  },
  {
    time: "09:34",
    freshness: "방금",
    type: "외신",
    title: "장기금리 하락에도 일부 성장주 반응이 약해 반응 강도를 분리해서 봅니다.",
    sourceState: "언론 보도만 있음",
    summaryState: "번역 검토 필요",
    question: "금리 완화가 지수 전체로 번지는지, 일부 테마에만 머무는지 확인합니다.",
    next: "연준 발언 원문 확인",
    candidateState: "원인 단정 보류",
    candidates: ["성장주", "금리", "VIX"]
  }
];

const evidenceGroups = [
  { label: "공식 출처", count: "2", detail: "공시 1 · 정책 문서 후보 1", state: "우선 검토" },
  { label: "언론 보도", count: "5", detail: "외신 3 · 국내 2", state: "보조 근거" },
  { label: "SNS / 관찰", count: "1", detail: "시장 반응 관찰", state: "근거 아님" }
];

const flowRows = [
  { label: "외국인", state: "방향 확인", detail: "개장 초반 선물 / 현물 동시 확인" },
  { label: "기관", state: "대기", detail: "프로그램 매매와 함께 비교" },
  { label: "ETF", state: "관찰", detail: "SOXX / QQQ / 반도체 ETF 반응" },
  { label: "거래대금", state: "중요", detail: "뉴스 반응 종목은 거래대금 동반 여부 확인" }
];

const technicalRows = [
  { label: "지수선물", state: "기준선", detail: "전일 고점 / VWAP 부근 반응" },
  { label: "주도 테마", state: "확인", detail: "첫 눌림 이후 거래량 유지 여부" },
  { label: "개별 종목", state: "보조", detail: "시황과 수급 확인 후 위치만 점검" }
];

const impactRows = [
  { entity: "AI 인프라", type: "테마", status: "관찰", reason: "headline은 많지만 지수 반응과 개별 종목 반응을 분리해야 합니다." },
  { entity: "반도체", type: "테마", status: "보류", reason: "미국장 반응이 국내 종목으로 이어진다고 단정하지 않습니다." },
  { entity: "성장주", type: "스타일", status: "확인 중", reason: "금리 완화와 실적 기대 중 어떤 변수가 강한지 봐야 합니다." },
  { entity: "환율", type: "시장 변수", status: "관찰", reason: "달러 방향과 원화 개장 전 반응을 같이 확인합니다." }
];

const reactionRows = [
  {
    market: "미국 저유동성",
    name: "AI 전력 장비주 후보",
    headline: "AI 데이터센터 전력 수요 headline과 같은 시간대에 거래량 증가",
    check: "원문 / 공시 여부 확인 전까지 재료 후보",
    risk: "스프레드 · 급등락 주의"
  },
  {
    market: "한국 테마주",
    name: "전력설비 테마 후보",
    headline: "미국 AI 인프라 headline 이후 관련 테마 검색량 증가",
    check: "국내 공시나 수주 근거는 아직 없음",
    risk: "테마 순환 · 장초반 과열 주의"
  },
  {
    market: "소형주",
    name: "정책 수혜 후보군",
    headline: "정책 키워드와 같은 시간대에 종목 게시판 / 뉴스 노출 증가",
    check: "실제 매출 연결 근거 필요",
    risk: "유동성 낮음 · 원인 단정 금지"
  }
];

const nextChecks = [
  { due: "미국장 개장 전", source: "지수선물 / 금리", condition: "나스닥 선물과 10Y 금리가 같은 방향으로 움직이는지 확인" },
  { due: "본장 30분 후", source: "뉴스 흐름", condition: "AI headline이 지수 전체 반응인지 특정 테마 반응인지 분리" },
  { due: "국내 개장 전", source: "환율 / 야간선물", condition: "미국장 반응이 국내 개장 기준점으로 이어지는지 확인" }
];

export default function ReferenceBoardWireframe() {
  return (
    <main className={styles.page}>
      <section className={styles.hero} aria-labelledby="reference-board-title">
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>SaveTicker + YASUN.GG 조합 와이어프레임</p>
          <h1 id="reference-board-title">미국장 매크로와 뉴스 흐름을 먼저 보는 대응 보드</h1>
          <p>
            빠른 시장 변화는 먼저 보여주되, 뉴스 하나를 원인으로 단정하지 않고 금리, 달러, 지수선물, 헤드라인 흐름을 함께 봅니다.
          </p>
        </div>
        <aside className={styles.contextPanel} aria-label="화면 기준">
          <dl>
            <div>
              <dt>Primary action</dt>
              <dd>대응 전 변수 확인</dd>
            </div>
            <div>
              <dt>Cause rule</dt>
              <dd>원인 단정 금지</dd>
            </div>
            <div>
              <dt>Summary rule</dt>
              <dd>요약은 해석 레이어</dd>
            </div>
          </dl>
        </aside>
      </section>

      <section className={styles.terminalRail} aria-labelledby="market-rail-title">
        <div className={styles.sectionHeader}>
          <p className={styles.eyebrow}>시황 / 뉴스</p>
          <h2 id="market-rail-title">미국장 체온과 헤드라인 흐름을 가장 먼저 봅니다.</h2>
        </div>
        <div className={styles.railItems}>
          {marketRail.map((item) => (
            <article key={item.label}>
              <strong>{item.label}</strong>
              <span>{item.value}</span>
              <em>{item.state}</em>
              <small>{item.note}</small>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.boardGrid} aria-label="검증 중심 시장 보드">
        <div className={styles.changeColumn}>
          <div className={styles.sectionHeader}>
            <p className={styles.eyebrow}>오늘 확인할 변화</p>
            <h2>뉴스는 원인이 아니라 같은 시간대에 관찰된 흐름입니다.</h2>
          </div>
          <div className={styles.changeList}>
            {changeItems.map((item) => (
              <article className={styles.changeItem} key={item.title}>
                <header>
                  <time>{item.time}</time>
                  <span>{item.freshness}</span>
                  <b>{item.type}</b>
                </header>
                <h3>{item.title}</h3>
                <dl className={styles.changeMeta}>
                  <div>
                    <dt>출처 상태</dt>
                    <dd>{item.sourceState}</dd>
                  </div>
                  <div>
                    <dt>요약 상태</dt>
                    <dd>{item.summaryState}</dd>
                  </div>
                  <div>
                    <dt>확인 질문</dt>
                    <dd>{item.question}</dd>
                  </div>
                  <div>
                    <dt>다음 확인</dt>
                    <dd>{item.next}</dd>
                  </div>
                </dl>
                <div className={styles.candidateLine}>
                  <strong>{item.candidateState}</strong>
                  <div>
                    {item.candidates.map((candidate) => (
                      <span key={candidate}>{candidate}</span>
                    ))}
                  </div>
                </div>
                <Link href="/kr/evidence">근거 경계 확인하기</Link>
              </article>
            ))}
          </div>
        </div>

        <aside className={styles.sideColumn} aria-label="근거 경계와 영향 후보">
          <section className={styles.panel}>
            <div className={styles.sectionHeader}>
              <p className={styles.eyebrow}>근거 경계</p>
              <h2>출처 수를 신뢰도로 쓰지 않습니다.</h2>
            </div>
            <ul className={styles.sourceList}>
              {evidenceGroups.map((group) => (
                <li key={group.label}>
                  <strong>{group.label}</strong>
                  <span>{group.count}개</span>
                  <small>{group.detail}</small>
                  <em>{group.state}</em>
                </li>
              ))}
            </ul>
          </section>

          <section className={styles.panel}>
            <div className={styles.sectionHeader}>
              <p className={styles.eyebrow}>수급</p>
              <h2>뉴스 다음에는 돈이 실제로 들어오는지 봅니다.</h2>
            </div>
            <ul className={styles.sourceList}>
              {flowRows.map((row) => (
                <li key={row.label}>
                  <strong>{row.label}</strong>
                  <span>{row.state}</span>
                  <small>{row.detail}</small>
                </li>
              ))}
            </ul>
          </section>

          <section className={styles.panel}>
            <div className={styles.sectionHeader}>
              <p className={styles.eyebrow}>차트 / 기술적 분석</p>
              <h2>차트는 세 번째입니다. 위치와 리스크만 확인합니다.</h2>
            </div>
            <ul className={styles.sourceList}>
              {technicalRows.map((row) => (
                <li key={row.label}>
                  <strong>{row.label}</strong>
                  <span>{row.state}</span>
                  <small>{row.detail}</small>
                </li>
              ))}
            </ul>
          </section>

          <section className={styles.panel}>
            <div className={styles.sectionHeader}>
              <p className={styles.eyebrow}>영향 후보</p>
              <h2>종목보다 테마와 시장 변수를 먼저 둡니다.</h2>
            </div>
            <ul className={styles.impactList}>
              {impactRows.map((row) => (
                <li key={`${row.entity}-${row.type}`}>
                  <strong>{row.entity}</strong>
                  <span>{row.type}</span>
                  <em>{row.status}</em>
                  <small>{row.reason}</small>
                </li>
              ))}
            </ul>
          </section>
        </aside>
      </section>

      <section className={styles.nextQueue} aria-labelledby="next-queue-title">
        <div className={styles.sectionHeader}>
          <p className={styles.eyebrow}>다음 확인 큐</p>
          <h2 id="next-queue-title">화면의 마지막 행동은 매매가 아니라 대응 전 확인입니다.</h2>
        </div>
        <div className={styles.nextRows}>
          {nextChecks.map((check) => (
            <article key={`${check.due}-${check.source}`}>
              <time>{check.due}</time>
              <strong>{check.source}</strong>
              <p>{check.condition}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.reactionScanner} aria-labelledby="reaction-scanner-title">
        <div className={styles.sectionHeader}>
          <p className={styles.eyebrow}>뉴스 반응 감지 · 예외 구간</p>
          <h2 id="reaction-scanner-title">소형주, 미국 잡주, 한국 테마주는 따로 연결해 봅니다.</h2>
          <p>이 구간은 원인 설명이 아니라 headline과 가격 / 거래량 반응이 같은 시간대에 관찰된 후보만 모읍니다.</p>
        </div>
        <div className={styles.reactionRows}>
          {reactionRows.map((row) => (
            <article key={`${row.market}-${row.name}`}>
              <span>{row.market}</span>
              <h3>{row.name}</h3>
              <dl>
                <div>
                  <dt>관찰된 흐름</dt>
                  <dd>{row.headline}</dd>
                </div>
                <div>
                  <dt>확인할 내용</dt>
                  <dd>{row.check}</dd>
                </div>
                <div>
                  <dt>주의</dt>
                  <dd>{row.risk}</dd>
                </div>
              </dl>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
