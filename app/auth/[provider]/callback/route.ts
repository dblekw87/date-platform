import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getOAuthConfig, oauthProviders, safeNextPath, type OAuthProvider } from "../../oauth";
import { createSessionValue } from "../../session";

type OAuthTokenResponse = {
  access_token?: string;
  error?: string;
  error_description?: string;
};

class OAuthCallbackError extends Error {
  constructor(
    readonly code: string,
    message: string
  ) {
    super(message);
  }
}

function errorRedirect(request: NextRequest, nextPath: string, error: string, detail?: string) {
  const url = new URL("/auth/login", request.url);

  url.searchParams.set("error", error);
  url.searchParams.set("next", nextPath);
  if (process.env.NODE_ENV !== "production" && detail) {
    url.searchParams.set("detail", detail.slice(0, 180));
  }

  return NextResponse.redirect(url);
}

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
    return errorRedirect(request, nextPath, "invalid_oauth_state");
  }

  if (!config.clientId || (config.clientSecretRequired && !config.clientSecret)) {
    return errorRedirect(request, nextPath, `missing_${provider}_config`);
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
      throw new OAuthCallbackError(`${provider}_token_failed`, token.error_description || token.error || `HTTP ${tokenResponse.status}`);
    }

    let user;

    try {
      user = await config.getProfile(token.access_token);
    } catch (error) {
      throw new OAuthCallbackError(`${provider}_profile_failed`, error instanceof Error ? error.message : "profile_failed");
    }

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
  } catch (error) {
    const callbackError = error instanceof OAuthCallbackError
      ? error
      : new OAuthCallbackError(`${provider}_oauth_failed`, error instanceof Error ? error.message : "oauth_failed");

    console.error(`[oauth:${provider}] ${callbackError.code}`, callbackError.message);

    return errorRedirect(request, nextPath, callbackError.code, callbackError.message);
  }
}
