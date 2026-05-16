import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import NoteForm from '../components/NoteForm';
import { noteService } from '../services/noteService';

const CreateNotePage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (data) => {
    setLoading(true);
    try {
      await noteService.create(data);
      toast.success('Note created!');
      navigate('/');
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="max-w-2xl mx-auto px-4 sm:px-6 py-8">
      <div className="mb-8">
        <h1 className="font-display font-bold text-3xl text-ink-900 dark:text-ink-50">New Note</h1>
        <p className="text-ink-400 dark:text-ink-500 mt-1 text-sm">Capture your thoughts</p>
      </div>
      <div className="card p-6 sm:p-8">
        <NoteForm onSubmit={handleSubmit} loading={loading} />
      </div>
    </main>
  );
};

export default CreateNotePage;
