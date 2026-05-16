import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import NoteForm from '../components/NoteForm';
import LoadingSpinner from '../components/LoadingSpinner';
import { noteService } from '../services/noteService';

const EditNotePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [note, setNote] = useState(null);
  const [fetching, setFetching] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await noteService.getById(id);
        setNote(res.data.data);
      } catch (err) {
        toast.error('Could not load note');
        navigate('/');
      } finally {
        setFetching(false);
      }
    };
    load();
  }, [id, navigate]);

  const handleSubmit = async (data) => {
    setSaving(true);
    try {
      await noteService.update(id, data);
      toast.success('Note updated!');
      navigate('/');
    } catch (err) {
      toast.error(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (fetching) return <LoadingSpinner message="Loading note…" />;

  return (
    <main className="max-w-2xl mx-auto px-4 sm:px-6 py-8">
      <div className="mb-8">
        <h1 className="font-display font-bold text-3xl text-ink-900 dark:text-ink-50">Edit Note</h1>
        <p className="text-ink-400 dark:text-ink-500 mt-1 text-sm">Make your changes</p>
      </div>
      <div className="card p-6 sm:p-8">
        <NoteForm initialData={note} onSubmit={handleSubmit} loading={saving} />
      </div>
    </main>
  );
};

export default EditNotePage;
