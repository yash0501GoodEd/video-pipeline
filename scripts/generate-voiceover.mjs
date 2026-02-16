/**
 * ╔══════════════════════════════════════════════════════════╗
 * ║        VOICEOVER GENERATION — ElevenLabs TTS            ║
 * ╠══════════════════════════════════════════════════════════╣
 * ║  Reads a video config, generates MP3 per scene,         ║
 * ║  measures durations, and outputs an updated config.     ║
 * ╚══════════════════════════════════════════════════════════╝
 *
 * USAGE:
 *   node --env-file=.env scripts/generate-voiceover.mjs <config-path> [--voice-id=VOICE_ID]
 *
 * EXAMPLE:
 *   node --env-file=.env scripts/generate-voiceover.mjs src/data/example-photoelectric.js
 *
 * PREREQUISITES:
 *   1. Create .env with: ELEVENLABS_API_KEY=your_key_here
 *   2. npm i mediabunny (for duration measurement)
 *
 * VOICE IDS (ElevenLabs):
 *   - Hindi male: search on ElevenLabs voice library
 *   - Use --voice-id flag or set in video config under voiceover.voiceId
 *
 * OUTPUT:
 *   - MP3 files in public/voiceover/<video-slug>/scene-<N>.mp3
 *   - Prints updated `audio` entries to paste into your config
 */

import { writeFileSync, mkdirSync, existsSync } from "fs";
import { resolve, basename } from "path";

const API_KEY = process.env.ELEVENLABS_API_KEY;

if (!API_KEY) {
  console.error("❌ Missing ELEVENLABS_API_KEY in .env file");
  console.error("   Create a .env file at project root with:");
  console.error("   ELEVENLABS_API_KEY=your_key_here");
  process.exit(1);
}

// ─── Parse args ──────────────────────────────────────────────

const args = process.argv.slice(2);
const configPath = args.find((a) => !a.startsWith("--"));
const voiceIdArg = args
  .find((a) => a.startsWith("--voice-id="))
  ?.split("=")[1];

if (!configPath) {
  console.error("Usage: node --env-file=.env scripts/generate-voiceover.mjs <config-path>");
  process.exit(1);
}

// ─── Load video config ───────────────────────────────────────

async function loadConfig(path) {
  const mod = await import(resolve(path));
  // Find the first exported object with `scenes`
  const key = Object.keys(mod).find((k) => mod[k]?.scenes);
  if (!key) {
    console.error("❌ No video config with `scenes` found in", path);
    process.exit(1);
  }
  return { config: mod[key], exportName: key };
}

// ─── Build full text for a scene ─────────────────────────────

function buildSceneText(scene) {
  const lines = scene.lines || [];
  return lines
    .map((line) => {
      const speakerPrefix = lines.length > 1 ? `${line.speaker}: ` : "";
      return `${speakerPrefix}${line.text}`;
    })
    .join("\n\n");
}

// ─── Generate a single voiceover ─────────────────────────────

async function generateAudio(text, voiceId, voiceoverConfig = {}) {
  const model = voiceoverConfig.model || "eleven_multilingual_v2";
  const stability = voiceoverConfig.stability ?? 0.5;
  const similarityBoost = voiceoverConfig.similarityBoost ?? 0.75;
  const style = voiceoverConfig.style ?? 0.3;

  const response = await fetch(
    `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
    {
      method: "POST",
      headers: {
        "xi-api-key": API_KEY,
        "Content-Type": "application/json",
        Accept: "audio/mpeg",
      },
      body: JSON.stringify({
        text,
        model_id: model,
        voice_settings: {
          stability,
          similarity_boost: similarityBoost,
          style,
        },
      }),
    }
  );

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`ElevenLabs API error (${response.status}): ${error}`);
  }

  return Buffer.from(await response.arrayBuffer());
}

// ─── Measure audio duration ──────────────────────────────────

async function measureDuration(filePath) {
  try {
    // Try mediabunny first
    const { Input, ALL_FORMATS, FileSource } = await import("mediabunny");
    const fs = await import("fs");
    const file = fs.readFileSync(filePath);
    const blob = new Blob([file], { type: "audio/mpeg" });
    const input = new Input({
      formats: ALL_FORMATS,
      source: new FileSource(blob),
    });
    return await input.computeDuration();
  } catch {
    // Fallback: estimate from file size (rough: 128kbps MP3)
    const { statSync } = await import("fs");
    const stats = statSync(filePath);
    const bytesPerSecond = 128_000 / 8; // 128kbps
    return stats.size / bytesPerSecond;
  }
}

// ─── Main ────────────────────────────────────────────────────

async function main() {
  const { config, exportName } = await loadConfig(configPath);
  const slug = config.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/-+$/, "");

  const outDir = resolve("public", "voiceover", slug);
  mkdirSync(outDir, { recursive: true });

  const voiceId =
    voiceIdArg ||
    config.voiceover?.voiceId ||
    "21m00Tcm4TlvDq8ikWAM"; // ElevenLabs "Rachel" default

  const FPS = 30;
  const results = [];

  console.log(`\n🎙️  Generating voiceover for: ${config.title}`);
  console.log(`   Voice ID: ${voiceId}`);
  console.log(`   Output:   ${outDir}/\n`);

  for (let i = 0; i < config.scenes.length; i++) {
    const scene = config.scenes[i];
    const text = buildSceneText(scene);

    if (!text.trim()) {
      console.log(`   ⏭️  Scene ${i} (${scene.type}): no text, skipping`);
      results.push(null);
      continue;
    }

    const filename = `scene-${i}.mp3`;
    const filepath = resolve(outDir, filename);
    const relativePath = `voiceover/${slug}/${filename}`;

    // Skip if already generated
    if (existsSync(filepath)) {
      console.log(`   ⏭️  Scene ${i} (${scene.type}): already exists, measuring...`);
      const duration = await measureDuration(filepath);
      const frames = Math.ceil(duration * FPS);
      results.push({ src: relativePath, durationInFrames: frames });
      console.log(`       Duration: ${duration.toFixed(1)}s (${frames} frames)`);
      continue;
    }

    console.log(`   🔊  Scene ${i} (${scene.type}): generating...`);
    try {
      const audioBuffer = await generateAudio(
        text,
        voiceId,
        config.voiceover
      );
      writeFileSync(filepath, audioBuffer);

      const duration = await measureDuration(filepath);
      const frames = Math.ceil(duration * FPS);
      results.push({ src: relativePath, durationInFrames: frames });
      console.log(`       ✅ ${duration.toFixed(1)}s (${frames} frames) → ${filename}`);
    } catch (err) {
      console.error(`       ❌ Failed: ${err.message}`);
      results.push(null);
    }

    // Rate limiting — 2 requests per second for free tier
    await new Promise((r) => setTimeout(r, 600));
  }

  // ─── Print audio config to paste into data file ─────────
  console.log("\n\n📋 Paste these `audio` fields into your scene configs:\n");
  console.log("─".repeat(60));

  for (let i = 0; i < results.length; i++) {
    if (!results[i]) continue;
    console.log(
      `  // Scene ${i} (${config.scenes[i].type})\n` +
        `  audio: { src: "${results[i].src}", durationInFrames: ${results[i].durationInFrames} },\n`
    );
  }

  console.log("─".repeat(60));
  console.log(`\n✅ Done! ${results.filter(Boolean).length}/${config.scenes.length} scenes generated.`);
  console.log(`   Files saved to: ${outDir}/`);
  console.log(`\n   Run 'npm run dev' to preview with voiceover.\n`);
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
