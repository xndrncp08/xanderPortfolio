'use client';

import { useState, useEffect } from 'react';
import { FiSun, FiMoon } from 'react-icons/fi';

function Header({ isDarkMode, toggleDarkMode, activeSection }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? isDarkMode
            ? 'bg-slate-900/95 border-slate-800 shadow-lg'
            : 'bg-white/95 border-slate-200 shadow-lg'
          : isDarkMode
          ? 'bg-slate-900/80 border-slate-800'
          : 'bg-white/80 border-slate-200'
      } backdrop-blur-md border-b`}
    >
      <nav className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <div className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
          XR
        </div>

        <ul className="flex gap-8">
          {['About', 'Skills', 'Projects', 'Contact'].map((item) => (
            <li key={item}>
              <button
                onClick={() =>
                  document
                    .getElementById(item.toLowerCase())
                    ?.scrollIntoView({ behavior: 'smooth' })
                }
                className={`relative ${
                  activeSection === item.toLowerCase()
                    ? isDarkMode
                      ? 'text-blue-400'
                      : 'text-blue-600'
                    : isDarkMode
                    ? 'text-slate-300 hover:text-white'
                    : 'text-slate-600 hover:text-slate-900'
                } transition-colors font-medium`}
              >
                {item}
                {activeSection === item.toLowerCase() && (
                  <span className={`absolute -bottom-1 left-0 w-full h-0.5 ${isDarkMode ? 'bg-blue-400' : 'bg-blue-600'}`} />
                )}
              </button>
            </li>
          ))}
        </ul>

        <button
          onClick={toggleDarkMode}
          aria-label="Toggle dark mode"
          className={`text-2xl ${
            isDarkMode
              ? 'text-slate-300 hover:text-white'
              : 'text-slate-600 hover:text-slate-900'
          } transition-all hover:scale-110`}
        >
          {isDarkMode ? <FiSun /> : <FiMoon />}
        </button>
      </nav>
    </header>
  );
}

export default Header;