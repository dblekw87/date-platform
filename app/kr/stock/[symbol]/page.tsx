import { PlaceholderPage } from "../../_components/PlaceholderPage";

type KoreanStockPageProps = {
  params: Promise<{
    symbol: string;
  }>;
};

export default async function KoreanStockPage({ params }: KoreanStockPageProps) {
  const { symbol } = await params;

  return (
    <PlaceholderPage
      eyebrow="종목·기업 정보"
      title={`${symbol} 종목 정보`}
      description="종목명, 종목 코드, 시장, 가격 예시, 움직인 이유, 투자 근거를 연결하는 한국형 종목 상세 골격입니다."
      primaryHref="/kr/evidence"
      primaryLabel="관련 투자 근거 보기"
      sections={["종목 한눈에 보기", "오늘 움직인 이유", "핵심 투자 근거", "아직 확인할 내용", "주요 변화", "분석에 추가하기"]}
    />
  );
}
