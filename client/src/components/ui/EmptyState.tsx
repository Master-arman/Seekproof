import * as React from 'react';
import { LucideIcon, FolderSearch } from 'lucide-react';
import { cn } from '../../lib/utils';
import { Button } from './button';

export interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: LucideIcon;
  title: string;
  description: string;
  actionText?: string;
  onAction?: () => void;
}

export function EmptyState({
  icon: Icon = FolderSearch,
  title,
  description,
  actionText,
  onAction,
  className,
  ...props
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        'text-center py-12 px-6 rounded-md border border-slate-200 bg-white flex flex-col items-center justify-center space-y-4 max-w-lg mx-auto text-slate-900',
        className
      )}
      {...props}
    >
      <div className="p-3 rounded-sm border border-slate-200 bg-[#F8FAFC] text-[#0F1E2E]">
        <Icon className="h-7 w-7" aria-hidden="true" strokeWidth={1.75} />
      </div>

      <div className="space-y-1">
        <h4 className="text-base font-bold tracking-tight text-[#0F1E2E] font-mono">{title}</h4>
        <p className="text-xs text-slate-500 leading-relaxed max-w-sm font-normal">
          {description}
        </p>
      </div>

      {actionText && onAction && (
        <Button
          variant="secondary"
          size="sm"
          onClick={onAction}
          className="mt-2 text-xs font-semibold"
        >
          {actionText}
        </Button>
      )}
    </div>
  );
}

