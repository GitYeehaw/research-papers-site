"use client";

import { Paper } from "@/types";
import { useState } from "react";

function formatDate(dateStr: string): string {
  try {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return dateStr;
  }
}

function truncateAbstract(text: string, maxLen: number = 250): string {
  if (text.length <= maxLen) return text;
  return text.slice(0, maxLen).trimEnd() + "...";
}

export default function PaperCard({ paper }: { paper: Paper }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <article className="card group">
      {/* Title */}
      <h3 className="text-lg font-semibold mb-2 leading-snug">
        <a
          href={paper.url}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline"
          style={{ color: "var(--accent)" }}
        >
          {paper.title}
        </a>
      </h3>

      {/* Authors */}
      <p className="text-sm mb-3" style={{ color: "var(--text-muted)" }}>
        {paper.authors.slice(0, 5).join(", ")}
        {paper.authors.length > 5 && ` +${paper.authors.length - 5} more`}
      </p>

      {/* Abstract */}
      <p className="text-sm mb-4 leading-relaxed" style={{ color: "var(--text-secondary)" }}>
        {expanded ? paper.abstract : truncateAbstract(paper.abstract)}
        {paper.abstract.length > 250 && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="ml-1 font-medium hover:underline"
            style={{ color: "var(--accent)" }}
          >
            {expanded ? "Show less" : "Read more"}
          </button>
        )}
      </p>

      {/* Footer: date, categories, links */}
      <div className="flex flex-wrap items-center gap-3 text-xs">
        <time style={{ color: "var(--text-muted)" }}>{formatDate(paper.published)}</time>

        {paper.primary_category && (
          <span className="category-badge">{paper.primary_category}</span>
        )}

        <div className="ml-auto flex gap-2">
          <a
            href={paper.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 px-3 py-1 rounded-md text-xs font-medium transition-colors"
            style={{
              color: "var(--accent)",
              backgroundColor: "var(--bg-secondary)",
            }}
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            arXiv
          </a>
          {paper.pdf_url && (
            <a
              href={paper.pdf_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-3 py-1 rounded-md text-xs font-medium transition-colors"
              style={{
                color: "var(--accent)",
                backgroundColor: "var(--bg-secondary)",
              }}
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              PDF
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
