import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  Award, 
  Scale, 
  LockKeyhole, 
  Clock, 
  ChevronRight, 
  ArrowUpRight
} from 'lucide-react';
import { Container } from '../ui/Container';
import { PrimaryButton, Button } from '../ui/button';

export function HeroSection() {
  const trustIndicators = [
    {
      icon: <Award className="h-5 w-5 text-[#0F1E2E]" aria-hidden="true" strokeWidth={2} />,
      title: '13+ Years',
      subtitle: 'Investigative Experience',
      description: 'Documenting evidence for corporate, legal, and private clients across jurisdictions.'
    },
    {
      icon: <Scale className="h-5 w-5 text-[#0F1E2E]" aria-hidden="true" strokeWidth={2} />,
      title: 'Licensed & Insured',
      subtitle: 'Statutory Compliance',
      description: 'Operating strictly under statutory licensing (#PI-9824-A) and ISO/IEC 27037 standards.'
    },
    {
      icon: <LockKeyhole className="h-5 w-5 text-[#0F1E2E]" aria-hidden="true" strokeWidth={2} />,
      title: 'Strict Confidentiality',
      subtitle: 'Binding NDA Protected',
      description: 'Automatic Non-Disclosure Agreement and 256-bit encrypted communication protocols.'
    },
    {
      icon: <Clock className="h-5 w-5 text-[#0F1E2E]" aria-hidden="true" strokeWidth={2} />,
      title: '24/7 Availability',
      subtitle: 'Urgent Scenarios',
      description: 'Round-the-clock triage for court deadlines, active incidents, and time-sensitive inquiries.'
    },
  ];

  return (
    <section className="relative bg-[#F8FAFC] text-slate-900 pt-16 pb-20 md:py-24 lg:py-28 border-b border-slate-200 overflow-hidden">
      {/* Subtle Geometric Line Matrix */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0F1E2E08_1px,transparent_1px),linear-gradient(to_bottom,#0F1E2E08_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none" />

      <Container size="xl" className="relative z-10 w-full">
        <div className="max-w-4xl mx-auto text-center space-y-8 md:space-y-10">
          {/* Main Hero Header & Copy */}
          <div className="space-y-6">
            {/* Top Credential Badge */}
            <div className="flex justify-center">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-sm bg-white border border-slate-300 text-slate-700 shadow-none">
                <ShieldCheck className="h-4 w-4 text-[#0F1E2E]" aria-hidden="true" strokeWidth={2} />
                <span className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-700">
                  Licensed Private Investigation & Forensics
                </span>
              </div>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#0F1E2E] font-sans leading-[1.12]">
              Licensed Private Investigation <br className="hidden sm:inline" />
              <span className="text-[#0F1E2E] underline decoration-[#D4AF37] decoration-4 underline-offset-8">
                & Corporate Intelligence
              </span>
            </h1>

            {/* Supporting Text */}
            <p className="text-base sm:text-lg md:text-xl text-slate-600 leading-relaxed max-w-3xl mx-auto font-sans font-normal">
              We document evidence for legal cases, corporate disputes, and personal matters. Our licensed private investigators and forensic specialists provide court-admissible facts under strict non-disclosure agreements.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              {/* Primary CTA */}
              <div className="w-full sm:w-auto">
                <Link to="/free-consultation" className="block w-full">
                  <PrimaryButton
                    size="lg"
                    className="w-full sm:w-auto font-mono text-xs sm:text-sm uppercase tracking-wider py-3.5 px-7 rounded-sm shadow-none"
                    aria-label="Schedule Case Consultation"
                  >
                    <ShieldCheck className="h-4 w-4 mr-2" aria-hidden="true" />
                    <span>Schedule Case Consultation</span>
                    <ChevronRight className="h-4 w-4 ml-1" aria-hidden="true" />
                  </PrimaryButton>
                </Link>
              </div>

              {/* Secondary CTA */}
              <div className="w-full sm:w-auto">
                <Link to="/services" className="block w-full">
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full sm:w-auto font-mono text-xs sm:text-sm uppercase tracking-wider py-3.5 px-7 rounded-sm border-slate-300 bg-white hover:bg-slate-100 text-slate-800 shadow-none"
                    aria-label="View Investigation Disciplines"
                  >
                    <span>View Investigation Disciplines</span>
                    <ArrowUpRight className="h-4 w-4 ml-2 text-slate-600" aria-hidden="true" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Trust Indicators Strip (4 Cards) */}
          <div className="pt-8 sm:pt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-left">
            {trustIndicators.map((indicator, index) => (
              <div
                key={index}
                className="rounded-md bg-white border border-slate-200 p-5 shadow-none hover:border-slate-400 transition-colors duration-150 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-sm bg-slate-50 border border-slate-200">
                      {indicator.icon}
                    </div>
                    <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-sm bg-slate-100 border border-slate-200 text-slate-600 font-semibold">
                      Verified
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-[#0F1E2E] font-sans tracking-tight">
                    {indicator.title}
                  </h3>
                  <p className="text-xs font-mono text-slate-500 mt-0.5">
                    {indicator.subtitle}
                  </p>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed mt-2.5 font-sans font-normal border-t border-slate-100 pt-2.5">
                  {indicator.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

export default HeroSection;
