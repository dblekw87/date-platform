import Link from "next/link";
import {
  KREntityChip,
  KRHero,
  KRSectionHeader,
  KRStatusBadge,
  KRThemeChip,
  KRCTAGroup
} from "./_components/design-language";
import styles from "./page.module.scss";

const marketItems = [
  {
    name: "KOSPI",
    value: "현물 예시 2,7xx",
    change: "예시 +0.0%",
    details: ["선물 주간 예시", "선물 야간 예시"]
  },
  {
    name: "KOSDAQ",
    value: "현물 예시 8xx",
    change: "예시 -0.0%",
    details: ["선물 예시", "중소형주 흐름"]
  },
  {
    name: "NASDAQ",
    value: "현물 예시 1x,xxx",
    change: "예시 +0.0%",
    details: ["선물 예시", "야간 반응"]
  },
  {
    name: "S&P 500",
    value: "현물 예시 5,xxx",
    change: "예시 +0.0%",
    details: ["선물 예시", "미국 시장 기준"]
  },
  {
    name: "USD/KRW",
    value: "환율 예시 1,3xx",
    change: "예시 변동",
    details: ["장중 흐름", "야간 환율 참고"]
  },
  {
    name: "WTI 유가",
    value: "유가 예시 xx.xx",
    change: "예시 변동",
    details: ["선물 예시", "에너지 비용 영향"]
  },
  {
    name: "금",
    value: "현물 예시 x,xxx",
    change: "예시 변동",
    details: ["선물 예시", "안전자산 참고"]
  },
  {
    name: "BTC",
    value: "자산 예시 xx,xxx",
    change: "예시 -0.0%",
    details: ["24시간 거래", "위험 선호 참고"]
  }
];

const focusItems = [
  {
    title: "반도체 규제 범위 확대 가능성",
    why: "관련 기업의 공급망과 매출 노출을 다시 확인해야 합니다.",
    state: "공식 확인 중",
    linked: "삼성전자 · Apple · 반도체"
  },
  {
    title: "AI 데이터센터 투자 계획 확대",
    why: "인프라 투자와 전력 수요가 관련 종목으로 이어질 수 있습니다.",
    state: "새 공식 정보 확인",
    linked: "AI · 인프라 · 전력"
  },
  {
    title: "금리 기대와 장기채 반응 불일치",
    why: "시장 반응만으로 원인을 단정하기 어려운 구간입니다.",
    state: "추가 확인 필요",
    linked: "금리 · 환율 · 성장주"
  }
];

const themes = [
  { name: "반도체", count: "근거 3개", reason: "수출 규제와 HBM 공급망 변화" },
  { name: "AI", count: "근거 2개", reason: "데이터센터 투자 확대" },
  { name: "인프라", count: "근거 2개", reason: "전력과 설비 투자 연결" },
  { name: "금리", count: "근거 1개", reason: "장기채 반응 재확인 필요" }
];

const watchedStocks = [
  { name: "삼성전자", code: "005930", move: "예시 +0.0%", reason: "공급망 변화와 연결된 근거 확인 중" },
  { name: "Apple", code: "AAPL", move: "예시 -0.0%", reason: "AI 기기 공급망과 관련된 새 근거 확인" },
  { name: "NVIDIA", code: "NVDA", move: "예시 +0.0%", reason: "AI 인프라 투자 기대와 연결" }
];

const evidenceItems = [
  {
    id: "EV-117",
    title: "공식 발표 범위가 관련 기업 공급망에 영향을 줄 수 있는지 확인 중",
    source: "공식 출처 Placeholder",
    time: "공개 시각 예시 09:30",
    state: "확인 중"
  },
  {
    id: "EV-104",
    title: "데이터센터 투자 계획과 반도체 수요 연결 여부 확인",
    source: "공식 발표 Placeholder",
    time: "마지막 확인 예시 10:20",
    state: "확인됨"
  },
  {
    id: "EV-122",
    title: "금리 기대와 시장 반응의 차이를 설명할 추가 정보 필요",
    source: "공식 자료 Placeholder",
    time: "마지막 확인 예시 11:10",
    state: "추가 확인"
  }
];

const watchlistChanges = [
  { name: "삼성전자", detail: "새로운 공식 근거 후보가 연결됐습니다.", state: "확인 중" },
  { name: "Apple", detail: "AI 기기 공급망 관련 근거가 추가됐습니다.", state: "확인됨" }
];

