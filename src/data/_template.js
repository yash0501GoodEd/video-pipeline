/**
 * ╔══════════════════════════════════════════════════════════╗
 * ║       NEET VIDEO TEMPLATE — VISUAL-FIRST APPROACH       ║
 * ╠══════════════════════════════════════════════════════════╣
 * ║  Copy this file, fill in your media + script, renders.  ║
 * ║  No code changes needed — just JSON data + assets.      ║
 * ╚══════════════════════════════════════════════════════════╝
 *
 * HOW IT WORKS (visual-first):
 * ──────────────────────────────────────────────────────────
 * `lines[]`      → Voiceover script (NOT displayed on screen)
 * `media[]`      → Images, SVGs, GIFs, videos shown on screen
 * `sceneTitle`   → Concept label shown as lower-third overlay
 * `subtitle`     → Secondary text below the title
 *
 * Structural elements like formula cards, PYQ questions,
 * comparison cards, bullet lists, and calculation steps
 * still render as visual components.
 *
 * SCENE TYPES:
 * ──────────────────────────────────────────────────────────
 * "hook"        → Dramatic opener (background + media)
 * "dialogue"    → Conversation (background + media, voiceover narrates)
 * "narrator"    → Explanation (background + visualCue + media)
 * "analogy"     → Comparison cards + media
 * "formula"     → Formula cards + media
 * "trapAlert"   → Warning badge + trap description + media
 * "pyq"         → PYQ question card + media
 * "summary"     → Bullet-point recap + media
 * "calculation" → Step-by-step math cards + media
 * "outro"       → CTA button + teaser
 *
 * MEDIA OPTIONS:
 * ──────────────────────────────────────────────────────────
 * type:        "image" | "svg" | "gif" | "video"
 * src:         Path in public/ folder, e.g. "media/diagram.png"
 * position:    "center" | "left" | "right" | "topLeft" | "topRight"
 *              | "bottomLeft" | "bottomRight" | "background" | "fullscreen"
 * width/height: Pixel dimensions (optional)
 * animation:   "fadeIn" | "scaleUp" | "slideLeft" | "slideRight" | "slideUp" | "none"
 * enterDelay:  Frames to wait before showing
 * duration:    Frames to show (omit = entire scene)
 * opacity:     0-1 (default: 1)
 * caption:     Text below the media
 * borderRadius: Rounded corners in px
 * objectFit:   "contain" | "cover" | "fill"
 * loop:        For gif/video (default: true)
 * muted:       For video (default: true)
 *
 * SUBJECTS: "physics" | "chemistry" | "biology" | "math"
 * THEME VARIANTS: 0-4 (each subject has 5 color palettes)
 * FORMATS: "long" (1920x1080) | "short" (1080x1920)
 * BACKGROUNDS: "gradient" | "grid" | "particles" | "waves"
 * FORMULA STYLES: "clean" | "neon" | "chalk" | "handwritten"
 *
 * GENERATE VOICEOVERS:
 *   node --env-file=.env scripts/generate-voiceover.mjs src/data/my-video.js
 */

