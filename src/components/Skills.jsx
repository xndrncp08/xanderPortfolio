'use client';

import { useState } from 'react';

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500&display=swap');

  @keyframes xtr-shimmer {
    0%   { background-position: -200% center; }
    100% { background-position:  200% center; }
  }
  @keyframes xtr-orb-a {
    0%,100% { transform: translate(0,0) scale(1); }
    50%     { transform: translate(30px,-20px) scale(1.05); }
  }
  @keyframes xtr-orb-b {
    0%,100% { transform: translate(0,0) scale(1); }
    50%     { transform: translate(-20px,15px) scale(0.97); }
  }
  @keyframes xtr-float {
    0%,100% { transform: translateY(0); }
    50%     { transform: translateY(-6px); }
  }
  @keyframes xtr-chip-in {
    from { opacity: 0; transform: translateY(14px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .xtr-orb-a { animation: xtr-orb-a 10s ease-in-out infinite; }
  .xtr-orb-b { animation: xtr-orb-b 13s ease-in-out infinite; }

  .xtr-skill-chip { position: relative; isolation: isolate; }
  .xtr-skill-chip::before {
    content: '';
    position: absolute; inset: -1px; border-radius: 12px;
    background: linear-gradient(135deg, var(--cc) 0%, transparent 60%);
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor; mask-composite: exclude;
    opacity: 0; transition: opacity .3s;
  }
  .xtr-skill-chip:hover::before { opacity: 1; }
  .xtr-skill-chip:hover .xtr-ci {
    animation: xtr-float 1.4s ease-in-out infinite;
    filter: drop-shadow(0 0 6px var(--cc));
  }
  .xtr-chip-in { animation: xtr-chip-in .5s ease both; }

  .xtr-skills-grad-border {
    position: absolute; inset: -1px; border-radius: inherit;
    background: linear-gradient(135deg,rgba(99,102,241,.45),transparent 45%,rgba(139,92,246,.35) 85%);
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor; mask-composite: exclude;
    pointer-events: none;
  }

  .xtr-shimmer-dark {
    background: linear-gradient(90deg,#fff 15%,#a5b4fc 35%,#c4b5fd 50%,#a5b4fc 65%,#fff 85%);
    background-size: 200% auto;
    -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
    animation: xtr-shimmer 4s linear infinite;
  }
  .xtr-shimmer-light {
    background: linear-gradient(90deg,#0f172a 15%,#4f46e5 35%,#7c3aed 50%,#4f46e5 65%,#0f172a 85%);
    background-size: 200% auto;
    -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
    animation: xtr-shimmer 4s linear infinite;
  }
`;

const SKILLS = [
  { name: 'JavaScript',           icon: 'bx bxl-javascript',   color: '#F7DF1E' },
  { name: 'React / React Native', icon: 'bx bxl-react',        color: '#61DAFB' },
  { name: 'Node.js / Express',    icon: 'bx bxl-nodejs',       color: '#68A063' },
  { name: 'C#',                   icon: 'devicon-csharp-plain', color: '#9B59B6' },
  { name: 'Python',               icon: 'bx bxl-python',       color: '#3776AB' },
  { name: 'Java',                 icon: 'bx bxl-java',         color: '#F89820' },
  { name: 'MongoDB',              icon: 'bx bxl-mongodb',      color: '#47A248' },
  { name: 'MySQL / PL/SQL',       icon: 'bx bxs-data',         color: '#4479A1' },
  { name: 'Supabase',             icon: 'bx bx-cloud',         color: '#3ECF8E' },
  { name: 'HTML / CSS / Tailwind',icon: 'bx bxl-html5',        color: '#E34F26' },
  { name: 'Git',                  icon: 'bx bxl-git',          color: '#F05032' },
];

function hexToRgb(hex) {
  const r = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return r ? `${parseInt(r[1],16)},${parseInt(r[2],16)},${parseInt(r[3],16)}` : '99,102,241';
}

export default function Skills({ isDarkMode: dark }) {
  const [hovered, setHovered] = useState(null);

  const muted  = dark ? '#64748b' : '#94a3b8';
  const text   = dark ? '#cbd5e1' : '#475569';
  const accent = dark ? '#818cf8' : '#4f46e5';
  const border = dark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.07)';

  return (
    <>
      <style>{CSS}</style>
      <section id="skills" style={{
        padding: '120px 28px',
        background: dark
          ? 'linear-gradient(180deg,#0d1117 0%,#060812 100%)'
          : 'linear-gradient(180deg,#ffffff 0%,#f8fafc 100%)',
      }}>
        <div style={{ maxWidth: 700, margin: '0 auto' }}>
          <div style={{
            position: 'relative', borderRadius: 24, padding: '40px 36px',
            background: dark
              ? 'linear-gradient(145deg,#0f172a,#1e1b4b 50%,#0f172a)'
              : 'linear-gradient(145deg,#ffffff,#eef2ff 50%,#ffffff)',
            boxShadow: dark
              ? '0 0 0 1px rgba(99,102,241,.2), 0 40px 80px -20px rgba(99,102,241,.3), 0 20px 40px -10px rgba(0,0,0,.5)'
              : '0 0 0 1px rgba(99,102,241,.12), 0 40px 80px -20px rgba(99,102,241,.12), 0 4px 24px rgba(0,0,0,.05)',
          }}>
            <div className="xtr-skills-grad-border"/>

            <div className="xtr-orb-a" style={{
              position: 'absolute', top: -50, right: -30, borderRadius: '50%',
              width: 200, height: 200, pointerEvents: 'none',
              background: dark ? 'rgba(99,102,241,.14)' : 'rgba(99,102,241,.07)',
              filter: 'blur(55px)',
            }}/>
            <div className="xtr-orb-b" style={{
              position: 'absolute', bottom: -40, left: -20, borderRadius: '50%',
              width: 160, height: 160, pointerEvents: 'none',
              background: dark ? 'rgba(139,92,246,.10)' : 'rgba(139,92,246,.06)',
              filter: 'blur(50px)',
            }}/>

            {/* Header */}
            <div style={{ position: 'relative', marginBottom: 28 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                <div style={{ width: 28, height: 3, borderRadius: 99, background: 'linear-gradient(90deg,#6366f1,#a78bfa)' }}/>
                <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: '.10em', textTransform: 'uppercase', color: accent }}>
                  Toolkit
                </span>
              </div>
              <h2 className={`xtr-shimmer-${dark ? 'dark' : 'light'}`}
                style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 28, margin: 0, letterSpacing: '-0.5px' }}>
                Skills & Technologies
              </h2>
              <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 13, color: muted, marginTop: 6 }}>
                Tools I use to bring ideas to life
              </p>
            </div>

            {/* Divider */}
            <div style={{
              height: 1, marginBottom: 28,
              background: dark
                ? 'linear-gradient(90deg,transparent,rgba(99,102,241,.35),transparent)'
                : 'linear-gradient(90deg,transparent,rgba(99,102,241,.18),transparent)',
            }}/>

            {/* Chips */}
            <div style={{ position: 'relative', display: 'flex', flexWrap: 'wrap', gap: 10 }}>
              {SKILLS.map((skill, i) => {
                const isHov = hovered === skill.name;
                return (
                  <div
                    key={skill.name}
                    className="xtr-skill-chip xtr-chip-in"
                    style={{ '--cc': skill.color, animationDelay: `${i * 55}ms` }}
                    onMouseEnter={() => setHovered(skill.name)}
                    onMouseLeave={() => setHovered(null)}
                  >
                    <div style={{
                      fontFamily: "'DM Sans',sans-serif",
                      display: 'flex', alignItems: 'center', gap: 8,
                      padding: '8px 14px', borderRadius: 11,
                      fontSize: 13, fontWeight: 500, cursor: 'pointer',
                      transition: 'all .3s ease',
                      background: isHov
                        ? dark ? `rgba(${hexToRgb(skill.color)},.12)` : `rgba(${hexToRgb(skill.color)},.08)`
                        : dark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.03)',
                      border: `1px solid ${isHov ? `rgba(${hexToRgb(skill.color)},.45)` : border}`,
                      color: isHov ? skill.color : text,
                      transform: isHov ? 'translateY(-2px)' : 'none',
                      boxShadow: isHov ? `0 6px 20px rgba(${hexToRgb(skill.color)},.22)` : 'none',
                    }}>
                      <i className={`xtr-ci ${skill.icon}`} style={{
                        fontSize: 15, transition: 'color .3s',
                        color: isHov ? skill.color : accent,
                      }}/>
                      {skill.name}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Footer */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 28 }}>
              <div style={{ flex: 1, height: 1, background: dark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)' }}/>
              <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 11, color: muted }}>
                {SKILLS.length} technologies
              </span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}