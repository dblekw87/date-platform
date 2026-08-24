import type { Metadata } from "next";
import { Bebas_Neue } from "next/font/google";
import { QueryProvider } from "./_components/QueryProvider";
import { siteDescription, siteName, siteUrl } from "./_lib/site";
import "./globals.scss";

const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-bebas-neue"
});

/**
 * 링크로 공유됐을 때와 검색 결과에 나올 때의 얼굴.
 *
 * `metadataBase`가 있어야 OG 이미지와 정규 주소가 절대 URL로 나갑니다. 없으면
 * Next가 상대 경로를 그대로 내보내고, 카카오톡·슬랙·트위터는 그걸 못 읽어서
 * 카드가 빈 채로 뜹니다.
 *
 * 제목은 `템플릿`으로 둡니다 -- 하위 화면이 "커뮤니티"만 적어도 "커뮤니티 · DATE"가
 * 되고, 홈은 `default`를 써서 접미사가 두 번 붙지 않습니다.
 */
export const metadata: Metadata = {
  alternates: { canonical: "/" },
  applicationName: siteName,
  description: siteDescription,
  formatDetection: { address: false, email: false, telephone: false },
  keywords: ["시장 보드", "주식 시황", "국내 증시", "미국 증시", "공시", "테마주", "매매 복기"],
  metadataBase: new URL(siteUrl),
  openGraph: {
    description: siteDescription,
    locale: "ko_KR",
    siteName,
    title: `${siteName} · 투자 판단 전 확인 흐름`,
    type: "website",
    url: "/"
  },
  robots: {
    follow: true,
    googleBot: { follow: true, index: true, "max-image-preview": "large", "max-snippet": -1 },
    index: true
  },
  title: {
    default: `${siteName} · 투자 판단 전 확인 흐름`,
    template: `%s · ${siteName}`
  },
  twitter: {
    card: "summary_large_image",
    description: siteDescription,
    title: `${siteName} · 투자 판단 전 확인 흐름`
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className={bebasNeue.variable} lang="ko">
      <body>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
