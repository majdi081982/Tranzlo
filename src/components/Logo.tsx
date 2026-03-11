"use client";

import React from 'react';
import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  iconOnly?: boolean;
}

const Logo = ({ className, iconOnly = false }: LogoProps) => {
  return (
    <div className={cn("flex items-center gap-2.5 select-none", className)}>
      <div className="relative flex items-center justify-center w-10 h-10 overflow-hidden rounded-xl bg-indigo-600 shadow-lg shadow-indigo-200">
        <svg 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2.5" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          className="w-6 h-6 text-white"
        >
          <path d="m5 8 6 6" />
          <path d="m4 14 6-6 2-3" />
          <path d="M2 5h12" />
          <path d="M7 2h1" />
          <path d="m22 22-5-10-5 10" />
          <path d="M14 18h6" />
        </svg>
        <div className="absolute top-0 right-0 w-3 h-3 bg-indigo-400 opacity-50 blur-sm rounded-full -mr-1 -mt-1"></div>
      </div>
      {!iconOnly && (
        <span className="text-2xl font-black tracking-tight text-indigo-950">
          Tranzlo<span className="text-indigo-600">.</span>
        </span>
      )}
    </div>
  );
};

export default Logo;