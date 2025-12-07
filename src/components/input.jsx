// Input.jsx
import React from 'react';

const Input = ({ 
  placeholder, 
  name, 
  value, 
  onChange, 
  type = 'text', 
  required = false, 
  className = '',
  ...props 
}) => {
  const defaultStyles = 
    "w-full p-4 rounded-xl bg-gray-100 text-gray-800 " +
    "focus:outline-none focus:ring-2 focus:ring-cyan-500 transition duration-150 border border-gray-300";

  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
      className={`${defaultStyles} ${className}`}
      {...props}
    />
  );
};

export default Input;