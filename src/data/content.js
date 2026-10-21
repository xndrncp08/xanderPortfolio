// All site copy lives here. Facts follow the master resume (public/resume.pdf)
// and github.com/xndrncp08 — don't add achievements that aren't in either.

export const site = {
  url: "https://xander-rancap.vercel.app",
  title: "Xander Rancap — Software developer in Calgary",
  description:
    "Xander Rancap is a full-stack software developer in Calgary and a SAIT Software Development graduate, building carefully tested web applications.",
};

export const profile = {
  name: "Xander Rancap",
  role: "Software developer",
  location: "Calgary, Alberta",
  origin: "Manila, Philippines",
  timeZone: "America/Edmonton",
  email: "xander.rancap8@gmail.com",
  photo: "/me/portrait.jpg",
  gradPhoto: "/me/grad.jpg",
  resume: "/resume.pdf",
  github: "xndrncp08",
  status: "Open to full-time roles, contracts and freelance work.",
  intro:
    "SAIT Software Development grad, now building in Calgary. I like owning things end to end: a pharmacy's daily sales tracker, an open-source Discord alternative for the Philippines, and a tool that hears a guitar tone and tells you how to dial it in.",
};

export const socials = [
  { label: "GitHub", handle: "xndrncp08", url: "https://github.com/xndrncp08" },
  { label: "LinkedIn", handle: "xander-rancap", url: "https://www.linkedin.com/in/xander-rancap-79b2a0326/" },
  { label: "Instagram", handle: "derbadoobeelat", url: "https://www.instagram.com/derbadoobeelat/" },
];

