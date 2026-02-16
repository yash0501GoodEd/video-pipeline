import { z } from "zod";

// ─── Media Asset Schema ──────────────────────────────────────
// Unified media block — attach to any scene.
// Files go in public/ and are referenced via staticFile().

const MediaItemSchema = z.object({
  type: z.enum(["image", "svg", "gif", "video"]),
  src: z.string(), // path relative to public/, e.g. "media/photon.png"
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
  caption: z.string().optional(),         // small label under media
});

// ─── Voiceover Schema ────────────────────────────────────────

const VoiceoverConfigSchema = z.object({
  enabled: z.boolean().default(false),
  voiceId: z.string().optional(),         // ElevenLabs voice ID
  model: z.string().default("eleven_multilingual_v2"),
  stability: z.number().min(0).max(1).default(0.5),
  similarityBoost: z.number().min(0).max(1).default(0.75),
  style: z.number().min(0).max(1).default(0.3),
});

const SceneAudioSchema = z.object({
  src: z.string(),             // path relative to public/, e.g. "voiceover/photoelectric/scene-0.mp3"
  durationInFrames: z.number().optional(), // measured after generation
});

// ─── Scene Schemas ───────────────────────────────────────────

const SpeakerLineSchema = z.object({
  speaker: z.string(),
  text: z.string(),
  emotion: z
    .enum(["neutral", "excited", "stressed", "happy", "shouting", "curious"])
    .default("neutral"),
  pause: z.enum(["none", "short", "medium", "long"]).default("short"),
});

const FormulaItemSchema = z.object({
  label: z.string(),
  expression: z.string(),
  highlight: z.boolean().default(false),
});

const BulletItemSchema = z.object({
  number: z.number().optional(),
  text: z.string(),
  icon: z.string().optional(),
});

const PYQOptionSchema = z.object({
  label: z.string(),
  text: z.string(),
  isCorrect: z.boolean().default(false),
});

// Every scene has a `type` discriminator + optional media/audio
const BaseScene = {
  layoutVariant: z.number().int().min(0).max(3).default(0),
  backgroundVariant: z.enum(["gradient", "grid", "particles", "waves"]).default("gradient"),
  sceneTitle: z.string().optional(),            // concept title shown on screen
  subtitle: z.string().optional(),              // secondary label below title
  media: z.array(MediaItemSchema).optional(),   // visual assets
  audio: SceneAudioSchema.optional(),           // generated voiceover
  bgMusic: z.string().optional(),               // background music path
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
  visualCue: z.string().optional(), // emoji or keyword for illustration
});

const AnalogySceneSchema = z.object({
  ...BaseScene,
  type: z.literal("analogy"),
  lines: z.array(SpeakerLineSchema).min(1),
  analogyTitle: z.string(),
  analogyIcon: z.string().default("💡"),
  comparison: z
    .object({
      left: z.string(),
      right: z.string(),
      leftLabel: z.string(),
      rightLabel: z.string(),
    })
    .optional(),
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
  trapDescription: z.string(),
  correctApproach: z.string().optional(),
});

const PYQSceneSchema = z.object({
  ...BaseScene,
  type: z.literal("pyq"),
  lines: z.array(SpeakerLineSchema).min(1),
  year: z.number(),
  exam: z.string().default("NEET"),
  question: z.string(),
  options: z.array(PYQOptionSchema).optional(),
  solution: z.string().optional(),
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
      label: z.string(),
      expression: z.string(),
    })
  ),
});

const OutroSceneSchema = z.object({
  ...BaseScene,
  type: z.literal("outro"),
  lines: z.array(SpeakerLineSchema).min(1),
  nextVideoTeaser: z.string().optional(),
  ctaText: z.string().default("Subscribe for more!"),
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
]);

// ─── Character Schema ────────────────────────────────────────

const CharacterSchema = z.object({
  name: z.string(),
  role: z.enum(["teacher", "student"]),
  color: z.string().optional(), // override per character
  avatar: z.string().optional(), // emoji or image path
});

// ─── Main Video Schema ───────────────────────────────────────

export const NEETVideoSchema = z.object({
  title: z.string(),
  subject: z.enum(["physics", "chemistry", "biology", "math"]),
  chapter: z.string(),
  format: z.enum(["long", "short"]).default("long"), // YouTube vs Shorts
  characters: z.array(CharacterSchema).min(1).max(3),
  themeVariant: z.number().int().min(0).max(4).default(0),
  voiceover: VoiceoverConfigSchema.optional(),        // TTS config
  bgMusic: z.string().optional(),                     // global background music path
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
