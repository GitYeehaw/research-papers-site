"use client";

import { useEffect, useState } from "react";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
      style={{
        position: "fixed",
        bottom: "2rem",
        right: "2rem",
        width: "2.5rem",
        height: "2.5rem",
        borderRadius: "50%",
        border: "1px solid var(--border-hover)",
        background: "var(--card-bg)",
        backdropFilter: "blur(16px)",
        color: "var(--text-muted)",
        fontFamily: "var(--font-mono)",
        fontSize: "1rem",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? "auto" : "none",
        transform: visible ? "translateY(0) scale(1)" : "translateY(8px) scale(0.9)",
        transition: "opacity 0.35s cubic-bezier(0.16, 1, 0.3, 1), transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), color 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease",
        zIndex: 50,
      }}
      onMouseOver={(e) => {
        const btn = e.currentTarget as HTMLButtonElement;
        btn.style.color = "var(--blue)";
        btn.style.borderColor = "var(--blue)";
        btn.style.transform = "translateY(-3px) scale(1.05)";
        btn.style.boxShadow = "0 4px 16px rgba(0,102,204,0.2)";
      }}
      onMouseOut={(e) => {
        const btn = e.currentTarget as HTMLButtonElement;
        btn.style.color = "var(--text-muted)";
        btn.style.borderColor = "var(--border-hover)";
        btn.style.transform = "translateY(0) scale(1)";
        btn.style.boxShadow = "none";
      }}
    >
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M7 12V2M3 5l4-3 4 3" />
      </svg>
    </button>
  );
}
