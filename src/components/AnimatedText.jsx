import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";

/**
 * AnimatedText renders text word-by-word with staggered animation.
 * Supports multiple animation styles for visual variety.
 */
export const AnimatedText = ({
  text,
  color = "#ffffff",
  fontSize = 42,
  variant = "fadeUp", // "fadeUp" | "typewriter" | "wordPop" | "slideIn"
  maxWidth = 1600,
  textAlign = "center",
  fontWeight = 600,
  lineHeight = 1.5,
  startDelay = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const words = text.split(/\s+/);

  if (variant === "typewriter") {
    const charsPerFrame = 1.8;
    const visibleChars = Math.floor(
      Math.max(0, (frame - startDelay) * charsPerFrame)
    );
    const displayText = text.slice(0, visibleChars);

    return (
      <div
        style={{
          maxWidth,
          textAlign,
          color,
          fontSize,
          fontWeight,
          lineHeight,
          fontFamily: "'Inter', sans-serif",
        }}
      >
        {displayText}
        {visibleChars < text.length && (
          <span
            style={{
              opacity: Math.floor(frame / 8) % 2 === 0 ? 1 : 0,
              color,
            }}
          >
            |
          </span>
        )}
      </div>
    );
  }

  return (
    <div
      style={{
        maxWidth,
        textAlign,
        display: "flex",
        flexWrap: "wrap",
        justifyContent:
          textAlign === "center"
            ? "center"
            : textAlign === "right"
              ? "flex-end"
              : "flex-start",
        gap: `0 ${fontSize * 0.3}px`,
        lineHeight,
      }}
    >
      {words.map((word, i) => {
        const delay = startDelay + i * 3;
        const wordFrame = Math.max(0, frame - delay);

        let style = {};

        if (variant === "fadeUp") {
          const progress = spring({
            frame: wordFrame,
            fps,
            config: { damping: 20, stiffness: 180 },
          });
          const y = interpolate(progress, [0, 1], [25, 0]);
          const opacity = interpolate(progress, [0, 1], [0, 1]);
          style = {
            transform: `translateY(${y}px)`,
            opacity,
          };
        } else if (variant === "wordPop") {
          const progress = spring({
            frame: wordFrame,
            fps,
            config: { damping: 8, stiffness: 200 },
          });
          const scale = interpolate(progress, [0, 1], [0.3, 1]);
          const opacity = interpolate(progress, [0, 1], [0, 1]);
          style = {
            transform: `scale(${scale})`,
            opacity,
          };
        } else if (variant === "slideIn") {
          const progress = spring({
            frame: wordFrame,
            fps,
            config: { damping: 200 },
          });
          const x = interpolate(progress, [0, 1], [60, 0]);
          const opacity = interpolate(progress, [0, 1], [0, 1]);
          style = {
            transform: `translateX(${x}px)`,
            opacity,
          };
        }

        return (
          <span
            key={`${word}-${i}`}
            style={{
              color,
              fontSize,
              fontWeight,
              fontFamily: "'Inter', sans-serif",
              display: "inline-block",
              ...style,
            }}
          >
            {word}
          </span>
        );
      })}
    </div>
  );
};
