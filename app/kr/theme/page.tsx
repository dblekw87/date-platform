import { PlaceholderPage } from "../_components/PlaceholderPage";

export default function KoreanThemePage() {
  return (
    <PlaceholderPage
      eyebrow="테마"
      title="주목받는 테마"
      description="테마를 추천 목록이 아니라 시장 변화, 관련 종목, 공식 근거로 이어지는 탐색 경로로 보여줍니다."
      primaryHref="/kr/market"
      primaryLabel="시장으로 돌아가기"
      sections={["테마 목록", "연결된 시장 변화", "관련 종목", "확인된 투자 근거", "아직 확인되지 않은 내용"]}
    />
  );
}
