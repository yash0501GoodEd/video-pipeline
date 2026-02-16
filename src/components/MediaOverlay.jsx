import React from "react";
import {
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Img,
  staticFile,
} from "remotion";
import { Video } from "@remotion/media";
import { Gif } from "@remotion/gif";

const POSITION_STYLES = {
  center: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
  left: {
    position: "absolute",
    top: "50%",
    left: 60,
    transform: "translateY(-50%)",
  },
  right: {
    position: "absolute",
    top: "50%",
    right: 60,
    transform: "translateY(-50%)",
  },
  topLeft: {
    position: "absolute",
    top: 80,
    left: 60,
  },
  topRight: {
    position: "absolute",
    top: 80,
    right: 60,
  },
  bottomLeft: {
    position: "absolute",
    bottom: 80,
    left: 60,
  },
  bottomRight: {
    position: "absolute",
    bottom: 80,
    right: 60,
  },
  background: {
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
  },
  fullscreen: {
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
};

const MediaItem = ({ item }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const enterDelay = item.enterDelay || 0;
  const localFrame = Math.max(0, frame - enterDelay);

  // Entrance animation
  let animStyle = {};
  if (item.animation !== "none") {
    const progress = spring({
      frame: localFrame,
      fps,
      config: { damping: 15, stiffness: 120 },
    });

    if (item.animation === "fadeIn" || !item.animation) {
      animStyle.opacity = interpolate(progress, [0, 1], [0, item.opacity ?? 1]);
    } else if (item.animation === "scaleUp") {
      const scale = interpolate(progress, [0, 1], [0.5, 1]);
      animStyle.transform = `${animStyle.transform || ""} scale(${scale})`.trim();
      animStyle.opacity = interpolate(progress, [0, 1], [0, item.opacity ?? 1]);
    } else if (item.animation === "slideLeft") {
      const x = interpolate(progress, [0, 1], [100, 0]);
      animStyle.transform = `${animStyle.transform || ""} translateX(${x}px)`.trim();
      animStyle.opacity = interpolate(progress, [0, 1], [0, item.opacity ?? 1]);
    } else if (item.animation === "slideRight") {
      const x = interpolate(progress, [0, 1], [-100, 0]);
      animStyle.transform = `${animStyle.transform || ""} translateX(${x}px)`.trim();
      animStyle.opacity = interpolate(progress, [0, 1], [0, item.opacity ?? 1]);
    } else if (item.animation === "slideUp") {
      const y = interpolate(progress, [0, 1], [60, 0]);
      animStyle.transform = `${animStyle.transform || ""} translateY(${y}px)`.trim();
      animStyle.opacity = interpolate(progress, [0, 1], [0, item.opacity ?? 1]);
    }
  } else {
    animStyle.opacity = frame >= enterDelay ? (item.opacity ?? 1) : 0;
  }

  // Duration — hide after duration frames
  if (item.duration && frame > enterDelay + item.duration) {
    return null;
  }

  // Don't show before enter delay
  if (frame < enterDelay) return null;

  const posStyle = POSITION_STYLES[item.position || "center"] || POSITION_STYLES.center;

  const sizeStyle = {
    ...(item.width ? { width: item.width } : {}),
    ...(item.height ? { height: item.height } : {}),
    borderRadius: item.borderRadius || 0,
    objectFit: item.objectFit || "contain",
  };

  const wrapperStyle = {
    ...posStyle,
    ...animStyle,
    zIndex: item.position === "background" ? 1 : 15,
  };

  const src = item.src.startsWith("http") ? item.src : staticFile(item.src);

  return (
    <div style={wrapperStyle}>
      {/* Render based on type */}
      {(item.type === "image" || item.type === "svg") && (
        <Img
          src={src}
          style={sizeStyle}
        />
      )}

      {item.type === "gif" && (
        <Gif
          src={src}
          width={item.width || 400}
          height={item.height || 400}
          loopBehavior={item.loop !== false ? "loop" : "pause-after-finish"}
          style={{
            borderRadius: item.borderRadius || 0,
            objectFit: item.objectFit || "contain",
          }}
        />
      )}

      {item.type === "video" && (
        <Video
          src={src}
          style={sizeStyle}
          muted={item.muted !== false}
          loop={item.loop !== false}
        />
      )}

      {/* Caption under media */}
      {item.caption && (
        <div
          style={{
            textAlign: "center",
            marginTop: 8,
            color: "#ffffffaa",
            fontSize: 14,
            fontWeight: 500,
            fontFamily: "'Inter', sans-serif",
          }}
        >
          {item.caption}
        </div>
      )}
    </div>
  );
};

/**
 * MediaOverlay - Renders all media items for a scene.
 * Drop this into any scene component to render its media[].
 */
export const MediaOverlay = ({ media = [] }) => {
  if (!media || media.length === 0) return null;

  return (
    <>
      {media.map((item, i) => (
        <MediaItem key={i} item={item} />
      ))}
    </>
  );
};
