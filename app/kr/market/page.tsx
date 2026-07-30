import Link from "next/link";
import styles from "./page.module.scss";

const priorityItems = [
  {
    rank: "1",
    score: "92",
    title: "반도체 규제 범위 확대 가능성",
    official: "공식 발표 후보",
    impact: "국내·미국 반도체 동시 영향",
    markets: "KOSPI · NASDAQ · 선물",
    entities: "삼성전자 · Apple",
    state: "공식 확인",
    urgency: "가장 먼저 확인"
  },
  {
    rank: "2",
    score: "78",
    title: "환율 상승과 외국인 수급 민감도",
    official: "복수 출처 확인",
    impact: "수출주와 성장주 해석 필요",
    markets: "USD/KRW · KOSPI 선물",
    entities: "대형 수출주",
    state: "복수 출처 확인",
    urgency: "장 중 재확인"
  },
  {
    rank: "3",
    score: "61",
    title: "유가 변동과 에너지 비용 부담",
    official: "단일 출처",
    impact: "운송·화학·항공 비용 영향 후보",
    markets: "WTI 유가 · 환율",
    entities: "에너지 민감 업종",
    state: "단일 출처",
    urgency: "추가 근거 대기"
  }
];

const marketStates = [
  {
    label: "장 시작 전",
    headline: "미국장, 야간 선물, 환율을 먼저 확인합니다.",
    priority: "미국 시장 마감 흐름 · KOSPI 야간 선물 · USD/KRW · WTI 유가",
    action: "개장 전 확인할 변화 정리"
  },
  {
    label: "장 중",
    headline: "현재는 공식 정보와 국내 시장 반응을 함께 봅니다.",
    priority: "KOSPI 현물 · KOSPI 선물 주간 · 거래대금 · 관련 테마 확산",
    action: "움직인 이유와 공식 근거 확인"
  },
  {
    label: "장 마감 후",
    headline: "오늘의 변화가 어떤 근거와 연결됐는지 정리합니다.",
    priority: "마감 요약 · 새로 확인된 투자 근거 · 미확인 내용 · 다음 검토 조건",
    action: "분석과 기록으로 이어가기"
  }
];

const marketBoard = [
  { group: "국내", name: "KOSPI", primary: "현물 예시 2,7xx", secondary: "선물 주간 예시 · 선물 야간 예시", status: "장중 확인" },
  { group: "국내", name: "KOSDAQ", primary: "현물 예시 8xx", secondary: "선물 예시 · 중소형주 흐름", status: "장중 확인" },
  { group: "미국", name: "NASDAQ", primary: "현물 예시 1x,xxx", secondary: "선물 예시 · 야간 반응", status: "마감 후 참고" },
  { group: "미국", name: "S&P 500", primary: "현물 예시 5,xxx", secondary: "선물 예시 · 미국 시장 기준", status: "마감 후 참고" },
  { group: "환율", name: "USD/KRW", primary: "환율 예시 1,3xx", secondary: "장중 흐름 · 야간 환율 참고", status: "확인 중" },
  { group: "원자재", name: "WTI 유가", primary: "유가 예시 xx.xx", secondary: "선물 예시 · 에너지 비용 영향", status: "확인 중" }
];

const timelineItems = [
  { time: "미국장 종료", event: "NASDAQ 현물과 선물 흐름 확인", confidence: "공식 시장 데이터" },
  { time: "장 시작 전", event: "USD/KRW와 WTI 유가 변화 확인", confidence: "복수 출처 확인" },
  { time: "공식 정보", event: "반도체 규제 관련 발표 후보 감지", confidence: "공식 확인 중" },
  { time: "한국장 개장", event: "KOSPI 선물 주간과 대형주 반응 비교", confidence: "장중 확인" },
  { time: "장 중", event: "관련 테마와 종목으로 영향 범위 확장", confidence: "미확인 포함" }
];

const relationFlow = [
  { label: "미국 시장", detail: "NASDAQ 현물·선물" },
  { label: "환율", detail: "USD/KRW 야간·장중" },
  { label: "국내 선물", detail: "KOSPI 주간·야간" },
  { label: "국내 현물", detail: "KOSPI · KOSDAQ" },
  { label: "관련 테마", detail: "반도체 · AI 인프라" },
  { label: "관련 종목", detail: "삼성전자 · Apple" }
];

const themes = [
  { name: "반도체", reason: "공식 발표 범위 확인 필요", evidence: "근거 3개", state: "확인 중" },
  { name: "AI 인프라", reason: "데이터센터 투자 계획 확대", evidence: "근거 2개", state: "확인됨" },
  { name: "에너지 비용", reason: "유가와 환율 동시 변동", evidence: "근거 1개", state: "미확인 포함" }
];

