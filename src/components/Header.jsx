'use client';
import { useState, useEffect, useRef } from 'react';

const CSS = `
  @keyframes nav-float {
    0%,100% { transform: translateX(-50%) translateY(0px); }
    50%      { transform: translateX(-50%) translateY(-3px); }
  }
  @keyframes nav-glow-pulse {
    0%,100% { box-shadow: 0 8px 40px rgba(0,0,0,0.6), 0 0 0 1px rgba(225,6,0,0.15), inset 0 1px 0 rgba(255,255,255,0.08); }
    50%      { box-shadow: 0 12px 60px rgba(0,0,0,0.8), 0 0 0 1px rgba(225,6,0,0.4), 0 0 30px rgba(225,6,0,0.15), inset 0 1px 0 rgba(255,255,255,0.08); }
  }
  @keyframes indicator-slide {
    from { opacity:0; transform:scaleX(0); }
    to   { opacity:1; transform:scaleX(1); }
  }
  @keyframes drawer-in {
    from { opacity:0; transform:translateY(-10px); }
    to   { opacity:1; transform:translateY(0); }
  }

  .nav-pill {
    position: fixed;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 1000;
    animation: nav-float 4s ease-in-out infinite, nav-glow-pulse 3s ease-in-out infinite;
    transition: all 0.4s cubic-bezier(0.16,1,0.3,1);
  }

  .nav-pill-inner {
    display: flex;
    align-items: center;
    gap: 4px;
    padding: 6px 8px 6px 12px;
    border-radius: 999px;
    background: rgba(8,8,12,0.85);
    backdrop-filter: blur(32px) saturate(200%);
    -webkit-backdrop-filter: blur(32px) saturate(200%);
    border: 1px solid rgba(255,255,255,0.1);
    white-space: nowrap;
  }

  .nav-logo-text {
    font-family: 'Orbitron', sans-serif;
    font-weight: 900;
    font-size: 14px;
    letter-spacing: 0.08em;
    background: linear-gradient(135deg, #F2F2F2, #E10600);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin-right: 8px;
    padding-right: 12px;
    border-right: 1px solid rgba(255,255,255,0.1);
  }

  .nav-item {
    position: relative;
    background: none;
    border: none;
    cursor: none;
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    padding: 7px 14px;
    border-radius: 999px;
    color: rgba(255,255,255,0.45);
    transition: all 0.25s ease;
  }
  .nav-item:hover { color: rgba(255,255,255,0.9); }
  .nav-item.active {
    color: #fff;
    background: rgba(225,6,0,0.15);
    box-shadow: inset 0 0 0 1px rgba(225,6,0,0.3), 0 0 16px rgba(225,6,0,0.2);
  }

  .nav-hire {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 11px;
    font-weight: 800;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    padding: 8px 16px;
    border-radius: 999px;
    background: linear-gradient(135deg, #E10600, #FF3A2D);
    color: #fff;
    border: none;
    cursor: none;
    text-decoration: none;
    margin-left: 4px;
    display: inline-flex;
    align-items: center;
    gap: 5px;
    transition: all 0.2s;
    box-shadow: 0 0 20px rgba(225,6,0,0.35);
  }
  .nav-hire:hover {
    transform: scale(1.05);
    box-shadow: 0 0 32px rgba(225,6,0,0.6);
  }

  .nav-hamburger {
    display: none;
    flex-direction: column;
    gap: 4px;
    background: none;
    border: none;
    cursor: none;
    padding: 8px;
    border-radius: 50%;
    transition: background 0.2s;
  }
  .nav-hamburger span {
    display: block;
    width: 18px; height: 1.5px;
    background: rgba(255,255,255,0.5);
    border-radius: 1px;
    transition: all 0.3s;
  }
  .nav-hamburger.open span:nth-child(1) { transform: translateY(5.5px) rotate(45deg); background: #E10600; }
  .nav-hamburger.open span:nth-child(2) { opacity: 0; }
  .nav-hamburger.open span:nth-child(3) { transform: translateY(-5.5px) rotate(-45deg); background: #E10600; }

  .nav-links-desktop { display: flex; align-items: center; gap: 2px; }

  @media (max-width: 640px) {
    .nav-links-desktop { display: none !important; }
    .nav-hamburger { display: flex !important; }
    .nav-hire-desktop { display: none !important; }
  }

  .nav-drawer {
    position: fixed;
    top: 80px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 999;
    animation: drawer-in 0.3s cubic-bezier(0.16,1,0.3,1);
    min-width: 220px;
  }
  .nav-drawer-inner {
    background: rgba(6,6,10,0.95);
    backdrop-filter: blur(40px);
    -webkit-backdrop-filter: blur(40px);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 20px;
    padding: 8px;
    box-shadow: 0 24px 80px rgba(0,0,0,0.8), 0 0 0 1px rgba(225,6,0,0.1);
    overflow: hidden;
  }
  .nav-drawer-inner::before {
    content: '';
    position: absolute;
    top: 0; left: 10%; right: 10%; height: 1px;
    background: linear-gradient(90deg, transparent, rgba(225,6,0,0.5), transparent);
  }
  .nav-drawer-item {
    display: block; width: 100%;
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 14px; font-weight: 700; letter-spacing: 0.14em;
    text-transform: uppercase;
    padding: 13px 20px;
    background: none; border: none; cursor: none;
    color: rgba(255,255,255,0.5);
    text-align: left;
    border-radius: 12px;
    transition: all 0.2s;
  }
  .nav-drawer-item:hover, .nav-drawer-item.active { color: #fff; background: rgba(225,6,0,0.12); }

  /* Red dot indicator */
  .nav-status-dot {
    width: 5px; height: 5px; border-radius: 50%;
    background: #E10600;
    box-shadow: 0 0 8px #E10600;
    animation: border-glow 2s ease-in-out infinite;
    flex-shrink: 0;
    margin-right: 2px;
  }
`;

