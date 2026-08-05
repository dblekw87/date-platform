import Link from "next/link";
import styles from "./page.module.scss";

const dataSources = [
  { name: "토스증권", use: "랭킹·시세·주의사항", state: "환경변수 필요" },
  { name: "KIND", use: "신규상장·공모 일정", state: "공개 조회" },
  { name: "DART", use: "국내 공시", state: "환경변수 필요" },
  { name: "SEC EDGAR", use: "미국 공시", state: "공개 조회" },
  { name: "뉴스 공급자", use: "국내·미국 뉴스", state: "환경변수 필요" }
];

const preferences = [
  { label: "기본 주도주 탭", value: "거래대금" },
  { label: "일정 표시", value: "다가오는 주요 일정 우선" },
  { label: "뉴스 원문", value: "새 탭으로 열기" },
  { label: "테마 분류", value: "DATE 룰 기반 분류" }
];

export default function KoreanSettingsPage() {
  return (
    <main className={styles.page}>
      <section className={styles.hero} aria-labelledby="settings-title">
        <p>설정</p>
        <h1 id="settings-title">데이터 연결과 화면 기준을 점검합니다.</h1>
        <span>현재 화면은 저장형 설정이 아니라, 운영에 필요한 연결 상태와 표시 기준을 한 번에 확인하는 점검 화면입니다.</span>
        <div>
          <Link href="/">시장 보드</Link>
          <Link href="/kr/journal">기록 보기</Link>
        </div>
      </section>

      <section className={styles.sourceGrid} aria-labelledby="source-title">
        <header>
          <p>데이터 연결</p>
          <h2 id="source-title">사용 중인 데이터 원천</h2>
        </header>
        <div>
          {dataSources.map((source) => (
            <article key={source.name}>
              <strong>{source.name}</strong>
              <span>{source.use}</span>
              <em>{source.state}</em>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.preferenceList} aria-labelledby="preference-title">
        <header>
          <p>화면 기준</p>
          <h2 id="preference-title">현재 적용된 표시 정책</h2>
        </header>
        <dl>
          {preferences.map((item) => (
            <div key={item.label}>
              <dt>{item.label}</dt>
              <dd>{item.value}</dd>
            </div>
          ))}
        </dl>
      </section>
    </main>
  );
}
