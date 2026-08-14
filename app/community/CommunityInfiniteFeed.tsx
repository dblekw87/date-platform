"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./page.module.scss";

type BackendCommunityPost = {
  id: string;
  category: string;
  title: string;
  author_id: string;
  nickname?: string | null;
  reply_count: number;
  view_count: number;
  created_at: string;
};

type BackendCommunityPage = {
  items?: BackendCommunityPost[];
  nextCursor?: string | null;
};

export type CommunityListPost = {
  id: string;
  type: string;
  title: string;
  author: string;
  replies: number;
  views: number;
  time: string;
};

const categories = ["전체", "질문", "조언", "시황", "뉴스", "테마", "잡담"];
const pageSize = 10;

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

function fromBackendPost(post: BackendCommunityPost): CommunityListPost {
  return {
    id: post.id,
    type: post.category,
    title: post.title,
    author: post.nickname || post.author_id,
    replies: post.reply_count,
    views: post.view_count,
    time: formatTime(post.created_at)
  };
}

export function CommunityInfiniteFeed() {
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const [category, setCategory] = useState("전체");
  const [searchDraft, setSearchDraft] = useState("");
  const [search, setSearch] = useState("");
  const [posts, setPosts] = useState<CommunityListPost[]>([]);
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasFailed, setHasFailed] = useState(false);

  const loadPage = useCallback(async (cursor?: string | null, replace = false) => {
    setIsLoading(true);

    try {
      const params = new URLSearchParams({ limit: String(pageSize) });

      if (category !== "전체") params.set("category", category);
      if (search) params.set("q", search);
      if (cursor) params.set("cursor", cursor);

      const response = await fetch(`/api/backend/community/posts?${params.toString()}`, {
        cache: "no-store"
      });

      if (!response.ok) throw new Error(`backend ${response.status}`);

      const data = await response.json() as BackendCommunityPage;
      const items = (data.items ?? []).map(fromBackendPost);

      setHasFailed(false);
      setPosts((current) => replace ? items : [...current, ...items]);
      setNextCursor(data.nextCursor ?? null);
    } catch {
      setHasFailed(true);
      if (replace) {
        setPosts([]);
        setNextCursor(null);
      }
    } finally {
      setIsLoading(false);
    }
  }, [category, search]);

  useEffect(() => {
    // Deferred so the loading flag is not set during the effect itself.
    queueMicrotask(() => {
      void loadPage(null, true);
    });
  }, [loadPage]);

  useEffect(() => {
    const sentinel = sentinelRef.current;

    if (!sentinel || !nextCursor) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting) && !isLoading) {
        void loadPage(nextCursor);
      }
    }, { rootMargin: "240px 0px" });

    observer.observe(sentinel);

    return () => observer.disconnect();
  }, [isLoading, loadPage, nextCursor]);

  function statusMessage() {
    if (isLoading) return "불러오는 중";
    if (hasFailed) return "글을 불러오지 못했습니다. 잠시 후 다시 시도해주세요.";
    if (posts.length === 0) return search ? `"${search}" 검색 결과가 없습니다.` : "아직 글이 없습니다. 첫 글을 남겨보세요.";
    if (nextCursor) return "더 불러오는 중";

    return "마지막 글입니다";
  }

  return (
    <div className={styles.feed}>
      <form
        className={styles.searchPanel}
        aria-label="커뮤니티 검색"
        onSubmit={(event) => {
          event.preventDefault();
          setSearch(searchDraft.trim());
        }}
      >
        <input
          aria-label="커뮤니티 검색어"
          onChange={(event) => setSearchDraft(event.target.value)}
          placeholder="제목으로 검색하세요"
          value={searchDraft}
        />
        <button type="submit">검색</button>
        {search ? (
          <button
            type="button"
            onClick={() => {
              setSearchDraft("");
              setSearch("");
            }}
          >
            초기화
          </button>
        ) : null}
      </form>
      <div className={styles.tabs} aria-label="게시판 분류">
        {categories.map((item) => (
          <button
            aria-pressed={category === item}
            key={item}
            onClick={() => setCategory(item)}
            type="button"
          >
            {item}
          </button>
        ))}
      </div>
      <div className={styles.postList}>
        {posts.map((post) => (
          <Link href={`/community/posts/${post.id}`} key={post.id}>
            <span>{post.type}</span>
            <h2>{post.title}</h2>
            <footer>
              <b>{post.author}</b>
              <small>답변 {post.replies}</small>
              <small>조회 {post.views}</small>
              <time>{post.time}</time>
            </footer>
          </Link>
        ))}
      </div>
      <div className={styles.scrollSentinel} ref={sentinelRef} aria-live="polite">
        {statusMessage()}
      </div>
    </div>
  );
}
