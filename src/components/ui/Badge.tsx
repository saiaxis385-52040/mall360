import React from 'react';

export interface BadgeProps {
  variant?: 'brand' | 'purple' | 'urgent' | 'neutral';
  children: React.ReactNode;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'brand',
  children,
  className = '',
}) => {
  const styles = {
    brand: 'bg-[#B0FADD] text-[#00653D] border border-[#54F5B6]/50',
    purple: 'bg-[#FDEFFE] text-[#632668] border border-[#F290FA]/50',
    urgent: 'bg-[#FFEDD5] text-[#9A3412] border border-[#FDBA74]/50',
    neutral: 'bg-[#EEEEEF] text-[#334155] border border-[#C9CBCC]/50',
  };

  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-[4px] text-[11px] font-semibold tracking-wide uppercase ${styles[variant]} ${className}`}
    >
      {children}
    </span>
  );
};
