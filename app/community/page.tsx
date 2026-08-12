import Link from "next/link";
import { AdSlot, SideAdRails } from "../_components/AdSlot";
import { SiteHeader } from "../_components/SiteHeader";
import { requireCurrentUser } from "../auth/session";
import { CommunityInfiniteFeed } from "./CommunityInfiniteFeed";
import styles from "./page.module.scss";

const boardPosts = [
  {
    id: "semiconductor-question",
    type: "조언",
    title: "장 초반 반도체 수급을 보고 들어갔는데 판단이 맞았을까요?",
    author: "date_user",
    replies: 8,
    views: 328,
    time: "오늘 10:42"
  },
  {
    id: "news-vs-turnover",
    type: "질문",
    title: "뉴스가 먼저인지 거래대금이 먼저인지 구분하는 기준이 있을까요?",
    author: "slowtrade",
    replies: 12,
    views: 441,
    time: "오늘 09:18"
  },
  {
    id: "market-chat",
    type: "잡담",
    title: "오늘 시장은 거래대금보다 뉴스 반응이 더 빨랐던 것 같네요",
    author: "markettalk",
    replies: 5,
    views: 219,
    time: "어제"
  },
  {
    id: "theme-rotation",
    type: "테마",
    title: "전력설비 다음으로 볼 만한 테마가 뭐가 있을까요?",
    author: "themewatch",
    replies: 9,
    views: 187,
    time: "어제"
  },
  {
    id: "opening-gap",
    type: "질문",
    title: "갭상승 시작한 종목은 몇 분봉까지 기다리시나요?",
    author: "newbie",
    replies: 16,
    views: 302,
    time: "2일 전"
  },
  {
    id: "us-market",
    type: "시황",
    title: "미국장 반도체가 강하면 국내장은 어디부터 보시나요?",
    author: "overnight",
    replies: 7,
    views: 164,
    time: "2일 전"
  },
  {
    id: "disclosure-read",
    type: "뉴스",
    title: "장중 공시가 뜨면 바로 반응하는 기준이 궁금합니다",
    author: "filing",
    replies: 4,
    views: 121,
    time: "3일 전"
  },
  {
    id: "risk-control",
    type: "조언",
    title: "상승률 상위 종목은 손절 폭을 어떻게 잡으시나요?",
    author: "riskfirst",
    replies: 11,
    views: 276,
    time: "3일 전"
  },
  {
    id: "daily-routine",
    type: "잡담",
    title: "장 시작 전에 다들 어떤 순서로 보시나요?",
    author: "routine",
    replies: 22,
    views: 390,
    time: "4일 전"
  }
];

export default async function CommunityPage() {
  const user = await requireCurrentUser("/community");

  return (
    <main className={styles.page}>
      <SideAdRails leftLabel="커뮤니티 좌측 광고" rightLabel="커뮤니티 우측 광고" />
      <SiteHeader active="community" userLabel={user.provider === "mock" ? `${user.name} · 개발 로그인` : user.name} />

      <section className={styles.hero}>
        <div>
          <span>DATE 커뮤니티</span>
          <h1>투자 판단을 묻고 시장 이야기를 나눕니다.</h1>
          <p>시황, 뉴스, 거래대금 흐름을 보며 궁금했던 점을 질문하거나 장중 느낀 점을 가볍게 공유하는 공간입니다.</p>
        </div>
        <aside>
          <strong>커뮤니티 운영</strong>
          <p>질문, 조언, 시황, 뉴스, 테마, 잡담처럼 서로 공개해도 되는 이야기만 게시합니다.</p>
          <Link href="/community/new">글쓰기</Link>
        </aside>
      </section>

      <section className={styles.searchPanel} aria-label="커뮤니티 검색">
        <input aria-label="커뮤니티 검색어" placeholder="종목명, 테마, 질문, 잡담 키워드를 검색하세요" />
        <button type="button">검색</button>
      </section>

      <AdSlot label="커뮤니티 목록 상단 광고" />

      <section className={styles.layout}>
        <CommunityInfiniteFeed posts={boardPosts} />
      </section>
    </main>
  );
}
