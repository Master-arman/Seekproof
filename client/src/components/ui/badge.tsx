import * as React from 'react';
import { cn } from '../../lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'gold' | 'navy' | 'success' | 'danger' | 'outline' | 'subtle';
}

export function Badge({ className, variant = 'default', ...props }: BadgeProps) {
  const variants = {
    // Brand Gold Badge
    gold: 'bg-[#D4AF37]/10 text-[#785E07] border-[#D4AF37]/50 font-semibold',
    
    // Brand Navy Badge
    navy: 'bg-[#0F1E2E] text-white border-[#0F1E2E] font-medium',
    
    // Subtle Badge (for light cards)
    subtle: 'bg-slate-100 text-slate-700 border-slate-200 font-medium',
    
    // Success Badge
    success: 'bg-[#F0FDF4] text-[#16803C] border-[#BBF7D0] font-semibold',
    
    // Danger / Alert Badge
    danger: 'bg-[#FEF2F2] text-[#B42318] border-[#FECACA] font-semibold',
    
    // Outline
    outline: 'border border-slate-300 text-slate-700 bg-white font-medium',
    
    // Default
    default: 'bg-[#F1F5F9] text-slate-800 border-slate-300 font-medium',
  };

  return (
    <div
      className={cn(
        'inline-flex items-center rounded-sm border px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider transition-colors',
        variants[variant],
        className
      )}
      {...props}
    />
  );
}

