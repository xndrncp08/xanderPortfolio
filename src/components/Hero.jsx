'use client';

import { useState } from 'react';

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500&display=swap');

  @keyframes xtr-shimmer {
    0%   { background-position: -200% center; }
    100% { background-position:  200% center; }
  }
  @keyframes xtr-orb1 {
    0%,100% { transform: translate(0,0) scale(1); }
    33%     { transform: translate(40px,-30px) scale(1.06); }
    66%     { transform: translate(-25px,20px) scale(0.96); }
  }
  @keyframes xtr-orb2 {
    0%,100% { transform: translate(0,0) scale(1); }
    33%     { transform: translate(-30px,22px) scale(1.04); }
    66%     { transform: translate(18px,-14px) scale(0.98); }
  }
  @keyframes xtr-float {
    0%,100% { transform: translateY(0); }
    50%     { transform: translateY(-8px); }
  }
  @keyframes xtr-pulse {
    0%   { transform: scale(0.95); opacity: .6; }
    70%  { transform: scale(1.1);  opacity: 0; }
    100% { transform: scale(0.95); opacity: 0; }
  }
  @keyframes xtr-fade-up {
    from { opacity: 0; transform: translateY(22px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes xtr-fade-in {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  .xtr-fade-up  { animation: xtr-fade-up  0.6s ease both; }
  .xtr-fade-in  { animation: xtr-fade-in  0.8s ease both; }
  .xtr-float    { animation: xtr-float    3s ease-in-out infinite; }
  .xtr-orb1     { animation: xtr-orb1    12s ease-in-out infinite; }
  .xtr-orb2     { animation: xtr-orb2    15s ease-in-out infinite; }
  .xtr-pulse    { animation: xtr-pulse   2.5s ease-out infinite; }

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

  .xtr-hero-grid {
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 64px;
    align-items: center;
  }
  .xtr-hero-avatar { display: block; }

  @media (max-width: 768px) {
    .xtr-hero-grid {
      grid-template-columns: 1fr;
      gap: 40px;
      text-align: center;
    }
    .xtr-hero-avatar {
      order: -1;
      display: flex;
      justify-content: center;
    }
    .xtr-hero-badge   { justify-content: center; }
    .xtr-hero-role    { justify-content: center; }
    .xtr-hero-btns    { justify-content: center; }
    .xtr-hero-socials { justify-content: center; }
    .xtr-hero-bio     { margin-left: auto !important; margin-right: auto !important; text-align: center; }
    .xtr-hero-name    { font-size: clamp(2rem, 10vw, 3.4rem) !important; letter-spacing: -1px !important; }
    .xtr-role-line    { display: none; }
    .xtr-hero-role    { justify-content: center; gap: 8px; }
  }
`;

export default function Hero({ isDarkMode: dark }) {
  const muted    = dark ? '#64748b' : '#94a3b8';
  const text     = dark ? '#e2e8f0' : '#1e293b';
  const accent   = dark ? '#818cf8' : '#4f46e5';
  const accentHi = dark ? '#a5b4fc' : '#6366f1';
  const bg       = dark ? '#060812' : '#f8fafc';
  const surface  = dark ? '#0d1117' : '#ffffff';
  const border   = dark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.07)';

  return (
    <>
      <style>{CSS}</style>
      <section style={{
        minHeight: '100vh',
        background: dark
          ? `radial-gradient(ellipse 80% 60% at 65% 40%, rgba(99,102,241,.13) 0%, transparent 68%), ${bg}`
          : `radial-gradient(ellipse 80% 60% at 65% 40%, rgba(99,102,241,.07) 0%, transparent 68%), ${bg}`,
        display: 'flex', alignItems: 'center',
        padding: '100px 24px 60px',
        position: 'relative', overflow: 'hidden',
      }}>
        {/* Orbs */}
        <div className="xtr-orb1" style={{
          position: 'absolute', top: '8%', right: '4%',
          width: 440, height: 440, borderRadius: '50%',
          background: dark ? 'rgba(99,102,241,.10)' : 'rgba(99,102,241,.06)',
          filter: 'blur(90px)', pointerEvents: 'none',
        }}/>
        <div className="xtr-orb2" style={{
          position: 'absolute', bottom: '4%', left: '-6%',
          width: 340, height: 340, borderRadius: '50%',
          background: dark ? 'rgba(139,92,246,.08)' : 'rgba(139,92,246,.05)',
          filter: 'blur(80px)', pointerEvents: 'none',
        }}/>

        <div style={{ maxWidth: 1100, margin: '0 auto', width: '100%' }}>
          <div className="xtr-hero-grid">
            {/* Left */}
            <div>
              {/* Heading */}
              <h1
                className={`xtr-fade-up xtr-hero-name ${dark ? 'xtr-shimmer-dark' : 'xtr-shimmer-light'}`}
                style={{
                  animationDelay: '80ms',
                  fontFamily: "'Syne',sans-serif", fontWeight: 800,
                  fontSize: 'clamp(2.4rem,6vw,5.2rem)',
                  lineHeight: 1.06, letterSpacing: '-2px', margin: '0 0 18px',
                }}>
                Xander Rancap
              </h1>

              {/* Role */}
              <div className="xtr-fade-up xtr-hero-role" style={{
                animationDelay: '120ms',
                display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24,
              }}>
                <div className="xtr-role-line" style={{ height: 1, width: 36, background: `linear-gradient(90deg,transparent,${accentHi})` }}/>
                <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 16, color: accent, fontWeight: 500, letterSpacing: '0.04em' }}>
                  Software Developer
                </span>
              </div>

              {/* Bio */}
              <p className="xtr-fade-up xtr-hero-bio" style={{
                animationDelay: '160ms',
                fontFamily: "'DM Sans',sans-serif", fontSize: 17, lineHeight: 1.8,
                color: muted, maxWidth: 500, margin: '0 auto 36px',
              }}>
                Building elegant, full-stack solutions with modern technologies.
                Currently studying at SAIT with a passion for clean code and great UX.
              </p>

              {/* Buttons */}
              <div className="xtr-fade-up xtr-hero-btns" style={{
                animationDelay: '260ms', display: 'flex', gap: 14, flexWrap: 'wrap',
              }}>
                <PrimaryBtn onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
                  Get in Touch →
                </PrimaryBtn>
                <GhostBtn dark={dark} border={border} muted={muted} accentHi={accentHi}
                  onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}>
                  View Work
                </GhostBtn>
              </div>

              {/* Socials */}
              <div className="xtr-fade-up xtr-hero-socials" style={{
                animationDelay: '330ms', display: 'flex', gap: 20, marginTop: 36,
              }}>
                {[
                  { icon: 'bx bxl-linkedin',  url: 'https://www.linkedin.com/in/xander-rancap-79b2a0326/' },
                  { icon: 'bx bxl-github',    url: 'https://github.com/xndrncp08' },
                  { icon: 'bx bxl-instagram', url: 'https://www.instagram.com/derbadoobeelat/' },
                ].map(s => (
                  <a key={s.icon} href={s.url} target="_blank" rel="noreferrer"
                    style={{ fontSize: 22, color: muted, transition: 'all .25s', lineHeight: 1, display: 'block' }}
                    onMouseEnter={e => { e.currentTarget.style.color = accentHi; e.currentTarget.style.transform = 'translateY(-3px)'; }}
                    onMouseLeave={e => { e.currentTarget.style.color = muted; e.currentTarget.style.transform = 'none'; }}>
                    <i className={s.icon}/>
                  </a>
                ))}
              </div>
            </div>

            {/* Avatar */}
            <div className="xtr-hero-avatar">
              <div className="xtr-float xtr-fade-in" style={{ animationDelay: '200ms', position: 'relative' }}>
                <div style={{
                  position: 'absolute', inset: -3, borderRadius: 28,
                  background: 'linear-gradient(135deg,#6366f1,#a78bfa,#6366f1)',
                  backgroundSize: '200% 200%',
                  animation: 'xtr-shimmer 4s linear infinite',
                }}/>
                <div className="xtr-pulse" style={{
                  position: 'absolute', inset: -10, borderRadius: 28,
                  border: '2px solid rgba(99,102,241,.4)',
                }}/>
                <img
                  src="https://i.postimg.cc/9XZ3Yb9d/4f02800d-1c87-4bcd-aaa7-513405cf2e63.png"
                  alt="Xander Rancap"
                  style={{
                    position: 'relative', display: 'block',
                    width: 240, height: 240, objectFit: 'cover',
                    borderRadius: 24,
                    border: `3px solid ${surface}`,
                  }}
                />
                {/* Badge */}
                <div style={{
                  position: 'absolute', bottom: -16, left: '50%', transform: 'translateX(-50%)',
                  background: dark ? 'rgba(13,17,23,0.96)' : 'rgba(255,255,255,0.96)',
                  border: `1px solid ${border}`,
                  borderRadius: 99, padding: '6px 16px',
                  display: 'flex', alignItems: 'center', gap: 8, whiteSpace: 'nowrap',
                  boxShadow: '0 8px 28px rgba(0,0,0,.2)',
                }}>
                  <i className="bx bxl-github" style={{ fontSize: 14, color: accent }}/>
                  <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 12, fontWeight: 500, color: text }}>xndrncp08</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function PrimaryBtn({ children, onClick }) {
  const [hov, setHov] = useState(false);
  return (
    <button onClick={onClick}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        fontFamily: "'DM Sans',sans-serif", fontWeight: 600, fontSize: 14,
        padding: '12px 26px', borderRadius: 12, border: 'none',
        cursor: 'pointer', transition: 'all .25s', color: '#fff',
        background: hov ? 'linear-gradient(135deg,#4f46e5,#7c3aed)' : 'linear-gradient(135deg,#6366f1,#8b5cf6)',
        boxShadow: hov ? '0 8px 32px rgba(99,102,241,.55)' : '0 4px 18px rgba(99,102,241,.3)',
        transform: hov ? 'translateY(-2px)' : 'none',
      }}>{children}</button>
  );
}

function GhostBtn({ children, dark, border, muted, accentHi, onClick }) {
  const [hov, setHov] = useState(false);
  return (
    <button onClick={onClick}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        fontFamily: "'DM Sans',sans-serif", fontWeight: 600, fontSize: 14,
        padding: '12px 26px', borderRadius: 12, background: 'transparent',
        cursor: 'pointer', transition: 'all .25s',
        color: hov ? accentHi : muted,
        border: `1px solid ${hov ? 'rgba(99,102,241,0.55)' : border}`,
        transform: hov ? 'translateY(-2px)' : 'none',
      }}>{children}</button>
  );
}