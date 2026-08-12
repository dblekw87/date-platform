import Link from "next/link";
import { SiteHeader } from "../../_components/SiteHeader";
import { fetchBackendJson } from "../../_lib/backend";
import { currentUserAuthorId, requireCurrentUser } from "../../auth/session";
import { tradeJournals } from "../../journal/trades/trade-journals";
import styles from "./page.module.scss";

const communityPosts = [
  {
    id: "semiconductor-question",
    type: "조언",
    title: "장 초반 반도체 수급을 보고 들어갔는데 판단이 맞았을까요?",
    author: "date_user",
    time: "오늘 10:42"
  }
];

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
  const authorId = currentUserAuthorId(user);
  const backendCommunityPosts = await fetchBackendJson<BackendPage<BackendCommunityPost>>("/api/me/community-posts?limit=30");
  const backendTradeJournals = await fetchBackendJson<BackendPage<BackendTradeJournal>>("/api/me/trade-journals?limit=30");
  const myCommunityPosts = backendCommunityPosts?.items?.map((post) => ({
    id: post.id,
    time: formatPostTime(post.created_at),
    title: post.title,
    type: post.category
  })) ?? communityPosts.filter((post) => post.author === authorId);
  const myTradeJournals = backendTradeJournals?.items?.map((journal) => ({
    date: journal.trade_date,
    id: journal.id,
    result: journal.result,
    title: journal.title
  })) ?? tradeJournals.filter((journal) => journal.author === authorId);
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