export default function KoreanHome() {
  return (
    <main>
      <KRHero
        aside={
          <aside className={styles.searchBox} aria-labelledby="kr-search-title">
            <h2 id="kr-search-title">찾고 싶은 종목이나 근거가 있나요?</h2>
            <div className={styles.searchPlaceholder}>종목명, 종목 코드, 테마, 투자 근거 검색</div>
            <p>검색은 보조 진입입니다. 먼저 오늘 시장의 핵심 변화를 확인하세요.</p>
          </aside>
        }
        className={styles.hero}
        copyClassName={styles.heroCopy}
        description={
          <>
            미국 반도체 규제 범위가 확대될 가능성이 제기됐습니다. 관련 종목의 공급망, 매출 노출, 시행 시점은
            아직 추가 확인이 필요합니다.
          </>
        }
        descriptionClassName={styles.heroLead}
        eyebrow="오늘 시장 한눈에 보기 · 예시 화면"
        id="kr-home-title"
        title="오늘은 반도체 관련 공식 정보를 먼저 확인해야 합니다."
      >
          <dl className={styles.trustList}>
            <div>
              <dt>공식 확인</dt>
              <dd>확인 중</dd>
            </div>
            <div>
              <dt>공개 시각</dt>
              <dd>예시 09:30</dd>
            </div>
            <div>
              <dt>관련 종목</dt>
              <dd>삼성전자 · Apple</dd>
            </div>
            <div>
              <dt>아직 확인할 내용</dt>
              <dd>정책 범위 · 시행 시점</dd>
            </div>
          </dl>
          <KRCTAGroup
            actions={[
              { href: "/kr/evidence", label: "공식 근거 확인하기", variant: "primary" },
              { href: "/kr/stock/005930", label: "관련 종목 보기" }
            ]}
            className={styles.heroActions}
            primaryClassName={styles.primaryAction}
          />
      </KRHero>

      <section className={styles.marketStrip} aria-labelledby="market-title">
        <KRSectionHeader className={styles.sectionHeader} eyebrow="시장 기준점" eyebrowClassName={styles.eyebrow} id="market-title" title="주요 지수·선물·환율·유가" />
        <div className={styles.marketItems}>
          {marketItems.map((item) => (
            <article key={item.name}>
              <strong>{item.name}</strong>
              <span>{item.value}</span>
              <em>{item.change}</em>
              <small>{item.details.join(" · ")}</small>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.todayFocus} aria-labelledby="focus-title">
        <KRSectionHeader
          className={styles.sectionHeader}
          description="등락이 아니라 공식 정보와 아직 확인되지 않은 내용을 함께 봅니다."
          eyebrow="오늘 꼭 확인할 변화"
          eyebrowClassName={styles.eyebrow}
          id="focus-title"
          title="핵심 변화 3개"
        />
        <div className={styles.focusList}>
          {focusItems.map((item, index) => (
            <article key={item.title}>
              <span>{index + 1}</span>
              <div>
                <h3>{item.title}</h3>
                <p>{item.why}</p>
                <small>{item.state} · {item.linked}</small>
              </div>
              <Link href={index === 0 ? "/kr/evidence" : "/kr/market"}>근거 보기</Link>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.twoColumn} aria-label="테마와 많이 보는 종목">
        <div className={styles.themeFlow}>
          <KRSectionHeader className={styles.sectionHeader} eyebrow="주목받는 테마" eyebrowClassName={styles.eyebrow} title="시장 변화에서 이어지는 테마" />
          <div className={styles.themeTabs} aria-label="테마 목록">
            {themes.map((theme) => (
              <KRThemeChip key={theme.name} label={theme.name} selected={theme.name === "반도체"} />
            ))}
          </div>
          <ul className={styles.simpleList}>
            {themes.map((theme) => (
              <li key={theme.name}>
                <strong>{theme.name}</strong>
                <span>{theme.reason}</span>
                <em>{theme.count}</em>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.stockList}>
          <KRSectionHeader className={styles.sectionHeader} eyebrow="많이 보는 종목" eyebrowClassName={styles.eyebrow} title="움직인 이유와 함께 보기" />
          <ul className={styles.stockRows}>
            {watchedStocks.map((stock) => (
              <li key={stock.code}>
                <KREntityChip href={stock.code === "005930" ? "/kr/stock/005930" : stock.code === "AAPL" ? "/kr/stock/AAPL" : "/kr/market"} label={stock.name}>
                  <strong>{stock.name}</strong>
                  <span>{stock.code}</span>
                  <em>{stock.move}</em>
                  <small>{stock.reason}</small>
                </KREntityChip>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className={styles.reasonSection} aria-labelledby="reason-title">
        <KRSectionHeader className={styles.sectionHeader} eyebrow="움직인 이유" eyebrowClassName={styles.eyebrow} id="reason-title" title="시장 변화가 종목과 어떻게 연결되는지 확인하세요." />
        <ol className={styles.reasonFlow}>
          <li>공식 정보가 공개됐는지 확인</li>
          <li>관련 테마와 산업을 연결</li>
          <li>관련 종목의 노출 범위를 확인</li>
          <li>시장 반응과 확인된 사실을 분리</li>
          <li>아직 단정할 수 없는 내용을 남김</li>
        </ol>
      </section>

      <section className={styles.evidenceSection} aria-labelledby="evidence-title">
        <KRSectionHeader className={styles.sectionHeader} eyebrow="공식적으로 확인된 투자 근거" eyebrowClassName={styles.eyebrow} id="evidence-title" title="출처와 공개 시각을 먼저 확인합니다." />
        <div className={styles.evidenceLayout}>
          <Link className={styles.leadEvidence} href="/kr/evidence">
            <span>{evidenceItems[0].id}</span>
            <strong>{evidenceItems[0].title}</strong>
            <small>{evidenceItems[0].source} · {evidenceItems[0].time}</small>
            <KRStatusBadge className={styles.inlineStatus}>{evidenceItems[0].state}</KRStatusBadge>
          </Link>
          <ul className={styles.evidenceRows}>
            {evidenceItems.slice(1).map((item) => (
              <li key={item.id}>
                <Link href="/kr/evidence">
                  <span>{item.id}</span>
                  <strong>{item.title}</strong>
                  <small>{item.source} · {item.time}</small>
                  <KRStatusBadge className={styles.inlineStatus}>{item.state}</KRStatusBadge>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className={styles.needConfirm} aria-labelledby="need-title">
        <div>
          <p className={styles.eyebrow}>아직 확인되지 않은 내용</p>
          <h2 id="need-title">정책 범위와 시행 시점은 아직 단정할 수 없습니다.</h2>
          <p>공식 정보가 추가로 확인되기 전까지는 영향 범위를 추정으로만 다룹니다.</p>
        </div>
        <details>
          <summary>추가로 확인해야 하는 정보 보기</summary>
          <ul>
            <li>적용 대상 기업의 범위</li>
            <li>시행 시점과 유예 기간</li>
            <li>관련 ETF 구성 종목 영향</li>
          </ul>
        </details>
      </section>

      <section className={styles.watchlistSection} aria-labelledby="watch-title">
        <KRSectionHeader className={styles.sectionHeader} eyebrow="관심 종목에서 달라진 내용" eyebrowClassName={styles.eyebrow} id="watch-title" title="새롭게 감지된 변화를 먼저 봅니다." />
        <ul className={styles.simpleList}>
          {watchlistChanges.map((item) => (
            <li key={item.name}>
              <strong>{item.name}</strong>
              <span>{item.detail}</span>
              <em>{item.state}</em>
            </li>
          ))}
        </ul>
        <KRCTAGroup
          actions={[{ href: "/kr/changes?view=latest", label: "달라진 내용 확인하기", variant: "primary" }]}
          className={styles.heroActions}
          primaryClassName={styles.primaryAction}
        />
      </section>

      <section className={styles.twoColumnBottom} aria-label="이어서 분석과 최근 판단 기록">
        <article>
          <KRSectionHeader className={styles.sectionHeader} eyebrow="이어서 분석" eyebrowClassName={styles.eyebrow} title="반도체 공급망 분석을 이어서 볼 수 있습니다." />
          <p>비교 중인 근거: EV-117 · EV-104</p>
          <Link href="/kr/analysis?id=samsung-semiconductor-001">분석 열기</Link>
        </article>
        <article>
          <KRSectionHeader className={styles.sectionHeader} eyebrow="최근 판단 기록" eyebrowClassName={styles.eyebrow} title="이전 판단에서 달라진 근거가 있습니다." />
          <p>판단 결과가 아니라 당시 근거와 다시 볼 조건을 확인합니다.</p>
          <Link href="/kr/journal">기록 보기</Link>
        </article>
      </section>
    </main>
  );
}
