// All site copy lives here. Edit this file to update the portfolio.

export const profile = {
  name: "Xander Rancap",
  role: "Full-stack developer",
  location: "Calgary, AB",
  timeZone: "America/Edmonton",
  school: "SAIT",
  email: "xander.rancap8@gmail.com",
  photo: "https://i.postimg.cc/W3VBJZ1Q/derpogs-(1).jpg",
  resume: "/resume.pdf",
  intro:
    "I build full-stack things where clean design meets solid engineering, and I test them properly. I try stuff, break it, learn something, and redo it until it's right.",
  status: "Open to roles, freelance and anything interesting",
};

export const stats = [
  { value: "3.61", label: "GPA · SAIT Software Dev" },
  { value: "10+", label: "Projects built" },
  { value: "1", label: "App in daily production use" },
];

export const socials = [
  { label: "GitHub", handle: "xndrncp08", url: "https://github.com/xndrncp08" },
  {
    label: "LinkedIn",
    handle: "xander-rancap",
    url: "https://www.linkedin.com/in/xander-rancap-79b2a0326/",
  },
  {
    label: "Instagram",
    handle: "derbadoobeelat",
    url: "https://www.instagram.com/derbadoobeelat/",
  },
];

// The first project is the hero tile; the next four are large tiles.
// `logo` images sit on a near-black tile; `image` is a full-bleed screenshot.
// `accent` tints the tile's glow and the project sheet.
export const projects = [
  {
    title: "Resoniq",
    tech: "Next.js · FastAPI · Librosa",
    year: "2026",
    tagline: "Upload a song. Get the guitar tone behind it.",
    approach:
      "A Next.js 16 app plus a Python/FastAPI service that runs real audio-feature extraction with Librosa to infer amp voicing, cabinet, pickup position, EQ, gain and effects chain. The heuristics are documented honestly as a starting point to dial in by ear, not a verified gear match.",
    highlights: [
      "Separate FastAPI microservice for the signal processing",
      "Auth, file upload and an animated dashboard for tuning the result",
      "PostgreSQL via Prisma, files in Supabase Storage, whole stack in Docker Compose",
    ],
    logo: "/projects/resoniq.jpg",
    accent: "#ff6a00",
    tags: ["Next.js", "TypeScript", "FastAPI", "Librosa", "PostgreSQL", "Docker"],
    links: { code: "https://github.com/xndrncp08/Resoniq" },
  },
  {
    title: "FJuan",
    tech: "Next.js · Groq · OpenF1",
    year: "2026",
    tagline: "F1 data, without the fluff.",
    approach:
      "An F1 platform that pulls race calendars back to 1950, live telemetry, driver comparisons, standings, circuits and news into one place — plus race predictions you can ask questions about.",
    highlights: [
      "Weighted prediction engine (form, quali pace, circuit history) with Jest-tested maths",
      "Groq-powered chat that answers questions from live prediction data",
      "Live car data from OpenF1 and historical results from Jolpica",
    ],
    logo: "/projects/fjuan.jpg",
    accent: "#e10600",
    tags: ["Next.js", "TypeScript", "Groq", "OpenF1", "Jest"],
    links: {
      code: "https://github.com/xndrncp08/FJuan",
      live: "https://f-juan.vercel.app",
    },
  },
  {
    title: "BMR Pharmacy",
    tech: "React · Express · Supabase",
    year: "2025–now",
    tagline: "Paper sales records, replaced. Used every day.",
    approach:
      "A full-stack sales tracker for a local pharmacy with live revenue dashboards, ranked product summaries and automated monthly reports. It's still in daily production use, and I own its defect triage.",
    highlights: [
      "Aggregates verified against source transactions in Postgres, not just the UI",
      "Cypress end-to-end and Jest unit tests on core dashboard flows",
      "Locally hosted Ollama assistant, tested for consistency",
    ],
    logo: "/projects/bmr.jpg",
    accent: "#19d39a",
    tags: ["React", "Express", "PostgreSQL", "Cypress", "Ollama"],
    links: { code: "https://github.com/xndrncp08/bmr-pharmacy" },
  },
  {
    title: "WMBA?",
    tech: "Next.js · Express · Prisma",
    year: "2026",
    tagline: "600+ live Calgary buses. One map.",
    approach:
      "Where My Bus At ingests Calgary Transit's GTFS-realtime feed every 60 seconds and turns it into a command-centre map with heatmaps, trails and route analytics.",
    highlights: [
      "Tracks 600+ active buses across 530+ routes",
      "Haversine speeds and a rolling 25-hour vehicle history",
      "Leaflet heatmaps, 1-hour trails and Recharts trend dashboards",
    ],
    logo: "/projects/wmba.jpg",
    accent: "#f47b20",
    tags: ["Next.js", "Express", "Prisma", "Leaflet", "GTFS"],
  },
  {
    title: "YYC Track",
    tech: "React · Express · Azure",
    year: "2025–26",
    tagline: "Rate the CTrain. SAIT capstone, shown at CapCon 2026.",
    approach:
      "A civic feedback platform for Calgary's CTrain built in an Agile team. I built the React/TypeScript frontend and owned a big share of the testing.",
    highlights: [
      "Cypress regression suites and Jest units, run per commit in GitHub Actions",
      "Azure AI Content Safety and sentiment analysis to moderate comments",
      "Defects triaged and tracked in Jira through sprint planning and stand-ups",
    ],
    image: "https://i.postimg.cc/1zpCSYZ0/image.png",
    accent: "#2f7bff",
    tags: ["React", "TypeScript", "MongoDB", "Azure AI", "Cypress"],
    links: { code: "https://github.com/xndrncp08/yyc-track-backend" },
  },
  {
    title: "Apex F1",
    tech: "Python ML · Next.js",
    year: "2026",
    tagline: "Win and podium odds from a trained model.",
    approach:
      "The full web layer around a Python-trained race prediction model: schema, REST API and a React UI showing probabilities next to historical accuracy.",
    highlights: [
      "API tested against incomplete, delayed and malformed inputs",
      "Degrades predictably instead of failing silently",
    ],
    logo: "/projects/apexf1.jpg",
    accent: "#ff3b1f",
    tags: ["Python", "Next.js", "Express", "Supabase"],
    links: { code: "https://github.com/xndrncp08/ApexF1" },
  },
  {
    title: "FitZone",
    tech: ".NET MAUI Blazor",
    year: "2024",
    tagline: "Gym management, on desktop and mobile.",
    approach:
      "Led a small team building auth, memberships and scheduling in C# with .NET MAUI Blazor Hybrid, on a MariaDB schema I designed.",
    highlights: ["One codebase for mobile and desktop", "Took it from setup to a working demo"],
    logo: "/projects/fitzone.jpg",
    accent: "#ff5a1f",
    tags: ["C#", ".NET MAUI", "MariaDB"],
  },
  {
    title: "Basketbol",
    tech: "Next.js",
    year: "2025",
    tagline: "NBA games, teams and players, cleanly.",
    approach:
      "Normalised the ESPN and BallDontLie APIs into a single data layer for a responsive NBA hub.",
    image: "https://i.postimg.cc/cL8LRwdT/image.png",
    accent: "#f7931a",
    tags: ["Next.js", "ESPN API"],
    links: {
      code: "https://github.com/xndrncp08/cprg306_basketbol",
      live: "https://cprg306-basketbol.vercel.app",
    },
  },
  {
    title: "NV Closet",
    tech: "Figma · UI/UX",
    year: "2025",
    tagline: "A wardrobe app that dresses you.",
    approach:
      "A digital wardrobe with AI outfit recommendations. Started from user flows, explored several layouts, and landed on a high-fidelity prototype.",
    image: "https://i.postimg.cc/Kj2kF8ML/NV.png",
    accent: "#f472b6",
    tags: ["Figma", "Prototyping"],
  },
];

