import { SearchIcon } from "lucide-react";
import React from "react";

interface IinputProps {
  icon?: any;
  placeholder?: string;
  label?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void; // Add this
  className?: string;
  type?: string;
  value?: string | number;
  error?: string;
  name?: string;
  maxLength?: number;
}

export const CustomInput = ({
  placeholder,
  icon,
  label,
  onChange,
  className,
  type,
  value,
  error,
  onBlur,
  name,
  maxLength,
}: IinputProps) => {
  return (
    <div className=" relative">
      <p className=" py-3 font-semibold">{label}</p>
      {icon && <div className=" absolute bottom-[10px] left-3">{icon}</div>}
      <input
        value={value}
        placeholder={placeholder}
        onBlur={onBlur}
        onChange={onChange}
        name={name}
        maxLength={maxLength}
        type={type}
        className={`border border-gray-gray50 rounded-lg h-[45px]
    ${icon ? "px-14" : "px-3"}
    bg-transparent 
    outline-none
    focus:outline-none
    focus:ring-0
    ${error ? "border-red-500 focus:ring-red-200" : ""}
    ${className}
  `}
      />
      {error && (
        <p className=" text-sm font-normal text-red-500 py-1">{error}</p>
      )}
    </div>
  );
};
