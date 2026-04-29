"use client";
import { useState, useEffect, useRef } from "react";

// Personal story panels - about the person, not the resume
const STORY_PANELS = [
  {
    ch: "01",
    caption: "Meanwhile, somewhere in Manila...",
    title: "The Origin",
    body: "I grew up in the Philippines. Heat, humidity, and a city that never really slows down. Then I moved to Calgary — which still feels like a strange trade sometimes. Winters here are unnecessarily aggressive. I'm still adjusting, honestly.",
    accent: "var(--blue)",
    rotation: "-1.5deg",
    tag: "PH → YYC",
  },
  {
    ch: "02",
    caption: "How it started...",
    title: "The Accidental Developer",
    body: "I didn't have some big plan. I just kept messing around with things until coding stuck longer than everything else. Which, honestly, surprised me more than anyone. I still don't fully know why it clicked — it just did.",
    accent: "var(--yellow)",
    rotation: "1deg",
    tag: "No Grand Plan",
  },
  {
    ch: "03",
    caption: "The villain: perfectionism",
    title: "Build. Cringe. Improve.",
    body: "My process is basically: build something, think it's solid, come back later, and immediately see five things I'd change. It's a little annoying. But I've accepted that the cringe is the compass — it means I'm getting better.",
    accent: "var(--red)",
    rotation: "-0.8deg",
    tag: "The Loop",
  },
  {
    ch: "04",
    caption: "A character trait (for better or worse)",
    title: "I Sit With It",
    body: "I tend to hold problems in my head longer than I probably need to. Not stuck — just thinking. I'd rather actually understand what's happening before jumping in. I've done the \"code first, regret later\" thing enough times to know how it ends.",
    accent: "var(--green)",
    rotation: "1.5deg",
    tag: "Think First",
  },
];

// Off-panel personal tidbits
const TIDBITS = [
  { icon: "🏃", label: "Running", note: "Clears my head better than anything" },
  { icon: "🎵", label: "Music", note: "Mostly when I'm stuck on something" },
  { icon: "⚽", label: "Sports", note: "Grew up playing, still do" },
  { icon: "❄️", label: "Calgary winters", note: "Still haven't forgiven them" },
];

