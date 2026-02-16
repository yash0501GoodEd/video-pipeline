import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";

/**
 * BulletList - Animated summary bullet points with staggered entry.
 */
export const BulletList = ({
  title = "Summary",
  bullets = [],
  theme,
  startDelay = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleEntry = spring({
    frame: Math.max(0, frame - startDelay),
    fps,
    config: { damping: 15, stiffness: 120 },
  });

  const titleOpacity = interpolate(titleEntry, [0, 1], [0, 1]);
  const titleY = interpolate(titleEntry, [0, 1], [-20, 0]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 20,
        maxWidth: 1400,
        width: "100%",
      }}
    >
      {/* Title */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 16,
          opacity: titleOpacity,
          transform: `translateY(${titleY}px)`,
          marginBottom: 10,
        }}
      >
        <div
          style={{
            width: 6,
            height: 36,
            background: theme.accent,
            borderRadius: 3,
          }}
        />
        <span
          style={{
            color: theme.text,
            fontSize: 36,
            fontWeight: 800,
            fontFamily: "'Inter', sans-serif",
            letterSpacing: 1,
          }}
        >
          📋 {title}
        </span>
      </div>

      {/* Bullets */}
      {bullets.map((bullet, i) => {
        const delay = startDelay + 12 + i * 10;
        const entry = spring({
          frame: Math.max(0, frame - delay),
          fps,
          config: { damping: 20, stiffness: 150 },
        });

        const x = interpolate(entry, [0, 1], [60, 0]);
        const opacity = interpolate(entry, [0, 1], [0, 1]);

        return (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: 16,
              background: `${theme.surface}cc`,
              border: `1px solid ${theme.primary}33`,
              borderRadius: 14,
              padding: "16px 24px",
              transform: `translateX(${x}px)`,
              opacity,
            }}
          >
            <span
              style={{
                color: theme.accent,
                fontSize: 24,
                fontWeight: 800,
                fontFamily: "'Inter', sans-serif",
                minWidth: 36,
              }}
            >
              {bullet.icon || (bullet.number != null ? `${bullet.number}.` : "→")}
            </span>
            <span
              style={{
                color: theme.text,
                fontSize: 24,
                fontWeight: 500,
                fontFamily: "'Inter', sans-serif",
                lineHeight: 1.5,
              }}
            >
              {bullet.text}
            </span>
          </div>
        );
      })}
    </div>
  );
};
