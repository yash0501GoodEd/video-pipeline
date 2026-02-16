import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";

/**
 * FormulaDisplay - Animated formula/equation card.
 * Supports styles: clean, neon, chalk, handwritten
 */
export const FormulaDisplay = ({
  formulas = [],
  style = "clean",
  theme,
  startDelay = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const styleMap = {
    clean: {
      bg: `${theme.surface}ee`,
      border: `${theme.primary}44`,
      fontFamily: "'Inter', monospace",
      shadow: `0 0 30px ${theme.primary}22`,
      labelColor: theme.textMuted,
      exprColor: theme.accent,
    },
    neon: {
      bg: `${theme.bg}dd`,
      border: theme.accent,
      fontFamily: "'Inter', monospace",
      shadow: `0 0 20px ${theme.accent}66, inset 0 0 20px ${theme.accent}11`,
      labelColor: theme.secondary,
      exprColor: theme.accent,
    },
    chalk: {
      bg: "#1a2a1a",
      border: "#3a5a3a",
      fontFamily: "'Inter', serif",
      shadow: "none",
      labelColor: "#ccddcc",
      exprColor: "#ffffff",
    },
    handwritten: {
      bg: "#fffef5",
      border: "#e0d8c0",
      fontFamily: "'Inter', cursive",
      shadow: "2px 2px 8px rgba(0,0,0,0.1)",
      labelColor: "#555",
      exprColor: "#222",
    },
  };

  const s = styleMap[style] || styleMap.clean;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 20,
        alignItems: "center",
        width: "100%",
      }}
    >
      {formulas.map((formula, i) => {
        const delay = startDelay + i * 12;
        const entryProgress = spring({
          frame: Math.max(0, frame - delay),
          fps,
          config: { damping: 15, stiffness: 120 },
        });

        const scale = interpolate(entryProgress, [0, 1], [0.8, 1]);
        const opacity = interpolate(entryProgress, [0, 1], [0, 1]);

        const highlightGlow = formula.highlight
          ? `0 0 40px ${theme.accent}44`
          : "none";

        return (
          <div
            key={i}
            style={{
              background: s.bg,
              border: `2px solid ${formula.highlight ? theme.accent : s.border}`,
              borderRadius: 16,
              padding: "20px 40px",
              boxShadow: `${s.shadow}, ${highlightGlow}`,
              transform: `scale(${scale})`,
              opacity,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 8,
              minWidth: 400,
            }}
          >
            {formula.label && (
              <span
                style={{
                  color: s.labelColor,
                  fontSize: 18,
                  fontWeight: 500,
                  fontFamily: s.fontFamily,
                  textTransform: "uppercase",
                  letterSpacing: 2,
                }}
              >
                {formula.label}
              </span>
            )}
            <span
              style={{
                color: s.exprColor,
                fontSize: 36,
                fontWeight: 700,
                fontFamily: s.fontFamily,
                textShadow:
                  style === "neon"
                    ? `0 0 15px ${theme.accent}88`
                    : "none",
              }}
            >
              {formula.expression}
            </span>
          </div>
        );
      })}
    </div>
  );
};
