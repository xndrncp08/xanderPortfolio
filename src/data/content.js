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

// The first four projects are shown as large featured cards.
// `image` is optional — projects without one get a typographic cover.
export const projects = [
  {
    title: "Resoniq",
    tech: "Next.js · FastAPI · Librosa",
    year: "2026",
    tagline: "Upload a song, get back the guitar tone recipe behind it.",
    approach:
      "A Next.js 16 app plus a Python/FastAPI service that runs real audio-feature extraction with Librosa to infer amp, cab, pickup, EQ, gain and effects chain. Postgres via Prisma, Docker Compose for the stack.",
    tags: ["Next.js", "TypeScript", "FastAPI", "Librosa", "PostgreSQL", "Docker"],
    links: { code: "https://github.com/xndrncp08/Resoniq" },
  },
  {
    title: "F1Dash",
    tech: "Next.js · Groq Llama 3",
    year: "2026",
    tagline: "AI-powered F1 analytics — telemetry, driver comparisons and race predictions.",
    approach:
      "A weighted prediction engine (form, quali pace, circuit history) with Jest-tested maths, plus a Llama 3 chatbot that answers questions from live prediction data.",
    image: "https://i.postimg.cc/RFx66GfX/image.png",
    tags: ["Next.js", "TypeScript", "Groq", "React Query", "Jest"],
    links: {
      code: "https://github.com/xndrncp08/f1-stats",
      live: "https://f1-stats-alpha.vercel.app",
    },
  },
  {
    title: "YYC Track",
    tech: "React · Express · Azure",
    year: "2025–26",
    tagline: "Calgary CTrain rating platform — SAIT capstone, presented at CapCon 2026.",
    approach:
      "Built the React/TypeScript frontend in an Agile team, wrote Cypress and Jest suites run per commit in GitHub Actions, and wired up Azure AI Content Safety to moderate comments.",
    image: "https://i.postimg.cc/1zpCSYZ0/image.png",
    tags: ["React", "TypeScript", "MongoDB", "Azure AI", "Cypress"],
    links: { code: "https://github.com/xndrncp08/yyc-track-backend" },
  },
  {
    title: "BMR Pharmacy",
    tech: "React · Express · Supabase",
    year: "2025–now",
    tagline: "Replaced a pharmacy's paper sales records. Still in daily production use.",
    approach:
      "Live revenue dashboards, ranked product summaries and automated monthly reports. Aggregates are verified against source transactions in Postgres, and I own production defect triage.",
    image: "https://i.postimg.cc/7LbzW9TW/image.png",
    tags: ["React", "Express", "PostgreSQL", "Cypress", "Ollama"],
    links: { code: "https://github.com/xndrncp08/bmr-pharmacy" },
  },
  {
    title: "WMBA?",
    tech: "Next.js · Express · Prisma",
    year: "2026",
    tagline: "Where My Bus At — tracks 600+ live Calgary buses across 530+ routes.",
    approach:
      "Ingests Calgary Transit's GTFS-realtime feed every 60s, computes speeds with Haversine, keeps a rolling 25-hour history, and renders heatmaps and trails on Leaflet.",
    image: "https://i.postimg.cc/TPgZcMn1/WMBA.png",
    tags: ["Next.js", "Prisma", "Leaflet", "GTFS"],
  },
  {
    title: "Apex F1",
    tech: "Python ML · Next.js",
    year: "2026",
    tagline: "Win and podium probabilities from a Python-trained ML model.",
    approach:
      "Built the web layer around the model — schema, REST API and a React UI showing predictions alongside historical accuracy.",
    image: "https://i.postimg.cc/Y0tqJ2sF/image.png",
    tags: ["Python", "Next.js", "Supabase"],
    links: { code: "https://github.com/xndrncp08/ApexF1" },
  },
  {
    title: "FitZone",
    tech: ".NET MAUI Blazor",
    year: "2024",
    tagline: "Cross-platform gym management — led a small team to a working demo.",
    approach:
      "Auth, memberships and scheduling in C#, on a MariaDB schema I designed.",
    image: "https://i.postimg.cc/t4trHsnd/FitZone.png",
    tags: ["C#", ".NET MAUI", "MariaDB"],
  },
  {
    title: "Basketbol",
    tech: "Next.js",
    year: "2025",
    tagline: "NBA games, teams and player stats in one clean interface.",
    approach:
      "Normalised the ESPN and BallDontLie APIs into a single data layer for a responsive NBA hub.",
    image: "https://i.postimg.cc/cL8LRwdT/image.png",
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
    tagline: "Digital wardrobe app with AI outfit recommendations.",
    approach:
      "Started from user flows, explored several layouts, and landed on a high-fidelity prototype.",
    image: "https://i.postimg.cc/Kj2kF8ML/NV.png",
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
