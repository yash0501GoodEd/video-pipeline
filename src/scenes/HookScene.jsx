import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import { Background } from "../components/Background";
import { SpeakerLabel } from "../components/SpeakerLabel";
import { AnimatedText } from "../components/AnimatedText";

/**
 * HookScene - Attention-grabbing opener.
 * First scene of every video. Big text, dramatic entry.
 */
export const HookScene = ({ scene, theme, characters }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const bgVariant = scene.backgroundVariant || "gradient";
  const lines = scene.lines || [];

  // Accumulate frame offsets for each line
  let lineOffset = 10;

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        overflow: "hidden",
      }}
    >
      <Background variant={bgVariant} theme={theme} />

      {/* Dramatic hook indicator */}
      {/* <div
        style={{
          position: "absolute",
          top: 40,
          right: 40,
          opacity: interpolate(frame, [0, 15], [0, 1], {
            extrapolateRight: "clamp",
          }),
          zIndex: 10,
        }}
      >
        <div
          style={{
            background: `${theme.accent}22`,
            border: `1px solid ${theme.accent}66`,
            borderRadius: 8,
            padding: "6px 18px",
          }}
        >
          <span
            style={{
              color: theme.accent,
              fontSize: 14,
              fontWeight: 700,
              fontFamily: "'Inter', sans-serif",
              letterSpacing: 2,
              textTransform: "uppercase",
            }}
          >
            🎯 HOOK
          </span>
        </div>
      </div> */}

      {/* Lines container */}
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
        {lines.map((line, i) => {
          const char = characters.find((c) => c.name === line.speaker);
          const startFrame = lineOffset;
          const wordCount = line.text.split(/\s+/).length;
          const lineDuration = Math.ceil((wordCount / 2.8) * fps) + 15;
          lineOffset += lineDuration;

          // Text animation variants cycle through
          const textVariants = ["fadeUp", "wordPop", "slideIn", "typewriter"];
          const variant = textVariants[i % textVariants.length];

          return (
            <div
              key={i}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 12,
                opacity: interpolate(
                  frame,
                  [startFrame, startFrame + 8],
                  [0, 1],
                  { extrapolateRight: "clamp", extrapolateLeft: "clamp" }
                ),
              }}
            >
              {/* Speaker name above text */}
              {char && (
                <span
                  style={{
                    color: char.color || theme.speaker[char.role] || theme.primary,
                    fontSize: 18,
                    fontWeight: 700,
                    fontFamily: "'Inter', sans-serif",
                    letterSpacing: 2,
                    textTransform: "uppercase",
                    opacity: interpolate(
                      frame,
                      [startFrame, startFrame + 10],
                      [0, 0.7],
                      { extrapolateRight: "clamp", extrapolateLeft: "clamp" }
                    ),
                  }}
                >
                  {line.speaker}
                </span>
              )}
              <AnimatedText
                text={line.text}
                color={theme.text}
                fontSize={i === 0 ? 52 : 40}
                variant={variant}
                startDelay={startFrame}
                fontWeight={i === 0 ? 800 : 600}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
