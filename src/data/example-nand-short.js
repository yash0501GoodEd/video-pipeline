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
    { name: "Narrator", role: "teacher" },
  ],
  themeVariant: 2, // "Neon Circuit" — fits logic gates
  scenes: [
    // ─── HOOK ──────────────────────────────────
    {
      type: "hook",
      backgroundVariant: "grid",
      layoutVariant: 0,
      lines: [
        {
          speaker: "Narrator",
          text: "अरे यार! सिर्फ दस seconds बचे हैं और मैं अभी भी इस NAND gate का Truth Table draw कर रहा हूँ!",
          emotion: "stressed",
          pause: "short",
        },
        {
          speaker: "Narrator",
          text: "रुको! अगर तुम NAND के लिए Truth Table बना रहे हो, तो तुम NEET में marks नहीं, time लूज़ कर रहे हो.",
          emotion: "shouting",
          pause: "medium",
        },
      ],
    },

    // ─── NARRATOR: The Key Insight ──────────────
    {
      type: "narrator",
      layoutVariant: 1,
      visualCue: "🔁",
      lines: [
        {
          speaker: "Narrator",
          text: "NAND मतलब AND निकालो और उसे Flip कर दो. Simple!",
          emotion: "neutral",
          pause: "short",
        },
      ],
    },

    // ─── TRAP ALERT ─────────────────────────────
    {
      type: "trapAlert",
      layoutVariant: 0,
      trapDescription:
        "अगर NAND के दोनों inputs join कर दोगे, तो वो एक simple NOT gate बन जाता है.",
      lines: [
        {
          speaker: "Narrator",
          text: "मतलब बस AND का उल्टा, और joined inputs मतलब NOT! No more tables!",
          emotion: "excited",
          pause: "short",
        },
      ],
    },

    // ─── PYQ ────────────────────────────────────
    {
      type: "pyq",
      layoutVariant: 0,
      year: 2021,
      exam: "NEET",
      question:
        "दो NAND gates series में connected हैं। दो Bubbles मतलब Double Flip, यानी cancellation! बचा सिर्फ AND operation.",
      options: [
        { label: "A", text: "OR Gate", isCorrect: false },
        { label: "B", text: "AND Gate", isCorrect: true },
        { label: "C", text: "NOT Gate", isCorrect: false },
        { label: "D", text: "NOR Gate", isCorrect: false },
      ],
      solution: "Double Bubble = Double Flip → cancellation → AND Gate",
      lines: [
        {
          speaker: "Narrator",
          text: "Correct answer is Option B! Mark करो और आगे बढ़ो!",
          emotion: "happy",
          pause: "short",
        },
      ],
    },

    // ─── OUTRO ──────────────────────────────────
    {
      type: "outro",
      layoutVariant: 0,
      ctaText: "Subscribe for more hacks!",
      nextVideoTeaser: "Full Logic Gates video dropping tomorrow!",
      lines: [
        {
          speaker: "Narrator",
          text: "ऐसे ही hacks के लिए subscribe करो.",
          emotion: "neutral",
          pause: "short",
        },
      ],
    },
  ],
};
