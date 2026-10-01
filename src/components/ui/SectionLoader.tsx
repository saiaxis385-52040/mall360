import React from 'react';
import { Logo } from './Logo';

interface SectionLoaderProps {
  isVisible: boolean;
  sectionName?: string;
}

export const SectionLoader: React.FC<SectionLoaderProps> = ({ isVisible }) => {
  if (!isVisible) return null;

  return (
    <div
      role="status"
      aria-label="Loading..."
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#090D0A]/70 backdrop-blur-sm animate-in fade-in duration-150 pointer-events-auto select-none"
    >
      {/* Pure Stylish Mall360 Logo Reload Ring (No text, no clutter) */}
      <div className="relative flex items-center justify-center p-6 rounded-full bg-[#0D1410]/80 border border-[#144D37]/50 shadow-2xl backdrop-blur-md">
        {/* Subtle breathing glow */}
        <div className="absolute w-20 h-20 rounded-full bg-[#00DA85]/25 blur-xl animate-pulse" />
        <Logo
          variant="loader"
          size="lg"
          theme="light"
          isLoading={true}
          className="relative z-10"
        />
      </div>
      <span className="sr-only">Loading...</span>
    </div>
  );
};
