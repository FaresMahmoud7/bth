"use client";

import React from "react";

interface LogoProps {
  className?: string;
  size?: number | string;
}

export const Logo = ({ className = "w-full h-full", size }: LogoProps) => {
  return (
    <svg 
      viewBox="0 0 512 512" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      className={className}
      width={size}
      height={size}
    >
      <defs>
        <radialGradient id="logoSphereGradient" cx="35%" cy="35%" r="65%" fx="35%" fy="35%">
          <stop offset="0%" stopColor="#FFB380" />
          <stop offset="70%" stopColor="#FF8C42" />
          <stop offset="100%" stopColor="#E66A1F" />
        </radialGradient>
        <linearGradient id="logoGlossHighlight" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="white" stopOpacity="0.6" />
          <stop offset="50%" stopColor="white" stopOpacity="0" />
        </linearGradient>
        <filter id="logoGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>
      <circle cx="256" cy="256" r="240" fill="white" />
      <ellipse cx="256" cy="256" rx="180" ry="80" stroke="#FF8C42" strokeWidth="4" fill="none" transform="rotate(-30 256 256)" opacity="0.6" />
      <ellipse cx="256" cy="256" rx="190" ry="60" stroke="#FF8C42" strokeWidth="3" fill="none" transform="rotate(45 256 256)" opacity="0.5" />
      <circle cx="256" cy="256" r="120" fill="url(#logoSphereGradient)" />
      <circle cx="256" cy="256" r="120" fill="url(#logoGlossHighlight)" />
      <text x="50%" y="53%" textAnchor="middle" fontFamily="Arial, sans-serif" fontWeight="900" fontSize="72" fill="#001F3F" letterSpacing="-2">BTH</text>
      <g filter="url(#logoGlow)">
        <path d="M 100 280 A 180 80 -30 0 1 412 232" stroke="#FF8C42" strokeWidth="5" fill="none" strokeLinecap="round" />
        <path d="M 120 180 A 190 60 45 0 0 392 332" stroke="#FF8C42" strokeWidth="4" fill="none" strokeLinecap="round" />
      </g>
      <ellipse cx="256" cy="400" rx="80" ry="20" fill="black" fillOpacity="0.05" />
    </svg>
  );
};
