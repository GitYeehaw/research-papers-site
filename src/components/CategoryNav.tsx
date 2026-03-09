import Link from "next/link";

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
        <Link
          key={cat}
          href={href}
          className="cat-nav-link"
          style={{
            '--cat-color': color,
            '--cat-color-border': `${color}50`,
            '--cat-color-glow': `${color}20`,
          } as React.CSSProperties}
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
        </Link>
      ))}
    </div>
  );
}
