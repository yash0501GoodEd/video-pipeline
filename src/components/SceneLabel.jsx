import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";

/**
 * SceneLabel — Centered top banner showing the current concept/topic.
 * Sits directly below the TopicBadge (subject/chapter indicator).
 * Appears with a frosted-glass slide-down animation.
 */
export const SceneLabel = ({ title, subtitle, theme }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  if (!title && !subtitle) return null;

  const entry = spring({
    frame,
    fps,
    config: { damping: 15, stiffness: 120 },
    delay: 5,
  });

  const opacity = interpolate(entry, [0, 1], [0, 1]);
  const y = interpolate(entry, [0, 1], [-24, 0]);

  // Fade in from scene start for clean entry
  const fadeOut = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        top: 110,
        left: "50%",
        transform: `translateX(-50%) translateY(${y}px)`,
        zIndex: 20,
        opacity: opacity * fadeOut,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 6,
        width: "100%",
        paddingLeft: 60,
        paddingRight: 60,
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          background: `${theme.surface}cc`,
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          border: `1px solid ${theme.primary}33`,
          borderBottom: `3px solid ${theme.accent}`,
          borderRadius: 14,
          padding: "14px 36px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 5,
          maxWidth: 820,
        }}
      >
        {title && (
          <span
            style={{
              color: theme.text,
              fontSize: 44,
              fontWeight: 700,
              fontFamily: "'Inter', sans-serif",
              letterSpacing: 0.5,
              lineHeight: 1.3,
              textAlign: "center",
            }}
          >
            {title}
          </span>
        )}
        {subtitle && (
          <span
            style={{
              color: theme.textMuted,
              fontSize: 36,
              fontWeight: 500,
              fontFamily: "'Inter', sans-serif",
              lineHeight: 1.4,
              textAlign: "center",
            }}
          >
            {subtitle}
          </span>
        )}
      </div>
    </div>
  );
};
