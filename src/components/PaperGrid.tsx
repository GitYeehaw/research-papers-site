import { Paper } from "@/types";
import PaperCard from "./PaperCard";

interface PaperGridProps {
  papers: Paper[];
  emptyMessage?: string;
}

export default function PaperGrid({ papers, emptyMessage = "No papers found." }: PaperGridProps) {
  if (papers.length === 0) {
    return (
      <div
        className="text-center py-20"
        style={{ color: "var(--text-muted)" }}
      >
        <p
          className="text-lg mb-2"
          style={{
            fontFamily: "var(--font-heading)",
            fontStyle: "italic",
          }}
        >
          {emptyMessage}
        </p>
        <p className="text-sm" style={{ opacity: 0.6 }}>
          Papers will appear here after the next collection runs.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      {papers.map((paper) => (
        <PaperCard key={paper.id} paper={paper} />
      ))}
    </div>
  );
}
