import React from 'react';
import { PageHero } from '../components/ui/PageHero';
import { Container } from '../components/ui/Container';
import { Scale, AlertTriangle, ShieldCheck, FileCheck, PhoneCall } from 'lucide-react';
import { SEOHead } from '../components/common/SEOHead';
import { Link } from 'react-router-dom';

export function DisclaimerPage() {
  return (
    <div className="space-y-0 min-h-screen bg-[#F8FAFC]">
      <SEOHead
        title="Legal & Investigation Disclaimer | SeekProof"
        description="Legal disclaimer regarding private investigation standards, non-guarantee of judicial outcomes, statutory boundaries, and emergency protocol."
        canonicalUrl="/disclaimer"
        keywords={['legal disclaimer', 'investigation disclaimer', 'chain of custody', 'statutory boundaries', 'seekproof']}
      />

      {/* Page Hero */}
      <PageHero
        badge="Regulatory Notice"
        title="Legal Disclaimer & Compliance Notice"
        subtitle="Important information regarding the legal scope of private intelligence operations, evidentiary standards, and emergency situations."
        breadcrumbs={[{ label: 'Disclaimer' }]}
      />

      {/* Main Content */}
      <section className="section-padding bg-[#F8FAFC]">
        <Container size="md" className="space-y-8">
          <div className="bg-white p-6 sm:p-10 rounded-md border border-slate-200 space-y-6 text-slate-800 text-sm leading-relaxed shadow-none">
            
            <div className="text-xs font-mono text-slate-400">
              Last Reviewed: March 2026
            </div>

            {/* Emergency Notice */}
            <div className="p-4 rounded-md bg-amber-50 border border-amber-200 text-amber-900 space-y-2">
              <div className="flex items-center gap-2 font-bold text-amber-800">
                <AlertTriangle className="h-5 w-5 shrink-0" />
                <span>Immediate Safety & Crime Emergency Notice</span>
              </div>
              <p className="text-xs leading-relaxed">
                SeekProof is a private corporate intelligence and civil investigation firm. We are not a law enforcement agency or emergency public safety responder. If you are experiencing an immediate threat of violence, kidnapping in progress, medical emergency, or active criminal offence, contact emergency police services (<strong>112</strong> / <strong>100</strong>) immediately.
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2 text-[#0F1E2E] font-bold text-lg border-b border-slate-100 pb-3">
                <Scale className="h-5 w-5 text-[#0F1E2E]" aria-hidden="true" strokeWidth={2} />
                <span>1. No Legal Advice</span>
              </div>
              <p>
                The information provided on this website, in marketing materials, or during preliminary scoping calls does not constitute formal legal advice. SeekProof provides factual intelligence, forensic extractions, and objective documentation. Clients are advised to consult licensed advocates or legal counsel for legal strategy and representation in court proceedings.
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2 text-[#0F1E2E] font-bold text-lg border-b border-slate-100 pb-3">
                <FileCheck className="h-5 w-5 text-[#0F1E2E]" aria-hidden="true" strokeWidth={2} />
                <span>2. Factual Integrity & Non-Speculation</span>
              </div>
              <p>
                SeekProof reports only facts, physical exhibits, and electronic records that have been verified through rigorous methodology and authenticated under Section 65B of the Indian Evidence Act and ISO/IEC 27037 standards. We do not manufacture findings, alter surveillance documentation, or guarantee speculative judicial rulings.
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2 text-[#0F1E2E] font-bold text-lg border-b border-slate-100 pb-3">
                <ShieldCheck className="h-5 w-5 text-[#0F1E2E]" aria-hidden="true" strokeWidth={2} />
                <span>3. Lawful Operational Boundaries</span>
              </div>
              <p>
                We operate strictly within the legal bounds defined by the Constitution of India, the Indian Penal Code / Bharatiya Nyaya Sanhita, Information Technology Act 2000, and data protection statutes. We do NOT perform illegal hacking, unauthorized phone tapping, wire interception, physical assault, extortion, or perjury.
              </p>
            </div>

            <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
              <span className="text-xs text-slate-500">
                Have questions regarding legal admissibility?
              </span>
              <Link to="/contact" className="text-xs font-mono font-bold text-[#0F1E2E] hover:underline flex items-center gap-1">
                <PhoneCall className="h-3.5 w-3.5" />
                <span>Contact Case Advisory Desk</span>
              </Link>
            </div>

          </div>
        </Container>
      </section>
    </div>
  );
}

export default DisclaimerPage;
