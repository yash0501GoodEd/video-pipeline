import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import { Background } from "../components/Background";
import { AnimatedText } from "../components/AnimatedText";
import { TrapBadge } from "../components/TrapBadge";

/**
 * TrapAlertScene - Warning scene for common NEET traps.
 */
export const TrapAlertScene = ({ scene, theme, characters }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const lines = scene.lines || [];
  const trapDescription = scene.trapDescription || "";
  const correctApproach = scene.correctApproach;

  let lineOffset = 25; // Start after badge animation

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        overflow: "hidden",
      }}
    >
      <Background variant="gradient" theme={theme} />

      {/* Red overlay flash */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `${theme.trapBg}`,
          opacity: interpolate(frame, [0, 8, 15], [0.4, 0.15, 0.05], {
            extrapolateRight: "clamp",
          }),
          zIndex: 2,
        }}
      />

      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "60px 80px",
          gap: 30,
          zIndex: 5,
        }}
      >
        {/* Trap badge */}
        <TrapBadge theme={theme} startDelay={0} />

        {/* Trap description card */}
        <div
          style={{
            background: `${theme.trapBg}15`,
            border: `2px solid ${theme.trapBg}55`,
            borderRadius: 16,
            padding: "20px 36px",
            maxWidth: 1200,
            opacity: interpolate(frame, [15, 25], [0, 1], {
              extrapolateRight: "clamp",
              extrapolateLeft: "clamp",
            }),
          }}
        >
          <AnimatedText
            text={trapDescription}
            color="#ff8a80"
            fontSize={30}
            variant="typewriter"
            startDelay={18}
            fontWeight={600}
            maxWidth={1100}
          />
        </div>

        {/* Speaker lines */}
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

        {/* Correct approach */}
        {correctApproach && (
          <div
            style={{
              background: `${theme.accent}15`,
              border: `1px solid ${theme.accent}44`,
              borderRadius: 12,
              padding: "16px 28px",
              maxWidth: 1100,
              opacity: interpolate(
                frame,
                [lineOffset + 5, lineOffset + 20],
                [0, 1],
                { extrapolateRight: "clamp", extrapolateLeft: "clamp" }
              ),
            }}
          >
            <span
              style={{
                color: theme.accent,
                fontSize: 24,
                fontWeight: 600,
                fontFamily: "'Inter', sans-serif",
                lineHeight: 1.5,
              }}
            >
              ✅ {correctApproach}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
