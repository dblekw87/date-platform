import { ImageResponse } from "next/og";

/**
 * 링크를 붙였을 때 보이는 카드 이미지.
 *
 * 워드마크는 글꼴이 아니라 **벡터 패스**입니다 -- 화면 헤더의 `DateLogo`와 같은
 * 경로라 어떤 환경에서 그리든 같은 모양이 나옵니다. 글자로 찍으면 그 글꼴이 이미지
 * 생성 쪽에도 실려 있어야 하는데 그럴 이유가 없습니다.
 *
 * 한글은 `next/og`가 들고 있는 글꼴로 그려집니다. 처음엔 두부(□)로 나올 줄 알고
 * 영문으로 썼는데, 실제로 찍어 보니 멀쩡히 나왔습니다 -- 웹폰트를 받아 오는 코드를
 * 넣지 않은 이유입니다. 이미지 하나 때문에 생성 시점에 외부 요청을 걸면 그쪽이
 * 실패할 때 카드가 통째로 깨집니다.
 *
 * 배포 후에는 운영 주소의 이 경로를 한 번 열어 확인하세요. 로컬에서 되는 것과
 * 배포 환경에서 되는 것이 같다는 보장은 글꼴 쪽에서 특히 약합니다.
 */

export const alt = "DATE · 투자 판단 전 확인 흐름을 돕는 시장 정보 보드";
export const size = { height: 630, width: 1200 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "flex-start",
          background: "#0b0b0c",
          display: "flex",
          flexDirection: "column",
          height: "100%",
          justifyContent: "center",
          padding: "0 96px",
          width: "100%"
        }}
      >
        <svg fill="none" height="132" viewBox="0 0 55 28" width="259" xmlns="http://www.w3.org/2000/svg">
          <path d="M32.61 27.3V3.9H28.13V0H41.39V3.9H36.9V27.3H32.61Z" fill="#ffffff" />
          <path d="M14.26 27.3L18.7 0H24.51L28.96 27.3H24.67L21.45 6.3L18.23 27.3H14.25H14.26Z" fill="#ffffff" />
          <path d="M0 0H6.55C10.84 0 12.95 2.38 12.95 6.75V20.56C12.95 24.93 10.84 27.31 6.55 27.31H0V0ZM4.29 23.4H6.47C7.84 23.4 8.65 22.7 8.65 20.75V6.55C8.65 4.6 7.83 3.9 6.47 3.9H4.29V23.4Z" fill="#ffffff" />
          <path d="M47.17 3.9H54.58V0H42.88V27.3H54.58V23.4H47.17V15.02H53.05V11.11H47.17V3.9Z" fill="#ffffff" />
        </svg>
        <div style={{ color: "#ffffff", fontSize: 58, fontWeight: 700, marginTop: 48 }}>
          투자 판단 전 확인 흐름
        </div>
        <div style={{ color: "#9aa3ad", fontSize: 30, marginTop: 20 }}>
          시황 · 뉴스 · 일정 · 속보와 공시 · 수급과 차트 · 매매참고
        </div>
        <div
          style={{
            background: "#da0000",
            display: "flex",
            height: 8,
            marginTop: 56,
            width: 176
          }}
        />
      </div>
    ),
    size
  );
}
