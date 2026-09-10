import * as React from 'react';
import { cn } from '../../lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  label?: string;
  theme?: 'light' | 'dark' | string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, error, ...props }, ref) => {
    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
            {label}
          </label>
        )}
        <input
          type={type}
          className={cn(
            'flex h-9 w-full rounded-sm border border-slate-300 bg-white px-3 py-1.5 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 transition-colors',
            'focus-visible:outline-none focus-visible:border-[#0F1E2E] focus-visible:ring-1 focus-visible:ring-[#0F1E2E]',
            'disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-slate-50',
            error && 'border-[#B42318] focus-visible:border-[#B42318] focus-visible:ring-[#B42318]',
            className
          )}
          ref={ref}
          {...props}
        />
        {error && <p className="text-xs font-medium text-[#B42318]">{error}</p>}
      </div>
    );
  }
);
Input.displayName = 'Input';

