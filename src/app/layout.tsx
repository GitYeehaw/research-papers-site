import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Research Papers",
  description:
    "Daily curated research papers from arXiv — CS, Biology, Electrochemistry, and Physics.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </main>
        <footer
          className="border-t py-8 mt-16 text-center text-sm"
          style={{ borderColor: "var(--border)", color: "var(--text-muted)" }}
        >
          <p>
            Papers scraped daily from{" "}
            <a
              href="https://arxiv.org"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
              style={{ color: "var(--accent)" }}
            >
              arXiv.org
            </a>
            . Built with Next.js &amp; GitHub Actions.
          </p>
        </footer>
      </body>
    </html>
  );
}
