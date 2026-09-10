import React from 'react';
import { 
  ShieldCheck, 
  LockKeyhole, 
  Award, 
  ClipboardCheck, 
  Scale, 
  CheckCircle,
  EyeOff
} from 'lucide-react';
import { cn } from '../../lib/utils';

export interface TrustBadgeItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ReactNode;
  tag: string;
}

export const TRUST_BADGES: TrustBadgeItem[] = [
  {
    id: 'badge-1',
    title: '256-Bit AES PGP Encryption',
    subtitle: 'Zero-Knowledge Security',
    description: 'All field logs, electronic dossiers, and client messages are protected with industry-standard 256-bit AES encryption.',
    icon: <LockKeyhole className="h-5 w-5 text-[#D4AF37]" aria-hidden="true" strokeWidth={2} />,
    tag: 'SEC-256-AES'
  },
  {
    id: 'badge-2',
    title: 'ISO/IEC 27037 Compliant',
    subtitle: 'Digital Evidence Integrity',
    description: 'Adheres to global standards for digital forensics and strict evidentiary chain of custody.',
    icon: <ClipboardCheck className="h-5 w-5 text-[#D4AF37]" aria-hidden="true" strokeWidth={2} />,
    tag: 'ISO/IEC 27037'
  },
  {
    id: 'badge-3',
    title: 'Binding Automatic NDA',
    subtitle: 'Statutory Privilege Standard',
    description: 'Every intake and client conversation is covered by immediate, legally enforceable Non-Disclosure Agreements.',
    icon: <ShieldCheck className="h-5 w-5 text-[#D4AF37]" aria-hidden="true" strokeWidth={2} />,
    tag: 'LEGAL-NDA-98'
  },
  {
    id: 'badge-4',
    title: 'Certified Operatives',
    subtitle: 'APDI & WAD Affiliated',
    description: 'Field operatives with certified backgrounds in state cyber cells, forensic accounting, and intelligence units.',
    icon: <Award className="h-5 w-5 text-[#D4AF37]" aria-hidden="true" strokeWidth={2} />,
    tag: 'LIC-APDI-2026'
  },
  {
    id: 'badge-5',
    title: 'Strict Ethical Limitation',
    subtitle: 'No Unlawful Surveillance',
    description: 'We operate strictly within statutory frameworks, providing admissible factual evidence without unlawful trespassing.',
    icon: <Scale className="h-5 w-5 text-[#D4AF37]" aria-hidden="true" strokeWidth={2} />,
    tag: 'ETHICS-VERIFIED'
  },
  {
    id: 'badge-6',
    title: 'Zero-Telemetry Data Purge',
    subtitle: 'Permanent Metadata Scrubbing',
    description: 'Upon case closure, clients can request a cryptographic zero-trace purge of all case metadata.',
    icon: <EyeOff className="h-5 w-5 text-[#D4AF37]" aria-hidden="true" strokeWidth={2} />,
    tag: 'PURGE-READY'
  }
];

export interface TrustBadgesProps {
  variant?: 'grid' | 'ribbon' | 'cards' | 'compact';
  theme?: 'dark' | 'light';
  className?: string;
  items?: TrustBadgeItem[];
}

export function TrustBadges({
  variant = 'cards',
  className = '',
  items = TRUST_BADGES
}: TrustBadgesProps) {
  if (variant === 'ribbon') {
    return (
      <div className={cn(
        'w-full py-3.5 border-y border-slate-200 bg-[#F8FAFC] overflow-x-auto scrollbar-none',
        className
      )}>
        <div className="flex items-center justify-around gap-6 min-w-max px-4">
          {items.map((b) => (
            <div key={b.id} className="flex items-center gap-2.5 px-3 py-1">
              <div className="p-1 rounded-sm bg-white border border-slate-200 text-[#0F1E2E]">
                {b.icon}
              </div>
              <div>
                <div className="text-xs font-bold font-sans text-[#0F1E2E]">
                  {b.title}
                </div>
                <div className="text-[10px] font-mono text-slate-500">
                  {b.subtitle}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <div className={cn('grid grid-cols-2 sm:grid-cols-3 gap-2.5', className)}>
        {items.map((b) => (
          <div
            key={b.id}
            className="p-3 rounded-md border border-slate-200 bg-white flex items-start gap-2.5"
          >
            <div className="p-1 rounded-sm bg-[#F8FAFC] border border-slate-200 text-[#0F1E2E] shrink-0 mt-0.5">
              {b.icon}
            </div>
            <div className="min-w-0">
              <div className="text-xs font-bold truncate text-[#0F1E2E]">
                {b.title}
              </div>
              <div className="text-[10px] text-slate-500 truncate font-mono">
                {b.tag}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={cn('grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5', className)}>
      {items.map((b) => (
        <div
          key={b.id}
          className="p-5 sm:p-6 rounded-md border border-slate-200 bg-white hover:border-slate-300 transition-colors duration-150 flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="h-9 w-9 rounded-sm bg-[#F8FAFC] border border-slate-200 flex items-center justify-center text-[#0F1E2E]">
                {b.icon}
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-sm bg-slate-100 text-slate-700 border border-slate-200 font-semibold">
                {b.tag}
              </span>
            </div>

            <h4 className="text-xs sm:text-sm font-bold font-sans text-[#0F1E2E]">
              {b.title}
            </h4>
            <div className="text-[11px] font-mono text-slate-500 mt-0.5">
              {b.subtitle}
            </div>

            <p className="text-xs mt-2 leading-relaxed text-slate-600 font-normal">
              {b.description}
            </p>
          </div>

          <div className="pt-3 mt-4 border-t border-slate-100 flex items-center gap-1.5 text-[10px] font-mono text-[#16803C] font-semibold">
            <CheckCircle className="h-3.5 w-3.5" aria-hidden="true" strokeWidth={2} />
            <span>Audit & Verification Passed</span>
          </div>
        </div>
      ))}
    </div>
  );
}


export default TrustBadges;
