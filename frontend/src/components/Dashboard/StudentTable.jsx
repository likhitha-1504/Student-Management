import React from 'react';
import Button from '../UI/Button';

/**
 * StudentTable Component
 * 
 * Demonstrates: Props & Data Mapping.
 * We pass the student list and handlers for edit/delete down from the Dashboard.
 * This keeps the table "dumb" and reusable.
 */
const StudentTable = ({ students, onEdit, onDelete }) => {
  return (
    <div className="overflow-x-auto glass rounded-2xl shadow-2xl border border-white/5">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-white/5 text-gray-300">
            <th className="px-6 py-4 font-semibold uppercase text-xs tracking-wider">ID</th>
            <th className="px-6 py-4 font-semibold uppercase text-xs tracking-wider">Name</th>
            <th className="px-6 py-4 font-semibold uppercase text-xs tracking-wider">Age</th>
            <th className="px-6 py-4 font-semibold uppercase text-xs tracking-wider">Course</th>
            <th className="px-6 py-4 font-semibold uppercase text-xs tracking-wider text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {students.map((student) => {
            const studentId = student._id || student.id;
            return (
              <tr 
                key={studentId} 
                className="hover:bg-white/5 transition-colors group"
              >
                <td className="px-6 py-4 text-gray-500 font-mono text-sm">
                  #{studentId.toString().slice(-6)}
                </td>
                <td className="px-6 py-4 text-white font-medium">{student.name}</td>
                <td className="px-6 py-4 text-gray-400">{student.age}</td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 bg-blue-500/10 text-blue-400 rounded-full text-xs font-semibold">
                    {student.course}
                  </span>
                </td>
                <td className="px-6 py-4 text-right flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button 
                    variant="ghost" 
                    onClick={() => onEdit(studentId)}
                    className="px-3 py-1.5 text-xs"
                  >
                    Edit
                  </Button>
                  <Button 
                    variant="danger" 
                    onClick={() => onDelete(studentId)}
                    className="px-3 py-1.5 text-xs"
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default StudentTable;
