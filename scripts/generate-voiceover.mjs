/**
 * ╔══════════════════════════════════════════════════════════╗
 * ║     VOICEOVER GENERATION — ElevenLabs & Sarvam AI       ║
 * ╠══════════════════════════════════════════════════════════╣
 * ║  Reads a video config, generates MP3 per scene,         ║
 * ║  measures durations, and outputs an updated config.     ║
 * ╚══════════════════════════════════════════════════════════╝
 *
 * USAGE:
 *   node --env-file=.env scripts/generate-voiceover.mjs <config-path> [options]
 *
 * OPTIONS:
 *   --provider=elevenlabs|sarvam   Override TTS provider (default: from config or elevenlabs)
 *   --voice-id=VOICE_ID            ElevenLabs voice ID override
 *   --speaker=SPEAKER_NAME         Sarvam AI speaker override (e.g. shubh, roopa)
 *   --force                        Regenerate audio even if files already exist
 *
 * EXAMPLES:
 *   # ElevenLabs (default)
 *   node --env-file=.env scripts/generate-voiceover.mjs src/data/example-photoelectric.js
 *
 *   # Sarvam AI
 *   node --env-file=.env scripts/generate-voiceover.mjs src/data/example-photoelectric.js --provider=sarvam
 *
 *   # Sarvam AI with custom speaker
 *   node --env-file=.env scripts/generate-voiceover.mjs src/data/my-video.js --provider=sarvam --speaker=roopa
 *
 * PREREQUISITES:
 *   - ElevenLabs: ELEVENLABS_API_KEY in .env
 *   - Sarvam AI:  SARVAM_API_KEY in .env
 *   - npm i mediabunny (for duration measurement)
 *
 * OUTPUT:
 *   - MP3 files in public/voiceover/<video-slug>/scene-<N>.mp3
 *   - Prints updated `audio` entries to paste into your config
 */

import { writeFileSync, mkdirSync, existsSync } from "fs";
import { resolve, basename } from "path";

// ─── Parse args ──────────────────────────────────────────────

const args = process.argv.slice(2);
const configPath = args.find((a) => !a.startsWith("--"));
const voiceIdArg = args
  .find((a) => a.startsWith("--voice-id="))
  ?.split("=")[1];
const providerArg = args
  .find((a) => a.startsWith("--provider="))
  ?.split("=")[1];
const speakerArg = args
  .find((a) => a.startsWith("--speaker="))
  ?.split("=")[1];
const forceArg = args.includes("--force");

if (!configPath) {
  console.error("Usage: node --env-file=.env scripts/generate-voiceover.mjs <config-path> [--provider=elevenlabs|sarvam]");
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
    .map((line) => line.text)
    .join("\n\n");
}

// ─── Generate audio via ElevenLabs ───────────────────────────

