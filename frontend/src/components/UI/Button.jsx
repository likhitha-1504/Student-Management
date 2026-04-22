import React from 'react';

/**
 * Button Component
 * 
 * Demonstrates: Props & Component Reusability
 * By passing 'variant', 'onClick', and 'children', we can use this single
 * component for all buttons in the app, maintaining consistent styling.
 */
const Button = ({ children, onClick, variant = 'primary', type = 'button', className = '', disabled = false }) => {
  const baseStyles = "px-6 py-2.5 rounded-lg font-medium transition-all duration-300 transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer";
  
  const variants = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/30",
    secondary: "bg-gray-700 hover:bg-gray-600 text-white shadow-lg shadow-gray-900/30",
    danger: "bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-500/30",
    outline: "border-2 border-blue-600 text-blue-400 hover:bg-blue-600 hover:text-white",
    ghost: "text-gray-400 hover:text-white hover:bg-white/5",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