export const myVideo = {
  title: "YOUR TITLE HERE",
  subject: "physics", // physics | chemistry | biology | math
  chapter: "Chapter Name",
  format: "long",     // long (YouTube 1920x1080) | short (Shorts/Reels 1080x1920)
  characters: [
    { name: "Teacher", role: "teacher" },
    { name: "Student", role: "student" },
  ],
  themeVariant: 0, // 0-4, each gives a different color palette

  // Optional: ElevenLabs voice config (used by generate-voiceover.mjs)
  // voiceover: {
  //   provider: "elevenlabs",
  //   voiceId: "pNInz6obpgDQGcFmaJgB",
  //   model: "eleven_multilingual_v2",
  // },

  // Optional: Background music file in public/
  // bgMusic: "music/lofi-bg.mp3",

  scenes: [
    // ─── START WITH A HOOK ──────────────────────
    {
      type: "hook",
      backgroundVariant: "particles",
      sceneTitle: "Your Concept Title",
      subtitle: "A short hook subtitle",
      lines: [
        {
          speaker: "Teacher",
          text: "YOUR HOOK TEXT — voiceover narration (not shown on screen)",
          emotion: "excited",
          pause: "short",
        },
      ],
      // Visuals shown on screen instead of text:
      media: [
        {
          type: "image",
          src: "media/your-topic/hook-visual.png",
          position: "center",
          width: 700,
          animation: "scaleUp",
          enterDelay: 10,
        },
      ],
      // audio: { src: "voiceover/your-topic/scene-0.mp3", durationInFrames: 180 },
    },

    // ─── EXPLAIN WITH VISUALS ───────────────────
    {
      type: "dialogue",
      backgroundVariant: "gradient",
      sceneTitle: "Key Concept",
      subtitle: "Brief description",
      lines: [
        { speaker: "Teacher", text: "Explanation text for voiceover...", emotion: "neutral", pause: "short" },
        { speaker: "Student", text: "Question text for voiceover...", emotion: "curious", pause: "short" },
      ],
      media: [
        {
          type: "svg",
          src: "media/your-topic/diagram.svg",
          position: "center",
          width: 800,
          animation: "fadeIn",
          enterDelay: 5,
        },
        {
          type: "gif",
          src: "media/your-topic/animation.gif",
          position: "right",
          width: 400,
          height: 400,
          animation: "slideLeft",
          enterDelay: 40,
        },
      ],
    },

    // ─── SHOW FORMULAS (cards render automatically) ────
    // {
    //   type: "formula",
    //   sceneTitle: "Important Formulas",
    //   style: "neon", // clean | neon | chalk | handwritten
    //   formulas: [
    //     { label: "Name", expression: "E = mc²", highlight: true },
    //   ],
    //   lines: [
    //     { speaker: "Teacher", text: "Voiceover explanation...", emotion: "neutral", pause: "short" },
    //   ],
    //   media: [
    //     { type: "image", src: "media/illustration.png", position: "right", width: 300, animation: "fadeIn" },
    //   ],
    // },

    // ─── ANALOGY (comparison cards render automatically) ──
    // {
    //   type: "analogy",
    //   sceneTitle: "Understanding the Concept",
    //   analogyTitle: "Title of Analogy",
    //   analogyIcon: "💡",
    //   comparison: { left: "A", right: "B", leftLabel: "Label A", rightLabel: "Label B" },
    //   lines: [
    //     { speaker: "Teacher", text: "Voiceover...", emotion: "neutral", pause: "short" },
    //   ],
    //   media: [
    //     { type: "image", src: "media/analogy-visual.png", position: "bottomRight", width: 300 },
    //   ],
    // },

    // ─── TRAP ALERT (badge + description render) ─────
    // {
    //   type: "trapAlert",
    //   sceneTitle: "Common Mistake",
    //   trapDescription: "What students commonly get wrong",
    //   correctApproach: "The right way to think about it",
    //   lines: [
    //     { speaker: "Teacher", text: "Voiceover warning...", emotion: "shouting", pause: "medium" },
    //   ],
    // },

    // ─── PYQ (question card renders automatically) ────
    // {
    //   type: "pyq",
    //   sceneTitle: "NEET 2023",
    //   year: 2023,
    //   exam: "NEET",
    //   question: "The actual question text",
    //   options: [
    //     { label: "A", text: "...", isCorrect: false },
    //     { label: "B", text: "...", isCorrect: true },
    //     { label: "C", text: "...", isCorrect: false },
    //     { label: "D", text: "...", isCorrect: false },
    //   ],
    //   solution: "Quick solution explanation",
    //   lines: [
    //     { speaker: "Teacher", text: "Voiceover...", emotion: "excited", pause: "short" },
    //   ],
    // },

    // ─── SUMMARY (bullet list renders automatically) ──
    // {
    //   type: "summary",
    //   sceneTitle: "Key Takeaways",
    //   title: "Summary",
    //   bullets: [
    //     { number: 1, text: "Point one" },
    //     { number: 2, text: "Point two" },
    //   ],
    //   lines: [
    //     { speaker: "Teacher", text: "Voiceover recap...", emotion: "neutral", pause: "short" },
    //   ],
    // },

    // ─── OUTRO ──────────────────────────────────
    {
      type: "outro",
      backgroundVariant: "waves",
      sceneTitle: "Coming Up Next",
      ctaText: "Subscribe & Share!",
      nextVideoTeaser: "Next topic teaser",
      lines: [
        {
          speaker: "Teacher",
          text: "Closing voiceover — teaser for next video",
          emotion: "excited",
          pause: "short",
        },
      ],
    },
  ],
};
