import { CategoryData } from "@/types";
import PaperCard from "./PaperCard";
import Link from "next/link";

const CATEGORY_ICONS: Record<string, string> = {
  cs: "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
  biology: "M20.618 5.984A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
  electrochem: "M13 10V3L4 14h7v7l9-11h-7z",
  physics: "M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
};

interface CategorySectionProps {
  data: CategoryData;
  maxPapers?: number;
  showViewAll?: boolean;
}

export default function CategorySection({
  data,
  maxPapers = 3,
  showViewAll = true,
}: CategorySectionProps) {
  const papers = data.papers.slice(0, maxPapers);
  const iconPath = CATEGORY_ICONS[data.category] || CATEGORY_ICONS.physics;

  return (
    <section className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: "var(--bg-secondary)" }}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="var(--accent)"
              strokeWidth={1.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d={iconPath} />
            </svg>
          </div>
          <div>
            <h2 className="text-xl font-bold" style={{ color: "var(--text-primary)" }}>
              {data.name}
            </h2>
            <p className="text-xs" style={{ color: "var(--text-muted)" }}>
              {data.paper_count} papers
            </p>
          </div>
        </div>

        {showViewAll && (
          <Link
            href={`/${data.category}`}
            className="text-sm font-medium hover:underline"
            style={{ color: "var(--accent)" }}
          >
            View all &rarr;
          </Link>
        )}
      </div>

      {papers.length > 0 ? (
        <div className="grid gap-4">
          {papers.map((paper) => (
            <PaperCard key={paper.id} paper={paper} />
          ))}
        </div>
      ) : (
        <div
          className="text-center py-8 rounded-xl border"
          style={{
            backgroundColor: "var(--bg-secondary)",
            borderColor: "var(--border)",
            color: "var(--text-muted)",
          }}
        >
          <p>No papers yet. Check back after the next scrape.</p>
        </div>
      )}
    </section>
  );
}
