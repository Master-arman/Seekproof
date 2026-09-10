import React from 'react';
import { Award, ShieldCheck, Users, Clock, CheckCircle2 } from 'lucide-react';
import { Container } from '../ui/Container';

export function TrustStatsSection() {
  const stats = [
    {
      icon: <Award className="h-5 w-5 text-[#0F1E2E]" aria-hidden="true" strokeWidth={2} />,
      stat: '13+',
      label: 'Years of Experience',
      detail: 'Investigative & Forensic Practice',
      description: 'Over a decade providing documented evidence to corporate counsel, risk managers, and private clients.'
    },
    {
      icon: <ShieldCheck className="h-5 w-5 text-[#0F1E2E]" aria-hidden="true" strokeWidth={2} />,
      stat: 'Thousands',
      label: 'Confidential Cases Handled',
      detail: 'Confidentiality Record',
      description: 'Inquiries and cases resolved with strict adherence to non-disclosure agreements and data protection protocols.'
    },
    {
      icon: <Users className="h-5 w-5 text-[#0F1E2E]" aria-hidden="true" strokeWidth={2} />,
      stat: 'Certified',
      label: 'Professional Investigators',
      detail: 'Forensic & OSINT Specialists',
      description: 'Multidisciplinary team with backgrounds in corporate forensics, digital extractions, and fraud examination.'
    },
    {
      icon: <Clock className="h-5 w-5 text-[#0F1E2E]" aria-hidden="true" strokeWidth={2} />,
      stat: '24/7',
      label: 'Consultation Availability',
      detail: 'Direct Duty Desk',
      description: 'Prompt intake and case assessment for time-sensitive legal deadlines and incident responses.'
    },
  ];

  return (
    <section className="py-16 md:py-20 bg-white border-b border-slate-200 relative overflow-hidden">
      <Container size="xl" className="relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((item, index) => (
            <div
              key={index}
              className="rounded-md bg-[#F8FAFC] border border-slate-200 p-6 shadow-none hover:border-slate-400 transition-colors duration-150 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-sm bg-white border border-slate-200">
                    {item.icon}
                  </div>
                  <div className="flex items-center gap-1 text-[11px] font-mono text-emerald-700">
                    <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>Verified</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="text-3xl font-bold text-[#0F1E2E] font-mono tracking-tight">
                    {item.stat}
                  </div>
                  <h3 className="text-sm font-bold text-[#0F1E2E] font-sans">
                    {item.label}
                  </h3>
                  <div className="text-[11px] font-mono text-slate-500">
                    {item.detail}
                  </div>
                </div>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed mt-4 font-sans font-normal border-t border-slate-200 pt-3">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

export default TrustStatsSection;
