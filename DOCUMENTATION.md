# NEET Video Pipeline — Complete Documentation

> A JSON-driven, visual-first Remotion video engine for NEET educational content.
> Write a config, drop in media assets, generate voiceovers, render cinematic videos.

---

## Table of Contents

1. [Architecture Overview](#1-architecture-overview)
2. [Project Structure](#2-project-structure)
3. [Quick Start](#3-quick-start)
4. [Creating a New Video (Step-by-Step)](#4-creating-a-new-video-step-by-step)
5. [Scene Types Reference](#5-scene-types-reference)
6. [Media System](#6-media-system)
7. [Theme System](#7-theme-system)
8. [Voiceover Generation](#8-voiceover-generation)
9. [Schema Reference](#9-schema-reference)
10. [Components Reference](#10-components-reference)
11. [Rendering & Export](#11-rendering--export)
12. [How the Engine Works (Internals)](#12-how-the-engine-works-internals)
13. [Improvement Roadmap](#13-improvement-roadmap)

---

## 1. Architecture Overview

```
┌─────────────────────────────────────────────────────────┐
│                    VIDEO CONFIG (JSON)                   │
│  title, subject, chapter, characters, scenes[], media[] │
└────────────────────────┬────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────┐
│                    Root.jsx (Entry)                      │
│  Registers Compositions → NEETVideo component           │
└────────────────────────┬────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────┐
│               NEETVideo/index.jsx (Sequencer)           │
│  Uses <Series> to render scenes one after another       │
│  Applies theme, passes characters & bgMusic             │
└────────────────────────┬────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────┐
│             SceneRenderer.jsx (Visual-First Engine)      │
│  1. Strips lines[] (dialogue → voiceover only)          │
│  2. Renders scene component (background + structural)   │
│  3. Adds cinematic vignette overlay                     │
│  4. Renders MediaOverlay (images/SVGs/GIFs/videos)      │
│  5. Adds SceneLabel (lower-third concept title)          │
│  6. Plays SceneAudio (voiceover + bg music)             │
└────────────────────────┬────────────────────────────────┘
                         │
              ┌──────────┼──────────┐
              ▼          ▼          ▼
        Scene Components   Media    Audio
        (10 types)        Overlay   Layer
```

### Design Philosophy

- **Visual-first**: Dialogue text (`lines[]`) is NOT rendered on screen. It exists only for voiceover generation. The viewer sees media assets, animated backgrounds, and structural elements (formulas, PYQ cards, etc.).
- **JSON-driven**: Every video is just a different JavaScript object (config) passed as props. Zero code changes needed to make a new video.
- **Cinematic**: Every scene gets a vignette overlay, themed animated background, frosted-glass concept label, and spring-based animations.

---

## 2. Project Structure

```
video-pipeline/
├── package.json                     # Dependencies & scripts
├── remotion.config.js               # Remotion config (JPEG format, Tailwind v4)
├── .env                             # ElevenLabs API key (create this)
│
├── public/
│   ├── media/                       # Your visual assets
│   │   └── photoelectric/           # Per-topic folders
│   │       ├── wave-spread.svg
│   │       ├── einstein-portrait.svg
│   │       └── red-vs-violet.svg
│   └── voiceover/                   # Generated MP3s (auto-created)
│       └── photoelectric-effect/
│           ├── scene-0.mp3
│           └── ...
│
├── scripts/
│   └── generate-voiceover.mjs       # ElevenLabs TTS batch generator
│
└── src/
    ├── Root.jsx                     # Remotion entry — registers compositions
    ├── schema.js                    # Zod validation + duration estimation
    ├── index.css                    # Tailwind CSS entry
    ├── index.js                     # Remotion bootstrap
    │
    ├── NEETVideo/
    │   └── index.jsx                # Main composition (Series sequencer)
    │
    ├── data/                        # Video configs (your "scripts")
    │   ├── _template.js             # Blank starter with full documentation
    │   ├── example-photoelectric.js # Physics long-form (10 scenes)
    │   ├── example-raoult-law.js    # Chemistry long-form (7 scenes)
    │   └── example-nand-short.js    # Physics short-form (5 scenes)
    │
    ├── themes/
    │   └── index.js                 # 20 color palettes (5 per subject)
    │
    ├── components/                  # Reusable visual elements
    │   ├── AnimatedText.jsx         # Word-by-word text animations
    │   ├── Background.jsx           # 4 animated background variants
    │   ├── BulletList.jsx           # Staggered bullet points
    │   ├── FormulaDisplay.jsx       # Formula/equation cards
    │   ├── MediaOverlay.jsx         # Images/SVGs/GIFs/Videos
    │   ├── PYQCard.jsx              # Previous Year Question card
    │   ├── SceneAudio.jsx           # Voiceover + background music
    │   ├── SceneLabel.jsx           # Lower-third concept title
    │   ├── SpeakerLabel.jsx         # Speaker avatar label
    │   ├── TopicBadge.jsx           # Subject+Chapter badge (top)
    │   └── TrapBadge.jsx            # Pulsing warning badge
    │
    └── scenes/                      # Scene-type components
        ├── SceneRenderer.jsx        # Central orchestrator
        ├── HookScene.jsx            # Attention-grabbing opener
        ├── DialogueScene.jsx        # Two-character conversation
        ├── NarratorScene.jsx        # Single-speaker explanation
        ├── AnalogyScene.jsx         # Comparison cards
        ├── FormulaScene.jsx         # Formula display
        ├── TrapAlertScene.jsx       # Warning/trap scene
        ├── PYQScene.jsx             # PYQ challenge
        ├── SummaryScene.jsx         # Bullet-point recap
        ├── CalculationScene.jsx     # Step-by-step math
        └── OutroScene.jsx           # End card + CTA
```

---

## 3. Quick Start

### Prerequisites

- Node.js 18+
- npm

### Install & Run

```bash
# Install dependencies
npm install

# Launch Remotion Studio (preview in browser)
npm run dev
# → Opens http://localhost:3000

# Render a video to MP4
npx remotion render Photoelectric-Effect out/photoelectric.mp4
```

### Key npm scripts

| Script        | Command                | Description                     |
| ------------- | ---------------------- | ------------------------------- |
| `npm run dev` | `remotion studio`      | Launch visual preview studio    |
| `npm run build`| `remotion bundle`     | Build static bundle             |
| `npm run lint`| `eslint src`           | Lint source files               |

---

## 4. Creating a New Video (Step-by-Step)

### Step 1: Copy the template

```bash
cp src/data/_template.js src/data/my-new-video.js
```

### Step 2: Edit the config

Open `src/data/my-new-video.js` and fill in:

```javascript
export const myNewVideo = {
  title: "Ohm's Law Explained",
  subject: "physics",         // physics | chemistry | biology | math
  chapter: "Current Electricity",
  format: "long",             // long (1920×1080) | short (1080×1920)
  characters: [
    { name: "Sir Ji", role: "teacher" },
    { name: "Ravi", role: "student" },
  ],
  themeVariant: 1,            // 0-4, picks from 5 palettes per subject
  scenes: [
    {
      type: "hook",
      backgroundVariant: "particles",
      sceneTitle: "What is Resistance?",
      subtitle: "The concept that stops current",
      lines: [
        {
          speaker: "Sir Ji",
          text: "Kya tumne kabhi socha hai ki current flow kyun rukta hai?",
          emotion: "curious",
          pause: "short",
        },
      ],
      media: [
        {
          type: "image",
          src: "media/ohms-law/resistance-diagram.png",
          position: "center",
          width: 700,
          animation: "scaleUp",
          enterDelay: 10,
        },
      ],
    },
    // ... more scenes
  ],
};
```

### Step 3: Add media assets

Place your images/SVGs/GIFs/videos in:

```
public/media/ohms-law/
├── resistance-diagram.png
├── circuit-animation.gif
└── ohm-formula.svg
```

### Step 4: Register the composition

Add to `src/Root.jsx`:

```jsx
import { myNewVideo } from "./data/my-new-video";

// Inside <Folder name="NEET-Videos">:
<Composition
  id="Ohms-Law"
  component={NEETVideo}
  schema={NEETVideoSchema}
  durationInFrames={estimateTotalDuration(myNewVideo.scenes, FPS)}
  fps={FPS}
  width={1920}
  height={1080}
  defaultProps={myNewVideo}
/>
```

### Step 5: Preview

```bash
npm run dev
# Select "Ohms-Law" from the sidebar in Remotion Studio
```

### Step 6: Generate voiceover (optional)

```bash
# Create .env with your API key
echo "ELEVENLABS_API_KEY=your_key_here" > .env

# Generate MP3s for all scenes
node --env-file=.env scripts/generate-voiceover.mjs src/data/my-new-video.js
```

The script outputs `audio` config entries — paste them into each scene.

### Step 7: Render

```bash
npx remotion render Ohms-Law out/ohms-law.mp4
```

---

## 5. Scene Types Reference

Every scene shares a common base:

| Field              | Type                | Description                                |
| ------------------ | ------------------- | ------------------------------------------ |
| `type`             | string (required)   | Scene type discriminator                   |
| `lines[]`          | SpeakerLine[]       | Voiceover script (NOT shown on screen)     |
| `media[]`          | MediaItem[]         | Visual assets displayed on screen          |
| `sceneTitle`       | string              | Concept title (lower-third label)          |
| `subtitle`         | string              | Secondary text under title                 |
| `backgroundVariant`| enum                | `"gradient"` `"grid"` `"particles"` `"waves"` |
| `layoutVariant`    | 0-3                 | Layout arrangement variation               |
| `audio`            | object              | `{ src, durationInFrames }` from voiceover |
| `bgMusic`          | string              | Per-scene background music override        |

### `hook`

Dramatic opener — big text, dramatic entry, "🎯 HOOK" badge.

```javascript
{ type: "hook", lines: [...], media: [...] }
```

### `dialogue`

Two-character conversation. 4 layout variants: `split`, `stacked`, `chatBubble`, `spotlight`.

```javascript
{ type: "dialogue", layoutVariant: 2, lines: [...] }
```

### `narrator`

Single-speaker explanation. Optional `visualCue` (emoji icon).

```javascript
{ type: "narrator", visualCue: "🔁", lines: [...] }
```

### `analogy`

Visual comparison with two animated cards.

```javascript
{
  type: "analogy",
  analogyTitle: "Photon = Bullet",
  analogyIcon: "💥",
  comparison: {
    left: "Wave Theory",
    right: "Photon Picture",
    leftLabel: "Misting Fan (spread)",
    rightLabel: "Water Balloon (concentrated)",
  },
  lines: [...],
}
```

### `formula`

Formula/equation cards with 4 visual styles.

```javascript
{
  type: "formula",
  style: "neon",  // "clean" | "neon" | "chalk" | "handwritten"
  formulas: [
    { label: "Photon Energy", expression: "E = hν", highlight: true },
    { label: "Momentum", expression: "p = E / c", highlight: false },
  ],
  lines: [...],
}
```

### `trapAlert`

Warning scene with pulsing "⚠️ TRAP ALERT!" badge, red flash, and description.

```javascript
{
  type: "trapAlert",
  trapDescription: "Don't assume 100% efficiency!",
  correctApproach: "Always check if efficiency is given in the question.",
  lines: [...],
}
```

### `pyq`

Previous Year Question — animated card with options and answer reveal.

```javascript
{
  type: "pyq",
  year: 2021,
  exam: "NEET",
  question: "The wavelength of light...",
  options: [
    { label: "A", text: "3.0 eV", isCorrect: false },
    { label: "B", text: "3.1 eV", isCorrect: true },
    { label: "C", text: "6.2 eV", isCorrect: false },
    { label: "D", text: "9.3 eV", isCorrect: false },
  ],
  solution: "E = 12400/200 = 6.2 eV. KE = 6.2 - 3.1 = 3.1 eV.",
  lines: [...],
}
```

### `summary`

Bullet-point recap with staggered animations.

```javascript
{
  type: "summary",
  title: "Final Summary",
  bullets: [
    { number: 1, text: "Intensity → Current" },
    { number: 2, text: "Frequency → Speed" },
  ],
  lines: [...],
}
```

### `calculation`

Step-by-step math walkthrough with numbered cards.

```javascript
{
  type: "calculation",
  steps: [
    { label: "Given", expression: "P = 5W, λ = 5000 Å" },
    { label: "Energy", expression: "E = 12400 / 5000 = 2.48 eV" },
    { label: "Answer", expression: "n = 1.25 × 10¹⁹ per sec" },
  ],
  lines: [...],
}
```

### `outro`

End card with CTA button and next video teaser.

```javascript
{
  type: "outro",
  ctaText: "Subscribe & Share!",
  nextVideoTeaser: "Next: Stopping Potential deep dive",
  lines: [...],
}
```

---

## 6. Media System

### Overview

The `media[]` array on any scene allows you to overlay images, SVGs, GIFs, and video clips. These are the primary visual content (replacing on-screen dialogue text).

### Media Item Properties

| Property       | Type    | Default     | Description                                       |
| -------------- | ------- | ----------- | ------------------------------------------------- |
| `type`         | enum    | required    | `"image"` `"svg"` `"gif"` `"video"`              |
| `src`          | string  | required    | Path relative to `public/`, or full URL           |
| `position`     | enum    | `"center"`  | See position presets below                        |
| `width`        | number  | auto        | Width in pixels                                   |
| `height`       | number  | auto        | Height in pixels                                  |
| `animation`    | enum    | `"fadeIn"`  | Entrance animation                                |
| `enterDelay`   | number  | `0`         | Frames to wait before appearing                   |
| `duration`     | number  | full scene  | Frames to show (omit = entire scene)              |
| `opacity`      | 0-1     | `1`         | Max opacity                                       |
| `caption`      | string  | —           | Small text label below the media                  |
| `borderRadius` | number  | `0`         | Rounded corners in px                             |
| `objectFit`    | enum    | `"contain"` | `"contain"` `"cover"` `"fill"`                    |
| `loop`         | boolean | `true`      | For gif/video — loop playback                     |
| `muted`        | boolean | `true`      | For video — mute audio track                      |

### Position Presets

| Value           | Placement                             |
| --------------- | ------------------------------------- |
| `center`        | Absolute center of frame              |
| `left`          | Vertically centered, 60px from left   |
| `right`         | Vertically centered, 60px from right  |
| `topLeft`       | Top-left corner (80px, 60px)          |
| `topRight`      | Top-right corner                      |
| `bottomLeft`    | Bottom-left corner                    |
| `bottomRight`   | Bottom-right corner                   |
| `background`    | Full-frame, behind other content      |
| `fullscreen`    | Full-frame, centered content          |

### Animation Types

| Animation     | Effect                                     |
| ------------- | ------------------------------------------ |
| `fadeIn`      | Opacity 0 → 1 with spring                 |
| `scaleUp`     | Scale 0.5 → 1 + fade                      |
| `slideLeft`   | Slide in from right + fade                 |
| `slideRight`  | Slide in from left + fade                  |
| `slideUp`     | Slide up from below + fade                 |
| `none`        | Instant appear (no animation)              |

### Rendering Behavior

| Type    | Renderer                    | Notes                            |
| ------- | --------------------------- | -------------------------------- |
| `image` | Remotion `<Img>`            | For PNG, JPG, WebP               |
| `svg`   | Remotion `<Img>`            | SVG treated as image             |
| `gif`   | `<Gif>` from `@remotion/gif`| Timeline-synced, loopable        |
| `video` | `<Video>` from `@remotion/media` | Embedded video clip         |

### Example: Multiple Media in One Scene

```javascript
media: [
  // Background diagram (appears first, behind other assets)
  {
    type: "svg",
    src: "media/topic/diagram.svg",
    position: "background",
    animation: "fadeIn",
    opacity: 0.3,
  },
  // Main visual (appears after 10 frames)
  {
    type: "image",
    src: "media/topic/main-photo.png",
    position: "center",
    width: 700,
    animation: "scaleUp",
    enterDelay: 10,
  },
  // Supporting GIF (appears after 40 frames, right side)
  {
    type: "gif",
    src: "media/topic/animation.gif",
    position: "right",
    width: 400,
    height: 400,
    animation: "slideLeft",
    enterDelay: 40,
    caption: "Visual explanation",
  },
],
```

---

## 7. Theme System

### 20 Color Palettes

Each subject has **5 visual themes** (selected via `themeVariant: 0-4`):

| Subject   | 0             | 1              | 2             | 3              | 4             |
| --------- | ------------- | -------------- | ------------- | -------------- | ------------- |
| Physics   | Electric Blue | Quantum Violet | Neon Circuit  | Plasma Orange  | Deep Space    |
| Chemistry | Emerald Lab   | Reaction Red   | Teal Flask    | Gold Catalyst  | Molecular Purple |
| Biology   | Cell Green    | DNA Rose       | Ocean Bio     | Autumn Leaf    | Coral Reef    |
| Math      | Amber Logic   | Matrix Green   | Indigo Proof  | Copper Calc    | Silver Graph  |

### Theme Properties

Each theme object contains:

```javascript
{
  name: "Electric Blue",
  bg: "#0a0e27",           // Main background color
  surface: "#111638",      // Card/panel background
  primary: "#4fc3f7",      // Primary accent
  secondary: "#81d4fa",    // Secondary accent
  accent: "#00e5ff",       // Highlight color
  text: "#e8eaf6",         // Main text color
  textMuted: "#9fa8da",    // Subdued text
  speaker: {
    teacher: "#4fc3f7",    // Teacher speaker color
    student: "#ff8a65",    // Student speaker color
  },
  gradient: "linear-gradient(135deg, ...)",  // Background gradient
  trapBg: "#b71c1c",      // Trap alert red
}
```

### Usage in Config

```javascript
{
  subject: "physics",
  themeVariant: 2,  // → "Neon Circuit" palette
}
```

### API

```javascript
import { getTheme, getSpeakerColor } from "./themes";

const theme = getTheme("physics", 2);
const color = getSpeakerColor(theme, "teacher");
```

---

## 8. Voiceover Generation

### Overview

The `scripts/generate-voiceover.mjs` script reads your video config, extracts `lines[]` text from each scene, sends it to ElevenLabs TTS API, and saves MP3 files.

### Setup

```bash
# 1. Create .env file at project root
echo "ELEVENLABS_API_KEY=sk_your_key_here" > .env

# 2. Install duration measurement library (optional, has fallback)
npm install mediabunny
```

### Usage

```bash
node --env-file=.env scripts/generate-voiceover.mjs <config-path> [--voice-id=VOICE_ID]
```

**Examples:**

```bash
# Use default voice
node --env-file=.env scripts/generate-voiceover.mjs src/data/example-photoelectric.js

# Specify a custom ElevenLabs voice
node --env-file=.env scripts/generate-voiceover.mjs src/data/my-video.js --voice-id=pNInz6obpgDQGcFmaJgB
```

### Output

```
public/voiceover/<slug>/
├── scene-0.mp3
├── scene-1.mp3
├── scene-2.mp3
└── ...
```

The script also prints `audio` config entries to paste into your data file:

```
📋 Paste these `audio` fields into your scene configs:
────────────────────────────────────────────────────────────
  // Scene 0 (hook)
  audio: { src: "voiceover/photoelectric-effect/scene-0.mp3", durationInFrames: 240 },

  // Scene 1 (dialogue)
  audio: { src: "voiceover/photoelectric-effect/scene-1.mp3", durationInFrames: 310 },
────────────────────────────────────────────────────────────
```

### Voice Configuration

Configure TTS settings in your video config:

```javascript
voiceover: {
  enabled: true,
  voiceId: "pNInz6obpgDQGcFmaJgB",     // ElevenLabs voice ID
  model: "eleven_multilingual_v2",       // Best for Hinglish
  stability: 0.5,                        // 0-1, higher = more consistent
  similarityBoost: 0.75,                 // 0-1, higher = more similar to original
  style: 0.3,                            // 0-1, higher = more expressive
}
```

### How Duration Estimation Works

1. **With audio**: If a scene has `audio.durationInFrames`, that exact value is used (+ 15 frame buffer).
2. **Without audio**: Duration is estimated from `lines[]` text using a Hinglish speaking rate of 2.8 words/second, plus scene-type padding (e.g., PYQ gets +60 frames extra, formula gets +50).
3. **Minimum**: Every scene is at least 60 frames (2 seconds).

---

## 9. Schema Reference

All configs are validated via Zod. The schema is defined in `src/schema.js`.

### SpeakerLine

```typescript
{
  speaker: string,                    // Character name
  text: string,                       // Voiceover script text
  emotion: "neutral" | "excited" | "stressed" | "happy" | "shouting" | "curious",
  pause: "none" | "short" | "medium" | "long",
}
```

### Character

```typescript
{
  name: string,
  role: "teacher" | "student",
  color?: string,                     // Override speaker color
  avatar?: string,                    // Emoji or image path
}
```

### NEETVideoSchema (Top Level)

```typescript
{
  title: string,
  subject: "physics" | "chemistry" | "biology" | "math",
  chapter: string,
  format: "long" | "short",          // Default: "long"
  characters: Character[],            // 1-3 characters
  themeVariant: 0-4,                  // Default: 0
  voiceover?: VoiceoverConfig,
  bgMusic?: string,                   // Global background music path
  scenes: Scene[],                    // At least 1 scene
}
```

### Exported Utilities

```javascript
import { NEETVideoSchema, estimateSceneDuration, estimateTotalDuration } from "./schema";

// Validate a config
const result = NEETVideoSchema.safeParse(myConfig);

// Get duration for a single scene (in frames)
const frames = estimateSceneDuration(scene, 30);

// Get total video duration (in frames)
const totalFrames = estimateTotalDuration(scenes, 30);
```

---

## 10. Components Reference

### AnimatedText

Word-by-word text animation with 4 variants.

| Prop         | Type   | Default    | Description                          |
| ------------ | ------ | ---------- | ------------------------------------ |
| `text`       | string | required   | The text to animate                  |
| `variant`    | enum   | `"fadeUp"` | `fadeUp` `typewriter` `wordPop` `slideIn` |
| `color`      | string | `#ffffff`  | Text color                           |
| `fontSize`   | number | `42`       | Font size in px                      |
| `startDelay` | number | `0`        | Frame delay before animation starts  |
| `maxWidth`   | number | `1600`     | Max width constraint                 |
| `textAlign`  | string | `"center"` | CSS text-align                       |

### Background

Animated full-frame background patterns.

| Variant      | Description                                           |
| ------------ | ----------------------------------------------------- |
| `gradient`   | Radial gradient with moving center point              |
| `grid`       | Animated horizontal + vertical grid lines             |
| `particles`  | 30 floating, pulsing circles (golden-angle positioned)|
| `waves`      | 3-layer sine wave animation                           |

### FormulaDisplay

Animated formula cards.

| Style         | Description                                   |
| ------------- | --------------------------------------------- |
| `clean`       | Semi-transparent surface, subtle shadow       |
| `neon`        | Dark background, glowing accent borders       |
| `chalk`       | Green chalkboard aesthetic                    |
| `handwritten` | Light warm background, gentle shadow          |

### MediaOverlay

Renders all `media[]` items with position, animation, and timing. See [Media System](#6-media-system).

### SceneLabel

Lower-third frosted-glass concept label. Spring-animated slide-in with backdrop blur, accent-colored left border. Max width 700px.

### SceneAudio

Renders `<Audio>` components from `@remotion/media`:
- Voiceover at volume `1`
- Background music at volume `0.08` with loop

### PYQCard

Previous Year Question card with:
- Header badge (exam name + year)
- Question text
- Options with staggered reveal
- Correct answer highlight (✅) after delay
- Solution panel

### BulletList

Staggered animated bullet points with accent-colored numbers/icons.

### TrapBadge

Pulsing "⚠️ TRAP ALERT! ⚠️" badge with glowing shadow.

### TopicBadge

Persistent badge at top center showing subject emoji + name + chapter. Stays visible across all scenes.

### SpeakerLabel

Speaker avatar with name, positioned in one of 4 layout corners.

---

## 11. Rendering & Export

### Preview in Studio

```bash
npm run dev
```

Opens Remotion Studio at `http://localhost:3000`. Select any composition from the sidebar to preview.

### Render to MP4

```bash
# Render specific composition
npx remotion render <composition-id> <output-path>

# Examples
npx remotion render Photoelectric-Effect out/photoelectric.mp4
npx remotion render NAND-Gate-Short out/nand-short.mp4
npx remotion render Raoult-Law out/raoult.mp4
```

### Render Options

```bash
# Custom quality (CRF: lower = better quality, larger file)
npx remotion render Photoelectric-Effect out/video.mp4 --crf 18

# Specific frame range (for testing)
npx remotion render Photoelectric-Effect out/preview.mp4 --frames=0-150

# Still frame (PNG)
npx remotion still Photoelectric-Effect out/thumbnail.png --frame=100

# With custom props (override defaults)
npx remotion render Photoelectric-Effect out/video.mp4 --props='{"themeVariant": 3}'
```

### Resolution

| Format  | Width | Height | Aspect Ratio |
| ------- | ----- | ------ | ------------ |
| `long`  | 1920  | 1080   | 16:9         |
| `short` | 1080  | 1920   | 9:16         |

Resolution is set in `Root.jsx` per composition, not in the config.

---

## 12. How the Engine Works (Internals)

### Data Flow

1. **Config files** (`src/data/*.js`) export plain JavaScript objects conforming to `NEETVideoSchema`.

2. **Root.jsx** imports configs and registers them as Remotion `<Composition>` elements. Duration is auto-calculated via `estimateTotalDuration()`.

3. **NEETVideo** component receives the config as props, resolves the theme via `getTheme(subject, themeVariant)`, and renders scenes sequentially using `<Series>`.

4. **SceneRenderer** is the central orchestrator for each scene:
   - Strips `lines[]` from the scene data (→ visual scene has no dialogue text)
   - Renders the appropriate scene component (HookScene, DialogueScene, etc.)
   - Layers on top: vignette → MediaOverlay → gradient → SceneLabel → SceneAudio

5. **Scene components** render their structural elements:
   - HookScene: dramatic text + "HOOK" badge
   - FormulaScene: formula cards via `<FormulaDisplay>`
   - PYQScene: question card via `<PYQCard>`
   - TrapAlertScene: warning badge + description
   - etc.

6. **MediaOverlay** renders each item in the scene's `media[]` array with position presets, spring-based entrance animations, `enterDelay`, and `duration` control.

7. **SceneAudio** plays the voiceover MP3 and background music.

### Duration Estimation Algorithm

```
sceneDuration = sum(wordCount / 2.8 * fps + pauseFrames) + typePadding
```

- Pause frames: `none=0`, `short=8`, `medium=20`, `long=35`
- Type padding: `hook=30`, `pyq=60`, `formula=50`, `calculation=45`, etc.
- Minimum duration: 60 frames (2 seconds)
- If `audio.durationInFrames` is set, uses that + 15 frame buffer instead

### Visual Layering (z-index)

```
z:  0  → Background (gradient/grid/particles/waves)
z:  1  → Media items with position: "background"
z:  2  → Cinematic vignette overlay
z:  5  → Scene structural elements (text, cards, formulas)
z: 15  → Media items (non-background)
z: 18  → Bottom gradient (for label readability)
z: 20  → SceneLabel (lower-third)
z: 40  → TopicBadge (subject+chapter, top center)
z: 50  → SpeakerLabel (avatar, corner)
```

---

## 13. Improvement Roadmap

### When You Want to Improve the System

Here are concrete areas for enhancement, organized by complexity.

---

### Quick Wins (< 1 hour each)

#### Add more background variants
Edit `src/components/Background.jsx`. Add a new `if (variant === "dots")` block. Register the variant name in the schema's `backgroundVariant` enum in `src/schema.js`.

#### Add more text animation variants
Edit `src/components/AnimatedText.jsx`. Add a new `else if (variant === "glitch")` case. No schema change needed (it's a free string).

#### Add more formula styles
Edit `src/components/FormulaDisplay.jsx`. Add to the `styleMap` object. Register in the schema's `style` enum for FormulaSceneSchema.

#### Add more theme palettes
Edit `src/themes/index.js`. Each subject can have any number of themes (variant wraps with modulo). Add another object to the subject's array.

#### Add more media animation types
Edit `src/components/MediaOverlay.jsx` → the entrance animation section. Add to the `animation` enum in `MediaItemSchema` in `src/schema.js`.

---

### Medium Complexity (1-4 hours)

#### Add a new scene type
1. Create `src/scenes/MyNewScene.jsx` (follow any existing scene as template)
2. Add a Zod schema in `src/schema.js` (extend `BaseScene`, add to `SceneSchema` discriminated union)
3. Register in `SCENE_MAP` in `src/scenes/SceneRenderer.jsx`
4. Add type padding in `estimateSceneDuration()` in `src/schema.js`

#### Add media caption styling
Enhance the caption in `MediaOverlay.jsx` with themed colors, background panels, or animations.

#### Add scene transitions
Use `@remotion/transitions` (already installed) to add cross-fade, slide, or wipe transitions between scenes. Modify `NEETVideo/index.jsx` to use `TransitionSeries` instead of `Series`.

#### Add a progress bar / timeline indicator
Create a `ProgressBar` component that sits at the bottom of the frame, showing how far through the video the viewer is. Use `useCurrentFrame()` and `useVideoConfig()` to calculate progress.

#### Improve duration estimation for voiceover
Instead of word-count estimation, use the actual `audio.durationInFrames` value. Build a helper script that post-processes configs after voiceover generation to patch in exact durations automatically.

---

### Larger Enhancements (4+ hours)

#### Auto-generate configs from AI
Build a script that takes a topic name and generates a complete video config using an LLM (GPT-4, Claude, etc.) — dialogue, media descriptions, scene structure.

#### Media asset pipeline
Build a script that takes media descriptions from the config and auto-generates images using DALL-E, Flux, or Stable Diffusion. SVGs could be generated from text descriptions.

#### Subtitle / caption track
Generate `.srt` subtitle files from `lines[]` using the audio duration data.

#### Multi-language support
Extend the voiceover system to generate audio in multiple languages. Add a `language` field to `VoiceoverConfigSchema`.

#### Interactive quiz mode
Build a React web app that pauses the video at PYQ scenes and lets the viewer tap an answer before revealing the solution.

#### Batch rendering pipeline
Build a Node.js script that reads a folder of configs and renders all of them in parallel using `@remotion/renderer`.

#### Character avatars/illustrations
Replace emoji avatars with actual illustrated character assets. Add an `avatar` field that accepts image paths and render them in `SpeakerLabel`.

#### Animation timeline editor
Build a visual editor (React app) that lets you drag-and-drop media items on a timeline, set their `enterDelay` and `duration`, and preview in real-time.

---

### Key Files to Touch per Enhancement Area

| Enhancement Area        | Primary Files                                         |
| ----------------------- | ----------------------------------------------------- |
| New scene type          | `schema.js`, `SceneRenderer.jsx`, new `*Scene.jsx`    |
| New component           | `src/components/NewComponent.jsx`, scene files that use it |
| New theme               | `src/themes/index.js`                                 |
| New background          | `Background.jsx`, `schema.js` (enum)                  |
| New media feature       | `MediaOverlay.jsx`, `schema.js` (MediaItemSchema)     |
| Audio / voiceover       | `SceneAudio.jsx`, `generate-voiceover.mjs`, `schema.js` |
| Scene transitions       | `NEETVideo/index.jsx` (swap Series → TransitionSeries)|
| Duration / timing       | `schema.js` (estimateSceneDuration)                   |
| New example video       | `src/data/new-example.js`, `Root.jsx` (composition)   |

---

## Tech Stack Summary

| Package                  | Version   | Purpose                            |
| ------------------------ | --------- | ---------------------------------- |
| `remotion`               | 4.0.422   | Video creation framework           |
| `react`                  | 19.2.3    | UI rendering                       |
| `zod`                    | 3.22.3    | Schema validation (Remotion req)   |
| `tailwindcss`            | 4.0.0     | Utility-first CSS                  |
| `@remotion/cli`          | 4.0.422   | CLI tools (studio, render)         |
| `@remotion/gif`          | 4.0.422   | Timeline-synced GIF rendering      |
| `@remotion/media`        | 4.0.422   | Audio & Video components           |
| `@remotion/transitions`  | 4.0.422   | Scene transition effects           |
| `@remotion/google-fonts` | 4.0.422   | Google Fonts integration           |
| `@remotion/tailwind-v4`  | 4.0.422   | Tailwind v4 webpack override       |
| ElevenLabs API           | —         | Text-to-speech (Hinglish)          |

---

*Last updated: June 2025*
