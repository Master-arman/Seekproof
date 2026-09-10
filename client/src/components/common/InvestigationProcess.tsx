import React from 'react';
import { 
  Phone, 
  FileSearch, 
  Compass, 
  ShieldCheck, 
  ClipboardCheck,
  ArrowRight,
  LockKeyhole,
  Scale
} from 'lucide-react';
import { cn } from '../../lib/utils';

export interface ProcessStep {
  number: string;
  title: string;
  summary: string;
  description: string;
  icon: React.ReactNode;
  tag: string;
}

export const PROCESS_STEPS: ProcessStep[] = [
  {
    number: '01',
    title: 'Confidential Case Intake',
    summary: 'Zero-Cost Initial Consultation',
    description: 'Preliminary briefing conducted under an automatic, binding Non-Disclosure Agreement (NDA) to understand your objectives and legal standing.',
    icon: <Phone className="h-5 w-5 text-[#997B24]" aria-hidden="true" strokeWidth={2} />,
    tag: 'NDA INITIATED'
  },
  {
    number: '02',
    title: 'Feasibility & Legal Audit',
    summary: 'Strategic Case Evaluation',
    description: 'Senior investigators evaluate available facts, risk variables, jurisdiction limitations, and establish strict evidentiary parameters.',
    icon: <FileSearch className="h-5 w-5 text-[#997B24]" aria-hidden="true" strokeWidth={2} />,
    tag: 'RISK MAPPED'
  },
  {
    number: '03',
    title: 'Tactical Operative Strategy',
    summary: 'Field & Cyber Blueprint',
    description: 'Formulation of discrete field schedules, digital forensic recovery protocols, and milestone checkpoints tailored to the case scope.',
    icon: <Compass className="h-5 w-5 text-[#997B24]" aria-hidden="true" strokeWidth={2} />,
    tag: 'PLAN DEPLOYED'
  },
  {
    number: '04',
    title: 'Evidence Gathering & Logging',
    summary: 'Chain of Custody Documentation',
    description: 'Operatives execute discrete surveillance, data forensics, and photographic logging with strict digital provenance and timestamping.',
    icon: <ShieldCheck className="h-5 w-5 text-[#997B24]" aria-hidden="true" strokeWidth={2} />,
    tag: 'FORENSIC LOGGED'
  },
  {
    number: '05',
    title: 'Encrypted Dossier Delivery',
    summary: 'Court-Ready Evidentiary Report',
    description: 'Delivery of a comprehensive, court-admissible dossier, forensic artifacts, and executive summary via encrypted client portal.',
    icon: <ClipboardCheck className="h-5 w-5 text-[#997B24]" aria-hidden="true" strokeWidth={2} />,
    tag: 'DOSSIER SECURED'
  }
];

export interface InvestigationProcessProps {
  theme?: 'dark' | 'light';
  className?: string;
  steps?: ProcessStep[];
  showLegalDisclaimer?: boolean;
}

export function InvestigationProcess({
  className = '',
  steps = PROCESS_STEPS,
  showLegalDisclaimer = true
}: InvestigationProcessProps) {
  return (
    <div className={cn('w-full', className)}>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {steps.map((step, index) => (
          <div
            key={index}
            className="rounded-md p-5 sm:p-6 flex flex-col justify-between relative border border-slate-200 bg-white hover:border-[#0F1E2E] transition-colors duration-150"
          >
            {/* Connecting line indicator for desktop */}
            {index < steps.length - 1 && (
              <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-20 text-slate-400" aria-hidden="true">
                <ArrowRight className="h-4 w-4" strokeWidth={2} />
              </div>
            )}

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="flex h-8 w-8 items-center justify-center rounded-sm bg-[#0F1E2E] text-[#D4AF37] font-mono text-xs font-bold">
                  {step.number}
                </span>
                <div className="flex h-8 w-8 items-center justify-center rounded-sm border border-slate-200 bg-slate-50">
                  {step.icon}
                </div>
              </div>

              <div>
                <h3 className="text-sm sm:text-base font-bold font-sans text-[#0F1E2E]">
                  {step.title}
                </h3>
                <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#997B24] mt-0.5">
                  {step.summary}
                </div>
              </div>

              <p className="text-xs leading-relaxed font-sans pt-1 text-slate-600">
                {step.description}
              </p>
            </div>

            <div className="pt-3 mt-4 border-t border-slate-100 flex items-center justify-between text-[10px] font-mono text-slate-500">
              <span className="flex items-center gap-1">
                <LockKeyhole className="h-3.5 w-3.5 text-[#997B24]" aria-hidden="true" strokeWidth={2} />
                NDA Protected
              </span>
              <span className="text-[#0F1E2E] font-semibold">
                {step.tag}
              </span>
            </div>
          </div>
        ))}
      </div>

      {showLegalDisclaimer && (
        <div className="mt-8 p-4 rounded-md border border-slate-200 bg-slate-50 text-slate-600 flex items-start gap-3">
          <Scale className="h-5 w-5 text-[#997B24] shrink-0 mt-0.5" aria-hidden="true" strokeWidth={2} />
          <p className="text-xs leading-relaxed">
            <strong className="text-[#0F1E2E]">Ethical & Statutory Standard:</strong> All investigative operations strictly adhere to applicable statutory requirements and international evidentiary frameworks. SeekProof does not participate in illegal phone tapping, unauthorized GPS stalking, or unlawful computer hacking. All findings are derived through lawful intelligence, human reconnaissance, and forensic verification.
          </p>
        </div>
      )}
    </div>
  );
}

export default InvestigationProcess;
