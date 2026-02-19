/**
 * Example: GIFT vs ZIFT (Bio Mnemonic)
 * Short-form (YouTube Shorts/Reels) config.
 */
export const bioGiftZiftShort = {
  title: "GIFT vs ZIFT: The Tube Hack",
  subject: "biology",
  chapter: "Reproductive Health",
  format: "short",
  characters: [
    { name: "Master Ji", role: "teacher" },
  ],
  themeVariant: 1, // Default Professional
  
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
      sceneTitle: "Bio Confusions?",
      subtitle: "GIFT vs ZIFT Simplified",
      audio: {
        src: "voiceover/gift-vs-zift-the-tube-hack/scene-0.mp3",
        durationInFrames: 301,
      },
      lines: [
        {
          speaker: "Master Ji",
          text: "Biology students, GIFT, ZIFT और IUT... इन terms में हमेशा confuse रहते हो ना? चलिए आज इन्हें permanent याद करते हैं इस simple mnemonic के साथ!",
          emotion: "excited",
          pause: "short",
        },
      ],
      media: [
        {
          type: "image",
          src: "/media/bio/reproductive_system.svg",
          position: "center",
          width: 1000,
          animation: "scaleUp",
          enterDelay: 5,
        },
      ],
    },

    // ─── NARRATOR: GIFT ──────────────────
    {
      type: "narrator",
      backgroundVariant: "particles",
      sceneTitle: "G for Gamete",
      subtitle: "GIFT: Gamete Intra-Fallopian Transfer",
      visualCue: "🧪",
      audio: {
        src: "voiceover/gift-vs-zift-the-tube-hack/scene-1.mp3",
        durationInFrames: 213,
      },
      lines: [
        {
          speaker: "Master Ji",
          text: "GIFT में 'G' का मतलब है Gamete. यहाँ unfertilized gamete को directly Fallopian Tube में transfer किया जाता है. Simple logic!",
          emotion: "neutral",
          pause: "short",
        },
      ],
      media: [
        {
          type: "image",
          src: "/media/bio/mnemonic_gift_zift.svg",
          position: "center",
          width: 750,
          animation: "fadeIn",
          enterDelay: 5,
        },
      ],
    },

    // ─── NARRATOR: ZIFT ──────────────────
    {
      type: "narrator",
      backgroundVariant: "particles",
      sceneTitle: "Z for Zygote",
      subtitle: "ZIFT: Zygote Intra-Fallopian Transfer",
      visualCue: "🥚",
      audio: {
        src: "voiceover/gift-vs-zift-the-tube-hack/scene-2.mp3",
        durationInFrames: 362,
      },
      lines: [
        {
          speaker: "Master Ji",
          text: "अब ZIFT देखो. यहाँ 'Z' का मतलब है Zygote, यानी fertilization हो चुका है. पर ध्यान रखना, ZIFT में भी transfer Fallopian Tube में ही होगा!",
          emotion: "excited",
          pause: "short",
        },
        {
          speaker: "Master Ji",
          text: "Up to 8 blastomeres stage तक ही ZIFT possible है. Tube में transfer मतलब ZIFT!",
          emotion: "neutral",
          pause: "medium",
        },
      ],
      media: [
        {
          type: "image",
          src: "/media/bio/mnemonic_gift_zift.svg",
          position: "center",
          width: 750,
          animation: "scaleUp",
          enterDelay: 5,
        },
      ],
    },

    // ─── TRAP ALERT: IUT ────────────────────────
    {
      type: "trapAlert",
      sceneTitle: "The Uterus Trap",
      trapDescription:
        "IUT (Intra-Uterine Transfer) happens in Uterus, not the Tube!",
      audio: {
        src: "voiceover/gift-vs-zift-the-tube-hack/scene-3.mp3",
        durationInFrames: 281,
      },
      lines: [
        {
          speaker: "Master Ji",
          text: "यहाँ सावधान! अगर zygote 8 blastomeres से बड़ा है, तो उसे Fallopian Tube में नहीं, बल्कि Uterus में transfer करते हैं. इसे कहते हैं IUT यानी Intra Uterine Transfer!",
          emotion: "shouting",
          pause: "medium",
        },
      ],
      media: [
        {
          type: "image",
          src: "/media/bio/reproductive_system.svg",
          position: "center",
          width: 500,
          animation: "slideLeft",
          enterDelay: 15,
        },
      ],
    },

    // ─── PYQ ────────────────────────────────────
    {
      type: "pyq",
      sceneTitle: "NEET Level Check",
      subtitle: "Official NEET 2020 Question",
      year: 2020,
      exam: "NEET",
      audio: {
        src: "voiceover/gift-vs-zift-the-tube-hack/scene-4.mp3",
        durationInFrames: 264,
      },
      question:
        "Select the procedure where an ovum collected from a donor is transferred into the fallopian tube of a recipient female:",
      options: [
        { label: "A", text: "ZIFT (Zygote Transfer)", isCorrect: false },
        { label: "B", text: "GIFT (Gamete Transfer)", isCorrect: true },
        { label: "C", text: "IUT (Intra-Uterine)", isCorrect: false },
        { label: "D", text: "ICSI (Sperm Injection)", isCorrect: false },
      ],
      solution:
        "GIFT = Gamete (Ovum) + Tube. Fertilization occurs naturally inside the female body (In-vivo).",
      lines: [
        {
          speaker: "Master Ji",
          text: "NEET twenty twenty का ये classic question है! यहाँ primary keyword है 'Ovum'. Ovum एक unfertilized gamete है, और gamete को tube में भेजना मतलब GIFT. Option B is your winner!",
          emotion: "happy",
          pause: "short",
        },
      ],
    },

    {
      type: "outro",
      sceneTitle: "Save for Later!",
      ctaText: "Unlock more Bio Mnemonics",
      nextVideoTeaser: "Human Reproduction Full One-Shot",
      audio: {
        src: "voiceover/gift-vs-zift-the-tube-hack/scene-5.mp3",
        durationInFrames: 157,
      },
      lines: [
        {
          speaker: "Master Ji",
          text: "ऐसे ही awesome biology mnemonics के लिए channel को check out करो. मिलते हैं अगले short में!",
          emotion: "neutral",
          pause: "short",
        },
      ],
    },
  ],
};
