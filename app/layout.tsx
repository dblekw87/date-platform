import type { Metadata } from "next";
import { Bebas_Neue } from "next/font/google";
import "./globals.scss";

const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-bebas-neue"
});

export const metadata: Metadata = {
  title: "DATE 시장 확인 보드",
  description: "미국장 시황, 국내 뉴스, 일정, 속보, 수급과 차트를 빠르게 확인하는 시장 보드."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className={bebasNeue.variable} lang="ko">
      <body>{children}</body>
    </html>
  );
}
