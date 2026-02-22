import { getAllCategoryData } from "@/lib/data";
import { Paper } from "@/types";
import Link from "next/link";
import FeaturedPaperCard from "@/components/FeaturedPaperCard";

const CATEGORY_META: Record<string, { label: string; color: string }> = {
  robotics: { label: "Robotics", color: "#f4a261" },
  physics: { label: "Physics", color: "#5eead4" },
  cs: { label: "Computer Science", color: "#818cf8" },
  biology: { label: "Biology", color: "#4ade80" },
  electrochem: { label: "Electrochemistry", color: "#c084fc" },
};

export default function HomePage() {
  const allData = getAllCategoryData();
  const categories = ["robotics", "physics", "cs", "biology", "electrochem"];

  const totalPapers = categories.reduce(
    (sum, c) => sum + (allData[c]?.paper_count ?? 0),
    0
  );

  const latestScrape = categories
    .map((c) => allData[c]?.scraped_at)
    .filter(Boolean)
    .sort()
    .pop();

  const scrapeDate = latestScrape
    ? new Date(latestScrape).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      })
    : "—";

  const featuredPapers = categories
    .map((cat) => {
      const paper = allData[cat]?.papers?.[0];
      return paper ? { ...paper, cat } : null;
    })
    .filter(Boolean) as (Paper & { cat: string })[];

  return (
    <div>
      {/* Hero */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-16 lg:mb-24 pt-8 items-start">
        {/* Left: title + description + CTA */}
        <div>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.65rem",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "var(--text-muted)",
              marginBottom: "1.5rem",
              fontWeight: 600,
            }}
          >
            Research Paper Aggregator
          </p>

          <h1 style={{ marginBottom: "1.5rem", lineHeight: 0.95 }}>
            <span
              style={{
                display: "block",
                fontFamily: "var(--font-heading)",
                fontSize: "clamp(3.5rem, 7vw, 5.5rem)",
                color: "var(--text-primary)",
                fontWeight: 400,
              }}
            >
              Curated
            </span>
            <span
              style={{
                display: "block",
                fontFamily: "var(--font-heading)",
                fontStyle: "italic",
                fontSize: "clamp(3.5rem, 7vw, 5.5rem)",
                color: "var(--accent)",
                fontWeight: 400,
              }}
            >
              Research
            </span>
            <span
              style={{
                display: "block",
                fontFamily: "var(--font-heading)",
                fontSize: "clamp(3.5rem, 7vw, 5.5rem)",
                color: "var(--text-primary)",
                fontWeight: 400,
              }}
            >
              Papers
            </span>
          </h1>

          <p
            style={{
              color: "var(--text-secondary)",
              fontSize: "1rem",
              lineHeight: 1.7,
              marginBottom: "2rem",
              maxWidth: "28rem",
              fontFamily: "var(--font-body)",
            }}
          >
            Automatically scraped from arXiv. Updated daily via GitHub Actions.
            Covering Robotics, CS, Physics, Biology, and Electrochemistry.
          </p>

          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <Link href="/cs" className="btn-primary">
              Browse Papers
            </Link>
            <Link href="/projects" className="btn-secondary">
              View Projects
            </Link>
          </div>
        </div>

        {/* Right: stats grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="stat-card">
            <div
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "3rem",
                color: "var(--accent)",
                lineHeight: 1,
                marginBottom: "0.6rem",
              }}
            >
              {totalPapers}
            </div>
            <div
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.62rem",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "var(--text-muted)",
                fontWeight: 600,
              }}
            >
              Papers Indexed
            </div>
          </div>

          <div className="stat-card">
            <div
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "3rem",
                color: "var(--accent)",
                lineHeight: 1,
                marginBottom: "0.6rem",
              }}
            >
              {categories.length}
            </div>
            <div
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.62rem",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "var(--text-muted)",
                fontWeight: 600,
              }}
            >
              Research Fields
            </div>
          </div>

          <div className="stat-card">
            <div
              style={{
                fontFamily: "var(--font-heading)",
                fontStyle: "italic",
                fontSize: "3rem",
                color: "var(--accent)",
                lineHeight: 1,
                marginBottom: "0.6rem",
              }}
            >
              {scrapeDate}
            </div>
            <div
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.62rem",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "var(--text-muted)",
                fontWeight: 600,
              }}
            >
              Last Scraped
            </div>
          </div>

          <div className="stat-card">
            <div
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "3rem",
                color: "var(--accent)",
                lineHeight: 1,
                marginBottom: "0.6rem",
              }}
            >
              ∞
            </div>
            <div
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.62rem",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "var(--text-muted)",
                fontWeight: 600,
              }}
            >
              Curiosity
            </div>
          </div>
        </div>
      </div>

      {/* Latest section */}
      <div>
        <h2
          style={{
            fontFamily: "var(--font-heading)",
            fontSize: "2rem",
            color: "var(--text-primary)",
            marginBottom: "0.4rem",
            fontWeight: 400,
          }}
        >
          Latest Across All Fields
        </h2>
        <p
          style={{
            color: "var(--text-secondary)",
            fontSize: "0.9rem",
            fontFamily: "var(--font-body)",
          }}
        >
          Most recently published papers from every category
        </p>
        <div className="divider" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {featuredPapers.map((paper) => (
            <FeaturedPaperCard
              key={paper.id}
              paper={paper}
              categoryLabel={CATEGORY_META[paper.cat]?.label ?? paper.cat}
              categoryColor={CATEGORY_META[paper.cat]?.color ?? "#888888"}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
