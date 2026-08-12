"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { DateLogo } from "./DateLogo";
import styles from "./SiteHeader.module.scss";

type SiteHeaderProps = {
  active?: "market" | "community" | "trades" | "login";
  hideAuthNav?: boolean;
  statusLabel?: string;
  userLabel?: string;
};

const navItems = [
  { id: "market", label: "시장 보드", href: "/" },
  { id: "community", label: "커뮤니티", href: "/community" },
  { id: "trades", label: "매매 복기", href: "/journal/trades" },
  { id: "login", label: "로그인", href: "/auth/login" }
] as const;

const profileImageStorageKey = "date_profile_image";
const profileUpdatedEvent = "date-profile-updated";

export function SiteHeader({ active = "market", hideAuthNav = false, statusLabel, userLabel }: SiteHeaderProps) {
  const pathname = usePathname();
  const profileMenuRef = useRef<HTMLDivElement | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const isAuthenticated = Boolean(userLabel);
  const logoutAction = `/auth/logout?next=${encodeURIComponent(pathname || "/")}`;
  const visibleNavItems = navItems.filter((item) => {
    if (hideAuthNav && (item.id === "community" || item.id === "trades" || item.id === "login")) return false;
    if (item.id === "community" || item.id === "trades") return isAuthenticated;
    if (item.id === "login") return !isAuthenticated;

    return true;
  });

  useEffect(() => {
    function syncProfileImage() {
      setProfileImage(localStorage.getItem(profileImageStorageKey));
    }

    syncProfileImage();
    window.addEventListener("storage", syncProfileImage);
    window.addEventListener(profileUpdatedEvent, syncProfileImage);

    return () => {
      window.removeEventListener("storage", syncProfileImage);
      window.removeEventListener(profileUpdatedEvent, syncProfileImage);
    };
  }, []);

  useEffect(() => {
    if (!isProfileOpen) return;

    function handlePointerDown(event: PointerEvent) {
      const menu = profileMenuRef.current;

      if (!menu || menu.contains(event.target as Node)) return;
      setIsProfileOpen(false);
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsProfileOpen(false);
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isProfileOpen]);

  return (
    <header className={styles.header}>
      <Link className={styles.logo} href="/" aria-label="DATE">
        <DateLogo />
      </Link>

      <nav className={styles.desktopNav} aria-label="주요 이동">
        {visibleNavItems.map((item) => (
          <Link aria-current={active === item.id ? "page" : undefined} href={item.href} key={item.id}>
            {item.label}
          </Link>
        ))}
        {userLabel ? (
          <div className={styles.profileMenu} ref={profileMenuRef}>
            <button
              type="button"
              aria-expanded={isProfileOpen}
              aria-controls="site-profile-menu"
              onClick={() => setIsProfileOpen((current) => !current)}
            >
              <span aria-hidden="true">
                {profileImage ? <img alt="" src={profileImage} /> : userLabel.slice(0, 1)}
              </span>
              {userLabel}
            </button>
            <div id="site-profile-menu" data-open={isProfileOpen ? "true" : undefined}>
              <Link href="/profile" onClick={() => setIsProfileOpen(false)}>프로필 변경</Link>
              <Link href="/profile/posts#community" onClick={() => setIsProfileOpen(false)}>내 커뮤니티 글</Link>
              <Link href="/profile/posts#trades" onClick={() => setIsProfileOpen(false)}>내 매매복기</Link>
              <form action={logoutAction} method="post">
                <button type="submit">로그아웃</button>
              </form>
            </div>
          </div>
        ) : null}
      </nav>

      {statusLabel ? <span className={styles.status}>{statusLabel}</span> : null}

      <button
        className={styles.menuButton}
        type="button"
        aria-expanded={isMenuOpen}
        aria-controls="site-header-menu"
        onClick={() => setIsMenuOpen((current) => !current)}
      >
        <span aria-hidden="true" />
        <span aria-hidden="true" />
        <span aria-hidden="true" />
        <b>메뉴</b>
      </button>

      <nav
        className={styles.mobileNav}
        id="site-header-menu"
        data-open={isMenuOpen ? "true" : undefined}
        aria-label="모바일 주요 이동"
      >
        {visibleNavItems.map((item) => (
          <Link aria-current={active === item.id ? "page" : undefined} href={item.href} key={item.id}>
            {item.label}
          </Link>
        ))}
        {userLabel ? <Link href="/profile">프로필 변경</Link> : null}
        {userLabel ? <Link href="/profile/posts#community">내 커뮤니티 글</Link> : null}
        {userLabel ? <Link href="/profile/posts#trades">내 매매복기</Link> : null}
        {userLabel ? (
          <form action={logoutAction} method="post">
            <button type="submit">로그아웃</button>
          </form>
        ) : null}
      </nav>
    </header>
  );
}
