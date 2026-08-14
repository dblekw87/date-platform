import { notFound } from "next/navigation";
import { AdSlot, SideAdRails } from "../../../../_components/AdSlot";
import { SiteHeader } from "../../../../_components/SiteHeader";
import { requireCurrentUser } from "../../../../auth/session";
import { CommunityPostForm } from "../../../new/CommunityPostForm";
import { fetchBackendJson } from "../../../../_lib/backend";
import styles from "../../../new/page.module.scss";

type BackendCommunityPost = {
  id: string;
  category: string;
  title: string;
  author_id: string;
  content_html: string;
  is_owner: boolean;
};

export default async function EditCommunityPostPage({ params }: { params: Promise<{ id: string }> }) {
  const user = await requireCurrentUser("/community");
  const { id } = await params;
  const item = await fetchBackendJson<BackendCommunityPost>(`/api/community/posts/${id}`);

  // is_owner is computed from the viewer's row, so the frontend does not rebuild an author id.
  if (!item?.is_owner) notFound();

  const post = {
    id: item.id,
    type: item.category,
    title: item.title,
    content: item.content_html
  };

  return (
    <main className={styles.page}>
      <SideAdRails leftLabel="커뮤니티 수정 좌측 광고" rightLabel="커뮤니티 수정 우측 광고" />
      <SiteHeader active="community" userLabel={user.provider === "mock" ? `${user.name} · 개발 로그인` : user.name} />

      <section className={styles.hero}>
        <span>COMMUNITY</span>
        <h1>커뮤니티 글 수정</h1>
        <p>작성한 글의 제목, 게시판, 내용을 수정합니다.</p>
      </section>

      <AdSlot label="커뮤니티 수정 상단 광고" />

      <CommunityPostForm initialPost={post} />
    </main>
  );
}
