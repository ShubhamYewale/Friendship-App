// ╔══════════════════════════════════════════════════════╗
// ║  PERSONALIZATION CONFIG — edit everything here only  ║
// ╚══════════════════════════════════════════════════════╝

export const siteConfig = {
  // ── Identity ──────────────────────────────────────────
  personName: "Chimneee",
  nickname: "Chimneee",

  // ── Assets ────────────────────────────────────────────
  mainPhoto: "https://miaoda-conversation-file.s3cdn.medo.dev/user-cv7a3ebtljpc/app-dqwf7fmbtx4x/20260816/2.jpg",
  music: "/assets/music.mp3",

  // ── Gallery ───────────────────────────────────────────
  gallery: [
    { image: "https://miaoda-conversation-file.s3cdn.medo.dev/user-cv7a3ebtljpc/app-dqwf7fmbtx4x/20260816/3.jpg", caption: "That smile ❤️",                rotation: -3 },
    { image: "https://miaoda-conversation-file.s3cdn.medo.dev/user-cv7a3ebtljpc/app-dqwf7fmbtx4x/20260816/1.jpg", caption: "That's my Golumolu ❤️",        rotation:  2 },
    { image: "https://miaoda-conversation-file.s3cdn.medo.dev/user-cv7a3ebtljpc/app-dqwf7fmbtx4x/20260816/5.jpg", caption: "Meri pasandida aurat ❤️",      rotation: -1.5 },
    { image: "https://miaoda-conversation-file.s3cdn.medo.dev/user-cv7a3ebtljpc/app-dqwf7fmbtx4x/20260816/4.jpg", caption: "Meri pasandida aurat ❤️",      rotation:  3 },
    { image: "https://miaoda-conversation-file.s3cdn.medo.dev/user-cv7a3ebtljpc/app-dqwf7fmbtx4x/20260816/6.jpg", caption: "Okay, stop being this pretty 😂",           rotation: -2 },
  ],

  // ── Timeline ──────────────────────────────────────────
  timeline: [
    {
      emoji: "🌱",
      label: "How it started...",
      sub: "The first time we played PUBG together, that's when we got to know each other. Later, when you were sitting alone, me and my friend came over to talk with you. From that moment, our friendship really started. ❤️",
    },
    {
      emoji: "💬",
      label: "Some random conversations...",
      sub: "We started with some random conversations, and somehow those conversations turned into long chats, countless laughs, and way too many inside jokes. 😂❤️",
    },
    {
      emoji: "😂",
      label: "Too many inside jokes...",
      sub: "The kind of jokes that only we understand… and somehow they still make me laugh at random times. 😂",
    },
    {
      emoji: "🎞️",
      label: "So many memories...",
      sub: "We played games together, spent time together, celebrated our college fest days, and created so many little memories that I'll always remember. ❤️",
    },
    {
      emoji: "🎂",
      label: "And then came my birthday...",
      sub: "You celebrated my birthday, and honestly, that was really special for me. It's one of those little things I'll always remember. 🥹❤️",
    },
    {
      emoji: "🫶",
      label: "You always cared...",
      sub: "I irritate you most of the time 😂, but somehow you always care about me. And that means more to me than you probably realize. ❤️",
    },
    {
      emoji: "🌟",
      label: "And somehow you became one of my favorite people.",
      sub: "",
    },
  ],

  // ── Final message (one place, nowhere else) ───────────
  finalMessage: `She: How special am I? 🥹❤️
Me:

Tum meri khwahish nahi, kyunki khwahishein to poori ho jaati hain. ✨

Tum meri zaroorat bhi nahi ho, kyunki zarooratein bhi ek din khatam ho jaati hain. 🫶

Tum meri chand bhi nahi ho, kyunki chand par bhi kabhi na kabhi daag lag jaata hai. 🌙

Tum hawa bhi nahi ho, kyunki hawa to chhoo kar guzar jaati hai. 🍃

Tum baarish ki pehli boond bhi nahi ho, kyunki baarish to mausam ki mohtaaj rehti hai. 🌧️

Tum suraj ki woh kiran bhi nahi ho, kyunki suraj to andhera hote hi saath chhod deta hai. ☀️

Tum meri likhi koi kavita to bilkul nahi ho,
kyunki kavita to qaid ho jaati hai pannon mein. 📖✨

Tum woh dua bhi nahi ho,
jo hothon se maangi jaaye. 🤲❤️

Tum woh manzil bhi nahi,
jahan pahunchkar raaste khatam ho jaayein. 🛤️

Tum woh zid bhi nahi,
jo haasil hone par feeki pad jaaye. 🥹

Tum kaun ho? ❤️

Tum woh khushboo ho,
jo basi hai mere mann mein,
aur mitti nahi kisi mausam ke badal jaane se. 🌸

Tum woh khwaab ho subah ka,
jo yaad reh jaata hai,
umr bhar poora ho jaane ki khwahish mein. 🌅💭

Tum woh dawa ho jo aaraam de jaaye. 💊❤️
Tum woh thehraav ho jo sukoon de jaaye. 🕊️

Tum mere liye meri saanson ki tarah ho,
Tum ho to main hoon. ❤️🥹`,

  // ── Final screen ──────────────────────────────────────
  finalTitle: "To my favorite troublemaker... ❤️",
  finalLines: [
    "Stay exactly the way you are.",
    "Because you're pretty awesome.",
  ],
  occasionText: "",

  // ── Secret message ────────────────────────────────────
  secretMessage: `Okay, fine...

You're officially one of my favorite people.

Don't let this go to your head. 😌😂`,
  secretClosing: "Now go smile.",
};

// ── Questions ─────────────────────────────────────────────
export const questions = [
  {
    question: "First of all... are you ready for a tiny surprise? 👀",
    yesText: "Good choice 😌",
    noTexts: ["Nope 😏", "Think again!", "Are you sure? 👀", "Nice try 😂", "Okay okay... you win 😂"],
  },
  {
    question: "Do you agree that you're one of the most important people in my life?",
    yesText: "I knew it ❤️",
    noTexts: ["Excuse me?!", "Try again 😭", "Not an option!", "Be honest 👀", "Okay okay... you win 😂"],
  },
  {
    question: "Are you secretly the cutest person ever?",
    yesText: "Finally, some honesty 😌✨",
    noTexts: ["Rejected 😂", "Are you sure?", "Try YES 😌", "Too slow!", "Okay okay... you win 😂"],
  },
  {
    question: "I know I'm very special for you... right? 👀❤️",
    yesText: "I knew it 😌❤️",
    noTexts: ["Really? 👀", "Think again 😂", "You sure? 😏", "Nice try!", "We both know the answer 😌", "Okay okay... you win 😂"],
  },
  {
    question: "Do you want to see what I made for you?",
    yesText: "Okay... here we go 🥹",
    noTexts: ["Coming anyway 😭", "Nice try!", "The surprise is ready 👀", "Too late!", "Okay okay... you win 😂"],
  },
  {
    question: "Ready?",
    yesText: "Let's gooo ❤️",
    noTexts: ["Too late 😏", "It's time!", "Here we go...", "Can't wait!", "Okay okay... you win 😂"],
  },
];
