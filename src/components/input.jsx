import React, { forwardRef } from "react";

const Input = forwardRef(({ label, error, className = "", ...props }, ref) => {
  return (
    <div className="flex flex-col w-full">
      {label && (
        <label className="mb-1 font-medium text-gray-700">{label}</label>
      )}
      <input
        ref={ref}
        className={`w-full p-4 rounded-xl bg-gray-100 text-gray-800 
          border transition duration-150 outline-0
          ${error ? "border-red-500" : "border-gray-300"} 
          ${className}`}
        {...props}
      />

      {error && (
        <p className="text-red-500 text-sm mt-1">{error.message}</p>
      )}
    </div>
  );
});

export default Input;
