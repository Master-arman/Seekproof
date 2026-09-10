import * as React from 'react';
import { cn } from '../../lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'primary' | 'secondary' | 'outline' | 'gold' | 'ghost' | 'danger' | 'navy' | 'dark';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'inline-flex items-center justify-center font-semibold rounded-sm transition-all duration-150 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0F1E2E] focus-visible:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer select-none';

    const variants = {
      // Default / Primary Navy Button (Commanding, authoritative institutional solid)
      default:
        'bg-[#0F1E2E] hover:bg-[#070E18] text-white border border-[#0F1E2E] active:bg-[#000000]',
      primary:
        'bg-[#0F1E2E] hover:bg-[#070E18] text-white border border-[#0F1E2E] active:bg-[#000000]',
      
      // Dark Solid Button
      dark:
        'bg-[#0F1E2E] hover:bg-[#070E18] text-white border border-[#0F1E2E] active:bg-[#000000]',
      
      // Secondary Light Slate Button (Clean document action)
      secondary:
        'bg-[#F1F5F9] hover:bg-[#E2E8F0] text-[#0F1E2E] border border-slate-300 active:bg-slate-300',
      
      // Outline Button (Crisp document button)
      outline:
        'border border-slate-300 hover:border-slate-400 bg-white text-slate-800 hover:bg-slate-50 active:bg-slate-100',
      
      // Gold Solid Button (High priority brass action)
      gold:
        'bg-[#D4AF37] hover:bg-[#B8972E] active:bg-[#9E8024] text-[#070E18] font-bold border border-[#D4AF37]',

      // Solid Deep Navy Button
      navy:
        'bg-[#070E18] hover:bg-[#000000] text-white border border-[#070E18]',
      
      // Ghost Button
      ghost:
        'bg-transparent hover:bg-slate-100 text-slate-700 hover:text-slate-900 border border-transparent',
      
      // Danger Red Button
      danger:
        'bg-[#B42318] hover:bg-[#91180F] text-white border border-[#B42318]',
    };

    const sizes = {
      sm: 'text-xs px-3 py-1.5 h-8 gap-1.5',
      md: 'text-xs sm:text-sm px-4 py-2 h-9 gap-2',
      lg: 'text-sm sm:text-base px-5 py-2.5 h-10 gap-2',
      icon: 'h-9 w-9 p-0',
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {isLoading && (
          <svg
            className="animate-spin -ml-1 mr-2 h-3.5 w-3.5 text-current"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {children}
      </button>
    );
  }
);
Button.displayName = 'Button';

// Reusable Named Button Wrappers for Convenience
export const PrimaryButton = React.forwardRef<HTMLButtonElement, Omit<ButtonProps, 'variant'>>(
  (props, ref) => <Button ref={ref} variant="primary" {...props} />
);
PrimaryButton.displayName = 'PrimaryButton';

export const DarkButton = React.forwardRef<HTMLButtonElement, Omit<ButtonProps, 'variant'>>(
  (props, ref) => <Button ref={ref} variant="dark" {...props} />
);
DarkButton.displayName = 'DarkButton';

export const NavyButton = React.forwardRef<HTMLButtonElement, Omit<ButtonProps, 'variant'>>(
  (props, ref) => <Button ref={ref} variant="navy" {...props} />
);
NavyButton.displayName = 'NavyButton';

export const SecondaryButton = React.forwardRef<HTMLButtonElement, Omit<ButtonProps, 'variant'>>(
  (props, ref) => <Button ref={ref} variant="secondary" {...props} />
);
SecondaryButton.displayName = 'SecondaryButton';

export const OutlineButton = React.forwardRef<HTMLButtonElement, Omit<ButtonProps, 'variant'>>(
  (props, ref) => <Button ref={ref} variant="outline" {...props} />
);
OutlineButton.displayName = 'OutlineButton';

export const GoldButton = React.forwardRef<HTMLButtonElement, Omit<ButtonProps, 'variant'>>(
  (props, ref) => <Button ref={ref} variant="gold" {...props} />
);
GoldButton.displayName = 'GoldButton';

