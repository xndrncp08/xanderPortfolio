'use client';

import { useState } from 'react';

/* ─── SHARED DESIGN TOKENS (mirror these in Projects.jsx) ───────────────────
   Font:        Bebas Neue (display) + Cabinet Grotesk (body)
   Grid:        28×28 dot grid, opacity 0.022 dark / 0.028 light
   Grain:       fractalNoise SVG overlay, opacity 0.025
   Accent:      indigo #818cf8 dark / #4f46e5 light
   Card radius: 24px
   Eyebrow:     11px / 600 / 0.12em / uppercase pill with glow dot
   Section pad: clamp(80px,12vw,140px)
──────────────────────────────────────────────────────────────────────────── */

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Cabinet+Grotesk:wght@300;400;500;700;800&display=swap');

  @keyframes sk-shimmer {
    0%   { background-position: -300% center; }
    100% { background-position:  300% center; }
  }
  @keyframes sk-orb-a {
    0%,100% { transform: translate(0,0) scale(1); }
    40%     { transform: translate(22px,-18px) scale(1.05); }
    70%     { transform: translate(-12px,10px) scale(0.97); }
  }
  @keyframes sk-orb-b {
    0%,100% { transform: translate(0,0) scale(1); }
    35%     { transform: translate(-20px,14px) scale(1.03); }
    70%     { transform: translate(16px,-10px) scale(0.98); }
  }
  @keyframes sk-chip-in {
    from { opacity:0; transform:translateY(16px) scale(0.93); }
    to   { opacity:1; transform:translateY(0) scale(1); }
  }
  @keyframes sk-bob {
    0%,100% { transform:translateY(0) rotate(0deg); }
    50%     { transform:translateY(-3px) rotate(-5deg); }
  }
  @keyframes sk-scan {
    0%   { top:-2px; opacity:0; }
    6%   { opacity:1; }
    94%  { opacity:0.5; }
    100% { top:100%; opacity:0; }
  }
  @keyframes sk-active-ring {
    0%,100% { box-shadow: var(--ring-base); }
    50%     { box-shadow: var(--ring-pulse); }
  }

  .sk-section {
    padding: clamp(80px,12vw,140px) clamp(24px,5vw,72px);
    position: relative;
    overflow: hidden;
    font-family: 'Cabinet Grotesk', system-ui, sans-serif;
    -webkit-font-smoothing: antialiased;
  }
  .sk-grain {
    position:absolute; inset:0; pointer-events:none;
    opacity:0.025;
    background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
    background-size:160px;
  }

  /* ── LAYOUT ── */
  .sk-inner {
    max-width: 1100px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: clamp(32px,5vw,72px);
    align-items: start;
    position: relative;
    z-index: 2;
  }
  @media (max-width:768px) {
    .sk-inner { grid-template-columns:1fr; }
  }

  /* ── LEFT COLUMN: editorial header ── */
  .sk-left {
    position: sticky;
    top: clamp(80px,12vw,120px);
  }
  @media (max-width:768px) {
    .sk-left { position:static; }
  }

  .sk-eyebrow {
    display:inline-flex; align-items:center; gap:8px;
    padding:4px 14px; border-radius:99px;
    font-size:11px; font-weight:600; letter-spacing:0.13em; text-transform:uppercase;
    margin-bottom:20px;
  }
  .sk-eyebrow-dot {
    width:6px; height:6px; border-radius:50%; display:inline-block;
  }

  .sk-headline {
    font-family:'Bebas Neue', sans-serif;
    font-size: clamp(52px,7vw,88px);
    line-height: 0.9;
    letter-spacing: 0.02em;
    margin: 0 0 24px;
  }
  .sk-shimmer-dark {
    background:linear-gradient(90deg,#e2e8f0 10%,#a5b4fc 32%,#c4b5fd 50%,#a5b4fc 68%,#e2e8f0 90%);
    background-size:300% auto;
    -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text;
    animation:sk-shimmer 5s linear infinite;
  }
  .sk-shimmer-light {
    background:linear-gradient(90deg,#0f172a 10%,#4f46e5 32%,#7c3aed 50%,#4f46e5 68%,#0f172a 90%);
    background-size:300% auto;
    -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text;
    animation:sk-shimmer 5s linear infinite;
  }

  .sk-body {
    font-size:15px; line-height:1.75; font-weight:400;
    margin-bottom:32px;
  }

  /* stat row */
  .sk-stats {
    display:flex; gap:24px; flex-wrap:wrap;
  }
  .sk-stat {
    display:flex; flex-direction:column; gap:2px;
  }
  .sk-stat-num {
    font-family:'Bebas Neue', sans-serif;
    font-size:36px; letter-spacing:0.03em; line-height:1;
  }
  .sk-stat-label {
    font-size:11px; font-weight:600; letter-spacing:0.1em; text-transform:uppercase;
  }

  /* hint */
  .sk-hint {
    display:inline-flex; align-items:center; gap:6px;
    font-size:12px; font-weight:500; margin-top:28px;
    opacity:0.5;
  }

  /* ── RIGHT COLUMN: chips ── */
  .sk-right {
    position: relative;
  }

  .sk-card {
    position:relative; border-radius:24px;
    padding: clamp(28px,4vw,44px);
    overflow:hidden; isolation:isolate;
  }
  .sk-card-border {
    position:absolute; inset:-1px; border-radius:25px;
    pointer-events:none; z-index:0; padding:1px;
  }
  .sk-orb {
    position:absolute; border-radius:50%;
    pointer-events:none; filter:blur(55px); z-index:0;
  }
  .sk-scan {
    position:absolute; left:0; right:0; height:60px;
    pointer-events:none; z-index:1;
    animation:sk-scan 9s ease-in-out infinite 1s;
  }

  /* category label */
  .sk-cat-label {
    font-size:10px; font-weight:700; letter-spacing:0.14em;
    text-transform:uppercase; margin-bottom:10px; margin-top:24px;
    opacity:0.45;
  }
  .sk-cat-label:first-child { margin-top:0; }

  .sk-chips { display:flex; flex-wrap:wrap; gap:8px; }

  /* chip */
  .sk-chip {
    position:relative; display:inline-flex; align-items:center; gap:8px;
    padding:9px 15px; border-radius:12px;
    font-size:13px; font-weight:500; letter-spacing:0.01em;
    cursor:pointer;
    font-family:'Cabinet Grotesk', system-ui, sans-serif;
    border:1px solid transparent;
    -webkit-font-smoothing:antialiased;
    overflow:hidden;
    transition:
      transform 0.28s cubic-bezier(0.34,1.56,0.64,1),
      background 0.2s, border-color 0.2s, box-shadow 0.28s, color 0.2s, opacity 0.3s;
    animation:sk-chip-in 0.4s cubic-bezier(0.16,1,0.3,1) both;
  }
  .sk-chip::after {
    content:''; position:absolute; inset:0;
    background:linear-gradient(135deg,rgba(255,255,255,.07),transparent 55%);
    opacity:0; transition:opacity 0.2s; pointer-events:none;
  }
  .sk-chip:hover::after, .sk-chip.active::after { opacity:1; }
  .sk-chip:hover  { transform:translateY(-3px) scale(1.03); }
  .sk-chip.active { transform:translateY(-2px) scale(1.02); }

  .sk-chip-icon {
    font-size:15px; line-height:1; flex-shrink:0;
    transition:color 0.2s, filter 0.2s, transform 0.2s;
  }
  .sk-chip:hover .sk-chip-icon { animation:sk-bob 0.7s ease-in-out infinite; }

  /* divider */
  .sk-divider { height:1px; border:none; margin:20px 0; }

  /* footer */
  .sk-footer {
    display:flex; align-items:center; gap:12px;
    margin-top:20px; position:relative; z-index:2;
  }
  .sk-footer-line { flex:1; height:1px; }
  .sk-count { font-size:11px; font-weight:600; letter-spacing:0.08em; text-transform:uppercase; }

  @media (max-width:480px) {
    .sk-chip { padding:8px 12px; font-size:12px; }
    .sk-card { border-radius:18px; }
  }
`;

const SKILLS = [
  { name:'JavaScript',            icon:'bx bxl-javascript',   color:'#F7DF1E', cat:'Languages' },
  { name:'TypeScript',            icon:'bx bxl-typescript',   color:'#3178C6', cat:'Languages' },
  { name:'Python',                icon:'bx bxl-python',       color:'#3776AB', cat:'Languages' },
  { name:'Java',                  icon:'bx bxl-java',         color:'#F89820', cat:'Languages' },
  { name:'C#',                    icon:'devicon-csharp-plain', color:'#9B59B6', cat:'Languages' },
  { name:'React / React Native',  icon:'bx bxl-react',        color:'#61DAFB', cat:'Frontend'  },
  { name:'Vue.js',                icon:'bx bxl-vuejs',        color:'#42B883', cat:'Frontend'  },
  { name:'HTML / CSS / Tailwind', icon:'bx bxl-html5',        color:'#E34F26', cat:'Frontend'  },
  { name:'Node.js / Express',     icon:'bx bxl-nodejs',       color:'#68A063', cat:'Backend'   },
  { name:'MongoDB',               icon:'bx bxl-mongodb',      color:'#47A248', cat:'Data'      },
  { name:'MySQL / PL/SQL',        icon:'bx bxs-data',         color:'#4479A1', cat:'Data'      },
  { name:'Supabase',              icon:'bx bx-cloud',         color:'#3ECF8E', cat:'Data'      },
  { name:'Git',                   icon:'bx bxl-git',          color:'#F05032', cat:'Tooling'   },
];

const CATS = ['Languages','Frontend','Backend','Data','Tooling'];

function hexToRgb(hex) {
  const r = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return r ? `${parseInt(r[1],16)},${parseInt(r[2],16)},${parseInt(r[3],16)}` : '99,102,241';
}

export default function Skills({ isDarkMode: dark = true }) {
  const [hovered, setHovered] = useState(null);
  const [active,  setActive]  = useState(null);

  const handleClick = (skill) => {
    const next = active === skill.name ? null : skill.name;
    setActive(next);
    window.dispatchEvent(new CustomEvent('skill-filter', { detail: { skill: next } }));
    if (next) {
      const el = document.getElementById('projects');
      if (el) el.scrollIntoView({ behavior:'smooth', block:'start' });
    }
  };

  const accent   = dark ? '#818cf8' : '#4f46e5';
  const bg       = dark ? '#080c14' : '#f8f9fc';
  const textHigh = dark ? '#e2e8f0' : '#0f172a';
  const muted    = dark ? '#4b5768' : '#94a3b8';
  const subtle   = dark ? '#2a3040' : '#cbd5e1';
  const gridDot  = dark ? 'rgba(255,255,255,0.022)' : 'rgba(0,0,0,0.028)';
  const cardBg   = dark
    ? 'linear-gradient(155deg,#0d1628 0%,#111827 50%,#0d1120 100%)'
    : 'linear-gradient(155deg,#ffffff 0%,#f1f5ff 55%,#ffffff 100%)';
  const cardShadow = dark
    ? '0 0 0 1px rgba(99,102,241,.14),0 40px 80px -20px rgba(0,0,0,.7),0 20px 40px -10px rgba(99,102,241,.18)'
    : '0 0 0 1px rgba(99,102,241,.1),0 30px 70px -20px rgba(99,102,241,.1),0 4px 20px rgba(0,0,0,.05)';
  const cardBorder = dark
    ? 'linear-gradient(135deg,rgba(99,102,241,.4),transparent 40%,rgba(139,92,246,.28))'
    : 'linear-gradient(135deg,rgba(99,102,241,.25),transparent 40%,rgba(139,92,246,.18))';
  const divider = dark
    ? 'linear-gradient(90deg,transparent,rgba(99,102,241,.2),transparent)'
    : 'linear-gradient(90deg,transparent,rgba(99,102,241,.12),transparent)';
  const eyeBg  = dark ? 'rgba(99,102,241,.12)' : 'rgba(99,102,241,.08)';
  const eyeBdr = dark ? 'rgba(99,102,241,.3)'  : 'rgba(99,102,241,.2)';
  const chipBase  = dark ? 'rgba(255,255,255,0.045)' : 'rgba(15,23,42,0.04)';
  const chipBdr   = dark ? 'rgba(255,255,255,0.08)'  : 'rgba(15,23,42,0.09)';
  const footLine  = dark ? 'rgba(255,255,255,0.05)'  : 'rgba(0,0,0,0.06)';
  const scanLine  = dark
    ? 'linear-gradient(180deg,transparent,rgba(139,92,246,.1),transparent)'
    : 'linear-gradient(180deg,transparent,rgba(99,102,241,.06),transparent)';

  return (
    <>
      <style>{CSS}</style>
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/boxicons@2.1.4/css/boxicons.min.css"/>
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css"/>

      <section className="sk-section" style={{ background: bg }}>
        <div className="sk-grain"/>

        {/* Dot grid — identical to Projects */}
        <svg style={{ position:'absolute',inset:0,width:'100%',height:'100%',pointerEvents:'none' }}>
          <defs>
            <pattern id="sk-dots" width="28" height="28" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="0.9" fill={gridDot}/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#sk-dots)"/>
        </svg>

        <div className="sk-inner">

          {/* ── LEFT: editorial ── */}
          <div className="sk-left">
            <div className="sk-eyebrow" style={{ background:eyeBg, border:`1px solid ${eyeBdr}`, color:accent }}>
              <span className="sk-eyebrow-dot" style={{ background:accent, boxShadow:`0 0 6px ${accent}` }}/>
              Toolkit
            </div>

            <h2 className={`sk-headline sk-shimmer-${dark?'dark':'light'}`}>
              Skills &amp;<br/>Tech
            </h2>

            <p className="sk-body" style={{ color:muted }}>
              Languages, frameworks, and tools I reach for when building things that matter. Click any skill to see matching projects.
            </p>

            {/* Stats */}
            <div className="sk-stats">
              <div className="sk-stat">
                <span className="sk-stat-num" style={{ color:textHigh }}>{SKILLS.length}</span>
                <span className="sk-stat-label" style={{ color:muted }}>Technologies</span>
              </div>
              <div style={{ width:'1px', background:subtle, alignSelf:'stretch' }}/>
              <div className="sk-stat">
                <span className="sk-stat-num" style={{ color:textHigh }}>{CATS.length}</span>
                <span className="sk-stat-label" style={{ color:muted }}>Categories</span>
              </div>
              <div style={{ width:'1px', background:subtle, alignSelf:'stretch' }}/>
              <div className="sk-stat">
                <span className="sk-stat-num" style={{ color:textHigh }}>3+</span>
                <span className="sk-stat-label" style={{ color:muted }}>Years exp.</span>
              </div>
            </div>

            <div className="sk-hint" style={{ color:muted }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
              {active ? `Showing projects using ${active} — click to clear` : 'Click a skill to filter projects'}
            </div>
          </div>

          {/* ── RIGHT: chip card ── */}
          <div className="sk-right">
            <div className="sk-card" style={{ background:cardBg, boxShadow:cardShadow }}>

              {/* Gradient border */}
              <div className="sk-card-border" style={{
                background:cardBorder,
                WebkitMask:'linear-gradient(#fff 0 0) content-box,linear-gradient(#fff 0 0)',
                WebkitMaskComposite:'xor', maskComposite:'exclude',
              }}/>

              {/* Animated scan line */}
              <div className="sk-scan" style={{ background:scanLine }}/>

              {/* Ambient orbs */}
              <div className="sk-orb" style={{ top:-50,right:-30,width:200,height:200,background:dark?'rgba(99,102,241,.16)':'rgba(99,102,241,.08)',animation:'sk-orb-a 12s ease-in-out infinite' }}/>
              <div className="sk-orb" style={{ bottom:-40,left:-20,width:160,height:160,background:dark?'rgba(139,92,246,.12)':'rgba(139,92,246,.06)',animation:'sk-orb-b 15s ease-in-out infinite' }}/>

              {/* Chips by category */}
              <div style={{ position:'relative', zIndex:2 }}>
                {CATS.map(cat => {
                  const group = SKILLS.filter(s => s.cat === cat);
                  return (
                    <div key={cat}>
                      <div className="sk-cat-label" style={{ color:muted }}>{cat}</div>
                      <div className="sk-chips">
                        {group.map((skill, gi) => {
                          const isHov = hovered === skill.name;
                          const isAct = active === skill.name;
                          const rgb   = hexToRgb(skill.color);
                          return (
                            <div
                              key={skill.name}
                              className={`sk-chip${isAct?' active':''}`}
                              style={{
                                animationDelay:`${gi * 40}ms`,
                                background: (isHov||isAct) ? `rgba(${rgb},${dark?'.13':'.09'})` : chipBase,
                                borderColor: isAct ? `rgba(${rgb},.75)` : isHov ? `rgba(${rgb},.45)` : chipBdr,
                                color: (isHov||isAct) ? skill.color : textHigh,
                                boxShadow: isAct
                                  ? `0 0 0 2px rgba(${rgb},.35),0 8px 24px rgba(${rgb},.25)`
                                  : isHov ? `0 6px 20px rgba(${rgb},.2)` : 'none',
                              }}
                              onMouseEnter={() => setHovered(skill.name)}
                              onMouseLeave={() => setHovered(null)}
                              onClick={() => handleClick(skill)}
                            >
                              <i
                                className={`sk-chip-icon ${skill.icon}`}
                                style={{
                                  color: (isHov||isAct) ? skill.color : accent,
                                  filter: (isHov||isAct) ? `drop-shadow(0 0 5px rgba(${rgb},.6))` : 'none',
                                }}
                              />
                              {skill.name}
                            </div>
                          );
                        })}
                      </div>
                      {cat !== CATS[CATS.length-1] && (
                        <hr className="sk-divider" style={{ background:divider }}/>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Footer */}
              <div className="sk-footer">
                <div className="sk-footer-line" style={{ background:footLine }}/>
                <span className="sk-count" style={{ color:muted }}>
                  {active ? `1 filter active` : `${SKILLS.length} technologies`}
                </span>
                <div className="sk-footer-line" style={{ background:footLine }}/>
              </div>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}