"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

declare global {
  interface Window {
    MathJax?: {
      typesetPromise: (elements?: Element[]) => Promise<void>;
    };
  }
}

export default function MathJaxTypeset() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window !== "undefined" && window.MathJax?.typesetPromise) {
      window.MathJax.typesetPromise();
    }
  }, [pathname]);

  return null;
}
