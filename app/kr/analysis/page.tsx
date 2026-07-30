import { PlaceholderPage } from "../_components/PlaceholderPage";

export default function KoreanAnalysisPage() {
  return (
    <PlaceholderPage
      eyebrow="분석"
      title="분석 중인 내용"
      description="투자 근거를 비교하고, 가설과 확인할 질문을 정리하는 한국형 분석 공간입니다."
      primaryHref="/kr/changes"
      primaryLabel="새로운 변화 보기"
      sections={["분석 대상", "비교 중인 투자 근거", "종목 비교", "확인할 질문", "다음 검토 항목"]}
    />
  );
}
