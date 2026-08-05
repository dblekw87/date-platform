import Link from "next/link";
import styles from "./page.module.scss";

const themeRows = [
  {
    rank: 1,
    name: "반도체",
    signal: "거래대금 집중",
    leaders: ["SK하이닉스", "삼성전자", "삼성전기"],
    evidence: "토스증권 거래대금 상위와 반도체 뉴스 동시 확인",
    check: "대형주와 부품주가 같은 방향인지 확인"
  },
  {
    rank: 2,
    name: "수소·연료전지",
    signal: "개별 계약 뉴스",
    leaders: ["두산퓨얼셀"],
    evidence: "SOFC 스택 수출, 공급계약 보도",
    check: "계약 규모와 매출 반영 시점 확인"
  },
  {
    rank: 3,
    name: "전력기기",
    signal: "전력 인프라 수요",
    leaders: ["효성중공업", "LS ELECTRIC"],
    evidence: "전력설비 거래대금과 해외 수주 뉴스",
    check: "수주 공시와 실제 납기 조건 확인"
  },
  {
    rank: 4,
    name: "MLCC·전자부품",
    signal: "전자부품 확산",
    leaders: ["삼성전기", "삼화콘덴서"],
    evidence: "MLCC, 기판, 카메라모듈 관련 종목 동반 강세",
    check: "반도체와 독립 테마인지 동행 테마인지 분리"
  }
];

const checklist = [
  "거래대금 상위 종목이 같은 테마 안에서 2개 이상 나오는지 확인",
  "상승률만 큰 종목은 테마 주도주가 아니라 급등 후보로 분리",
  "개별 계약·임상·공급 뉴스는 테마 뉴스와 섞지 않음",
  "테마명이 종목명으로 잡히면 분류 사전에 추가"
];

export default function KoreanThemePage() {
  return (
    <main className={styles.page}>
      <section className={styles.hero} aria-labelledby="theme-title">
        <p>테마</p>
        <h1 id="theme-title">금일 강세 테마를 거래대금과 근거로 확인합니다.</h1>
        <span>테마는 추천 목록이 아니라 시장에서 돈이 모이는 방향과 원문 확인 대상을 정리하는 화면입니다.</span>
        <div>
          <Link href="/">시장 보드</Link>
          <Link href="/kr/market">시장 기준점</Link>
        </div>
      </section>

      <section className={styles.themeTable} aria-labelledby="theme-table-title">
        <header>
          <p>테마 순위</p>
          <h2 id="theme-table-title">오늘 먼저 확인할 테마</h2>
        </header>
        <div className={styles.tableHeader} aria-hidden="true">
          <span>순위</span>
          <span>테마</span>
          <span>신호</span>
          <span>대표 종목</span>
          <span>확인 근거</span>
          <span>다음 확인</span>
        </div>
        <ol>
          {themeRows.map((theme) => (
            <li key={theme.name}>
              <strong>#{theme.rank}</strong>
              <div>
                <b>{theme.name}</b>
              </div>
              <span>{theme.signal}</span>
              <small>{theme.leaders.join(" · ")}</small>
              <p>{theme.evidence}</p>
              <em>{theme.check}</em>
            </li>
          ))}
        </ol>
      </section>

      <section className={styles.checkGrid} aria-labelledby="theme-check-title">
        <header>
          <p>분류 기준</p>
          <h2 id="theme-check-title">테마를 넓게 보되 개별 이슈와 분리합니다.</h2>
        </header>
        <ul>
          {checklist.map((item) => <li key={item}>{item}</li>)}
        </ul>
      </section>
    </main>
  );
}
