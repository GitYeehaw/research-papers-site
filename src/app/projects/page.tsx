export default function ProjectsPage() {
  return (
    <div>
      <div className="pt-6 mb-12">
        <h1
          className="text-4xl mb-3"
          style={{
            fontFamily: "var(--font-heading)",
            color: "var(--cultured)",
            fontWeight: 400,
          }}
        >
          Projects
        </h1>
<div className="divider" />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="card">
          <p
            className="text-xs mb-4 tracking-wider uppercase flex items-center gap-2"
            style={{
              color: "var(--blue)",
              fontFamily: "var(--font-mono)",
              letterSpacing: "0.12em",
              fontWeight: 600,
            }}
          >
            <span
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                background: "var(--blue)",
                boxShadow: "0 0 8px rgba(0,102,204,0.4)",
                animation: "pulse 2s infinite",
                display: "inline-block",
              }}
            />
            Ongoing
          </p>
          <h3
            className="text-xl mb-3"
            style={{
              fontFamily: "var(--font-heading)",
              color: "var(--cultured)",
              fontWeight: 400,
            }}
          >
            Cost-Effective Leader Arms for Teleoperation
          </h3>
          <p
            className="text-sm mb-5 leading-relaxed"
            style={{ color: "var(--text-secondary)" }}
          >
            Benchmarking the most cost-effective and performant leader arms
            per dollar for robot teleoperation. Comparing affordable builds
            such as GELLO and Koch-style arms to identify the best options
            for low-budget research labs looking to collect high-quality
            demonstration data. The evaluation also factors in ergonomic
            design to prevent overuse injuries for operators during extended
            data collection sessions.
          </p>
          <div className="flex gap-2 flex-wrap">
            <span className="category-badge">Robotics</span>
            <span className="category-badge">Teleoperation</span>
            <span className="category-badge">Hardware</span>
          </div>
        </div>

        <div className="card">
          <p
            className="text-xs mb-4 tracking-wider uppercase flex items-center gap-2"
            style={{
              color: "var(--blue)",
              fontFamily: "var(--font-mono)",
              letterSpacing: "0.12em",
              fontWeight: 600,
            }}
          >
            <span
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                background: "var(--blue)",
                boxShadow: "0 0 8px rgba(0,102,204,0.4)",
                animation: "pulse 2s infinite",
                display: "inline-block",
              }}
            />
            Ongoing
          </p>
          <h3
            className="text-xl mb-3"
            style={{
              fontFamily: "var(--font-heading)",
              color: "var(--cultured)",
              fontWeight: 400,
            }}
          >
            Auto-Labeling for Robotic Data Collection
          </h3>
          <p
            className="text-sm mb-5 leading-relaxed"
            style={{ color: "var(--text-secondary)" }}
          >
            Building software that automatically generates labels for
            robotic data collection, covering both visual annotations such as
            object detection and segmentation, and behavioral labels including
            task segmentation and success or failure classification. The
            labeled data feeds into a reinforcement learning pipeline to train
            reward models and fine-tune vision language action models with
            diverse language instructions and proprioceptive state.
          </p>
          <div className="flex gap-2 flex-wrap">
            <span className="category-badge">Reinforcement Learning</span>
            <span className="category-badge">Computer Vision</span>
            <span className="category-badge">VLA</span>
          </div>
        </div>
      </div>
    </div>
  );
}
