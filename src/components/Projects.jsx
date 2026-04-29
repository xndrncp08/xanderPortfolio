"use client";
import { useRef, useState, useEffect, useCallback } from "react";

const PROJECTS = [
  {
    title: "F1Dash",
    tech: "Next.js + TypeScript",
    tagline: "Live F1 analytics — driver stats, race calendars, lap telemetry.",
    approach:
      "Pulled OpenF1 + Jolpica API data into a real-time dashboard with smart caching and a season selector.",
    image: "https://i.postimg.cc/RFx66GfX/image.png",
    tags: ["React", "Next.js", "TypeScript", "OpenF1 API"],
    accent: "#E10600",
    word: "VROOM!",
  },
  {
    title: "Apex F1",
    tech: "Next.js + Python ML",
    tagline:
      "ML-powered race forecasts with interactive historical dashboards.",
    approach:
      "Machine learning models trained on historical telemetry, served via a Next.js frontend with Supabase.",
    image: "https://i.postimg.cc/Y0tqJ2sF/image.png",
    tags: ["Next.js", "TypeScript", "Supabase", "Machine Learning"],
    accent: "#FF3A2D",
    word: "PREDICT!",
  },
  {
    title: "BMR Pharmacy",
    tech: "React + Express",
    tagline: "Full-stack pharmacy sales tracker with live revenue dashboards.",
    approach:
      "Built a Supabase-backed REST API with a live React dashboard and real-time search.",
    image: "https://i.postimg.cc/7LbzW9TW/image.png",
    tags: ["React", "Node.js", "Express", "Supabase"],
    accent: "#3ECF8E",
    word: "SHIPPED!",
  },
  {
    title: "WMBA?",
    tech: "Next.js + PostgreSQL",
    tagline: "Real-time Calgary bus tracker with live GTFS feeds and heatmaps.",
    approach:
      "Parsed live GTFS feeds into Prisma, rendered via Leaflet map layers with speed trails and route analytics.",
    image: "https://i.postimg.cc/TPgZcMn1/WMBA.png",
    tags: ["Next.js", "Prisma", "Leaflet", "GTFS"],
    accent: "#4479A1",
    word: "TRANSIT!",
  },
  {
    title: "Basketbol",
    tech: "Next.js",
    tagline: "NBA games, teams and player stats in one clean interface.",
    approach:
      "Normalised ESPN + BallDontLie APIs into a single clean data layer for a responsive NBA hub.",
    image: "https://i.postimg.cc/cL8LRwdT/image.png",
    tags: ["React", "Next.js", "ESPN API", "BallDontLie API"],
    accent: "#F7931A",
    word: "SWISH!",
  },
  {
    title: "YYC Track",
    tech: "MERN Stack",
    tagline: "Transit app for Calgary riders with a Commuter Experience Index.",
    approach:
      "MERN stack with station data, user ratings, and a custom CEI scoring system with map interface.",
    image: "https://i.postimg.cc/1zpCSYZ0/image.png",
    tags: ["React", "Node.js", "MongoDB", "Express"],
    accent: "#68A063",
    word: "BOARD!",
  },
  {
    title: "Gym System",
    tech: ".NET MAUI Blazor",
    tagline:
      "Cross-platform gym management with auth, memberships, scheduling.",
    approach:
      "Built in .NET MAUI Blazor for cross-platform reach with clean OOP architecture. Runs on mobile and desktop.",
    image: "https://i.postimg.cc/t4trHsnd/FitZone.png",
    tags: ["C#", ".NET MAUI Blazor", "MariaDB"],
    accent: "#9B59B6",
    word: "REP IT!",
  },
  {
    title: "NV Closet",
    tech: "Figma · UI/UX",
    tagline: "Digital wardrobe app with AI outfit recommendations.",
    approach:
      "Focused on user flows first, prototyped multiple layout variations. High-fidelity prototype with intuitive UX.",
    image: "https://i.postimg.cc/Kj2kF8ML/NV.png",
    tags: ["Figma", "UI/UX", "Prototyping"],
    accent: "#F472B6",
    word: "STYLE!",
  },
  {
    title: "Punch Music",
    tech: "React Native",
    tagline:
      "Music discovery with Spotify integration and swipe gesture controls.",
    approach:
      "Swipe-based gesture navigation with Spotify OAuth and Supabase playlists. Tinder-for-music on mobile.",
    image:
      "https://images.unsplash.com/photo-1614680376593-902f74cf0d41?w=800&q=80",
    tags: ["React Native", "Supabase", "Spotify API"],
    accent: "#1DB954",
    word: "PLAY!",
  },
];

