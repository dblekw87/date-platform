import Link from "next/link";
import { AdSlot, SideAdRails } from "../../_components/AdSlot";
import { SiteHeader } from "../../_components/SiteHeader";
import { requireCurrentUser } from "../../auth/session";
import { CommunityPostEditor } from "./CommunityPostEditor";
import styles from "./page.module.scss";

const categories = ["질문", "조언", "시황", "뉴스", "테마", "잡담"];

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

      <form className={styles.form}>
        <fieldset>
          <legend>게시판 선택</legend>
          {categories.map((category, index) => (
            <label key={category}>
              <input defaultChecked={index === 0} name="category" type="radio" value={category} />
              {category}
            </label>
          ))}
        </fieldset>

        <label>
          제목
          <input placeholder="제목을 입력하세요" />
        </label>

        <CommunityPostEditor />

        <div className={styles.actions}>
          <Link href="/community">취소</Link>
          <button type="button">게시글 등록</button>
        </div>
      </form>
    </main>
  );
}
