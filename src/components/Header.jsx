"use client";
import { useState, useEffect } from "react";

const NAV_ITEMS = [
  { id: "about", label: "Origin", ch: "01" },
  { id: "skills", label: "Arsenal", ch: "02" },
  { id: "projects", label: "Case Files", ch: "03" },
  { id: "contact", label: "Signal", ch: "04" },
];

// Sun icon for light mode button
function SunIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
    >
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  );
}

// Moon icon for dark mode button
function MoonIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

export default function ComicHeader({ activeSection, dark, onToggleDark }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <>
      <style>{`
        .ch-nav {
          position: fixed; top: 0; left: 0; right: 0; z-index: 100;
          transition: background 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
        }
        .ch-nav.scrolled {
          background: var(--nav-bg);
          border-bottom: 3px solid var(--fg);
          box-shadow: 0 4px 0 rgba(0,0,0,0.06);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
        }
        .ch-inner {
          max-width: 1240px; margin: 0 auto;
          padding: 14px clamp(16px, 4vw, 48px);
          display: flex; align-items: center; justify-content: space-between; gap: 12px;
        }
        .ch-logo {
          font-family: var(--font-comic);
          font-size: 26px;
          letter-spacing: 0.08em;
          color: var(--fg);
          text-decoration: none;
          display: flex; align-items: baseline; gap: 4px;
          flex-shrink: 0;
        }
        .ch-logo-accent { color: var(--red); }
        .ch-issue {
          font-family: var(--font-comic);
          font-size: 10px;
          letter-spacing: 0.16em;
          color: var(--muted);
          padding: 2px 7px;
          border: 2px solid currentColor;
          opacity: 0.5;
          margin-left: 8px;
          vertical-align: middle;
        }

        .ch-links { display: flex; align-items: center; gap: 2px; }
        @media (max-width: 700px) { .ch-links { display: none; } }

        .ch-link {
          display: flex; align-items: center; gap: 5px;
          padding: 7px 13px;
          font-family: var(--font-comic);
          font-size: 15px;
          letter-spacing: 0.07em;
          color: var(--fg);
          text-decoration: none;
          cursor: none;
          border: 2px solid transparent;
          transition: all 0.15s ease;
          background: none;
        }
        .ch-link .ch-num {
          font-family: var(--font-body); font-size: 9px; font-weight: 700;
          letter-spacing: 0.12em; color: var(--muted); margin-right: 1px;
          transition: color 0.15s;
        }
        .ch-link.active, .ch-link:hover {
          background: var(--yellow);
          border-color: var(--fg);
          box-shadow: var(--panel-shadow-sm);
          transform: translate(-1px, -1px);
          color: #0a0a0e;
        }
        .ch-link.active .ch-num, .ch-link:hover .ch-num { color: #0a0a0e; }

        /* Right-side controls */
        .ch-controls {
          display: flex; align-items: center; gap: 8px; flex-shrink: 0;
        }

        /* Dark mode toggle */
        .ch-dark-toggle {
          width: 36px; height: 36px;
          display: flex; align-items: center; justify-content: center;
          border: var(--border-thin);
          box-shadow: var(--panel-shadow-sm);
          background: transparent;
          color: var(--fg);
          cursor: none;
          transition: all 0.15s ease;
          flex-shrink: 0;
        }
        .ch-dark-toggle:hover {
          background: var(--yellow);
          color: #0a0a0e;
          border-color: var(--fg);
          transform: translate(-1px, -1px);
          box-shadow: 4px 4px 0 var(--fg);
        }

        .ch-hire {
          font-family: var(--font-comic);
          font-size: 14px;
          letter-spacing: 0.06em;
          padding: 7px 16px;
          background: var(--red);
          color: white;
          border: var(--border-med);
          box-shadow: var(--panel-shadow-sm);
          cursor: none;
          text-decoration: none;
          transition: transform 0.15s, box-shadow 0.15s;
          white-space: nowrap;
        }
        .ch-hire:hover {
          transform: translate(-2px, -2px);
          box-shadow: 5px 5px 0 var(--fg);
        }

        /* Mobile burger */
        .ch-burger {
          display: none; flex-direction: column; gap: 5px;
          cursor: none; background: none;
          border: 2px solid var(--fg);
          padding: 8px; box-shadow: var(--panel-shadow-sm);
          flex-shrink: 0;
        }
        @media (max-width: 700px) { .ch-burger { display: flex; } }
        .ch-burger span {
          width: 20px; height: 2px; background: var(--fg);
          transition: all 0.2s ease; display: block;
        }
        .ch-burger.open span:nth-child(1) { transform: rotate(45deg) translate(5px, 5px); }
        .ch-burger.open span:nth-child(2) { opacity: 0; }
        .ch-burger.open span:nth-child(3) { transform: rotate(-45deg) translate(5px, -5px); }

        /* Mobile full-screen menu */
        .ch-mobile-menu {
          position: fixed; top: 0; left: 0; right: 0; bottom: 0;
          background: var(--bg); z-index: 99;
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          gap: 10px;
          transform: translateX(100%);
          transition: transform 0.3s cubic-bezier(0.16,1,0.3,1);
        }
        .ch-mobile-menu.open { transform: translateX(0); }

        .ch-mobile-link {
          font-family: var(--font-comic);
          font-size: clamp(2.2rem, 9vw, 3.5rem);
          letter-spacing: 0.06em;
          color: var(--fg); background: none; border: none;
          cursor: none; padding: 8px 28px;
          transition: all 0.15s ease;
          display: block; width: auto;
        }
        .ch-mobile-link:hover, .ch-mobile-link.active {
          background: var(--yellow);
          border: var(--border-med);
          box-shadow: var(--panel-shadow-sm);
          transform: translate(-2px, -2px);
          color: #0a0a0e;
        }

        .ch-mobile-footer {
          margin-top: 24px;
          display: flex; align-items: center; gap: 16px;
        }
        .ch-mobile-issue {
          font-family: var(--font-comic);
          font-size: 10px; letter-spacing: 0.18em; color: var(--muted);
          opacity: 0.4;
        }
      `}</style>

      <header className={`ch-nav${scrolled ? " scrolled" : ""}`}>
        <div className="ch-inner">
          {/* Logo */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="ch-logo"
          >
            XR
            <span className="ch-logo-accent">.</span>
            <span className="ch-issue">ISSUE #001</span>
          </a>

          {/* Desktop nav */}
          <nav className="ch-links">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                className={`ch-link${activeSection === item.id ? " active" : ""}`}
                onClick={() => scrollTo(item.id)}
              >
                <span className="ch-num">{item.ch}</span>
                {item.label}
              </button>
            ))}
          </nav>

          {/* Controls: dark toggle + hire me */}
          <div className="ch-controls">
            <button
              className="ch-dark-toggle"
              onClick={onToggleDark}
              title={dark ? "Light mode" : "Dark mode"}
              aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
            >
              {dark ? <SunIcon /> : <MoonIcon />}
            </button>
            <a href="mailto:xander.rancap8@gmail.com" className="ch-hire">
              Hire Me
            </a>

            {/* Mobile burger */}
            <button
              className={`ch-burger${menuOpen ? " open" : ""}`}
              onClick={() => setMenuOpen((o) => !o)}
              aria-label="Toggle menu"
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <nav className={`ch-mobile-menu${menuOpen ? " open" : ""}`}>
        {NAV_ITEMS.map((item) => (
          <button
            key={item.id}
            className={`ch-mobile-link${activeSection === item.id ? " active" : ""}`}
            onClick={() => scrollTo(item.id)}
          >
            {item.label}
          </button>
        ))}
        <div className="ch-mobile-footer">
          <button
            className="ch-dark-toggle"
            onClick={() => {
              onToggleDark();
              setMenuOpen(false);
            }}
            title={dark ? "Light mode" : "Dark mode"}
          >
            {dark ? <SunIcon /> : <MoonIcon />}
          </button>
          <a href="mailto:xander.rancap8@gmail.com" className="ch-hire">
            Hire Me
          </a>
        </div>
        <div className="ch-mobile-issue">© 2026 XANDER RANCAP</div>
      </nav>
    </>
  );
}
