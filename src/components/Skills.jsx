"use client";
import { useState, useEffect, useRef } from "react";

const SKILLS = [
  {
    name: "JavaScript",
    icon: "bx bxl-javascript",
    color: "#F7DF1E",
    cat: "Languages",
  },
  {
    name: "TypeScript",
    icon: "bx bxl-typescript",
    color: "#3178C6",
    cat: "Languages",
  },
  { name: "Python", icon: "bx bxl-python", color: "#3776AB", cat: "Languages" },
  { name: "Java", icon: "bx bxl-java", color: "#F89820", cat: "Languages" },
  {
    name: "C#",
    icon: "devicon-csharp-plain",
    color: "#9B59B6",
    cat: "Languages",
  },

  {
    name: "React / React Native",
    icon: "bx bxl-react",
    color: "#61DAFB",
    cat: "Frontend",
  },
  { name: "Vue.js", icon: "bx bxl-vuejs", color: "#42B883", cat: "Frontend" },
  { name: "Next.js", icon: "bx bxl-nodejs", color: "#000000", cat: "Frontend" },
  {
    name: "Tailwind CSS",
    icon: "bx bxl-html5",
    color: "#38BDF8",
    cat: "Frontend",
  },

  {
    name: "Node.js / Express",
    icon: "bx bxl-nodejs",
    color: "#68A063",
    cat: "Backend",
  },
  {
    name: ".NET / Blazor",
    icon: "devicon-dotnetcore-plain",
    color: "#512BD4",
    cat: "Backend",
  },

  { name: "MongoDB", icon: "bx bxl-mongodb", color: "#47A248", cat: "Data" },
  { name: "MySQL", icon: "bx bxs-data", color: "#4479A1", cat: "Data" },
  { name: "Supabase", icon: "bx bx-cloud", color: "#3ECF8E", cat: "Data" },
  { name: "PostgreSQL", icon: "bx bxs-data", color: "#336791", cat: "Data" },

  { name: "Git", icon: "bx bxl-git", color: "#F05032", cat: "Tooling" },
  { name: "Docker", icon: "bx bxl-docker", color: "#2496ED", cat: "Tooling" },
  { name: "Figma", icon: "bx bxl-figma", color: "#F24E1E", cat: "Tooling" },
];

const CATS = ["Languages", "Frontend", "Backend", "Data", "Tooling"];

function hexToRgb(hex) {
  const r = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return r
    ? `${parseInt(r[1], 16)},${parseInt(r[2], 16)},${parseInt(r[3], 16)}`
    : "245,200,0";
}

function SkillChip({ skill, active, hovered, onHover, onClick, idx }) {
  const rgb = hexToRgb(skill.color);
  const isOn = active || hovered;
  return (
    <button
      className="skill-chip"
      style={{
        background: isOn ? `rgba(${rgb}, 0.12)` : "rgba(0,0,0,0.03)",
        borderColor: active
          ? `rgba(${rgb}, 0.7)`
          : isOn
            ? `rgba(${rgb}, 0.45)`
            : "rgba(0,0,0,0.13)",
        color: isOn ? skill.color : "#555",
        boxShadow: active
          ? `3px 3px 0 rgba(${rgb}, 0.4)`
          : isOn
            ? `2px 2px 0 rgba(${rgb},0.22)`
            : "2px 2px 0 rgba(0,0,0,0.07)",
        transform: isOn ? "translate(-1px, -1px)" : "none",
        animation: `pop-in 0.35s cubic-bezier(0.16,1,0.3,1) ${idx * 28}ms both`,
      }}
      onMouseEnter={onHover}
      onMouseLeave={() => onHover(null)}
      onClick={onClick}
    >
      <i
        className={`skill-chip-icon ${skill.icon}`}
        style={{
          color: isOn ? skill.color : "#888",
          filter: isOn ? `drop-shadow(0 0 4px rgba(${rgb},0.5))` : "none",
        }}
      />
      {skill.name}
      {active && (
        <span style={{ fontSize: 8, opacity: 0.7, marginLeft: 2 }}>✓</span>
      )}
    </button>
  );
}

