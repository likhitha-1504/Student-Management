import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { studentService } from '../services/studentService';
import StudentForm from '../components/Forms/StudentForm';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import Button from '../components/UI/Button';

/**
 * FormPage
 */
const FormPage = () => {
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const navigate = useNavigate();
  const isMounted = useRef(true);
  
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(isEditMode);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    isMounted.current = true;
    
    if (isEditMode) {
      const load = async () => {
        try {
          const data = await studentService.getStudentById(id);
          if (isMounted.current) {
            // Support both direct object or wrapper object with .data
            const studentData = data.data || data;
            setStudent(studentData);
            setLoading(false);
          }
        } catch (err) {
          if (isMounted.current) {
            setError(err.message || "Could not find student");
            setLoading(false);
          }
        }
      };
      load();
    }

    return () => { isMounted.current = false; };
  }, [id, isEditMode]);

  const handleSubmit = async (formData) => {
    setSubmitting(true);
    try {
      if (isEditMode) {
        await studentService.updateStudent(id, formData);
      } else {
        await studentService.addStudent(formData);
      }
      navigate('/dashboard');
    } catch (err) {
      if (isMounted.current) {
        // Handle backend validation errors or network errors
        alert("Action failed: " + err.message);
      }
    } finally {
      if (isMounted.current) {
        setSubmitting(false);
      }
    }
  };

  const handleCancel = () => {
    navigate('/dashboard');
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      {/* Error Message for fetching */}
      {error && (
        <div className="mb-12 text-center glass p-12 rounded-3xl border border-red-500/20">
          <div className="text-red-500 text-5xl mb-6">⚠️</div>
          <h2 className="text-2xl font-bold text-white mb-4">Error loading student</h2>
          <p className="text-gray-400 mb-8">{error}</p>
          <Button onClick={() => navigate('/dashboard')}>Back to Dashboard</Button>
        </div>
      )}

      {!error && (
        <>
          <div className="mb-12 text-center">
            <h1 className="text-3xl font-bold text-white mb-2">
              {isEditMode ? 'Edit Profile' : 'Student Enrollment'}
            </h1>
            <p className="text-gray-400">
              {isEditMode ? `Updating record for ID: ${id}` : 'Fill in the details to enroll a new student'}
            </p>
          </div>

          <StudentForm 
            key={student ? (student._id || student.id) : 'new'}
            initialData={student} 
            onSubmit={handleSubmit} 
            onCancel={handleCancel}
            isLoading={submitting}
          />
        </>
      )}
    </div>
  );
};

export default FormPage;
