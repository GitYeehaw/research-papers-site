import { Researcher } from "@/types";
import Link from "next/link";

interface ResearcherAlertsProps {
  alerts: { researcher: Researcher; recentCount: number }[];
}

export default function ResearcherAlerts({ alerts }: ResearcherAlertsProps) {
  if (alerts.length === 0) return null;

  return (
    <div className="researcher-alert" aria-label="Followed researcher alerts">
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "18px" }}>
        <span
          aria-hidden="true"
          style={{
            width: "7px",
            height: "7px",
            borderRadius: "50%",
            backgroundColor: "var(--orange)",
            flexShrink: 0,
            animation: "pulse 2s ease-in-out infinite",
            boxShadow: "0 0 10px rgba(245,99,0,0.5)",
          }}
        />
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.65rem",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "var(--orange)",
            fontWeight: 500,
          }}
        >
          Followed Researcher
        </span>
      </div>

      {/* Researcher list */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        {alerts.map(({ researcher, recentCount }) => (
          <div
            key={researcher.id}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <Link
              href="/researchers"
              className="researcher-name-link"
              style={{ fontSize: "0.95rem" }}
            >
              {researcher.name}
            </Link>
            <span className="tag-new" style={{ marginLeft: "0", animation: "none" }}>
              {recentCount}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
