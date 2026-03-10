import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";

/**
 * OptionAnalysisCard — Detailed analysis of a single option.
 *
 * Shows:
 *   - Verdict badge (✅ CORRECT / ❌ INCORRECT)
 *   - Option number and text
 *   - Detailed reasoning with fade-in
 *   - Optional key fact / clinical pearl
 */
export const OptionAnalysisCard = ({
  optionNumber,
  optionText,
  isCorrect,
  reasoning,
  keyFact,
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

  const verdictColor = isCorrect ? "#4caf50" : "#f44336";
  const verdictBg = isCorrect ? "#4caf5015" : "#f4433615";
  const verdictBorder = isCorrect ? "#4caf5055" : "#f4433655";
  const verdictIcon = isCorrect ? "✅" : "❌";
  const verdictLabel = isCorrect ? "CORRECT" : "INCORRECT";

  return (
    <div
      style={{
        background: `${theme.surface}ee`,
        border: `2px solid ${verdictBorder}`,
        borderRadius: 20,
        padding: "28px 36px",
        maxWidth: 1400,
        width: "100%",
        transform: `scale(${cardScale})`,
        opacity: cardOpacity,
        boxShadow: `0 8px 40px ${verdictColor}22`,
      }}
    >
      {/* Verdict Badge */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 14,
          marginBottom: 20,
        }}
      >
        <div
          style={{
            background: verdictBg,
            border: `2px solid ${verdictBorder}`,
            borderRadius: 12,
            padding: "8px 20px",
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <span style={{ fontSize: 24 }}>{verdictIcon}</span>
          <span
            style={{
              color: verdictColor,
              fontSize: 22,
              fontWeight: 800,
              fontFamily: "'Inter', sans-serif",
              letterSpacing: 2,
            }}
          >
            {verdictLabel}
          </span>
        </div>
        <span
          style={{
            color: theme.textMuted,
            fontSize: 20,
            fontWeight: 600,
            fontFamily: "'Inter', sans-serif",
          }}
        >
          Option {optionNumber}
        </span>
      </div>

      {/* Option Text */}
      <div
        style={{
          color: theme.text,
          fontSize: 34,
          fontWeight: 700,
          fontFamily: "'Inter', sans-serif",
          lineHeight: 1.4,
          marginBottom: 20,
          paddingBottom: 16,
          borderBottom: `1px solid ${theme.textMuted}22`,
        }}
      >
        {optionText}
      </div>

      {/* Reasoning */}
      <div
        style={{
          color: theme.text,
          fontSize: 28,
          fontWeight: 500,
          fontFamily: "'Inter', sans-serif",
          lineHeight: 1.6,
          opacity: interpolate(
            frame,
            [startDelay + 10, startDelay + 22],
            [0, 1],
            { extrapolateRight: "clamp", extrapolateLeft: "clamp" }
          ),
        }}
      >
        {reasoning}
      </div>

      {/* Key Fact */}
      {keyFact && (
        <div
          style={{
            marginTop: 18,
            padding: "14px 22px",
            background: `${theme.accent}11`,
            border: `1px solid ${theme.accent}33`,
            borderRadius: 12,
            display: "flex",
            alignItems: "flex-start",
            gap: 10,
            opacity: interpolate(
              frame,
              [startDelay + 20, startDelay + 32],
              [0, 1],
              { extrapolateRight: "clamp", extrapolateLeft: "clamp" }
            ),
          }}
        >
          <span style={{ fontSize: 20, marginTop: 2 }}>💡</span>
          <span
            style={{
              color: theme.accent,
              fontSize: 24,
              fontWeight: 600,
              fontFamily: "'Inter', sans-serif",
              lineHeight: 1.5,
            }}
          >
            {keyFact}
          </span>
        </div>
      )}
    </div>
  );
};
