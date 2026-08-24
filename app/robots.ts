import type { MetadataRoute } from "next";
import { privatePaths, siteUrl } from "./_lib/site";

/**
 * 로그인 뒤 화면과 라우트 핸들러는 들이지 않습니다. 크롤러가 가 봐야 로그인으로
 * 튕기고 그 리다이렉트가 색인에 남습니다.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    host: siteUrl,
    rules: [{ allow: "/", disallow: privatePaths, userAgent: "*" }],
    sitemap: `${siteUrl}/sitemap.xml`
  };
}
