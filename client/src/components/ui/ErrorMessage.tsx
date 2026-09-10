import * as React from 'react';
import { AlertCircle, RefreshCw, XCircle } from 'lucide-react';
import { cn } from '../../lib/utils';
import { Button } from './button';

export interface ErrorMessageProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  message: string;
  onRetry?: () => void;
  variant?: 'card' | 'inline';
}

export function ErrorMessage({
  title = 'Operation Encountered an Error',
  message,
  onRetry,
  variant = 'card',
  className,
  ...props
}: ErrorMessageProps) {
  if (variant === 'inline') {
    return (
      <div
        role="alert"
        className={cn(
          'flex items-center gap-2 p-2.5 rounded-sm bg-[#FEF2F2] border border-[#FECACA] text-[#B42318] text-xs font-medium',
          className
        )}
        {...props}
      >
        <XCircle className="h-4 w-4 shrink-0" aria-hidden="true" strokeWidth={2} />
        <span className="flex-1">{message}</span>
        {onRetry && (
          <button
            type="button"
            onClick={onRetry}
            className="text-xs font-bold underline hover:no-underline cursor-pointer"
            aria-label="Retry action"
          >
            Retry
          </button>
        )}
      </div>
    );
  }

  return (
    <div
      role="alert"
      className={cn(
        'rounded-md border border-[#FECACA] bg-[#FEF2F2] p-5 text-center space-y-3 max-w-md mx-auto',
        className
      )}
      {...props}
    >
      <div className="inline-flex p-2 rounded-sm bg-red-100 text-[#B42318]">
        <AlertCircle className="h-5 w-5" aria-hidden="true" strokeWidth={2} />
      </div>

      <div className="space-y-1">
        <h4 className="text-xs font-bold text-[#B42318] uppercase tracking-wider font-mono">{title}</h4>
        <p className="text-xs text-slate-700 leading-relaxed font-normal">{message}</p>
      </div>

      {onRetry && (
        <div className="pt-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onRetry}
            className="text-xs border-[#FECACA] hover:bg-white text-[#B42318] font-mono font-semibold"
            aria-label="Retry Request"
          >
            <RefreshCw className="h-3 w-3 mr-1.5" aria-hidden="true" strokeWidth={2} /> Retry Request
          </Button>
        </div>
      )}
    </div>
  );
}

