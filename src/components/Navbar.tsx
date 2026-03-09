"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const NAV_ITEMS = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/researchers", label: "Researchers" },
  { href: "/robotics", label: "Robotics" },
  { href: "/physics", label: "Physics" },
  { href: "/cs", label: "CS" },
  { href: "/biology", label: "Biology" },
  { href: "/electrochem", label: "Electrochem" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        height: "48px",
        background: "rgba(14,14,26,0.6)",
        backdropFilter: "saturate(180%) blur(20px)",
        WebkitBackdropFilter: "saturate(180%) blur(20px)",
        borderBottom: "1px solid rgba(230,230,230,0.05)",
      }}
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex items-center justify-between h-full">
          {/* Logo */}
          <Link
            href="/"
            className="shrink-0"
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "1.15rem",
              color: "var(--platinum)",
              textDecoration: "none",
              fontStyle: "italic",
              transition: "all 0.3s",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.color = "var(--cultured)";
              e.currentTarget.style.textShadow = "0 0 20px rgba(168,85,247,0.3)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.color = "var(--platinum)";
              e.currentTarget.style.textShadow = "none";
            }}
          >
            Research Papers
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`nav-link ${pathname === item.href ? "active" : ""}`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2"
            style={{ color: "var(--text-muted)" }}
            aria-label="Toggle menu"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          className="md:hidden mobile-menu-enter"
          style={{
            borderTop: "1px solid var(--border)",
            background: "rgba(14,14,26,0.9)",
            backdropFilter: "blur(20px)",
          }}
        >
          <div className="px-4 pt-3 pb-4 space-y-1">
            {NAV_ITEMS.map((item, i) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`nav-link block ${pathname === item.href ? "active" : ""}`}
                style={{ animationDelay: `${i * 30}ms`, animation: "cardFadeIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) both" }}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
