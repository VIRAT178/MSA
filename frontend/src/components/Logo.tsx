import React from "react";
import logoImage from "../assets/images/logo.jpeg";

interface LogoProps {
  className?: string;
  compact?: boolean;
  showTagline?: boolean;
}

export default function Logo({ className = "", compact = false }: LogoProps) {
  return (
    <div className={`inline-flex items-center ${className}`}>
      <img
        src={logoImage}
        alt="Malwa Sports Academy"
        className={compact ? "h-10 w-auto object-contain" : "h-16 w-auto object-contain"}
      />
    </div>
  );
}
