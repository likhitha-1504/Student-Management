import React from 'react';
import Button from '../UI/Button';

/**
 * StudentCard Component
 * 
 * Demonstrates: Mobile-first design and responsive layouts.
 * Used on smaller screens to display data that would otherwise be cramped in a table.
 */
const StudentCard = ({ student, onEdit, onDelete }) => {
  const studentId = student._id || student.id;

  return (
    <div className="glass p-6 rounded-2xl border border-white/5 shadow-xl hover:translate-y-[-4px] transition-all duration-300">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-bold text-white">{student.name}</h3>
          <p className="text-gray-400 text-sm">Age: {student.age}</p>
        </div>
        <span className="text-gray-600 font-mono text-xs">
          #{studentId.toString().slice(-6)}
        </span>
      </div>
      
      <div className="mb-6">
        <span className="px-4 py-1.5 bg-blue-500/10 text-blue-400 rounded-full text-xs font-bold uppercase tracking-wider">
          {student.course}
        </span>
      </div>

      <div className="flex gap-3 pt-4 border-t border-white/5">
        <Button 
          variant="secondary" 
          onClick={() => onEdit(studentId)}
          className="flex-1 py-2 text-sm"
        >
          Edit
        </Button>
        <Button 
          variant="danger" 
          onClick={() => onDelete(studentId)}
          className="flex-1 py-2 text-sm"
        >
          Delete
        </Button>
      </div>
    </div>
  );
};

export default StudentCard;
