import { forwardRef } from "react";

const Input = forwardRef(({ label, error, className = "", ...props }, ref) => {
  return (
    <div className="flex flex-col w-full">
      {label && (
        <label className="mb-1 font-medium text-gray-700 dark:text-gray-300">{label}</label>
      )}
      <input
        ref={ref}
        className={`w-full p-4 rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white 
          border transition duration-150 outline-0
          ${error ? "border-red-500" : "border-gray-300 dark:border-gray-600"} 
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
