import * as React from 'react';
import { cn } from '../../lib/utils';
import { Badge } from './badge';

export interface SectionHeadingProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  badge?: string;
  badgeVariant?: 'default' | 'gold' | 'navy' | 'outline' | 'subtle' | 'success' | 'danger';
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: 'left' | 'center' | 'right';
  theme?: 'light' | 'dark';
}

export function SectionHeading({
  badge,
  badgeVariant = 'gold',
  title,
  description,
  align = 'center',
  theme = 'light',
  className,
  ...props
}: SectionHeadingProps) {
  const isCenter = align === 'center';
  const isRight = align === 'right';
  const isDark = theme === 'dark';

  return (
    <div
      className={cn(
        'max-w-3xl space-y-4 mb-12 md:mb-16',
        isCenter && 'mx-auto text-center',
        isRight && 'ml-auto text-right',
        className
      )}
      {...props}
    >
      {badge && (
        <div className={cn('flex', isCenter && 'justify-center', isRight && 'justify-end')}>
          <Badge variant={badgeVariant}>{badge}</Badge>
        </div>
      )}

      <h2
        className={cn(
          'text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight',
          isDark ? 'text-white' : 'text-[#0F1E2E]'
        )}
      >
        {title}
      </h2>

      {/* Subtle Gold Accent Line */}
      <div
        className={cn(
          'gold-divider my-3',
          isCenter && 'gold-divider-center',
          isRight && 'ml-auto'
        )}
      />

      {description && (
        <p
          className={cn(
            'text-sm sm:text-base leading-relaxed',
            isDark ? 'text-slate-300' : 'text-slate-600'
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
