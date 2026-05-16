import React from 'react';
import { Link } from 'react-router-dom';

const TrashIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>
);

const EditIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
  </svg>
);

/**
 * Single note card displayed in the grid
 */
const NoteCard = ({ note, onDelete }) => {
  const { _id, title, content, updatedAt } = note;

  const formattedDate = new Date(updatedAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  const preview = content.length > 140 ? content.slice(0, 140) + '…' : content;

  const handleDelete = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (window.confirm('Delete this note?')) {
      onDelete(_id);
    }
  };

  return (
    <article className="card p-5 flex flex-col gap-3 animate-slide-up group">
      {/* Title */}
      <h2 className="font-display font-semibold text-lg text-ink-900 dark:text-ink-50 leading-snug line-clamp-2">
        {title}
      </h2>

      {/* Preview */}
      <p className="text-ink-500 dark:text-ink-400 text-sm leading-relaxed flex-1 line-clamp-4 font-body">
        {preview}
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between pt-2 border-t border-ink-100 dark:border-ink-800">
        <time className="text-xs text-ink-400 dark:text-ink-600 font-mono">{formattedDate}</time>

        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <Link
            to={`/edit/${_id}`}
            className="p-2 rounded-lg text-ink-500 dark:text-ink-400 hover:bg-ink-100 dark:hover:bg-ink-800 hover:text-ink-900 dark:hover:text-ink-100 transition-colors"
            aria-label="Edit note"
          >
            <EditIcon />
          </Link>
          <button
            onClick={handleDelete}
            className="p-2 rounded-lg text-ink-500 dark:text-ink-400 hover:bg-red-50 dark:hover:bg-red-950/40 hover:text-red-600 dark:hover:text-red-400 transition-colors"
            aria-label="Delete note"
          >
            <TrashIcon />
          </button>
        </div>
      </div>
    </article>
  );
};

export default NoteCard;
