/**
 * Example: NAND Gate (Script 5)
 * Short-form (YouTube Shorts/Reels) config.
 *
 * Short-form videos use the same template engine —
 * just fewer scenes and 1080x1920 resolution.
 */
export const nandGateShort = {
  title: "NAND Gate Truth Table Hack",
  subject: "physics",
  chapter: "Semiconductor Electronics",
  format: "short",
  characters: [
    { name: "Master Ji", role: "teacher" },
  ],
  themeVariant: 2, // "Neon Circuit" — fits logic gates
  
  // Use Sarvam AI for authentic Hinglish voiceover
  voiceover: {
    enabled: true,
    provider: "sarvam",
    sarvam: {
      speaker: "shubh",
      model: "bulbul:v3",
      pace: 1.1,
    },
  },

  scenes: [
    // ─── HOOK ──────────────────────────────────
    {
      type: "hook",
      backgroundVariant: "grid",
      sceneTitle: "NEET Time-Saver!",
      subtitle: "Stop drawing huge truth tables",
      audio: {
        src: "voiceover/nand-gate-truth-table-hack/scene-0.mp3",
        durationInFrames: 544,
      },
      lines: [
        {
          speaker: "Master Ji",
          text: "Students, NEET Physics में Logic Gates से easy marks लूटने का एक simple तरीका है. अक्सर बच्चे बड़े-बड़े truth tables बनाने में फंस जाते हैं और formula भूल जाते हैं.",
          emotion: "shouting",
          pause: "short",
        },
        {
          speaker: "Master Ji",
          text: "पर आज मैं आपको NAND gate का एक ऐसा hack बताऊंगा जो आपका time और marks दोनों बचाएगा! बस याद रखो, NAND मतलब AND के ऊपर एक bubble.",
          emotion: "excited",
          pause: "medium",
        },
      ],
      media: [
        {
          type: "image",
          src: "/media/nand/nand_symbol.svg",
          position: "center",
          width: 500,
          animation: "scaleUp",
          enterDelay: 10,
        },
      ],
    },

    // ─── NARRATOR: The Insight ──────────────────
    {
      type: "narrator",
      backgroundVariant: "particles",
      sceneTitle: "The Double Bubble Hack",
      subtitle: "Logic gates subtraction simplified",
      visualCue: "🔁",
      audio: {
        src: "voiceover/nand-gate-truth-table-hack/scene-1.mp3",
        durationInFrames: 474,
      },
      lines: [
        {
          speaker: "Master Ji",
          text: "अब इस diagram को ध्यान से देखो. अगर हम दो NAND gates को series में लगा दें, तो पहले gate का bubble यानी inversion, दूसरे gate के bubble से cancel हो जाता है.",
          emotion: "neutral",
          pause: "short",
        },
        {
          speaker: "Master Ji",
          text: "जैसे - minus into minus result plus hota hai, वैसे ही double bubble back to simple AND gate logic! ये simple addition subtraction logic marks dilayega.",
          emotion: "excited",
          pause: "short",
        },
      ],
      media: [
        {
          type: "image",
          src: "/media/nand/nand_series.svg",
          position: "center",
          width: 700,
          animation: "fadeIn",
          enterDelay: 20,
        },
      ],
    },

    // ─── TRAP ALERT ─────────────────────────────
    {
      type: "trapAlert",
      sceneTitle: "NOT Gate Clone!",
      trapDescription:
        "जब NAND के दोनों inputs को join कर दिया जाए, तो वो function करता है as a NOT gate!",
      audio: {
        src: "voiceover/nand-gate-truth-table-hack/scene-2.mp3",
        durationInFrames: 542,
      },
      lines: [
        {
          speaker: "Master Ji",
          text: "यहाँ एक बहुत बड़ा trap है जिससे examiner आपको confuse करता है. अगर NAND gate के दोनों inputs को short circuit करके join कर दिया जाए, तो वो function करता है as a NOT gate!",
          emotion: "shouting",
          pause: "short",
        },
        {
          speaker: "Master Ji",
          text: "Inputs join मतलब zero vs one separate karne ka scope khatam! Bacha sirf logic inversion. Isse bhulna mat students!",
          emotion: "neutral",
          pause: "medium",
        },
      ],
      media: [
        {
          type: "image",
          src: "/media/nand/nand_not.svg",
          position: "center",
          width: 500,
          animation: "slideLeft",
          enterDelay: 30,
        },
      ],
    },

    // ─── PYQ ────────────────────────────────────
    {
      type: "pyq",
      sceneTitle: "Level Check",
      subtitle: "NEET 2021 Original Question",
      year: 2021,
      exam: "NEET",
      audio: {
        src: "voiceover/nand-gate-truth-table-hack/scene-3.mp3",
        durationInFrames: 286,
      },
      question:
        "Identify the logic operation performed by the given circuit (Two NANDs in series).",
      options: [
        { label: "A", text: "OR Gate", isCorrect: false },
        { label: "B", text: "AND Gate", isCorrect: true },
        { label: "C", text: "NOT Gate", isCorrect: false },
        { label: "D", text: "NOR Gate", isCorrect: false },
      ],
      solution: "Bubble on NAND1 + NOT action on NAND2 = Bubble Cancellation → AND",
      lines: [
        {
          speaker: "Master Ji",
          text: "Correct answer is Option B! NEET 2021 ka original problem logic identification se start hota hai. Bubbles cancel ho chuke hain, bacha sirf series connection.",
          emotion: "happy",
          pause: "short",
        },
      ],
    },

    // ─── OUTRO ──────────────────────────────────
    {
      type: "outro",
      sceneTitle: "Subscribe & Save!",
      ctaText: "Unlock more NEET Hacks",
      nextVideoTeaser: "Full Semiconductors deep dive",
      audio: {
        src: "voiceover/nand-gate-truth-table-hack/scene-4.mp3",
        durationInFrames: 250,
      },
      lines: [
        {
          speaker: "Master Ji",
          text: "Physics ko physics mat samjho, hacks samjho! Aise hi aur NEET topics ke liye channel check karo aur subscribe karna mat bhoolna. Milte hain next short mein!",
          emotion: "neutral",
          pause: "short",
        },
      ],
    },
  ],
};
