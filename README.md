# NEET Video Pipeline

JSON-driven, visual-first Remotion video engine for NEET educational content. Write a config → drop in media → generate voiceovers → render cinematic videos. No code changes needed.

# Sample Video

<video width="100%" controls>
  <source src="out/CTS-Short.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>

[out/CTS-Short.mp4](out/CTS-Short.mp4)
if video is not visible in browser.

## Quick Start

```bash
npm install          # Install dependencies
npm run dev          # Launch Remotion Studio → http://localhost:3000
```

## Create a New Video

```bash
cp src/data/_template.js src/data/my-video.js   # 1. Copy template
# 2. Edit my-video.js (fill in scenes, media, dialogue)
# 3. Add media assets to public/media/your-topic/
# 4. Register composition in src/Root.jsx
npm run dev                                      # 5. Preview
npx remotion render My-Video out/my-video.mp4    # 6. Render
```

## Generate Voiceover

```bash
echo "ELEVENLABS_API_KEY=your_key" > .env
node --env-file=.env scripts/generate-voiceover.mjs src/data/my-video.js
```

## What's Inside

- **10 scene types**: hook, dialogue, narrator, analogy, formula, trapAlert, pyq, summary, calculation, outro
- **20 theme palettes**: 5 per subject (physics, chemistry, biology, math)
- **Visual-first**: dialogue text drives voiceover only — on screen you see media, formulas, PYQ cards
- **Media overlays**: images, SVGs, GIFs, video clips with 9 position presets and 6 animations
- **ElevenLabs TTS**: batch voiceover generation script with auto-duration measurement

## Full Documentation

**→ [DOCUMENTATION.md](DOCUMENTATION.md)** — complete reference covering architecture, all scene types, media system, theme system, schema, components, rendering, and improvement roadmap.

## Tech Stack

Remotion 4.0.422 · React 19 · Zod 3.22 · Tailwind CSS 4 · @remotion/gif · @remotion/media · @remotion/transitions

## License

Note that for some entities a Remotion company license is needed. [Read the terms here](https://github.com/JonnyBurger/remotion/blob/main/LICENSE.md).
