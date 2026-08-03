"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./layout.module.scss";

const desktopNavigation = [
  { label: "홈", href: "/kr" },
  { label: "시장", href: "/kr/market" },
  { label: "분석", href: "/kr/analysis" },
  { label: "변화", href: "/kr/changes" },
  { label: "기록", href: "/kr/journal" }
];

const mobileNavigation = [
  { label: "홈", href: "/kr" },
  { label: "시장", href: "/kr/market" },
  { label: "분석", href: "/kr/analysis" },
  { label: "변화", href: "/kr/changes" },
  { label: "기록", href: "/kr/journal" }
];

const secondaryRoutes = [
  { label: "테마", href: "/kr/theme" },
  { label: "투자 근거", href: "/kr/evidence" },
  { label: "관심 종목", href: "/kr/watchlist" },
  // { label: "참고 보드", href: "/kr/reference-board" },
  { label: "설정", href: "/kr/settings" }
];

function isActive(pathname: string, href: string) {
  if (href === "/kr") {
    return pathname === "/kr";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function KoreanPrototypeLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const pathname = usePathname();
  const isHome = pathname === "/kr";

  return (
    <div className={`${styles.shell} ${isHome ? styles.homeShell : ""}`}>
      <header className={`${styles.header} ${isHome ? styles.homeHeader : ""}`}>
        <Link className={styles.logo} href="/kr" aria-label="DATE 한국형 홈">
          DATE
        </Link>
        {isHome ? <span className={styles.homeMeta}>시장 확인 보드 · Prototype</span> : null}
        {!isHome ? (
          <>
            <nav className={styles.desktopNav} aria-label="주요 메뉴">
              {desktopNavigation.map((item) => (
                <Link aria-current={isActive(pathname, item.href) ? "page" : undefined} href={item.href} key={item.href}>
                  {item.label}
                </Link>
              ))}
            </nav>
            <div className={styles.headerActions}>
              <Link href="/kr/search">종목·근거 검색</Link>
              <Link href="/kr/settings">내 정보</Link>
            </div>
          </>
        ) : null}
      </header>

      {!isHome ? (
        <nav className={styles.routeMap} aria-label="보조 이동">
          {secondaryRoutes.map((item) => (
            <Link aria-current={isActive(pathname, item.href) ? "page" : undefined} href={item.href} key={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
      ) : null}

      {children}

      {!isHome ? <footer className={styles.footer}>
        <span>DATE 한국형 경험 Prototype</span>
        <nav aria-label="하단 이동">
          {[...desktopNavigation, ...secondaryRoutes].map((item) => (
            <Link href={item.href} key={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
      </footer> : null}

      {!isHome ? <nav className={styles.bottomNav} aria-label="모바일 하단 메뉴">
        {mobileNavigation.map((item) => (
          <Link aria-current={isActive(pathname, item.href) ? "page" : undefined} href={item.href} key={item.href}>
            <span aria-hidden="true">□</span>
            {item.label}
          </Link>
        ))}
      </nav> : null}
    </div>
  );
}
