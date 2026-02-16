import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import { Background } from "../components/Background";
import { AnimatedText } from "../components/AnimatedText";

/**
 * CalculationScene - Step-by-step calculation walkthrough.
 */
export const CalculationScene = ({ scene, theme, characters }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const lines = scene.lines || [];
  const steps = scene.steps || [];

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
      <Background variant="grid" theme={theme} />

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
        {/* Speaker lines */}
        {lines.map((line, i) => {
          const char = characters.find((c) => c.name === line.speaker);
          const speakerColor =
            char?.color || theme.speaker[char?.role] || theme.primary;
          const startFrame = lineOffset;
          const wordCount = line.text.split(/\s+/).length;
          const lineDuration = Math.ceil((wordCount / 2.8) * fps) + 10;
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
                }}
              >
                {line.speaker}
              </span>
              <AnimatedText
                text={line.text}
                color={theme.text}
                fontSize={32}
                variant="fadeUp"
                startDelay={startFrame}
                fontWeight={500}
                maxWidth={1400}
              />
            </div>
          );
        })}

        {/* Calculation steps */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 16,
            maxWidth: 1200,
            width: "100%",
          }}
        >
          {steps.map((step, i) => {
            const delay = lineOffset + i * 18;
            const entry = spring({
              frame: Math.max(0, frame - delay),
              fps,
              config: { damping: 15, stiffness: 120 },
            });

            const opacity = interpolate(entry, [0, 1], [0, 1]);
            const x = interpolate(entry, [0, 1], [50, 0]);

            return (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 20,
                  background: `${theme.surface}dd`,
                  border: `1px solid ${theme.primary}33`,
                  borderRadius: 14,
                  padding: "16px 28px",
                  opacity,
                  transform: `translateX(${x}px)`,
                }}
              >
                {/* Step number */}
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    background: `${theme.accent}22`,
                    border: `2px solid ${theme.accent}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <span
                    style={{
                      color: theme.accent,
                      fontSize: 18,
                      fontWeight: 800,
                      fontFamily: "'Inter', sans-serif",
                    }}
                  >
                    {i + 1}
                  </span>
                </div>

                {/* Step content */}
                <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                  <span
                    style={{
                      color: theme.textMuted,
                      fontSize: 16,
                      fontWeight: 600,
                      fontFamily: "'Inter', sans-serif",
                      textTransform: "uppercase",
                      letterSpacing: 1,
                    }}
                  >
                    {step.label}
                  </span>
                  <span
                    style={{
                      color: theme.accent,
                      fontSize: 28,
                      fontWeight: 700,
                      fontFamily: "'Inter', monospace",
                    }}
                  >
                    {step.expression}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
