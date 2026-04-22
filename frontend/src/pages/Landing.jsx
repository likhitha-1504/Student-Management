import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/UI/Button';

/**
 * Landing Page
 * 
 * Features: High-impact hero section, features grid, and clear CTA.
 * Uses Flexbox and Grid for a modern, responsive layout.
 */
const Landing = () => {
  return (
    <div className="min-h-[calc(100vh-80px)] flex flex-col">
      {/* Hero Section */}
      <section className="flex-1 flex flex-col items-center justify-center text-center px-6 py-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent">
        <h1 className="text-5xl md:text-7xl font-extrabold mb-8 animate-fade-in text-white leading-tight">
          Modern Student <br />
          <span className="bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">
            Management System
          </span>
        </h1>
        <p className="text-xl text-gray-400 max-w-2xl mb-12 leading-relaxed">
          The ultimate platform for universities and schools to manage student records, 
          track enrollments, and coordinate courses effortlessly with our premium interface.
        </p>
        <div className="flex gap-4">
          <Link to="/dashboard">
            <Button variant="primary" className="px-8 py-4 text-lg">
              Get Started Free
            </Button>
          </Link>
          <Link to="/add">
            <Button variant="outline" className="px-8 py-4 text-lg">
              Quick Enroll
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-6 max-w-7xl mx-auto w-full">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white mb-4">Core Features</h2>
          <div className="h-1 w-20 bg-blue-600 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="glass p-8 rounded-3xl border border-white/5 hover:border-blue-500/30 transition-colors">
            <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center mb-6">
              <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Student Tracking</h3>
            <p className="text-gray-400">Keep track of every student's journey from enrollment to graduation with real-time updates.</p>
          </div>

          {/* Feature 2 */}
          <div className="glass p-8 rounded-3xl border border-white/5 hover:border-blue-500/30 transition-colors">
            <div className="w-12 h-12 bg-indigo-500/10 rounded-xl flex items-center justify-center mb-6">
              <svg className="w-6 h-6 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Course Management</h3>
            <p className="text-gray-400">Allocate students to departments and courses effortlessly using our smart categorization system.</p>
          </div>

          {/* Feature 3 */}
          <div className="glass p-8 rounded-3xl border border-white/5 hover:border-blue-500/30 transition-colors">
            <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center mb-6">
              <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Real-time CRUD</h3>
            <p className="text-gray-400">Manage records instantly. Add, edit, or remove student profiles with a single click and local data syncing.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
