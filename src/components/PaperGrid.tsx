"use client";

import { useState } from "react";
import { Paper } from "@/types";
import PaperCard from "./PaperCard";

interface PaperGridProps {
  papers: Paper[];
  emptyMessage?: string;
}

export default function PaperGrid({ papers, emptyMessage = "No papers found." }: PaperGridProps) {
  const subcategories = [...new Set(papers.map((p) => p.primary_category).filter(Boolean))].sort();
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  if (papers.length === 0) {
    return (
      <div
        className="text-center py-20"
        style={{ color: "var(--text-muted)" }}
      >
        <p
          className="text-lg mb-2"
          style={{
            fontFamily: "var(--font-heading)",
            fontStyle: "italic",
          }}
        >
          {emptyMessage}
        </p>
        <p className="text-sm" style={{ opacity: 0.6 }}>
          Papers will appear here after the next collection runs.
        </p>
      </div>
    );
  }

  const filtered = activeFilter ? papers.filter((p) => p.primary_category === activeFilter) : papers;

  return (
    <div>
      {subcategories.length > 1 && (
        <div
          className="flex flex-wrap gap-2 mb-6"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          <button
            onClick={() => setActiveFilter(null)}
            style={{
              fontSize: "0.6rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              padding: "4px 10px",
              borderRadius: "4px",
              border: "1px solid",
              borderColor: activeFilter === null ? "var(--accent)" : "var(--border-hover)",
              color: activeFilter === null ? "var(--accent)" : "var(--text-muted)",
              background: "transparent",
              cursor: "pointer",
              transition: "all 0.15s ease",
            }}
          >
            All
          </button>
          {subcategories.map((sub) => (
            <button
              key={sub}
              onClick={() => setActiveFilter(sub === activeFilter ? null : sub)}
              style={{
                fontSize: "0.6rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                padding: "4px 10px",
                borderRadius: "4px",
                border: "1px solid",
                borderColor: activeFilter === sub ? "var(--accent)" : "var(--border-hover)",
                color: activeFilter === sub ? "var(--accent)" : "var(--text-muted)",
                background: "transparent",
                cursor: "pointer",
                transition: "all 0.15s ease",
              }}
            >
              {sub}
            </button>
          ))}
        </div>
      )}
      <div className="grid gap-4">
        {filtered.map((paper) => (
          <PaperCard key={paper.id} paper={paper} />
        ))}
      </div>
      {filtered.length === 0 && (
        <p className="text-center py-8 text-sm" style={{ color: "var(--text-muted)" }}>
          No papers in this subcategory.
        </p>
      )}
    </div>
  );
}
