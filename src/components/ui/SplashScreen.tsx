import React, { useState, useEffect } from 'react';
import { Logo } from './Logo';

interface SplashScreenProps {
  minimumDisplayTimeMs?: number;
  onFinished?: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({
  minimumDisplayTimeMs = 650,
  onFinished,
}) => {
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [isRemoved, setIsRemoved] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const startTime = Date.now();

    const triggerFadeOut = () => {
      const elapsed = Date.now() - startTime;
      const remainingTime = Math.max(0, minimumDisplayTimeMs - elapsed);

      setTimeout(() => {
        if (!isMounted) return;
        setIsFadingOut(true);

        // Remove from DOM after CSS 0.5s opacity transition completes
        setTimeout(() => {
          if (!isMounted) return;
          setIsRemoved(true);
          onFinished?.();
        }, 500);
      }, remainingTime);
    };

    if (document.readyState === 'complete') {
      triggerFadeOut();
    } else {
      window.addEventListener('load', triggerFadeOut, { once: true });
    }

    return () => {
      isMounted = false;
      window.removeEventListener('load', triggerFadeOut);
    };
  }, [minimumDisplayTimeMs, onFinished]);

  if (isRemoved) return null;

  return (
    <div
      id="brand-splash-screen"
      role="status"
      aria-label="Loading..."
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-[#072418] text-white transition-opacity duration-500 ease-in-out select-none ${
        isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100 pointer-events-auto'
      }`}
    >
      {/* Background Ambience Mesh */}
      <div className="absolute inset-0 bg-radial from-[#00DA85]/15 via-[#072418] to-[#041910] pointer-events-none" />

      {/* Pure Stylish Company Logo Reload Ring (No text, no clutter) */}
      <div className="relative z-10 flex items-center justify-center p-8 rounded-full bg-[#0A2E20]/90 border border-[#144D37] shadow-2xl backdrop-blur-md animate-splash-pulse">
        <div className="absolute w-28 h-28 rounded-full bg-[#00DA85]/30 blur-2xl animate-pulse" />
        <Logo variant="loader" size="xl" theme="light" isLoading={true} className="relative z-10" />
      </div>

      <span className="sr-only">Loading...</span>
    </div>
  );
};
