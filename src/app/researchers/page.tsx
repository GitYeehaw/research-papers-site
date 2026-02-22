import { getResearchersData } from "@/lib/data";
import { Researcher } from "@/types";
import ResearcherCard from "@/components/ResearcherCard";

export const metadata = {
  title: "Researchers — Research Papers",
  description: "Tracked principal investigators and their latest work.",
};

export default function ResearchersPage() {
  const data = getResearchersData();

  // Group by institution
  const byInstitution = data.researchers.reduce<Record<string, Researcher[]>>(
    (acc, r) => {
      const key = r.institution || "Other";
      if (!acc[key]) acc[key] = [];
      acc[key].push(r);
      return acc;
    },
    {}
  );

  const institutions = Object.keys(byInstitution).sort();

  const scrapeDate = data.scraped_at
    ? new Date(data.scraped_at).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
        timeZone: "America/Los_Angeles",
      })
    : null;

  return (
    <div>
      <div className="pt-6 mb-10">
        <h1
          className="text-4xl mb-3"
          style={{
            fontFamily: "var(--font-heading)",
            color: "var(--text-primary)",
            fontWeight: 600,
          }}
        >
          Researchers
        </h1>
        <p className="section-desc">
          Tracked principal investigators and their latest work.
        </p>
        <div
          className="flex items-center gap-4 text-xs tracking-wider uppercase"
          style={{
            color: "var(--text-muted)",
            fontFamily: "var(--font-mono)",
            letterSpacing: "0.1em",
          }}
        >
          <span>{data.researcher_count} researchers</span>
          {scrapeDate && (
            <>
              <span style={{ color: "var(--border-hover)" }}>&bull;</span>
              <span>Updated: {scrapeDate}</span>
            </>
          )}
        </div>
        <div className="divider" />
      </div>

      {data.researchers.length === 0 ? (
        <div className="text-center py-20" style={{ color: "var(--text-muted)" }}>
          <p
            className="text-lg mb-2"
            style={{ fontFamily: "var(--font-heading)", fontStyle: "italic" }}
          >
            Awaiting first scrape.
          </p>
          <p className="text-sm" style={{ opacity: 0.6 }}>
            Researcher papers will appear after the next collection runs.
          </p>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "3rem" }}>
          {institutions.map((institution) => (
            <div key={institution}>
              <h2
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: "1.4rem",
                  color: "var(--text-primary)",
                  fontWeight: 400,
                  marginBottom: "1rem",
                }}
              >
                {institution}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {byInstitution[institution].map((researcher) => (
                  <ResearcherCard key={researcher.id} researcher={researcher} />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
