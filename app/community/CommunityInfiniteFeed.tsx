"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import styles from "./page.module.scss";

export type CommunityListPost = {
  id: string;
  type: string;
  title: string;
  author: string;
  replies: number;
  views: number;
  time: string;
};

type BackendCommunityPost = {
  id: string;
  category: string;
  title: string;
  author_id: string;
  reply_count: number;
  view_count: number;
  created_at: string;
};

type BackendCommunityPage = {
  items?: BackendCommunityPost[];
  nextCursor?: string | null;
};

const categories = ["전체", "질문", "조언", "시황", "뉴스", "테마", "잡담"];
const pageSize = 6;

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
    author: post.author_id,
    replies: post.reply_count,
    views: post.view_count,
    time: formatTime(post.created_at)
  };
}

export function CommunityInfiniteFeed({ posts }: { posts: CommunityListPost[] }) {
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const [category, setCategory] = useState("전체");
  const [visibleCount, setVisibleCount] = useState(pageSize);
  const [loadedPosts, setLoadedPosts] = useState<CommunityListPost[]>(posts);
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [usesBackend, setUsesBackend] = useState(false);
  const filteredPosts = useMemo(
    () => category === "전체" ? loadedPosts : loadedPosts.filter((post) => post.type === category),
    [category, loadedPosts]
  );
  const visiblePosts = usesBackend ? filteredPosts : filteredPosts.slice(0, visibleCount);
  const hasMore = usesBackend ? Boolean(nextCursor) : visibleCount < filteredPosts.length;

  const loadBackendPage = useCallback(async (cursor?: string | null, replace = false) => {
    setIsLoading(true);

    try {
      const params = new URLSearchParams({
        limit: String(pageSize)
      });

      if (category !== "전체") params.set("category", category);
      if (cursor) params.set("cursor", cursor);

      const response = await fetch(`/api/backend/community/posts?${params.toString()}`, {
        cache: "no-store"
      });

      if (!response.ok) return;

      const data = await response.json() as BackendCommunityPage;
      const items = (data.items ?? []).map(fromBackendPost);

      if (items.length === 0 && replace) {
        setUsesBackend(false);
        setLoadedPosts(posts);
        setNextCursor(null);
        return;
      }

      if (items.length > 0 || data.nextCursor) {
        setUsesBackend(true);
        setLoadedPosts((current) => replace ? items : [...current, ...items]);
        setNextCursor(data.nextCursor ?? null);
      }
    } catch {
      if (replace) {
        setUsesBackend(false);
        setLoadedPosts(posts);
        setNextCursor(null);
      }
    } finally {
      setIsLoading(false);
    }
  }, [category, posts]);

  useEffect(() => {
    queueMicrotask(() => {
      void loadBackendPage(null, true);
    });
  }, [category, loadBackendPage]);

  useEffect(() => {
    const sentinel = sentinelRef.current;

    if (!sentinel || !hasMore) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        if (usesBackend) {
          if (!isLoading && nextCursor) void loadBackendPage(nextCursor);
          return;
        }

        setVisibleCount((current) => Math.min(current + pageSize, filteredPosts.length));
      }
    }, { rootMargin: "240px 0px" });

    observer.observe(sentinel);

    return () => observer.disconnect();
  }, [filteredPosts.length, hasMore, isLoading, loadBackendPage, nextCursor, usesBackend]);

  return (
    <div className={styles.feed}>
      <div className={styles.tabs} aria-label="게시판 분류">
        {categories.map((item) => (
          <button
            aria-pressed={category === item}
            key={item}
            onClick={() => {
              setVisibleCount(pageSize);
              setCategory(item);
            }}
            type="button"
          >
            {item}
          </button>
        ))}
      </div>
      <div className={styles.postList}>
        {visiblePosts.map((post) => (
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
        {isLoading ? "불러오는 중" : hasMore ? "더 불러오는 중" : "마지막 글입니다"}
      </div>
    </div>
  );
}
