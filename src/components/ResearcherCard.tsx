"use client";

import { Researcher } from "@/types";

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
  return (
    <div className="card" style={{ display: "flex", flexDirection: "column", gap: "12px", minWidth: 0 }}>
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
        <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "8px", width: "100%", minWidth: 0 }}>
          {researcher.papers.slice(0, 3).map((paper) => (
            <li key={paper.id} style={{ minWidth: 0 }}>
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
                  width: "100%",
                  wordBreak: "break-word",
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
