import type { NewsHeadlineDto } from "../types";

export type RawNewsItem = {
  id?: string;
  title?: string;
  headline?: string;
  text?: string;
  summary?: string;
  source?: string | { name?: string };
  provider?: string;
  region?: "US" | "KR" | "GLOBAL";
  category?: string;
  label?: string;
  type?: string;
  newsType?: string;
  urgency?: string;
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
  if (/earnings|guidance|실적|가이던스|컨센서스/.test(text)) return "실적";
  if (/battery|secondary battery|2차전지|배터리/.test(text)) return "2차전지";
  if (/semiconductor|\bchips?\b|hbm|반도체/.test(text)) return "반도체";
  if (/\bai\b|artificial intelligence|data center|데이터센터|전력/.test(text)) return "AI 인프라";
  if (/bio|biotech|pharma|fda|바이오|제약|임상|승인/.test(text)) return "바이오";
  if (/shipbuilding|shipyard|defense|aerospace|조선|방산|항공|우주/.test(text)) return "조선·방산";
  if (/robot|automation|nuclear|uranium|로봇|자동화|원전|원자력/.test(text)) return "로봇·원전";
  if (/energy|oil|crude|fuel|gas|wti|lng|에너지|유가|가스/.test(text)) return "에너지";
  if (/\bauto\b|vehicle|vehicles|ev\b|자동차|전기차/.test(text)) return "자동차";
  if (/bank|banks|brokerage|은행|금융|증권/.test(text)) return "금융";
  if (/crypto|bitcoin|btc|가상자산|비트코인/.test(text)) return "암호화폐";
  if (/merger|acquisition|m&a|인수|합병/.test(text)) return "M&A";
  if (/policy|정책|규제/.test(text)) return "정책";

  const fallback = item.label?.trim() || item.category?.trim();

  if (fallback && !/^(general|business|stock market|stocks|news|headline|headlines)$/i.test(fallback)) return fallback;

  return "헤드라인";
}

function sourceDetailFromRaw(item: RawNewsItem) {
  const values = [item.label, item.category, item.type, item.newsType, item.urgency]
    .map((value) => value?.trim())
    .filter((value): value is string => Boolean(value));
  const text = `${values.join(" ")} ${item.title ?? ""} ${item.headline ?? ""}`;

  if (/속보|breaking|urgent|flash|newsflash/i.test(text)) return "속보";
  if (/단독|exclusive/i.test(text)) return "단독";
  if (/업데이트|종합|\bupdate\b|updated/i.test(text)) return "업데이트";
  if (/보도자료|press release|prnewswire|businesswire|globenewswire|globe newswire/i.test(text)) return "보도자료";

  return undefined;
}

function regionFromRaw(item: RawNewsItem): NewsHeadlineDto["region"] {
  if (item.region) return item.region;

  const text = `${sourceName(item.source, item.provider)} ${item.provider ?? ""} ${item.category ?? ""} ${item.title ?? ""} ${item.headline ?? ""} ${item.text ?? ""}`;

  if (/[가-힣]/.test(text)) return "KR";
  if (/naver|국내|korea|kospi|kosdaq/i.test(text)) return "KR";
  if (/finnhub|benzinga|newsapi|cnbc|reuters|nasdaq|nyse|america|us |u\.s\./i.test(text)) return "US";

  return "GLOBAL";
}

function hashString(value: string) {
  let hash = 0;

  for (let index = 0; index < value.length; index += 1) {
    hash = ((hash << 5) - hash + value.charCodeAt(index)) | 0;
  }

  return Math.abs(hash).toString(36);
}

function canonicalUrl(value: string) {
  if (!value || value === "#") return "";

  try {
    const url = new URL(value);
    const removableParams = [
      "utm_source",
      "utm_medium",
      "utm_campaign",
      "utm_term",
      "utm_content",
      "fbclid",
      "gclid",
      "cmpid"
    ];

    removableParams.forEach((param) => url.searchParams.delete(param));
    url.hash = "";

    return url.toString().replace(/\/$/, "").toLowerCase();
  } catch {
    return value.split("#")[0].replace(/\/$/, "").toLowerCase();
  }
}

function normalizeHeadlineKey(value: string) {
  return stripHtml(value)
    .toLowerCase()
    .replace(/\[[^\]]+\]|\([^)]*(속보|종합|단독|update|updated|exclusive)[^)]*\)/gi, " ")
    .replace(/&[a-z]+;/gi, " ")
    .replace(/[^\p{L}\p{N}]+/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function headlineFingerprint(item: NewsHeadlineDto) {
  const normalized = normalizeHeadlineKey(item.text);
  const words = normalized.split(" ").filter(Boolean);
  const compact = words.length > 0 ? words.slice(0, 16).join(" ") : normalized;

  return `${item.region}|${compact}`.slice(0, 220);
}

function cleanNewsTitle(title: string, source: string) {
  const escapedSource = source.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

  return title
    .replace(new RegExp(`\\s+-\\s+${escapedSource}\\s*$`, "i"), "")
    .replace(/\s+-\s+Google News\s*$/i, "")
    .trim();
}

export function normalizeNewsItem(item: RawNewsItem, index: number): NewsHeadlineDto | null {
  const rawTitle = stripHtml(item.headline?.trim() || item.title?.trim() || item.text?.trim() || "");
  const originalUrl = item.originalUrl || item.originallink || item.url || item.link || "#";

  if (!rawTitle) return null;

  const publishedAt = publishedAtFromRaw(item);
  const source = sourceName(item.source, item.provider);
  const title = cleanNewsTitle(rawTitle, source);
  const stableId = item.id || `news-${hashString(`${originalUrl}|${publishedAt}|${title}`)}`;

  return {
    id: stableId || `news-${index}`,
    time: timeFromPublishedAt(publishedAt),
    source,
    sourceDetail: sourceDetailFromRaw(item),
    region: regionFromRaw(item),
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
  const seenUrls = new Set<string>();
  const seenHeadlines = new Set<string>();

  return [...items]
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
    .filter((item) => {
      const urlKey = canonicalUrl(item.originalUrl);
      const headlineKey = headlineFingerprint(item);

      if (urlKey && seenUrls.has(urlKey)) return false;
      if (headlineKey && seenHeadlines.has(headlineKey)) return false;

      if (urlKey) seenUrls.add(urlKey);
      if (headlineKey) seenHeadlines.add(headlineKey);

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
