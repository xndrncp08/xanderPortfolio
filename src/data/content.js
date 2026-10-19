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
  raceNumber: "08",
  origin: "Manila, PH",
  base: "Calgary, CA",
  coords: "51.0447° N, 114.0719° W",
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

// Order is grid order: the first three are the podium (P1, P2, P3), the rest
// run in the Grand Prix calendar. `logo` art sits on a near-black panel;
// `image` is a screenshot. `metric` is the "top speed" readout — keep it factual.
export const projects = [
  {
    title: "Diskarte",
    metric: { value: "₱0", label: "to self-host chat, voice and video" },
    tech: "Next.js · Supabase · LiveKit",
    year: "2026",
    tagline: "An open-source Discord alternative, made for the Philippines.",
    approach:
      "Tambayans (servers) with realtime chat, LiveKit voice, video and screen share, friends and DMs, and Bantay-Bayan moderation — built for Filipino gamers, student orgs and creators, and cheap enough to run for free.",
    highlights: [
      "Row Level Security on every table, nonce-based CSP, CSRF checks and server-minted LiveKit tokens",
      "Auto-mod for spam, phishing domains and hate speech, plus bans, slow mode and an audit log",
      "Installable PWA with offline queued sends; Vitest, PGlite RLS tests, Playwright and axe-core audits",
    ],
    logo: "/projects/diskarte.jpg",
    accent: "#eab308",
    tags: ["Next.js", "TypeScript", "Supabase", "PostgreSQL", "LiveKit", "Playwright", "Docker"],
    links: { code: "https://github.com/xndrncp08/Diskarte" },
  },
  {
    title: "Resoniq",
    metric: { value: "6", label: "tone parameters inferred per song" },
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
    links: {
      code: "https://github.com/xndrncp08/Resoniq",
      live: "https://resoniq-two.vercel.app",
    },
  },
  {
    title: "FJuan",
    metric: { value: "350+", label: "race records, searchable" },
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
    metric: { value: "Daily", label: "production use since launch" },
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
    title: "BullScript",
    metric: { value: "3", label: "forecast horizons, scored vs a random walk" },
    tech: "FastAPI · XGBoost · FinBERT",
    year: "2026",
    tagline: "A market terminal that's honest about what it can't predict.",
    approach:
      "Live quotes, candlestick charts, 5/14/30-day price forecasts and FinBERT news sentiment in a dense, keyboard-first workspace. Forecasts are scored against a random walk, and the UI shows when a model has no real edge.",
    highlights: [
      "XGBoost on 16 scale-free features with a purged train / calibration / holdout split",
      "Self-retraining loop that watches live skill and feature drift, then promotes new models",
      "Shrinkage-calibrated forecasts fall back to \"no change\" instead of a confident wrong call",
    ],
    logo: "/projects/bullscript.jpg",
    accent: "#22c55e",
    tags: ["Python", "FastAPI", "XGBoost", "FinBERT", "React", "TypeScript"],
    links: { code: "https://github.com/xndrncp08/Bullscript" },
  },
  {
    title: "Master M",
    metric: { value: "Live", label: "booking site for a Calgary barbershop" },
    tech: "Next.js · TypeScript · Zod",
    year: "2026",
    tagline: "A real shop's website, with online booking.",
    approach:
      "The client-facing site for Master M Barbershop: services, hours, contact and a multi-step booking flow with a live slot picker. Hours drive everything from the open/closed badge to the bookable slots.",
    highlights: [
      "Zod-validated booking API and Server Action, both rate-limited",
      "Locked-down CSP, sitemap and JSON-LD for local search",
      "Vitest unit and component tests, Playwright end-to-end",
    ],
    logo: "/projects/masterm.jpg",
    accent: "#d4a537",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Zod", "Vitest", "Playwright"],
    links: {
      code: "https://github.com/xndrncp08/Master-M_Barbershop",
      live: "https://master-m-barbershop.vercel.app",
    },
  },
  {
    title: "WMBA?",
    metric: { value: "600+", label: "live buses tracked every 60s" },
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
    title: "Overclocked",
    metric: { value: "10k/s", label: "UDP telemetry packets, the design target" },
    tech: "Node.js · RxJS · DuckDB",
    year: "2026",
    tagline: "F1-style telemetry, ingested without dropping a packet.",
    approach:
      "A real-time pipeline for high-frequency car telemetry. UDP ingestion runs on its own worker thread and hands packets to the main thread through a lock-free ring buffer, so slow processing never stalls the socket. In progress: the terminal dashboard is next.",
    highlights: [
      "SPSC ring buffer on SharedArrayBuffer + Atomics, with no copying between threads",
      "Compact 80-byte binary wire format instead of JSON",
      "RxJS sliding-window stats and anomaly detection, batch-flushed to DuckDB; Vitest per phase",
    ],
    logo: "/projects/overclocked.jpg",
    accent: "#00d1ff",
    tags: ["TypeScript", "Node.js", "RxJS", "DuckDB", "Vitest"],
    links: { code: "https://github.com/xndrncp08/Overclocked" },
  },
  {
    title: "Chrono Breakers",
    metric: { value: "215", label: "offline gameplay tests, 0 failing" },
    tech: "Luau · Roblox · Rojo",
    year: "2026",
    tagline: "1 Time-Keeper vs 4 Infiltrators. A Roblox survival-horror heist.",
    approach:
      "An asymmetrical multiplayer game: Infiltrators hack terminals, break chases and rescue each other before the Temporal Collapse, while the Time-Keeper hunts them. Server-authoritative, with every gameplay rule in a pure core that never touches Roblox instances. In progress: not published yet.",
    highlights: [
      "Strict-typed Luau with no third-party runtime dependencies",
      "Pure rules core takes time as an argument, so every rule runs under Lune tests offline",
      "Rate-limited, validated remotes and idempotent reward payouts",
    ],
    logo: "/projects/chronobreakers.jpg",
    accent: "#5eead4",
    tags: ["Luau", "Roblox", "Rojo", "Lune"],
    links: { code: "https://github.com/xndrncp08/chrono-breakers" },
  },
  {
    title: "YYC Track",
    metric: { value: "CapCon", label: "presented at SAIT CapCon 2026" },
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
    title: "Job Hunter",
    metric: { value: "0–100", label: "match score from 4 weighted signals" },
    tech: "FastAPI · React · ChromaDB",
    year: "2026",
    tagline: "My job search, ranked against my own resume.",
    approach:
      "A local-first dashboard that searches job boards on a schedule, scores each posting against an uploaded resume and tracks applications. Everything runs on my machine; the score is labelled as an estimate for triage.",
    highlights: [
      "Local embeddings (all-MiniLM-L6-v2) in ChromaDB for semantic similarity",
      "Score blends similarity, skill overlap, seniority and location fit",
      "Optional Claude-powered resume tailoring per posting",
    ],
    logo: "/projects/jobhunter.jpg",
    accent: "#a78bfa",
    tags: ["Python", "FastAPI", "React", "SQLite", "ChromaDB", "Embeddings"],
    links: { code: "https://github.com/xndrncp08/Jab-Hant" },
  },
  {
    title: "Apex F1",
    metric: { value: "ML", label: "win and podium probabilities" },
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
    metric: { value: "Lead", label: "ran a small dev team" },
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
    metric: { value: "2 → 1", label: "APIs normalised into one layer" },
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
    metric: { value: "Hi-fi", label: "prototype from user flows up" },
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
  { group: "Backend & data", items: ["Node.js", "Express", "FastAPI", "Prisma", "PostgreSQL", "MongoDB", "Supabase", "LiveKit"] },
  { group: "AI", items: ["Anthropic API", "Groq Llama 3", "Ollama", "Librosa", "XGBoost"] },
  { group: "Testing", items: ["Cypress", "Jest", "Vitest", "Playwright", "JMeter", "GitHub Actions"] },
  { group: "Cloud & tools", items: ["Azure", "Docker", "Terraform", "Vercel", "Git", "Jira", "Figma"] },
];

// "Race season" — chronological, from the master resume.
// type: "start" | "race" | "podium" | "flag"
export const season = [
  { date: "2024", title: "Lights out at SAIT", detail: "Started the Software Development diploma.", type: "start" },
  { date: "2024", title: "First Eduspec internship", detail: "15+ Arduino circuits and a greenhouse automation prototype. Won an innovation award.", type: "podium" },
  { date: "2024", title: "FitZone", detail: "Led a small team to a working .NET MAUI Blazor gym system.", type: "race" },
  { date: "2025", title: "Cloud security & load testing", detail: "JMeter, Terraform and Azure API Management coursework.", type: "race" },
  { date: "Sep 2025", title: "YYC Track kicks off", detail: "SAIT capstone in an Agile team, Cypress and Jest in CI.", type: "race" },
  { date: "Nov 2025", title: "BMR Pharmacy goes live", detail: "Replaced paper sales records. Still in daily production use.", type: "podium" },
  { date: "Jan 2026", title: "FJuan and Apex F1", detail: "F1 analytics, a prediction engine and an ML race model.", type: "race" },
  { date: "Feb 2026", title: "WMBA?", detail: "Live GTFS pipeline tracking 600+ Calgary buses.", type: "race" },
  { date: "Apr 2026", title: "CapCon 2026", detail: "Presented YYC Track, deployed on Azure.", type: "podium" },
  { date: "2026", title: "Chequered flag", detail: "Graduated from SAIT with a 3.61 GPA.", type: "flag" },
  { date: "Jul 2026", title: "Resoniq", detail: "Guitar tone analysis with a FastAPI + Librosa engine.", type: "race" },
  { date: "Sep 2026", title: "Job Hunter, Overclocked, BullScript", detail: "Resume-ranked job search, a 10k/s telemetry pipeline and a self-retraining market terminal.", type: "race" },
  { date: "Oct 2026", title: "Master M goes live", detail: "Booking site for a Calgary barbershop.", type: "podium" },
  { date: "Oct 2026", title: "Chrono Breakers", detail: "Asymmetrical Roblox survival-horror heist in strict Luau. In progress.", type: "race" },
  { date: "Now", title: "Diskarte", detail: "An open-source Discord alternative for the Philippines. In progress.", type: "race" },
];

// Telemetry: each discipline is measured by how many projects above use it.
// `match` is tested against each project's tags and tech string.
export const disciplines = [
  { key: "frontend", label: "Aero", sub: "Frontend", match: ["React", "Next.js", "Vite", "Figma"] },
  { key: "backend", label: "Engine", sub: "Backend", match: ["Express", "Node.js", "FastAPI", ".NET", "C#"] },
  { key: "data", label: "Fuel", sub: "Data", match: ["PostgreSQL", "Prisma", "Supabase", "MongoDB", "MariaDB", "SQLite", "DuckDB", "ChromaDB"] },
  { key: "testing", label: "Scrutineering", sub: "Testing", match: ["Cypress", "Jest", "Vitest", "Playwright"] },
  { key: "ai", label: "Strategy", sub: "AI / ML", match: ["Groq", "Ollama", "Librosa", "Machine Learning", "Azure AI", "ML", "XGBoost", "FinBERT", "Embeddings"] },
  { key: "cloud", label: "Pit ops", sub: "Cloud & infra", match: ["Docker", "Azure"] },
];