const stocks = [
  { name: "삼성전자", code: "005930", market: "KOSPI", reason: "반도체 규제와 공급망 변화 연결", href: "/kr/stock/005930" },
  { name: "Apple", code: "AAPL", market: "NASDAQ", reason: "AI 기기 공급망 영향 후보", href: "/kr/stock/AAPL" },
  { name: "NVIDIA", code: "NVDA", market: "NASDAQ", reason: "AI 인프라 투자와 선물 반응 연결", href: "/kr/stock/NVDA" }
];

const sectionNameOptions = [
  "오늘 확인할 시장 변화",
  "오늘 먼저 볼 시장 변화",
  "시장 변화와 확인할 근거",
  "오늘 시장에서 달라진 점",
  "움직임보다 먼저 볼 근거"
];

export default function KoreanMarketPage() {
  return (
    <main className={styles.page}>
      <section className={styles.hero} aria-labelledby="market-title">
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>시장 · 장 중 기준</p>
          <h1 id="market-title">지금은 반도체 공식 정보와 국내 시장 반응을 함께 볼 시간입니다.</h1>
          <p>
            등락률보다 먼저 공식 정보, 선물 흐름, 환율, 관련 종목의 연결을 확인합니다. 현재 화면은 예시 값으로
            시장 이해 흐름을 검증합니다.
          </p>
          <div className={styles.heroActions}>
            <Link className={styles.primaryAction} href="#priority-engine">
              가장 먼저 볼 변화 확인
            </Link>
            <Link href="/kr/evidence">공식 근거 확인하기</Link>
          </div>
        </div>
        <div className={styles.statePanel} aria-label="시장 상태별 우선 정보">
          {marketStates.map((state) => (
            <article className={state.label === "장 중" ? styles.activeState : undefined} key={state.label}>
              <strong>{state.label}</strong>
              <span>{state.headline}</span>
              <small>{state.priority}</small>
              <em>{state.action}</em>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.priorityEngine} id="priority-engine" aria-labelledby="priority-title">
        <div className={styles.sectionHeader}>
          <p className={styles.eyebrow}>우선순위 기준</p>
          <h2 id="priority-title">오늘 확인할 시장 변화</h2>
          <span>
            단순 등락률이 아니라 공식 정보, 시장 영향도, 관련 시장, 관련 종목, 확인 상태를 함께 보고 우선순위를
            정합니다.
          </span>
        </div>
        <div className={styles.priorityMap}>
          {priorityItems.map((item) => (
            <article key={item.rank}>
              <div className={styles.priorityScore}>
                <strong>{item.rank}</strong>
                <span>{item.score}</span>
                <small>우선도</small>
              </div>
              <div className={styles.priorityBody}>
                <h3>{item.title}</h3>
                <div className={styles.priorityBar} aria-label={`우선도 ${item.score}`}>
                  <span style={{ width: `${item.score}%` }} />
                </div>
                <p>{item.urgency}</p>
                <dl>
                  <div>
                    <dt>공식 정보</dt>
                    <dd>{item.official}</dd>
                  </div>
                  <div>
                    <dt>시장 영향도</dt>
                    <dd>{item.impact}</dd>
                  </div>
                  <div>
                    <dt>관련 시장</dt>
                    <dd>{item.markets}</dd>
                  </div>
                  <div>
                    <dt>관련 종목</dt>
                    <dd>{item.entities}</dd>
                  </div>
                  <div>
                    <dt>확인 상태</dt>
                    <dd>
                      <span className={styles.confidenceBadge}>{item.state}</span>
                    </dd>
                  </div>
                </dl>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.marketBoard} aria-labelledby="board-title">
        <div className={styles.sectionHeader}>
          <p className={styles.eyebrow}>시장 기준점</p>
          <h2 id="board-title">지수·선물·환율·유가</h2>
          <span>현물과 선물이 존재하는 시장은 같은 박스 안에서 함께 봅니다. 모든 값은 예시입니다.</span>
        </div>
        <div className={styles.boardGrid}>
          {marketBoard.map((item) => (
            <article key={`${item.group}-${item.name}`}>
              <span>{item.group}</span>
              <strong>{item.name}</strong>
              <b>{item.primary}</b>
              <small>{item.secondary}</small>
              <em>{item.status}</em>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.timeline} aria-labelledby="timeline-title">
        <div className={styles.sectionHeader}>
          <p className={styles.eyebrow}>시장 흐름</p>
          <h2 id="timeline-title">시간 순서로 연결되는 변화</h2>
        </div>
        <ol>
          {timelineItems.map((item) => (
            <li key={item.time}>
              <time>{item.time}</time>
              <strong>{item.event}</strong>
              <span>{item.confidence}</span>
            </li>
          ))}
        </ol>
      </section>

      <section className={styles.relation} aria-labelledby="relation-title">
        <div className={styles.sectionHeader}>
          <p className={styles.eyebrow}>시장 간 연결</p>
          <h2 id="relation-title">미국 → 환율 → 국내시장 흐름</h2>
          <span>시장 간 관계는 원인 단정이 아니라 오늘 확인해야 할 연결 경로입니다.</span>
        </div>
        <ol className={styles.relationFlow}>
          {relationFlow.map((item) => (
            <li key={item.label}>
              <strong>{item.label}</strong>
              <span>{item.detail}</span>
            </li>
          ))}
        </ol>
        <p className={styles.relationNote}>
          유가와 금리는 보조 경로로 함께 확인합니다. WTI 유가 변화는 비용 민감 업종, 금리 변화는 성장주와
          장기채 반응을 해석할 때 참고합니다.
        </p>
      </section>

      <section className={styles.twoColumn} aria-label="관련 테마와 관련 종목">
        <div>
          <div className={styles.sectionHeader}>
            <p className={styles.eyebrow}>관련 테마</p>
            <h2>변화에서 파생된 테마</h2>
          </div>
          <ul className={styles.listRows}>
            {themes.map((theme) => (
              <li key={theme.name}>
                <strong>{theme.name}</strong>
                <span>{theme.reason}</span>
                <small>{theme.evidence}</small>
                <em>{theme.state}</em>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div className={styles.sectionHeader}>
            <p className={styles.eyebrow}>관련 종목</p>
            <h2>움직인 이유와 함께 보기</h2>
          </div>
          <ul className={styles.stockRows}>
            {stocks.map((stock) => (
              <li key={stock.code}>
                <Link href={stock.href}>
                  <strong>{stock.name}</strong>
                  <span>{stock.code}</span>
                  <small>{stock.market}</small>
                  <em>{stock.reason}</em>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className={styles.confidence} aria-labelledby="confidence-title">
        <div className={styles.sectionHeader}>
          <p className={styles.eyebrow}>확인 상태</p>
          <h2 id="confidence-title">정보를 신뢰할 수 있는 이유를 함께 표시합니다.</h2>
        </div>
        <div className={styles.confidenceScale}>
          {["공식 확인", "공식 발표", "복수 출처 확인", "단일 출처", "미확인"].map((item) => (
            <span className={item === "미확인" ? styles.unconfirmedBadge : styles.confidenceBadge} key={item}>
              {item}
            </span>
          ))}
        </div>
      </section>

      <section className={styles.emptyState} aria-labelledby="empty-title">
        <div>
          <p className={styles.eyebrow}>정보가 적은 날</p>
          <h2 id="empty-title">새 공식 정보가 없을 때도 다음 행동을 안내합니다.</h2>
          <p>
            시장이 조용한 날에는 억지로 원인을 만들지 않습니다. 주요 기준점, 관심 종목 변화, 다시 확인할 정보를
            중심으로 다음 행동을 제안합니다.
          </p>
        </div>
        <ul>
          <li>주요 지수·선물·환율·유가 기준점 확인</li>
          <li>관심 종목에서 새롭게 감지된 변화 확인</li>
          <li>이전 분석에서 다시 볼 조건 확인</li>
          <li>공식 정보가 확인되면 우선순위에 표시</li>
        </ul>
      </section>

      <section className={styles.evidenceEntry} aria-labelledby="evidence-entry-title">
        <div>
          <p className={styles.eyebrow}>다음 행동</p>
          <h2 id="evidence-entry-title">시장 변화에서 공식 근거와 분석으로 이어갑니다.</h2>
          <p>가격 변화만으로 원인을 단정하지 않고, 확인된 근거와 아직 확인할 내용을 분리합니다.</p>
        </div>
        <div className={styles.heroActions}>
          <Link className={styles.primaryAction} href="/kr/evidence">
            공식 근거 보기
          </Link>
          <Link href="/kr/analysis">분석에 추가하기</Link>
        </div>
      </section>

      <section className={styles.namingReview} aria-labelledby="naming-title">
        <div className={styles.sectionHeader}>
          <p className={styles.eyebrow}>섹션 명칭 검토</p>
          <h2 id="naming-title">선정 명칭: 오늘 확인할 시장 변화</h2>
          <span>
            “오늘 움직인 시장”은 등락 중심으로 읽힐 수 있어, DATE의 근거 우선 흐름에는 “오늘 확인할 시장 변화”가
            더 적합합니다.
          </span>
        </div>
        <ul className={styles.nameOptions}>
          {sectionNameOptions.map((name) => (
            <li key={name}>{name}</li>
          ))}
        </ul>
      </section>
    </main>
  );
}
