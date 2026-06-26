import React from "react";

interface LogoProps {
  variant?: "horizontal" | "vertical" | "monogram";
  className?: string;
  size?: "sm" | "md" | "lg";
}

export default function Logo({ variant = "horizontal", className = "", size = "md" }: LogoProps) {
  // Styles for the Monogram letters
  const monogramSizes = {
    sm: "text-2xl",
    md: "text-4xl",
    lg: "text-6xl"
  };

  const textSizes = {
    sm: {
      title: "text-[10px]",
      subtitle: "text-[7px]",
      gap: "gap-0.5"
    },
    md: {
      title: "text-[13px] md:text-[14px]",
      subtitle: "text-[8px] md:text-[9px]",
      gap: "gap-1"
    },
    lg: {
      title: "text-lg md:text-xl",
      subtitle: "text-[10px] md:text-xs",
      gap: "gap-1.5"
    }
  };

  const selectedMonogramSize = monogramSizes[size];
  const selectedTextSize = textSizes[size];

  // The monogram: overlapping red serif letters
  const renderMonogram = () => {
    return (
      <div className="relative font-serif font-black select-none text-[#cc0000] flex items-center justify-center leading-none">
        {/* M */}
        <span className={`${selectedMonogramSize} tracking-tighter relative z-10 transition-all font-bold`} style={{ fontFamily: '"Times New Roman", Georgia, serif' }}>
          M
        </span>
        {/* S */}
        <span 
          className={`${selectedMonogramSize} tracking-tighter relative z-20 -ml-[0.25em] -mr-[0.2em] mt-[0.05em] scale-95 font-bold`} 
          style={{ fontFamily: '"Times New Roman", Georgia, serif', transform: "skewX(-6deg)" }}
        >
          S
        </span>
        {/* A */}
        <span className={`${selectedMonogramSize} tracking-tighter relative z-30 transition-all font-bold`} style={{ fontFamily: '"Times New Roman", Georgia, serif' }}>
          A
        </span>
      </div>
    );
  };

  if (variant === "monogram") {
    return <div className={`inline-flex items-center justify-center ${className}`}>{renderMonogram()}</div>;
  }

  if (variant === "vertical") {
    return (
      <div className={`flex flex-col items-center text-center ${selectedTextSize.gap} ${className}`}>
        {/* MSA Monogram (Top) */}
        {renderMonogram()}
        
        {/* Texts (Below) */}
        <div className="flex flex-col items-center">
          <h1 
            className={`${
              size === "sm" ? "text-[11px]" : size === "md" ? "text-base" : "text-xl md:text-2xl"
            } font-serif font-bold text-neutral-900 tracking-wide uppercase`}
            style={{ fontFamily: '"Times New Roman", Georgia, serif' }}
          >
            MALWA SPORTS ACADEMY
          </h1>
          <p 
            className={`${
              size === "sm" ? "text-[7px]" : size === "md" ? "text-[9px]" : "text-xs"
            } font-serif text-neutral-600 tracking-widest uppercase font-semibold`}
            style={{ fontFamily: '"Times New Roman", Georgia, serif' }}
          >
            SANWER ROAD, INDORE
          </p>
        </div>
      </div>
    );
  }

  // Horizontal version (default) - Perfect for Header / compact spaces
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Monogram part */}
      <div className="shrink-0">
        {renderMonogram()}
      </div>

      {/* Vertical divider */}
      <div className="h-8 w-px bg-neutral-300 self-center" />

      {/* Text part to the right */}
      <div className="flex flex-col text-left leading-none justify-center">
        <span 
          className={`${selectedTextSize.title} font-serif font-extrabold text-neutral-900 tracking-wide uppercase leading-none`}
          style={{ fontFamily: '"Times New Roman", Georgia, serif' }}
        >
          MALWA SPORTS ACADEMY
        </span>
        <span 
          className={`${selectedTextSize.subtitle} font-serif text-neutral-500 tracking-widest uppercase mt-1 leading-none font-semibold`}
          style={{ fontFamily: '"Times New Roman", Georgia, serif' }}
        >
          SANWER ROAD, INDORE
        </span>
      </div>
    </div>
  );
}
