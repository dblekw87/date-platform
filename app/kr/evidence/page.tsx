import { PlaceholderPage } from "../_components/PlaceholderPage";

export default function KoreanEvidencePage() {
  return (
    <PlaceholderPage
      eyebrow="투자 근거"
      title="공식적으로 확인된 투자 근거"
      description="출처, 공개 시각, 확인된 내용, 아직 단정할 수 없는 내용을 분리해서 보는 화면입니다."
      primaryHref="/kr/analysis"
      primaryLabel="분석에 추가하기"
      sections={["이 근거가 말하는 내용", "어디에서 나온 정보인가", "언제 확인된 정보인가", "확인할 수 있는 내용", "아직 단정할 수 없는 내용"]}
    />
  );
}
