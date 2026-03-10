import React from "react";
import { HookScene } from "./HookScene";
import { DialogueScene } from "./DialogueScene";
import { NarratorScene } from "./NarratorScene";
import { AnalogyScene } from "./AnalogyScene";
import { FormulaScene } from "./FormulaScene";
import { TrapAlertScene } from "./TrapAlertScene";
import { PYQScene } from "./PYQScene";
import { SummaryScene } from "./SummaryScene";
import { CalculationScene } from "./CalculationScene";
import { OutroScene } from "./OutroScene";
import { QuestionDisplayScene } from "./QuestionDisplayScene";
import { OptionAnalysisScene } from "./OptionAnalysisScene";
import { MediaOverlay } from "../components/MediaOverlay";
import { SceneAudio } from "../components/SceneAudio";
import { SceneLabel } from "../components/SceneLabel";

const SCENE_MAP = {
  hook: HookScene,
  dialogue: DialogueScene,
  narrator: NarratorScene,
  analogy: AnalogyScene,
  formula: FormulaScene,
  trapAlert: TrapAlertScene,
  pyq: PYQScene,
  summary: SummaryScene,
  calculation: CalculationScene,
  outro: OutroScene,
  questionDisplay: QuestionDisplayScene,
  optionAnalysis: OptionAnalysisScene,
};

/**
 * SceneRenderer - Visual-first scene engine.
 *
 * Dialogue text (lines[]) is NOT rendered on screen.
 * Lines exist in the config only for voiceover generation.
 * Instead, scenes show:
 *   1. Themed animated background
 *   2. Structural visual elements (formulas, PYQ cards, etc.)
 *   3. Media overlays (images, SVGs, GIFs, video clips)
 *   4. SceneLabel (concept title + subtitle)
 *   5. Cinematic vignette for depth
 */
export const SceneRenderer = ({ scene, theme, characters, globalBgMusic }) => {
  const Component = SCENE_MAP[scene.type];

  if (!Component) {
    return (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#1a1a2e",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#ff4444",
          fontSize: 32,
          fontFamily: "'Inter', sans-serif",
        }}
      >
        Unknown scene type: {scene.type}
      </div>
    );
  }

  // Strip dialogue lines — narration is handled by voiceover audio,
  // not on-screen text. Structural data (formulas, steps, etc.) stays.
  const visualScene = { ...scene, lines: [] };

  const effectiveBgMusic = scene.bgMusic || globalBgMusic;

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      {/* Scene content (background + structural elements only) */}
      <Component scene={visualScene} theme={theme} characters={characters} />

      {/* Cinematic vignette — subtle edge darkening for depth */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.35) 100%)",
          zIndex: 2,
          pointerEvents: "none",
        }}
      />

      {/* Media overlays — the visual content that replaces dialogue text */}
      {scene.media && scene.media.length > 0 && (
        <MediaOverlay media={scene.media} />
      )}

      {/* Scene label — concept title + subtitle (top-center, below TopicBadge) */}
      <SceneLabel
        title={scene.sceneTitle}
        subtitle={scene.subtitle}
        theme={theme}
      />

      {/* Audio: voiceover + background music */}
      <SceneAudio audio={scene.audio} bgMusic={effectiveBgMusic} />
    </div>
  );
};
