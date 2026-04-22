import React from 'react';
import { Link, useLocation } from 'react-router-dom';

/**
 * Navbar Component
 * 
 * Demonstrates: Semantic HTML (<header>, <nav>) and React Router integration.
 * The active state is managed by the current location to provide visual feedback.
 */
const Navbar = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full glass-dark border-b border-white/10 px-6 py-4">
      <nav className="max-w-7xl mx-auto flex justify-between items-center">
        <Link 
          to="/" 
          className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent hover:scale-105 transition-transform"
        >
          SMS Portal
        </Link>

        <div className="flex gap-8 items-center">
          <Link 
            to="/" 
            className={`font-medium transition-colors ${isActive('/') ? 'text-blue-400' : 'text-gray-400 hover:text-white'}`}
          >
            Home
          </Link>
          <Link 
            to="/dashboard" 
            className={`font-medium transition-colors ${isActive('/dashboard') ? 'text-blue-400' : 'text-gray-400 hover:text-white'}`}
          >
            Dashboard
          </Link>
          <Link 
            to="/add" 
            className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full text-sm font-semibold shadow-lg shadow-blue-500/20 transition-all active:scale-95"
          >
            + Add Student
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
