import { getCategoryData } from "@/lib/data";
import ResearchPage from "@/components/ResearchPage";

export const metadata = {
  title: "Electrochem Research — Research Papers",
  description: "Latest electrochemistry research papers from arXiv.",
};

export default function ElectrochemPage() {
  const data = getCategoryData("electrochem");
  return <ResearchPage data={data} />;
}