// `featured` projects lead the home page, in this order; the rest fill the
// archive. Every project gets a case study at /work/<slug>. `logo` art sits on
// a near-black plate; `image` is a screenshot. Keep `metric` factual.
export const projects = [
  {
    slug: "diskarte",
    featured: true,
    title: "Diskarte",
    kind: "Realtime chat platform",
    status: "In progress",
    metric: { value: "₱0", label: "to self-host chat, voice and video" },
    year: "2026",
    tagline: "An open-source Discord alternative, made for the Philippines.",
    aside: "Named after the Filipino art of making it work with what you have. Fitting, given the budget.",
    approach:
      "Tambayans (servers) with realtime chat, LiveKit voice, video and screen share, friends and DMs, and Bantay-Bayan moderation — built for Filipino gamers, student orgs and creators, and cheap enough to run for free.",
    highlights: [
      "Row Level Security on every table, nonce-based CSP, CSRF checks and server-minted LiveKit tokens",
      "Auto-mod for spam, phishing domains and hate speech, plus bans, slow mode and an audit log",
      "Installable PWA with offline queued sends; Vitest, PGlite RLS tests, Playwright and axe-core audits",
    ],
    logo: "/projects/diskarte.jpg",
    tags: ["Next.js", "TypeScript", "Supabase", "PostgreSQL", "LiveKit", "Playwright", "Docker"],
    links: { code: "https://github.com/xndrncp08/Diskarte" },
  },
  {
    slug: "resoniq",
    featured: true,
    title: "Resoniq",
    kind: "Audio analysis",
    metric: { value: "6", label: "tone parameters inferred per song" },
    year: "2026",
    tagline: "Upload a song. Get the guitar tone behind it.",
    aside: "Built because I was tired of buying pedals to find out I needed a different pedal.",
    approach:
      "A Next.js 16 app plus a Python/FastAPI service that runs real audio-feature extraction with Librosa to infer amp voicing, cabinet, pickup position, EQ, gain and effects chain. The heuristics are documented honestly as a starting point to dial in by ear, not a verified gear match.",
    highlights: [
      "Separate FastAPI microservice for the signal processing",
      "Auth, file upload and an animated dashboard for tuning the result",
      "PostgreSQL via Prisma, files in Supabase Storage, whole stack in Docker Compose",
    ],
    logo: "/projects/resoniq.jpg",
    tags: ["Next.js", "TypeScript", "FastAPI", "Librosa", "PostgreSQL", "Docker"],
    links: { code: "https://github.com/xndrncp08/Resoniq", live: "https://resoniq-two.vercel.app" },
  },
  {
    slug: "fjuan",
    featured: true,
    title: "FJuan",
    kind: "Sports analytics",
    metric: { value: "350+", label: "race records, searchable" },
    year: "2026",
    tagline: "Formula 1 data, without the fluff.",
    aside: "For when the TV graphics say \"box, box\" and you want the actual numbers.",
    approach:
      "An F1 platform that pulls race calendars back to 1950, live telemetry, driver comparisons, standings, circuits and news into one place — plus race predictions you can ask questions about.",
    highlights: [
      "Weighted prediction engine (form, qualifying pace, circuit history) with Jest-tested maths",
      "Groq-powered chat that answers questions from live prediction data",
      "Live car data from OpenF1 and historical results from Jolpica",
    ],
    logo: "/projects/fjuan.jpg",
    tags: ["Next.js", "TypeScript", "Groq", "OpenF1", "Jest"],
    links: { code: "https://github.com/xndrncp08/FJuan", live: "https://f-juan.vercel.app" },
  },
  {
    slug: "bmr-pharmacy",
    featured: true,
    title: "BMR Pharmacy",
    kind: "Production sales tracker",
    metric: { value: "Daily", label: "production use since launch" },
    year: "2025–now",
    tagline: "Paper sales records, replaced. Used every day.",
    aside: "The project with real users, which means the project with real bug reports.",
    approach:
      "A full-stack sales tracker for a local pharmacy with live revenue dashboards, ranked product summaries and automated monthly reports. It's still in daily production use, and I own its defect triage.",
    highlights: [
      "Aggregates verified against source transactions in Postgres, not just the UI",
      "Cypress end-to-end and Jest unit tests on core dashboard flows",
      "Locally hosted Ollama assistant, tested for consistency",
    ],
    logo: "/projects/bmr.jpg",
    tags: ["React", "Express", "PostgreSQL", "Cypress", "Ollama"],
    links: { code: "https://github.com/xndrncp08/bmr-pharmacy" },
  },
  {
    slug: "yyc-track",
    title: "YYC Track",
    kind: "SAIT capstone",
    metric: { value: "CapCon", label: "presented at SAIT CapCon 2026" },
    year: "2025–26",
    tagline: "Rate the CTrain. SAIT capstone, shown at CapCon 2026.",
    aside: "Civic feedback, moderated by AI so the comments stay mostly printable.",
    approach:
      "A civic feedback platform for Calgary's CTrain built in an Agile team. I built the React/TypeScript frontend and owned a big share of the testing.",
    highlights: [
      "Cypress regression suites and Jest units, run per commit in GitHub Actions",
      "Azure AI Content Safety and sentiment analysis to moderate comments",
      "Defects triaged and tracked in Jira through sprint planning and stand-ups",
    ],
    image: "https://i.postimg.cc/1zpCSYZ0/image.png",
    tags: ["React", "TypeScript", "MongoDB", "Azure AI", "Cypress"],
    links: { code: "https://github.com/xndrncp08/yyc-track-backend" },
  },
  {
    slug: "bullscript",
    title: "BullScript",
    kind: "Market terminal",
    metric: { value: "3", label: "forecast horizons, scored vs a random walk" },
    year: "2026",
    tagline: "A market terminal that's honest about what it can't predict.",
    aside: "If a model can't beat a random walk, the UI says so. Rare honesty in finance.",
    approach:
      "Live quotes, candlestick charts, 5/14/30-day price forecasts and FinBERT news sentiment in a dense, keyboard-first workspace. Forecasts are scored against a random walk, and the UI shows when a model has no real edge.",
    highlights: [
      "XGBoost on 16 scale-free features with a purged train / calibration / holdout split",
      "Self-retraining loop that watches live skill and feature drift, then promotes new models",
      "Shrinkage-calibrated forecasts fall back to \"no change\" instead of a confident wrong call",
    ],
    logo: "/projects/bullscript.jpg",
    tags: ["Python", "FastAPI", "XGBoost", "FinBERT", "React", "TypeScript"],
    links: { code: "https://github.com/xndrncp08/Bullscript" },
  },
  {
    slug: "master-m",
    title: "Master M",
    kind: "Client website",
    metric: { value: "Live", label: "booking site for a Calgary barbershop" },
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
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Zod", "Vitest", "Playwright"],
    links: {
      code: "https://github.com/xndrncp08/Master-M_Barbershop",
      live: "https://master-m-barbershop.vercel.app",
    },
  },
  {
    slug: "wmba",
    title: "Where My Bus At?",
    kind: "Realtime transit map",
    metric: { value: "600+", label: "live buses tracked every 60s" },
    year: "2026",
    tagline: "600+ live Calgary buses. One map.",
    aside: "Answers the question every Calgarian has asked at a bus stop in January.",
    approach:
      "Ingests Calgary Transit's GTFS-realtime feed every 60 seconds and turns it into a command-centre map with heatmaps, trails and route analytics.",
    highlights: [
      "Tracks 600+ active buses across 530+ routes",
      "Haversine speeds and a rolling 25-hour vehicle history",
      "Leaflet heatmaps, 1-hour trails and Recharts trend dashboards",
    ],
    logo: "/projects/wmba.jpg",
    tags: ["Next.js", "Express", "Prisma", "Leaflet", "GTFS"],
  },
  {
    slug: "overclocked",
    title: "Overclocked",
    kind: "Telemetry pipeline",
    status: "In progress",
    metric: { value: "10k/s", label: "UDP telemetry packets, the design target" },
    year: "2026",
    tagline: "High-frequency telemetry, ingested without dropping a packet.",
    approach:
      "A real-time pipeline for high-frequency car telemetry. UDP ingestion runs on its own worker thread and hands packets to the main thread through a lock-free ring buffer, so slow processing never stalls the socket. The terminal dashboard is next.",
    highlights: [
      "SPSC ring buffer on SharedArrayBuffer + Atomics, with no copying between threads",
      "Compact 80-byte binary wire format instead of JSON",
      "RxJS sliding-window stats and anomaly detection, batch-flushed to DuckDB; Vitest per phase",
    ],
    logo: "/projects/overclocked.jpg",
    tags: ["TypeScript", "Node.js", "RxJS", "DuckDB", "Vitest"],
    links: { code: "https://github.com/xndrncp08/Overclocked" },
  },
  {
    slug: "job-hunter",
    title: "Job Hunter",
    kind: "Local-first dashboard",
    metric: { value: "0–100", label: "match score from 4 weighted signals" },
    year: "2026",
    tagline: "My job search, ranked against my own resume.",
    aside: "Yes, I automated the job hunt. No, it doesn't apply for me. I have some dignity.",
    approach:
      "A local-first dashboard that searches job boards on a schedule, scores each posting against an uploaded resume and tracks applications. Everything runs on my machine; the score is labelled as an estimate for triage.",
    highlights: [
      "Local embeddings (all-MiniLM-L6-v2) in ChromaDB for semantic similarity",
      "Score blends similarity, skill overlap, seniority and location fit",
      "Optional Claude-powered resume tailoring per posting",
    ],
    logo: "/projects/jobhunter.jpg",
    tags: ["Python", "FastAPI", "React", "SQLite", "ChromaDB", "Embeddings"],
    links: { code: "https://github.com/xndrncp08/Jab-Hant" },
  },
  {
    slug: "chrono-breakers",
    title: "Chrono Breakers",
    kind: "Multiplayer game",
    status: "In progress",
    metric: { value: "215", label: "offline gameplay tests, 0 failing" },
    year: "2026",
    tagline: "1 Time-Keeper vs 4 Infiltrators. A Roblox survival-horror heist.",
    approach:
      "An asymmetrical multiplayer game: Infiltrators hack terminals, break chases and rescue each other before the Temporal Collapse, while the Time-Keeper hunts them. Server-authoritative, with every gameplay rule in a pure core that never touches Roblox instances. Not published yet.",
    highlights: [
      "Strict-typed Luau with no third-party runtime dependencies",
      "Pure rules core takes time as an argument, so every rule runs under Lune tests offline",
      "Rate-limited, validated remotes and idempotent reward payouts",
    ],
    logo: "/projects/chronobreakers.jpg",
    tags: ["Luau", "Roblox", "Rojo", "Lune"],
    links: { code: "https://github.com/xndrncp08/chrono-breakers" },
  },
  {
    slug: "apex-f1",
    title: "Apex F1",
    kind: "ML web layer",
    metric: { value: "ML", label: "win and podium probabilities" },
    year: "2026",
    tagline: "Win and podium odds from a trained model.",
    approach:
      "The full web layer around a Python-trained race prediction model: schema, REST API and a React UI showing probabilities next to historical accuracy.",
    highlights: [
      "API tested against incomplete, delayed and malformed inputs",
      "Degrades predictably instead of failing silently",
    ],
    logo: "/projects/apexf1.jpg",
    tags: ["Python", "Next.js", "Express", "Supabase"],
    links: { code: "https://github.com/xndrncp08/ApexF1" },
  },
  {
    slug: "basketbol",
    title: "Basketbol",
    kind: "Sports data hub",
    metric: { value: "2 → 1", label: "APIs normalised into one layer" },
    year: "2025",
    tagline: "NBA games, teams and players, cleanly.",
    approach: "Normalised the ESPN and BallDontLie APIs into a single data layer for a responsive NBA hub.",
    image: "https://i.postimg.cc/cL8LRwdT/image.png",
    tags: ["Next.js", "ESPN API"],
    links: {
      code: "https://github.com/xndrncp08/cprg306_basketbol",
      live: "https://cprg306-basketbol.vercel.app",
    },
  },
  {
    slug: "nv-closet",
    title: "NV Closet",
    kind: "UI/UX prototype",
    metric: { value: "Hi-fi", label: "prototype from user flows up" },
    year: "2025",
    tagline: "A wardrobe app that dresses you.",
    approach:
      "A digital wardrobe with AI outfit recommendations. Started from user flows, explored several layouts, and landed on a high-fidelity prototype.",
    image: "https://i.postimg.cc/Kj2kF8ML/NV.png",
    tags: ["Figma", "Prototyping"],
  },
  {
    slug: "fitzone",
    title: "FitZone",
    kind: "Team project",
    metric: { value: "Lead", label: "ran a small dev team" },
    year: "2024",
    tagline: "Gym management, on desktop and mobile.",
    approach:
      "Led a small team building auth, memberships and scheduling in C# with .NET MAUI Blazor Hybrid, on a MariaDB schema I designed.",
    highlights: ["One codebase for mobile and desktop", "Took it from setup to a working demo"],
    logo: "/projects/fitzone.jpg",
    tags: ["C#", ".NET MAUI", "MariaDB"],
  },
];

