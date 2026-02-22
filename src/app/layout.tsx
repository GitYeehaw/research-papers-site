import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import BackToTop from "@/components/BackToTop";
import MathJaxTypeset from "@/components/MathJaxTypeset";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Research Papers — A Daily Scholarly Digest",
  description:
    "Daily curated research papers from arXiv — Robotics, CS, Physics, Biology, and Electrochemistry.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          {children}
        </main>
        <BackToTop />
        <MathJaxTypeset />
        <footer
          className="py-12 mt-20 text-center text-sm"
          style={{ color: "var(--text-muted)" }}
        >
          <div className="flourish">&mdash;&nbsp;&bull;&nbsp;&mdash;</div>
        </footer>
        <Script id="mathjax-config" strategy="beforeInteractive">{`
          window.MathJax = {
            tex: {
              inlineMath: [['$', '$'], ['\\(', '\\)']],
              displayMath: [['$$', '$$'], ['\\[', '\\]']],
            },
            options: {
              skipHtmlTags: ['script', 'noscript', 'style', 'textarea', 'pre'],
            },
          };
        `}</Script>
        <Script
          id="mathjax"
          src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-chtml.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
