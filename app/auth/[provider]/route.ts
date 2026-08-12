import { randomBytes } from "node:crypto";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getOAuthConfig, oauthProviders, safeNextPath, type OAuthProvider } from "../oauth";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ provider: string }> }
) {
  const { provider: providerParam } = await context.params;

  if (!oauthProviders.has(providerParam as OAuthProvider)) {
    return NextResponse.redirect(new URL("/auth/login?error=unsupported_provider", request.url));
  }

  const provider = providerParam as OAuthProvider;
  const config = getOAuthConfig(provider);
  const nextPath = safeNextPath(request.nextUrl.searchParams.get("next"));

  if (!config.clientId || (config.clientSecretRequired && !config.clientSecret)) {
    return NextResponse.redirect(new URL(`/auth/login?error=missing_${provider}_config&next=${encodeURIComponent(nextPath)}`, request.url));
  }

  const state = randomBytes(24).toString("base64url");
  const redirectUri = new URL(`/auth/${provider}/callback`, request.nextUrl.origin).toString();
  const authorizationUrl = new URL(config.authorizationUrl);

  authorizationUrl.searchParams.set("response_type", "code");
  authorizationUrl.searchParams.set("client_id", config.clientId);
  authorizationUrl.searchParams.set("redirect_uri", redirectUri);
  authorizationUrl.searchParams.set("state", state);
  authorizationUrl.searchParams.set("scope", config.scope);

  const response = NextResponse.redirect(authorizationUrl);

  response.cookies.set(`date_oauth_state_${provider}`, JSON.stringify({ nextPath, state }), {
    httpOnly: true,
    maxAge: 60 * 10,
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production"
  });

  return response;
}
