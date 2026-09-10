import React from 'react';
import { 
  ShieldCheck, 
  Scale, 
  CheckCircle2, 
  Phone, 
  MessageCircle 
} from 'lucide-react';
import { PageHero } from '../components/ui/PageHero';
import { Container } from '../components/ui/Container';
import { FreeConsultationForm } from '../components/forms/FreeConsultationForm';

export function FreeConsultationPage() {
  const hotline = import.meta.env.VITE_EMERGENCY_HOTLINE || '+91 7304679756';
  const rawPhone = hotline.replace(/[^0-9+]/g, '');
  const whatsappNumber = rawPhone.replace('+', '') || '917304679756';
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    'Hello SeekProof Duty Officer, I would like to schedule a free confidential case evaluation.'
  )}`;

  return (
    <div className="space-y-0 min-h-screen bg-[#F8FAFC]">
      {/* 1. Page Hero Banner */}
      <PageHero
        badge="Confidential Consultation"
        title="Schedule a Free Confidential Consultation"
        subtitle="Speak directly with a Senior Investigator. We evaluate case viability, perform immediate conflict checks, and establish an operational scope before any engagement."
        breadcrumbs={[{ label: 'Free Consultation' }]}
        actions={
          <div className="flex flex-wrap items-center gap-3">
            <a
              href={`tel:${rawPhone}`}
              className="inline-flex items-center px-4 py-2 rounded-sm border border-slate-300 hover:bg-slate-100 bg-white text-slate-800 font-mono text-xs font-bold transition-all gap-2 shadow-none"
              aria-label={`Call Duty Desk: ${hotline}`}
            >
              <Phone className="h-3.5 w-3.5 text-[#0F1E2E]" aria-hidden="true" strokeWidth={2} />
              <span>Call Duty Desk: {hotline}</span>
            </a>
          </div>
        }
      />

      {/* 2. Main Consultation Intake Section */}
      <section className="section-padding">
        <Container size="xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            
            {/* Left Column: Guarantees, Security Protocol & Direct Lines */}
            <div className="space-y-6">
              
              {/* Consultation Guarantees Card */}
              <div className="rounded-md p-6 sm:p-7 space-y-4 text-slate-800 bg-white border border-slate-200 shadow-none">
                <div className="flex items-center gap-2 text-[#0F1E2E]">
                  <ShieldCheck className="h-5 w-5 text-[#0F1E2E]" aria-hidden="true" strokeWidth={2} />
                  <h3 className="text-base font-bold font-mono">
                    Consultation Standards
                  </h3>
                </div>
                <ul className="space-y-3.5 text-xs text-slate-600">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-700 shrink-0 mt-0.5" aria-hidden="true" strokeWidth={2} />
                    <span>
                      <strong className="text-[#0F1E2E] block">Binding Mutual NDA:</strong>
                      Your identity and preliminary disclosures are protected under binding non-disclosure rules regardless of whether you proceed.
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-700 shrink-0 mt-0.5" aria-hidden="true" strokeWidth={2} />
                    <span>
                      <strong className="text-[#0F1E2E] block">Mandatory Conflict Check:</strong>
                      We verify against existing party representation to ensure complete objectivity and zero conflicts of interest.
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-700 shrink-0 mt-0.5" aria-hidden="true" strokeWidth={2} />
                    <span>
                      <strong className="text-[#0F1E2E] block">Prompt Case Review:</strong>
                      Urgent matters are reviewed promptly for rapid feasibility assessment and immediate scoping.
                    </span>
                  </li>
                </ul>
              </div>

              {/* Direct Urgent Line Card */}
              <div className="bg-white rounded-md p-6 border border-slate-200 shadow-none space-y-3">
                <div className="text-xs font-mono uppercase font-bold text-[#0F1E2E] flex items-center gap-2">
                  <Phone className="h-4 w-4 text-[#0F1E2E]" aria-hidden="true" strokeWidth={2} />
                  Active Incident or Emergency?
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  For active data breaches, imminent court filing deadlines, or urgent locating inquiries:
                </p>
                <div className="space-y-2 pt-1">
                  <a
                    href={`tel:${rawPhone}`}
                    className="flex items-center justify-center gap-2 w-full p-2.5 rounded-sm bg-[#0F1E2E] hover:bg-[#070E18] text-white font-mono font-bold text-xs transition-colors border border-[#0F1E2E] shadow-none"
                    aria-label={`Call Hotline: ${hotline}`}
                  >
                    <Phone className="h-4 w-4" aria-hidden="true" strokeWidth={2} />
                    <span>Call Hotline: {hotline}</span>
                  </a>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full p-2.5 rounded-sm bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-mono font-bold text-xs transition-colors border border-emerald-300 shadow-none"
                    aria-label="Start encrypted WhatsApp chat"
                  >
                    <MessageCircle className="h-4 w-4 text-emerald-700" aria-hidden="true" strokeWidth={2} />
                    <span>WhatsApp Encrypted Chat</span>
                  </a>
                </div>
              </div>

              {/* Legal Standards Box */}
              <div className="p-4 rounded-md bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-1.5 shadow-none">
                <div className="flex items-center gap-2 font-mono font-bold text-[#0F1E2E]">
                  <Scale className="h-4 w-4 text-[#0F1E2E]" aria-hidden="true" strokeWidth={2} />
                  <span>Judicial Admissibility</span>
                </div>
                <p className="text-[11px] leading-relaxed">
                  All scoping reviews adhere to ISO/IEC 27037 forensic standards and applicable statutory evidence codes.
                </p>
              </div>

            </div>

            {/* Right Column: Reusable Free Consultation Form Card */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-md border border-slate-200 p-6 sm:p-8 shadow-none space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-[#0F1E2E] font-mono tracking-tight">
                    Confidential Assessment Intake
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Provide preliminary facts, timeline, and requested objectives. A licensed investigator will review under full NDA protection.
                  </p>
                </div>

                {/* Form Component */}
                <FreeConsultationForm source="free_consultation_page" />
              </div>
            </div>

          </div>
        </Container>
      </section>
    </div>
  );
}

export default FreeConsultationPage;
