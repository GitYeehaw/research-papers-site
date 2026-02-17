import { getCategoryData } from "@/lib/data";
import ResearchPage from "@/components/ResearchPage";

export const metadata = {
  title: "CS Research — Research Papers",
  description: "Latest computer science research papers from arXiv.",
};

export default function CSPage() {
  const data = getCategoryData("cs");
  return <ResearchPage data={data} />;
}
