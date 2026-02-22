"use client";

interface CategoryNavItem {
  cat: string;
  label: string;
  color: string;
  href: string;
}

export default function CategoryNav({ items }: { items: CategoryNavItem[] }) {
  return (
    <div className="flex flex-wrap gap-3">
      {items.map(({ cat, label, color, href }) => (
        <a
          key={cat}
          href={href}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "8px 16px",
            borderRadius: "8px",
            border: "1px solid var(--border-hover)",
            fontFamily: "var(--font-mono)",
            fontSize: "0.65rem",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color,
            textDecoration: "none",
            transition: "border-color 0.15s ease, background 0.15s ease",
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.borderColor = color;
            e.currentTarget.style.background = "var(--bg-card)";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.borderColor = "var(--border-hover)";
            e.currentTarget.style.background = "transparent";
          }}
        >
          <span
            style={{
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              backgroundColor: color,
              flexShrink: 0,
            }}
          />
          {label}
        </a>
      ))}
    </div>
  );
}
