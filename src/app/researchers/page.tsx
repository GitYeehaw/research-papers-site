import { getResearchersData } from "@/lib/data";
import { Researcher } from "@/types";

export const metadata = {
  title: "Researchers — Research Papers",
  description: "Tracked principal investigators and their latest work.",
};

function formatDate(dateStr: string): string {
  try {
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      timeZone: "America/Los_Angeles",
    });
  } catch {
    return dateStr;
  }
}

function ResearcherCard({ researcher }: { researcher: Researcher }) {
  return (
    <div className="card" style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      {/* Name + website */}
      <div>
        <h3
          style={{
            fontFamily: "var(--font-heading)",
            fontSize: "1.15rem",
            fontWeight: 400,
            marginBottom: "4px",
          }}
        >
          {researcher.website ? (
            <a
              href={researcher.website}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "var(--accent-light)", transition: "color 0.2s" }}
              onMouseOver={(e) => (e.currentTarget.style.color = "var(--accent)")}
              onMouseOut={(e) => (e.currentTarget.style.color = "var(--accent-light)")}
            >
              {researcher.name}
            </a>
          ) : (
            <span style={{ color: "var(--text-primary)" }}>{researcher.name}</span>
          )}
        </h3>
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "0.78rem",
            color: "var(--text-muted)",
            fontStyle: "italic",
          }}
        >
          {researcher.field}
        </p>
      </div>

      {/* Latest papers */}
      {researcher.papers.length > 0 ? (
        <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "8px" }}>
          {researcher.papers.slice(0, 3).map((paper) => (
            <li key={paper.id}>
              <a
                href={paper.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.8rem",
                  color: "var(--text-secondary)",
                  lineHeight: 1.4,
                  display: "block",
                  transition: "color 0.15s",
                }}
                onMouseOver={(e) => (e.currentTarget.style.color = "var(--text-primary)")}
                onMouseOut={(e) => (e.currentTarget.style.color = "var(--text-secondary)")}
              >
                {paper.title}
              </a>
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.58rem",
                  color: "var(--text-muted)",
                  letterSpacing: "0.06em",
                }}
              >
                {formatDate(paper.published)}
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <p style={{ fontSize: "0.78rem", color: "var(--text-muted)", fontStyle: "italic" }}>
          No recent papers found.
        </p>
      )}

      {/* Paper count badge */}
      <div
        style={{
          borderTop: "1px solid var(--border)",
          paddingTop: "10px",
          fontFamily: "var(--font-mono)",
          fontSize: "0.58rem",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: "var(--text-muted)",
        }}
      >
        {researcher.paper_count} recent paper{researcher.paper_count !== 1 ? "s" : ""} found
      </div>
    </div>
  );
}

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
