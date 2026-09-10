import * as React from 'react';
import { cn } from '../../lib/utils';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'white' | 'slate' | 'navy' | 'dossier';
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'white', ...props }, ref) => {
    const variantStyles = {
      white: 'bg-white text-slate-900 border border-slate-200',
      slate: 'bg-[#F8FAFC] text-slate-900 border border-slate-200',
      navy: 'bg-white text-slate-900 border border-slate-300',
      dossier: 'bg-white text-slate-900 border-l-2 border-l-[#0F1E2E] border-y border-r border-slate-200',
    };

    return (
      <div
        ref={ref}
        className={cn(
          'rounded-md p-5 sm:p-6 transition-colors duration-150',
          variantStyles[variant],
          className
        )}
        {...props}
      />
    );
  }
);
Card.displayName = 'Card';

export const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex flex-col space-y-1.5 pb-3', className)} {...props} />
  )
);
CardHeader.displayName = 'CardHeader';

export const CardTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3 ref={ref} className={cn('text-base sm:text-lg font-bold tracking-tight text-[#0F1E2E]', className)} {...props} />
  )
);
CardTitle.displayName = 'CardTitle';

export const CardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={cn('text-xs text-slate-500 leading-relaxed', className)} {...props} />
  )
);
CardDescription.displayName = 'CardDescription';

export const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('space-y-3', className)} {...props} />
  )
);
CardContent.displayName = 'CardContent';

export const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex items-center pt-3 border-t border-slate-100', className)} {...props} />
  )
);
CardFooter.displayName = 'CardFooter';

