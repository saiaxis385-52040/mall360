import React from 'react';
import { Logo } from './Logo';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled,
  className = '',
  children,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium font-display transition-all duration-150 rounded-[6px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 whitespace-nowrap shrink-0 disabled:opacity-50 disabled:pointer-events-none disabled:shadow-none cursor-pointer select-none active:translate-y-[1px] active:translate-x-[1px]';

  const sizeStyles = {
    sm: 'text-xs py-1.5 px-3.5 gap-1.5 min-h-[32px]',
    md: 'text-sm py-2 px-4 gap-2 min-h-[40px]',
    lg: 'text-base py-2.5 px-6 gap-2.5 min-h-[46px]',
  };

  const variantStyles = {
    primary: 'bg-[#008450] hover:bg-[#00653D] text-white shadow-veirdo-sm hover:shadow-none focus-visible:ring-[#00AA68] active:shadow-none',
    secondary: 'bg-[#632668] hover:bg-[#813288] text-white shadow-veirdo-sm hover:shadow-none focus-visible:ring-[#D652E1]',
    outline: 'border border-[#C9CBCC] bg-white hover:bg-[#F1F8FF] text-[#131814] hover:border-[#131814] focus-visible:ring-[#2563EB]',
    ghost: 'bg-transparent hover:bg-[#EEEEEE] text-[#334155] hover:text-[#131814] focus-visible:ring-[#74797D]',
    danger: 'bg-[#8C1F20] hover:bg-[#B5282A] text-white focus-visible:ring-[#E83336]',
  };

  return (
    <button
      disabled={disabled || isLoading}
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {isLoading ? (
        <span className="flex items-center gap-2">
          <Logo variant="loader" size="xs" isLoading theme={variant === 'outline' || variant === 'ghost' ? 'dark' : 'light'} />
          <span>Processing...</span>
        </span>
      ) : (
        children
      )}
    </button>
  );
};

