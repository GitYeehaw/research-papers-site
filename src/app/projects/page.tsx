export default function ProjectsPage() {
  return (
    <div>
      <div className="pt-6 mb-12">
        <h1
          className="text-4xl mb-3"
          style={{
            fontFamily: "var(--font-heading)",
            color: "var(--text-primary)",
            fontWeight: 600,
          }}
        >
          Projects
        </h1>
        <p className="section-desc">
          Current and past research endeavours. Edit this page to chronicle your own work.
        </p>
        <div className="divider" />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Example project cards — replace with your own */}
        <div className="card">
          <p
            className="text-xs mb-4 tracking-wider uppercase"
            style={{
              color: "var(--accent-dim)",
              fontFamily: "var(--font-mono)",
              letterSpacing: "0.1em",
            }}
          >
            Ongoing
          </p>
          <h3
            className="text-xl mb-3"
            style={{
              fontFamily: "var(--font-heading)",
              color: "var(--text-primary)",
              fontWeight: 500,
            }}
          >
            Example Project I
          </h3>
          <p
            className="text-sm mb-5 leading-relaxed"
            style={{ color: "var(--text-secondary)" }}
          >
            Replace this with a description of your project. You may include
            links to repositories, published papers, or demonstrations of your work.
          </p>
          <div className="flex gap-2">
            <span className="category-badge">Machine Learning</span>
            <span className="category-badge">Python</span>
          </div>
        </div>

        <div className="card">
          <p
            className="text-xs mb-4 tracking-wider uppercase"
            style={{
              color: "var(--accent-dim)",
              fontFamily: "var(--font-mono)",
              letterSpacing: "0.1em",
            }}
          >
            Ongoing
          </p>
          <h3
            className="text-xl mb-3"
            style={{
              fontFamily: "var(--font-heading)",
              color: "var(--text-primary)",
              fontWeight: 500,
            }}
          >
            Example Project II
          </h3>
          <p
            className="text-sm mb-5 leading-relaxed"
            style={{ color: "var(--text-secondary)" }}
          >
            Another project placeholder. Add details about methodology, results,
            or ongoing investigation.
          </p>
          <div className="flex gap-2">
            <span className="category-badge">Electrochemistry</span>
            <span className="category-badge">Simulation</span>
          </div>
        </div>
      </div>

      <div
        className="mt-10 p-6 text-sm"
        style={{
          borderLeft: "2px solid var(--accent-dim)",
          backgroundColor: "var(--bg-secondary)",
          color: "var(--text-secondary)",
          fontStyle: "italic",
        }}
      >
        Edit{" "}
        <code
          className="px-1.5 py-0.5 text-xs"
          style={{
            fontFamily: "var(--font-mono)",
            color: "var(--accent)",
            backgroundColor: "var(--bg-card)",
          }}
        >
          src/app/projects/page.tsx
        </code>{" "}
        to add your own projects here.
      </div>
    </div>
  );
}
