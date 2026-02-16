import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import { Background } from "../components/Background";
import { AnimatedText } from "../components/AnimatedText";

/**
 * OutroScene - End card with CTA and next video teaser.
 */
export const OutroScene = ({ scene, theme, characters }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const lines = scene.lines || [];
  const ctaText = scene.ctaText || "Subscribe for more!";
  const nextVideoTeaser = scene.nextVideoTeaser;

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
      <Background variant="waves" theme={theme} />

      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "80px 80px",
          gap: 30,
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
                fontSize={34}
                variant="slideIn"
                startDelay={startFrame}
                fontWeight={500}
                maxWidth={1300}
              />
            </div>
          );
        })}

        {/* CTA Button */}
        <div
          style={{
            marginTop: 20,
            opacity: interpolate(
              frame,
              [lineOffset, lineOffset + 15],
              [0, 1],
              { extrapolateRight: "clamp", extrapolateLeft: "clamp" }
            ),
            transform: `scale(${interpolate(
              spring({
                frame: Math.max(0, frame - lineOffset),
                fps,
                config: { damping: 8, stiffness: 150 },
              }),
              [0, 1],
              [0.7, 1]
            )})`,
          }}
        >
          <div
            style={{
              background: theme.accent,
              borderRadius: 16,
              padding: "18px 48px",
              boxShadow: `0 4px 30px ${theme.accent}44`,
            }}
          >
            <span
              style={{
                color: theme.bg,
                fontSize: 28,
                fontWeight: 800,
                fontFamily: "'Inter', sans-serif",
                letterSpacing: 1,
              }}
            >
              🔔 {ctaText}
            </span>
          </div>
        </div>

        {/* Next video teaser */}
        {nextVideoTeaser && (
          <div
            style={{
              marginTop: 10,
              opacity: interpolate(
                frame,
                [lineOffset + 15, lineOffset + 30],
                [0, 1],
                { extrapolateRight: "clamp", extrapolateLeft: "clamp" }
              ),
            }}
          >
            <div
              style={{
                background: `${theme.surface}cc`,
                border: `1px solid ${theme.primary}33`,
                borderRadius: 12,
                padding: "14px 28px",
              }}
            >
              <span
                style={{
                  color: theme.secondary,
                  fontSize: 22,
                  fontWeight: 500,
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                ▶️ Next: {nextVideoTeaser}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
