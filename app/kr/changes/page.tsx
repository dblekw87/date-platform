import { PlaceholderPage } from "../_components/PlaceholderPage";

export default function KoreanChangesPage() {
  return (
    <PlaceholderPage
      eyebrow="변화"
      title="새롭게 감지된 변화"
      description="가격 알림이 아니라 관심 종목, 테마, 투자 근거에서 달라진 내용을 검토하는 화면입니다."
      primaryHref="/kr/analysis"
      primaryLabel="분석에서 검토하기"
      sections={["먼저 확인할 변화", "새로운 공식 정보", "기존 판단과 다른 근거", "정보 재확인 필요", "검토 대기"]}
    />
  );
}
