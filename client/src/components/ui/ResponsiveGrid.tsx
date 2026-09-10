import * as React from 'react';
import { cn } from '../../lib/utils';

export interface ResponsiveGridProps extends React.HTMLAttributes<HTMLDivElement> {
  columns?: 1 | 2 | 3 | 4;
  gap?: 'sm' | 'md' | 'lg' | 'xl';
}

export function ResponsiveGrid({
  className,
  columns = 3,
  gap = 'lg',
  children,
  ...props
}: ResponsiveGridProps) {
  const columnClasses = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
  };

  const gapClasses = {
    sm: 'gap-3 sm:gap-4',
    md: 'gap-4 sm:gap-6',
    lg: 'gap-6 sm:gap-8',
    xl: 'gap-8 sm:gap-10',
  };

  return (
    <div
      className={cn('grid w-full', columnClasses[columns], gapClasses[gap], className)}
      {...props}
    >
      {children}
    </div>
  );
}
