import * as React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Shield } from 'lucide-react';
import { cn } from '../../lib/utils';
import { Badge } from './badge';
import { Container } from './Container';

export interface BreadcrumbItem {
  label: string;
  path?: string;
}

export interface PageHeroProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  badge?: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  breadcrumbs?: BreadcrumbItem[];
  actions?: React.ReactNode;
}

export function PageHero({
  badge,
  title,
  subtitle,
  breadcrumbs,
  actions,
  className,
  ...props
}: PageHeroProps) {
  return (
    <div
      className={cn(
        'relative bg-[#F1F5F9] text-slate-900 border-b border-slate-200 py-12 md:py-16 overflow-hidden',
        className
      )}
      {...props}
    >
      {/* Background Subtle Grid Texture */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#E2E8F0_1px,transparent_1px),linear-gradient(to_bottom,#E2E8F0_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none opacity-40" />

      <Container size="xl" className="relative z-10">
        <div className="max-w-3xl space-y-4">
          {/* Breadcrumbs */}
          {breadcrumbs && breadcrumbs.length > 0 && (
            <nav className="flex items-center gap-1.5 text-xs text-slate-500 font-mono" aria-label="Breadcrumb">
              <Link to="/" className="hover:text-[#0F1E2E] transition-colors">
                Home
              </Link>
              {breadcrumbs.map((crumb, idx) => (
                <React.Fragment key={idx}>
                  <ChevronRight className="h-3 w-3 text-slate-400" aria-hidden="true" strokeWidth={2} />
                  {crumb.path ? (
                    <Link to={crumb.path} className="hover:text-[#0F1E2E] transition-colors">
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className="text-[#0F1E2E] font-semibold" aria-current="page">{crumb.label}</span>
                  )}
                </React.Fragment>
              ))}
            </nav>
          )}

          {badge && (
            <div className="inline-flex">
              <Badge variant="gold" className="gap-1.5">
                <Shield className="h-3.5 w-3.5" aria-hidden="true" strokeWidth={2} />
                {badge}
              </Badge>
            </div>
          )}

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[#0F1E2E] leading-tight">
            {title}
          </h1>

          {/* Gold Accent Divider */}
          <div className="gold-divider" aria-hidden="true" />

          {subtitle && (
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl font-normal">
              {subtitle}
            </p>
          )}

          {actions && <div className="pt-2 flex flex-wrap gap-3">{actions}</div>}
        </div>
      </Container>
    </div>
  );
}

