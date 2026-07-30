import { PlaceholderPage } from "../_components/PlaceholderPage";

export default function KoreanSearchPage() {
  return (
    <PlaceholderPage
      eyebrow="검색"
      title="종목·테마·투자 근거 검색"
      description="검색은 Home의 첫 목적이 아니라, 시장을 이해한 뒤 종목과 근거로 이동하는 보조 진입입니다."
      primaryHref="/kr/market"
      primaryLabel="시장 먼저 보기"
      sections={["검색 입력", "종목 결과", "테마 결과", "투자 근거 결과", "최근 본 내용"]}
    />
  );
}
