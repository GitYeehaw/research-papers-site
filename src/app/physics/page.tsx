import { getCategoryData } from "@/lib/data";
import ResearchPage from "@/components/ResearchPage";

export const metadata = {
  title: "Physics Research — Research Papers",
  description: "Latest physics research papers from arXiv.",
};

export default function PhysicsPage() {
  const data = getCategoryData("physics");
  return <ResearchPage data={data} />;
}
