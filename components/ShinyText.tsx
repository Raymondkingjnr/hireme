import React from "react";

interface ShinyTextProps {
  text: string;
  disabled?: boolean;
  speed?: number;
  className?: string;
}

const ShinyText: React.FC<ShinyTextProps> = ({
  text,
  disabled = false,
  speed = 5,
  className = "",
}) => {
  const animationDuration = `${speed}s`;

  return (
    <div
      className={`relative font-bold max-w-3xl mx-auto text-white bg-clip-text inline-block md:leading-[3.6rem] leading-10 ${
        disabled ? "" : "animate-shine"
      } ${className}`}
      style={{
        backgroundImage:
          "linear-gradient(120deg, #3a3a3a 0%, #5c5c5c 25%, #9a9a9a 50%, #5c5c5c 75%, #2e2e2e 100%)",
        backgroundSize: "200% 100%",
        WebkitBackgroundClip: "text",
        animationDuration,
        animationTimingFunction: "linear",
        animationIterationCount: "infinite",
      }}
    >
      {text}
    </div>
  );
};

export default ShinyText;
