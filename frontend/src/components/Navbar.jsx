import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDarkMode } from '../context/DarkModeContext';

const SunIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
      d="M12 3v1m0 16v1m8-9h1M3 12H2m15.36-6.36l.71-.71M5.93 18.07l-.71.71M18.07 18.07l.71.71M5.93 5.93l-.71-.71M17 12a5 5 0 11-10 0 5 5 0 0110 0z" />
  </svg>
);

const MoonIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
      d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
  </svg>
);

const PlusIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
  </svg>
);

const Navbar = () => {
  const { darkMode, toggleDarkMode } = useDarkMode();
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <header className="sticky top-0 z-40 bg-white/80 dark:bg-ink-950/80 backdrop-blur-md border-b border-ink-100 dark:border-ink-800">
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <span className="text-2xl font-display font-bold text-ink-900 dark:text-ink-50 tracking-tight">
            Simple<span className="text-amber-500">.</span>Notes
          </span>
        </Link>

        {/* Actions */}
        <div className="flex items-center gap-3">
          {/* Dark mode toggle */}
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-xl text-ink-500 dark:text-ink-400 hover:bg-ink-100 dark:hover:bg-ink-800 transition-colors"
            aria-label="Toggle dark mode"
          >
            {darkMode ? <SunIcon /> : <MoonIcon />}
          </button>

          {/* New Note button — only on home */}
          {isHome && (
            <Link to="/new" className="btn-primary flex items-center gap-2 text-sm">
              <PlusIcon />
              <span className="hidden sm:inline">New Note</span>
            </Link>
          )}

          {/* Back button on other pages */}
          {!isHome && (
            <Link to="/" className="btn-secondary text-sm">
              ← Back
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