// About: short paragraphs in my own voice.
export const story = [
  {
    title: "Where I started",
    body: "Manila: heat, humidity, and traffic with its own weather system. My first real taste of building things was a 2022 internship there, programming Arduino circuits for a greenhouse automation prototype. It won an innovation award, which I bring up only every time it's relevant. And sometimes when it isn't.",
  },
  {
    title: "Then, Calgary",
    body: "I moved to Calgary to study Software Development at SAIT (2024–2026) and traded 33°C for −33°C. Nobody warns you a city can be sunny and hostile at the same time. I graduated with a 3.61 GPA and a deep respect for block heaters.",
  },
  {
    title: "How I work",
    body: "I hold a problem in my head longer than is probably healthy. Not stuck, thinking. Then I build it, come back a week later and immediately see five things I'd change. I've made peace with that. The cringe is the compass: it means I'm getting better.",
  },
];

// Beyond the code. Kept short and true; nothing here is a stat I can't back up.
export const interests = [
  {
    title: "Running",
    note: "Cardio, but make it debugging",
    body: "The only time I voluntarily go in circles. Long runs are where half-formed ideas finally settle. A worrying number of my bugs have been solved somewhere around kilometre four.",
  },
  {
    title: "Sports",
    note: "Competitive, emotionally",
    body: "Grew up playing, still do, and watch far more than I'll admit. Formula 1 is directly responsible for at least two projects on this page, so technically it's professional development.",
  },
  {
    title: "Music",
    note: "Genre loyalty: none",
    body: "Something is always playing. The queue can go from slow R&B to something with a breakdown in three songs, and I refuse to explain myself.",
  },
  {
    title: "Guitar & bass",
    note: "Four strings and six",
    body: "Bass taught me to sit in the pocket and make everyone else sound good. Electric guitar sent me chasing tones, and that chase is why Resoniq exists.",
  },
];

