import React from "react";
import { staticFile } from "remotion";
import { Audio } from "@remotion/media";

/**
 * SceneAudio - Renders voiceover audio and background music for a scene.
 * Uses @remotion/media Audio component.
 */

export const SceneAudio = ({ audio, bgMusic }) => {
  return (
    <>
      {/* Scene voiceover */}
      {audio?.src && (
        <Audio
          src={
            audio.src.startsWith("http")
              ? audio.src
              : staticFile(audio.src)
          }
          volume={1}
        />
      )}

      {/* Background music (low volume) */}
      {bgMusic && (
        <Audio
          src={
            bgMusic.startsWith("http")
              ? bgMusic
              : staticFile(bgMusic)
          }
          volume={0.08}
          loop
        />
      )}
    </>
  );
};
