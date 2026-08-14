import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { safeNextPath } from "../oauth";

export async function POST(request: NextRequest) {
  const response = NextResponse.redirect(new URL(safeNextPath(request.nextUrl.searchParams.get("next")), request.url), 303);

  response.cookies.delete("date_session");
  response.cookies.set("date_mock_signed_out", "true", {
    httpOnly: true,
    sameSite: "lax",
    path: "/"
  });

  return response;
}
