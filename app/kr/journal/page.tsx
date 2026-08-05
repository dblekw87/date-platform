import Link from "next/link";
import styles from "./page.module.scss";

const journalRows = [
  {
    time: "장 전",
    decision: "반도체 대형주 반응 먼저 확인",
    basis: "미국 반도체 뉴스와 국내 거래대금 상위 동시 발생",
    condition: "SK하이닉스·삼성전자 거래대금 유지",
    review: "장중 뉴스 원문과 공시 여부 재확인"
  },
  {
    time: "장 중",
    decision: "급등주는 상승률 탭에서만 분리",
    basis: "상승률과 거래량은 거래대금 주도와 성격이 다름",
    condition: "상승률 상위 30위, 거래량 상위 30위 별도 확인",
    review: "테마 편입 여부는 원문 근거 확인 후 판단"
  },
  {
    time: "마감 후",
    decision: "신규상장 일정 확인",
    basis: "KIND 공모기업현황 기준 상장 예정일 확인",
    condition: "상장일 유통물량, 공모가, 주관사 확인",
    review: "다음 영업일 거래대금과 뉴스 연결 여부 점검"
  }
];

const reviewItems = [
  "당시 본 데이터 출처",
  "내가 세운 가설",
  "확인된 사실과 미확인 내용",
  "다시 봐야 하는 가격·거래대금 조건",
  "이후 달라진 뉴스 또는 공시"
];

export default function KoreanJournalPage() {
  return (
    <main className={styles.page}>
      <section className={styles.hero} aria-labelledby="journal-title">
        <p>기록</p>
        <h1 id="journal-title">판단의 근거와 다시 볼 조건을 남깁니다.</h1>
        <span>수익률 중심 매매일지가 아니라, 당시 어떤 데이터와 원문을 봤는지 보존하는 화면입니다.</span>
        <div>
          <Link href="/">시장 보드</Link>
          <Link href="/kr/theme">테마 점검</Link>
        </div>
      </section>

      <section className={styles.journalTable} aria-labelledby="journal-table-title">
        <header>
          <p>오늘의 기록</p>
          <h2 id="journal-table-title">판단 로그</h2>
        </header>
        <ol>
          {journalRows.map((row) => (
            <li key={`${row.time}-${row.decision}`}>
              <time>{row.time}</time>
              <strong>{row.decision}</strong>
              <span>{row.basis}</span>
              <small>{row.condition}</small>
              <em>{row.review}</em>
            </li>
          ))}
        </ol>
      </section>

      <section className={styles.reviewBox} aria-labelledby="review-title">
        <header>
          <p>기록 기준</p>
          <h2 id="review-title">다음에 다시 볼 수 있어야 합니다.</h2>
        </header>
        <ul>
          {reviewItems.map((item) => <li key={item}>{item}</li>)}
        </ul>
      </section>
    </main>
  );
}
