import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Layout/Navbar';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import FormPage from './pages/FormPage';

/**
 * App Component
 * 
 * Demonstrates: Main entry point and Routing configuration.
 * Why use Routing?
 * 1. UX: Users can bookmark specific pages (like Dashboard).
 * 2. Organization: Separate features into logical views.
 * 3. State: URL can hold state (like ID for editing).
 */
function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#0f172a] text-gray-100 selection:bg-blue-500/30">
        <Navbar />
        
        <main className="pb-20">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/add" element={<FormPage />} />
            <Route path="/edit/:id" element={<FormPage />} />
          </Routes>
        </main>

        <footer className="py-12 border-t border-white/5 text-center text-gray-500 text-sm">
          <p>© 2026 SMS Portal. Build with React + Tailwind + Vite.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
