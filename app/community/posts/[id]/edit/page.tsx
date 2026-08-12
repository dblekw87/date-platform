import Link from "next/link";
import { notFound } from "next/navigation";
import { AdSlot, SideAdRails } from "../../../../_components/AdSlot";
import { SiteHeader } from "../../../../_components/SiteHeader";
import { currentUserAuthorId, requireCurrentUser } from "../../../../auth/session";
import { CommunityPostEditor } from "../../../new/CommunityPostEditor";
import styles from "../../../new/page.module.scss";

const categories = ["질문", "조언", "시황", "뉴스", "테마", "잡담"];

const posts = [
  {
    id: "semiconductor-question",
    type: "조언",
    title: "장 초반 반도체 수급을 보고 들어갔는데 판단이 맞았을까요?",
    author: "date_user",
    content: "거래대금이 빠르게 붙는 것을 보고 반도체 쪽을 먼저 봤습니다. 뉴스 반응도 같이 있어서 진입했는데, 너무 빠르게 판단한 건지 다른 분들 의견이 궁금합니다."
  }
];

export default async function EditCommunityPostPage({ params }: { params: Promise<{ id: string }> }) {
  const user = await requireCurrentUser("/community");
  const { id } = await params;
  const post = posts.find((item) => item.id === id);

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

      <form className={styles.form}>
        <fieldset>
          <legend>게시판 선택</legend>
          {categories.map((category) => (
            <label key={category}>
              <input defaultChecked={category === post.type} name="category" type="radio" value={category} />
              {category}
            </label>
          ))}
        </fieldset>

        <label>
          제목
          <input defaultValue={post.title} placeholder="제목을 입력하세요" />
        </label>

        <CommunityPostEditor initialContent={post.content} />

        <div className={styles.actions}>
          <Link href={`/community/posts/${post.id}`}>취소</Link>
          <button type="button">수정 저장</button>
        </div>
      </form>
    </main>
  );
}
