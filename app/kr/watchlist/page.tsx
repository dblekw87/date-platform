import { PlaceholderPage } from "../_components/PlaceholderPage";

export default function KoreanWatchlistPage() {
  return (
    <PlaceholderPage
      eyebrow="관심 종목"
      title="관심 있게 보는 종목"
      description="관심 종목을 저장하는 목록이 아니라, 새롭게 감지된 변화와 공식 근거를 이어 보는 진입점입니다."
      primaryHref="/kr/changes"
      primaryLabel="관심 변화 보기"
      sections={["관심 종목 목록", "새롭게 감지된 변화", "관련 투자 근거", "다시 확인할 내용"]}
    />
  );
}
