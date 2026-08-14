import { AdSlot, SideAdRails } from "../../_components/AdSlot";
import { SiteHeader } from "../../_components/SiteHeader";
import { requireCurrentUser } from "../../auth/session";
import { CommunityPostForm } from "./CommunityPostForm";
import styles from "./page.module.scss";

export default async function NewCommunityPostPage() {
  const user = await requireCurrentUser("/community/new");

  return (
    <main className={styles.page}>
      <SideAdRails leftLabel="커뮤니티 글쓰기 좌측 광고" rightLabel="커뮤니티 글쓰기 우측 광고" />
      <SiteHeader active="community" userLabel={user.provider === "mock" ? `${user.name} · 개발 로그인` : user.name} />

      <section className={styles.hero}>
        <span>COMMUNITY</span>
        <h1>커뮤니티 글쓰기</h1>
        <p>질문, 조언, 시황, 뉴스, 테마, 잡담처럼 공개해도 되는 내용을 작성합니다.</p>
      </section>

      <AdSlot label="커뮤니티 글쓰기 상단 광고" />

      <CommunityPostForm />
    </main>
  );
}
