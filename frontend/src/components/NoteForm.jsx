import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from './LoadingSpinner';

/**
 * Reusable form for creating and editing notes
 */
const NoteForm = ({ initialData = null, onSubmit, loading }) => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: '', content: '' });
  const [errors, setErrors] = useState({});

  // Populate form when editing
  useEffect(() => {
    if (initialData) {
      setForm({ title: initialData.title, content: initialData.content });
    }
  }, [initialData]);

  const validate = () => {
    const errs = {};
    if (!form.title.trim()) errs.title = 'Title is required';
    else if (form.title.trim().length > 200) errs.title = 'Max 200 characters';
    if (!form.content.trim()) errs.content = 'Content is required';
    else if (form.content.trim().length > 10000) errs.content = 'Max 10,000 characters';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    if (errors[name]) setErrors((e) => ({ ...e, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    await onSubmit({ title: form.title.trim(), content: form.content.trim() });
  };

  if (loading && !initialData) return <LoadingSpinner message="Loading note..." />;

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 animate-fade-in" noValidate>
      {/* Title */}
      <div>
        <label htmlFor="title" className="label">Title</label>
        <input
          id="title"
          name="title"
          type="text"
          value={form.title}
          onChange={handleChange}
          placeholder="Give your note a title…"
          className={`input-field text-lg font-display ${errors.title ? 'border-red-400 focus:ring-red-400' : ''}`}
          autoFocus
        />
        <div className="flex justify-between mt-1">
          {errors.title && <p className="text-red-500 text-xs">{errors.title}</p>}
          <p className={`ml-auto text-xs ${form.title.length > 180 ? 'text-amber-500' : 'text-ink-400'}`}>
            {form.title.length}/200
          </p>
        </div>
      </div>

      {/* Content */}
      <div>
        <label htmlFor="content" className="label">Content</label>
        <textarea
          id="content"
          name="content"
          rows={12}
          value={form.content}
          onChange={handleChange}
          placeholder="Write your thoughts here…"
          className={`input-field resize-y min-h-[200px] leading-relaxed ${errors.content ? 'border-red-400 focus:ring-red-400' : ''}`}
        />
        <div className="flex justify-between mt-1">
          {errors.content && <p className="text-red-500 text-xs">{errors.content}</p>}
          <p className={`ml-auto text-xs ${form.content.length > 9500 ? 'text-amber-500' : 'text-ink-400'}`}>
            {form.content.length}/10,000
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3 pt-2">
        <button type="submit" disabled={loading} className="btn-primary flex items-center gap-2">
          {loading && (
            <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
          )}
          {loading ? 'Saving…' : (initialData ? 'Save Changes' : 'Create Note')}
        </button>
        <button type="button" onClick={() => navigate('/')} className="btn-secondary">
          Cancel
        </button>
      </div>
    </form>
  );
};

export default NoteForm;
