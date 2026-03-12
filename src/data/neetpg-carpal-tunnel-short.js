/**
 * NEET PG 2023: Carpal Tunnel Syndrome — Short Form
 * Vertical (1080×1920) question explanation video.
 *
 * Source: NEET PG 2023 — Orthopaedics / Anatomy
 * Correct Answer: Option 1 (Carpal Tunnel + Durkan Compression Test)
 *
 * Script uses pronunciation-optimized Hinglish for Sarvam TTS.
 * Medical terms are spelled phonetically where needed.
 */
export const neetpgCarpalTunnelShort = {
  title: "NEET PG 2023: Carpal Tunnel Diagnosis",
  subject: "medicine",
  chapter: "Orthopaedics",
  format: "short",
  characters: [{ name: "Dr. Meera", role: "teacher" }],
  themeVariant: 2, // Surgical Teal

  voiceover: {
    enabled: true,
    provider: "sarvam",
    sarvam: {
      speaker: "roopa",
      model: "bulbul:v3",
      pace: 1.0,
    },
  },

  scenes: [
    // ─── HOOK ──────────────────────────────────
    // {
    //   type: "hook",
    //   backgroundVariant: "grid",
    //   sceneTitle: "NEET PG 2023",
    //   subtitle: "Can you solve this?",
    //   audio: {
    //     src: "voiceover/neet-pg-2023-carpal-tunnel-diagnosis/scene-0.mp3",
    //     durationInFrames: 488,
    //   },
    //   lines: [
    //     {
    //       speaker: "Dr. Meera",
    //       text: "NEET PG two thousand twenty three mein yeh question poochha gaya tha. Patient ko lateral teen aur aadhi ungliyaan mein volar side par sensation loss hai. Raat ko neend se jaag jaata hai dard ki wajah se. Kya aap bata sakte hain yeh kis nerve ka problem hai?",
    //       emotion: "curious",
    //       pause: "short",
    //     },
    //   ],
    // },

    // ─── QUESTION DISPLAY ──────────────────────
    {
      type: "questionDisplay",
      backgroundVariant: "grid",
      sceneTitle: "Clinical Vignette",
      subtitle: "Read carefully",
      audio: {
        src: "voiceover/neet-pg-2023-carpal-tunnel-diagnosis/scene-1.mp3",
        durationInFrames: 627,
      },
      question:
        "A patient presented to the OPD with loss of sensation over the lateral three and a half digits on the volar side. He also had associated pain. The patient would sometimes wake up from sleep due to pain and hanging the hand over the edge of the bed would help relieve the pain. What is the most probable site of injury and which test can be performed to confirm the same?",
      highlights: [
        "lateral three and a half digits",
        "volar side",
        "loss of sensation",
        "wake up from sleep",
        "hanging the hand",
        "relieve the pain",
      ],
      exam: "NEET PG",
      year: 2023,
      answerRevealDelay: 90,
      options: [
        {
          number: 1,
          text: "Carpal Tunnel and Durkan Compression Test",
          isCorrect: true,
        },
        {
          number: 2,
          text: "Carpal Tunnel and Froment Test",
          isCorrect: false,
        },
        {
          number: 3,
          text: "Guyon's Canal and Phalen Test",
          isCorrect: false,
        },
        {
          number: 4,
          text: "Guyon's Canal and Durkan Compression Test",
          isCorrect: false,
        },
      ],
      analytics: {
        correctPercentage: 70,
        option1Percentage: 70,
        option2Percentage: 15,
        option3Percentage: 8,
        option4Percentage: 9,
      },
      lines: [
        {
          speaker: "Dr. Meera",
          text: "Dhyan se padhiye yeh question. Patient OPD mein aaya hai. Lateral three and a half digits par volar side mein sensation ka loss hai. Saath mein dard bhi hai. Raat ko neend se jaag jaata hai. Aur haath ko bed ke kinare se latkaane par dard kam hota hai. Question hai — injury ka site kya hai aur kaun sa test se confirm karenge?",
          emotion: "neutral",
          pause: "medium",
        },
      ],
    },

    // ─── OPTION 1 — CORRECT ────────────────────
    {
      type: "optionAnalysis",
      backgroundVariant: "gradient",
      sceneTitle: "Answer Revealed",
      subtitle: "Option 1 — Correct",
      audio: {
        src: "voiceover/neet-pg-2023-carpal-tunnel-diagnosis/scene-2.mp3",
        durationInFrames: 862,
      },
      optionNumber: 1,
      optionText: "Carpal Tunnel and Durkan Compression Test",
      isCorrect: true,
      reasoning:
        "Lateral 3.5 digits on the volar side = Median nerve territory. The Median nerve passes through the Carpal Tunnel. Nocturnal symptoms with relief on hanging the hand is classic for Carpal Tunnel Syndrome.",
      keyFact:
        "Durkan Test (manual carpal compression for 30 seconds) has the highest sensitivity among all CTS provocative tests.",
      lines: [
        {
          speaker: "Dr. Meera",
          text: "Sahi jawaab hai Option one — Carpal Tunnel aur Durkan Compression Test. Lateral saadhe teen ungliyaan ka volar side, yeh Median nerve ka sensory territory hai. Median nerve Carpal Tunnel se ho kar guzarti hai. Raat ko symptoms ka badhna aur haath latkaane se relief milna, yeh classic Carpal Tunnel Syndrome ke signs hain. Aur Durkan Test mein hum transverse carpal ligament par seedha pressure lagate hain tees second tak. Yeh sabse sensitive test hai C T S ke liye.",
          emotion: "happy",
          pause: "short",
        },
      ],
    },

    // ─── TRAP ALERT ────────────────────────────
    {
      type: "trapAlert",
      sceneTitle: "Common Mistakes",
      audio: {
        src: "voiceover/neet-pg-2023-carpal-tunnel-diagnosis/scene-3.mp3",
        durationInFrames: 777,
      },
      trapDescription:
        "Froment Test = Ulnar nerve (NOT Median). Guyon's Canal = Ulnar nerve compression site (NOT Median).",
      lines: [
        {
          speaker: "Dr. Meera",
          text: "Sabse common mistake — Froment Test ko Median nerve se jod dena. Yaad rakhiye, Froment Test sirf Ulnar nerve ke liye hai. Yeh Adductor Pollicis muscle ko test karta hai. Agar patient paper pinch nahi kar paaye toh Froment positive hai. Isi tarah Guyon's Canal bhi Ulnar nerve ka compression site hai, Median nerve ka nahi. Isliye Options teen aur chaar mein Guyon's Canal hai, toh dono galat hain.",
          emotion: "shouting",
          pause: "medium",
        },
      ],
    },

    // ─── CLINICAL PEARL ────────────────────────
    {
      type: "narrator",
      backgroundVariant: "particles",
      sceneTitle: "Clinical Pearl",
      subtitle: "CTS Provocative Tests",
      audio: {
        src: "voiceover/neet-pg-2023-carpal-tunnel-diagnosis/scene-4.mp3",
        durationInFrames: 685,
      },
      visualCue: "🔑",
      lines: [
        {
          speaker: "Dr. Meera",
          text: "Quick recap — Carpal Tunnel Syndrome ke teen important provocative tests yaad rakhiye. Falen Test mein wrist ko hyper-flexion mein rakhte hain. Tinel Test mein Median nerve ke upar percussion karte hain. Aur Durkan Test mein direct compression dete hain tees second tak. Inmein Durkan Test ki sensitivity sabse zyaada hai.",
          emotion: "neutral",
          pause: "short",
        },
      ],
    },

    // ─── OUTRO ─────────────────────────────────
    // {
    //   type: "outro",
    //   sceneTitle: "More NEET PG Questions",
    //   audio: {
    //     src: "voiceover/neet-pg-2023-carpal-tunnel-diagnosis/scene-5.mp3",
    //     durationInFrames: 224,
    //   },
    //   ctaText: "Follow for daily NEET PG explanations",
    //   nextVideoTeaser: "Next: Ulnar Nerve Injuries",
    //   lines: [
    //     {
    //       speaker: "Dr. Meera",
    //       text: "NEET PG ke aur aise question explanations ke liye channel ko subscribe kariye. Agle video mein milte hain!",
    //       emotion: "excited",
    //       pause: "short",
    //     },
    //   ],
    // },
  ],
};
