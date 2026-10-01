import React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  icon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, icon, className = '', id, disabled, ...props }, ref) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="w-full flex flex-col gap-1.5 text-left">
        {label && (
          <label htmlFor={inputId} className="text-xs font-semibold uppercase tracking-wider text-[#334155] select-none">
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          {icon && (
            <div className="absolute left-3 flex items-center pointer-events-none text-[#74797D]">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            id={inputId}
            disabled={disabled}
            className={`w-full rounded-[5px] border bg-white px-3.5 py-2 text-sm text-[#131814] placeholder-[#74797D] transition-colors focus:outline-none disabled:bg-[#EEEEEF] disabled:text-[#74797D] disabled:cursor-not-allowed ${
              icon ? 'pl-9' : ''
            } ${
              error
                ? 'border-[#8C1F20] focus:ring-1 focus:ring-[#8C1F20]'
                : 'border-[#C9CBCC] hover:border-[#131814] focus:border-[#008450] focus:ring-1 focus:ring-[#008450]'
            } ${className}`}
            {...props}
          />
        </div>
        {error && <span className="text-xs text-[#8C1F20] font-medium">{error}</span>}
        {!error && hint && <span className="text-xs text-[#51575C]">{hint}</span>}
      </div>
    );
  }
);

Input.displayName = 'Input';
