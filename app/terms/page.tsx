import Link from "next/link";
import styles from "./page.module.scss";

export default function TermsPage() {
  return (
    <main className={styles.page}>
      <Link href="/">DATE</Link>
      <h1>이용약관 초안</h1>
      <p>이 문서는 커뮤니티 출시 전 법률 검토가 필요한 초안입니다.</p>
      <section>
        <h2>서비스 목적</h2>
        <p>DATE는 시장 정보 확인, 매매 복기, 사용자 간 의견 교환을 돕는 정보 커뮤니티입니다. 투자 권유나 매매 지시를 제공하지 않습니다.</p>
      </section>
      <section>
        <h2>회원 책임</h2>
        <p>회원은 본인의 판단과 책임으로 게시물을 작성하며, 허위 정보, 타인 비방, 불법 리딩, 유료 권유성 홍보를 게시할 수 없습니다.</p>
      </section>
      <section>
        <h2>투자 유의</h2>
        <p>게시물과 댓글은 작성자 개인 의견이며 수익을 보장하지 않습니다. 모든 투자 판단은 사용자 본인의 책임입니다.</p>
      </section>
    </main>
  );
}