export default function ComicAbout() {
  const sectionRef = useRef(null);
  const [vis, setVis] = useState(false);
  const [activePanel, setActivePanel] = useState(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVis(true); },
      { threshold: 0.04 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <style>{`
        /* ── ABOUT SECTION ── */
        .about-section {
          position: relative;
          padding: clamp(72px, 10vw, 120px) clamp(16px, 5vw, 64px) clamp(56px, 8vw, 96px);
          background: var(--bg);
          overflow: hidden;
        }

        /* Diagonal hatch texture */
        .about-section::before {
          content: '';
          position: absolute; inset: 0; pointer-events: none;
          background: repeating-linear-gradient(
            -45deg, transparent 0px, transparent 22px,
            var(--muted2) 22px, var(--muted2) 23px
          );
        }

        /* Arc reactor deco — top right */
        .about-arc {
          position: absolute; top: -100px; right: -100px;
          width: 380px; height: 380px;
          opacity: 0.05; z-index: 0; pointer-events: none;
        }
        [data-theme="dark"] .about-arc { opacity: 0.1; }

        .about-inner {
          max-width: 1240px; margin: 0 auto;
          position: relative; z-index: 1; width: 100%;
        }

        /* ── HEADING ── */
        .about-heading {
          font-family: var(--font-comic);
          font-size: clamp(3.5rem, 9vw, 8rem);
          letter-spacing: 0.03em;
          line-height: 0.88;
          color: var(--fg);
          margin: 0 0 clamp(32px, 5vw, 56px);
          animation: slide-up 0.7s ease 0.05s both;
        }
        .about-heading span { color: var(--red); }
        .about-heading .outline {
          -webkit-text-stroke: 3px var(--fg);
          color: transparent;
        }

        /* ── STORY PANELS GRID ── */
        .about-panels-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: clamp(12px, 2vw, 20px);
          margin-bottom: clamp(32px, 5vw, 52px);
        }
        @media (max-width: 700px) {
          .about-panels-grid { grid-template-columns: 1fr; }
        }

        /* Individual story panel */
        .story-card {
          position: relative;
          background: var(--bg);
          border: var(--border-med);
          box-shadow: var(--panel-shadow);
          padding: clamp(18px, 2.5vw, 28px);
          cursor: default;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          overflow: hidden;
        }
        .story-card::before {
          content: '';
          position: absolute; inset: 0; pointer-events: none;
          background-image: radial-gradient(circle, var(--muted2) 1px, transparent 1px);
          background-size: 10px 10px;
        }
        .story-card:hover {
          transform: translate(-3px, -3px);
          box-shadow: 8px 8px 0 var(--fg);
        }

        /* Chapter tag */
        .story-card-ch {
          position: absolute;
          top: 0; left: 0;
          background: var(--yellow);
          border-right: var(--border-thin);
          border-bottom: var(--border-thin);
          padding: 3px 10px;
          font-family: var(--font-comic);
          font-size: 10px;
          letter-spacing: 0.14em;
          color: #0a0a0e;
        }

        /* Caption bar */
        .story-caption {
          background: var(--fg);
          padding: 5px 12px;
          margin-bottom: 14px;
          margin-top: 24px;
          display: inline-block;
        }
        .story-caption span {
          font-family: var(--font-body);
          font-size: 11px;
          color: var(--bg);
          font-style: italic;
          letter-spacing: 0.03em;
          opacity: 0.7;
        }

        /* Title */
        .story-card-title {
          font-family: var(--font-comic);
          font-size: clamp(1.15rem, 2.5vw, 1.5rem);
          letter-spacing: 0.04em;
          color: var(--fg);
          margin: 0 0 10px;
          line-height: 1.1;
        }

        /* Body */
        .story-card-body {
          font-family: var(--font-body);
          font-size: clamp(13px, 1.5vw, 14.5px);
          line-height: 1.72;
          color: var(--muted);
          margin: 0 0 14px;
        }

        /* Bottom tag chip */
        .story-tag {
          display: inline-block;
          font-family: var(--font-comic);
          font-size: 10px;
          letter-spacing: 0.12em;
          padding: 2px 10px;
          border: var(--border-thin);
          color: var(--fg);
          opacity: 0.45;
        }

        /* Accent corner */
        .story-corner {
          position: absolute;
          bottom: 0; right: 0;
          width: 32px; height: 32px;
          border-left: var(--border-thin);
          border-top: var(--border-thin);
        }

        /* ── THE HUMAN PANEL ── */
        .human-panel {
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: clamp(16px, 3vw, 32px);
          margin-bottom: clamp(28px, 4vw, 44px);
          align-items: start;
        }
        @media (max-width: 700px) {
          .human-panel { grid-template-columns: 1fr; }
        }

        /* "The human side" speech bubble quote */
        .human-quote-block {
          position: relative;
          background: var(--fg);
          border: var(--border-med);
          box-shadow: var(--panel-shadow);
          padding: clamp(20px, 3vw, 32px);
          overflow: hidden;
        }
        .human-quote-block::before {
          content: '';
          position: absolute; inset: 0;
          background-image: radial-gradient(circle, var(--bg) 1px, transparent 1px);
          background-size: 12px 12px;
          opacity: 0.08;
          pointer-events: none;
        }
        .human-quote-eyebrow {
          font-family: var(--font-comic);
          font-size: 10px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--yellow);
          margin-bottom: 10px;
          opacity: 0.8;
        }
        .human-quote-text {
          font-family: var(--font-comic);
          font-size: clamp(1.4rem, 3vw, 2rem);
          letter-spacing: 0.04em;
          line-height: 1.2;
          color: var(--bg);
          margin: 0;
        }
        .human-quote-text em {
          font-style: normal;
          color: var(--yellow);
        }
        .human-quote-sub {
          font-family: var(--font-body);
          font-size: 13px;
          color: var(--bg);
          opacity: 0.45;
          margin-top: 12px;
          line-height: 1.6;
          font-style: italic;
        }

        /* Tidbits grid */
        .tidbits-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(8px, 1.5vw, 12px);
        }
        @media (max-width: 440px) {
          .tidbits-grid { grid-template-columns: 1fr; }
        }

        .tidbit-card {
          background: var(--bg);
          border: var(--border-thin);
          box-shadow: var(--panel-shadow-sm);
          padding: 14px 16px;
          transition: transform 0.15s ease, box-shadow 0.15s ease;
        }
        .tidbit-card:hover {
          transform: translate(-2px, -2px);
          box-shadow: 5px 5px 0 var(--fg);
        }
        .tidbit-icon {
          font-size: 22px;
          margin-bottom: 6px;
          display: block;
          line-height: 1;
        }
        .tidbit-label {
          font-family: var(--font-comic);
          font-size: 14px;
          letter-spacing: 0.05em;
          color: var(--fg);
          margin-bottom: 3px;
        }
        .tidbit-note {
          font-family: var(--font-body);
          font-size: 11.5px;
          color: var(--muted);
          line-height: 1.5;
        }

        /* ── BOTTOM STRIP: "What I'm About Right Now" ── */
        .about-now-strip {
          background: var(--fg);
          border: var(--border-bold);
          box-shadow: var(--panel-shadow);
          padding: clamp(20px, 3vw, 32px) clamp(20px, 3.5vw, 40px);
          position: relative;
          overflow: hidden;
          display: flex;
          align-items: center;
          gap: clamp(20px, 4vw, 48px);
          flex-wrap: wrap;
        }
        .about-now-strip::before {
          content: '';
          position: absolute; inset: 0;
          background-image: radial-gradient(circle, var(--bg) 1px, transparent 1px);
          background-size: 14px 14px;
          opacity: 0.06;
          pointer-events: none;
        }
        .now-label {
          font-family: var(--font-comic);
          font-size: 10px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--yellow);
          background: rgba(245, 200, 0, 0.12);
          border: 2px solid rgba(245, 200, 0, 0.3);
          padding: 3px 12px;
          margin-bottom: 10px;
          display: inline-block;
        }
        .now-text {
          font-family: var(--font-comic);
          font-size: clamp(1rem, 2.5vw, 1.35rem);
          letter-spacing: 0.04em;
          color: var(--bg);
          line-height: 1.3;
        }
        .now-text em { font-style: normal; color: var(--yellow); }

        .now-stats {
          display: flex;
          gap: clamp(20px, 3.5vw, 40px);
          flex-wrap: wrap;
        }
        .now-stat {
          text-align: center;
        }
        .now-stat-val {
          font-family: var(--font-comic);
          font-size: clamp(1.6rem, 4vw, 2.4rem);
          color: var(--yellow);
          letter-spacing: 0.04em;
          line-height: 1;
        }
        .now-stat-lbl {
          font-family: var(--font-label);
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.18em;
          color: var(--bg);
          opacity: 0.35;
          text-transform: uppercase;
          margin-top: 3px;
        }
        .now-divider {
          width: 2px;
          height: 56px;
          background: var(--bg);
          opacity: 0.12;
          flex-shrink: 0;
        }
        @media (max-width: 600px) {
          .now-divider { display: none; }
          .about-now-strip { flex-direction: column; align-items: flex-start; }
        }
      `}</style>

      <section id="about" className="about-section" ref={sectionRef}>
        {/* Arc reactor deco */}
        <svg viewBox="0 0 300 300" fill="none" className="about-arc"
          style={{ position: "absolute", top: -100, right: -100, width: 380, height: 380, zIndex: 0, pointerEvents: "none" }}>
          <circle cx="150" cy="150" r="140" stroke="rgba(30,200,255,1)" strokeWidth="1.5" />
          <circle cx="150" cy="150" r="108" stroke="rgba(30,200,255,1)" strokeWidth="1" />
          <circle cx="150" cy="150" r="76" stroke="rgba(30,200,255,1)" strokeWidth="1" />
          <circle cx="150" cy="150" r="38" stroke="rgba(30,200,255,1)" strokeWidth="1.5" />
        </svg>

        <div className="about-inner">
          {/* Chapter bar */}
          <div className="chapter-bar" style={{ animation: vis ? "slide-up 0.5s ease both" : "none" }}>
            <div className="chapter-label">Chapter 01</div>
          </div>

          {/* Heading */}
          <h2 className="about-heading" style={{ animation: vis ? "slide-up 0.65s ease 0.08s both" : "none" }}>
            Origin
            <br />
            <span className="outline">Story</span>
          </h2>

          {/* ── STORY PANELS ── */}
          <div className="about-panels-grid">
            {STORY_PANELS.map((panel, i) => (
              <div
                key={panel.ch}
                className="story-card"
                style={{
                  animation: vis ? `panel-reveal 0.6s cubic-bezier(0.16,1,0.3,1) ${0.1 + i * 0.1}s both` : "none",
                }}
              >
                {/* Halftone in JS to avoid class collision */}
                <div className="story-card-ch">{panel.ch}</div>

                <div className="story-caption">
                  <span>{panel.caption}</span>
                </div>

                <h3 className="story-card-title">{panel.title}</h3>
                <p className="story-card-body">{panel.body}</p>
                <div className="story-tag">{panel.tag}</div>

                {/* Accent corner */}
                <div className="story-corner" style={{ background: panel.accent }} />
              </div>
            ))}
          </div>

          {/* ── HUMAN SIDE PANEL ── */}
          <div className="human-panel" style={{ animation: vis ? "slide-up 0.65s ease 0.5s both" : "none" }}>
            {/* Quote / statement block */}
            <div className="human-quote-block">
              <div className="human-quote-eyebrow">// Off the clock</div>
              <p className="human-quote-text">
                I run, play sports, and mess with music — mostly to <em>reset</em> when I've been staring at a problem so long everything starts looking wrong.
              </p>
              <p className="human-quote-sub">
                It helps more than it probably should. Outside stuff keeps the inside stuff from getting too loud.
              </p>
            </div>

            {/* Tidbits */}
            <div className="tidbits-grid">
              {TIDBITS.map((t) => (
                <div key={t.label} className="tidbit-card">
                  <span className="tidbit-icon">{t.icon}</span>
                  <div className="tidbit-label">{t.label}</div>
                  <div className="tidbit-note">{t.note}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ── BOTTOM STRIP ── */}
          <div className="about-now-strip" style={{ animation: vis ? "slide-up 0.65s ease 0.62s both" : "none" }}>
            <div style={{ flex: 1, minWidth: 200, position: "relative", zIndex: 1 }}>
              <div className="now-label">Right Now</div>
              <p className="now-text">
                Studying at <em>SAIT</em>, building things that actually work, and figuring out what I'm genuinely good at. Slowly.
              </p>
            </div>

            <div className="now-divider" />

            <div className="now-stats" style={{ position: "relative", zIndex: 1 }}>
              {[
                { v: "3.7", l: "GPA" },
                { v: "9+", l: "Projects" },
                { v: "2", l: "Internships" },
              ].map((s) => (
                <div key={s.l} className="now-stat">
                  <div className="now-stat-val">{s.v}</div>
                  <div className="now-stat-lbl">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}