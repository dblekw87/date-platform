import type { Metadata } from "next";
import Link from "next/link";
import { DateLogo } from "../../_components/DateLogo";
import type { OAuthProvider } from "../oauth";
import { ProviderMark } from "./ProviderMark";
import styles from "./page.module.scss";

const providers: Array<{ key: OAuthProvider; label: string }> = [
  { label: "Google로 계속하기", key: "google" },
  { label: "Naver로 계속하기", key: "naver" },
  { label: "Kakao로 계속하기", key: "kakao" }
];

export const metadata: Metadata = {
  robots: { follow: false, index: false },
  title: "로그인"
};

export default async function LoginPage({
  searchParams
}: {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const nextParam = Array.isArray(params?.next) ? params?.next[0] : params?.next;
  const errorParam = Array.isArray(params?.error) ? params?.error[0] : params?.error;
  const detailParam = Array.isArray(params?.detail) ? params?.detail[0] : params?.detail;
  const nextPath = nextParam?.startsWith("/") ? nextParam : "/community";
  const errorMessage = errorParam?.startsWith("missing_")
    ? "로그인 API 키 설정이 필요합니다."
    : errorParam === "kakao_token_failed"
      ? "카카오 토큰 발급에 실패했습니다. Client Secret 설정 또는 Redirect URI를 확인해주세요."
      : errorParam === "kakao_profile_failed"
        ? "카카오 사용자 정보 조회에 실패했습니다. 동의항목 설정을 확인해주세요."
    : errorParam
      ? "로그인을 완료하지 못했습니다. 다시 시도해주세요."
      : null;

  return (
    <main className={styles.page}>
      <section className={styles.visualPanel} aria-label="DATE 커뮤니티 소개">
        <div className={styles.roomVisual} />
        <div className={styles.visualCopy}>
          <Link className={styles.visualLogo} href="/" aria-label="DATE">
            <DateLogo />
          </Link>
          <h2>혼자 복기하던 매매를, 함께 더 선명하게</h2>
          <p>시황과 체결 캡처, 잘한 점과 놓친 점을 기록하는 트레이딩 커뮤니티</p>
        </div>
      </section>

      <section className={styles.card}>
        <Link className={styles.logo} href="/" aria-label="DATE">
          <DateLogo />
        </Link>
        <h1>로그인</h1>
        <p>DATE 커뮤니티에 오신 것을 환영합니다.</p>
        {errorMessage ? (
          <p className={styles.errorMessage}>
            {errorMessage}
            {detailParam ? <small>{detailParam}</small> : null}
          </p>
        ) : null}
        <div className={styles.providers}>
          {providers.map((provider) => (
            <Link data-provider={provider.key} href={`/auth/${provider.key}?next=${encodeURIComponent(nextPath)}`} key={provider.key}>
              <ProviderMark provider={provider.key} />
              <span>{provider.label}</span>
            </Link>
          ))}
        </div>
        <p className={styles.notice}>
          계속 진행하면 <Link href="/terms">이용약관</Link>과 <Link href="/privacy">개인정보처리방침</Link>에 동의한 것으로 봅니다.
        </p>
        <footer>OAuth 앱 키를 연결하면 실제 SNS 로그인으로 전환됩니다.</footer>
      </section>
    </main>
  );
}
