import type { NewsHeadlineDto } from "../types";

export type RawNewsItem = {
  id?: string;
  title?: string;
  headline?: string;
  text?: string;
  summary?: string;
  source?: string | { name?: string };
  provider?: string;
  category?: string;
  label?: string;
  publishedAt?: string;
  pubDate?: string;
  created?: string;
  updated?: string;
  datetime?: number;
  url?: string;
  link?: string;
  originalUrl?: string;
  originallink?: string;
};

export type RawNewsFeed = RawNewsItem[] | {
  items?: RawNewsItem[];
  articles?: RawNewsItem[];
  news?: RawNewsItem[];
  data?: RawNewsItem[];
};

export function rawItemsFromFeed(feed: RawNewsFeed): RawNewsItem[] {
  if (Array.isArray(feed)) return feed;

  return feed.items ?? feed.articles ?? feed.news ?? feed.data ?? [];
}

function sourceName(source: RawNewsItem["source"], fallback?: string) {
  if (typeof source === "string" && source.trim()) return source.trim();
  if (source && typeof source === "object" && source.name?.trim()) return source.name.trim();

  return fallback?.trim() || "뉴스";
}

function publishedAtFromRaw(item: RawNewsItem) {
  const dateText = item.publishedAt || item.pubDate || item.created || item.updated;

  if (dateText) {
    const date = new Date(dateText);

    if (!Number.isNaN(date.getTime())) return date.toISOString();
  }
  if (typeof item.datetime === "number") return new Date(item.datetime * 1000).toISOString();

  return new Date().toISOString();
}

function timeFromPublishedAt(publishedAt: string) {
  const date = new Date(publishedAt);

  if (Number.isNaN(date.getTime())) return "--:--";

  return new Intl.DateTimeFormat("ko-KR", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "Asia/Seoul"
  }).format(date);
}

function labelFromRaw(item: RawNewsItem) {
  const text = `${item.category ?? ""} ${item.label ?? ""} ${item.title ?? ""} ${item.headline ?? ""}`.toLowerCase();

  if (/rate|yield|fed|fomc|cpi|ppi|금리|환율|달러|물가/.test(text)) return "매크로";
  if (/semiconductor|chip|hbm|반도체/.test(text)) return "반도체";
  if (/ai|data center|데이터센터|전력/.test(text)) return "AI 인프라";
  if (/merger|acquisition|m&a|인수|합병/.test(text)) return "M&A";
  if (/policy|정책|규제/.test(text)) return "정책";

  return item.label?.trim() || item.category?.trim() || "헤드라인";
}

function hashString(value: string) {
  let hash = 0;

  for (let index = 0; index < value.length; index += 1) {
    hash = ((hash << 5) - hash + value.charCodeAt(index)) | 0;
  }

  return Math.abs(hash).toString(36);
}

export function normalizeNewsItem(item: RawNewsItem, index: number): NewsHeadlineDto | null {
  const title = stripHtml(item.headline?.trim() || item.title?.trim() || item.text?.trim() || "");
  const originalUrl = item.originalUrl || item.originallink || item.url || item.link || "#";

  if (!title) return null;

  const publishedAt = publishedAtFromRaw(item);
  const stableId = item.id || `news-${hashString(`${originalUrl}|${publishedAt}|${title}`)}`;

  return {
    id: stableId || `news-${index}`,
    time: timeFromPublishedAt(publishedAt),
    source: sourceName(item.source, item.provider),
    publishedAt,
    originalUrl,
    label: labelFromRaw(item),
    text: title,
    provider: "news"
  };
}

function stripHtml(value: string) {
  return value
    .replace(/<[^>]*>/g, "")
    .replace(/&quot;/g, "\"")
    .replace(/&apos;/g, "'")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .trim();
}

export function dedupeNews(items: NewsHeadlineDto[]) {
  const seen = new Set<string>();

  return items.filter((item) => {
    const key = `${item.originalUrl}|${item.text}`.toLowerCase().replace(/\s+/g, " ").slice(0, 240);

    if (seen.has(key)) return false;
    seen.add(key);

    return true;
  });
}

export function normalizeNewsFeed(feed: RawNewsFeed) {
  return dedupeNews(
    rawItemsFromFeed(feed)
      .map(normalizeNewsItem)
      .filter((item): item is NewsHeadlineDto => Boolean(item))
      .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
      .slice(0, 80)
  );
}
