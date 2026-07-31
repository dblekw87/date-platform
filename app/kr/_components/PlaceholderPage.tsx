import Link from "next/link";
import styles from "./placeholder.module.scss";

type PlaceholderPageProps = {
  title: string;
  eyebrow: string;
  description: string;
  primaryHref?: string;
  primaryLabel?: string;
  sections: string[];
};

const routeLinks = [
  { label: "홈", href: "/kr" },
  { label: "시장", href: "/kr/market" },
  { label: "대표 종목", href: "/kr/stock/005930" },
  { label: "테마", href: "/kr/theme" },
  { label: "투자 근거", href: "/kr/evidence" },
  { label: "분석", href: "/kr/analysis" },
  { label: "관심 종목", href: "/kr/watchlist" },
  { label: "변화", href: "/kr/changes" },
  { label: "기록", href: "/kr/journal" },
  { label: "검색", href: "/kr/search" },
  { label: "설정", href: "/kr/settings" }
];

export function PlaceholderPage({
  title,
  eyebrow,
  description,
  primaryHref = "/kr",
  primaryLabel = "홈으로 돌아가기",
  sections
}: PlaceholderPageProps) {
  return (
    <main className={styles.page}>
      <section className={styles.hero} aria-labelledby="page-title">
        <p>{eyebrow}</p>
        <h1 id="page-title">{title}</h1>
        <span>{description}</span>
        <Link href={primaryHref}>{primaryLabel}</Link>
      </section>

      <section className={styles.placeholder} aria-labelledby="placeholder-title">
        <div className={styles.sectionHeader}>
          <p>화면 골격</p>
          <h2 id="placeholder-title">이 페이지는 아직 상세 화면을 완성하지 않았습니다.</h2>
          <span>현재 단계에서는 Header, Page Title, Section Placeholder만 검증합니다.</span>
        </div>
        <div className={styles.sectionGrid}>
          {sections.map((section) => (
            <article key={section}>
              <strong>{section}</strong>
              <span>상세 정보 영역 Placeholder</span>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.routes} aria-labelledby="route-title">
        <div className={styles.sectionHeader}>
          <p>전체 이동</p>
          <h2 id="route-title">KR Prototype B Route</h2>
        </div>
        <nav aria-label="KR 전체 경로">
          {routeLinks.map((route) => (
            <Link href={route.href} key={route.href}>
              {route.label}
            </Link>
          ))}
        </nav>
      </section>
    </main>
  );
}
