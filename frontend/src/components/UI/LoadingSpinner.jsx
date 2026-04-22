import React from 'react';

/**
 * LoadingSpinner Component
 * 
 * Provides visual feedback during async operations.
 * Enhances UX by letting the user know the system is processing their request.
 */
const LoadingSpinner = ({ size = 'md', color = 'blue' }) => {
  const sizes = {
    sm: 'h-5 w-5 border-2',
    md: 'h-10 w-10 border-4',
    lg: 'h-16 w-16 border-4',
  };

  const colors = {
    blue: 'border-blue-500',
    white: 'border-white',
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 space-y-4">
      <div 
        className={`animate-spin rounded-full border-t-transparent ${sizes[size]} ${colors[color]}`}
        role="status"
        aria-label="loading"
      />
      <span className="text-gray-400 font-medium animate-pulse">Loading data...</span>
    </div>
  );
};

export default LoadingSpinner;
