"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
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

const categories = ["전체", "질문", "조언", "시황", "뉴스", "테마", "잡담"];
const pageSize = 6;

export function CommunityInfiniteFeed({ posts }: { posts: CommunityListPost[] }) {
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const [category, setCategory] = useState("전체");
  const [visibleCount, setVisibleCount] = useState(pageSize);
  const filteredPosts = useMemo(
    () => category === "전체" ? posts : posts.filter((post) => post.type === category),
    [category, posts]
  );
  const visiblePosts = filteredPosts.slice(0, visibleCount);
  const hasMore = visibleCount < filteredPosts.length;

  useEffect(() => {
    setVisibleCount(pageSize);
  }, [category]);

  useEffect(() => {
    const sentinel = sentinelRef.current;

    if (!sentinel || !hasMore) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        setVisibleCount((current) => Math.min(current + pageSize, filteredPosts.length));
      }
    }, { rootMargin: "240px 0px" });

    observer.observe(sentinel);

    return () => observer.disconnect();
  }, [filteredPosts.length, hasMore]);

  return (
    <div className={styles.feed}>
      <div className={styles.tabs} aria-label="게시판 분류">
        {categories.map((item) => (
          <button aria-pressed={category === item} key={item} onClick={() => setCategory(item)} type="button">
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
        {hasMore ? "더 불러오는 중" : "마지막 글입니다"}
      </div>
    </div>
  );
}
