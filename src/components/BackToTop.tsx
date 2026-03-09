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
      className={`back-to-top ${visible ? "visible" : ""}`}
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
        zIndex: 50,
      }}
    >
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M7 12V2M3 5l4-3 4 3" />
      </svg>
    </button>
  );
}
