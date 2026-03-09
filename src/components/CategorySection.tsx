import { CategoryData } from "@/types";
import PaperCard from "./PaperCard";
import Link from "next/link";

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

  return (
    <section className="mb-16">
      {/* Section header with decorative line */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2
            className="text-2xl mb-1"
            style={{
              fontFamily: "var(--font-heading)",
              color: "var(--text-primary)",
              fontWeight: 500,
            }}
          >
            {data.name}
          </h2>
          <p
            className="text-xs tracking-wider uppercase"
            style={{
              color: "var(--text-muted)",
              fontFamily: "var(--font-mono)",
              letterSpacing: "0.1em",
            }}
          >
            {data.paper_count} papers collected
          </p>
        </div>

        {showViewAll && (
          <Link
            href={`/${data.category}`}
            className="text-sm view-all-link"
          >
            View all &rarr;
          </Link>
        )}
      </div>

      {/* Decorative divider */}
      <div
        className="mb-6"
        style={{
          height: "1px",
          background: "linear-gradient(to right, var(--accent-dim), var(--border), transparent)",
        }}
      />

      {papers.length > 0 ? (
        <div className="grid gap-4">
          {papers.map((paper) => (
            <PaperCard key={paper.id} paper={paper} />
          ))}
        </div>
      ) : (
        <div
          className="text-center py-10"
          style={{ color: "var(--text-muted)", fontStyle: "italic" }}
        >
          <p>No papers yet. The next collection will appear here.</p>
        </div>
      )}
    </section>
  );
}
