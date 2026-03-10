import { z } from "zod";

// ─── Media Asset Schema ──────────────────────────────────────
// Unified media block — attach to any scene.
// Files go in public/ and are referenced via staticFile().

const MediaItemSchema = z.object({
  type: z.enum(["image", "svg", "gif", "video"]),
  src: z.string().default(""), // path relative to public/, e.g. "media/photon.png"
  position: z
    .enum([
      "center",
      "left",
      "right",
      "topLeft",
      "topRight",
      "bottomLeft",
      "bottomRight",
      "background",
      "fullscreen",
    ])
    .default("center"),
  width: z.number().optional(),   // px — if omitted, auto-sized
  height: z.number().optional(),
  opacity: z.number().min(0).max(1).default(1),
  enterDelay: z.number().default(0),      // frames before media appears
  animation: z
    .enum(["fadeIn", "scaleUp", "slideLeft", "slideRight", "slideUp", "none"])
    .default("fadeIn"),
  borderRadius: z.number().default(0),
  loop: z.boolean().default(true),        // for gif/video
  muted: z.boolean().default(true),       // for video
  objectFit: z.enum(["contain", "cover", "fill"]).default("contain"),
  duration: z.number().optional(),        // frames — if omitted, lasts full scene
  caption: z.string().default(""),         // small label under media
});

// ─── Voiceover Schema ────────────────────────────────────────

const ElevenLabsConfigSchema = z.object({
  voiceId: z.string().default(""),         // ElevenLabs voice ID
  model: z.string().default("eleven_multilingual_v2"),
  stability: z.number().min(0).max(1).default(0.5),
  similarityBoost: z.number().min(0).max(1).default(0.75),
  style: z.number().min(0).max(1).default(0.3),
});

const SarvamConfigSchema = z.object({
  speaker: z.string().default("shubh"),                         // Sarvam voice name
  model: z.enum(["bulbul:v2", "bulbul:v3"]).default("bulbul:v3"),
  targetLanguageCode: z.string().default("hi-IN"),              // BCP-47 language code
  pace: z.number().min(0.5).max(2.0).default(1.1),
  sampleRate: z.enum(["8000", "16000", "22050", "24000", "32000", "44100", "48000"]).default("48000"),
  temperature: z.number().min(0.01).max(2.0).default(0.6),
});

const VoiceoverConfigSchema = z.object({
  enabled: z.boolean().default(false),
  provider: z.enum(["elevenlabs", "sarvam"]).default("elevenlabs"),
  // ElevenLabs settings (legacy top-level fields still supported)
  voiceId: z.string().default(""),
  model: z.string().default("eleven_multilingual_v2"),
  stability: z.number().min(0).max(1).default(0.5),
  similarityBoost: z.number().min(0).max(1).default(0.75),
  style: z.number().min(0).max(1).default(0.3),
  // Provider-specific nested config
  elevenlabs: ElevenLabsConfigSchema.default({}),
  sarvam: SarvamConfigSchema.default({}),
});

const SceneAudioSchema = z.object({
  src: z.string().default(""),             // path relative to public/, e.g. "voiceover/photoelectric/scene-0.mp3"
  durationInFrames: z.number().optional(), // measured after generation
});

// ─── Scene Schemas ───────────────────────────────────────────

const SpeakerLineSchema = z.object({
  speaker: z.string().default(""),
  text: z.string().default(""),
  emotion: z
    .enum(["neutral", "excited", "stressed", "happy", "shouting", "curious"])
    .default("neutral"),
  pause: z.enum(["none", "short", "medium", "long"]).default("short"),
});

const FormulaItemSchema = z.object({
  label: z.string().default(""),
  expression: z.string().default(""),
  highlight: z.boolean().default(false),
});

const BulletItemSchema = z.object({
  number: z.number().optional(),
  text: z.string().default(""),
  icon: z.string().default(""),
});

