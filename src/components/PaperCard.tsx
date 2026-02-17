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

function truncateAbstract(text: string, maxLen: number = 280): string {
  if (text.length <= maxLen) return text;
  return text.slice(0, maxLen).trimEnd() + "\u2026";
}

export default function PaperCard({ paper }: { paper: Paper }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <article className="card group">
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

      {/* Authors — italic, scholarly style */}
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

      {/* Abstract */}
      <p
        className="text-sm mb-5 leading-relaxed"
        style={{ color: "var(--text-secondary)" }}
      >
        {expanded ? paper.abstract : truncateAbstract(paper.abstract)}
        {paper.abstract.length > 280 && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="ml-1 transition-colors duration-200"
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
      </p>

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
