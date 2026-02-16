import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";

/**
 * Animated background patterns. Driven entirely by useCurrentFrame().
 */
export const Background = ({
  variant = "gradient",
  theme,
}) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  if (variant === "gradient") {
    return (
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: theme.gradient,
          zIndex: 0,
        }}
      >
        {/* Subtle animated overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `radial-gradient(circle at ${50 + Math.sin(frame / 60) * 20}% ${50 + Math.cos(frame / 45) * 15}%, ${theme.primary}15 0%, transparent 60%)`,
          }}
        />
      </div>
    );
  }

  if (variant === "grid") {
    const gridSize = 60;
    const offsetX = (frame * 0.3) % gridSize;
    const offsetY = (frame * 0.2) % gridSize;

    return (
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: theme.bg,
          zIndex: 0,
        }}
      >
        <svg
          width={width}
          height={height}
          style={{ position: "absolute", inset: 0, opacity: 0.15 }}
        >
          {/* Vertical lines */}
          {Array.from({
            length: Math.ceil(width / gridSize) + 1,
          }).map((_, i) => (
            <line
              key={`v-${i}`}
              x1={i * gridSize + offsetX}
              y1={0}
              x2={i * gridSize + offsetX}
              y2={height}
              stroke={theme.primary}
              strokeWidth={1}
            />
          ))}
          {/* Horizontal lines */}
          {Array.from({
            length: Math.ceil(height / gridSize) + 1,
          }).map((_, i) => (
            <line
              key={`h-${i}`}
              x1={0}
              y1={i * gridSize + offsetY}
              x2={width}
              y2={i * gridSize + offsetY}
              stroke={theme.primary}
              strokeWidth={1}
            />
          ))}
        </svg>
      </div>
    );
  }

  if (variant === "particles") {
    // Deterministic particle positions using seed
    const particles = Array.from({ length: 30 }).map((_, i) => {
      const seed = i * 137.508; // golden angle
      const baseX = ((seed * 7.3) % width);
      const baseY = ((seed * 13.7) % height);
      const size = 3 + (i % 5) * 2;
      const speed = 0.3 + (i % 4) * 0.15;
      const x = baseX + Math.sin((frame * speed + seed) / 30) * 40;
      const y = baseY + Math.cos((frame * speed + seed) / 25) * 30;
      const opacity = 0.15 + Math.sin((frame + seed) / 20) * 0.1;

      return (
        <circle
          key={i}
          cx={x}
          cy={y}
          r={size}
          fill={theme.primary}
          opacity={opacity}
        />
      );
    });

    return (
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: theme.bg,
          zIndex: 0,
        }}
      >
        <svg
          width={width}
          height={height}
          style={{ position: "absolute", inset: 0 }}
        >
          {particles}
        </svg>
      </div>
    );
  }

  if (variant === "waves") {
    const wavePoints = (offset, amplitude, frequency) => {
      let d = `M 0 ${height}`;
      for (let x = 0; x <= width; x += 10) {
        const y =
          height * 0.7 +
          Math.sin((x * frequency) / width + frame / 30 + offset) * amplitude +
          Math.sin(
            (x * frequency * 2) / width + frame / 20 + offset * 2
          ) *
            (amplitude * 0.3);
        d += ` L ${x} ${y}`;
      }
      d += ` L ${width} ${height} Z`;
      return d;
    };

    return (
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: theme.bg,
          zIndex: 0,
        }}
      >
        <svg
          width={width}
          height={height}
          style={{ position: "absolute", inset: 0, opacity: 0.15 }}
        >
          <path d={wavePoints(0, 40, 6)} fill={theme.primary} opacity={0.4} />
          <path
            d={wavePoints(2, 30, 8)}
            fill={theme.secondary}
            opacity={0.3}
          />
          <path d={wavePoints(4, 20, 10)} fill={theme.accent} opacity={0.2} />
        </svg>
      </div>
    );
  }

  // fallback: solid bg
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        background: theme.bg,
        zIndex: 0,
      }}
    />
  );
};
