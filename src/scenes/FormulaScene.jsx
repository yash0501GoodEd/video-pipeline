import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import { Background } from "../components/Background";
import { AnimatedText } from "../components/AnimatedText";
import { FormulaDisplay } from "../components/FormulaDisplay";

/**
 * FormulaScene - Mathematical formula display with animated entry.
 */
export const FormulaScene = ({ scene, theme, characters }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const lines = scene.lines || [];
  const formulas = scene.formulas || [];
  const formulaStyle = scene.style || "clean";

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
      <Background
        variant={formulaStyle === "neon" ? "grid" : "gradient"}
        theme={theme}
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
        {/* Speaker lines before formulas */}
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

        {/* Formula cards */}
        <FormulaDisplay
          formulas={formulas}
          style={formulaStyle}
          theme={theme}
          startDelay={lineOffset}
        />
      </div>
    </div>
  );
};
