import * as React from 'react';
import { LucideIcon, ArrowUpRight } from 'lucide-react';
import { cn } from '../../lib/utils';
import { Badge } from './badge';

export interface ContactInfoCardProps extends React.HTMLAttributes<HTMLDivElement> {
  icon: LucideIcon;
  title: string;
  primaryInfo: string;
  secondaryInfo?: string;
  badge?: string;
  actionHref?: string;
  actionText?: string;
  isDark?: boolean;
}

export function ContactInfoCard({
  icon: Icon,
  title,
  primaryInfo,
  secondaryInfo,
  badge,
  actionHref,
  actionText = 'Connect',
  className,
  ...props
}: ContactInfoCardProps) {
  return (
    <div
      className={cn(
        'rounded-md p-5 flex flex-col justify-between bg-white border border-slate-200 hover:border-slate-300 transition-colors duration-150',
        className
      )}
      {...props}
    >
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex h-9 w-9 items-center justify-center rounded-sm border border-slate-200 bg-[#F8FAFC] text-[#0F1E2E]">
            <Icon className="h-4 w-4 text-[#0F1E2E]" aria-hidden="true" strokeWidth={2} />
          </div>
          {badge && (
            <Badge variant="gold" className="text-[10px]">
              {badge}
            </Badge>
          )}
        </div>

        <div>
          <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 font-mono">
            {title}
          </div>
          <div className="text-sm sm:text-base font-bold mt-0.5 text-[#0F1E2E] font-mono">
            {primaryInfo}
          </div>
          {secondaryInfo && (
            <div className="text-xs mt-1 leading-relaxed text-slate-600 font-normal">
              {secondaryInfo}
            </div>
          )}
        </div>
      </div>

      {actionHref && (
        <div className="pt-3 mt-3 border-t border-slate-100">
          <a
            href={actionHref}
            className="inline-flex items-center text-xs font-bold text-[#0F1E2E] hover:text-[#D4AF37] transition-colors gap-1 font-mono"
            aria-label={`${actionText}: ${title} (${primaryInfo})`}
          >
            <span>{actionText}</span>
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
        </div>
      )}
    </div>
  );
}