const PYQOptionSchema = z.object({
  label: z.string().default(""),
  text: z.string().default(""),
  isCorrect: z.boolean().default(false),
});

// ─── NEET PG Schemas ─────────────────────────────────────────

const PGOptionSchema = z.object({
  number: z.number(),
  text: z.string().default(""),
  isCorrect: z.boolean().default(false),
});

const AnalyticsSchema = z.object({
  correctPercentage: z.number().default(0),
  option1Percentage: z.number().default(0),
  option2Percentage: z.number().default(0),
  option3Percentage: z.number().default(0),
  option4Percentage: z.number().default(0),
});

// Every scene has a `type` discriminator + optional media/audio
const BaseScene = {
  layoutVariant: z.number().int().min(0).max(3).default(0),
  backgroundVariant: z.enum(["gradient", "grid", "particles", "waves"]).default("gradient"),
  sceneTitle: z.string().default(""),            // concept title shown on screen
  subtitle: z.string().default(""),              // secondary label below title
  media: z.array(MediaItemSchema).default([]),   // visual assets
  audio: SceneAudioSchema.default({ src: "" }),           // generated voiceover
  bgMusic: z.string().default(""),               // background music path
};

const HookSceneSchema = z.object({
  ...BaseScene,
  type: z.literal("hook"),
  lines: z.array(SpeakerLineSchema).min(1),
});

const DialogueSceneSchema = z.object({
  ...BaseScene,
  type: z.literal("dialogue"),
  lines: z.array(SpeakerLineSchema).min(1),
});

const NarratorSceneSchema = z.object({
  ...BaseScene,
  type: z.literal("narrator"),
  lines: z.array(SpeakerLineSchema).min(1),
  visualCue: z.string().default(""), // emoji or keyword for illustration
});

const AnalogySceneSchema = z.object({
  ...BaseScene,
  type: z.literal("analogy"),
  lines: z.array(SpeakerLineSchema).min(1),
  analogyTitle: z.string().default(""),
  analogyIcon: z.string().default("💡"),
  comparison: z
    .object({
      left: z.string().default(""),
      right: z.string().default(""),
      leftLabel: z.string().default(""),
      rightLabel: z.string().default(""),
    })
    .default({ left: "", right: "", leftLabel: "", rightLabel: "" }),
});

const FormulaSceneSchema = z.object({
  ...BaseScene,
  type: z.literal("formula"),
  lines: z.array(SpeakerLineSchema).min(1),
  formulas: z.array(FormulaItemSchema).min(1),
  style: z.enum(["chalk", "neon", "clean", "handwritten"]).default("clean"),
});

const TrapAlertSceneSchema = z.object({
  ...BaseScene,
  type: z.literal("trapAlert"),
  lines: z.array(SpeakerLineSchema).min(1),
  trapDescription: z.string().default(""),
  correctApproach: z.string().default(""),
});

const PYQSceneSchema = z.object({
  ...BaseScene,
  type: z.literal("pyq"),
  lines: z.array(SpeakerLineSchema).min(1),
  year: z.number(),
  exam: z.string().default("NEET"),
  question: z.string().default(""),
  questionImage: z.string().optional(),
  options: z.array(PYQOptionSchema).default([]),
  solution: z.string().default(""),
});

const SummarySceneSchema = z.object({
  ...BaseScene,
  type: z.literal("summary"),
  lines: z.array(SpeakerLineSchema).min(1),
  bullets: z.array(BulletItemSchema).min(1),
  title: z.string().default("Summary"),
});

const CalculationSceneSchema = z.object({
  ...BaseScene,
  type: z.literal("calculation"),
  lines: z.array(SpeakerLineSchema).min(1),
  steps: z.array(
    z.object({
      label: z.string().default(""),
      expression: z.string().default(""),
    })
  ),
});

const OutroSceneSchema = z.object({
  ...BaseScene,
  type: z.literal("outro"),
  lines: z.array(SpeakerLineSchema).min(1),
  nextVideoTeaser: z.string().default(""),
  ctaText: z.string().default("Subscribe for more!"),
});

