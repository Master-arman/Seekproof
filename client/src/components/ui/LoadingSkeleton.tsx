import * as React from 'react';
import { cn } from '../../lib/utils';

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <div
      className={cn('animate-pulse rounded-sm bg-slate-200', className)}
      {...props}
    />
  );
}

export function CardSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn('bg-white p-5 sm:p-6 rounded-md border border-slate-200 space-y-4', className)}>
      <div className="flex items-center justify-between">
        <Skeleton className="h-9 w-9 rounded-sm" />
        <Skeleton className="h-4 w-16 rounded-sm" />
      </div>
      <Skeleton className="h-4 w-3/4 rounded-sm" />
      <div className="space-y-2">
        <Skeleton className="h-3 w-full rounded-sm" />
        <Skeleton className="h-3 w-5/6 rounded-sm" />
      </div>
      <Skeleton className="h-8 w-full rounded-sm mt-4" />
    </div>
  );
}

export function TableRowSkeleton({ columns = 4 }: { columns?: number }) {
  return (
    <div className="flex items-center gap-4 py-3 px-4 border-b border-slate-100">
      {Array.from({ length: columns }).map((_, idx) => (
        <Skeleton key={idx} className="h-4 flex-1 rounded-sm" />
      ))}
    </div>
  );
}

