import { useState, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';
import { noteService } from '../services/noteService';

/**
 * Custom hook for all note-related state & operations
 */
const useNotes = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState(null);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const fetchNotes = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await noteService.getAll({ page: currentPage, limit: 9, search });
      setNotes(res.data.data);
      setPagination(res.data.pagination);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [currentPage, search]);

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  // Reset to page 1 when search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  const createNote = async (data) => {
    const promise = noteService.create(data);
    toast.promise(promise, {
      loading: 'Creating note...',
      success: 'Note created!',
      error: (e) => e.message,
    });
    await promise;
    fetchNotes();
  };

  const updateNote = async (id, data) => {
    const promise = noteService.update(id, data);
    toast.promise(promise, {
      loading: 'Saving changes...',
      success: 'Note updated!',
      error: (e) => e.message,
    });
    await promise;
    fetchNotes();
  };

  const deleteNote = async (id) => {
    const promise = noteService.delete(id);
    toast.promise(promise, {
      loading: 'Deleting...',
      success: 'Note deleted',
      error: (e) => e.message,
    });
    await promise;
    // If we deleted the last item on this page, go back one page
    if (notes.length === 1 && currentPage > 1) {
      setCurrentPage((p) => p - 1);
    } else {
      fetchNotes();
    }
  };

  return {
    notes, loading, error, pagination,
    search, setSearch,
    currentPage, setCurrentPage,
    createNote, updateNote, deleteNote,
    refetch: fetchNotes,
  };
};

export default useNotes;
