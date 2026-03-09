import { Paper } from "@/types";

interface FeaturedPaperCardProps {
  paper: Paper;
  categoryLabel: string;
  categoryColor: string;
  categoryKey?: string;
  isNew?: boolean;
}

export default function FeaturedPaperCard({
  paper,
  categoryLabel,
  categoryColor,
  categoryKey,
  isNew,
}: FeaturedPaperCardProps) {
  const date = new Date(paper.published).toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });

  return (
    <article
      className="card"
      data-glow={categoryKey}
      style={{ display: "flex", flexDirection: "column", gap: "12px" }}
    >
      {/* Category dot + label + New tag */}
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <span
          style={{
            width: "5px",
            height: "5px",
            borderRadius: "50%",
            backgroundColor: categoryColor,
            flexShrink: 0,
            transition: "box-shadow 0.3s",
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
        {isNew && <span className="tag-new">New</span>}
      </div>

      {/* Title */}
      <h3
        style={{
          fontFamily: "var(--font-heading)",
          color: "var(--cultured)",
          fontSize: "1rem",
          lineHeight: 1.45,
          fontWeight: 400,
          flex: 1,
          transition: "color 0.3s",
        }}
      >
        <a
          href={paper.url}
          target="_blank"
          rel="noopener noreferrer"
          className="featured-title-link"
        >
          {paper.title}
        </a>
      </h3>

      {/* Authors */}
      <p
        style={{
          color: "var(--text-muted)",
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
          color: "var(--blue)",
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
