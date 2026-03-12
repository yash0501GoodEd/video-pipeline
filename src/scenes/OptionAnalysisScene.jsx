import React from "react";
import { Background } from "../components/Background";
import { OptionAnalysisCard } from "../components/OptionAnalysisCard";

/**
 * OptionAnalysisScene — Deep-dives into a single option,
 * explaining why it is correct or incorrect with detailed
 * reasoning and an optional clinical key fact.
 */
export const OptionAnalysisScene = ({ scene, theme, characters }) => {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        overflow: "hidden",
      }}
    >
      <Background
        variant={scene.backgroundVariant || "gradient"}
        theme={theme}
      />

      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "80px 60px",
          zIndex: 5,
        }}
      >
        <OptionAnalysisCard
          optionNumber={scene.optionNumber}
          optionText={scene.optionText}
          isCorrect={scene.isCorrect}
          reasoning={scene.reasoning}
          keyFact={scene.keyFact}
          theme={theme}
          startDelay={5}
        />
      </div>
    </div>
  );
};
