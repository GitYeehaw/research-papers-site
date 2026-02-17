import { getCategoryData } from "@/lib/data";
import ResearchPage from "@/components/ResearchPage";

export const metadata = {
  title: "Biology Research — Research Papers",
  description: "Latest biology research papers from arXiv.",
};

export default function BiologyPage() {
  const data = getCategoryData("biology");
  return <ResearchPage data={data} />;
}
