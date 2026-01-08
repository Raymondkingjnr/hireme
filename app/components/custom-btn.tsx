import { Spinner } from "@/components/ui/spinner";
import React from "react";

interface IBtnProps {
  title: string;
  disable?: boolean;
  isLoading?: boolean;
  onClick?: () => void;
  icon?: any;
  className?: string;
}

export const CustomBtn = ({
  title,
  disable,
  isLoading,
  onClick,
  icon,
  className,
}: IBtnProps) => {
  return (
    <button
      className={`rounded-full h-[33px] flex gap-2 items-center font-semibold justify-center  px-3 transition-all duration-300   ${className}`}
      disabled={disable}
      onClick={onClick}
    >
      {icon && icon}
      {isLoading ? <Spinner /> : title}
    </button>
  );
};
