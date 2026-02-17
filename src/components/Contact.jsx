'use client';

import { useState } from 'react';

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500&display=swap');

  @keyframes xtr-shimmer {
    0%   { background-position: -200% center; }
    100% { background-position:  200% center; }
  }
  @keyframes xtr-orb-c {
    0%,100% { transform: translate(0,0) scale(1); }
    50%     { transform: translate(25px,-18px) scale(1.04); }
  }
  @keyframes xtr-fade-up {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .xtr-contact-fade { animation: xtr-fade-up .6s ease both; }
  .xtr-orb-c        { animation: xtr-orb-c 11s ease-in-out infinite; }

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

export default function Contact({ isDarkMode: dark }) {
  const muted   = dark ? '#64748b' : '#94a3b8';
  const text    = dark ? '#e2e8f0' : '#1e293b';
  const accent  = dark ? '#818cf8' : '#4f46e5';
  const accentHi = dark ? '#a5b4fc' : '#6366f1';
  const border  = dark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.07)';
  const bg      = dark
    ? 'linear-gradient(180deg,#0d1117 0%,#060812 100%)'
    : 'linear-gradient(180deg,#f8fafc 0%,#eef2ff 100%)';

  return (
    <>
      <style>{CSS}</style>
      <section id="contact" style={{ padding: '120px 28px 80px', background: bg, position: 'relative', overflow: 'hidden' }}>
        {/* Orbs */}
        <div className="xtr-orb-c" style={{
          position: 'absolute', top: '15%', right: '5%',
          width: 350, height: 350, borderRadius: '50%', pointerEvents: 'none',
          background: dark ? 'rgba(99,102,241,.09)' : 'rgba(99,102,241,.06)',
          filter: 'blur(80px)',
        }}/>
        <div style={{
          position: 'absolute', bottom: '10%', left: '3%',
          width: 280, height: 280, borderRadius: '50%', pointerEvents: 'none',
          background: dark ? 'rgba(139,92,246,.07)' : 'rgba(139,92,246,.05)',
          filter: 'blur(70px)',
        }}/>

        <div style={{ maxWidth: 700, margin: '0 auto', position: 'relative', textAlign: 'center' }}>
          {/* Label */}
          <div className="xtr-contact-fade" style={{ animationDelay: '0ms',
            display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
            <div style={{ width: 28, height: 3, borderRadius: 99, background: 'linear-gradient(90deg,#6366f1,#a78bfa)' }}/>
            <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: '.10em', textTransform: 'uppercase', color: accent }}>
              Contact
            </span>
            <div style={{ width: 28, height: 3, borderRadius: 99, background: 'linear-gradient(90deg,#a78bfa,#6366f1)' }}/>
          </div>

          <h2 className={`xtr-contact-fade xtr-shimmer-${dark ? 'dark' : 'light'}`}
            style={{
              animationDelay: '60ms',
              fontFamily: "'Syne',sans-serif", fontWeight: 800,
              fontSize: 'clamp(2rem,4vw,3rem)', margin: '0 0 16px', letterSpacing: '-1px',
            }}>
            Let's Work Together
          </h2>
          <p className="xtr-contact-fade" style={{
            animationDelay: '120ms',
            fontFamily: "'DM Sans',sans-serif", fontSize: 16, color: muted,
            margin: '0 0 48px', lineHeight: 1.7,
          }}>
            I'm open to new opportunities and collaborations.<br/>
            Feel free to reach out — I'd love to connect.
          </p>

          {/* Contact cards */}
          <div className="xtr-contact-fade" style={{
            animationDelay: '200ms',
            display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 16, marginBottom: 64,
          }}>
            <ContactCard
              dark={dark} border={border} text={text} muted={muted} accent={accent}
              href="mailto:xandertrancap08@gmail.com"
              icon="✉"
              label="Email"
              value="xandertrancap08@gmail.com"
              accentColor="#818cf8"
              clickable
            />
            <ContactCard
              dark={dark} border={border} text={text} muted={muted} accent={accent}
              icon="◎"
              label="Location"
              value="Calgary, AB 🇨🇦"
              accentColor="#4ade80"
              clickable={false}
            />
          </div>

          {/* Social row */}
          <div className="xtr-contact-fade" style={{ animationDelay: '280ms',
            display: 'flex', justifyContent: 'center', gap: 16, marginBottom: 60 }}>
            {[
              { icon: 'bx bxl-linkedin',  url: 'https://www.linkedin.com/in/xander-rancap-79b2a0326/', label: 'LinkedIn' },
              { icon: 'bx bxl-github',    url: 'https://github.com/xndrncp08',                         label: 'GitHub' },
              { icon: 'bx bxl-instagram', url: 'https://www.instagram.com/derbadoobeelat/',            label: 'Instagram' },
            ].map(s => (
              <SocialPill key={s.icon} dark={dark} border={border} muted={muted} accentHi={accentHi} {...s}/>
            ))}
          </div>

          {/* Footer */}
          <div style={{
            borderTop: `1px solid ${border}`,
            paddingTop: 28,
          }}>
            <p style={{
              fontFamily: "'DM Sans',sans-serif",
              fontSize: 13, color: dark ? '#1e293b' : '#d1d5db',
              margin: 0,
            }}>
              © 2026 Xander Rancap · Built with Next.js & Tailwind CSS
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

function ContactCard({ href, icon, label, value, accentColor, dark, border, text, muted, clickable }) {
  const [hov, setHov] = useState(false);
  const rgb = hexToRgb(accentColor);

  const inner = (
    <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        display: 'flex', alignItems: 'center', gap: 16,
        padding: '18px 28px', borderRadius: 16,
        background: hov
          ? dark ? `rgba(${rgb},.10)` : `rgba(${rgb},.06)`
          : dark ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.9)',
        border: `1px solid ${hov ? `rgba(${rgb},.4)` : border}`,
        boxShadow: hov ? `0 10px 36px rgba(${rgb},.2)` : `0 2px 12px rgba(0,0,0,${dark ? '.2' : '.04'})`,
        transition: 'all .3s ease',
        transform: hov ? 'translateY(-3px)' : 'none',
        cursor: clickable ? 'pointer' : 'default',
        textDecoration: 'none',
        minWidth: 260,
      }}>
      <div style={{
        width: 44, height: 44, borderRadius: 12, flexShrink: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 20,
        background: `rgba(${rgb},.14)`,
        border: `1px solid rgba(${rgb},.25)`,
        color: accentColor,
      }}>{icon}</div>
      <div style={{ textAlign: 'left' }}>
        <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 11, color: muted, letterSpacing: '0.05em', textTransform: 'uppercase', fontWeight: 500, marginBottom: 3 }}>
          {label}
        </div>
        <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 14, fontWeight: 600, color: hov ? accentColor : text, transition: 'color .3s' }}>
          {value}
        </div>
      </div>
    </div>
  );

  return clickable
    ? <a href={href} style={{ textDecoration: 'none' }}>{inner}</a>
    : inner;
}

function SocialPill({ icon, url, label, dark, border, muted, accentHi }) {
  const [hov, setHov] = useState(false);
  return (
    <a href={url} target="_blank" rel="noreferrer"
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        display: 'flex', alignItems: 'center', gap: 8,
        padding: '9px 18px', borderRadius: 99, textDecoration: 'none',
        background: hov ? 'rgba(99,102,241,0.12)' : 'transparent',
        border: `1px solid ${hov ? 'rgba(99,102,241,0.45)' : border}`,
        color: hov ? accentHi : muted,
        fontFamily: "'DM Sans',sans-serif", fontSize: 13, fontWeight: 500,
        transition: 'all .25s', transform: hov ? 'translateY(-2px)' : 'none',
      }}>
      <i className={`${icon}`} style={{ fontSize: 16 }}/>
      {label}
    </a>
  );
}

function hexToRgb(hex) {
  const r = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return r ? `${parseInt(r[1],16)},${parseInt(r[2],16)},${parseInt(r[3],16)}` : '99,102,241';
}