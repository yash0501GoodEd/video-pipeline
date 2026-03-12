import React from "react";
import { Background } from "../components/Background";
import { QuestionCard } from "../components/QuestionCard";

/**
 * QuestionDisplayScene — Shows a NEET PG clinical vignette
 * with highlighted keywords, numbered options, answer reveal,
 * and optional analytics bars.
 */
export const QuestionDisplayScene = ({ scene, theme, characters }) => {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        overflow: "hidden",
      }}
    >
      <Background variant={scene.backgroundVariant || "grid"} theme={theme} />

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
        <QuestionCard
          exam={scene.exam}
          year={scene.year}
          question={scene.question}
          options={scene.options}
          highlights={scene.highlights}
          analytics={scene.analytics}
          theme={theme}
          startDelay={5}
          answerRevealDelay={scene.answerRevealDelay || 45}
        />
      </div>
    </div>
  );
};
