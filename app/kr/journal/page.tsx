import { PlaceholderPage } from "../_components/PlaceholderPage";

export default function KoreanJournalPage() {
  return (
    <PlaceholderPage
      eyebrow="기록"
      title="투자 판단 기록"
      description="수익률 중심 매매일지가 아니라 당시 본 근거, 세운 가설, 내린 판단을 보존하는 화면입니다."
      primaryHref="/"
      primaryLabel="시장 보드로 돌아가기"
      sections={["판단 기록", "당시 참고한 근거", "세운 가설", "다시 봐야 하는 조건", "이후 달라진 내용"]}
    />
  );
}
