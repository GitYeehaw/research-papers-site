"use client";

import { useState } from "react";
import ScrollFadeIn from "@/components/ScrollFadeIn";

interface Project {
  title: string;
  status: "ongoing" | "completed";
  description: string;
  tags: string[];
  completedDate?: string;
  fullDescription?: string;
  images?: string[];
  videoUrl?: string;
  results?: string;
}

const ongoingProjects: Project[] = [
  {
    title: "Cost-Effective Leader Arms for Teleoperation",
    status: "ongoing",
    description:
      "Benchmarking the most cost-effective and performant leader arms per dollar for robot teleoperation. Comparing affordable builds such as GELLO and Koch-style arms to identify the best options for low-budget research labs looking to collect high-quality demonstration data. The evaluation also factors in ergonomic design to prevent overuse injuries for operators during extended data collection sessions.",
    tags: ["Robotics", "Teleoperation", "Hardware"],
  },
  {
    title: "Auto-Labeling for Robotic Data Collection",
    status: "ongoing",
    description:
      "Building software that automatically generates labels for robotic data collection, covering both visual annotations such as object detection and segmentation, and behavioral labels including task segmentation and success or failure classification. The labeled data feeds into a reinforcement learning pipeline to train reward models and fine-tune vision language action models with diverse language instructions and proprioceptive state.",
    tags: ["Reinforcement Learning", "Computer Vision", "VLA"],
  },
];

// To add a completed project, push an entry to this array:
// {
//   title: "Project Name",
//   status: "completed",
//   completedDate: "Jan 2026",
//   description: "Short summary shown when collapsed.",
//   fullDescription: "Detailed writeup shown when expanded.",
//   tags: ["Tag1", "Tag2"],
//   images: ["/research-papers-site/projects/photo1.jpg"],
//   videoUrl: "https://player.vimeo.com/video/VIDEO_ID?title=0&byline=0&portrait=0&dnt=1",
//   results: "Results and data summary.",
// }
const completedProjects: Project[] = [];

function ChevronIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4.5 2.5L8 6L4.5 9.5" />
    </svg>
  );
}

function OngoingCard({ project }: { project: Project }) {
  return (
    <div className="card">
      <p
        className="text-xs mb-4 tracking-wider uppercase flex items-center gap-2"
        style={{
          color: "#fbbf24",
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
            background: "linear-gradient(135deg, #fbbf24, #f59e0b)",
            boxShadow: "0 0 10px rgba(251,191,36,0.5)",
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
        {project.title}
      </h3>
      <p
        className="text-sm mb-5 leading-relaxed"
        style={{ color: "var(--text-secondary)" }}
      >
        {project.description}
      </p>
      <div className="flex gap-2 flex-wrap">
        {project.tags.map((tag) => (
          <span key={tag} className="category-badge">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

function CompletedCard({ project }: { project: Project }) {
  const [expanded, setExpanded] = useState(false);

  const hasMedia =
    (project.images && project.images.length > 0) || project.videoUrl;

  return (
    <div className="card" style={{ gridColumn: "1 / -1" }}>
      <div
        className="flex items-start justify-between gap-4 cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex-1 min-w-0">
          <p
            className="text-xs mb-4 tracking-wider uppercase flex items-center gap-2"
            style={{
              color: "#4ade80",
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
                background: "linear-gradient(135deg, #4ade80, #22c55e)",
                boxShadow: "0 0 10px rgba(74,222,128,0.5)",
                display: "inline-block",
              }}
            />
            Completed
            {project.completedDate && (
              <span style={{ color: "var(--text-muted)", fontWeight: 400 }}>
                · {project.completedDate}
              </span>
            )}
          </p>
          <h3
            className="text-xl mb-3"
            style={{
              fontFamily: "var(--font-heading)",
              color: "var(--cultured)",
              fontWeight: 400,
            }}
          >
            {project.title}
          </h3>
          <p
            className="text-sm leading-relaxed"
            style={{ color: "var(--text-secondary)" }}
          >
            {project.description}
          </p>
        </div>
        <button
          className={`project-expand-btn ${expanded ? "expanded" : ""}`}
          aria-label={expanded ? "Collapse" : "Expand"}
          onClick={(e) => {
            e.stopPropagation();
            setExpanded(!expanded);
          }}
        >
          <ChevronIcon />
        </button>
      </div>

      <div
        className={`project-expanded-content ${expanded ? "open" : ""}`}
      >
        <div className="pt-5">
          {project.fullDescription && (
            <p
              className="text-sm leading-relaxed mb-5"
              style={{ color: "var(--text-secondary)" }}
            >
              {project.fullDescription}
            </p>
          )}

          {project.images && project.images.length > 0 && (
            <div className="project-media-grid mb-5">
              {project.images.map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt={`${project.title} image ${i + 1}`}
                  loading="lazy"
                />
              ))}
            </div>
          )}

          {project.videoUrl && (
            <div className="project-video-wrapper mb-5">
              <iframe
                src={project.videoUrl}
                title={`${project.title} video`}
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
                loading="lazy"
              />
            </div>
          )}

          {project.results && (
            <div className="mb-5">
              <h4
                className="text-sm mb-2"
                style={{
                  fontFamily: "var(--font-heading)",
                  color: "var(--cultured)",
                  fontWeight: 500,
                }}
              >
                Results
              </h4>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "var(--text-secondary)" }}
              >
                {project.results}
              </p>
            </div>
          )}
        </div>
      </div>

      <div className={`flex gap-2 flex-wrap ${expanded ? "mt-2" : "mt-5"}`}>
        {project.tags.map((tag) => (
          <span key={tag} className="category-badge">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function ProjectsPage() {
  return (
    <div>
      <ScrollFadeIn>
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
      </ScrollFadeIn>

      {/* Ongoing */}
      <div className="grid gap-6 md:grid-cols-2">
        {ongoingProjects.map((project, i) => (
          <ScrollFadeIn key={project.title} delay={i * 80}>
            <OngoingCard project={project} />
          </ScrollFadeIn>
        ))}
      </div>

      {/* Completed */}
      {completedProjects.length > 0 && (
        <>
          <div className="mt-16 mb-8">
            <h2
              className="text-2xl mb-3"
              style={{
                fontFamily: "var(--font-heading)",
                color: "var(--cultured)",
                fontWeight: 400,
              }}
            >
              Completed
            </h2>
            <div className="divider" />
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {completedProjects.map((project) => (
              <CompletedCard key={project.title} project={project} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
