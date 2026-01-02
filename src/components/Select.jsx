import { forwardRef } from "react";

const Select = forwardRef(({ label, options = [], error, placeholder, className = "", ...props }, ref) => {
  return (
    <div className="flex flex-col w-full">
      {label && (
        <label className="mb-1 font-medium text-gray-700">{label}</label>
      )}
      
      <div className="relative">
        <select
          ref={ref}
          className={`w-full p-4 pr-10 rounded-xl bg-gray-100 text-gray-800 
            border transition duration-150 outline-0 appearance-none
            ${error ? "border-red-500" : "border-gray-300"} 
            ${className}`}
          {...props}
        >
          <option value="">{placeholder || "-- Chọn --"}</option>
          {options.map((option) => (
            <option key={option.id} value={option.id}>
              {option.name}
            </option>
          ))}
        </select>

        <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-gray-500">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </div>
      </div>

      {error && (
        <p className="text-red-500 text-sm mt-1">{error.message}</p>
      )}
    </div>
  );
});

export default Select;