import assert from "node:assert/strict";
import { normalizeNewsFeed } from "../app/kr/market-board/adapters/news-normalizer";

const fixture = {
  articles: [
    {
      title: "Fed rate path remains in focus before CPI",
      source: { name: "NewsAPI Source" },
      publishedAt: "2026-08-04T00:40:00Z",
      url: "https://example.com/newsapi-fed"
    },
    {
      headline: "AI data center power demand lifts utility theme",
      source: "Finnhub",
      datetime: 1785812400,
      url: "https://example.com/finnhub-ai"
    },
    {
      title: "반도체 장비 수출 관련 뉴스",
      pubDate: "Tue, 04 Aug 2026 09:10:00 +0900",
      originallink: "https://example.com/naver-chip",
      provider: "NAVER"
    },
    {
      id: "benzinga-ma-001",
      headline: "Small-cap company announces merger agreement",
      source: "Benzinga",
      publishedAt: "2026-08-04T00:55:00Z",
      url: "https://example.com/benzinga-ma"
    },
    {
      title: "반도체 장비 수출 관련 뉴스",
      pubDate: "Tue, 04 Aug 2026 09:10:00 +0900",
      originallink: "https://example.com/naver-chip?utm_source=naver",
      provider: "NAVER"
    },
    {
      title: "반도체 장비 수출 관련 뉴스",
      pubDate: "Tue, 04 Aug 2026 09:08:00 +0900",
      originallink: "https://example.com/naver-chip",
      provider: "NAVER"
    },
    {
      source: "Broken Provider",
      publishedAt: "2026-08-04T00:01:00Z",
      url: "https://example.com/no-title"
    }
  ]
};

const normalized = normalizeNewsFeed(fixture);

assert.equal(normalized.length, 4);
assert.deepEqual(
  normalized.map((item) => item.label),
  ["AI 인프라", "M&A", "매크로", "반도체"]
);
assert.equal(normalized[0].source, "Finnhub");
assert.equal(normalized[1].id, "benzinga-ma-001");
assert.equal(normalized[1].source, "Benzinga");
assert.equal(normalized[2].source, "NewsAPI Source");
assert.equal(normalized[3].source, "NAVER");
assert.equal(normalized[3].originalUrl, "https://example.com/naver-chip");
assert.ok(normalized.every((item) => item.provider === "news"));
assert.ok(normalized.every((item) => item.publishedAt));
assert.ok(normalized.every((item) => item.time));

console.log(`news normalization fixture passed: ${normalized.length} items`);
