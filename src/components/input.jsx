import React from "react";

const Input = React.forwardRef(
  ({ label, error, id, ...props }, ref) => {
    const inputId = id || props.name;

    return (
      <div className="flex flex-col w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="mb-1 font-medium text-gray-700"
          >
            {label}
          </label>
        )}

        <input
          id={inputId}
          ref={ref}
          {...props}
          className="w-full p-4 rounded-xl bg-gray-100 border border-gray-300"
        />

        {error && (
          <p className="text-red-500 text-sm mt-1">
            {error.message}
          </p>
        )}
      </div>
    );
  }
);

export default Input;