export const education = [
  {
    title: "Diploma, Software Development",
    org: "SAIT · Calgary",
    period: "2024 – 2026",
    detail:
      "3.61 GPA. Software security, OOP in Python, C# and Java, web development, databases and cloud computing on Azure.",
  },
];

export const experience = [
  {
    title: "Production maintainer",
    org: "BMR Pharmacy · Calgary",
    period: "2025 – now",
    detail:
      "Built and still run the pharmacy's sales tracker — triaging user-reported defects, isolating root causes and verifying fixes before release.",
  },
  {
    title: "Immersion intern",
    org: "First Eduspec Inc. · Makati, PH",
    period: "2024",
    detail:
      "Programmed 15+ Arduino circuits and co-built a greenhouse automation prototype that won an innovation award.",
  },
];

export const story = [
  {
    title: "The origin",
    tag: "PH → YYC",
    body: "I grew up in the Philippines — heat, humidity, and a city that never really slows down. Then I moved to Calgary, which still feels like a strange trade sometimes. The winters are unnecessarily aggressive. I'm still adjusting.",
  },
  {
    title: "The accidental developer",
    tag: "No grand plan",
    body: "I didn't have some big plan. I kept messing around with things until coding stuck longer than everything else — which surprised me more than anyone. I still don't fully know why it clicked. It just did.",
  },
  {
    title: "Build. Cringe. Improve.",
    tag: "The loop",
    body: "Build something, think it's solid, come back later and immediately see five things I'd change. It's a little annoying, but I've accepted that the cringe is the compass. It means I'm getting better.",
  },
  {
    title: "I sit with it",
    tag: "Think first",
    body: "I hold problems in my head longer than I probably need to. Not stuck — thinking. I'd rather understand what's happening before jumping in. I've done \"code first, regret later\" enough times to know how it ends.",
  },
];

export const offTheClock = [
  { label: "Running", note: "Clears my head better than anything" },
  { label: "Music", note: "Mostly when I'm stuck on something" },
  { label: "Sports", note: "Grew up playing, still do" },
  { label: "Calgary winters", note: "Still haven't forgiven them" },
];

export const stack = [
  { group: "Languages", items: ["TypeScript", "JavaScript", "Python", "C#", "Java", "SQL"] },
  { group: "Frontend", items: ["React", "Next.js", "Vite", "Tailwind CSS", "Recharts", "Leaflet"] },
  { group: "Backend & data", items: ["Node.js", "Express", "FastAPI", "Prisma", "PostgreSQL", "MongoDB", "Supabase"] },
  { group: "AI", items: ["Anthropic API", "Groq Llama 3", "Ollama", "Librosa"] },
  { group: "Testing", items: ["Cypress", "Jest", "JMeter", "GitHub Actions"] },
  { group: "Cloud & tools", items: ["Azure", "Docker", "Terraform", "Vercel", "Git", "Jira", "Figma"] },
];
