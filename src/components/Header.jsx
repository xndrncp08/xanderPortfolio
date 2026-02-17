'use client';

import { useState, useEffect } from 'react';

const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500&display=swap');`;

const CSS = `
  ${FONTS}
  .xtr-nav-pill::after {
    content: '';
    position: absolute; bottom: -4px; left: 0; right: 0;
    height: 2px; border-radius: 9px;
    background: linear-gradient(90deg,#6366f1,#a78bfa);
    transform-origin: left;
    animation: xtr-grow .3s ease;
  }
  @keyframes xtr-grow {
    from { transform: scaleX(0); }
    to   { transform: scaleX(1); }
  }
`;

export default function Header({ isDarkMode, toggleDarkMode, activeSection }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', h);
    return () => window.removeEventListener('scroll', h);
  }, []);

  const nav = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  const muted   = isDarkMode ? '#64748b' : '#94a3b8';
  const textHi  = isDarkMode ? '#e2e8f0' : '#1e293b';
  const accent  = '#a5b4fc';
  const border  = isDarkMode ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.07)';

  return (
    <>
      <style>{CSS}</style>
      <header style={{
        position: 'fixed', top: 0, width: '100%', zIndex: 100,
        backdropFilter: 'blur(20px)',
        background: scrolled
          ? isDarkMode ? 'rgba(6,8,18,0.94)' : 'rgba(248,250,252,0.94)'
          : isDarkMode ? 'rgba(6,8,18,0.5)'  : 'rgba(248,250,252,0.5)',
        borderBottom: `1px solid ${scrolled ? border : 'transparent'}`,
        boxShadow: scrolled ? `0 4px 40px rgba(0,0,0,${isDarkMode ? '.5' : '.06'})` : 'none',
        transition: 'all .4s ease',
      }}>
        <nav style={{
          maxWidth: 1100, margin: '0 auto', padding: '0 28px',
          height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          {/* Logo */}
          <div style={{
            fontFamily: "'Syne', sans-serif", fontSize: 22, fontWeight: 800, letterSpacing: '-0.5px',
            background: 'linear-gradient(135deg,#818cf8,#c4b5fd)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          }}>XTR</div>

          {/* Links */}
          <ul style={{ display: 'flex', gap: 36, listStyle: 'none', margin: 0, padding: 0 }}>
            {['About','Skills','Projects','Contact'].map(item => {
              const isActive = activeSection === item.toLowerCase();
              return (
                <li key={item}>
                  <NavBtn
                    isActive={isActive}
                    muted={muted} textHi={textHi} accent={accent}
                    onClick={() => nav(item.toLowerCase())}
                  >{item}</NavBtn>
                </li>
              );
            })}
          </ul>

          {/* Toggle */}
          <button onClick={toggleDarkMode} style={{
            background: isDarkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)',
            border: `1px solid ${border}`,
            borderRadius: 10, width: 38, height: 38,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', fontSize: 16,
            color: muted, transition: 'all .25s',
            fontFamily: 'sans-serif',
          }}
            onMouseEnter={e => { e.currentTarget.style.color = accent; e.currentTarget.style.borderColor = 'rgba(99,102,241,0.5)'; }}
            onMouseLeave={e => { e.currentTarget.style.color = muted; e.currentTarget.style.borderColor = border; }}
          >
            {isDarkMode ? '☀' : '☾'}
          </button>
        </nav>
      </header>
    </>
  );
}

function NavBtn({ children, isActive, muted, textHi, accent, onClick }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onClick={onClick}
      className={isActive ? 'xtr-nav-pill' : ''}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        position: 'relative', background: 'none', border: 'none',
        cursor: 'pointer', fontSize: 14, fontWeight: 500,
        fontFamily: "'DM Sans', sans-serif", letterSpacing: '0.01em',
        color: isActive ? accent : hov ? textHi : muted,
        transition: 'color .25s', padding: '4px 0',
      }}
    >{children}</button>
  );
}