// Chronological path. Dates only where they're known — the move to Canada has
// no exact date on purpose.
export const path = [
  {
    date: "2022",
    place: "Makati, Metro Manila",
    title: "Immersion intern, First Eduspec Inc.",
    detail:
      "Programmed 15+ Arduino circuits in ROBOTC and co-built a greenhouse automation prototype through the full development cycle, presented to an evaluation panel and awarded for innovation.",
    kind: "work",
  },
  {
    date: "Then",
    place: "Manila → Calgary",
    title: "Moved to Canada",
    detail: "Left the Philippines to study software development in Calgary. Bought my first real winter jacket. Then a second one.",
    kind: "move",
  },
  {
    date: "2024",
    place: "Calgary",
    title: "Started Software Development at SAIT",
    detail: "Led a small team on FitZone, a .NET MAUI Blazor gym system.",
    kind: "school",
  },
  {
    date: "2025",
    place: "Calgary",
    title: "Cloud, security and load testing",
    detail: "Azure coursework with JMeter, Terraform and API Management. YYC Track capstone kicked off in September.",
    kind: "school",
  },
  {
    date: "Nov 2025",
    place: "Calgary",
    title: "BMR Pharmacy goes live",
    detail: "Replaced paper sales records for a local pharmacy. Still in daily use, and I still answer when it misbehaves.",
    kind: "work",
  },
  {
    date: "Apr 2026",
    place: "Calgary",
    title: "YYC Track at SAIT CapCon",
    detail: "Presented the capstone, deployed on Azure.",
    kind: "school",
  },
  {
    date: "2026",
    place: "Calgary",
    title: "Graduated from SAIT",
    detail: "Diploma in Software Development, 3.61 GPA. Photographic evidence below.",
    kind: "school",
  },
  {
    date: "2026",
    place: "Calgary",
    title: "Building in the open",
    detail: "Resoniq, BullScript, Overclocked, a live booking site for Master M Barbershop, and Diskarte — in progress now.",
    kind: "work",
  },
];

