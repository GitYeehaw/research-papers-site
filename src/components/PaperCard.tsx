"use client";

import { Paper } from "@/types";
import { useState } from "react";

function formatDate(dateStr: string): string {
  try {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return dateStr;
  }
}

export default function PaperCard({ paper }: { paper: Paper }) {
  const [expanded, setExpanded] = useState(false);
  const isLong = paper.abstract.length > 280;

  return (
    <article className="card">
      {/* Title */}
      <h3
        className="text-lg mb-2 leading-snug"
        style={{ fontFamily: "var(--font-heading)", fontWeight: 500 }}
      >
        <a
          href={paper.url}
          target="_blank"
          rel="noopener noreferrer"
          className="transition-colors duration-200"
          style={{ color: "var(--accent-light)" }}
          onMouseOver={(e) => (e.currentTarget.style.color = "var(--accent)")}
          onMouseOut={(e) => (e.currentTarget.style.color = "var(--accent-light)")}
        >
          {paper.title}
        </a>
      </h3>

      {/* Authors */}
      <p
        className="text-sm mb-3"
        style={{ color: "var(--text-muted)", fontStyle: "italic" }}
      >
        {paper.authors.slice(0, 5).join(", ")}
        {paper.authors.length > 5 && (
          <span style={{ color: "var(--accent-dim)" }}>
            {" "}et al. ({paper.authors.length} authors)
          </span>
        )}
      </p>

      {/* Abstract with smooth expand */}
      <div
        style={{
          maxHeight: expanded ? "1000px" : "5.5em",
          overflow: "hidden",
          width: "100%",
          transition: "max-height 0.4s ease",
        }}
      >
        <p
          className="text-sm leading-relaxed"
          style={{ color: "var(--text-secondary)" }}
        >
          {paper.abstract}
        </p>
      </div>
      {isLong && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-1 mb-5 transition-colors duration-200"
          style={{
            color: "var(--accent-dim)",
            fontStyle: "italic",
            fontSize: "0.8rem",
          }}
          onMouseOver={(e) => (e.currentTarget.style.color = "var(--accent)")}
          onMouseOut={(e) => (e.currentTarget.style.color = "var(--accent-dim)")}
        >
          {expanded ? "[collapse]" : "[continue reading]"}
        </button>
      )}
      {!isLong && <div className="mb-5" />}

      {/* Footer: date, categories, links */}
      <div
        className="flex flex-wrap items-center gap-3 pt-3"
        style={{ borderTop: "1px solid var(--border)" }}
      >
        <time
          className="text-xs"
          style={{
            color: "var(--text-muted)",
            fontFamily: "var(--font-mono)",
            fontSize: "0.65rem",
          }}
        >
          {formatDate(paper.published)}
        </time>

        {paper.primary_category && (
          <span className="category-badge">{paper.primary_category}</span>
        )}

        <div className="ml-auto flex gap-3">
          <a
            href={paper.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs transition-colors duration-200"
            style={{
              color: "var(--text-muted)",
              fontFamily: "var(--font-mono)",
              fontSize: "0.65rem",
              letterSpacing: "0.05em",
              textTransform: "uppercase",
            }}
            onMouseOver={(e) => (e.currentTarget.style.color = "var(--accent)")}
            onMouseOut={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
          >
            Abstract
          </a>
          {paper.pdf_url && (
            <a
              href={paper.pdf_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs transition-colors duration-200"
              style={{
                color: "var(--text-muted)",
                fontFamily: "var(--font-mono)",
                fontSize: "0.65rem",
                letterSpacing: "0.05em",
                textTransform: "uppercase",
              }}
              onMouseOver={(e) => (e.currentTarget.style.color = "var(--accent)")}
              onMouseOut={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
            >
              PDF
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
