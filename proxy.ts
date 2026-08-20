import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";


export function proxy(request: NextRequest) {
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

export const config = {
  matcher: ["/((?!favicon.ico|.*\\.(?:png|jpg|jpeg|gif|webp|svg|ico)$).*)"]
};
