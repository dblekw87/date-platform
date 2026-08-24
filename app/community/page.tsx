import type { Metadata } from "next";
import Link from "next/link";
import { AdSlot, SideAdRails } from "../_components/AdSlot";
import { SiteHeader } from "../_components/SiteHeader";
import { requireCurrentUser } from "../auth/session";
import { CommunityInfiniteFeed } from "./CommunityInfiniteFeed";
import styles from "./page.module.scss";

export const metadata: Metadata = {
  robots: { follow: false, index: false },
  title: "커뮤니티"
};

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

      <AdSlot label="커뮤니티 목록 상단 광고" />

      <section className={styles.layout}>
        <CommunityInfiniteFeed />
      </section>
    </main>
  );
}
