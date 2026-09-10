import React from 'react';
import { 
  Users, 
  LockKeyhole, 
  Cpu, 
  FileText, 
  Scale, 
  MessageCircle, 
  CheckCircle2 
} from 'lucide-react';
import { Container } from '../ui/Container';
import { SectionHeading } from '../ui/SectionHeading';

export function WhyChooseSection() {
  const standards = [
    {
      icon: <Users className="h-5 w-5 text-[#0F1E2E]" aria-hidden="true" strokeWidth={2} />,
      title: 'Licensed Investigators',
      description: 'Senior investigators with professional backgrounds in forensic accounting, digital forensics, and regulatory compliance.'
    },
    {
      icon: <LockKeyhole className="h-5 w-5 text-[#0F1E2E]" aria-hidden="true" strokeWidth={2} />,
      title: 'Confidentiality Protocols',
      description: 'Every inquiry is protected under binding Non-Disclosure Agreements, encrypted communications, and restricted case access.'
    },
    {
      icon: <Cpu className="h-5 w-5 text-[#0F1E2E]" aria-hidden="true" strokeWidth={2} />,
      title: 'Calibrated Equipment',
      description: 'Calibrated RF spectrum analyzers, high-resolution optical surveillance equipment, and ISO/IEC 27037 forensic software.'
    },
    {
      icon: <FileText className="h-5 w-5 text-[#0F1E2E]" aria-hidden="true" strokeWidth={2} />,
      title: 'Court-Ready Documentation',
      description: 'Comprehensive dossiers complete with chronological investigator logs, verified timestamps, and supporting evidentiary exhibits.'
    },
    {
      icon: <Scale className="h-5 w-5 text-[#0F1E2E]" aria-hidden="true" strokeWidth={2} />,
      title: 'Statutory Compliance',
      description: 'Strict adherence to private investigation licensing regulations (#PI-9824-A), chain-of-custody rules, and privacy statutes.'
    },
    {
      icon: <MessageCircle className="h-5 w-5 text-[#0F1E2E]" aria-hidden="true" strokeWidth={2} />,
      title: 'Direct Case Communication',
      description: 'Dedicated senior case manager providing clear milestone briefings, timely updates, and encrypted file transfers.'
    }
  ];

  return (
    <section className="py-20 md:py-24 lg:py-28 bg-[#F8FAFC] text-slate-900 border-b border-slate-200 relative overflow-hidden">
      <Container size="xl" className="relative z-10">
        <SectionHeading
          badge="Why Choose SeekProof"
          badgeVariant="default"
          title="Standards in Investigation & Evidence"
          description="We provide documented facts and court-admissible evidence to legal counsel, corporations, and private individuals requiring verified answers."
          align="center"
          theme="light"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12 md:mt-14">
          {standards.map((standard, index) => (
            <div
              key={index}
              className="rounded-md bg-white border border-slate-200 p-6 space-y-4 shadow-none hover:border-slate-400 transition-colors duration-150 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-sm bg-slate-50 border border-slate-200">
                    {standard.icon}
                  </div>
                  <span className="text-[10px] font-mono text-slate-500 font-semibold uppercase tracking-wider">
                    Standard 0{index + 1}
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-bold text-[#0F1E2E] font-sans">
                    {standard.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed mt-2 font-sans font-normal">
                    {standard.description}
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center gap-1.5 text-[11px] font-mono text-emerald-700">
                <CheckCircle2 className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                <span>Verified Quality Standard</span>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

export default WhyChooseSection;
