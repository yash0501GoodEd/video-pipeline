/**
 * NEET PG 2023: Carpal Tunnel Syndrome — Long Form
 * Horizontal (1920×1080) detailed question explanation with per-option analysis.
 *
 * Source: NEET PG 2023 — Orthopaedics / Anatomy
 * Correct Answer: Option 1 (Carpal Tunnel + Durkan Compression Test)
 *
 * Script uses pronunciation-optimized Hinglish for Sarvam TTS.
 * All four options analysed individually.
 */
export const neetpgCarpalTunnelLong = {
  title: "NEET PG 2023: Carpal Tunnel Syndrome — Complete Analysis",
  subject: "medicine",
  chapter: "Orthopaedics",
  format: "long",
  characters: [{ name: "Dr. Meera", role: "teacher" }],
  themeVariant: 0, // Clinical Blue

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
    // ═══════════════════════════════════════════
    //  0 — HOOK
    // ═══════════════════════════════════════════
    {
      type: "hook",
      backgroundVariant: "grid",
      sceneTitle: "NEET PG 2023",
      subtitle: "Orthopaedics — Nerve Injuries",
      lines: [
        {
          speaker: "Dr. Meera",
          text: "NEET PG two thousand twenty three mein yeh high-yield question aaya tha. Ek patient aata hai OPD mein jisko lateral saadhe teen digits mein volar side par sensation loss hai. Raat ko dard ki wajah se neend khul jaati hai, aur haath latkane se aaram milta hai. Yeh scenario directly kis nerve aur kis compression site ki taraf point karta hai? Chaliye har ek option ko detail mein analyse karte hain.",
          emotion: "curious",
          pause: "medium",
        },
      ],
    },

    // ═══════════════════════════════════════════
    //  1 — QUESTION DISPLAY
    // ═══════════════════════════════════════════
    {
      type: "questionDisplay",
      backgroundVariant: "grid",
      sceneTitle: "Question",
      subtitle: "NEET PG 2023 — Orthopaedics",
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
      answerRevealDelay: 120,
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
          text: "Pehle question ko dhyan se padhiye. Patient OPD mein aaya hai. Lateral three and a half digits par volar side mein sensation loss hai. Saath mein dard bhi hai jo raat ko zyaada hota hai. Patient neend se jaag jaata hai, aur haath ko bed ke kinare se latkaane par aaram milta hai. Ab aapko batana hai — injury ka site kya hai, aur confirm karne ke liye kaun sa clinical test karenge? Pehle khud sochiye, phir hum option by option analyse karenge.",
          emotion: "neutral",
          pause: "long",
        },
      ],
    },

    // ═══════════════════════════════════════════
    //  2 — OPTION 1 — CORRECT ✅
    // ═══════════════════════════════════════════
    {
      type: "optionAnalysis",
      backgroundVariant: "gradient",
      sceneTitle: "Option 1 Analysis",
      subtitle: "Correct Answer",
      optionNumber: 1,
      optionText: "Carpal Tunnel and Durkan Compression Test",
      isCorrect: true,
      reasoning:
        "Lateral 3.5 digits (thumb, index, middle, lateral half of ring finger) on the volar side = Median nerve sensory territory. The Median nerve passes through the Carpal Tunnel beneath the flexor retinaculum. Nocturnal symptoms and relief on hanging the hand are classic for CTS.",
      keyFact:
        "Durkan Compression Test — direct pressure over the transverse carpal ligament for 30 seconds — has the highest sensitivity (87%) among all CTS provocative tests.",
      lines: [
        {
          speaker: "Dr. Meera",
          text: "Option one — Carpal Tunnel aur Durkan Compression Test. Yeh sahi jawaab hai. Aaiye samajhte hain kyun. Lateral saadhe teen digits ka volar side — matlab thumb, index finger, middle finger, aur ring finger ka lateral half — yeh Median nerve ka sensory area hai. Ab Median nerve kahan se guzarti hai? Flexor retinaculum ke neeche, Carpal Tunnel se. Jab Carpal Tunnel mein pressure badh jaata hai toh Median nerve compress hoti hai aur yahi Carpal Tunnel Syndrome hai. Raat ko symptoms ka badhna classic hai kyunki neend mein wrist flexed position mein rehta hai. Aur haath latkaane se venous drainage improve hoti hai toh pressure kam hota hai. Ab Durkan Test kya hai? Ismein doctor apne thumbs se transverse carpal ligament par seedha pressure daalte hain tees second tak. Agar patient ko dard ya numbness ho, test positive hai. Yeh sabse sensitive test hai eighty seven percent sensitivity ke saath.",
          emotion: "happy",
          pause: "medium",
        },
      ],
    },

    // ═══════════════════════════════════════════
    //  3 — OPTION 2 — WRONG ❌
    // ═══════════════════════════════════════════
    {
      type: "optionAnalysis",
      backgroundVariant: "gradient",
      sceneTitle: "Option 2 Analysis",
      subtitle: "Incorrect — Wrong Test",
      optionNumber: 2,
      optionText: "Carpal Tunnel and Froment Test",
      isCorrect: false,
      reasoning:
        "The site (Carpal Tunnel) is correct, but the test is wrong. Froment Test evaluates the Adductor Pollicis muscle which is supplied by the Ulnar nerve, NOT the Median nerve. Froment is used to diagnose Ulnar nerve palsy.",
      keyFact:
        "In Froment Test, the patient pinches a paper between thumb and index finger. If the thumb IP joint flexes (compensating with FPL), it indicates Adductor Pollicis weakness — an Ulnar nerve sign.",
      lines: [
        {
          speaker: "Dr. Meera",
          text: "Ab dekhte hain Option do — Carpal Tunnel aur Froment Test. Yahan site toh sahi hai, Carpal Tunnel. Par test bilkul galat hai. Froment Test Median nerve ke liye nahin hai. Froment Test Ulnar nerve ki pathology detect karta hai. Is test mein patient se ek kaagaz ko thumb aur index finger ke beech pinch karwaate hain. Agar thumb ka I P joint flex ho jaaye, matlab Adductor Pollicis weak hai. Adductor Pollicis ko kaun supply karta hai? Ulnar nerve. Toh basically yeh test Ulnar nerve palsy ka diagnosis karta hai, Median nerve ka nahin. Isliye site sahi hone ke baawajood, test ka mismatch hone ki wajah se Option do galat hai.",
          emotion: "neutral",
          pause: "short",
        },
      ],
    },

    // ═══════════════════════════════════════════
    //  4 — OPTION 3 — WRONG ❌
    // ═══════════════════════════════════════════
    {
      type: "optionAnalysis",
      backgroundVariant: "gradient",
      sceneTitle: "Option 3 Analysis",
      subtitle: "Incorrect — Both Wrong",
      optionNumber: 3,
      optionText: "Guyon's Canal and Phalen Test",
      isCorrect: false,
      reasoning:
        "Both components are mismatched. Guyon's Canal is the compression site for the Ulnar nerve (between pisiform and hook of hamate), NOT the Median nerve. Phalen Test IS a Median nerve / CTS test — so the site is Ulnar but the test is Median. This combination is self-contradictory.",
      keyFact:
        "Guyon's Canal contains the Ulnar nerve and artery. Compression here causes hypothenar wasting and medial 1.5 digit numbness — the exact OPPOSITE of the clinical scenario in this question.",
      lines: [
        {
          speaker: "Dr. Meera",
          text: "Option teen — Guyon's Canal aur Falen Test. Yahan dono components galat hain, aur interesting baat yeh hai ki yeh ek doosre se contradict bhi karte hain. Guyon's Canal kya hai? Yeh wrist ke ulnar side par ek canal hai, pisiform aur hook of hamate ke beech. Is canal se Ulnar nerve aur Ulnar artery guzarte hain. Toh Guyon's Canal mein compression matlab Ulnar nerve ki problem. Ab Falen Test kya hai? Yeh Median nerve ka test hai Carpal Tunnel Syndrome ke liye. Ismein patient dono wrists ko hyper-flexion mein rakhta hai sixty seconds tak. Agar lateral saadhe teen digits mein numbness aaye toh test positive hai. Toh socho — aapke paas Ulnar nerve ki site hai aur Median nerve ka test hai. Yeh combination kabhi match nahin kar sakta. Isliye Option teen galat hai.",
          emotion: "neutral",
          pause: "short",
        },
      ],
    },

    // ═══════════════════════════════════════════
    //  5 — OPTION 4 — WRONG ❌
    // ═══════════════════════════════════════════
    {
      type: "optionAnalysis",
      backgroundVariant: "gradient",
      sceneTitle: "Option 4 Analysis",
      subtitle: "Incorrect — Wrong Site",
      optionNumber: 4,
      optionText: "Guyon's Canal and Durkan Compression Test",
      isCorrect: false,
      reasoning:
        "Durkan Test is the correct test for CTS / Median nerve, but the site is wrong. Guyon's Canal compresses the Ulnar nerve, not the Median nerve. If the compression were at Guyon's Canal, you'd use Ulnar nerve-specific tests like Froment or Allen Test.",
      keyFact:
        "This is a classic exam trap — pairing a correct test with the wrong site. Always verify that both the anatomical site and the provocative test correspond to the SAME nerve.",
      lines: [
        {
          speaker: "Dr. Meera",
          text: "Aur last mein Option chaar — Guyon's Canal aur Durkan Compression Test. Yeh ek typical exam trap hai. Durkan Test toh sahi test hai Carpal Tunnel Syndrome ke liye. Par yahan site galat di gayi hai. Guyon's Canal Ulnar nerve ka compression site hai, Median nerve ka nahin. Agar compression site Guyon's Canal hai, toh aapko Ulnar nerve ke tests chahiye — jaise Froment Test ya Wartenberg sign. Toh yahan test sahi hai par site galat hai. Yeh ek classic site-test mismatch hai jo examiners deliberately rakhte hain students ko confuse karne ke liye. Hamesha verify kariye ki site aur test dono same nerve ke liye hain.",
          emotion: "neutral",
          pause: "short",
        },
      ],
    },

    // ═══════════════════════════════════════════
    //  6 — NARRATOR — CLINICAL PEARL
    // ═══════════════════════════════════════════
    {
      type: "narrator",
      backgroundVariant: "particles",
      sceneTitle: "Clinical Pearl",
      subtitle: "CTS — Complete Picture",
      visualCue: "🔑",
      lines: [
        {
          speaker: "Dr. Meera",
          text: "Ab kuch important clinical pearls jo NEET PG ke liye essential hain. Pehla point — Carpal Tunnel Syndrome mein Palmar Cutaneous Branch spare rehti hai kyunki yeh branch Carpal Tunnel ke upar se guzarti hai. Isliye thenar eminence ki skin mein sensation normal rehta hai jabki ungliyaan suni hoti hain. Doosra point — Severe Carpal Tunnel Syndrome mein thenaar muscles bhi affected ho sakte hain, leading to thumb abduction aur opposition mein weakness. Teesra — Raat ko symptoms badhna pathogno-monic hai kyunki neend mein wrist flexed position mein rehta hai jisse Carpal Tunnel ka pressure badh jaata hai.",
          emotion: "neutral",
          pause: "medium",
        },
      ],
    },

    // ═══════════════════════════════════════════
    //  7 — TRAP ALERT
    // ═══════════════════════════════════════════
    {
      type: "trapAlert",
      sceneTitle: "Exam Traps",
      trapDescription:
        "Don't confuse: (1) Froment Test → Ulnar nerve only. (2) Guyon's Canal → Ulnar nerve compression. (3) Phalen & Durkan → Both are CTS tests for Median nerve.",
      lines: [
        {
          speaker: "Dr. Meera",
          text: "Ab sabse zaroori — common traps jo examiners baar baar use karte hain. Pehla trap — Froment Test ko Median nerve se confuse karna. Froment sirf Ulnar nerve ke liye hai. Yaad rakhiye F for Froment, F for Flexor, Ulnar nerve Adductor Pollicis ko supply karta hai. Doosra trap — Guyon's Canal aur Carpal Tunnel ko mix up karna. Guyon's Canal mein Ulnar nerve hai, Carpal Tunnel mein Median nerve hai. Dono wrist par hain par alag nerves ke liye hain. Teesra trap — Falen aur Durkan dono Carpal Tunnel Syndrome ke tests hain. Par examiners Falen ko Guyon's Canal ke saath pair kar ke confuse karte hain jaise Option teen mein kiya gaya.",
          emotion: "shouting",
          pause: "medium",
        },
      ],
    },

    // ═══════════════════════════════════════════
    //  8 — SUMMARY
    // ═══════════════════════════════════════════
    {
      type: "summary",
      backgroundVariant: "gradient",
      sceneTitle: "Key Takeaways",
      bullets: [
        { text: "Lateral 3.5 digits (volar) → Median nerve territory", icon: "🟢" },
        { text: "Carpal Tunnel = Median nerve compression site", icon: "📍" },
        { text: "Durkan Test = Most sensitive CTS test (87%)", icon: "🔑" },
        { text: "Froment Test & Guyon's Canal → Ulnar nerve (NOT Median)", icon: "⚠️" },
        { text: "Night pain + relief on hanging = Pathognomonic for CTS", icon: "🌙" },
      ],
      lines: [
        {
          speaker: "Dr. Meera",
          text: "Final summary — paanch key points yaad rakhiye. First — Lateral saadhe teen digits ka volar side Median nerve ka area hai. Second — Carpal Tunnel Median nerve ka compression site hai. Third — Durkan Compression Test sabse sensitive C T S test hai eighty seven percent sensitivity ke saath. Fourth — Froment Test aur Guyon's Canal, dono exclusively Ulnar nerve se related hain. Fifth — Raat ko dard hona aur haath latkaane se relief milna, yeh Carpal Tunnel Syndrome ka pathogno-monic sign hai.",
          emotion: "neutral",
          pause: "medium",
        },
      ],
    },

    // ═══════════════════════════════════════════
    //  9 — OUTRO
    // ═══════════════════════════════════════════
    {
      type: "outro",
      sceneTitle: "NEET PG Question Series",
      ctaText: "Subscribe for daily NEET PG explanations",
      nextVideoTeaser: "Next: Ulnar Nerve Injuries & Claw Hand",
      lines: [
        {
          speaker: "Dr. Meera",
          text: "Agar yeh video helpful laga toh like aur subscribe zaroor kariye. Har din ek new NEET PG question explanation upload hota hai. Agle video mein hum Ulnar Nerve injuries aur Claw Hand discuss karenge. Tab tak ke liye, keep revising aur apna best do!",
          emotion: "excited",
          pause: "short",
        },
      ],
    },
  ],
};
