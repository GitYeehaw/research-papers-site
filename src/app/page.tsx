import { getAllCategoryData } from "@/lib/data";
import CategorySection from "@/components/CategorySection";

export default function HomePage() {
  const allData = getAllCategoryData();
  const categories = ["cs", "physics", "biology", "electrochem"];

  const latestScrape = categories
    .map((c) => allData[c]?.scraped_at)
    .filter(Boolean)
    .sort()
    .pop();

  const formattedDate = latestScrape
    ? new Date(latestScrape).toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "Awaiting first collection";

  return (
    <div>
      {/* Hero section */}
      <div className="mb-16 pt-6">
        <h1
          className="text-5xl mb-4"
          style={{
            fontFamily: "var(--font-heading)",
            color: "var(--text-primary)",
            fontWeight: 600,
            lineHeight: 1.2,
          }}
        >
          Research Papers
        </h1>
        <p
          className="text-xl mb-6"
          style={{
            color: "var(--text-secondary)",
            fontStyle: "italic",
            fontWeight: 300,
            maxWidth: "36rem",
          }}
        >
          A daily collection of scholarly works from the arXiv, spanning the
          sciences and computation.
        </p>
        <p
          className="text-xs tracking-wider uppercase"
          style={{
            color: "var(--text-muted)",
            fontFamily: "var(--font-mono)",
            letterSpacing: "0.12em",
          }}
        >
          Last collected: {formattedDate}
        </p>

        {/* Decorative flourish */}
        <div className="flourish mt-8">&mdash;&nbsp;&bull;&nbsp;&mdash;</div>
      </div>

      {/* Category previews — 3 papers each */}
      {categories.map((cat) => (
        <CategorySection
          key={cat}
          data={allData[cat]}
          maxPapers={3}
          showViewAll={true}
        />
      ))}
    </div>
  );
}
