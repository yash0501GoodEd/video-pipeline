import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import { Background } from "../components/Background";
import { AnimatedText } from "../components/AnimatedText";

/**
 * DialogueScene - Two-character conversation.
 * Lines alternate between speakers with visual distinction.
 */
export const DialogueScene = ({ scene, theme, characters }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const lines = scene.lines || [];
  const layoutVariant = scene.layoutVariant || 0;

  // Different layout arrangements
  const layouts = [
    "split",      // left-right split
    "stacked",    // centered stacked
    "chatBubble", // messenger-style
    "spotlight",  // one speaker highlighted at a time
  ];
  const layout = layouts[layoutVariant % layouts.length];

  let lineOffset = 5;

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
          alignItems: layout === "chatBubble" ? "stretch" : "center",
          padding: layout === "chatBubble" ? "80px 60px" : "80px 80px",
          gap: layout === "chatBubble" ? 16 : 28,
          zIndex: 5,
        }}
      >
        {lines.map((line, i) => {
          const char = characters.find((c) => c.name === line.speaker);
          const speakerColor =
            char?.color || theme.speaker[char?.role] || theme.primary;
          const isTeacher = char?.role === "teacher";
          const startFrame = lineOffset;
          const wordCount = line.text.split(/\s+/).length;
          const lineDuration = Math.ceil((wordCount / 2.8) * fps) + 12;
          lineOffset += lineDuration;

          const entryOpacity = interpolate(
            frame,
            [startFrame, startFrame + 10],
            [0, 1],
            { extrapolateRight: "clamp", extrapolateLeft: "clamp" }
          );

          if (layout === "chatBubble") {
            return (
              <div
                key={i}
                style={{
                  display: "flex",
                  flexDirection: isTeacher ? "row" : "row-reverse",
                  alignItems: "flex-start",
                  gap: 16,
                  opacity: entryOpacity,
                }}
              >
                {/* Avatar */}
                <div
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: "50%",
                    background: `${speakerColor}22`,
                    border: `2px solid ${speakerColor}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 24,
                    flexShrink: 0,
                  }}
                >
                  {isTeacher ? "👨‍🏫" : "🎓"}
                </div>
                {/* Bubble */}
                <div
                  style={{
                    background: isTeacher
                      ? `${theme.surface}dd`
                      : `${speakerColor}15`,
                    border: `1px solid ${speakerColor}44`,
                    borderRadius: 16,
                    borderTopLeftRadius: isTeacher ? 4 : 16,
                    borderTopRightRadius: isTeacher ? 16 : 4,
                    padding: "16px 24px",
                    maxWidth: "75%",
                  }}
                >
                  <span
                    style={{
                      color: speakerColor,
                      fontSize: 14,
                      fontWeight: 700,
                      fontFamily: "'Inter', sans-serif",
                      letterSpacing: 1,
                      display: "block",
                      marginBottom: 6,
                    }}
                  >
                    {line.speaker}
                  </span>
                  <AnimatedText
                    text={line.text}
                    color={theme.text}
                    fontSize={26}
                    variant="fadeUp"
                    startDelay={startFrame}
                    textAlign={isTeacher ? "left" : "right"}
                    fontWeight={500}
                  />
                </div>
              </div>
            );
          }

          // Default: stacked/centered layout
          return (
            <div
              key={i}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 8,
                opacity: entryOpacity,
                maxWidth: 1400,
              }}
            >
              <span
                style={{
                  color: speakerColor,
                  fontSize: 16,
                  fontWeight: 700,
                  fontFamily: "'Inter', sans-serif",
                  letterSpacing: 2,
                  textTransform: "uppercase",
                }}
              >
                {line.speaker}
              </span>
              <AnimatedText
                text={line.text}
                color={theme.text}
                fontSize={36}
                variant={i % 2 === 0 ? "fadeUp" : "slideIn"}
                startDelay={startFrame}
                fontWeight={500}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
