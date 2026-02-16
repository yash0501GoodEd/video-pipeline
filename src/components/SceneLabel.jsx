import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";

/**
 * SceneLabel — Lower-third style label showing the current concept/topic.
 * Provides visual context without cluttering the screen with dialogue text.
 * Appears with a frosted-glass slide-in animation.
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
  const x = interpolate(entry, [0, 1], [-40, 0]);

  // Fade out near end of scene for clean transition
  const fadeOut = interpolate(frame, [0, 30], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        bottom: 80,
        left: 60,
        zIndex: 20,
        opacity: opacity * fadeOut,
        transform: `translateX(${x}px)`,
      }}
    >
      <div
        style={{
          background: `${theme.surface}cc`,
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          border: `1px solid ${theme.primary}33`,
          borderLeft: `4px solid ${theme.accent}`,
          borderRadius: "0 14px 14px 0",
          padding: "18px 32px",
          display: "flex",
          flexDirection: "column",
          gap: 6,
          maxWidth: 700,
        }}
      >
        {title && (
          <span
            style={{
              color: theme.text,
              fontSize: 30,
              fontWeight: 700,
              fontFamily: "'Inter', sans-serif",
              letterSpacing: 0.5,
              lineHeight: 1.3,
            }}
          >
            {title}
          </span>
        )}
        {subtitle && (
          <span
            style={{
              color: theme.textMuted,
              fontSize: 18,
              fontWeight: 500,
              fontFamily: "'Inter', sans-serif",
              lineHeight: 1.4,
            }}
          >
            {subtitle}
          </span>
        )}
      </div>
    </div>
  );
};
