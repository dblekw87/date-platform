# SNS Login Setup

DATE frontend already has OAuth routes for Google, Naver, and Kakao.

## Environment Variables

```env
AUTH_SESSION_SECRET=replace-with-a-long-random-secret
GOOGLE_OAUTH_CLIENT_ID=
GOOGLE_OAUTH_CLIENT_SECRET=
NAVER_OAUTH_CLIENT_ID=
NAVER_OAUTH_CLIENT_SECRET=
KAKAO_REST_API_KEY=
KAKAO_OAUTH_CLIENT_SECRET=
```

`KAKAO_OAUTH_CLIENT_SECRET` is optional unless the Kakao app enables client secret.

## Redirect URIs

Local development:

```text
http://localhost:3000/auth/google/callback
http://localhost:3000/auth/naver/callback
http://localhost:3000/auth/kakao/callback
```

Vercel production:

```text
https://YOUR_VERCEL_DOMAIN/auth/google/callback
https://YOUR_VERCEL_DOMAIN/auth/naver/callback
https://YOUR_VERCEL_DOMAIN/auth/kakao/callback
```

Later custom domain:

```text
https://YOUR_DOMAIN/auth/google/callback
https://YOUR_DOMAIN/auth/naver/callback
https://YOUR_DOMAIN/auth/kakao/callback
```

## Provider Notes

Google needs OAuth consent screen setup and the `openid email profile` scope.

Naver needs Login with Naver enabled and profile/email permissions.

Kakao needs Kakao Login enabled, Redirect URI registered, and profile/email permissions. Use the REST API key as `KAKAO_REST_API_KEY`.