export default function Header({ activeSection }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', h);
    return () => window.removeEventListener('scroll', h);
  }, []);

  const nav = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };
  const NAV = ['About', 'Skills', 'Projects', 'Contact'];

  return (
    <>
      <style>{CSS}</style>
      <div className="nav-pill">
        <div className="nav-pill-inner">
          {/* Status dot */}
          <div className="nav-status-dot" />

          {/* Logo */}
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} style={{ background: 'none', border: 'none', cursor: 'none', padding: 0 }}>
            <span className="nav-logo-text">XTR</span>
          </button>

          {/* Desktop nav */}
          <nav className="nav-links-desktop">
            {NAV.map(item => (
              <button
                key={item}
                className={`nav-item${activeSection === item.toLowerCase() ? ' active' : ''}`}
                onClick={() => nav(item.toLowerCase())}
              >{item}</button>
            ))}
          </nav>

          {/* Hire CTA */}
          <a href="mailto:xandertrancap08@gmail.com" className="nav-hire nav-hire-desktop">
            Hire Me
            <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
              <path d="M6 1l3 3.5L6 8M9 4.5H1" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </a>

          {/* Hamburger (mobile) */}
          <button className={`nav-hamburger${menuOpen ? ' open' : ''}`} onClick={() => setMenuOpen(o => !o)} aria-label="Menu">
            <span/><span/><span/>
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {menuOpen && (
        <div className="nav-drawer">
          <div className="nav-drawer-inner" style={{ position: 'relative' }}>
            {NAV.map(item => (
              <button key={item} className={`nav-drawer-item${activeSection === item.toLowerCase() ? ' active' : ''}`} onClick={() => nav(item.toLowerCase())}>
                {item}
              </button>
            ))}
            <a href="mailto:xandertrancap08@gmail.com"
              style={{ display:'block', margin:'8px 8px 0', padding:'13px 20px', background:'linear-gradient(135deg,#E10600,#FF3A2D)', borderRadius:12, fontFamily:"'Barlow Condensed',sans-serif", fontSize:13, fontWeight:800, letterSpacing:'0.14em', textTransform:'uppercase', color:'#fff', textDecoration:'none', textAlign:'center', cursor:'none' }}>
              Hire Me ↗
            </a>
          </div>
        </div>
      )}
    </>
  );
}
