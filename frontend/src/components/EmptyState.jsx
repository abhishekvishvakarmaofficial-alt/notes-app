import React from 'react';
import { Link } from 'react-router-dom';

const EmptyState = ({ hasSearch }) => (
  <div className="flex flex-col items-center justify-center py-24 gap-5 animate-fade-in">
    {/* Decorative icon */}
    <div className="w-20 h-20 rounded-3xl bg-ink-100 dark:bg-ink-800 flex items-center justify-center text-4xl">
      {hasSearch ? '🔍' : '📝'}
    </div>

    <div className="text-center">
      <h3 className="font-display font-semibold text-xl text-ink-800 dark:text-ink-200 mb-2">
        {hasSearch ? 'No notes found' : 'No notes yet'}
      </h3>
      <p className="text-ink-500 dark:text-ink-500 text-sm max-w-xs">
        {hasSearch
          ? 'Try a different search term or clear the search to see all notes.'
          : 'Start capturing your thoughts. Create your first note!'}
      </p>
    </div>

    {!hasSearch && (
      <Link to="/new" className="btn-primary mt-2">
        + Create your first note
      </Link>
    )}
  </div>
);

export default EmptyState;
