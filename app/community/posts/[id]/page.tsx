import Link from "next/link";
import { notFound } from "next/navigation";
import { AdSlot, SideAdRails } from "../../../_components/AdSlot";
import { SiteHeader } from "../../../_components/SiteHeader";
import { currentUserAuthorId, requireCurrentUser } from "../../../auth/session";
import styles from "./page.module.scss";

const posts = [
  {
    id: "semiconductor-question",
    type: "조언",
    title: "장 초반 반도체 수급을 보고 들어갔는데 판단이 맞았을까요?",
    author: "date_user",
    time: "오늘 10:42",
    content: "거래대금이 빠르게 붙는 것을 보고 반도체 쪽을 먼저 봤습니다. 뉴스 반응도 같이 있어서 진입했는데, 너무 빠르게 판단한 건지 다른 분들 의견이 궁금합니다."
  },
  {
    id: "news-vs-turnover",
    type: "질문",
    title: "뉴스가 먼저인지 거래대금이 먼저인지 구분하는 기준이 있을까요?",
    author: "slowtrade",
    time: "오늘 09:18",
    content: "테마 뉴스와 거래대금 순위가 동시에 보일 때 어떤 것을 먼저 기준으로 삼는지 궁금합니다. 뉴스가 약해도 거래대금이 붙으면 보는 편인가요?"
  },
  {
    id: "market-chat",
    type: "잡담",
    title: "오늘 시장은 거래대금보다 뉴스 반응이 더 빨랐던 것 같네요",
    author: "markettalk",
    time: "어제",
    content: "장중에 뉴스 반응이 먼저 나오고 거래대금이 뒤따라 붙는 종목들이 많아 보였습니다. 평소보다 호가가 얇은 종목은 더 조심해야겠다는 생각이 들었습니다."
  },
  {
    id: "theme-rotation",
    type: "테마",
    title: "전력설비 다음으로 볼 만한 테마가 뭐가 있을까요?",
    author: "themewatch",
    time: "어제",
    content: "전력설비 쪽 거래대금이 이어진 뒤 다음 순환 후보를 보고 있습니다. 정책, AI 인프라, 반도체 장비 중 어느 쪽을 우선해서 보는지 의견을 듣고 싶습니다."
  },
  {
    id: "opening-gap",
    type: "질문",
    title: "갭상승 시작한 종목은 몇 분봉까지 기다리시나요?",
    author: "newbie",
    time: "2일 전",
    content: "갭상승으로 시작한 종목에서 바로 따라가면 흔들리는 경우가 많았습니다. 보통 1분봉, 3분봉, 5분봉 중 어느 기준을 많이 쓰시는지 궁금합니다."
  },
  {
    id: "us-market",
    type: "시황",
    title: "미국장 반도체가 강하면 국내장은 어디부터 보시나요?",
    author: "overnight",
    time: "2일 전",
    content: "미국장에서 반도체가 강하게 마감하면 국내 개장 전에 어떤 종목군부터 체크하는지 궁금합니다. 대형주, 장비, 소재 중 우선순위가 있을까요?"
  },
  {
    id: "disclosure-read",
    type: "뉴스",
    title: "장중 공시가 뜨면 바로 반응하는 기준이 궁금합니다",
    author: "filing",
    time: "3일 전",
    content: "장중 공시는 제목만 보고 들어가면 위험한 경우도 많아 보입니다. 공시 내용, 거래량, 호가 움직임 중 어떤 것을 먼저 확인하는지 의견 부탁드립니다."
  },
  {
    id: "risk-control",
    type: "조언",
    title: "상승률 상위 종목은 손절 폭을 어떻게 잡으시나요?",
    author: "riskfirst",
    time: "3일 전",
    content: "상승률 상위 종목은 변동성이 커서 손절 폭을 너무 좁게 잡으면 바로 털리고, 넓게 잡으면 손실이 커집니다. 비중과 손절 폭을 어떻게 같이 조절하시나요?"
  },
  {
    id: "daily-routine",
    type: "잡담",
    title: "장 시작 전에 다들 어떤 순서로 보시나요?",
    author: "routine",
    time: "4일 전",
    content: "저는 미국 지수, 환율, 원자재, 전일 거래대금, 장전 뉴스를 순서대로 봅니다. 다른 분들은 어떤 루틴으로 장을 준비하는지 궁금합니다."
  }
];

const comments = [
  {
    author: "themehunter",
    time: "방금",
    body: "저라면 뉴스 반응이 먼저였는지, 거래대금이 먼저였는지 분봉으로 한 번 더 나눠서 볼 것 같습니다."
  },
  {
    author: "calmtrade",
    time: "12분 전",
    body: "진입 자체보다 매도 기준을 미리 정했는지가 더 중요해 보여요. 기준이 있었다면 좋은 시도였다고 봅니다."
  },
  {
    author: "openbell",
    time: "28분 전",
    body: "장 초반에는 호가가 얇아서 같은 거래대금이라도 체감 변동성이 커지는 점을 같이 체크해보면 좋겠습니다."
  }
];

export default async function CommunityPostPage({ params }: { params: Promise<{ id: string }> }) {
  const user = await requireCurrentUser("/community");
  const { id } = await params;
  const post = posts.find((item) => item.id === id);

  if (!post) notFound();

  const canEdit = currentUserAuthorId(user) === post.author;

  return (
    <main className={styles.page}>
      <SideAdRails leftLabel="커뮤니티 상세 좌측 광고" rightLabel="커뮤니티 상세 우측 광고" />
      <SiteHeader active="community" userLabel={user.provider === "mock" ? `${user.name} · 개발 로그인` : user.name} />
      <div className={styles.layout}>
        <article className={styles.post}>
          <div className={styles.postActions}>
            <Link href="/community">커뮤니티 목록</Link>
            {canEdit ? <Link href={`/community/posts/${post.id}/edit`}>수정</Link> : null}
          </div>
          <span>{post.type}</span>
          <h1>{post.title}</h1>
          <footer>
            <b>{post.author}</b>
            <time>{post.time}</time>
            <small>조회 328</small>
            <small>댓글 {comments.length}</small>
          </footer>
          <p>{post.content}</p>
        </article>

        <aside className={styles.sidebar} aria-label="관련 글">
          <section>
            <h2>관련 글</h2>
            {posts.filter((item) => item.id !== post.id).slice(0, 4).map((item) => (
              <Link href={`/community/posts/${item.id}`} key={item.id}>
                <span>{item.type}</span>
                <strong>{item.title}</strong>
              </Link>
            ))}
          </section>
          <section>
            <h2>인기 글</h2>
            {posts.slice(0, 3).map((item) => (
              <Link href={`/community/posts/${item.id}`} key={`popular-${item.id}`}>
                <span>{item.type}</span>
                <strong>{item.title}</strong>
              </Link>
            ))}
          </section>
        </aside>
      </div>

      <AdSlot label="커뮤니티 상세 하단 광고" />

      <section className={styles.comments} aria-labelledby="comments-title">
        <header>
          <h2 id="comments-title">댓글 {comments.length}</h2>
          <span>목업 댓글 영역</span>
        </header>
        <form className={styles.commentForm}>
          <textarea placeholder="의견을 남겨보세요" rows={4} />
          <button type="button">댓글 등록</button>
        </form>
        <div className={styles.commentList}>
          {comments.map((comment) => (
            <article key={`${comment.author}-${comment.time}`}>
              <header>
                <b>{comment.author}</b>
                <time>{comment.time}</time>
              </header>
              <p>{comment.body}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
