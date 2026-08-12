import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createSessionValue, type CurrentUser } from "../session";

const supportedProviders = new Set<CurrentUser["provider"]>(["mock", "google", "naver", "kakao"]);

function safeNextPath(value: string | null) {
  return value?.startsWith("/") ? value : "/";
}

export async function GET(request: NextRequest) {
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
