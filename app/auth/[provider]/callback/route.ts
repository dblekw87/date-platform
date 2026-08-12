import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getOAuthConfig, oauthProviders, safeNextPath, type OAuthProvider } from "../../oauth";
import { createSessionValue } from "../../session";

type OAuthTokenResponse = {
  access_token?: string;
  error?: string;
  error_description?: string;
};

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
  const stateCookieName = `date_oauth_state_${provider}`;
  const stateCookie = request.cookies.get(stateCookieName)?.value;
  const state = request.nextUrl.searchParams.get("state");
  const code = request.nextUrl.searchParams.get("code");

  let storedState: { nextPath?: string; state?: string } = {};

  try {
    storedState = stateCookie ? JSON.parse(stateCookie) : {};
  } catch {
    storedState = {};
  }

  const nextPath = safeNextPath(storedState.nextPath ?? null);

  if (!code || !state || state !== storedState.state) {
    return NextResponse.redirect(new URL(`/auth/login?error=invalid_oauth_state&next=${encodeURIComponent(nextPath)}`, request.url));
  }

  if (!config.clientId || (config.clientSecretRequired && !config.clientSecret)) {
    return NextResponse.redirect(new URL(`/auth/login?error=missing_${provider}_config&next=${encodeURIComponent(nextPath)}`, request.url));
  }

  const redirectUri = new URL(`/auth/${provider}/callback`, request.nextUrl.origin).toString();
  const tokenParams = new URLSearchParams({
    client_id: config.clientId,
    code,
    grant_type: "authorization_code",
    redirect_uri: redirectUri
  });

  if (config.clientSecret) {
    tokenParams.set("client_secret", config.clientSecret);
  }

  try {
    const tokenResponse = await fetch(config.tokenUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: tokenParams,
      cache: "no-store"
    });
    const token = await tokenResponse.json() as OAuthTokenResponse;

    if (!tokenResponse.ok || !token.access_token) {
      throw new Error(token.error_description || token.error || "oauth_token_failed");
    }

    const user = await config.getProfile(token.access_token);
    const response = NextResponse.redirect(new URL(nextPath, request.url));

    response.cookies.set("date_session", createSessionValue(user), {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 30,
      path: "/",
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production"
    });
    response.cookies.delete(stateCookieName);
    response.cookies.delete("date_mock_signed_out");

    return response;
  } catch {
    return NextResponse.redirect(new URL(`/auth/login?error=oauth_failed&next=${encodeURIComponent(nextPath)}`, request.url));
  }
}
