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
        timeZone: "America/Los_Angeles",
        timeZoneName: "short",
      })
    : "Awaiting first collection";

  return (
    <div>
      <div className="pt-6 mb-10">
        <h1
          className="text-4xl mb-3"
          style={{
            fontFamily: "var(--font-heading)",
            color: "var(--cultured)",
            fontWeight: 400,
          }}
        >
          {data.name}
        </h1>
        <p className="section-desc">{data.description}</p>
        <div
          className="flex items-center gap-4 text-xs tracking-wider uppercase"
          style={{
            color: "var(--text-muted)",
            fontFamily: "var(--font-mono)",
            letterSpacing: "0.1em",
          }}
        >
          <span>{data.paper_count} papers</span>
          <span style={{ color: "var(--border-hover)" }}>&bull;</span>
          <span>Collected: {formattedDate}</span>
        </div>
        <div className="divider" />
      </div>

      <PaperGrid
        papers={data.papers}
        emptyMessage={`No ${data.name.toLowerCase()} papers found yet.`}
      />
    </div>
  );
}
