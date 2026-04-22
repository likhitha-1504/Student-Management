import React, { useState } from 'react';
import Button from '../UI/Button';

/**
 * StudentForm Component
 * 
 * Demonstrates: useState, Closures, and Semantic HTML5 (<form>, <label>).
 * Features basic validation and handles both "Add" and "Edit" modes via props.
 */
const StudentForm = ({ initialData, onSubmit, onCancel, isLoading }) => {
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    age: initialData?.age || '',
    course: initialData?.course || ''
  });

  const [errors, setErrors] = useState({});

  // Closure: handleChange remembers which field it's updating
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.age) newErrors.age = 'Age is required';
    else if (formData.age < 16 || formData.age > 100) newErrors.age = 'Enter a valid age (16-100)';
    if (!formData.course.trim()) newErrors.course = 'Course is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page reload
    if (validate()) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-xl mx-auto glass p-8 rounded-3xl border border-white/10 shadow-2xl">
      <h2 className="text-2xl font-bold text-white mb-6">
        {initialData ? 'Update Student' : 'Add New Student'}
      </h2>

      {/* Name Input */}
      <div className="space-y-2">
        <label htmlFor="name" className="block text-sm font-medium text-gray-300">
          Full Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="e.g. Rahul Kumar"
          className={`w-full px-4 py-3 bg-white/5 border rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
            errors.name ? 'border-red-500/50' : 'border-white/10'
          }`}
        />
        {errors.name && <p className="text-red-400 text-xs italic">{errors.name}</p>}
      </div>

      {/* Age Input */}
      <div className="space-y-2">
        <label htmlFor="age" className="block text-sm font-medium text-gray-300">
          Age
        </label>
        <input
          type="number"
          id="age"
          name="age"
          value={formData.age}
          onChange={handleChange}
          placeholder="e.g. 21"
          className={`w-full px-4 py-3 bg-white/5 border rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
            errors.age ? 'border-red-500/50' : 'border-white/10'
          }`}
        />
        {errors.age && <p className="text-red-400 text-xs italic">{errors.age}</p>}
      </div>

      {/* Course Input */}
      <div className="space-y-2">
        <label htmlFor="course" className="block text-sm font-medium text-gray-300">
          Course / Department
        </label>
        <select
          id="course"
          name="course"
          value={formData.course}
          onChange={handleChange}
          className={`w-full px-4 py-3 bg-gray-900 border rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
            errors.course ? 'border-red-500/50' : 'border-white/10'
          }`}
        >
          <option value="" disabled>Select a course</option>
          <option value="Computer Science">Computer Science</option>
          <option value="Information Technology">Information Technology</option>
          <option value="Mechanical Engineering">Mechanical Engineering</option>
          <option value="Electrical Engineering">Electrical Engineering</option>
          <option value="Civil Engineering">Civil Engineering</option>
        </select>
        {errors.course && <p className="text-red-400 text-xs italic">{errors.course}</p>}
      </div>

      {/* Actions */}
      <div className="flex gap-4 pt-4">
        <Button 
          type="submit" 
          variant="primary" 
          disabled={isLoading}
          className="flex-1 py-4"
        >
          {isLoading ? 'Processing...' : initialData ? 'Save Changes' : 'Enroll Student'}
        </Button>
        <Button 
          type="button" 
          variant="ghost" 
          onClick={onCancel}
          className="flex-1 py-4"
        >
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default StudentForm;
