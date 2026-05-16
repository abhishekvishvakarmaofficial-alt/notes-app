import axios from 'axios';

// In Docker, nginx proxies /api → backend. For local dev, use env var.
const BASE_URL = process.env.REACT_APP_API_URL || '/api';

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

// Response interceptor for centralized error handling
api.interceptors.response.use(
  (res) => res,
  (error) => {
    const message =
      error.response?.data?.message ||
      error.response?.data?.errors?.[0]?.message ||
      error.message ||
      'Something went wrong';
    return Promise.reject(new Error(message));
  }
);

// ── Note API calls ────────────────────────────────────────────────────────────
export const noteService = {
  /** Get paginated notes with optional search */
  getAll: (params = {}) => api.get('/notes', { params }),

  /** Get single note */
  getById: (id) => api.get(`/notes/${id}`),

  /** Create note */
  create: (data) => api.post('/notes', data),

  /** Update note */
  update: (id, data) => api.put(`/notes/${id}`, data),

  /** Delete note */
  delete: (id) => api.delete(`/notes/${id}`),
};

export default api;
