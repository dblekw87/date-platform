"use client";

import { useCallback, useEffect, useState } from "react";
import styles from "./page.module.scss";

type BackendComment = {
  id: string;
  body: string;
  created_at: string;
  author_id: string;
  nickname?: string | null;
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

export function CommunityComments({ canWrite, postId }: { canWrite: boolean; postId: string }) {
  const [comments, setComments] = useState<BackendComment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadComments = useCallback(async () => {
    try {
      const response = await fetch(`/api/backend/community/posts/${postId}/comments`, {
        cache: "no-store"
      });

      if (!response.ok) throw new Error(`backend ${response.status}`);

      const data = await response.json() as { items?: BackendComment[] };

      setComments(data.items ?? []);
      setError(null);
    } catch {
      setError("댓글을 불러오지 못했습니다.");
    } finally {
      setIsLoading(false);
    }
  }, [postId]);

  useEffect(() => {
    // Deferred so the loading flag is not set during the effect itself.
    queueMicrotask(() => {
      void loadComments();
    });
  }, [loadComments]);

  async function submitComment(formData: FormData) {
    const body = String(formData.get("body") ?? "").trim();

    if (!body) {
      setError("댓글 내용을 입력해주세요.");
      return;
    }

    setIsSaving(true);

    try {
      const response = await fetch(`/api/backend/community/posts/${postId}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ body })
      });

      if (!response.ok) throw new Error(`backend ${response.status}`);

      const created = await response.json() as BackendComment;

      setComments((current) => [...current, created]);
      setError(null);
    } catch {
      setError("댓글을 등록하지 못했습니다.");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <section className={styles.comments} aria-labelledby="comments-title">
      <header>
        <h2 id="comments-title">댓글 {comments.length}</h2>
        {error ? <span role="status">{error}</span> : null}
      </header>

      {canWrite ? (
        <form
          className={styles.commentForm}
          action={async (formData) => {
            await submitComment(formData);
            (document.getElementById("community-comment-body") as HTMLTextAreaElement | null)?.form?.reset();
          }}
        >
          <textarea id="community-comment-body" name="body" placeholder="의견을 남겨보세요" rows={4} />
          <button type="submit" disabled={isSaving}>{isSaving ? "등록 중" : "댓글 등록"}</button>
        </form>
      ) : null}

      <div className={styles.commentList}>
        {isLoading ? <p>불러오는 중</p> : null}
        {!isLoading && comments.length === 0 ? <p>첫 댓글을 남겨보세요.</p> : null}
        {comments.map((comment) => (
          <article key={comment.id}>
            <header>
              <b>{comment.nickname || comment.author_id}</b>
              <time>{formatTime(comment.created_at)}</time>
            </header>
            <p>{comment.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
