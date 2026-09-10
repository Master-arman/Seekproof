import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  Phone, 
  MessageCircle, 
  ArrowUpRight, 
  LockKeyhole, 
  CheckCircle2 
} from 'lucide-react';
import { Container } from '../ui/Container';
import { PrimaryButton } from '../ui/button';

export function CtaBannerSection() {
  const PHONE_NUMBER = '+91 7304679756';
  const WHATSAPP_URL = 'https://wa.me/917304679756';

  return (
    <section className="py-20 md:py-24 lg:py-28 bg-[#F8FAFC]">
      <Container size="xl">
        <div className="relative rounded-md bg-white border border-slate-300 p-8 sm:p-12 lg:p-16 text-center space-y-8 overflow-hidden text-slate-900 shadow-none">
          {/* Icon and Header */}
          <div className="relative z-10 max-w-3xl mx-auto space-y-4">
            <div className="flex justify-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-sm bg-slate-50 border border-slate-300 text-[#0F1E2E]">
                <ShieldCheck className="h-6 w-6" aria-hidden="true" strokeWidth={2} />
              </div>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#0F1E2E] font-sans leading-tight">
              Need Verified Evidence for Your <br />
              <span className="underline decoration-[#D4AF37] decoration-4 underline-offset-8">
                Legal or Corporate Matter?
              </span>
            </h2>

            <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed font-sans font-normal">
              Speak with our licensed investigators today. Initial consultations are confidential, free of cost, and protected under binding Non-Disclosure Agreements.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="relative z-10 flex flex-col sm:flex-row items-center justify-center gap-4 pt-2 max-w-xl mx-auto">
            {/* Primary CTA */}
            <Link to="/free-consultation" className="w-full sm:w-auto">
              <PrimaryButton
                size="lg"
                className="w-full sm:w-auto font-mono text-xs sm:text-sm uppercase tracking-wider py-3.5 px-7 rounded-sm shadow-none font-semibold"
              >
                <ShieldCheck className="h-4 w-4 mr-2" aria-hidden="true" />
                <span>Schedule Consultation</span>
              </PrimaryButton>
            </Link>

            {/* Call Direct */}
            <a
              href={`tel:${PHONE_NUMBER.replace(/[^0-9+]/g, '')}`}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-sm bg-white border border-slate-300 hover:bg-slate-50 text-slate-800 font-mono text-xs uppercase tracking-wider font-semibold shadow-none transition-colors duration-150"
              aria-label={`Call direct hotline at ${PHONE_NUMBER}`}
            >
              <Phone className="h-4 w-4 text-[#0F1E2E]" aria-hidden="true" strokeWidth={2} />
              <span>Call {PHONE_NUMBER}</span>
            </a>

            {/* WhatsApp */}
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-sm bg-emerald-50 border border-emerald-300 hover:bg-emerald-100 text-emerald-800 font-mono text-xs uppercase tracking-wider font-semibold shadow-none transition-colors duration-150"
              aria-label="Start encrypted WhatsApp consultation"
            >
              <MessageCircle className="h-4 w-4 text-emerald-700" aria-hidden="true" strokeWidth={2} />
              <span>WhatsApp Direct</span>
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
          </div>

          {/* Trust Guarantees Strip */}
          <div className="relative z-10 pt-6 border-t border-slate-200 flex flex-wrap items-center justify-center gap-6 text-xs font-mono text-slate-600">
            <div className="flex items-center gap-2">
              <LockKeyhole className="h-3.5 w-3.5 text-slate-500" aria-hidden="true" strokeWidth={2} />
              <span>100% Binding Non-Disclosure</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-700" aria-hidden="true" strokeWidth={2} />
              <span>256-Bit Encrypted Intake</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-3.5 w-3.5 text-slate-500" aria-hidden="true" strokeWidth={2} />
              <span>Zero Obligation Assessment</span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default CtaBannerSection;
