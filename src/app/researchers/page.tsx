import { getResearchersData } from "@/lib/data";
import { Researcher } from "@/types";
import ResearcherCard from "@/components/ResearcherCard";
import ScrollFadeIn from "@/components/ScrollFadeIn";

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

  const INSTITUTION_COLORS = [
    "#818cf8", "#f4a261", "#5eead4", "#c084fc", "#4ade80",
    "#f472b6", "#fbbf24", "#38bdf8", "#fb923c", "#a78bfa",
  ];

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
      <ScrollFadeIn>
        <div className="pt-6 mb-10">
          <h1
            className="text-4xl mb-3"
            style={{
              fontFamily: "var(--font-heading)",
              color: "var(--cultured)",
              fontWeight: 400,
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
      </ScrollFadeIn>

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
          {institutions.map((institution, i) => (
            <ScrollFadeIn key={institution} delay={Math.min(i * 60, 300)}>
              <div>
                <h2
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontSize: "1.4rem",
                    color: "var(--cultured)",
                    fontWeight: 400,
                    marginBottom: "1rem",
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  <span
                    style={{
                      width: "8px",
                      height: "8px",
                      borderRadius: "50%",
                      backgroundColor: INSTITUTION_COLORS[i % INSTITUTION_COLORS.length],
                      boxShadow: `0 0 8px ${INSTITUTION_COLORS[i % INSTITUTION_COLORS.length]}60`,
                      flexShrink: 0,
                    }}
                  />
                  {institution}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {byInstitution[institution].map((researcher) => (
                    <ResearcherCard key={researcher.id} researcher={researcher} />
                  ))}
                </div>
              </div>
            </ScrollFadeIn>
          ))}
        </div>
      )}
    </div>
  );
}
