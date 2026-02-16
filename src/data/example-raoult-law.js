/**
 * Example: Raoult's Law (Script 6)
 * Chemistry long-form with different theme.
 */
export const raoultLaw = {
  title: "Raoult's Law - Sad Face vs Happy Face",
  subject: "chemistry",
  chapter: "Solutions",
  format: "long",
  characters: [
    { name: "Dr. Z", role: "teacher" },
    { name: "Arjun", role: "student" },
  ],
  themeVariant: 2, // "Teal Flask"
  scenes: [
    {
      type: "hook",
      backgroundVariant: "waves",
      layoutVariant: 0,
      lines: [
        {
          speaker: "Arjun",
          text: "Raoult's Law के Graphs हमेशा Confuse करते हैं यार! Negative ऊपर था या Positive?",
          emotion: "stressed",
          pause: "short",
        },
        {
          speaker: "Dr. Z",
          text: "देखो Arjun, रट्टा मारोगे तो Exam Hall में Pressure के नीचे सब भूल जाओगे. Logic समझो!",
          emotion: "neutral",
          pause: "medium",
        },
      ],
    },
    {
      type: "analogy",
      analogyTitle: "Graph ka Chehra Dekho!",
      analogyIcon: "😢",
      comparison: {
        left: "Sad Face (∩)",
        right: "Happy Face (∪)",
        leftLabel: "Negative Deviation",
        rightLabel: "Positive Deviation",
      },
      lines: [
        {
          speaker: "Dr. Z",
          text: "ये curve एक Sad Face है. मतलब Negative Deviation. A-B Bonds बहुत Strong हैं — Vapor Pressure Decrease होगा!",
          emotion: "neutral",
          pause: "short",
        },
        {
          speaker: "Arjun",
          text: "ओह! जैसे Chloroform और Acetone! इनमे दोस्ती इतनी गहरी है कि Vapor बनने का मन ही नहीं करता.",
          emotion: "happy",
          pause: "medium",
        },
      ],
    },
    {
      type: "trapAlert",
      trapDescription:
        "अगर Vapor Pressure Negative (कम) है, तो Boiling Point Positive (ज़्यादा) होगा. इन्हें Maximum Boiling Azeotropes कहते हैं!",
      correctApproach:
        "Sad Face = Negative Deviation = Strong Bonds = Higher BP = Max Boiling Azeotrope",
      lines: [
        {
          speaker: "Dr. Z",
          text: "NEET Trap! VP down means BP up. Inverse relationship याद रखो!",
          emotion: "shouting",
          pause: "medium",
        },
      ],
    },
    {
      type: "narrator",
      layoutVariant: 0,
      visualCue: "😄",
      lines: [
        {
          speaker: "Dr. Z",
          text: "अब ये देखो! Happy Face curve. यानी Positive Deviation. A-B Bonds Weak हैं, Molecules बहुत आसानी से Escape करते हैं.",
          emotion: "neutral",
          pause: "short",
        },
        {
          speaker: "Dr. Z",
          text: "Standard NEET example: Ethanol and Acetone.",
          emotion: "neutral",
          pause: "medium",
        },
      ],
    },
    {
      type: "pyq",
      year: 2023,
      exam: "NEET",
      question:
        "इनमें से कौन सा Mixture Negative Deviation दिखाता है?",
      options: [
        { label: "A", text: "Ethanol + Acetone", isCorrect: false },
        { label: "B", text: "Carbon disulfide + Acetone", isCorrect: false },
        { label: "C", text: "Chloroform + Acetone", isCorrect: true },
        { label: "D", text: "Benzene + Toluene", isCorrect: false },
      ],
      solution:
        "Chloroform + Acetone में Strong H-bonds बनते हैं → Sad Face → Negative Deviation. +4 Marks!",
      lines: [
        {
          speaker: "Arjun",
          text: "Answer है Option C! Chloroform और Acetone में Strong Bonds, इसलिए Negative Deviation. +4 Marks जेब में!",
          emotion: "happy",
          pause: "short",
        },
      ],
    },
    {
      type: "summary",
      title: "Quick Revision",
      bullets: [
        { number: 1, text: "Sad Face (∩) = Negative Deviation = Strong A-B Bonds" },
        { number: 2, text: "Happy Face (∪) = Positive Deviation = Weak A-B Bonds" },
        { number: 3, text: "Negative Dev → VP down → BP up → Max Boiling Azeotrope" },
        { number: 4, text: "Positive Dev → VP up → BP down → Min Boiling Azeotrope" },
        { number: 5, text: "Example: CHCl₃ + Acetone (Neg), EtOH + Acetone (Pos)" },
      ],
      lines: [
        {
          speaker: "Dr. Z",
          text: "Graph ka chehra dekho, answer mil jayega!",
          emotion: "happy",
          pause: "short",
        },
      ],
    },
    {
      type: "outro",
      ctaText: "Like & Subscribe!",
      nextVideoTeaser: "Colligative Properties — Boiling Point Elevation deep dive",
      lines: [
        {
          speaker: "Dr. Z",
          text: "अगले video में Colligative Properties की deep dive. Stay tuned!",
          emotion: "excited",
          pause: "short",
        },
      ],
    },
  ],
};
