import React, { useState } from 'react';
import { Logo } from './Logo';

interface ProductImageProps {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  loaderSize?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  theme?: 'dark' | 'light';
}

export const ProductImage: React.FC<ProductImageProps> = ({
  src,
  alt,
  className = '',
  containerClassName = '',
  loaderSize = 'md',
  theme = 'dark',
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  return (
    <div
      className={`relative overflow-hidden bg-[#F5F5F4] flex items-center justify-center ${containerClassName}`}
    >
      {/* Stylish Mall360 Company Logo Reload Ring (shown whenever image is loading / slow network) */}
      {!isLoaded && !hasError && (
        <div
          role="status"
          aria-label="Loading product image..."
          className="absolute inset-0 flex items-center justify-center bg-[#F7F7F6] z-10 select-none transition-opacity duration-300"
        >
          {/* Circular disc framing the logo reload ring */}
          <div className="relative flex items-center justify-center p-3.5 sm:p-4 rounded-full bg-white/95 border border-[#EEEEEF] shadow-sm backdrop-blur-sm">
            {/* Subtle emerald breathing halo */}
            <div className="absolute inset-0 rounded-full bg-[#00DA85]/15 blur-sm animate-pulse" />
            
            {/* The Company Logo as the Reload Ring */}
            <Logo
              variant="loader"
              size={loaderSize}
              theme={theme}
              isLoading={true}
              className="relative z-10"
            />
          </div>
          <span className="sr-only">Loading image...</span>
        </div>
      )}

      {/* Actual Product Image */}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        referrerPolicy="no-referrer"
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        className={`w-full h-full object-cover object-center transition-opacity duration-500 ease-out ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        } ${className}`}
      />

      {/* Fallback if error */}
      {hasError && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#EFEFEF] text-[#71717A] p-4 text-center">
          <div className="p-3 rounded-full bg-white shadow-sm border border-[#EEEEEF] mb-2">
            <Logo variant="loader" size="sm" theme="light" isLoading={false} />
          </div>
          <span className="text-[10px] font-mono uppercase tracking-wider text-[#51575C]">
            Image Unavailable
          </span>
        </div>
      )}
    </div>
  );
};