function hexToRgb(hex) {
  const r = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return r
    ? `${parseInt(r[1], 16)},${parseInt(r[2], 16)},${parseInt(r[3], 16)}`
    : "225,6,0";
}

function matches(p, filter) {
  if (!filter) return true;
  const kw = filter
    .toLowerCase()
    .replace(/ \/ .+/, "")
    .trim();
  return (
    p.tags.some((t) => t.toLowerCase().includes(kw)) ||
    p.tech.toLowerCase().includes(kw) ||
    (kw === "react" &&
      (p.tags.some((t) => t.toLowerCase().includes("react")) ||
        p.tech.toLowerCase().includes("react")))
  );
}

function ProjectPanel({ project: p, index, filterSkill }) {
  const [hovering, setHovering] = useState(false);
  const rgb = hexToRgb(p.accent);
  const matched = matches(p, filterSkill);

  return (
    <div
      className="project-panel"
      style={{
        animationDelay: `${index * 50}ms`,
        opacity: !matched && filterSkill ? 0.18 : 1,
        pointerEvents: !matched && filterSkill ? "none" : "all",
        filter: !matched && filterSkill ? "grayscale(0.9)" : "none",
        transition: "opacity 0.3s, filter 0.3s",
        "--accent": p.accent,
        "--accent-rgb": rgb,
      }}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <img
        src={p.image}
        alt={p.title}
        className="project-img"
        draggable={false}
      />
      <div className="project-overlay" />

      {/* Accent corner lines */}
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: 80,
          height: 3,
          background: `linear-gradient(90deg, transparent, ${p.accent})`,
          zIndex: 5,
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: 3,
          height: 80,
          background: `linear-gradient(180deg, ${p.accent}, transparent)`,
          zIndex: 5,
        }}
      />

      {/* Action word on hover */}
      {hovering && (
        <div
          style={{
            position: "absolute",
            top: 18,
            left: 18,
            zIndex: 10,
            fontFamily: "var(--font-comic)",
            fontSize: 30,
            letterSpacing: "0.04em",
            color: p.accent,
            WebkitTextStroke: "2px rgba(5,5,14,0.8)",
            paintOrder: "stroke fill",
            textShadow: `4px 4px 0 rgba(5,5,14,0.6)`,
            transform: "rotate(-6deg)",
            animation: "pop-in 0.3s cubic-bezier(0.16,1,0.3,1) both",
          }}
        >
          {p.word}
        </div>
      )}

      <div
        className={`project-content${hovering ? " project-content-hover" : ""}`}
      >
        {/* Tech badge */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            background: `rgba(${rgb}, 0.2)`,
            border: `1.5px solid rgba(${rgb}, 0.5)`,
            padding: "4px 10px",
            marginBottom: 8,
            fontFamily: "var(--font-comic)",
            fontSize: 11,
            letterSpacing: "0.12em",
            color: p.accent,
            transition: "transform 0.25s ease",
            transform: hovering ? "translateY(-2px)" : "none",
          }}
        >
          {p.tech}
        </div>

        {/* Title */}
        <h3
          style={{
            fontFamily: "var(--font-comic)",
            fontSize: "clamp(1.8rem, 3vw, 2.4rem)",
            letterSpacing: "0.04em",
            color: "white",
            margin: "0 0 8px",
            lineHeight: 1,
            transition: "transform 0.25s ease",
            transform: hovering ? "translateY(-3px)" : "none",
          }}
        >
          {p.title}
        </h3>

        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 12.5,
            lineHeight: 1.6,
            color: "rgba(255,255,255,0.58)",
            margin: "0 0 12px",
            maxWidth: 320,
          }}
        >
          {hovering ? p.approach : p.tagline}
        </p>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
          {p.tags.map((t) => (
            <span
              key={t}
              style={{
                fontFamily: "var(--font-label)",
                fontSize: 9.5,
                fontWeight: 700,
                letterSpacing: "0.07em",
                padding: "3px 9px",
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.11)",
                color: "rgba(255,255,255,0.45)",
                textTransform: "uppercase",
              }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ComicProjects() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const [vis, setVis] = useState(false);
  const [idx, setIdx] = useState(0);
  const [filter, setFilter] = useState(null);
  const isDrag = useRef(false);
  const dragX = useRef(0);
  const scrollX = useRef(0);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setVis(true);
      },
      { threshold: 0.04 },
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    const handleFilter = (e) => setFilter(e.detail.skill);
    window.addEventListener("skill-filter", handleFilter);
    return () => {
      obs.disconnect();
      window.removeEventListener("skill-filter", handleFilter);
    };
  }, []);

  const panelWidth = useCallback(() => {
    const el = trackRef.current?.querySelector(".project-panel");
    return el ? el.offsetWidth + 18 : 0;
  }, []);

  const scrollTo = useCallback(
    (n) => {
      const clamped = Math.max(0, Math.min(n, PROJECTS.length - 1));
      setIdx(clamped);
      trackRef.current?.scrollTo({
        left: clamped * panelWidth(),
        behavior: "smooth",
      });
    },
    [panelWidth],
  );

  const onMD = (e) => {
    isDrag.current = true;
    dragX.current = e.pageX;
    scrollX.current = trackRef.current.scrollLeft;
  };
  const onMM = (e) => {
    if (!isDrag.current) return;
    e.preventDefault();
    trackRef.current.scrollLeft = scrollX.current - (e.pageX - dragX.current);
  };
  const onMU = () => {
    if (!isDrag.current) return;
    isDrag.current = false;
    const pw = panelWidth();
    if (pw) setIdx(Math.round(trackRef.current.scrollLeft / pw));
  };

  const visibleCount = filter
    ? PROJECTS.filter((p) => matches(p, filter)).length
    : PROJECTS.length;

  return (
    <>
      <style>{`
        .projects-section {
          position: relative;
          min-height: 100vh;
          padding: clamp(72px, 10vw, 110px) clamp(20px, 5vw, 64px) clamp(56px, 7vw, 88px);
          background: var(--paper);
          overflow: hidden;
          display: flex; flex-direction: column; justify-content: center;
        }
        .projects-section::before {
          content: ''; position: absolute; inset: 0; pointer-events: none;
          background: repeating-linear-gradient(
            45deg, transparent 0px, transparent 18px,
            rgba(0,0,0,0.014) 18px, rgba(0,0,0,0.014) 19px
          );
        }

        .projects-inner { max-width: 1240px; margin: 0 auto; position: relative; z-index: 1; width: 100%; }

        .projects-header {
          display: grid;
          grid-template-columns: 1fr auto;
          align-items: flex-end;
          gap: 20px;
          margin-bottom: clamp(22px, 3.5vw, 40px);
        }
        @media (max-width: 640px) {
          .projects-header { grid-template-columns: 1fr; }
          .projects-nav-controls { display: none !important; }
        }

        .projects-chapter {
          font-family: var(--font-comic);
          font-size: clamp(3.5rem, 9vw, 8rem);
          letter-spacing: 0.03em; line-height: 0.88;
          color: var(--ink); margin: 0 0 8px;
        }
        .projects-chapter span { color: var(--red); }

        /* Scrollable track */
        .project-track {
          display: flex; gap: 18px;
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none;
          scroll-behavior: smooth;
          cursor: none; user-select: none;
          padding-bottom: 4px;
        }
        .project-track::-webkit-scrollbar { display: none; }

        /* Project panel — comic cover */
        .project-panel {
          flex: 0 0 clamp(280px, 60vw, 620px);
          height: clamp(360px, 46vw, 500px);
          border: var(--border-med);
          box-shadow: var(--panel-shadow);
          scroll-snap-align: start;
          position: relative; overflow: hidden;
          animation: panel-reveal 0.55s cubic-bezier(0.16,1,0.3,1) both;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          background: var(--ink); flex-shrink: 0;
        }
        .project-panel:hover {
          transform: translate(-3px, -3px);
          box-shadow: 8px 8px 0 var(--fg);
        }
        @media (max-width: 640px) {
          .project-panel { flex: 0 0 calc(100vw - 40px); height: 400px; }
        }

        .project-img {
          position: absolute; inset: 0;
          width: 100%; height: 100%;
          object-fit: cover;
          transition: transform 0.7s ease; z-index: 0;
        }
        .project-panel:hover .project-img { transform: scale(1.04); }

        .project-overlay {
          position: absolute; inset: 0; z-index: 2; pointer-events: none;
          background: linear-gradient(to bottom, rgba(0,0,0,0.06) 0%, rgba(5,5,14,0.55) 55%, rgba(5,5,14,0.97) 100%);
        }

        .project-content {
          position: absolute; inset: 0; z-index: 4;
          display: flex; flex-direction: column; justify-content: flex-end;
          padding: 22px;
          transition: all 0.3s ease;
        }

        /* Nav buttons */
        .nav-btn {
          width: 40px; height: 40px;
          border: var(--border-med);
          box-shadow: var(--panel-shadow-sm);
          display: flex; align-items: center; justify-content: center;
          cursor: none; background: var(--paper);
          color: var(--ink); font-size: 15px;
          transition: all 0.15s ease;
        }
        .nav-btn:hover:not(:disabled) {
          background: var(--yellow);
          transform: translate(-2px, -2px);
          box-shadow: 5px 5px 0 var(--fg);
        }
        .nav-btn:disabled { opacity: 0.18; cursor: none; }

        /* Progress dots */
        .progress-dot {
          height: 3px; border-radius: 2px;
          cursor: none;
          transition: all 0.3s cubic-bezier(0.34,1.56,0.64,1);
        }

        /* Filter bar */
        .filter-bar {
          margin-top: 18px; display: flex; align-items: center; gap: 14px;
          padding: 13px 20px;
          background: rgba(225,6,0,0.04);
          border: 2px solid rgba(225,6,0,0.18);
          box-shadow: 3px 3px 0 rgba(225,6,0,0.12);
          animation: slide-up 0.4s ease both;
        }
      `}</style>

      <section id="projects" className="projects-section" ref={sectionRef}>
        <div className="projects-inner">
          {/* Header */}
          <div className="projects-header">
            <div>
              <div
                className="chapter-bar"
                style={{ animation: vis ? "slide-up 0.6s ease both" : "none" }}
              >
                <div className="chapter-label">
                  {filter ? `Filtered · ${filter}` : "Chapter 03"}
                </div>
              </div>
              <h2
                className="projects-chapter"
                style={{
                  animation: vis ? "slide-up 0.7s ease 0.08s both" : "none",
                }}
              >
                Case
                <br />
                <span>Files</span>
              </h2>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 13,
                  color: "var(--muted)",
                  animation: vis ? "slide-up 0.6s ease 0.14s both" : "none",
                }}
              >
                {filter
                  ? `${visibleCount} project${visibleCount !== 1 ? "s" : ""} using ${filter}`
                  : `${PROJECTS.length} projects — full-stack, mobile & design`}
              </p>
            </div>

            {/* Nav controls */}
            <div
              className="projects-nav-controls"
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 10,
                alignItems: "flex-end",
              }}
            >
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <span
                  style={{
                    fontFamily: "var(--font-comic)",
                    fontSize: 22,
                    color: "var(--ink)",
                    letterSpacing: "0.04em",
                    minWidth: 60,
                    textAlign: "right",
                  }}
                >
                  {String(idx + 1).padStart(2, "0")}
                  <span style={{ color: "var(--muted2)", opacity: 0.5 }}>
                    /{String(PROJECTS.length).padStart(2, "0")}
                  </span>
                </span>
                <button
                  className="nav-btn"
                  onClick={() => scrollTo(idx - 1)}
                  disabled={idx === 0}
                >
                  <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
                    <path
                      d="M4.5 1L1 5l3.5 4M1 5h10"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
                <button
                  className="nav-btn"
                  onClick={() => scrollTo(idx + 1)}
                  disabled={idx === PROJECTS.length - 1}
                >
                  <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
                    <path
                      d="M7.5 1L11 5l-3.5 4M11 5H1"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
              </div>
              {/* Dot strip */}
              <div style={{ display: "flex", gap: 5, alignItems: "center" }}>
                {PROJECTS.map((_, i) => (
                  <div
                    key={i}
                    className="progress-dot"
                    onClick={() => scrollTo(i)}
                    style={{
                      width: i === idx ? 20 : 6,
                      background: i === idx ? "var(--red)" : "rgba(0,0,0,0.15)",
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Track */}
          <div
            ref={trackRef}
            className="project-track"
            onMouseDown={onMD}
            onMouseMove={onMM}
            onMouseUp={onMU}
            onMouseLeave={onMU}
          >
            {PROJECTS.map((p, i) => (
              <ProjectPanel
                key={p.title}
                project={p}
                index={i}
                filterSkill={filter}
              />
            ))}
          </div>

          {/* Active filter bar */}
          {filter && (
            <div className="filter-bar">
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: "var(--red)",
                  display: "inline-block",
                  boxShadow: "0 0 6px var(--red)",
                  flexShrink: 0,
                }}
              />
              <span
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 13,
                  color: "var(--muted)",
                  flex: 1,
                }}
              >
                Filtered by{" "}
                <strong style={{ color: "var(--fg)" }}>{filter}</strong>
              </span>
              <button
                onClick={() => {
                  setFilter(null);
                  window.dispatchEvent(
                    new CustomEvent("skill-filter", {
                      detail: { skill: null },
                    }),
                  );
                }}
                className="btn-comic"
                style={{ fontSize: 13, padding: "6px 14px", cursor: "none" }}
              >
                Clear ×
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
