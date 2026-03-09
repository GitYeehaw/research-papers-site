"use client";

import { useEffect, useRef, useState, ReactNode } from "react";

interface ScrollFadeInProps {
  children: ReactNode;
  delay?: number;
}

const observerCallbacks = new Map<Element, () => void>();
let sharedObserver: IntersectionObserver | null = null;

function getSharedObserver(): IntersectionObserver {
  if (!sharedObserver) {
    sharedObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cb = observerCallbacks.get(entry.target);
            if (cb) {
              cb();
              observerCallbacks.delete(entry.target);
              sharedObserver?.unobserve(entry.target);
            }
          }
        });
      },
      { threshold: 0.1 }
    );
  }
  return sharedObserver;
}

export default function ScrollFadeIn({ children, delay = 0 }: ScrollFadeInProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = getSharedObserver();
    observerCallbacks.set(el, () => setVisible(true));
    obs.observe(el);

    return () => {
      observerCallbacks.delete(el);
      obs.unobserve(el);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`fade-section ${visible ? "visible" : ""}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
