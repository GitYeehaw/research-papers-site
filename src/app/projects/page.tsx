export default function ProjectsPage() {
  return (
    <div>
      <h1 className="section-title">Projects</h1>
      <p className="section-desc">
        Current and past research projects. Edit this page to add your own content.
      </p>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Example project cards — replace with your own */}
        <div className="card">
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
            style={{ backgroundColor: "var(--bg-secondary)" }}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="var(--accent)"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5"
              />
            </svg>
          </div>
          <h3 className="text-lg font-semibold mb-2" style={{ color: "var(--text-primary)" }}>
            Example Project 1
          </h3>
          <p className="text-sm mb-4" style={{ color: "var(--text-secondary)" }}>
            Replace this with a description of your project. You can include links to repos,
            papers, or demos.
          </p>
          <div className="flex gap-2">
            <span className="category-badge">Machine Learning</span>
            <span className="category-badge">Python</span>
          </div>
        </div>

        <div className="card">
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
            style={{ backgroundColor: "var(--bg-secondary)" }}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="var(--accent)"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5"
              />
            </svg>
          </div>
          <h3 className="text-lg font-semibold mb-2" style={{ color: "var(--text-primary)" }}>
            Example Project 2
          </h3>
          <p className="text-sm mb-4" style={{ color: "var(--text-secondary)" }}>
            Another project placeholder. Add details about methodology, results, or ongoing work.
          </p>
          <div className="flex gap-2">
            <span className="category-badge">Electrochemistry</span>
            <span className="category-badge">Simulation</span>
          </div>
        </div>
      </div>

      <div
        className="mt-8 p-6 rounded-xl border text-sm"
        style={{
          backgroundColor: "var(--bg-secondary)",
          borderColor: "var(--border)",
          color: "var(--text-secondary)",
        }}
      >
        <strong style={{ color: "var(--text-primary)" }}>Tip:</strong> Edit{" "}
        <code
          className="px-1.5 py-0.5 rounded text-xs"
          style={{ backgroundColor: "var(--bg-card)", color: "var(--accent)" }}
        >
          src/app/projects/page.tsx
        </code>{" "}
        to add your real projects here.
      </div>
    </div>
  );
}
