"use client";
import { useState, useEffect } from "react";

// Minimal speed-line burst from right-center, Iron Man HUD style
function SpeedLines({ count = 40 }) {
  return (
    <svg
      viewBox="0 0 800 800"
      preserveAspectRatio="xMidYMid slice"
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        opacity: 0.055,
        pointerEvents: "none",
      }}
    >
      {Array.from({ length: count }, (_, i) => {
        const angle = i * (360 / count) * (Math.PI / 180);
        const cx = 600,
          cy = 400,
          r1 = 60,
          r2 = 750;
        return (
          <line
            key={i}
            x1={cx + r1 * Math.cos(angle)}
            y1={cy + r1 * Math.sin(angle)}
            x2={cx + r2 * Math.cos(angle)}
            y2={cy + r2 * Math.sin(angle)}
            stroke="white"
            strokeWidth={i % 5 === 0 ? 2 : 0.7}
          />
        );
      })}
    </svg>
  );
}

// Spider-Man web — corner decoration, kept subtle
function SpideyWeb({ style = {} }) {
  return (
    <svg
      viewBox="0 0 200 200"
      fill="none"
      style={{ pointerEvents: "none", ...style }}
    >
      <circle cx="100" cy="100" r="92" stroke="white" strokeWidth="0.9" />
      <circle cx="100" cy="100" r="68" stroke="white" strokeWidth="0.9" />
      <circle cx="100" cy="100" r="44" stroke="white" strokeWidth="0.9" />
      <circle cx="100" cy="100" r="20" stroke="white" strokeWidth="0.9" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, i) => {
        const rad = (deg * Math.PI) / 180;
        return (
          <line
            key={i}
            x1={100 + 8 * Math.cos(rad)}
            y1={100 + 8 * Math.sin(rad)}
            x2={100 + 96 * Math.cos(rad)}
            y2={100 + 96 * Math.sin(rad)}
            stroke="white"
            strokeWidth="0.7"
            opacity={i % 2 === 0 ? 0.9 : 0.4}
          />
        );
      })}
    </svg>
  );
}

// Iron Man arc reactor — subtle HUD circle
function ArcReactor({ style = {} }) {
  return (
    <svg
      viewBox="0 0 80 80"
      fill="none"
      style={{ pointerEvents: "none", ...style }}
    >
      <circle
        cx="40"
        cy="40"
        r="36"
        stroke="rgba(30,200,255,0.25)"
        strokeWidth="1"
      />
      <circle
        cx="40"
        cy="40"
        r="28"
        stroke="rgba(30,200,255,0.18)"
        strokeWidth="1"
      />
      <circle
        cx="40"
        cy="40"
        r="18"
        stroke="rgba(30,200,255,0.35)"
        strokeWidth="1.5"
      />
      <circle
        cx="40"
        cy="40"
        r="8"
        fill="rgba(30,200,255,0.18)"
        stroke="rgba(30,200,255,0.5)"
        strokeWidth="1"
      />
      {/* HUD triangle marks */}
      {[0, 1, 2, 3, 4, 5].map((i) => {
        const angle = (i * 60 * Math.PI) / 180;
        const x1 = 40 + 20 * Math.cos(angle),
          y1 = 40 + 20 * Math.sin(angle);
        const x2 = 40 + 25 * Math.cos(angle),
          y2 = 40 + 25 * Math.sin(angle);
        return (
          <line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="rgba(30,200,255,0.45)"
            strokeWidth="2"
            strokeLinecap="round"
          />
        );
      })}
    </svg>
  );
}

