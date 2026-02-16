/**
 * Example: Photoelectric Effect (Script 1)
 * VISUAL-FIRST YouTube video config.
 *
 * How it works:
 *   - `lines[]` → voiceover narration (NOT shown on screen)
 *   - `media[]` → images, SVGs, GIFs, videos displayed on screen
 *   - `sceneTitle` / `subtitle` → concept label (lower-third overlay)
 *   - Structural elements (formulas, PYQ cards, etc.) still render visually
 *
 * WORKFLOW:
 *   1. Write your script in `lines` (dialogue/narration)
 *   2. Add relevant media assets to `public/media/`
 *   3. Reference them in `media[]` with position + timing
 *   4. Generate voiceover: node --env-file=.env scripts/generate-voiceover.mjs src/data/example-photoelectric.js
 *   5. Paste audio config into each scene
 *   6. Render: npx remotion render Photoelectric-Effect
 */
export const photoelectricEffect = {
  title: "Photoelectric Effect - Photon Picture",
  subject: "physics",
  chapter: "Dual Nature of Radiation & Matter",
  format: "long",
  characters: [
    { name: "Arjun", role: "teacher" },
    { name: "Kavya", role: "student" },
  ],
  themeVariant: 0, // "Electric Blue"

  // Voiceover config (used by generate-voiceover.mjs)
  // voiceover: {
  //   provider: "elevenlabs",
  //   voiceId: "pNInz6obpgDQGcFmaJgB",
  //   model: "eleven_multilingual_v2",
  // },

  // Global background music (plays across all scenes at low volume)
  // bgMusic: "music/study-lofi.mp3",

  scenes: [
    // ─── HOOK ──────────────────────────────────
    {
      type: "hook",
      backgroundVariant: "particles",
      sceneTitle: "The Wave Problem",
      subtitle: "Why does classical wave theory fail?",
      lines: [
        {
          speaker: "Arjun",
          text: "Kavya, अब तक हम सोचते थे कि light एक continuous Wave है.",
          emotion: "neutral",
          pause: "short",
        },
        {
          speaker: "Arjun",
          text: "Wave का मतलब energy पूरे surface पर spread हो जाती है, जैसे एक misting fan.",
          emotion: "neutral",
          pause: "medium",
        },
      ],
      media: [
        {
          type: "svg",
          src: "media/photoelectric/wave-spread.svg",
          position: "center",
          width: 700,
          animation: "scaleUp",
          enterDelay: 10,
        },
        {
          type: "svg",
          src: "media/photoelectric/wave-spread.svg",
          position: "right",
          width: 350,
          animation: "slideLeft",
          enterDelay: 60,
          caption: "Energy spreads like a misting fan",
        },
      ],
      // audio: { src: "voiceover/photoelectric/scene-0.mp3", durationInFrames: 240 },
    },

    // ─── DIALOGUE: Einstein's Photon Picture ─────
    {
      type: "dialogue",
      backgroundVariant: "gradient",
      sceneTitle: "Einstein's Photon Picture",
      subtitle: "Light comes in packets — like water balloons!",
      lines: [
        {
          speaker: "Kavya",
          text: "तो इसमें problem क्या है, sir?",
          emotion: "curious",
          pause: "short",
        },
        {
          speaker: "Arjun",
          text: "But Einstein ने कहा: NO! Light energy packets में आती है. Concentrated! जैसे water balloon.",
          emotion: "excited",
          pause: "short",
        },
        {
          speaker: "Arjun",
          text: "टकराया... और BOOM! इसलिये interaction instantaneous है. इसी को कहते हैं Photon Picture.",
          emotion: "shouting",
          pause: "medium",
        },
      ],
      media: [
        {
          type: "image",
          src: "media/photoelectric/einstein-portrait.svg",
          position: "left",
          width: 400,
          animation: "fadeIn",
          enterDelay: 5,
        },
        {
          type: "gif",
          src: "media/photoelectric/water-balloon-burst.gif",
          position: "right",
          width: 450,
          height: 400,
          animation: "scaleUp",
          enterDelay: 40,
          caption: "Concentrated energy packet — BOOM!",
        },
      ],
    },

    // ─── ANALOGY: Bullets vs Misting Fan ─────────
    {
      type: "analogy",
      backgroundVariant: "particles",
      sceneTitle: "Intensity = Number of Bullets",
      analogyTitle: "Photon = Bullet",
      analogyIcon: "💥",
      comparison: {
        left: "Wave Theory",
        right: "Photon Picture",
        leftLabel: "Misting Fan (spread)",
        rightLabel: "Water Balloon (concentrated)",
      },
      lines: [
        {
          speaker: "Arjun",
          text: "Intensity का simple मतलब है: कितनी गोलियाँ यानी photons per second fire हो रही हैं.",
          emotion: "neutral",
          pause: "short",
        },
        {
          speaker: "Arjun",
          text: "ज़्यादा brightness मतलब ज़्यादा गोलियाँ. लेकिन energy of EACH bullet? वो change नहीं होगी!",
          emotion: "excited",
          pause: "medium",
        },
      ],
      media: [
        {
          type: "image",
          src: "media/photoelectric/bullet-analogy.svg",
          position: "bottomRight",
          width: 300,
          animation: "slideUp",
          enterDelay: 30,
        },
      ],
    },

    // ─── FORMULA: Photon Energy & Momentum ───────
    {
      type: "formula",
      sceneTitle: "Key Equations",
      subtitle: "Your exam cheat codes",
      style: "neon",
      formulas: [
        {
          label: "Photon Energy",
          expression: "E = hν",
          highlight: true,
        },
        {
          label: "Photon Momentum",
          expression: "p = E / c",
          highlight: false,
        },
        {
          label: "Cheat Code",
          expression: "hc = 12400 eV·Å",
          highlight: true,
        },
      ],
      lines: [
        {
          speaker: "Arjun",
          text: "हर packet की energy set है. Massive नहीं हैं, पर धक्का देते हैं!",
          emotion: "neutral",
          pause: "short",
        },
      ],
      media: [
        {
          type: "svg",
          src: "media/photoelectric/photon-momentum.svg",
          position: "right",
          width: 350,
          animation: "slideLeft",
          enterDelay: 50,
        },
      ],
    },

    // ─── DIALOGUE: Red vs Violet ─────────────────
    {
      type: "dialogue",
      backgroundVariant: "gradient",
      sceneTitle: "Red vs Violet",
      subtitle: "Quality over quantity",
      lines: [
        {
          speaker: "Kavya",
          text: "समझ गई! तो Red light अगर bright भी हो, तो भी electron नहीं निकालेगी क्योंकि उसकी हर bullet कमज़ोर है.",
          emotion: "happy",
          pause: "short",
        },
        {
          speaker: "Kavya",
          text: "Violet light की एक bullet ही काफी है wall तोड़ने के लिए!",
          emotion: "excited",
          pause: "medium",
        },
        {
          speaker: "Arjun",
          text: "सही पकड़े हो! सवाल bullets की quality का है... quantity का नहीं.",
          emotion: "happy",
          pause: "short",
        },
      ],
      media: [
        {
          type: "svg",
          src: "media/photoelectric/red-vs-violet.svg",
          position: "center",
          width: 900,
          animation: "fadeIn",
          enterDelay: 10,
        },
        {
          type: "svg",
          src: "media/photoelectric/spectrum-bar.svg",
          position: "bottomLeft",
          width: 500,
          animation: "slideUp",
          enterDelay: 40,
        },
      ],
    },

    // ─── TRAP ALERT ─────────────────────────────
    {
      type: "trapAlert",
      sceneTitle: "Efficiency Trap",
      trapDescription:
        "Don't assume 100% efficiency! हर photon electron नहीं निकालेगा. Efficiency usually < 1%. बाक़ी energy metal को heat करती है.",
      correctApproach:
        "Always check if efficiency is given in the question before assuming all photons eject electrons.",
      lines: [
        {
          speaker: "Arjun",
          text: "Efficiency बहुत कम होती है, usually less than one percent. Don't fall for the 100 percent efficiency trap!",
          emotion: "shouting",
          pause: "medium",
        },
      ],
      media: [
        {
          type: "image",
          src: "media/photoelectric/efficiency-diagram.png",
          position: "right",
          width: 350,
          animation: "fadeIn",
          enterDelay: 30,
        },
      ],
    },

    // ─── CALCULATION: Number of Photons ──────────
    {
      type: "calculation",
      sceneTitle: "Problem Solving",
      subtitle: "Photons per second from a 5W bulb",
      steps: [
        { label: "Given", expression: "P = 5W, λ = 5000 Å" },
        { label: "Single Photon Energy", expression: "E = 12400 / 5000 = 2.48 eV" },
        { label: "Convert to Joules", expression: "E = 2.48 × 1.6 × 10⁻¹⁹ J" },
        { label: "Number of Photons", expression: "n = P / E = 1.25 × 10¹⁹ per sec" },
      ],
      lines: [
        {
          speaker: "Arjun",
          text: "एक 5 Watt का bulb है, 5000 Angstrom की light. Photons per second कितने?",
          emotion: "neutral",
          pause: "short",
        },
        {
          speaker: "Kavya",
          text: "Sir, simple है! Divide किया तो answer आया 1.25 into 10 raise to the power 19 photons per second.",
          emotion: "happy",
          pause: "short",
        },
      ],
    },

    // ─── PYQ ────────────────────────────────────
    {
      type: "pyq",
      sceneTitle: "NEET 2021",
      subtitle: "Solve it in 5 seconds!",
      year: 2021,
      exam: "NEET",
      question:
        "The wavelength of light decreases from 400 nm to 200 nm. What is the maximum kinetic energy of the emitted photoelectron if work function is 3.1 eV?",
      options: [
        { label: "A", text: "3.0 eV", isCorrect: false },
        { label: "B", text: "3.1 eV", isCorrect: true },
        { label: "C", text: "6.2 eV", isCorrect: false },
        { label: "D", text: "9.3 eV", isCorrect: false },
      ],
      solution:
        "E = 12400/200 = 6.2 eV. KE = 6.2 - 3.1 = 3.1 eV. 5 seconds में solved!",
      lines: [
        {
          speaker: "Arjun",
          text: "Hack लगाओ: Energy 12400 upon 200, minus work function. 5 second में rank पक्की!",
          emotion: "excited",
          pause: "short",
        },
      ],
    },

    // ─── SUMMARY ────────────────────────────────
    {
      type: "summary",
      sceneTitle: "Quick Revision",
      title: "Final Summary",
      bullets: [
        { number: 1, text: "Intensity बढ़ाओ → Current बढ़ेगा" },
        { number: 2, text: "Frequency बढ़ाओ → Speed बढ़ेगी" },
        { number: 3, text: "Source दूर ले जाओ → Intensity कम, Energy same" },
        { number: 4, text: "One Photon → One Electron interaction is the key" },
        { number: 5, text: "hc = 12400 eV·Å — your cheat code" },
      ],
      lines: [
        {
          speaker: "Arjun",
          text: "Photon picture clear?",
          emotion: "neutral",
          pause: "short",
        },
        {
          speaker: "Kavya",
          text: "एकदम clear, sir! One Photon, One Electron interaction is the key.",
          emotion: "happy",
          pause: "short",
        },
      ],
    },

    // ─── OUTRO ──────────────────────────────────
    {
      type: "outro",
      backgroundVariant: "waves",
      sceneTitle: "Coming Up Next",
      ctaText: "Subscribe & Share!",
      nextVideoTeaser:
        "Electrons कितने गुस्से में बाहर निकलते हैं — Kinetic Energy & Stopping Potential",
      lines: [
        {
          speaker: "Arjun",
          text: "अगले video में देखेंगे कि ये electrons कितने गुस्से में बाहर निकलते हैं!",
          emotion: "excited",
          pause: "short",
        },
      ],
    },
  ],
};
