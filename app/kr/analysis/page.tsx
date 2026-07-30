import { AnalysisExperience } from "./AnalysisExperience";
import { getAnalysisMock } from "./analysis-mock-data";

type KoreanAnalysisPageProps = {
  searchParams: Promise<{
    id?: string | string[];
  }>;
};

export default async function KoreanAnalysisPage({ searchParams }: KoreanAnalysisPageProps) {
  const { id } = await searchParams;
  const analysis = getAnalysisMock(id);
  const isUnknown = analysis.id !== "samsung-semiconductor-001" && analysis.id !== "hynix-hbm-001";

  return <AnalysisExperience analysis={analysis} isUnknown={isUnknown} />;
}
