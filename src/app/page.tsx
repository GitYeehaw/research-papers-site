import { getAllCategoryData } from "@/lib/data";
import CategorySection from "@/components/CategorySection";

export default function HomePage() {
  const allData = getAllCategoryData();
  const categories = ["cs", "biology", "electrochem", "physics"];

  // Find the latest scrape time
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
    : "Not yet scraped";

  return (
    <div>
      {/* Hero section */}
      <div className="mb-12">
        <h1 className="section-title text-4xl">Research Papers</h1>
        <p className="section-desc">
          Daily curated papers from arXiv across CS, Biology, Electrochemistry, and Physics.
        </p>
        <p className="text-sm" style={{ color: "var(--text-muted)" }}>
          Last updated: {formattedDate}
        </p>
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
