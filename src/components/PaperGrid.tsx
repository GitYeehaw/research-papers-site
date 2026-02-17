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
        className="text-center py-16 rounded-xl border"
        style={{
          backgroundColor: "var(--bg-secondary)",
          borderColor: "var(--border)",
          color: "var(--text-muted)",
        }}
      >
        <svg
          className="w-12 h-12 mx-auto mb-4 opacity-50"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
          />
        </svg>
        <p className="text-lg font-medium">{emptyMessage}</p>
        <p className="text-sm mt-1">Papers will appear here after the next scrape runs.</p>
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
