"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
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
  const router = useRouter();
  // 로그인이 필요한 메뉴를 눌렀을 때 어디로 보낼지. null이면 모달이 닫혀 있습니다.
  const [gatedHref, setGatedHref] = useState<string | null>(null);
  /*
   * 로그인 전에도 메뉴는 보입니다.
   *
   * 숨기면 그런 기능이 있다는 것 자체를 모릅니다. 눌러 보고 "로그인이 필요하다"는
   * 답을 듣는 편이 낫습니다. 시장 보드는 로그인 없이 그대로 열립니다.
   */
  const visibleNavItems = navItems.filter((item) => {
    if (hideAuthNav && (item.id === "community" || item.id === "trades" || item.id === "login")) return false;
    if (item.id === "login") return !isAuthenticated;

    return true;
  });
  const requiresLogin = (id: string) => !isAuthenticated && (id === "community" || id === "trades");
  const handleNavClick = (id: string, href: string) => (event: React.MouseEvent) => {
    if (!requiresLogin(id)) return;

    event.preventDefault();
    setIsMenuOpen(false);
    setGatedHref(href);
  };

  useEffect(() => {
    async function syncProfileImage() {
      try {
        const response = await fetch("/api/backend/me", {
          cache: "no-store"
        });

        if (response.ok) {
          const data = await response.json() as { profile?: { avatar_url?: string | null } | null };

          if (data.profile?.avatar_url) {
            localStorage.setItem(profileImageStorageKey, data.profile.avatar_url);
            setProfileImage(data.profile.avatar_url);
            return;
          }
        }
      } catch {
        // Local preview remains available before the backend is running.
      }

      setProfileImage(localStorage.getItem(profileImageStorageKey));
    }

    void syncProfileImage();

    function handleProfileUpdate() {
      void syncProfileImage();
    }

    window.addEventListener("storage", handleProfileUpdate);
    window.addEventListener(profileUpdatedEvent, handleProfileUpdate);

    return () => {
      window.removeEventListener("storage", handleProfileUpdate);
      window.removeEventListener(profileUpdatedEvent, handleProfileUpdate);
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

  useEffect(() => {
    if (!gatedHref) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setGatedHref(null);
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [gatedHref]);

  return (
    <>
    <header className={styles.header}>
      <Link className={styles.logo} href="/" aria-label="DATE">
        <DateLogo />
      </Link>

      <nav className={styles.desktopNav} aria-label="주요 이동">
        {visibleNavItems.map((item) => (
          <Link
            aria-current={active === item.id ? "page" : undefined}
            href={item.href}
            key={item.id}
            onClick={handleNavClick(item.id, item.href)}
          >
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
                {profileImage ? <Image alt="" height={32} src={profileImage} unoptimized width={32} /> : userLabel.slice(0, 1)}
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
          <Link
            aria-current={active === item.id ? "page" : undefined}
            href={item.href}
            key={item.id}
            onClick={handleNavClick(item.id, item.href)}
          >
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

      {/*
        로그인이 필요하다는 안내.
        
        `next`를 붙여 보내므로 로그인 뒤에 누르려던 화면으로 돌아옵니다. 로그인만
        시키고 첫 화면에 떨어뜨리면 무엇을 하려 했는지 사용자가 다시 찾아가야 합니다.

        헤더 **밖**에 둡니다. 헤더가 `backdrop-filter`를 쓰는데, 그게 자손 fixed의
        기준 상자를 헤더로 만들어 버립니다. 안에 두면 화면 가운데가 아니라 헤더
        높이 안에 갇혀 위가 잘립니다.
      */}
      {gatedHref ? (
        <div
          className={styles.gateBackdrop}
          onClick={(event) => { if (event.target === event.currentTarget) setGatedHref(null); }}
        >
          <div aria-labelledby="site-gate-title" aria-modal="true" className={styles.gate} role="dialog">
            <strong id="site-gate-title">로그인을 해야 이용할 수 있습니다</strong>
            <p>커뮤니티와 매매 복기는 로그인한 뒤에 열립니다. 시장 보드는 로그인 없이 그대로 볼 수 있습니다.</p>
            <div className={styles.gateActions}>
              <button onClick={() => setGatedHref(null)} type="button">취소</button>
              <button
                autoFocus
                data-primary="true"
                onClick={() => {
                  const next = gatedHref;

                  setGatedHref(null);
                  router.push(`/auth/login?next=${encodeURIComponent(next)}`);
                }}
                type="button"
              >
                확인
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
