import React from 'react';
import { Link } from 'react-router-dom';
import useNotes from '../hooks/useNotes';
import NoteCard from '../components/NoteCard';
import SearchBar from '../components/SearchBar';
import Pagination from '../components/Pagination';
import LoadingSpinner from '../components/LoadingSpinner';
import EmptyState from '../components/EmptyState';

const PlusIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
  </svg>
);

const HomePage = () => {
  const {
    notes, loading, error, pagination,
    search, setSearch,
    currentPage, setCurrentPage,
    deleteNote,
  } = useNotes();

  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
      {/* Header section */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
          <div>
            <h1 className="font-display font-bold text-3xl sm:text-4xl text-ink-900 dark:text-ink-50">
              My Notes
            </h1>
            {pagination && (
              <p className="text-ink-400 dark:text-ink-500 mt-1 text-sm">
                {pagination.totalNotes} note{pagination.totalNotes !== 1 ? 's' : ''}
              </p>
            )}
          </div>
          {/* Mobile new note button */}
          <Link to="/new" className="btn-primary flex items-center gap-2 w-fit sm:hidden text-sm">
            <PlusIcon />
            New Note
          </Link>
        </div>

        {/* Search */}
        <SearchBar value={search} onChange={setSearch} />
      </div>

      {/* Error state */}
      {error && (
        <div className="card p-5 border-red-200 dark:border-red-900/50 bg-red-50 dark:bg-red-950/20 text-red-600 dark:text-red-400 mb-6 animate-fade-in">
          <p className="font-medium">⚠️ Failed to load notes</p>
          <p className="text-sm mt-1 opacity-80">{error}</p>
        </div>
      )}

      {/* Loading */}
      {loading && <LoadingSpinner message="Fetching your notes…" />}

      {/* Empty state */}
      {!loading && !error && notes.length === 0 && (
        <EmptyState hasSearch={!!search} />
      )}

      {/* Notes grid */}
      {!loading && notes.length > 0 && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {notes.map((note) => (
              <NoteCard key={note._id} note={note} onDelete={deleteNote} />
            ))}
          </div>
          <Pagination pagination={pagination} onPageChange={setCurrentPage} />
        </>
      )}
    </main>
  );
};

export default HomePage;
