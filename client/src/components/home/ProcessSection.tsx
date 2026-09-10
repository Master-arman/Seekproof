import React from 'react';
import { 
  Phone, 
  FileSearch, 
  Compass, 
  ShieldCheck, 
  ClipboardCheck, 
  ArrowRight, 
  LockKeyhole 
} from 'lucide-react';
import { Container } from '../ui/Container';
import { SectionHeading } from '../ui/SectionHeading';

export function ProcessSection() {
  const steps = [
    {
      number: '01',
      title: 'Consultation',
      icon: <Phone className="h-5 w-5 text-[#0F1E2E]" aria-hidden="true" strokeWidth={2} />,
      summary: 'Confidential Case Intake',
      description: 'Zero-cost preliminary consultation under a binding Non-Disclosure Agreement (NDA) to understand your objectives and facts.'
    },
    {
      number: '02',
      title: 'Case Assessment',
      icon: <FileSearch className="h-5 w-5 text-[#0F1E2E]" aria-hidden="true" strokeWidth={2} />,
      summary: 'Legal & Feasibility Review',
      description: 'Senior investigators evaluate available records, legal boundaries, and define the required scope of inquiry.'
    },
    {
      number: '03',
      title: 'Investigation Planning',
      icon: <Compass className="h-5 w-5 text-[#0F1E2E]" aria-hidden="true" strokeWidth={2} />,
      summary: 'Investigation Scope & Plan',
      description: 'Establishing field schedules, digital forensic workflows, and observation parameters within agreed milestones.'
    },
    {
      number: '04',
      title: 'Evidence & Documentation',
      icon: <ShieldCheck className="h-5 w-5 text-[#0F1E2E]" aria-hidden="true" strokeWidth={2} />,
      summary: 'Evidence Collection & Custody',
      description: 'Investigators conduct lawful surveillance, digital forensic extractions, and document chain of custody for court admissibility.'
    },
    {
      number: '05',
      title: 'Final Report',
      icon: <ClipboardCheck className="h-5 w-5 text-[#0F1E2E]" aria-hidden="true" strokeWidth={2} />,
      summary: 'Final Report & Briefing',
      description: 'Delivery of a structured investigation report, timestamped records, and case summary via encrypted channels.'
    }
  ];

  return (
    <section className="py-20 md:py-24 lg:py-28 bg-[#F8FAFC] border-b border-slate-200">
      <Container size="xl">
        <SectionHeading
          badge="Our Methodology"
          badgeVariant="default"
          title="Our 5-Step Investigation Process"
          description="From initial confidential intake to final evidence delivery, our structured process ensures chain-of-custody integrity and statutory compliance."
          align="center"
          theme="light"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-5 mt-12 md:mt-14">
          {steps.map((step, index) => (
            <div
              key={index}
              className="rounded-md p-5 sm:p-6 flex flex-col justify-between relative bg-white border border-slate-200 hover:border-slate-400 shadow-none transition-colors duration-150"
            >
              {/* Connecting line indicator for desktop */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-20 text-slate-400" aria-hidden="true">
                  <ArrowRight className="h-4 w-4" strokeWidth={2} />
                </div>
              )}

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="flex h-7 w-7 items-center justify-center rounded-sm bg-[#0F1E2E] text-white font-mono text-xs font-bold">
                    {step.number}
                  </span>
                  <div className="flex h-8 w-8 items-center justify-center rounded-sm bg-slate-50 border border-slate-200">
                    {step.icon}
                  </div>
                </div>

                <div>
                  <h3 className="text-base font-bold text-[#0F1E2E] font-sans">
                    {step.title}
                  </h3>
                  <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 mt-0.5">
                    {step.summary}
                  </div>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed font-sans font-normal pt-1">
                  {step.description}
                </p>
              </div>

              <div className="pt-3 mt-4 border-t border-slate-100 flex items-center gap-1.5 text-[10px] font-mono text-slate-500">
                <LockKeyhole className="h-3.5 w-3.5 text-slate-500" aria-hidden="true" strokeWidth={2} />
                <span>NDA Enforced</span>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

export default ProcessSection;
