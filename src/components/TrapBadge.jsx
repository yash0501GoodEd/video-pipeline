import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";

/**
 * TrapBadge - Animated warning badge for "TRAP ALERT" moments.
 */
export const TrapBadge = ({ theme, startDelay = 0 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entryFrame = Math.max(0, frame - startDelay);

  const scaleSpring = spring({
    frame: entryFrame,
    fps,
    config: { damping: 8, stiffness: 200 },
  });

  const scale = interpolate(scaleSpring, [0, 1], [0, 1]);
  const rotate = interpolate(scaleSpring, [0, 1], [-10, 0]);

  // Pulsing glow
  const pulseOpacity = 0.3 + Math.sin(frame / 6) * 0.2;

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 16,
        transform: `scale(${scale}) rotate(${rotate}deg)`,
      }}
    >
      <div
        style={{
          background: theme.trapBg,
          borderRadius: 12,
          padding: "12px 32px",
          display: "flex",
          alignItems: "center",
          gap: 12,
          boxShadow: `0 0 40px ${theme.trapBg}${Math.floor(pulseOpacity * 255).toString(16).padStart(2, "0")}`,
          border: `2px solid ${theme.trapBg}88`,
        }}
      >
        <span style={{ fontSize: 32 }}>⚠️</span>
        <span
          style={{
            color: "#ffffff",
            fontSize: 28,
            fontWeight: 800,
            fontFamily: "'Inter', sans-serif",
            letterSpacing: 3,
            textTransform: "uppercase",
          }}
        >
          TRAP ALERT!
        </span>
        <span style={{ fontSize: 32 }}>⚠️</span>
      </div>
    </div>
  );
};
