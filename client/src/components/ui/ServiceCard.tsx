import * as React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Check } from 'lucide-react';
import { cn } from '../../lib/utils';
import { Badge } from './badge';
import { Button } from './button';

export interface ServiceCardProps extends React.HTMLAttributes<HTMLDivElement> {
  icon: React.ReactNode;
  category?: string;
  title: string;
  description: string;
  features?: string[];
  linkTo?: string;
  actionText?: string;
}

export function ServiceCard({
  icon,
  category,
  title,
  description,
  features,
  linkTo = '/contact',
  actionText = 'Inquire on Service',
  className,
  ...props
}: ServiceCardProps) {
  return (
    <div
      className={cn(
        'group flex flex-col justify-between rounded-md p-5 sm:p-6 bg-white border border-slate-200 hover:border-slate-300 transition-colors duration-150',
        className
      )}
      {...props}
    >
      <div className="space-y-4">
        {/* Top Icon & Badge Header */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-sm border border-slate-200 bg-[#F8FAFC] text-[#0F1E2E] group-hover:border-[#0F1E2E] transition-colors">
            {icon}
          </div>
          {category && (
            <Badge variant="subtle" className="text-[10px]">
              {category}
            </Badge>
          )}
        </div>

        {/* Title & Description */}
        <div className="space-y-1.5">
          <h3 className="text-base sm:text-lg font-bold tracking-tight text-[#0F1E2E] group-hover:text-[#0F1E2E]">
            {title}
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
            {description}
          </p>
        </div>

        {/* Feature deliverables */}
        {features && features.length > 0 && (
          <div className="pt-3 border-t border-slate-100 space-y-1.5">
            <span className="text-[10px] uppercase font-mono tracking-wider font-semibold text-slate-500">
              Key Deliverables:
            </span>
            <ul className="space-y-1 text-xs">
              {features.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-2 text-slate-700">
                  <Check className="h-3.5 w-3.5 text-[#D4AF37] shrink-0 mt-0.5" aria-hidden="true" strokeWidth={2.5} />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Action Footer */}
      <div className="pt-4 mt-4 border-t border-slate-100">
        <Link to={linkTo} className="block w-full">
          <Button
            variant="secondary"
            size="sm"
            className="w-full justify-center text-xs font-semibold"
            aria-label={`${actionText} - ${title}`}
          >
            {actionText} <ChevronRight className="h-3.5 w-3.5 ml-1 text-slate-500" aria-hidden="true" strokeWidth={2} />
          </Button>
        </Link>
      </div>
    </div>
  );
}

