"use client";

import { useState, useCallback, useRef } from "react";
import { Paper } from "@/types";
import PaperCard from "./PaperCard";

interface PaperGridProps {
  papers: Paper[];
  emptyMessage?: string;
}

export default function PaperGrid({ papers, emptyMessage = "No papers found." }: PaperGridProps) {
  const subcategories = Array.from(new Set(papers.map((p) => p.primary_category).filter(Boolean))).sort();
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [animating, setAnimating] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);

  const handleFilter = useCallback((filter: string | null) => {
    if (filter === activeFilter) return;
    setAnimating(true);
    setTimeout(() => {
      setActiveFilter(filter);
      setAnimating(false);
    }, 150);
  }, [activeFilter]);

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
            onClick={() => handleFilter(null)}
            style={{
              fontSize: "0.6rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              padding: "6px 14px",
              borderRadius: "100px",
              border: "1px solid",
              borderColor: activeFilter === null ? "var(--blue)" : "var(--border-hover)",
              color: activeFilter === null ? "var(--blue)" : "var(--text-muted)",
              background: activeFilter === null ? "rgba(0,102,204,0.08)" : "transparent",
              cursor: "pointer",
              transition: "all 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            All
          </button>
          {subcategories.map((sub) => (
            <button
              key={sub}
              onClick={() => handleFilter(sub === activeFilter ? null : sub)}
              style={{
                fontSize: "0.6rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                padding: "6px 14px",
                borderRadius: "100px",
                border: "1px solid",
                borderColor: activeFilter === sub ? "var(--blue)" : "var(--border-hover)",
                color: activeFilter === sub ? "var(--blue)" : "var(--text-muted)",
                background: activeFilter === sub ? "rgba(0,102,204,0.08)" : "transparent",
                cursor: "pointer",
                transition: "all 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
              }}
            >
              {sub}
            </button>
          ))}
        </div>
      )}
      <div
        ref={gridRef}
        className={`grid gap-4 paper-grid-animated ${animating ? "filtering" : ""}`}
        style={{ minWidth: 0 }}
      >
        {filtered.map((paper, i) => (
          <div
            key={paper.id}
            className="card-stagger"
            style={{ animationDelay: `${Math.min(i * 40, 300)}ms` }}
          >
            <PaperCard paper={paper} />
          </div>
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