async function generateAudioElevenLabs(text, voiceId, voiceoverConfig = {}) {
  const apiKey = process.env.ELEVENLABS_API_KEY;
  if (!apiKey) {
    throw new Error(
      "Missing ELEVENLABS_API_KEY in .env file. Add: ELEVENLABS_API_KEY=your_key_here"
    );
  }

  const elConfig = voiceoverConfig.elevenlabs || {};
  const model = elConfig.model || voiceoverConfig.model || "eleven_multilingual_v2";
  const stability = elConfig.stability ?? voiceoverConfig.stability ?? 0.5;
  const similarityBoost = elConfig.similarityBoost ?? voiceoverConfig.similarityBoost ?? 0.75;
  const style = elConfig.style ?? voiceoverConfig.style ?? 0.3;

  const response = await fetch(
    `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
    {
      method: "POST",
      headers: {
        "xi-api-key": apiKey,
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

// ─── Generate audio via Sarvam AI ────────────────────────────

const SARVAM_MAX_CHARS = 2500; // bulbul:v3 limit

function splitTextForSarvam(text, maxChars = SARVAM_MAX_CHARS) {
  if (text.length <= maxChars) return [text];

  const chunks = [];
  const sentences = text.split(/(?<=[.!?।\n])\s+/);
  let current = "";

  for (const sentence of sentences) {
    if ((current + " " + sentence).trim().length > maxChars) {
      if (current.trim()) chunks.push(current.trim());
      current = sentence;
    } else {
      current = current ? current + " " + sentence : sentence;
    }
  }
  if (current.trim()) chunks.push(current.trim());
  return chunks;
}

async function generateAudioSarvam(text, voiceoverConfig = {}) {
  const apiKey = process.env.SARVAM_API_KEY;
  if (!apiKey) {
    throw new Error(
      "Missing SARVAM_API_KEY in .env file. Add: SARVAM_API_KEY=your_key_here"
    );
  }

  const sarvamConfig = voiceoverConfig.sarvam || {};
  const speaker = speakerArg || sarvamConfig.speaker || "shubh";
  const model = sarvamConfig.model || "bulbul:v3";
  const targetLanguageCode = sarvamConfig.targetLanguageCode || "hi-IN";
  const pace = sarvamConfig.pace ?? 1.1;
  const sampleRate = sarvamConfig.sampleRate || "48000";
  const temperature = sarvamConfig.temperature ?? 0.6;

  // Split text into chunks if it exceeds the character limit
  const chunks = splitTextForSarvam(text);
  const audioBuffers = [];

  for (const chunk of chunks) {
    const body = {
      text: chunk,
      target_language_code: targetLanguageCode,
      speaker,
      model,
      pace,
      speech_sample_rate: sampleRate,
      output_audio_codec: "mp3",
    };

    // Only add temperature for bulbul:v3
    if (model === "bulbul:v3") {
      body.temperature = temperature;
    }

    // Only add pitch/loudness for bulbul:v2
    if (model === "bulbul:v2") {
      body.pitch = sarvamConfig.pitch ?? 0;
      body.loudness = sarvamConfig.loudness ?? 1;
      body.enable_preprocessing = sarvamConfig.enablePreprocessing ?? false;
    }

    const response = await fetch("https://api.sarvam.ai/text-to-speech", {
      method: "POST",
      headers: {
        "api-subscription-key": apiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Sarvam AI API error (${response.status}): ${error}`);
    }

    const data = await response.json();

    if (!data.audios || data.audios.length === 0) {
      throw new Error("Sarvam AI returned no audio data");
    }

    // Decode base64 audio
    audioBuffers.push(Buffer.from(data.audios[0], "base64"));
  }

  // Concatenate all chunks into a single buffer
  return Buffer.concat(audioBuffers);
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

  // Determine provider
  const provider =
    providerArg || config.voiceover?.provider || "elevenlabs";

  // ElevenLabs voice ID (only used when provider is elevenlabs)
  const voiceId =
    voiceIdArg ||
    config.voiceover?.elevenlabs?.voiceId ||
    config.voiceover?.voiceId ||
    "21m00Tcm4TlvDq8ikWAM"; // ElevenLabs "Rachel" default

  // Sarvam speaker name (only used when provider is sarvam)
  const sarvamSpeaker =
    speakerArg ||
    config.voiceover?.sarvam?.speaker ||
    "shubh";

  const FPS = 30;
  const results = [];

  console.log(`\n🎙️  Generating voiceover for: ${config.title}`);
  console.log(`   Provider: ${provider}`);
  if (provider === "elevenlabs") {
    console.log(`   Voice ID: ${voiceId}`);
  } else {
    console.log(`   Speaker:  ${sarvamSpeaker}`);
    console.log(`   Model:    ${config.voiceover?.sarvam?.model || "bulbul:v3"}`);
  }
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

    // Skip if already generated (unless --force is used)
    if (existsSync(filepath) && !forceArg) {
      console.log(`   ⏭️  Scene ${i} (${scene.type}): already exists, measuring...`);
      const duration = await measureDuration(filepath);
      const frames = Math.ceil(duration * FPS);
      results.push({ src: relativePath, durationInFrames: frames });
      console.log(`       Duration: ${duration.toFixed(1)}s (${frames} frames)`);
      continue;
    }

    console.log(`   🔊  Scene ${i} (${scene.type}): generating via ${provider}...`);
    try {
      let audioBuffer;

      if (provider === "sarvam") {
        audioBuffer = await generateAudioSarvam(text, config.voiceover || {});
      } else {
        audioBuffer = await generateAudioElevenLabs(
          text,
          voiceId,
          config.voiceover || {}
        );
      }

      writeFileSync(filepath, audioBuffer);

      const duration = await measureDuration(filepath);
      const frames = Math.ceil(duration * FPS);
      results.push({ src: relativePath, durationInFrames: frames });
      console.log(`       ✅ ${duration.toFixed(1)}s (${frames} frames) → ${filename}`);
    } catch (err) {
      console.error(`       ❌ Failed: ${err.message}`);
      results.push(null);
    }

    // Rate limiting — be respectful of API limits
    const delay = provider === "sarvam" ? 400 : 600;
    await new Promise((r) => setTimeout(r, delay));
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