function CategoryPanel({
  cat,
  skills,
  active,
  hovered,
  onHover,
  onToggle,
  visible,
  panelIdx,
}) {
  return (
    <div
      className="cat-panel"
      style={{
        animation: visible
          ? `slide-up 0.5s ease ${panelIdx * 75}ms both`
          : "none",
      }}
    >
      <div
        className="caption"
        style={{
          position: "absolute",
          top: -2,
          left: -2,
          fontSize: 10,
          zIndex: 2,
        }}
      >
        {cat}
      </div>
      <div
        style={{ display: "flex", flexWrap: "wrap", gap: 8, paddingTop: 10 }}
      >
        {skills.map((skill, i) => (
          <SkillChip
            key={skill.name}
            skill={skill}
            active={active === skill.name}
            hovered={hovered === skill.name}
            onHover={(v) => onHover(v ? skill.name : null)}
            onClick={() => onToggle(skill)}
            idx={i}
          />
        ))}
      </div>
    </div>
  );
}

export default function ComicSkills() {
  const sectionRef = useRef(null);
  const [vis, setVis] = useState(false);
  const [hovered, setHov] = useState(null);
  const [active, setActive] = useState(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setVis(true);
      },
      { threshold: 0.05 },
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  const handleToggle = (skill) => {
    const next = active === skill.name ? null : skill.name;
    setActive(next);
    window.dispatchEvent(
      new CustomEvent("skill-filter", { detail: { skill: next } }),
    );
    if (next) {
      setTimeout(() => {
        document
          .getElementById("projects")
          ?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 120);
    }
  };

  return (
    <>
      <style>{`
        .skills-section {
          position: relative;
          min-height: 100vh;
          padding: clamp(72px, 10vw, 110px) clamp(20px, 5vw, 64px) clamp(56px, 7vw, 88px);
          background: var(--ink);
          overflow: hidden;
          display: flex; flex-direction: column; justify-content: center;
        }
        .skills-section::before {
          content: ''; position: absolute; inset: 0; pointer-events: none;
          background-image: radial-gradient(circle, rgba(248,244,232,0.05) 1px, transparent 1px);
          background-size: 12px 12px;
        }

        /* Arc reactor — Iron Man decoration, bottom right */
        .skills-arc {
          position: absolute; bottom: -100px; right: -100px;
          width: 380px; height: 380px;
          opacity: 0.08; z-index: 0; pointer-events: none;
          animation: reactor-pulse 5s ease-in-out infinite;
        }

        /* Spider web — top right corner */
        .skills-web {
          position: absolute; top: 0; right: 0;
          width: 160px; height: 160px;
          opacity: 0.05; z-index: 0; pointer-events: none;
        }

        .skills-inner { max-width: 1240px; margin: 0 auto; position: relative; z-index: 1; width: 100%; }

        .skills-layout {
          display: grid;
          grid-template-columns: 1fr 2.2fr;
          gap: clamp(32px, 5vw, 72px);
          align-items: start;
        }
        @media (max-width: 860px) { .skills-layout { grid-template-columns: 1fr; } }

        .skills-left { position: sticky; top: 90px; }
        @media (max-width: 860px) { .skills-left { position: static; } }

        .skills-chapter {
          font-family: var(--font-comic);
          font-size: clamp(3.5rem, 9vw, 8rem);
          letter-spacing: 0.03em; line-height: 0.88;
          color: var(--paper); margin: 0 0 18px;
        }
        .skills-chapter span { color: var(--yellow); }

        /* Stat row */
        .skill-counts {
          display: flex; gap: 0;
          border: 2px solid rgba(248,244,232,0.1);
          margin: 22px 0; overflow: hidden;
        }
        .skill-count-item {
          flex: 1; padding: 14px 0; text-align: center;
          border-right: 1px solid rgba(248,244,232,0.07);
        }
        .skill-count-item:last-child { border-right: none; }

        /* Category panels */
        .cats-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0;
        }
        @media (max-width: 500px) { .cats-grid { grid-template-columns: 1fr; } }

        .cat-panel {
          background: var(--paper);
          border: var(--border-med);
          padding: 18px 16px 22px;
          position: relative; overflow: hidden;
          margin: -2px;
          transition: background 0.15s ease;
        }
        .cat-panel:hover { background: #fffef5; }

        /* Skill chip */
        .skill-chip {
          display: inline-flex; align-items: center; gap: 7px;
          padding: 8px 12px;
          font-family: var(--font-label); font-size: 12px; font-weight: 600;
          letter-spacing: 0.02em;
          border: 2px solid; cursor: none;
          transition: all 0.15s ease;
          background: none; text-align: left;
        }
        .skill-chip-icon { font-size: 14px; flex-shrink: 0; }

        /* Active filter pill */
        .filter-pill {
          display: flex; align-items: center; gap: 10px;
          background: rgba(245,200,0,0.1);
          border: 2px solid var(--yellow);
          box-shadow: 2px 2px 0 var(--yellow);
          padding: 10px 16px; margin-top: 14px;
          animation: pop-in 0.3s ease both;
        }

        /* "Next arc" teaser panel */
        .next-arc-panel {
          background: rgba(245,200,0,0.025);
          display: flex; flex-direction: column;
          justify-content: center; align-items: center;
          min-height: 100px;
        }
      `}</style>

      <section id="skills" className="skills-section" ref={sectionRef}>
        {/* Iron Man arc reactor */}
        <svg
          viewBox="0 0 300 300"
          fill="none"
          className="skills-arc"
          style={{
            position: "absolute",
            bottom: -100,
            right: -100,
            width: 380,
            height: 380,
            zIndex: 0,
            pointerEvents: "none",
            opacity: 0.1,
          }}
        >
          <circle
            cx="150"
            cy="150"
            r="140"
            stroke="rgba(30,200,255,1)"
            strokeWidth="1.5"
          />
          <circle
            cx="150"
            cy="150"
            r="110"
            stroke="rgba(30,200,255,1)"
            strokeWidth="1"
          />
          <circle
            cx="150"
            cy="150"
            r="75"
            stroke="rgba(30,200,255,1)"
            strokeWidth="1"
          />
          <circle
            cx="150"
            cy="150"
            r="38"
            stroke="rgba(30,200,255,1)"
            strokeWidth="1.5"
          />
          <circle
            cx="150"
            cy="150"
            r="14"
            fill="rgba(30,200,255,0.15)"
            stroke="rgba(30,200,255,0.5)"
            strokeWidth="1.5"
          />
        </svg>

        {/* Spider-Man web */}
        <svg
          viewBox="0 0 200 200"
          fill="none"
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: 160,
            height: 160,
            opacity: 0.07,
            zIndex: 0,
            pointerEvents: "none",
          }}
        >
          {[90, 70, 50, 30].map((r) => (
            <circle
              key={r}
              cx="100"
              cy="0"
              r={r}
              stroke="white"
              strokeWidth="0.8"
            />
          ))}
          {[0, 45, 90, 135].map((deg, i) => {
            const rad = (deg * Math.PI) / 180;
            return (
              <line
                key={i}
                x1={100 + 5 * Math.cos(rad)}
                y1={5 * Math.sin(rad)}
                x2={100 + 95 * Math.cos(rad)}
                y2={95 * Math.sin(rad)}
                stroke="white"
                strokeWidth="0.7"
              />
            );
          })}
        </svg>

        <div className="skills-inner">
          <div
            className="chapter-bar"
            style={{ animation: vis ? "slide-up 0.6s ease both" : "none" }}
          >
            <div
              className="chapter-label"
              style={{ background: "var(--yellow)" }}
            >
              Chapter 02
            </div>
          </div>

          <div className="skills-layout">
            {/* Left editorial */}
            <div className="skills-left">
              <h2
                className="skills-chapter"
                style={{
                  animation: vis ? "slide-up 0.7s ease 0.08s both" : "none",
                }}
              >
                The
                <br />
                <span>Arsenal</span>
              </h2>

              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 14.5,
                  lineHeight: 1.78,
                  color: "rgba(248,244,232,0.42)",
                  animation: vis ? "slide-up 0.6s ease 0.15s both" : "none",
                }}
              >
                Languages, frameworks, and tools I reach for. Tap any skill to
                filter matching projects.
              </p>

              <div
                className="skill-counts"
                style={{
                  animation: vis ? "slide-up 0.6s ease 0.22s both" : "none",
                }}
              >
                {[
                  { n: SKILLS.length, l: "Tech" },
                  { n: CATS.length, l: "Areas" },
                  { n: "3+", l: "Yrs" },
                ].map((s) => (
                  <div key={s.l} className="skill-count-item">
                    <div
                      style={{
                        fontFamily: "var(--font-comic)",
                        fontSize: 32,
                        color: "var(--yellow)",
                        lineHeight: 1,
                        letterSpacing: "0.04em",
                      }}
                    >
                      {s.n}
                    </div>
                    <div
                      style={{
                        fontFamily: "var(--font-label)",
                        fontSize: 9,
                        fontWeight: 700,
                        letterSpacing: "0.14em",
                        textTransform: "uppercase",
                        color: "rgba(248,244,232,0.3)",
                        marginTop: 3,
                      }}
                    >
                      {s.l}
                    </div>
                  </div>
                ))}
              </div>

              {/* Filter status */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  fontFamily: "var(--font-body)",
                  fontSize: 12,
                  color: "rgba(248,244,232,0.28)",
                  animation: vis ? "slide-up 0.6s ease 0.3s both" : "none",
                }}
              >
                <span
                  style={{
                    width: 7,
                    height: 7,
                    borderRadius: "50%",
                    flexShrink: 0,
                    background: active
                      ? "var(--yellow)"
                      : "rgba(255,255,255,0.12)",
                    boxShadow: active ? "0 0 8px var(--yellow)" : "none",
                    transition: "all 0.25s ease",
                    display: "inline-block",
                  }}
                />
                {active
                  ? `Showing projects using "${active}"`
                  : "Tap a skill to filter projects"}
              </div>

              {active && (
                <div className="filter-pill">
                  <span
                    style={{
                      fontFamily: "var(--font-comic)",
                      fontSize: 13,
                      letterSpacing: "0.08em",
                      color: "var(--yellow)",
                    }}
                  >
                    Filter: {active}
                  </span>
                  <button
                    onClick={() => {
                      setActive(null);
                      window.dispatchEvent(
                        new CustomEvent("skill-filter", {
                          detail: { skill: null },
                        }),
                      );
                    }}
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "none",
                      color: "var(--yellow)",
                      fontSize: 20,
                      lineHeight: 1,
                      padding: "0 0 0 8px",
                      marginLeft: "auto",
                    }}
                  >
                    ×
                  </button>
                </div>
              )}
            </div>

            {/* Right category panels */}
            <div>
              <div className="cats-grid">
                {CATS.map((cat, pi) => (
                  <CategoryPanel
                    key={cat}
                    cat={cat}
                    skills={SKILLS.filter((s) => s.cat === cat)}
                    active={active}
                    hovered={hovered}
                    onHover={setHov}
                    onToggle={handleToggle}
                    visible={vis}
                    panelIdx={pi}
                  />
                ))}
                {/* Teaser panel */}
                <div
                  className="cat-panel next-arc-panel"
                  style={{
                    animation: vis
                      ? `slide-up 0.5s ease ${CATS.length * 75}ms both`
                      : "none",
                  }}
                >
                  <div
                    className="caption"
                    style={{
                      position: "absolute",
                      top: -2,
                      left: -2,
                      fontSize: 10,
                    }}
                  >
                    Next Arc
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--font-comic)",
                      fontSize: 18,
                      color: "rgba(0,0,0,0.18)",
                      letterSpacing: "0.06em",
                      textAlign: "center",
                      marginTop: 10,
                    }}
                  >
                    Coming:
                    <br />
                    <span style={{ color: "var(--yellow)", fontSize: 14 }}>
                      CI/CD · AWS · k8s
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
