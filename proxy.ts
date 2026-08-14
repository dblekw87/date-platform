import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const maintenanceHtml = `<!doctype html>
<html lang="ko">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>DATE 서버 작업 중</title>
    <style>
      :root {
        color-scheme: light;
        font-family: Arial, "Noto Sans KR", sans-serif;
      }

      body {
        display: grid;
        box-sizing: border-box;
        min-height: 100vh;
        min-height: 100svh;
        margin: 0;
        place-items: center;
        background: #f4f5f7;
        color: #000000;
        overflow-x: hidden;
      }

      main {
        display: grid;
        box-sizing: border-box;
        width: calc(100% - 48px);
        max-width: 720px;
        gap: 20px;
        border: 1px solid #000000;
        background: #ffffff;
        padding: 48px;
        overflow: hidden;
      }

      .logo {
        display: inline-flex;
        width: 70px;
        height: 36px;
        align-items: center;
        overflow: hidden;
        color: #000000;
        line-height: 0;
      }

      .logo svg {
        display: block;
        width: 70px;
        height: 36px;
      }

      h1 {
        margin: 0;
        font-size: clamp(30px, 5vw, 56px);
        line-height: 0.95;
        letter-spacing: 0;
      }

      .headline {
        display: flex;
        min-height: 0;
        gap: clamp(22px, 4vw, 42px);
        align-items: center;
      }

      .headline h1 {
        flex: 0 0 auto;
        white-space: nowrap;
      }

      .worker {
        width: clamp(132px, 17vw, 168px);
        height: clamp(116px, 15vw, 152px);
        flex: 0 0 auto;
        overflow: visible;
      }

      .worker img {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: contain;
        object-position: center;
      }

      p {
        max-width: 520px;
        margin: 0;
        color: #526077;
        font-size: 16px;
        font-weight: 700;
        line-height: 1.6;
      }

      @media (max-width: 640px) {
        main {
          width: calc(100vw - 28px);
          max-width: 720px;
          padding: 28px 14px;
        }

        h1 {
          font-size: clamp(24px, 7.1vw, 28px);
          line-height: 1.12;
        }

        .headline {
          gap: 12px;
        }

        .worker {
          width: 88px;
          height: 80px;
        }

        p {
          font-size: 15px;
          line-height: 1.58;
          word-break: keep-all;
        }
      }
    </style>
  </head>
  <body>
    <main>
      <strong class="logo" aria-label="DATE">
        <svg aria-hidden="true" fill="none" viewBox="0 0 55 28" xmlns="http://www.w3.org/2000/svg">
          <path d="M32.61 27.3V3.9H28.13V0H41.39V3.9H36.9V27.3H32.61Z" fill="currentColor" />
          <path d="M14.26 27.3L18.7 0H24.51L28.96 27.3H24.67L21.45 6.3L18.23 27.3H14.25H14.26Z" fill="currentColor" />
          <path d="M0 0H6.55C10.84 0 12.95 2.38 12.95 6.75V20.56C12.95 24.93 10.84 27.31 6.55 27.31H0V0ZM4.29 23.4H6.47C7.84 23.4 8.65 22.7 8.65 20.75V6.55C8.65 4.6 7.83 3.9 6.47 3.9H4.29V23.4Z" fill="currentColor" />
          <path d="M47.17 3.9H54.58V0H42.88V27.3H54.58V23.4H47.17V15.02H53.05V11.11H47.17V3.9Z" fill="currentColor" />
        </svg>
      </strong>
      <div class="headline">
        <h1>서버 작업 중입니다.</h1>
        <span class="worker">
          <img alt="" src="/maintenance-character.png" />
        </span>
      </div>
      <p>현재 운영 서버를 잠시 닫고 로컬 작업을 진행하고 있습니다. 작업 완료 후 다시 열 예정입니다.</p>
    </main>
  </body>
</html>`;

export function proxy(request: NextRequest) {
  if (process.env.MAINTENANCE_MODE !== "true") {
    const useMockSession = process.env.DATE_MOCK_AUTH === "true";
    const mockSignedOut = request.cookies.get("date_mock_signed_out")?.value === "true";

    const isProtectedPath =
      request.nextUrl.pathname.startsWith("/community") ||
      request.nextUrl.pathname.startsWith("/journal/trades/new");

    if (isProtectedPath && !(useMockSession && !mockSignedOut) && !request.cookies.get("date_session")) {
      const loginUrl = new URL("/auth/login", request.url);

      loginUrl.searchParams.set("next", request.nextUrl.pathname);

      return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
  }

  if (request.nextUrl.pathname.startsWith("/_next/")) {
    return NextResponse.next();
  }

  return new NextResponse(maintenanceHtml, {
    status: 503,
    headers: {
      "Cache-Control": "no-store",
      "Content-Type": "text/html; charset=utf-8"
    }
  });
}

export const config = {
  matcher: ["/((?!favicon.ico|.*\\.(?:png|jpg|jpeg|gif|webp|svg|ico)$).*)"]
};
