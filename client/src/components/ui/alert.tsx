import * as React from 'react';
import { cn } from '../../lib/utils';
import { AlertCircle, CheckCircle2, Info, XCircle } from 'lucide-react';

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'destructive' | 'success' | 'warning';
  title?: string;
}

export function Alert({ className, variant = 'default', title, children, ...props }: AlertProps) {
  const icons = {
    default: <Info className="h-4 w-4 text-slate-700 shrink-0 mt-0.5" aria-hidden="true" strokeWidth={2} />,
    destructive: <XCircle className="h-4 w-4 text-[#B42318] shrink-0 mt-0.5" aria-hidden="true" strokeWidth={2} />,
    success: <CheckCircle2 className="h-4 w-4 text-[#16803C] shrink-0 mt-0.5" aria-hidden="true" strokeWidth={2} />,
    warning: <AlertCircle className="h-4 w-4 text-amber-800 shrink-0 mt-0.5" aria-hidden="true" strokeWidth={2} />,
  };

  const variants = {
    default: 'border-slate-300 bg-slate-50 text-slate-800',
    destructive: 'border-[#FECACA] bg-[#FEF2F2] text-[#B42318]',
    success: 'border-[#BBF7D0] bg-[#F0FDF4] text-[#16803C]',
    warning: 'border-amber-200 bg-amber-50 text-amber-900',
  };

  return (
    <div
      role="alert"
      className={cn('relative flex gap-3 rounded-sm border p-3.5 text-xs sm:text-sm', variants[variant], className)}
      {...props}
    >
      {icons[variant]}
      <div className="space-y-1">
        {title && <h5 className="font-bold font-mono uppercase text-xs leading-none tracking-tight">{title}</h5>}
        <div className="text-xs leading-relaxed">{children}</div>
      </div>
    </div>
  );
}

