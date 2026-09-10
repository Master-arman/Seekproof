import * as React from 'react';
import { Star, ShieldCheck } from 'lucide-react';
import { cn } from '../../lib/utils';
import { Badge } from './badge';

export interface TestimonialCardProps extends React.HTMLAttributes<HTMLDivElement> {
  quote: string;
  authorName: string;
  authorRole: string;
  authorCompany?: string;
  rating?: number;
  caseType?: string;
  verified?: boolean;
}

export function TestimonialCard({
  quote,
  authorName,
  authorRole,
  authorCompany,
  rating = 5,
  caseType,
  verified = true,
  className,
  ...props
}: TestimonialCardProps) {
  return (
    <div
      className={cn(
        'bg-white p-5 sm:p-6 rounded-md border border-slate-200 hover:border-slate-300 flex flex-col justify-between relative transition-colors duration-150',
        className
      )}
      {...props}
    >
      <div className="space-y-4">
        {/* Rating and Case Badge */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1" aria-label={`Rating: ${rating} out of 5 stars`}>
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={cn(
                  'h-4 w-4',
                  i < rating ? 'text-[#D4AF37] fill-[#D4AF37]' : 'text-slate-200'
                )}
                aria-hidden="true"
                strokeWidth={2}
              />
            ))}
          </div>
          {caseType && (
            <Badge variant="subtle" className="text-[10px]">
              {caseType}
            </Badge>
          )}
        </div>

        {/* Quote */}
        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic relative">
          "{quote}"
        </p>
      </div>

      {/* Author & Verification */}
      <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
        <div>
          <div className="font-bold text-xs text-[#0F1E2E]">{authorName}</div>
          <div className="text-[11px] text-slate-500">
            {authorRole}
            {authorCompany && ` • ${authorCompany}`}
          </div>
        </div>

        {verified && (
          <div className="flex items-center gap-1 text-[11px] text-[#16803C] font-semibold">
            <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" strokeWidth={2} />
            <span>Verified</span>
          </div>
        )}
      </div>
    </div>
  );
}
