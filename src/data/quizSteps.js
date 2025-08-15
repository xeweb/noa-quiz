export const steps = [
  {
    id: "welcome",
    title: "Welcome to Now Often Always",
    description:
      "We created this mini wellness quiz to help you understand what your body might be telling you. Let's get started:",
    type: "welcome",
  },
  {
    id: "lifeStage",
    title: "What stage of life are you in?",
    type: "single",
    options: [
      "I have a monthly cycle",
      "I'm pregnant",
      "I'm postpartum (less than 12 months)",
      "Perimenopause",
      "Menopause",
      "Not sure",
      "Prefer not to say",
    ],
  },
  {
    id: "goals",
    title: "What brings you to Now Often Always?",
    type: "multiple",
    options: [
      "I want to balance hormones",
      "I would love all-day energy",
      "To have clearer skin",
      "Try to have better sleep",
      "I want less bloating",
      "I would like to focus on weight management",
      "I am just curious",
    ],
  },
  {
    id: "hormoneSymptoms",
    title: "Let's start with your hormone symptoms. Tick all that apply:",
    type: "symptoms",
    options: [
      {
        text: "Cycles are irregular or unpredictable",
        severity: 3,
        category: "Severe",
      },
      {
        text: "Periods are heavy, clotty or very painful",
        severity: 3,
        category: "Severe",
      },
      {
        text: "PMS (mood swings, irritability or anxiety) most months",
        severity: 2,
        category: "Moderate",
      },
      {
        text: "Water retention or bloating before your period",
        severity: 1,
        category: "Mild",
      },
      {
        text: "Breast tenderness around your cycle",
        severity: 1,
        category: "Mild",
      },
      {
        text: "Jawline/chin acne around ovulation or before your period",
        severity: 2,
        category: "Moderate",
      },
      {
        text: "Low libido that feels new or unusual",
        severity: 2,
        category: "Moderate",
      },
      {
        text: "New hair or skin changes (shedding, dryness, dullness)",
        severity: 2,
        category: "Moderate",
      },
    ],
  },
  {
    id: "stressSymptoms",
    title: "Now let's go through your stress symptoms",
    type: "symptoms",
    options: [
      {
        text: '"Tired but wired" at night; hard to switch off',
        severity: 2,
        category: "Moderate",
      },
      {
        text: "Struggle to wake even after 7+ hours sleep",
        severity: 2,
        category: "Moderate",
      },
      {
        text: "Jumpy/on edge with small triggers",
        severity: 3,
        category: "Severe",
      },
      {
        text: "Overwhelmed or emotionally reactive more than usual",
        severity: 2,
        category: "Moderate",
      },
      {
        text: "Rely on caffeine to get through the day",
        severity: 1,
        category: "Mild",
      },
      {
        text: "Palpitations or shallow breathing when stressed",
        severity: 3,
        category: "Severe",
      },
      {
        text: "Jaw clenching or ongoing muscle tension",
        severity: 2,
        category: "Moderate",
      },
      {
        text: "Frequent afternoon slump (14:00–17:00)",
        severity: 1,
        category: "Mild",
      },
    ],
  },
  {
    id: "bloodSugarSymptoms",
    title: "Let's now focus on blood sugar symptoms",
    type: "symptoms",
    options: [
      {
        text: "Sluggish or sleepy after meals",
        severity: 1,
        category: "Mild",
      },
      {
        text: "Shaky/irritable/dizzy if meals are delayed",
        severity: 3,
        category: "Severe",
      },
      {
        text: '"Hangry" when you go too long without food',
        severity: 2,
        category: "Moderate",
      },
      {
        text: "Cravings for sweets/refined carbs (esp. afternoons/evenings)",
        severity: 1,
        category: "Mild",
      },
      {
        text: "Wake in the night (often ~3–4am)",
        severity: 2,
        category: "Moderate",
      },
      {
        text: "Energy crashes a few hours after eating",
        severity: 1,
        category: "Mild",
      },
      {
        text: "Need snacks or caffeine to function",
        severity: 1,
        category: "Mild",
      },
      {
        text: "Weight fluctuates easily despite similar intake",
        severity: 2,
        category: "Moderate",
      },
    ],
  },
  {
    id: "nutritionalSymptoms",
    title: "And finally your nutritional status symptoms",
    type: "symptoms",
    options: [
      {
        text: "Tired all the time, regardless of sleep",
        severity: 3,
        category: "Severe",
      },
      {
        text: "Dizzy or light-headed on standing",
        severity: 2,
        category: "Moderate",
      },
      {
        text: "Breathless doing simple tasks",
        severity: 3,
        category: "Severe",
      },
      {
        text: "Hair thinning or more shedding than usual",
        severity: 3,
        category: "Severe",
      },
      {
        text: "Nails peel, break, or have white spots",
        severity: 1,
        category: "Mild",
      },
      {
        text: "Cracks at corners of the mouth",
        severity: 2,
        category: "Moderate",
      },
      {
        text: "Dry/flaky or unusually pale skin",
        severity: 2,
        category: "Moderate",
      },
      { text: "Bruise easily", severity: 2, category: "Moderate" },
    ],
  },
  {
    id: "lifestyle",
    title:
      "We would love to know a little about your lifestyle to help give you more personalised advice:",
    type: "multiple",
    options: [
      "I tend to skip meals",
      "I have less than 5 servings veg/day",
      "I have more than 2 coffees/day",
      "I have more than 4 alcoholic drinks/week",
      "I have less than 7 hours sleep",
      "None of these",
    ],
  },
];
