import { CategoryData } from "@/types";
import PaperGrid from "./PaperGrid";

interface ResearchPageProps {
  data: CategoryData;
}

export default function ResearchPage({ data }: ResearchPageProps) {
  const formattedDate = data.scraped_at
    ? new Date(data.scraped_at).toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
      })
    : "Not yet scraped";

  return (
    <div>
      <div className="mb-8">
        <h1 className="section-title">{data.name}</h1>
        <p className="section-desc">{data.description}</p>
        <div
          className="flex items-center gap-4 text-sm"
          style={{ color: "var(--text-muted)" }}
        >
          <span>{data.paper_count} papers</span>
          <span>&middot;</span>
          <span>Updated: {formattedDate}</span>
        </div>
      </div>

      <PaperGrid
        papers={data.papers}
        emptyMessage={`No ${data.name.toLowerCase()} papers found yet.`}
      />
    </div>
  );
}
