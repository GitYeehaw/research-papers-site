import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import BackToTop from "@/components/BackToTop";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Research Papers — A Daily Scholarly Digest",
  description:
    "Daily curated research papers from arXiv — Robotics, CS, Physics, Biology, and Electrochemistry.",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/v2/css?f[]=clash+display@400,500,600,700&f[]=general+sans@400,500,600&display=swap"
        />
      </head>
      <body>
        <div className="aurora" />
        <div className="aurora-2" />
        <div className="aurora-3" />
        <Navbar />
        <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 relative z-[1]">
          {children}
        </main>
        <BackToTop />
        <Script id="mathjax-config" strategy="beforeInteractive">{`
          window.MathJax = {
            tex: {
              inlineMath: [['$', '$'], ['\\(', '\\)']],
              displayMath: [['$$', '$$'], ['\\[', '\\]']],
            },
            options: {
              skipHtmlTags: ['script', 'noscript', 'style', 'textarea', 'pre', 'button'],
            },
          };
        `}</Script>
      </body>
    </html>
  );
}
