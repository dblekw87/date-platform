import Link from "next/link";
import { SiteHeader } from "../../_components/SiteHeader";
import { fetchBackendJson } from "../../_lib/backend";
import { requireCurrentUser } from "../../auth/session";
import styles from "./page.module.scss";

type BackendCommunityPost = {
  id: string;
  category: string;
  title: string;
  created_at: string;
};

type BackendTradeJournal = {
  id: string;
  trade_date: string;
  title: string;
  result: string;
};

type BackendPage<T> = {
  items?: T[];
};

function formatPostTime(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return value;

  return new Intl.DateTimeFormat("ko-KR", {
    month: "numeric",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  }).format(date);
}

export default async function MyPostsPage() {
  const user = await requireCurrentUser("/profile/posts");
  const [backendCommunityPosts, backendTradeJournals] = await Promise.all([
    fetchBackendJson<BackendPage<BackendCommunityPost>>("/api/me/community-posts?limit=30"),
    fetchBackendJson<BackendPage<BackendTradeJournal>>("/api/me/trade-journals?limit=30")
  ]);
  const myCommunityPosts = backendCommunityPosts?.items?.map((post) => ({
    id: post.id,
    time: formatPostTime(post.created_at),
    title: post.title,
    type: post.category
  })) ?? [];
  const myTradeJournals = backendTradeJournals?.items?.map((journal) => ({
    date: journal.trade_date?.slice(0, 10) ?? "",
    id: journal.id,
    result: journal.result,
    title: journal.title
  })) ?? [];
  const userLabel = user.provider === "mock" ? `${user.name} · 개발 로그인` : user.name;

  return (
    <main className={styles.page}>
      <SiteHeader userLabel={userLabel} />

      <section className={styles.hero}>
        <span>MY POSTS</span>
        <h1>내가 쓴 글</h1>
        <p>내 커뮤니티 글과 매매 복기를 모아서 보고, 각 글의 수정 화면으로 이동합니다.</p>
      </section>

      <section className={styles.grid}>
        <article id="community">
          <header>
            <h2>커뮤니티</h2>
            <Link href="/community/new">새 글쓰기</Link>
          </header>
          {myCommunityPosts.length === 0 ? <p>아직 작성한 글이 없습니다.</p> : null}
          {myCommunityPosts.map((post) => (
            <div className={styles.item} key={post.id}>
              <span>{post.type} · {post.time}</span>
              <strong>{post.title}</strong>
              <nav>
                <Link href={`/community/posts/${post.id}`}>보기</Link>
                <Link href={`/community/posts/${post.id}/edit`}>수정</Link>
              </nav>
            </div>
          ))}
        </article>
        <article id="trades">
          <header>
            <h2>매매 복기</h2>
            <Link href="/journal/trades/new">새 복기</Link>
          </header>
          {myTradeJournals.length === 0 ? <p>아직 작성한 복기가 없습니다.</p> : null}
          {myTradeJournals.map((journal) => (
            <div className={styles.item} key={journal.id}>
              <span>{journal.date} · {journal.result}</span>
              <strong>{journal.title}</strong>
              <nav>
                <Link href={`/journal/trades/${journal.id}`}>보기</Link>
                <Link href={`/journal/trades/${journal.id}/edit`}>수정</Link>
              </nav>
            </div>
          ))}
        </article>
      </section>
    </main>
  );
}
