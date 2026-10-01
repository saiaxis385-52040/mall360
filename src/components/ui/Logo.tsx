import React from 'react';

export interface LogoProps {
  variant?: 'full' | 'icon' | 'loader';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  theme?: 'dark' | 'light';
  isLoading?: boolean;
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({
  variant = 'full',
  size = 'md',
  theme = 'dark',
  isLoading = false,
  className = '',
}) => {
  const sizeMap = {
    xs: { icon: 18, text: 'text-xs', badge: 'text-[9px] px-1' },
    sm: { icon: 26, text: 'text-sm', badge: 'text-[10px] px-1.5' },
    md: { icon: 34, text: 'text-lg', badge: 'text-xs px-1.5' },
    lg: { icon: 46, text: 'text-2xl', badge: 'text-sm px-2' },
    xl: { icon: 60, text: 'text-4xl', badge: 'text-base px-2.5' },
  };

  const currentSize = sizeMap[size];
  const isLoaderVariant = variant === 'loader' || isLoading;
  // theme === 'light' means light-colored logo for dark backgrounds
  // theme === 'dark' means dark-colored logo for light backgrounds
  const isLightLogo = theme === 'light';

  // Primary colors depending on theme
  const monogramColor = isLightLogo ? '#FFFFFF' : '#131814';
  const brandNameColor = isLightLogo ? 'text-white' : 'text-[#131814]';
  const trackColor = isLightLogo ? 'rgba(0, 218, 133, 0.25)' : 'rgba(0, 101, 61, 0.18)';
  const ringGradStart = isLightLogo ? '#00DA85' : '#008450';
  const ringGradEnd = isLightLogo ? '#54F5B6' : '#00DA85';
  const degreeColor = isLightLogo ? '#00DA85' : '#008450';

  const gradId = isLightLogo ? 'mall360_reload_grad_light' : 'mall360_reload_grad_dark';

  // The custom Mall360 Emblem with high-visibility 360° Reload Ring
  const emblem = (
    <div
      className={`relative inline-flex items-center justify-center shrink-0 ${
        isLoaderVariant ? 'scale-100' : ''
      }`}
      style={{ width: currentSize.icon, height: currentSize.icon }}
    >
      <svg
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Background track ring */}
        <circle
          cx="24"
          cy="24"
          r="20"
          stroke={trackColor}
          strokeWidth="3.2"
        />

        {/* Dynamic 360° Spinning Reload Ring */}
        <circle
          cx="24"
          cy="24"
          r="20"
          stroke={`url(#${gradId})`}
          strokeWidth="3.8"
          strokeLinecap="round"
          strokeDasharray="48 78"
          className={isLoaderVariant ? 'animate-logo-orbit origin-center' : ''}
        />

        {/* Central Geometric "M" Monogram - Always High Contrast */}
        <g className={isLoaderVariant ? 'animate-pulse origin-center' : ''}>
          <path
            d="M13 32V17L20 25L24 20L28 25L35 17V32"
            stroke={monogramColor}
            strokeWidth="3.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Neon center vertex accent dot */}
          <circle cx="24" cy="20" r="2.2" fill="#00DA85" />
        </g>

        {/* 360 Degree Indicator Satellite Notch */}
        <circle
          cx="39"
          cy="12"
          r="2.6"
          fill="#00DA85"
          className={isLoaderVariant ? 'animate-ping' : ''}
        />

        <defs>
          <linearGradient
            id={gradId}
            x1="4"
            y1="6"
            x2="44"
            y2="42"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor={ringGradStart} />
            <stop offset="0.6" stopColor="#00DA85" />
            <stop offset="1" stopColor={ringGradEnd} />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );

  if (isLoaderVariant) {
    return (
      <div className={`inline-flex items-center justify-center ${className}`}>
        {emblem}
      </div>
    );
  }

  if (variant === 'icon') {
    return <div className={`inline-flex items-center ${className}`}>{emblem}</div>;
  }

  return (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      {emblem}
      <div className="flex items-baseline tracking-tighter">
        <span className={`font-display font-black ${currentSize.text} ${brandNameColor}`}>
          MALL
        </span>
        <span className="font-display font-extrabold ml-0.5 relative" style={{ color: degreeColor }}>
          360
          <span className="absolute -top-1 -right-2 text-[9px] font-bold text-[#00DA85]">°</span>
        </span>
      </div>
    </div>
  );
};
