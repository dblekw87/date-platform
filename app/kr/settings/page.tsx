import { PlaceholderPage } from "../_components/PlaceholderPage";

export default function KoreanSettingsPage() {
  return (
    <PlaceholderPage
      eyebrow="설정"
      title="내 정보와 화면 설정"
      description="인증이나 실제 설정 저장 없이, 향후 사용자 상태를 담을 수 있는 Placeholder 화면입니다."
      primaryHref="/kr"
      primaryLabel="홈으로 돌아가기"
      sections={["내 정보", "관심 설정", "알림 설정", "화면 설정", "준비 중인 기능"]}
    />
  );
}
