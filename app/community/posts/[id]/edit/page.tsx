import Link from "next/link";
import { notFound } from "next/navigation";
import { AdSlot, SideAdRails } from "../../../../_components/AdSlot";
import { SiteHeader } from "../../../../_components/SiteHeader";
import { currentUserAuthorId, requireCurrentUser } from "../../../../auth/session";
import { CommunityPostForm } from "../../../new/CommunityPostForm";
import { fetchBackendJson } from "../../../../_lib/backend";
import styles from "../../../new/page.module.scss";

const posts = [
  {
    id: "semiconductor-question",
    type: "조언",
    title: "장 초반 반도체 수급을 보고 들어갔는데 판단이 맞았을까요?",
    author: "date_user",
    content: "거래대금이 빠르게 붙는 것을 보고 반도체 쪽을 먼저 봤습니다. 뉴스 반응도 같이 있어서 진입했는데, 너무 빠르게 판단한 건지 다른 분들 의견이 궁금합니다."
  }
];

type BackendCommunityPost = {
  id: string;
  category: string;
  title: string;
  author_id: string;
  content_html: string;
};

function fromBackendPost(post: BackendCommunityPost) {
  return {
    id: post.id,
    type: post.category,
    title: post.title,
    author: post.author_id,
    content: post.content_html
  };
}

export default async function EditCommunityPostPage({ params }: { params: Promise<{ id: string }> }) {
  const user = await requireCurrentUser("/community");
  const { id } = await params;
  const post = posts.find((item) => item.id === id) ?? (
    await fetchBackendJson<BackendCommunityPost>(`/api/community/posts/${id}`).then((item) => item ? fromBackendPost(item) : null)
  );

  if (!post || currentUserAuthorId(user) !== post.author) notFound();

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
