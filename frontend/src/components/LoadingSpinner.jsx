import React from 'react';

const LoadingSpinner = ({ message = 'Loading...' }) => (
  <div className="flex flex-col items-center justify-center py-20 gap-4 animate-fade-in">
    <div className="relative w-12 h-12">
      <div className="absolute inset-0 rounded-full border-2 border-ink-200 dark:border-ink-800" />
      <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-ink-700 dark:border-t-amber-500 animate-spin" />
    </div>
    <p className="text-sm text-ink-400 dark:text-ink-600 font-body">{message}</p>
  </div>
);

export default LoadingSpinner;
