import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";

/**
 * HighlightedText — Renders question text with certain keywords
 * visually highlighted using the theme accent color.
 */
const HighlightedText = ({ text, highlights, theme }) => {
  if (!highlights || highlights.length === 0) {
    return <span>{text}</span>;
  }

  const pattern = highlights
    .map((h) => h.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
    .join("|");
  const regex = new RegExp(`(${pattern})`, "gi");
  const parts = text.split(regex);

  return (
    <>
      {parts.map((part, i) => {
        const isHighlighted = highlights.some(
          (h) => h.toLowerCase() === part.toLowerCase()
        );
        if (isHighlighted) {
          return (
            <span
              key={i}
              style={{
                color: theme.accent,
                fontWeight: 700,
                background: `${theme.accent}15`,
                borderRadius: 4,
                padding: "0 4px",
              }}
            >
              {part}
            </span>
          );
        }
        return <span key={i}>{part}</span>;
      })}
    </>
  );
};

/**
 * QuestionCard — NEET PG clinical question display.
 *
 * Features:
 *   - Exam/Year badge header
 *   - Clinical vignette with keyword highlighting
 *   - Numbered options with staggered reveal
 *   - Correct/incorrect answer reveal after delay
 *   - Analytics bars showing student response distribution
 */
export const QuestionCard = ({
  exam = "NEET PG",
  year,
  question,
  options = [],
  highlights = [],
  analytics,
  theme,
  startDelay = 0,
  answerRevealDelay = 45,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const cardEntry = spring({
    frame: Math.max(0, frame - startDelay),
    fps,
    config: { damping: 15, stiffness: 100 },
  });

  const cardScale = interpolate(cardEntry, [0, 1], [0.9, 1]);
  const cardOpacity = interpolate(cardEntry, [0, 1], [0, 1]);

  return (
    <div
      style={{
        background: `${theme.surface}ee`,
        border: `2px solid ${theme.primary}44`,
        borderRadius: 20,
        padding: "28px 36px",
        maxWidth: 1400,
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
          marginBottom: 16,
        }}
      >
        <div
          style={{
            background: `${theme.accent}22`,
            border: `1px solid ${theme.accent}55`,
            borderRadius: 8,
            padding: "5px 14px",
          }}
        >
          <span
            style={{
              color: theme.accent,
              fontSize: 22,
              fontWeight: 700,
              fontFamily: "'Inter', sans-serif",
            }}
          >
            📋 {exam} {year}
          </span>
        </div>
      </div>

      {/* Question Text with Highlights */}
      <div
        style={{
          color: theme.text,
          fontSize: 30,
          fontWeight: 500,
          fontFamily: "'Inter', sans-serif",
          lineHeight: 1.55,
          marginBottom: 20,
        }}
      >
        <HighlightedText
          text={question}
          highlights={highlights}
          theme={theme}
        />
      </div>

      {/* Options */}
      {options.length > 0 && (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {options.map((opt, i) => {
            const optDelay = startDelay + 12 + i * 6;
            const optEntry = spring({
              frame: Math.max(0, frame - optDelay),
              fps,
              config: { damping: 200 },
            });

            const optX = interpolate(optEntry, [0, 1], [30, 0]);
            const optOpacity = interpolate(optEntry, [0, 1], [0, 1]);

            const revealDelay = startDelay + answerRevealDelay;
            const isRevealTime = frame > revealDelay;
            const isCorrect = opt.isCorrect;

            return (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  background:
                    isRevealTime && isCorrect
                      ? `${theme.accent}22`
                      : isRevealTime && !isCorrect
                        ? `#f4433608`
                        : `${theme.bg}88`,
                  border: `1px solid ${
                    isRevealTime && isCorrect
                      ? theme.accent
                      : isRevealTime && !isCorrect
                        ? "#f4433633"
                        : theme.textMuted + "33"
                  }`,
                  borderRadius: 12,
                  padding: "10px 18px",
                  transform: `translateX(${optX}px)`,
                  opacity: optOpacity,
                }}
              >
                <span
                  style={{
                    color:
                      isRevealTime && isCorrect
                        ? theme.accent
                        : isRevealTime && !isCorrect
                          ? "#f44336"
                          : theme.textMuted,
                    fontSize: 26,
                    fontWeight: 700,
                    fontFamily: "'Inter', sans-serif",
                    minWidth: 26,
                  }}
                >
                  {opt.number}.
                </span>
                <span
                  style={{
                    color:
                      isRevealTime && isCorrect
                        ? theme.accent
                        : isRevealTime && !isCorrect
                          ? theme.textMuted
                          : theme.text,
                    fontSize: 28,
                    fontWeight: isRevealTime && isCorrect ? 700 : 500,
                    fontFamily: "'Inter', sans-serif",
                    flex: 1,
                  }}
                >
                  {opt.text}
                </span>
                {isRevealTime && isCorrect && (
                  <span style={{ fontSize: 22 }}>✅</span>
                )}
                {isRevealTime && !isCorrect && (
                  <span style={{ fontSize: 22, opacity: 0.5 }}>❌</span>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Analytics Bars */}
      {analytics && frame > startDelay + answerRevealDelay + 10 && (
        <div
          style={{
            marginTop: 16,
            padding: "14px 20px",
            background: `${theme.bg}66`,
            borderRadius: 12,
            opacity: interpolate(
              frame,
              [
                startDelay + answerRevealDelay + 10,
                startDelay + answerRevealDelay + 22,
              ],
              [0, 1],
              { extrapolateRight: "clamp", extrapolateLeft: "clamp" }
            ),
          }}
        >
          <div
            style={{
              color: theme.textMuted,
              fontSize: 16,
              fontWeight: 600,
              fontFamily: "'Inter', sans-serif",
              marginBottom: 10,
              letterSpacing: 1,
              textTransform: "uppercase",
            }}
          >
            📊 Student Response Distribution
          </div>
          {[
            analytics.option1Percentage,
            analytics.option2Percentage,
            analytics.option3Percentage,
            analytics.option4Percentage,
          ].map((pct, i) => {
            const isCorrectOpt = options[i]?.isCorrect;
            const barDelay =
              startDelay + answerRevealDelay + 15 + i * 5;
            const barProgress = spring({
              frame: Math.max(0, frame - barDelay),
              fps,
              config: { damping: 20, stiffness: 80 },
            });
            const barWidth = interpolate(barProgress, [0, 1], [0, pct]);

            return (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  marginBottom: 6,
                }}
              >
                <span
                  style={{
                    color: isCorrectOpt ? theme.accent : theme.textMuted,
                    fontSize: 16,
                    fontWeight: 600,
                    fontFamily: "'Inter', sans-serif",
                    minWidth: 20,
                  }}
                >
                  {i + 1}
                </span>
                <div
                  style={{
                    flex: 1,
                    height: 18,
                    background: `${theme.bg}88`,
                    borderRadius: 9,
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      width: `${barWidth}%`,
                      height: "100%",
                      background: isCorrectOpt
                        ? `linear-gradient(90deg, ${theme.accent}88, ${theme.accent})`
                        : `linear-gradient(90deg, ${theme.textMuted}44, ${theme.textMuted}88)`,
                      borderRadius: 9,
                    }}
                  />
                </div>
                <span
                  style={{
                    color: isCorrectOpt ? theme.accent : theme.textMuted,
                    fontSize: 16,
                    fontWeight: 600,
                    fontFamily: "'Inter', sans-serif",
                    minWidth: 40,
                    textAlign: "right",
                  }}
                >
                  {pct}%
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
