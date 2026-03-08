"use client";

interface CategoryNavItem {
  cat: string;
  label: string;
  color: string;
  href: string;
  paperCount?: number;
}

export default function CategoryNav({ items }: { items: CategoryNavItem[] }) {
  return (
    <div className="flex flex-wrap gap-3">
      {items.map(({ cat, label, color, href, paperCount }) => (
        <a
          key={cat}
          href={href}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "10px",
            padding: "14px 24px",
            borderRadius: "16px",
            border: "1px solid var(--border)",
            background: "var(--card-bg)",
            backdropFilter: "blur(16px)",
            fontFamily: "var(--font-body)",
            fontSize: "0.8rem",
            fontWeight: 500,
            color: "rgba(230,230,230,0.5)",
            textDecoration: "none",
            transition: "all 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.borderColor = `${color}50`;
            e.currentTarget.style.background = "var(--card-hover)";
            e.currentTarget.style.color = "var(--cultured)";
            e.currentTarget.style.transform = "translateY(-3px) scale(1.05)";
            e.currentTarget.style.boxShadow = `0 0 24px ${color}20, 0 8px 24px rgba(0,0,0,0.3)`;
            const dot = e.currentTarget.querySelector('.cat-dot') as HTMLElement;
            if (dot) dot.style.boxShadow = `0 0 8px ${color}`;
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.borderColor = "var(--border)";
            e.currentTarget.style.background = "var(--card-bg)";
            e.currentTarget.style.color = "rgba(230,230,230,0.5)";
            e.currentTarget.style.transform = "none";
            e.currentTarget.style.boxShadow = "none";
            const dot = e.currentTarget.querySelector('.cat-dot') as HTMLElement;
            if (dot) dot.style.boxShadow = "none";
          }}
        >
          <span
            className="cat-dot"
            style={{
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              backgroundColor: color,
              flexShrink: 0,
              transition: "box-shadow 0.3s",
            }}
          />
          {label}
          {paperCount !== undefined && (
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.6rem",
                color: "var(--text-muted)",
                letterSpacing: "0.05em",
              }}
            >
              {paperCount}
            </span>
          )}
        </a>
      ))}
    </div>
  );
}
