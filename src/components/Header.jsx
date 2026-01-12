'use client';

import { FiSun, FiMoon } from 'react-icons/fi';

function Header({ isDarkMode, toggleDarkMode }) {
  return (
    <header
      className={`fixed top-0 w-full z-50 ${
        isDarkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white/80 border-slate-200'
      } backdrop-blur-md border-b transition-all`}
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
                className={`${
                  isDarkMode
                    ? 'text-slate-300 hover:text-white'
                    : 'text-slate-600 hover:text-slate-900'
                } transition-colors font-medium`}
              >
                {item}
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
          } transition-all`}
        >
          {isDarkMode ? <FiSun /> : <FiMoon />}
        </button>
      </nav>
    </header>
  );
}

export default Header;
