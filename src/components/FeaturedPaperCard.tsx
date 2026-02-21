"use client";

import { Paper } from "@/types";

interface FeaturedPaperCardProps {
  paper: Paper;
  categoryLabel: string;
  categoryColor: string;
}

export default function FeaturedPaperCard({
  paper,
  categoryLabel,
  categoryColor,
}: FeaturedPaperCardProps) {
  const date = new Date(paper.published).toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });

  return (
    <article className="card" style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      {/* Category dot + label */}
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <span
          style={{
            width: "7px",
            height: "7px",
            borderRadius: "50%",
            backgroundColor: categoryColor,
            flexShrink: 0,
          }}
        />
        <span
          style={{
            color: categoryColor,
            fontFamily: "var(--font-mono)",
            fontSize: "0.6rem",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            fontWeight: 500,
          }}
        >
          {categoryLabel}
        </span>
      </div>

      {/* Title */}
      <h3
        style={{
          fontFamily: "var(--font-heading)",
          color: "var(--text-primary)",
          fontSize: "1rem",
          lineHeight: 1.45,
          fontWeight: 400,
          flex: 1,
        }}
      >
        <a
          href={paper.url}
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "inherit", transition: "color 0.2s" }}
          onMouseOver={(e) => (e.currentTarget.style.color = "var(--accent-light)")}
          onMouseOut={(e) => (e.currentTarget.style.color = "inherit")}
        >
          {paper.title}
        </a>
      </h3>

      {/* Authors */}
      <p
        style={{
          color: "var(--text-secondary)",
          fontSize: "0.75rem",
          fontFamily: "var(--font-body)",
          lineHeight: 1.4,
        }}
      >
        {paper.authors.slice(0, 3).join(", ")}
        {paper.authors.length > 3 && ` + ${paper.authors.length - 3} more`}
      </p>

      {/* Date */}
      <p
        style={{
          color: "var(--accent)",
          fontFamily: "var(--font-mono)",
          fontSize: "0.62rem",
          letterSpacing: "0.08em",
        }}
      >
        {date}
      </p>

      {/* Links */}
      <div
        style={{
          borderTop: "1px solid var(--border)",
          paddingTop: "12px",
          display: "flex",
          gap: "8px",
        }}
      >
        <a
          href={paper.url}
          target="_blank"
          rel="noopener noreferrer"
          className="category-badge"
        >
          arXiv
        </a>
        {paper.pdf_url && (
          <a
            href={paper.pdf_url}
            target="_blank"
            rel="noopener noreferrer"
            className="category-badge"
          >
            PDF
          </a>
        )}
      </div>
    </article>
  );
}
