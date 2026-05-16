import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => (
  <main className="max-w-md mx-auto px-4 py-24 text-center animate-fade-in">
    <p className="font-mono text-8xl font-bold text-ink-200 dark:text-ink-800 select-none">404</p>
    <h1 className="font-display font-bold text-2xl text-ink-800 dark:text-ink-200 mt-4 mb-2">
      Page not found
    </h1>
    <p className="text-ink-500 dark:text-ink-500 text-sm mb-8">
      The page you're looking for doesn't exist or was moved.
    </p>
    <Link to="/" className="btn-primary">← Back to notes</Link>
  </main>
);

export default NotFoundPage;
