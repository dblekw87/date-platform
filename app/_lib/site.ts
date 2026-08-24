/**
 * 사이트가 자기 주소를 아는 한 곳.
 *
 * OG 카드, 정규 주소, robots, sitemap이 전부 절대 URL을 요구합니다. 각자 알아서
 * 만들게 두면 배포처를 옮길 때 한두 곳이 남습니다.
 *
 * Vercel이 넣어 주는 `VERCEL_PROJECT_PRODUCTION_URL`을 먼저 봅니다 -- 프리뷰
 * 배포에서도 이 값은 **운영 도메인**이라, 프리뷰가 자기 임시 주소를 정규 주소로
 * 내놓아 색인을 나눠 먹는 일이 없습니다.
 */
const configured = process.env.NEXT_PUBLIC_SITE_URL
  ?? (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : null)
  ?? "https://date-platform.vercel.app";

export const siteUrl = configured.replace(/\/+$/, "");

export const siteName = "DATE";

export const siteDescription =
  "미국장 시황, 국내 뉴스, 일정, 속보·공시, 수급과 차트를 한 화면에서 확인하는 시장 정보 보드.";

/**
 * 색인해도 되는 경로.
 *
 * 로그인 뒤에서만 열리는 화면(`/community`, `/journal/trades/new`)과 인증 흐름은
 * 뺍니다. 크롤러가 가 봐야 로그인으로 튕기고, 그 리다이렉트가 색인에 남습니다.
 * 프로필도 남의 것을 볼 수 있는 화면이 아닙니다.
 */
export const publicPaths = ["/", "/terms", "/privacy"];

/** 크롤러를 들이지 않을 경로. robots와 페이지 메타데이터가 같은 목록을 씁니다. */
export const privatePaths = ["/api/", "/auth/", "/profile", "/journal", "/community"];
