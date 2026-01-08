import React from "react";
import { ChevronDown } from "lucide-react";

interface CustomSelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options?: { value: string; label: string }[];
  error?: string;
  placeholder?: string;
  className?: string;
}

export const CustomSelect: React.FC<CustomSelectProps> = ({
  label,
  options,
  error,
  placeholder = "Select an option",
  className = "",
  ...props
}) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block py-3 font-semibold text-gray-800">
          {label}
        </label>
      )}

      <div className="relative">
        <select
          className={`
            w-full h-[45px] px-4 pr-12 rounded-lg border appearance-none
            bg-transparent text-gray-900 placeholder:text-gray-400
            focus:outline-none focus:ring-0 
            transition-all duration-200 cursor-pointer border-gray-gray50 hover:border-gray-400
            ${error ? "border-red-500 focus:ring-red-200" : ""}
            ${className}
          `}
          {...props}
        >
          <option value="" disabled hidden>
            {placeholder}
          </option>
          {options?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        {/* Custom Dropdown Arrow */}
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <ChevronDown
            size={20}
            className={`text-gray-500 transition-transform ${
              props.value ? "rotate-180" : ""
            } `}
          />
        </div>
      </div>

      {/* Error Message */}
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};
