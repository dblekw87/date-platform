import type { Metadata } from "next";
import { SiteHeader } from "../_components/SiteHeader";
import { fetchBackendJson } from "../_lib/backend";
import { requireCurrentUser } from "../auth/session";
import { ProfileForm } from "./ProfileForm";
import styles from "./page.module.scss";

type BackendMe = {
  profile?: {
    avatar_url?: string | null;
    bio?: string | null;
    interests?: string | null;
    nickname?: string | null;
    public_memo?: string | null;
  } | null;
};

export const metadata: Metadata = {
  robots: { follow: false, index: false },
  title: "프로필"
};

export default async function ProfilePage() {
  const user = await requireCurrentUser("/profile");
  const me = await fetchBackendJson<BackendMe>("/api/me");
  const profile = me?.profile;
  const userLabel = user.provider === "mock" ? `${user.name} · 개발 로그인` : user.name;

  return (
    <main className={styles.page}>
      <SiteHeader userLabel={userLabel} />

      <section className={styles.hero}>
        <span>PROFILE</span>
        <h1>내 프로필 변경</h1>
        <p>커뮤니티와 매매 복기에 표시될 대표 이미지, 닉네임, 소개 정보를 정리합니다.</p>
      </section>

      <ProfileForm
        defaultAvatarUrl={profile?.avatar_url}
        defaultBio={profile?.bio}
        defaultInterests={profile?.interests}
        defaultNickname={profile?.nickname || (user.provider === "mock" ? "date_user" : user.name)}
        defaultPublicMemo={profile?.public_memo}
      />
    </main>
  );
}
