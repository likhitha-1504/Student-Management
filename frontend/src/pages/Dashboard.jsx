import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { studentService } from '../services/studentService';
import StudentTable from '../components/Dashboard/StudentTable';
import StudentCard from '../components/Dashboard/StudentCard';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import Button from '../components/UI/Button';

/**
 * Dashboard Page
 */
const Dashboard = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const navigate = useNavigate();
  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;
    
    const load = async () => {
      try {
        const data = await studentService.getAllStudents();
        if (isMounted.current) {
          // Flatten data if it comes in a wrapper object from backend
          const studentList = Array.isArray(data) ? data : data.data || [];
          setStudents(studentList);
          setLoading(false);
          setError(null);
        }
      } catch (err) {
        if (isMounted.current) {
          console.error("Failed to fetch students:", err);
          setError(err.message || "Failed to connect to backend. Please ensure the server is running.");
          setLoading(false);
        }
      }
    };

    load();
    return () => { isMounted.current = false; };
  }, [refreshTrigger]);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      // 🚀 Optimistic UI Update: 
      // We remove the student from the local state immediately
      const originalStudents = [...students];
      setStudents(prev => prev.filter(s => s._id !== id && s.id !== id));

      try {
        await studentService.deleteStudent(id);
        // Success - no need to do anything since we already updated state
      } catch (err) {
        // ⏪ Rollback on error:
        // If the API call fails, we put the student back in the list
        alert("Delete failed: " + err.message);
        setStudents(originalStudents);
      }
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  const filteredStudents = students.filter(s => 
    s?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s?.course?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      {/* Error Message */}
      {error && (
        <div className="mb-8 p-4 bg-red-500/10 border border-red-500/50 rounded-xl text-red-400 flex justify-between items-center">
          <p><strong>Error:</strong> {error}</p>
          <Button variant="ghost" onClick={() => setRefreshTrigger(t => t + 1)} className="text-xs py-1">
            Retry
          </Button>
        </div>
      )}

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Student Directory</h1>
          <p className="text-gray-400">Live data from backend</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 flex-1 max-w-xl justify-end">
          <div className="relative flex-1">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </span>
            <input
              type="text"
              placeholder="Search by name or course..."
              className="block w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button onClick={() => navigate('/add')} className="whitespace-nowrap px-8">
            Add Student
          </Button>
        </div>
      </div>

      {loading ? (
        <div className="min-h-[400px] flex items-center justify-center">
          <LoadingSpinner size="lg" />
        </div>
      ) : filteredStudents.length > 0 ? (
        <>
          <div className="hidden lg:block">
            <StudentTable 
              students={filteredStudents} 
              onEdit={handleEdit} 
              onDelete={handleDelete} 
            />
          </div>

          <div className="lg:hidden grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredStudents.map(student => (
              <StudentCard 
                key={student._id || student.id} 
                student={student} 
                onEdit={handleEdit} 
                onDelete={handleDelete} 
              />
            ))}
          </div>
        </>
      ) : (
        <div className="min-h-[400px] glass rounded-3xl border border-white/5 flex flex-col items-center justify-center text-center p-12">
          <div className="w-20 h-20 bg-gray-800 rounded-full flex items-center justify-center mb-6">
            <svg className="w-10 h-10 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">No Students Found</h2>
          <p className="text-gray-400 max-w-sm mb-8">
            {searchTerm ? `We couldn't find any results for "${searchTerm}"` : "The database is empty. Add your first student to get started."}
          </p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
