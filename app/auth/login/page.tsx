import Link from "next/link";
import { DateLogo } from "../../_components/DateLogo";
import styles from "./page.module.scss";

const providers = [
  { label: "Google로 계속하기", key: "google" },
  { label: "Naver로 계속하기", key: "naver" },
  { label: "Kakao로 계속하기", key: "kakao" }
];

export default async function LoginPage({
  searchParams
}: {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const nextParam = Array.isArray(params?.next) ? params?.next[0] : params?.next;
  const errorParam = Array.isArray(params?.error) ? params?.error[0] : params?.error;
  const nextPath = nextParam?.startsWith("/") ? nextParam : "/community";
  const errorMessage = errorParam?.startsWith("missing_")
    ? "로그인 API 키 설정이 필요합니다."
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
        {errorMessage ? <p className={styles.errorMessage}>{errorMessage}</p> : null}
        <div className={styles.providers}>
          {providers.map((provider) => (
            <Link data-provider={provider.key} href={`/auth/${provider.key}?next=${encodeURIComponent(nextPath)}`} key={provider.key}>
              {provider.label}
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
