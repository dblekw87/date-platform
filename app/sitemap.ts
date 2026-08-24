import type { MetadataRoute } from "next";
import { publicPaths, siteUrl } from "./_lib/site";

/**
 * 로그인 없이 열리는 세 화면뿐입니다. 시장 보드는 매일 바뀌고 약관은 거의 안
 * 바뀌므로 갱신 주기를 나눠 적습니다.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return publicPaths.map((path) => ({
    changeFrequency: path === "/" ? "hourly" : "yearly",
    lastModified: now,
    priority: path === "/" ? 1 : 0.3,
    url: `${siteUrl}${path === "/" ? "" : path}`
  }));
}
