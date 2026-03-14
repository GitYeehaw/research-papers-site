"use client";

import { useEffect } from "react";

export default function HashScroller() {
  useEffect(() => {
    const hash = window.location.hash;
    if (!hash) return;

    const scrollToHash = () => {
      const el = document.querySelector(hash);
      if (!el) return;

      // Reveal any ancestor fade-sections immediately so the target is visible
      let parent = el.closest(".fade-section");
      while (parent) {
        parent.classList.add("visible");
        (parent as HTMLElement).style.transitionDelay = "0ms";
        parent = parent.parentElement?.closest(".fade-section") ?? null;
      }

      el.scrollIntoView({ behavior: "smooth" });
    };

    // Small delay to let hydration + IntersectionObserver setup complete
    requestAnimationFrame(() => {
      requestAnimationFrame(scrollToHash);
    });
  }, []);

  return null;
}
