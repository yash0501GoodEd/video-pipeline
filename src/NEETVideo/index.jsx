import React from "react";
import { Series, useVideoConfig } from "remotion";
import { SceneRenderer } from "../scenes/SceneRenderer";
import { TopicBadge } from "../components/TopicBadge";
import { getTheme } from "../themes";
import { estimateSceneDuration } from "../schema";

/**
 * NEETVideo - Main composition that reads a JSON config and
 * renders scenes sequentially using Series.
 *
 * This is the core "engine" — every video is just a different
 * set of props (JSON config) passed to this single component.
 */
export const NEETVideo = ({
  title,
  subject,
  chapter,
  format = "long",
  characters,
  themeVariant = 0,
  scenes,
  voiceover,
  bgMusic,
}) => {
  const { fps } = useVideoConfig();
  const theme = getTheme(subject, themeVariant);

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        background: theme.bg,
        fontFamily: "'Inter', sans-serif",
      }}
    >
      {/* Persistent topic badge */}
      <TopicBadge subject={subject} chapter={chapter} theme={theme} />

      {/* Scene series */}
      <Series>
        {scenes.map((scene, i) => {
          const sceneDuration = estimateSceneDuration(scene, fps);

          return (
            <Series.Sequence key={i} durationInFrames={sceneDuration}>
              <SceneRenderer
                scene={scene}
                theme={theme}
                characters={characters}
                globalBgMusic={bgMusic}
              />
            </Series.Sequence>
          );
        })}
      </Series>
    </div>
  );
};