// ─── NEET PG Scene Schemas ───────────────────────────────────

const QuestionDisplaySceneSchema = z.object({
  ...BaseScene,
  type: z.literal("questionDisplay"),
  lines: z.array(SpeakerLineSchema).min(1),
  question: z.string().default(""),
  options: z.array(PGOptionSchema).default([]),
  highlights: z.array(z.string()).default([]),
  exam: z.string().default("NEET PG"),
  year: z.number(),
  analytics: AnalyticsSchema.optional(),
  answerRevealDelay: z.number().default(45),
});

const OptionAnalysisSceneSchema = z.object({
  ...BaseScene,
  type: z.literal("optionAnalysis"),
  lines: z.array(SpeakerLineSchema).min(1),
  optionNumber: z.number(),
  optionText: z.string().default(""),
  isCorrect: z.boolean(),
  reasoning: z.string().default(""),
  keyFact: z.string().default(""),
});

const SceneSchema = z.discriminatedUnion("type", [
  HookSceneSchema,
  DialogueSceneSchema,
  NarratorSceneSchema,
  AnalogySceneSchema,
  FormulaSceneSchema,
  TrapAlertSceneSchema,
  PYQSceneSchema,
  SummarySceneSchema,
  CalculationSceneSchema,
  OutroSceneSchema,
  QuestionDisplaySceneSchema,
  OptionAnalysisSceneSchema,
]);

// ─── Character Schema ────────────────────────────────────────

const CharacterSchema = z.object({
  name: z.string().default(""),
  role: z.enum(["teacher", "student"]),
  color: z.string().default(""), // override per character
  avatar: z.string().default(""), // emoji or image path
});

// ─── Main Video Schema ───────────────────────────────────────

export const NEETVideoSchema = z.object({
  title: z.string().default(""),
  subject: z.enum(["physics", "chemistry", "biology", "math", "medicine"]).default("physics"),
  chapter: z.string().default(""),
  format: z.enum(["long", "short"]).default("long"), // YouTube vs Shorts
  characters: z.array(CharacterSchema).min(1).max(3),
  themeVariant: z.number().int().min(0).max(4).default(0),
  voiceover: VoiceoverConfigSchema.default({ enabled: false }),        // TTS config
  bgMusic: z.string().default(""),                     // global background music path
  scenes: z.array(SceneSchema).min(1),
});

// ─── Utility: Estimate duration from scenes ──────────────────

const PAUSE_FRAMES = { none: 0, short: 8, medium: 20, long: 35 };
const WORDS_PER_SECOND = 2.8; // Hinglish speaking rate

export function estimateSceneDuration(scene, fps = 30) {
  // If scene has pre-measured audio duration, use that
  if (scene.audio?.durationInFrames) {
    return scene.audio.durationInFrames + 15; // small tail buffer
  }

  const lines = scene.lines || [];
  let totalFrames = 0;

  for (const line of lines) {
    const wordCount = line.text.split(/\s+/).length;
    const speakingFrames = Math.ceil((wordCount / WORDS_PER_SECOND) * fps);
    const pauseFrames = PAUSE_FRAMES[line.pause || "short"];
    totalFrames += speakingFrames + pauseFrames;
  }

  // Add scene-type-specific padding
  const typePadding = {
    hook: 30,
    dialogue: 15,
    narrator: 15,
    analogy: 45,
    formula: 50,
    trapAlert: 40,
    pyq: 60,
    summary: 40,
    calculation: 45,
    outro: 30,
    questionDisplay: 60,
    optionAnalysis: 45,
  };

  totalFrames += typePadding[scene.type] || 20;
  return Math.max(totalFrames, 60); // minimum 2 seconds per scene
}

export function estimateTotalDuration(scenes, fps = 30) {
  return scenes.reduce(
    (total, scene) => total + estimateSceneDuration(scene, fps),
    0
  );
}
