import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { safeNextPath } from "../oauth";
import { createSessionValue, type CurrentUser } from "../session";

const supportedProviders = new Set<CurrentUser["provider"]>(["mock", "google", "naver", "kakao"]);

export async function GET(request: NextRequest) {
  if (process.env.DATE_MOCK_AUTH !== "true") {
    return NextResponse.json({ error: "mock_auth_disabled" }, { status: 404 });
  }

  const providerParam = request.nextUrl.searchParams.get("provider");
  const provider = supportedProviders.has(providerParam as CurrentUser["provider"])
    ? providerParam as CurrentUser["provider"]
    : "mock";
  const response = NextResponse.redirect(new URL(safeNextPath(request.nextUrl.searchParams.get("next")), request.url));

  response.cookies.set("date_session", createSessionValue({
    name: provider === "mock" ? "Mock Trader" : "DATE 회원",
    provider,
    providerUserId: provider === "mock" ? "mock-trader" : provider
  }), {
    httpOnly: true,
    sameSite: "lax",
    path: "/"
  });
  response.cookies.delete("date_mock_signed_out");

  return response;
}
