import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import BackToTop from "@/components/BackToTop";

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
        <footer
          className="py-12 mt-20 text-center text-sm"
          style={{ color: "var(--text-muted)" }}
        >
          <div className="flourish">&mdash;&nbsp;&bull;&nbsp;&mdash;</div>
          <p className="mt-4" style={{ fontFamily: "var(--font-body)", fontStyle: "italic" }}>
            Papers gathered daily from{" "}
            <a
              href="https://arxiv.org"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
              style={{ color: "var(--accent)" }}
            >
              arXiv.org
            </a>
          </p>
          <p className="mt-1 text-xs" style={{ color: "var(--text-muted)", opacity: 0.6 }}>
            Built with Next.js &amp; GitHub Actions
          </p>
        </footer>
      </body>
    </html>
  );
}
