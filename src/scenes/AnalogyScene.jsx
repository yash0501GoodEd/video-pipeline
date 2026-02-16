import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import { Background } from "../components/Background";
import { AnimatedText } from "../components/AnimatedText";

/**
 * AnalogyScene - Visual analogy with comparison cards.
 */
export const AnalogyScene = ({ scene, theme, characters }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const lines = scene.lines || [];
  const comparison = scene.comparison;
  const analogyIcon = scene.analogyIcon || "💡";
  const analogyTitle = scene.analogyTitle || "";

  let lineOffset = 8;

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        overflow: "hidden",
      }}
    >
      <Background variant="particles" theme={theme} />

      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "60px 80px",
          gap: 24,
          zIndex: 5,
        }}
      >
        {/* Analogy header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            opacity: interpolate(frame, [0, 12], [0, 1], {
              extrapolateRight: "clamp",
            }),
          }}
        >
          <span style={{ fontSize: 48 }}>{analogyIcon}</span>
          <span
            style={{
              color: theme.accent,
              fontSize: 28,
              fontWeight: 800,
              fontFamily: "'Inter', sans-serif",
              letterSpacing: 2,
              textTransform: "uppercase",
            }}
          >
            {analogyTitle}
          </span>
        </div>

        {/* Comparison cards */}
        {comparison && (
          <div
            style={{
              display: "flex",
              gap: 40,
              marginTop: 20,
              marginBottom: 20,
            }}
          >
            {/* Left card */}
            <div
              style={{
                background: `${theme.surface}dd`,
                border: `2px solid ${theme.primary}55`,
                borderRadius: 16,
                padding: "24px 36px",
                minWidth: 300,
                textAlign: "center",
                opacity: interpolate(frame, [10, 25], [0, 1], {
                  extrapolateRight: "clamp",
                  extrapolateLeft: "clamp",
                }),
                transform: `translateX(${interpolate(
                  spring({
                    frame: Math.max(0, frame - 10),
                    fps,
                    config: { damping: 200 },
                  }),
                  [0, 1],
                  [-80, 0]
                )}px)`,
              }}
            >
              <div
                style={{
                  color: theme.textMuted,
                  fontSize: 14,
                  fontWeight: 700,
                  letterSpacing: 2,
                  textTransform: "uppercase",
                  marginBottom: 10,
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                {comparison.leftLabel}
              </div>
              <div
                style={{
                  color: theme.primary,
                  fontSize: 26,
                  fontWeight: 700,
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                {comparison.left}
              </div>
            </div>

            {/* VS divider */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                opacity: interpolate(frame, [20, 30], [0, 1], {
                  extrapolateRight: "clamp",
                  extrapolateLeft: "clamp",
                }),
              }}
            >
              <span
                style={{
                  color: theme.accent,
                  fontSize: 32,
                  fontWeight: 800,
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                ⇔
              </span>
            </div>

            {/* Right card */}
            <div
              style={{
                background: `${theme.surface}dd`,
                border: `2px solid ${theme.secondary}55`,
                borderRadius: 16,
                padding: "24px 36px",
                minWidth: 300,
                textAlign: "center",
                opacity: interpolate(frame, [15, 30], [0, 1], {
                  extrapolateRight: "clamp",
                  extrapolateLeft: "clamp",
                }),
                transform: `translateX(${interpolate(
                  spring({
                    frame: Math.max(0, frame - 15),
                    fps,
                    config: { damping: 200 },
                  }),
                  [0, 1],
                  [80, 0]
                )}px)`,
              }}
            >
              <div
                style={{
                  color: theme.textMuted,
                  fontSize: 14,
                  fontWeight: 700,
                  letterSpacing: 2,
                  textTransform: "uppercase",
                  marginBottom: 10,
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                {comparison.rightLabel}
              </div>
              <div
                style={{
                  color: theme.secondary,
                  fontSize: 26,
                  fontWeight: 700,
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                {comparison.right}
              </div>
            </div>
          </div>
        )}

        {/* Dialogue lines */}
        {lines.map((line, i) => {
          const char = characters.find((c) => c.name === line.speaker);
          const speakerColor =
            char?.color || theme.speaker[char?.role] || theme.primary;
          const startFrame = lineOffset;
          const wordCount = line.text.split(/\s+/).length;
          const lineDuration = Math.ceil((wordCount / 2.8) * fps) + 12;
          lineOffset += lineDuration;

          return (
            <div
              key={i}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 6,
                opacity: interpolate(
                  frame,
                  [startFrame, startFrame + 8],
                  [0, 1],
                  { extrapolateRight: "clamp", extrapolateLeft: "clamp" }
                ),
              }}
            >
              <span
                style={{
                  color: speakerColor,
                  fontSize: 15,
                  fontWeight: 700,
                  fontFamily: "'Inter', sans-serif",
                  letterSpacing: 1.5,
                  textTransform: "uppercase",
                  opacity: 0.7,
                }}
              >
                {line.speaker}
              </span>
              <AnimatedText
                text={line.text}
                color={theme.text}
                fontSize={34}
                variant="fadeUp"
                startDelay={startFrame}
                fontWeight={500}
                maxWidth={1400}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
