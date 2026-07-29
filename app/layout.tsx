import type { Metadata } from "next";
import "./globals.scss";

export const metadata: Metadata = {
  title: "DATE Phase17 와이어프레임",
  description: "정보 구조 검증을 위한 그레이 박스 대시보드 와이어프레임 프로토타입."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