export const experience = [
  {
    title: "Developer & production maintainer",
    org: "BMR Pharmacy",
    place: "Calgary",
    period: "2025 – now",
    detail:
      "Built and still run the pharmacy's sales tracker — triaging user-reported defects, isolating root causes and verifying fixes before release.",
  },
  {
    title: "Immersion intern",
    org: "First Eduspec Inc.",
    place: "Makati, Metro Manila",
    period: "2022",
    detail:
      "Programmed 15+ Arduino circuits and co-built a greenhouse automation prototype that won an innovation award.",
  },
];

export const education = [
  {
    title: "Diploma, Software Development",
    org: "SAIT",
    place: "Calgary",
    period: "2024 – 2026",
    detail:
      "3.61 GPA. Software security, object-oriented programming in Python, C# and Java, web development, databases and cloud computing on Azure.",
  },
];

export const skills = [
  {
    group: "Building interfaces",
    note: "Where most of my projects start, and where most of my opinions live.",
    items: ["TypeScript", "React", "Next.js", "Vite", "Tailwind CSS", "Recharts", "Leaflet"],
  },
  {
    group: "Services & data",
    note: "APIs, schemas and the boring parts that must never, ever break.",
    items: ["Node.js", "Express", "Python", "FastAPI", "Prisma", "PostgreSQL", "Supabase", "MongoDB", "MariaDB"],
  },
  {
    group: "Testing & quality",
    note: "Unit, end-to-end, load and accessibility. I like a green pipeline the way some people like a clean kitchen.",
    items: ["Vitest", "Jest", "Cypress", "Playwright", "JMeter", "GitHub Actions"],
  },
  {
    group: "AI & signal",
    note: "Used where it earns its place. Labelled honestly when it doesn't.",
    items: ["Anthropic API", "Groq", "Ollama", "Librosa", "XGBoost", "Embeddings"],
  },
  {
    group: "Cloud & tooling",
    note: "Shipping it, then keeping it shipped.",
    items: ["Azure", "Docker", "Terraform", "Vercel", "Git", "Jira", "Figma"],
  },
  {
    group: "Also fluent in",
    note: "From coursework, team projects and one Roblox game I take very seriously.",
    items: ["C#", ".NET MAUI", "Java", "SQL", "Luau"],
  },
];
