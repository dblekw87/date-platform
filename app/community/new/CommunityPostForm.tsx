"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { CommunityPostEditor } from "./CommunityPostEditor";
import styles from "./page.module.scss";

const categories = ["질문", "조언", "시황", "뉴스", "테마", "잡담"];
const editorId = "community-post-editor";

type CommunityPostFormProps = {
  initialPost?: {
    id: string;
    type: string;
    title: string;
    content: string;
  };
};

export function CommunityPostForm({ initialPost }: CommunityPostFormProps) {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);

  async function savePost(formData: FormData) {
    const editor = document.getElementById(editorId);
    const title = String(formData.get("title") ?? "").trim();
    const category = String(formData.get("category") ?? "질문");
    const contentHtml = editor?.innerHTML.trim() ?? "";

    if (!title || !contentHtml) {
      alert("제목과 내용을 입력해주세요.");
      return;
    }

    setIsSaving(true);

    try {
      const response = await fetch(initialPost ? `/api/backend/community/posts/${initialPost.id}` : "/api/backend/community/posts", {
        method: initialPost ? "PATCH" : "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          category,
          title,
          contentHtml
        })
      });

      if (!response.ok) {
        throw new Error("save failed");
      }

      const saved = await response.json() as { id: string };

      router.push(`/community/posts/${saved.id}`);
      router.refresh();
    } catch {
      alert("백엔드 저장에 실패했습니다. 백엔드 서버와 DB 연결을 확인해주세요.");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <form className={styles.form} action={savePost}>
      <fieldset>
        <legend>게시판 선택</legend>
        {categories.map((category) => (
          <label key={category}>
            <input defaultChecked={category === (initialPost?.type ?? "질문")} name="category" type="radio" value={category} />
            {category}
          </label>
        ))}
      </fieldset>

      <label>
        제목
        <input name="title" defaultValue={initialPost?.title} placeholder="제목을 입력하세요" />
      </label>

      <CommunityPostEditor editorId={editorId} initialContent={initialPost?.content} />

      <div className={styles.actions}>
        <Link href={initialPost ? `/community/posts/${initialPost.id}` : "/community"}>취소</Link>
        <button type="submit" disabled={isSaving}>{isSaving ? "저장 중" : initialPost ? "수정 저장" : "게시글 등록"}</button>
      </div>
    </form>
  );
}
