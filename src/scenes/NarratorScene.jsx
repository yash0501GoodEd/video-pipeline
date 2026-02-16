import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import { Background } from "../components/Background";
import { AnimatedText } from "../components/AnimatedText";

/**
 * NarratorScene - Single speaker explanation with optional visual cue.
 */
export const NarratorScene = ({ scene, theme, characters }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const lines = scene.lines || [];
  const visualCue = scene.visualCue;

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
      <Background variant="gradient" theme={theme} />

      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "80px 100px",
          gap: 30,
          zIndex: 5,
        }}
      >
        {/* Visual cue icon */}
        {visualCue && (
          <div
            style={{
              fontSize: 72,
              opacity: interpolate(frame, [0, 15], [0, 1], {
                extrapolateRight: "clamp",
              }),
              transform: `scale(${interpolate(
                spring({
                  frame,
                  fps,
                  config: { damping: 8, stiffness: 150 },
                }),
                [0, 1],
                [0.5, 1]
              )})`,
              marginBottom: 20,
            }}
          >
            {visualCue}
          </div>
        )}

        {lines.map((line, i) => {
          const char = characters.find((c) => c.name === line.speaker);
          const speakerColor =
            char?.color || theme.speaker[char?.role] || theme.primary;
          const startFrame = lineOffset;
          const wordCount = line.text.split(/\s+/).length;
          const lineDuration = Math.ceil((wordCount / 2.8) * fps) + 12;
          lineOffset += lineDuration;

          const textVariants = ["fadeUp", "typewriter", "wordPop"];

          return (
            <div
              key={i}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 8,
                opacity: interpolate(
                  frame,
                  [startFrame, startFrame + 8],
                  [0, 1],
                  { extrapolateRight: "clamp", extrapolateLeft: "clamp" }
                ),
              }}
            >
              {char && (
                <span
                  style={{
                    color: speakerColor,
                    fontSize: 16,
                    fontWeight: 700,
                    fontFamily: "'Inter', sans-serif",
                    letterSpacing: 2,
                    textTransform: "uppercase",
                    opacity: 0.7,
                  }}
                >
                  {line.speaker}
                </span>
              )}
              <AnimatedText
                text={line.text}
                color={theme.text}
                fontSize={38}
                variant={textVariants[i % textVariants.length]}
                startDelay={startFrame}
                fontWeight={500}
                maxWidth={1500}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
