import React, { useState, useEffect } from 'react';

const SearchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M21 21l-4.35-4.35M17 11A6 6 0 105 11a6 6 0 0012 0z" />
  </svg>
);

/**
 * Debounced search bar component
 */
const SearchBar = ({ value, onChange }) => {
  const [local, setLocal] = useState(value);

  // Debounce: wait 400ms before updating parent
  useEffect(() => {
    const timer = setTimeout(() => onChange(local), 400);
    return () => clearTimeout(timer);
  }, [local, onChange]);

  // Sync if parent resets value
  useEffect(() => {
    setLocal(value);
  }, [value]);

  return (
    <div className="relative">
      <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-400 dark:text-ink-500 pointer-events-none">
        <SearchIcon />
      </div>
      <input
        type="text"
        value={local}
        onChange={(e) => setLocal(e.target.value)}
        placeholder="Search notes…"
        className="input-field pl-10 pr-4 py-2.5 text-sm"
      />
      {local && (
        <button
          onClick={() => { setLocal(''); onChange(''); }}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-400 hover:text-ink-700 dark:hover:text-ink-200 transition-colors text-lg leading-none"
        >
          ×
        </button>
      )}
    </div>
  );
};

export default SearchBar;
