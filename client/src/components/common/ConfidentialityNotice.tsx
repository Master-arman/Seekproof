import React from 'react';
import { 
  ShieldCheck, 
  LockKeyhole, 
  EyeOff, 
  ClipboardCheck, 
  AlertTriangle,
  Scale,
  KeyRound,
  HardDrive
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { Badge } from '../ui/badge';

export interface ConfidentialityNoticeProps {
  variant?: 'card' | 'banner' | 'dossier';
  theme?: 'dark' | 'light';
  className?: string;
  showLegalLimitations?: boolean;
}

export function ConfidentialityNotice({
  variant = 'card',
  className = '',
  showLegalLimitations = true
}: ConfidentialityNoticeProps) {
  const protocols = [
    {
      icon: <LockKeyhole className="h-4 w-4 text-[#0F1E2E]" aria-hidden="true" strokeWidth={2} />,
      title: 'Automatic Binding NDA',
      desc: 'Enforced immediately upon initial contact before case specifics are revealed.'
    },
    {
      icon: <KeyRound className="h-4 w-4 text-[#0F1E2E]" aria-hidden="true" strokeWidth={2} />,
      title: '256-Bit PGP Client Vault',
      desc: 'Multi-factor encrypted client communications with zero unencrypted transmission.'
    },
    {
      icon: <HardDrive className="h-4 w-4 text-[#0F1E2E]" aria-hidden="true" strokeWidth={2} />,
      title: 'Air-Gapped Evidence Storage',
      desc: 'Digital proof and physical evidentiary files stored on disconnected secure servers.'
    },
    {
      icon: <EyeOff className="h-4 w-4 text-[#0F1E2E]" aria-hidden="true" strokeWidth={2} />,
      title: 'Zero-Knowledge Metadata Purge',
      desc: 'Option to irreversibly wipe operative logs and client metadata following case delivery.'
    }
  ];

  if (variant === 'banner') {
    return (
      <div className={cn(
        'p-4 rounded-md border border-slate-200 bg-[#F8FAFC] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3',
        className
      )}>
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-sm bg-white border border-slate-200 flex items-center justify-center text-[#0F1E2E] shrink-0">
            <LockKeyhole className="h-4.5 w-4.5" aria-hidden="true" strokeWidth={2} />
          </div>
          <div>
            <h4 className="text-xs sm:text-sm font-bold text-[#0F1E2E] font-mono">
              Strict Non-Disclosure & Confidentiality Protocol
            </h4>
            <p className="text-xs text-slate-500 font-normal">
              All communications are encrypted and strictly confidential under statutory NDA protections.
            </p>
          </div>
        </div>
        <Badge variant="default" className="text-[10px] font-mono whitespace-nowrap">
          256-BIT ENCRYPTED
        </Badge>
      </div>
    );
  }

  return (
    <div className={cn(
      'rounded-md border border-slate-200 bg-white p-5 sm:p-7 relative overflow-hidden text-slate-900',
      className
    )}>
      <div className="relative z-10 space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b pb-3.5 border-slate-200">
          <div className="flex items-center gap-2.5">
            <div className="h-9 w-9 rounded-sm bg-[#F8FAFC] border border-slate-200 flex items-center justify-center text-[#0F1E2E]">
              <ShieldCheck className="h-5 w-5" aria-hidden="true" strokeWidth={2} />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold font-mono text-[#0F1E2E]">
                Confidentiality & Data Protection Notice
              </h3>
              <p className="text-[11px] text-slate-500 font-mono">
                Statutory Privilege • Binding NDA Protected
              </p>
            </div>
          </div>
          <Badge variant="gold" className="font-mono text-[10px]">
            ISO/IEC 27037 STANDARD
          </Badge>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {protocols.map((p, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-sm border border-slate-200 bg-[#F8FAFC] flex items-start gap-2.5"
            >
              <div className="p-1.5 rounded-sm bg-white border border-slate-200 shrink-0 mt-0.5 text-[#0F1E2E]">
                {p.icon}
              </div>
              <div className="space-y-0.5">
                <h5 className="text-xs font-bold font-mono text-[#0F1E2E]">
                  {p.title}
                </h5>
                <p className="text-[11px] text-slate-600 leading-relaxed font-normal">
                  {p.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {showLegalLimitations && (
          <div className="p-3.5 rounded-sm border border-amber-200 bg-amber-50/70 text-xs leading-relaxed space-y-1.5 text-amber-950">
            <div className="flex items-center gap-2 font-bold text-amber-900 font-mono text-[11px]">
              <Scale className="h-4 w-4 shrink-0" aria-hidden="true" strokeWidth={2} />
              <span>Legal Limits of Intelligence Operations</span>
            </div>
            <p className="text-[11px] text-slate-700 leading-relaxed font-normal">
              SeekProof operates strictly within statutory limits of private investigation. We do not engage in unauthorized wiretapping, illegal GPS tracking, cyber-trespass, or unlawful eavesdropping. All evidence is obtained through legitimate intelligence, open-source records, physical surveillance in public spaces, and consensual digital discovery.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ConfidentialityNotice;

