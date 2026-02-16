import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";

/**
 * TopicBadge - Subject + chapter identifier shown at top of screen.
 */
export const TopicBadge = ({ subject, chapter, theme }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entry = spring({
    frame,
    fps,
    config: { damping: 200 },
    delay: 5,
  });

  const opacity = interpolate(entry, [0, 1], [0, 1]);
  const y = interpolate(entry, [0, 1], [-30, 0]);

  const subjectEmoji = {
    physics: "⚛️",
    chemistry: "🧪",
    biology: "🧬",
    math: "📐",
  };

  return (
    <div
      style={{
        position: "absolute",
        top: 30,
        left: "50%",
        transform: `translateX(-50%) translateY(${y}px)`,
        opacity,
        display: "flex",
        alignItems: "center",
        gap: 12,
        zIndex: 40,
      }}
    >
      <div
        style={{
          background: `${theme.primary}18`,
          border: `1px solid ${theme.primary}44`,
          borderRadius: 30,
          padding: "8px 24px",
          display: "flex",
          alignItems: "center",
          gap: 10,
          backdropFilter: "blur(8px)",
        }}
      >
        <span style={{ fontSize: 20 }}>
          {subjectEmoji[subject] || "📚"}
        </span>
        <span
          style={{
            color: theme.primary,
            fontSize: 16,
            fontWeight: 600,
            fontFamily: "'Inter', sans-serif",
            textTransform: "uppercase",
            letterSpacing: 1.5,
          }}
        >
          {subject}
        </span>
        <span style={{ color: theme.textMuted, fontSize: 14 }}>|</span>
        <span
          style={{
            color: theme.secondary,
            fontSize: 15,
            fontWeight: 500,
            fontFamily: "'Inter', sans-serif",
          }}
        >
          {chapter}
        </span>
      </div>
    </div>
  );
};
