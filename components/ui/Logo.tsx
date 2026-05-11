"use client";

import React from "react";
import Image from "next/image";

interface LogoProps {
  className?: string;
  size?: number | string;
}

export const Logo = ({ className = "", size }: LogoProps) => {
  if (size) {
    const numSize = typeof size === 'number' ? size : parseInt(size as string, 10);
    return (
      <div className={`relative flex items-center justify-center ${className}`}>
        <Image
          src="/images/لوجو.jpeg"
          alt="BTH Logo"
          width={numSize}
          height={numSize}
          className="object-cover rounded-full"
          priority
        />
      </div>
    );
  }

  return (
    <div className={`relative w-full h-full rounded-full overflow-hidden ${className}`}>
      <Image
        src="/images/لوجو.jpeg"
        alt="BTH Logo"
        fill
        className="object-cover"
        priority
      />
    </div>
  );
};
