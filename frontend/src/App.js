import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { DarkModeProvider } from './context/DarkModeContext';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import CreateNotePage from './pages/CreateNotePage';
import EditNotePage from './pages/EditNotePage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <DarkModeProvider>
      <Router>
        <div className="min-h-screen bg-ink-50 dark:bg-ink-950 transition-colors duration-300">
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/new" element={<CreateNotePage />} />
            <Route path="/edit/:id" element={<EditNotePage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>

        {/* Global toast notifications */}
        <Toaster
          position="bottom-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: 'var(--toast-bg, #1c1710)',
              color: 'var(--toast-color, #f5f3ef)',
              borderRadius: '12px',
              fontSize: '14px',
              fontFamily: '"DM Sans", sans-serif',
            },
            success: { iconTheme: { primary: '#f59e0b', secondary: '#1c1710' } },
            error: { iconTheme: { primary: '#ef4444', secondary: '#fff' } },
          }}
        />
      </Router>
    </DarkModeProvider>
  );
}

export default App;
