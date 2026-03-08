import { getAllCategoryData } from "@/lib/data";
import { Paper } from "@/types";
import Link from "next/link";
import FeaturedPaperCard from "@/components/FeaturedPaperCard";
import CategoryNav from "@/components/CategoryNav";
import ScrollFadeIn from "@/components/ScrollFadeIn";

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
    : "\u2014";

  const featuredPapers = categories
    .map((cat) => {
      const paper = allData[cat]?.papers?.[0];
      return paper ? { ...paper, cat } : null;
    })
    .filter(Boolean) as (Paper & { cat: string })[];

  const categoryNavItems = categories.map((cat) => ({
    cat,
    label: CATEGORY_META[cat]?.label ?? cat,
    color: CATEGORY_META[cat]?.color ?? "#888888",
    href: `/research-papers-site/${cat}`,
    paperCount: allData[cat]?.paper_count ?? 0,
  }));

  return (
    <div style={{ paddingTop: "24px" }}>
      {/* Hero */}
      <ScrollFadeIn>
        <div className="mb-16 lg:mb-24">
          <p
            style={{
              fontSize: "0.7rem",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "#c084fc",
              fontWeight: 500,
              marginBottom: "32px",
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <span
              style={{
                display: "inline-block",
                width: "48px",
                height: "1px",
                background: "linear-gradient(90deg, var(--blue), #c084fc)",
              }}
            />
            Research Paper Aggregator
          </p>

          <h1 style={{ marginBottom: "40px", lineHeight: 1.0 }}>
            <span
              style={{
                display: "block",
                fontFamily: "var(--font-heading)",
                fontSize: "clamp(3.5rem, 8vw, 7rem)",
                color: "var(--cultured)",
                fontWeight: 400,
                letterSpacing: "-0.03em",
              }}
            >
              Daily
            </span>
            <em
              style={{
                display: "block",
                fontFamily: "var(--font-heading)",
                fontSize: "clamp(3.5rem, 8vw, 7rem)",
                fontWeight: 400,
                letterSpacing: "-0.03em",
                background: "linear-gradient(135deg, #4d9aff, var(--purple), #ff8533)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Academic
            </em>
            <span
              style={{
                display: "block",
                fontFamily: "var(--font-heading)",
                fontSize: "clamp(3.5rem, 8vw, 7rem)",
                color: "var(--cultured)",
                fontWeight: 400,
                letterSpacing: "-0.03em",
              }}
            >
              Pulse
            </span>
          </h1>

<div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
            <Link href="/cs" className="btn-primary">
              Browse Papers
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
            <Link href="/projects" className="btn-secondary">
              View Projects
            </Link>
          </div>
        </div>
      </ScrollFadeIn>

      {/* Stats strip */}
      <ScrollFadeIn delay={100}>
        <div className="flex flex-col sm:flex-row mb-24">
          {[
            { value: totalPapers.toLocaleString(), label: "Papers Indexed" },
            { value: String(categories.length), label: "Research Fields" },
            { value: scrapeDate, label: "Last Scraped", italic: true },
            { value: "\u221E", label: "Curiosity" },
          ].map((stat, i) => (
            <div
              key={stat.label}
              className="flex-1 py-12 group"
              style={{
                borderTop: "1px solid var(--border)",
                paddingLeft: i > 0 ? "48px" : undefined,
                position: "relative",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: "3.5rem",
                  fontWeight: 400,
                  color: "var(--platinum)",
                  lineHeight: 1,
                  marginBottom: "8px",
                  letterSpacing: "-0.03em",
                  fontStyle: stat.italic ? "italic" : undefined,
                  transition: "color 0.3s",
                }}
              >
                {stat.italic ? (
                  <em
                    style={{
                      background: "linear-gradient(135deg, #4d9aff, var(--purple), #ff8533)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    {stat.value}
                  </em>
                ) : (
                  stat.value
                )}
              </div>
              <div
                style={{
                  fontSize: "0.7rem",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "var(--text-muted)",
                  fontWeight: 500,
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </ScrollFadeIn>

      {/* Browse by Field */}
      <ScrollFadeIn delay={150}>
        <div className="mb-24">
          <div className="flex justify-between items-end mb-12">
            <h2
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "3rem",
                fontWeight: 400,
                color: "var(--cultured)",
                letterSpacing: "-0.03em",
                lineHeight: 1.1,
              }}
            >
              Browse by{" "}
              <em
                style={{
                  background: "linear-gradient(135deg, #4d9aff, var(--purple), #ff8533)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Field
              </em>
            </h2>
            <p
              style={{
                color: "var(--text-muted)",
                fontSize: "0.85rem",
                maxWidth: "400px",
                textAlign: "right",
                lineHeight: 1.6,
              }}
              className="hidden sm:block"
            >
              Five research categories updated daily from arXiv
            </p>
          </div>
          <CategoryNav items={categoryNavItems} />
        </div>
      </ScrollFadeIn>

      {/* Latest section */}
      <ScrollFadeIn delay={200}>
        <div>
          <div className="flex justify-between items-end mb-12">
            <h2
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "3rem",
                fontWeight: 400,
                color: "var(--cultured)",
                letterSpacing: "-0.03em",
                lineHeight: 1.1,
              }}
            >
              Latest Across
              <br />
              <em
                style={{
                  background: "linear-gradient(135deg, #4d9aff, var(--purple), #ff8533)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                All Fields
              </em>
            </h2>
            <p
              style={{
                color: "var(--text-muted)",
                fontSize: "0.85rem",
                maxWidth: "400px",
                textAlign: "right",
                lineHeight: 1.6,
              }}
              className="hidden sm:block"
            >
              Most recently published papers from every category
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {featuredPapers.map((paper) => {
              const isNew =
                Date.now() - new Date(paper.published).getTime() <
                24 * 60 * 60 * 1000;
              return (
                <FeaturedPaperCard
                  key={paper.id}
                  paper={paper}
                  categoryLabel={CATEGORY_META[paper.cat]?.label ?? paper.cat}
                  categoryColor={CATEGORY_META[paper.cat]?.color ?? "#888888"}
                  categoryKey={paper.cat}
                  isNew={isNew}
                />
              );
            })}
          </div>
        </div>
      </ScrollFadeIn>
    </div>
  );
}
