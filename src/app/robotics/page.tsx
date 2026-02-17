import { getCategoryData } from "@/lib/data";
import ResearchPage from "@/components/ResearchPage";

export const metadata = {
  title: "Robotics Research — Research Papers",
  description: "Latest robotics research papers from arXiv.",
};

export default function RoboticsPage() {
  const data = getCategoryData("robotics");
  return <ResearchPage data={data} />;
}
