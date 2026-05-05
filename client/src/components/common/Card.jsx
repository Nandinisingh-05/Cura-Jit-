import React from 'react';

const Card = ({ 
  children, 
  title, 
  subtitle, 
  className = '', 
  padding = true,
  hoverable = false
}) => {
  return (
    <div className={`
      bg-white rounded-2xl border border-surface-100 shadow-soft
      transition-all duration-300
      ${hoverable ? 'hover:shadow-soft-lg hover:-translate-y-1 cursor-pointer' : ''}
      ${className}
    `}>
      {(title || subtitle) && (
        <div className="px-6 py-4 border-b border-surface-50">
          {title && <h3 className="text-lg font-bold text-surface-900">{title}</h3>}
          {subtitle && <p className="text-sm text-surface-500 mt-0.5">{subtitle}</p>}
        </div>
      )}
      <div className={padding ? 'p-6' : ''}>
        {children}
      </div>
    </div>
  );
};

export default Card;
