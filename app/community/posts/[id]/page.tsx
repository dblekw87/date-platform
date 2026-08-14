import Link from "next/link";
import { notFound } from "next/navigation";
import { AdSlot, SideAdRails } from "../../../_components/AdSlot";
import { SiteHeader } from "../../../_components/SiteHeader";
import { requireCurrentUser } from "../../../auth/session";
import { fetchBackendJson } from "../../../_lib/backend";
import { CommunityComments } from "./CommunityComments";
import styles from "./page.module.scss";

type BackendCommunityPost = {
  id: string;
  category: string;
  title: string;
  author_id: string;
  nickname?: string | null;
  created_at: string;
  content_html: string;
  view_count: number;
  reply_count: number;
  is_owner: boolean;
};

type BackendCommunityPage = {
  items?: Array<{
    id: string;
    category: string;
    title: string;
  }>;
};

function formatTime(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return value;

  return new Intl.DateTimeFormat("ko-KR", {
    month: "numeric",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  }).format(date);
}

export default async function CommunityPostPage({ params }: { params: Promise<{ id: string }> }) {
  const user = await requireCurrentUser("/community");
  const { id } = await params;
  const post = await fetchBackendJson<BackendCommunityPost>(`/api/community/posts/${id}`);

  if (!post) notFound();

  const related = await fetchBackendJson<BackendCommunityPage>(`/api/community/posts?limit=5`);
  const relatedPosts = (related?.items ?? []).filter((item) => item.id !== post.id).slice(0, 4);

  return (
    <main className={styles.page}>
      <SideAdRails leftLabel="커뮤니티 상세 좌측 광고" rightLabel="커뮤니티 상세 우측 광고" />
      <SiteHeader active="community" userLabel={user.provider === "mock" ? `${user.name} · 개발 로그인` : user.name} />
      <div className={styles.layout}>
        <article className={styles.post}>
          <div className={styles.postActions}>
            <Link href="/community">커뮤니티 목록</Link>
            {post.is_owner ? <Link href={`/community/posts/${post.id}/edit`}>수정</Link> : null}
          </div>
          <span>{post.category}</span>
          <h1>{post.title}</h1>
          <footer>
            <b>{post.nickname || post.author_id}</b>
            <time>{formatTime(post.created_at)}</time>
            <small>조회 {post.view_count}</small>
            <small>댓글 {post.reply_count}</small>
          </footer>
          <div className={styles.postContent} dangerouslySetInnerHTML={{ __html: post.content_html }} />
        </article>

        <aside className={styles.sidebar} aria-label="관련 글">
          <section>
            <h2>최근 글</h2>
            {relatedPosts.length === 0 ? <p>다른 글이 아직 없습니다.</p> : null}
            {relatedPosts.map((item) => (
              <Link href={`/community/posts/${item.id}`} key={item.id}>
                <span>{item.category}</span>
                <strong>{item.title}</strong>
              </Link>
            ))}
          </section>
        </aside>
      </div>

      <AdSlot label="커뮤니티 상세 하단 광고" />

      <CommunityComments canWrite postId={post.id} />
    </main>
  );
}
