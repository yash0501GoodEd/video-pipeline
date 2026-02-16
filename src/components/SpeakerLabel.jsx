import React from "react";
import {
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";

const LAYOUT_POSITIONS = [
  { left: 40, top: "auto", bottom: 80 }, // bottom-left
  { left: "auto", right: 40, top: 40 }, // top-right
  { left: 40, top: 40 },                // top-left
  { left: "auto", right: 40, top: "auto", bottom: 80 }, // bottom-right
];

export const SpeakerLabel = ({
  name,
  role,
  color,
  layoutVariant = 0,
  emotion = "neutral",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const slideIn = spring({
    frame,
    fps,
    config: { damping: 15, stiffness: 120 },
  });

  const translateX = interpolate(slideIn, [0, 1], [-120, 0]);
  const opacity = interpolate(slideIn, [0, 1], [0, 1]);

  const pos = LAYOUT_POSITIONS[layoutVariant % LAYOUT_POSITIONS.length];

  const emotionEmoji = {
    neutral: "",
    excited: " 🔥",
    stressed: " 😰",
    happy: " 😄",
    shouting: " 📢",
    curious: " 🤔",
  };

  const roleIcon = role === "teacher" ? "👨‍🏫" : "🎓";

  return (
    <div
      style={{
        position: "absolute",
        ...pos,
        transform: `translateX(${translateX}px)`,
        opacity,
        display: "flex",
        alignItems: "center",
        gap: 12,
        zIndex: 50,
      }}
    >
      <div
        style={{
          width: 48,
          height: 48,
          borderRadius: "50%",
          background: `${color}22`,
          border: `2px solid ${color}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 22,
        }}
      >
        {roleIcon}
      </div>
      <div
        style={{
          background: `${color}18`,
          border: `1px solid ${color}44`,
          borderRadius: 8,
          padding: "6px 16px",
          backdropFilter: "blur(10px)",
        }}
      >
        <span
          style={{
            color,
            fontSize: 18,
            fontWeight: 700,
            fontFamily: "'Inter', sans-serif",
            letterSpacing: 1,
          }}
        >
          {name}
          {emotionEmoji[emotion] || ""}
        </span>
      </div>
    </div>
  );
};
