import React from 'react';

const Input = ({ 
  label, 
  error, 
  id, 
  className = '', 
  ...props 
}) => {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && (
        <label 
          htmlFor={id} 
          className="text-sm font-semibold text-surface-700 ml-1"
        >
          {label}
        </label>
      )}
      <input
        id={id}
        className={`
          w-full px-4 py-2.5 rounded-xl border bg-white
          transition-all duration-200 outline-none
          ${error 
            ? 'border-red-400 focus:border-red-500 focus:ring-4 focus:ring-red-500/10' 
            : 'border-surface-200 focus:border-primary-400 focus:ring-4 focus:ring-primary-500/10'
          }
          placeholder:text-surface-400 text-surface-800
        `}
        {...props}
      />
      {error && (
        <span className="text-xs text-red-500 ml-1 mt-0.5 animate-fade-in">
          {error}
        </span>
      )}
    </div>
  );
};

export default Input;
