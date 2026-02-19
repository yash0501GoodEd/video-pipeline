import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate, spring, Img, staticFile } from "remotion";

/**
 * PYQCard - Previous Year Question card with animated reveal.
 * Supports an optional `questionImage` field (local path or URL) rendered
 * between the question text and answer options.
 */
export const PYQCard = ({
  year,
  exam = "NEET",
  question,
  questionImage,
  options = [],
  solution,
  theme,
  startDelay = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const cardEntry = spring({
    frame: Math.max(0, frame - startDelay),
    fps,
    config: { damping: 15, stiffness: 100 },
  });

  const cardScale = interpolate(cardEntry, [0, 1], [0.85, 1]);
  const cardOpacity = interpolate(cardEntry, [0, 1], [0, 1]);

  return (
    <div
      style={{
        background: `${theme.surface}ee`,
        border: `2px solid ${theme.primary}55`,
        borderRadius: 20,
        padding: "30px 40px",
        maxWidth: 1200,
        width: "100%",
        transform: `scale(${cardScale})`,
        opacity: cardOpacity,
        boxShadow: `0 8px 40px ${theme.primary}22`,
      }}
    >
      {/* Header Badge */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          marginBottom: 20,
        }}
      >
        <div
          style={{
            background: `${theme.accent}22`,
            border: `1px solid ${theme.accent}66`,
            borderRadius: 8,
            padding: "6px 16px",
          }}
        >
          <span
            style={{
              color: theme.accent,
              fontSize: 28,
              fontWeight: 700,
              fontFamily: "'Inter', sans-serif",
              letterSpacing: 1,
            }}
          >
            📝 {exam} {year}
          </span>
        </div>
        <div
          style={{
            background: `${theme.primary}22`,
            borderRadius: 8,
            padding: "6px 16px",
          }}
        >
          <span
            style={{
              color: theme.primary,
              fontSize: 28,
              fontWeight: 600,
              fontFamily: "'Inter', sans-serif",
            }}
          >
            Previous Year Question
          </span>
        </div>
      </div>

      {/* Question */}
      <div
        style={{
          color: theme.text,
          fontSize: 48,
          fontWeight: 600,
          fontFamily: "'Inter', sans-serif",
          lineHeight: 1.5,
          marginBottom: questionImage ? 16 : options.length > 0 ? 24 : 0,
        }}
      >
        {question}
      </div>

      {/* Question Image */}
      {questionImage && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: options.length > 0 ? 24 : 0,
            opacity: interpolate(
              frame,
              [startDelay + 8, startDelay + 20],
              [0, 1],
              { extrapolateRight: "clamp", extrapolateLeft: "clamp" }
            ),
            transform: `scale(${interpolate(
              spring({ frame: Math.max(0, frame - startDelay - 8), fps, config: { damping: 15, stiffness: 120 } }),
              [0, 1],
              [0.9, 1]
            )})`,
          }}
        >
          <Img
            src={questionImage.startsWith("http") ? questionImage : staticFile(questionImage)}
            style={{
              maxWidth: "100%",
              maxHeight: 300,
              objectFit: "contain",
              borderRadius: 12,
              border: `1px solid ${theme.primary}33`,
            }}
          />
        </div>
      )}

      {/* Options */}
      {options.length > 0 && (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {options.map((opt, i) => {
            const optDelay = startDelay + 15 + i * 8;
            const optEntry = spring({
              frame: Math.max(0, frame - optDelay),
              fps,
              config: { damping: 200 },
            });

            const optX = interpolate(optEntry, [0, 1], [40, 0]);
            const optOpacity = interpolate(optEntry, [0, 1], [0, 1]);

            // Reveal correct answer after all options shown
            const revealDelay = startDelay + 15 + options.length * 8 + 30;
            const isRevealTime = frame > revealDelay;
            const isCorrect = opt.isCorrect;

            return (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                  background:
                    isRevealTime && isCorrect
                      ? `${theme.accent}22`
                      : `${theme.bg}88`,
                  border: `1px solid ${
                    isRevealTime && isCorrect
                      ? theme.accent
                      : theme.textMuted + "33"
                  }`,
                  borderRadius: 12,
                  padding: "12px 20px",
                  transform: `translateX(${optX}px)`,
                  opacity: optOpacity,
                  transition: "none", // CSS transitions forbidden in Remotion
                }}
              >
                <span
                  style={{
                    color:
                      isRevealTime && isCorrect ? theme.accent : theme.textMuted,
                    fontSize: 30,
                    fontWeight: 700,
                    fontFamily: "'Inter', sans-serif",
                    minWidth: 30,
                  }}
                >
                  {opt.label}
                </span>
                <span
                  style={{
                    color:
                      isRevealTime && isCorrect ? theme.accent : theme.text,
                    fontSize: 36,
                    fontWeight: 500,
                    fontFamily: "'Inter', sans-serif",
                  }}
                >
                  {opt.text}
                </span>
                {isRevealTime && isCorrect && (
                  <span style={{ fontSize: 24, marginLeft: "auto" }}>✅</span>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Solution */}
      {solution && frame > startDelay + 60 && (
        <div
          style={{
            marginTop: 20,
            padding: "16px 24px",
            background: `${theme.primary}11`,
            border: `1px solid ${theme.primary}33`,
            borderRadius: 12,
            color: theme.secondary,
            fontSize: 22,
            fontWeight: 500,
            fontFamily: "'Inter', sans-serif",
            lineHeight: 1.5,
            opacity: interpolate(
              frame,
              [startDelay + 60, startDelay + 75],
              [0, 1],
              { extrapolateRight: "clamp", extrapolateLeft: "clamp" }
            ),
          }}
        >
          💡 {solution}
        </div>
      )}
    </div>
  );
};