export default function ComicHero() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <style>{`
        .hero-section {
          position: relative;
          min-height: 100vh;
          background: #0a0a0e;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: clamp(90px, 12vw, 140px) clamp(20px, 5vw, 64px) clamp(60px, 7vw, 100px);
        }

        /* Halftone texture */
        .hero-halftone {
          position: absolute; inset: 0; pointer-events: none; z-index: 0;
          background-image: radial-gradient(circle, rgba(248,244,232,0.055) 1px, transparent 1px);
          background-size: 13px 13px;
        }

        /* Diagonal slash accent — Spider-Man red swatch */
        .hero-slash {
          position: absolute; top: -30%; right: -12%;
          width: 55%; height: 230%;
          background: var(--red);
          opacity: 0.05;
          transform: rotate(-16deg);
          pointer-events: none; z-index: 0;
        }

        /* Iron Man arc reactor — bottom right decoration */
        .hero-arc {
          position: absolute; bottom: -60px; right: -60px;
          width: 320px; height: 320px;
          opacity: 0.22; z-index: 0;
          pointer-events: none;
          animation: reactor-pulse 4s ease-in-out infinite;
        }

        /* Spider-Man web corner */
        .hero-web {
          position: absolute; bottom: 0; left: 0;
          width: 200px; height: 200px;
          opacity: 0.06; z-index: 0;
          pointer-events: none;
        }

        /* Issue label strip */
        .hero-issue-strip {
          position: absolute; top: 68px;
          left: clamp(20px, 5vw, 64px);
          display: flex; align-items: center; gap: 8px;
          z-index: 2;
          animation: slide-up 0.5s ease 0.1s both;
        }
        .hero-issue-tag {
          padding: 3px 10px;
          font-family: var(--font-comic);
          font-size: 10px;
          letter-spacing: 0.2em;
        }

        /* Main grid */
        .hero-grid {
          display: grid;
          grid-template-columns: 1fr auto;
          gap: clamp(40px, 6vw, 80px);
          align-items: center;
          max-width: 1240px; margin: 0 auto; width: 100%;
          position: relative; z-index: 1;
        }
        .hero-photo-col {
          padding: 60px 70px 20px 50px;
          overflow: visible;
        }
        @media (max-width: 860px) {
          .hero-grid {
            grid-template-columns: 1fr;
            text-align: center;
          }
          .hero-photo-col {
            order: -1;
            display: flex;
            justify-content: center;
            padding: 16px 16px 0;
          }
          .hero-btns, .hero-socials { justify-content: center !important; }
        }

        /* Name stack */
        .hero-name {
          font-family: var(--font-comic);
          font-size: clamp(4.5rem, 14vw, 12rem);
          letter-spacing: 0.03em;
          line-height: 0.88;
          margin: 0;
        }
        .hero-name-fill { color: rgba(248,244,232,0.92); }
        .hero-name-red {
          color: var(--red);
          -webkit-text-stroke: 2px rgba(10,10,14,0.5);
          filter: drop-shadow(0 0 18px rgba(225,6,0,0.5));
          animation: slide-up 0.8s cubic-bezier(0.16,1,0.3,1) 0.35s both;
        }

        /* Role chip */
        .hero-role-chip {
          display: inline-flex; align-items: center; gap: 8px;
          background: var(--yellow);
          border: 2px solid rgba(10,10,14,0.35);
          padding: 5px 14px;
          font-family: var(--font-comic); font-size: 14px;
          letter-spacing: 0.1em; color: #0a0a0e;
          margin-bottom: 14px;
          animation: slide-up 0.6s ease 0.5s both;
        }

        /* Bio text */
        .hero-bio {
          font-family: var(--font-body);
          font-size: 15px; line-height: 1.82;
          color: rgba(248,244,232,0.48);
          max-width: 440px;
          margin: 0 0 28px;
          animation: slide-up 0.7s ease 0.55s both;
        }

        /* Social buttons */
        .hero-social-btn {
          width: 38px; height: 38px;
          border: 2px solid rgba(248,244,232,0.18);
          display: flex; align-items: center; justify-content: center;
          font-size: 17px;
          color: rgba(248,244,232,0.38);
          text-decoration: none;
          transition: all 0.15s ease;
        }
        .hero-social-btn:hover {
          background: var(--yellow); color: #0a0a0e;
          border-color: var(--yellow);
          transform: translate(-2px, -2px);
          box-shadow: 3px 3px 0 rgba(245,200,0,0.4);
        }

        /* Photo frame */
        .hero-photo-frame {
          position: relative; display: inline-block;
          animation: drift 6s ease-in-out infinite 1.5s, pop-in 0.7s cubic-bezier(0.16,1,0.3,1) 0.6s both;
        }
        .hero-photo-frame img {
          display: block;
          width: clamp(180px, 20vw, 260px);
          height: clamp(180px, 20vw, 260px);
          object-fit: cover;
          border: 4px solid rgba(248,244,232,0.85);
          box-shadow: 8px 8px 0 var(--red);
          filter: contrast(1.04) brightness(0.96);
        }

        /* Stickers */
        .hero-sticker {
          position: absolute;
          font-family: var(--font-comic); font-size: 10px;
          letter-spacing: 0.1em;
          padding: 4px 10px;
          border: 2px solid rgba(10,10,14,0.4);
          box-shadow: 2px 2px 0 rgba(10,10,14,0.35);
          white-space: nowrap;
          display: flex; align-items: center; gap: 4px;
        }
        @media (max-width: 860px) { .hero-sticker { display: none; } }

        /* Speech bubble */
        .hero-speech {
          position: absolute; top: -52px; left: 50%;
          transform: translateX(-50%);
          background: var(--paper); border: 2px solid rgba(10,10,14,0.35);
          padding: 8px 16px;
          font-family: var(--font-body); font-size: 12px;
          color: #0a0a0e; white-space: nowrap;
          border-radius: 14px; box-shadow: 2px 2px 0 rgba(10,10,14,0.25);
          animation: bubble-appear 0.5s cubic-bezier(0.16,1,0.3,1) 1.4s both;
          z-index: 10;
        }
        .hero-speech::after {
          content: ''; position: absolute;
          bottom: -12px; left: 50%; transform: translateX(-50%);
          width: 0; height: 0;
          border-left: 8px solid transparent;
          border-right: 8px solid transparent;
          border-top: 12px solid var(--paper);
        }
        @media (max-width: 860px) { .hero-speech { display: none; } }

        /* Stats strip */
        .hero-stats {
          max-width: 1240px; margin: clamp(32px, 4vw, 52px) auto 0;
          display: flex; gap: 0; width: 100%;
          border: var(--border-med); box-shadow: var(--panel-shadow);
          background: var(--bg);
          position: relative; z-index: 1;
          animation: slide-up 0.7s ease 1s both;
          overflow: hidden;
        }
        [data-theme="dark"] .hero-stats { background: #111118; }
        .hero-stat-item {
          flex: 1;
          padding: clamp(14px, 2vw, 22px) clamp(14px, 2.5vw, 26px);
          border-right: var(--border-thin);
          position: relative; transition: background 0.15s;
        }
        .hero-stat-item:last-child { border-right: none; }
        .hero-stat-item:hover { background: var(--yellow); }
        [data-theme="dark"] .hero-stat-item:hover { background: rgba(245,200,0,0.12); }
        .stat-label {
          font-family: var(--font-label); font-size: 9px; font-weight: 700;
          letter-spacing: 0.2em; text-transform: uppercase;
          color: var(--muted); margin-bottom: 5px;
        }
        .stat-value {
          font-family: var(--font-comic);
          font-size: clamp(1.6rem, 3vw, 2.4rem);
          color: var(--fg); line-height: 1;
        }
        .stat-sub { font-family: var(--font-body); font-size: 11px; color: var(--muted); margin-top: 2px; }
        .stat-bar { height: 3px; background: var(--muted2); border-radius: 2px; margin-top: 8px; overflow: hidden; }
        .stat-bar-fill {
          height: 100%; border-radius: 2px;
          background: linear-gradient(90deg, var(--red), var(--yellow));
          animation: bar-fill 1.4s cubic-bezier(0.16,1,0.3,1) 1.2s both;
        }

        /* Scroll hint */
        .hero-scroll-hint {
          position: absolute; bottom: 22px; left: 50%;
          transform: translateX(-50%);
          display: flex; flex-direction: column; align-items: center; gap: 6px;
          z-index: 2;
          animation: slide-up 0.5s ease 1.8s both;
          opacity: 0.35;
        }

        @media (max-width: 640px) {
          .hero-stats { flex-wrap: wrap; }
          .hero-stat-item { flex: 0 0 50%; border-bottom: var(--border-thin); }
          .hero-stat-item:nth-child(even) { border-right: none; }
          .hero-stat-item:last-child { border-bottom: none; }
        }
      `}</style>

      <section className="hero-section">
        <div className="hero-halftone" />
        <div className="hero-slash" />
        {mounted && <SpeedLines />}
        {mounted && <ArcReactor
          style={{
            position: "absolute",
            bottom: -60,
            right: -60,
            width: 320,
            height: 320,
            opacity: 0.2,
            zIndex: 0,
            pointerEvents: "none",
          }}
        />}
        {mounted && <SpideyWeb
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: 180,
            height: 180,
            opacity: 0.06,
            zIndex: 0,
          }}
        />}

        {/* Issue tag strip */}
        {mounted && (
          <div className="hero-issue-strip">
            <div
              className="hero-issue-tag"
              style={{ background: "var(--red)", border: "var(--border-thin)" }}
            >
              <span
                style={{
                  fontFamily: "var(--font-comic)",
                  fontSize: 10,
                  letterSpacing: "0.18em",
                  color: "white",
                }}
              >
                ISSUE #001
              </span>
            </div>
            <div
              className="hero-issue-tag"
              style={{
                background: "var(--yellow)",
                border: "var(--border-thin)",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-comic)",
                  fontSize: 10,
                  letterSpacing: "0.18em",
                  color: "#0a0a0e",
                }}
              >
                ORIGIN STORY
              </span>
            </div>
          </div>
        )}

        <div className="hero-grid">
          {/* Left: Text content */}
          <div>
            {mounted && (
              <div style={{ display: "flex", marginBottom: 10 }}>
                <div className="hero-role-chip">
                  <span
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      background: "var(--red)",
                      display: "inline-block",
                      animation: "blink-dot 1.8s ease-in-out infinite",
                      flexShrink: 0,
                    }}
                  />
                  Full-Stack Developer
                </div>
              </div>
            )}

            <div style={{ marginBottom: 20 }}>
              <h1
                className="hero-name hero-name-fill"
                style={{
                  animation:
                    "slide-up 0.8s cubic-bezier(0.16,1,0.3,1) 0.2s both",
                }}
              >
                XANDER
              </h1>
              <h1 className="hero-name hero-name-red">RANCAP</h1>
            </div>

            {mounted && (
              <p className="hero-bio">
                Building full-stack things where clean design meets solid
                engineering. I try stuff, break it, learn something, and redo it
                until it's right. Based in Calgary — currently at SAIT, always
                shipping.
              </p>
            )}

            {mounted && (
              <div
                className="hero-btns"
                style={{
                  display: "flex",
                  gap: 10,
                  flexWrap: "wrap",
                  marginBottom: 24,
                  animation: "slide-up 0.6s ease 0.7s both",
                }}
              >
                <button
                  className="btn-comic btn-comic-red"
                  style={{ fontSize: 15, padding: "11px 24px", cursor: "none" }}
                  onClick={() =>
                    document
                      .getElementById("contact")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                >
                  Get In Touch
                  <svg width="11" height="9" viewBox="0 0 12 9" fill="none">
                    <path
                      d="M7.5 1l4 3.5-4 3.5M11.5 4.5H.5"
                      stroke="white"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
                <button
                  className="btn-comic"
                  style={{
                    fontSize: 15,
                    padding: "11px 24px",
                    cursor: "none",
                    background: "transparent",
                    color: "rgba(248,244,232,0.65)",
                    borderColor: "rgba(248,244,232,0.22)",
                  }}
                  onClick={() =>
                    document
                      .getElementById("projects")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(248,244,232,0.08)";
                    e.currentTarget.style.borderColor = "rgba(248,244,232,0.5)";
                    e.currentTarget.style.color = "rgba(248,244,232,0.9)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.borderColor =
                      "rgba(248,244,232,0.22)";
                    e.currentTarget.style.color = "rgba(248,244,232,0.65)";
                  }}
                >
                  View Work
                </button>
              </div>
            )}

            {mounted && (
              <div
                className="hero-socials"
                style={{
                  display: "flex",
                  gap: 10,
                  alignItems: "center",
                  animation: "slide-up 0.6s ease 0.85s both",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-comic)",
                    fontSize: 9,
                    letterSpacing: "0.22em",
                    color: "rgba(255,255,255,0.18)",
                    textTransform: "uppercase",
                  }}
                >
                  Find me
                </span>
                <div
                  style={{
                    width: 16,
                    height: 2,
                    background: "rgba(255,255,255,0.08)",
                  }}
                />
                {[
                  {
                    icon: "bx bxl-linkedin",
                    url: "https://www.linkedin.com/in/xander-rancap-79b2a0326/",
                    label: "LinkedIn",
                  },
                  {
                    icon: "bx bxl-github",
                    url: "https://github.com/xndrncp08",
                    label: "GitHub",
                  },
                  {
                    icon: "bx bxl-instagram",
                    url: "https://www.instagram.com/derbadoobeelat/",
                    label: "Instagram",
                  },
                ].map((s) => (
                  <a
                    key={s.icon}
                    href={s.url}
                    target="_blank"
                    rel="noreferrer"
                    title={s.label}
                    className="hero-social-btn"
                  >
                    <i className={s.icon} />
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Right: Photo */}
          <div className="hero-photo-col">
            {mounted && (
              <div className="hero-photo-frame">
                <div className="hero-speech">
                  &ldquo;Ship it. Learn. Repeat.&rdquo;
                </div>
                <img
                  src="https://i.postimg.cc/W3VBJZ1Q/derpogs-(1).jpg"
                  alt="Xander Rancap"
                />
                <div
                  className="hero-sticker"
                  style={{
                    bottom: -13,
                    right: -22,
                    background: "var(--yellow)",
                    transform: "rotate(-4deg)",
                  }}
                >
                  SAIT · 3.7 GPA
                </div>
                <div
                  className="hero-sticker"
                  style={{
                    top: 12,
                    right: -60,
                    background: "var(--paper)",
                    color: "#0a0a0e",
                    transform: "rotate(3deg)",
                  }}
                >
                  <i className="bx bxl-github" style={{ fontSize: 12 }} />{" "}
                  xndrncp08
                </div>
                <div
                  className="hero-sticker"
                  style={{
                    top: 12,
                    left: -44,
                    background: "var(--red)",
                    color: "white",
                    transform: "rotate(-5deg)",
                  }}
                >
                  📍 YYC
                </div>
                {/* Iron Man easter egg */}
                <div
                  className="hero-sticker"
                  style={{
                    bottom: -13,
                    left: -56,
                    background: "#0e1f38",
                    color: "rgba(30,200,255,0.8)",
                    transform: "rotate(4deg)",
                    fontSize: 9,
                    border: "2px solid rgba(30,200,255,0.25)",
                  }}
                >
                  ⚙ STARK TECH
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Stats strip */}
        {mounted && (
          <div className="hero-stats">
            {[
              { label: "GPA", value: "3.7", sub: "/ 4.0 at SAIT", fill: 85 },
              {
                label: "Projects Built",
                value: "9+",
                sub: "full-stack",
                fill: 78,
              },
              { label: "Internships", value: "2", sub: "completed", fill: 100 },
              {
                label: "Based In",
                value: "YYC",
                sub: "Calgary, CA",
                fill: null,
              },
            ].map((s) => (
              <div key={s.label} className="hero-stat-item">
                <div className="stat-label">{s.label}</div>
                <div className="stat-value">{s.value}</div>
                <div className="stat-sub">{s.sub}</div>
                {s.fill !== null && (
                  <div className="stat-bar">
                    <div
                      className="stat-bar-fill"
                      style={{ width: `${s.fill}%` }}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Scroll hint */}
        {mounted && (
          <div className="hero-scroll-hint">
            <span
              style={{
                fontFamily: "var(--font-comic)",
                fontSize: 9,
                letterSpacing: "0.22em",
                color: "rgba(255,255,255,0.7)",
                textTransform: "uppercase",
              }}
            >
              Turn the page
            </span>
            <div
              style={{
                width: 2,
                height: 24,
                background:
                  "linear-gradient(to bottom, rgba(255,255,255,0.5), transparent)",
              }}
            />
          </div>
        )}
      </section>
    </>
  );
}