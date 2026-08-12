import Link from "next/link";
import styles from "../terms/page.module.scss";

export default function PrivacyPage() {
  return (
    <main className={styles.page}>
      <Link href="/">DATE</Link>
      <h1>개인정보처리방침 초안</h1>
      <p>소셜 로그인과 이미지 업로드를 실제 운영하기 전 법률 검토와 사업자 정보 보강이 필요합니다.</p>
      <section>
        <h2>수집 예정 항목</h2>
        <p>소셜 로그인 식별자, 이메일, 닉네임, 프로필 이미지, 게시글·댓글·첨부 이미지, 서비스 이용 기록을 수집할 수 있습니다.</p>
      </section>
      <section>
        <h2>이용 목적</h2>
        <p>회원 식별, 커뮤니티 운영, 부정 이용 방지, 게시물 관리, 고객 문의 대응에 사용합니다.</p>
      </section>
      <section>
        <h2>보관 및 삭제</h2>
        <p>회원 탈퇴 시 관련 법령상 보관이 필요한 정보를 제외하고 지체 없이 삭제하는 정책으로 설계합니다.</p>
      </section>
    </main>
  );
}
