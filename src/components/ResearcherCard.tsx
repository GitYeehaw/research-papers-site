import { Researcher } from "@/types";
import { cleanLatex } from "@/lib/cleanLatex";

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

export default function ResearcherCard({ researcher }: { researcher: Researcher }) {
  const hasNewPaper = researcher.papers.some(
    (p) => Date.now() - new Date(p.published).getTime() < 24 * 60 * 60 * 1000
  );

  return (
    <div id={`researcher-${researcher.id}`} className="card" style={{ display: "flex", flexDirection: "column", gap: "12px", minWidth: 0, scrollMarginTop: "80px" }}>
      {/* Name + website + New tag */}
      <div>
        <h3
          style={{
            fontFamily: "var(--font-heading)",
            fontSize: "1.15rem",
            fontWeight: 400,
            marginBottom: "4px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          {researcher.website ? (
            <a
              href={researcher.website}
              target="_blank"
              rel="noopener noreferrer"
              className="researcher-name-link"
            >
              {researcher.name}
            </a>
          ) : (
            <span style={{ color: "var(--text-primary)" }}>{researcher.name}</span>
          )}
          {hasNewPaper && <span className="tag-new">New</span>}
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
        <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "8px", width: "100%", minWidth: 0 }}>
          {researcher.papers.slice(0, 3).map((paper) => (
            <li key={paper.id} style={{ minWidth: 0 }}>
              <a
                href={paper.url}
                target="_blank"
                rel="noopener noreferrer"
                className="paper-title-link"
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.8rem",
                  lineHeight: 1.4,
                  display: "block",
                  width: "100%",
                  wordBreak: "break-word",
                }}
              >
                <span dangerouslySetInnerHTML={{ __html: cleanLatex(paper.title) }} />
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

      {/* Paper count */}
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
