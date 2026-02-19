import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import { Background } from "../components/Background";
import { AnimatedText } from "../components/AnimatedText";
import { PYQCard } from "../components/PYQCard";

/**
 * PYQScene - Previous Year Question challenge scene.
 */
export const PYQScene = ({ scene, theme, characters }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const lines = scene.lines || [];

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

      {/* PYQ Banner */}
      {/* <div
        style={{
          position: "absolute",
          top: 100,
          left: "50%",
          transform: "translateX(-50%)",
          opacity: interpolate(frame, [0, 10], [0, 1], {
            extrapolateRight: "clamp",
          }),
          zIndex: 10,
        }}
      >
        <div
          style={{
            background: `${theme.accent}22`,
            border: `1px solid ${theme.accent}66`,
            borderRadius: 30,
            padding: "8px 28px",
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <span style={{ fontSize: 20 }}>🎯</span>
          <span
            style={{
              color: theme.accent,
              fontSize: 16,
              fontWeight: 700,
              fontFamily: "'Inter', sans-serif",
              letterSpacing: 2,
              textTransform: "uppercase",
            }}
          >
            PYQ CHALLENGE
          </span>
        </div>
      </div> */}

      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "80px 80px",
          gap: 24,
          zIndex: 5,
        }}
      >
        {/* Question card */}
        <PYQCard
          year={scene.year}
          exam={scene.exam}
          question={scene.question}
          questionImage={scene.questionImage}
          options={scene.options}
          solution={scene.solution}
          theme={theme}
          startDelay={5}
        />

        {/* Speaker reactions */}
        {lines.map((line, i) => {
          const char = characters.find((c) => c.name === line.speaker);
          const speakerColor =
            char?.color || theme.speaker[char?.role] || theme.primary;
          const startFrame = lineOffset + 40; // After question reveals
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
                fontSize={30}
                variant="fadeUp"
                startDelay={startFrame}
                fontWeight={500}
                maxWidth={1200}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
