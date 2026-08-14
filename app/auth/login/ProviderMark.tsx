import type { OAuthProvider } from "../oauth";

/**
 * Brand marks for the login buttons.
 *
 * Drawn inline rather than loaded as files so the buttons paint with the rest
 * of the card and need no extra request. Each mark is decorative: the button
 * label already names the provider, so it stays out of the accessibility tree.
 *
 * Colors follow each provider's brand guidance. Naver and Kakao buttons already
 * carry the brand background, so their marks are drawn in the contrasting
 * foreground rather than repeating the colored tile.
 */

function GoogleMark() {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" focusable="false">
      <path fill="#ea4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
      <path fill="#4285f4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
      <path fill="#fbbc05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.28-3.14.76-4.59l-7.97-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
      <path fill="#34a853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
    </svg>
  );
}

function NaverMark() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true" focusable="false">
      <path fill="#ffffff" d="M11.65 10.72 8.19 5.5H5.5v9h2.85V9.28l3.46 5.22h2.69v-9h-2.85z" />
    </svg>
  );
}

function KakaoMark() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path
        fill="#111111"
        d="M12 3C6.48 3 2 6.52 2 10.86c0 2.79 1.86 5.24 4.66 6.62-.15.53-.83 2.86-.86 3.05 0 0-.02.14.08.2.09.05.2.01.2.01.26-.04 3.02-1.98 3.5-2.32.79.11 1.6.17 2.42.17 5.52 0 10-3.52 10-7.73S17.52 3 12 3z"
      />
    </svg>
  );
}

const marks: Record<OAuthProvider, () => React.ReactElement> = {
  google: GoogleMark,
  kakao: KakaoMark,
  naver: NaverMark
};

export function ProviderMark({ provider }: { provider: OAuthProvider }) {
  const Mark = marks[provider];

  return <Mark />;
}
