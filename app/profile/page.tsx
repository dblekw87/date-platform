import { SiteHeader } from "../_components/SiteHeader";
import { requireCurrentUser } from "../auth/session";
import { ProfileForm } from "./ProfileForm";
import styles from "./page.module.scss";

export default async function ProfilePage() {
  const user = await requireCurrentUser("/profile");
  const userLabel = user.provider === "mock" ? `${user.name} · 개발 로그인` : user.name;

  return (
    <main className={styles.page}>
      <SiteHeader userLabel={userLabel} />

      <section className={styles.hero}>
        <span>PROFILE</span>
        <h1>내 프로필 변경</h1>
        <p>커뮤니티와 매매 복기에 표시될 대표 이미지, 닉네임, 소개 정보를 정리합니다.</p>
      </section>

      <ProfileForm defaultNickname={user.provider === "mock" ? "date_user" : user.name} />
    </main>
  );
}
