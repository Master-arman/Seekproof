import { PageHero } from '../components/ui/PageHero';
import { Container } from '../components/ui/Container';
import { Scale, FileText, ClipboardCheck, AlertTriangle, ShieldCheck, Landmark } from 'lucide-react';
import { SEOHead } from '../components/common/SEOHead';

export function TermsOfServicePage() {
  return (
    <div className="space-y-0 min-h-screen bg-[#F8FAFC]">
      <SEOHead
        title="Terms of Service & Retainer Protocols | SeekProof"
        description="Conditions of engagement, lawful investigation scopes, retainer agreements, and chain-of-custody protocols governing SeekProof client operations."
        canonicalUrl="/terms-of-service"
        keywords={['terms of service', 'retainer agreement', 'investigation terms', 'evidentiary protocols', 'seekproof terms']}
      />

      {/* Page Hero */}
      <PageHero
        badge="Legal Terms"
        title="Terms of Service & Evidentiary Protocols"
        subtitle="Standard conditions of engagement, retainer agreements, and chain-of-custody protocols governing all investigative operations."
        breadcrumbs={[{ label: 'Terms of Service' }]}
      />

      {/* Main Content */}
      <section className="section-padding bg-[#F8FAFC]">
        <Container size="md" className="space-y-8">
          <div className="bg-white p-6 sm:p-10 rounded-md border border-slate-200 space-y-6 text-slate-800 text-sm leading-relaxed shadow-none">
            
            <div className="text-xs font-mono text-slate-400">
              Effective Date: March 2026 • Governed under Mumbai Jurisdiction
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2 text-[#0F1E2E] font-bold text-lg border-b border-slate-100 pb-3">
                <Scale className="h-5 w-5 text-[#0F1E2E]" aria-hidden="true" strokeWidth={2} />
                <span>1. Scope of Investigative Engagement</span>
              </div>
              <p>
                SeekProof accepts investigative mandates only for legitimate corporate, legal, risk mitigation, or lawful personal vetting purposes. All operations must have a verified legal basis. We do not accept assignments that involve unlawful wiretapping, computer hacking without authorization, extortion, physical trespassing, or violations of court restraining orders.
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2 text-[#0F1E2E] font-bold text-lg border-b border-slate-100 pb-3">
                <FileText className="h-5 w-5 text-[#0F1E2E]" aria-hidden="true" strokeWidth={2} />
                <span>2. Chain of Custody & Evidence Delivery</span>
              </div>
              <p>
                All deliverables, forensic reports, and surveillance exhibits are accompanied by formal chain-of-custody certificates conforming to Section 65B of the Indian Evidence Act and ISO/IEC 27037 standards. While SeekProof guarantees rigorous evidentiary methodology and factual accuracy, we cannot guarantee speculative judicial outcomes or third-party decisions.
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2 text-[#0F1E2E] font-bold text-lg border-b border-slate-100 pb-3">
                <ClipboardCheck className="h-5 w-5 text-[#0F1E2E]" aria-hidden="true" strokeWidth={2} />
                <span>3. Retainers & Operational Disbursements</span>
              </div>
              <p>
                Formal investigations commence upon execution of a written Engagement Letter and receipt of the agreed retainer fee. Additional operational disbursements (travel, government registry fees, court filing fees) are accounted for transparently and billed against the retainer with itemized receipts and expenditure logs.
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2 text-[#0F1E2E] font-bold text-lg border-b border-slate-100 pb-3">
                <AlertTriangle className="h-5 w-5 text-[#0F1E2E]" aria-hidden="true" strokeWidth={2} />
                <span>4. Limitation of Liability & Warranties</span>
              </div>
              <p>
                SeekProof delivers factual findings gathered through lawful observation, open-source intelligence, consented records, and digital forensics. Findings represent circumstances discovered during the active deployment period. SeekProof shall not be liable for indirect, incidental, or consequential damages arising from client operational decisions or legal actions taken based on delivered reports.
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2 text-[#0F1E2E] font-bold text-lg border-b border-slate-100 pb-3">
                <Landmark className="h-5 w-5 text-[#0F1E2E]" aria-hidden="true" strokeWidth={2} />
                <span>5. Governing Law & Dispute Resolution</span>
              </div>
              <p>
                These terms, retainer agreements, and any dispute or claim arising out of or in connection with them shall be governed by and construed in accordance with the laws of India. The courts of Mumbai, Maharashtra shall have exclusive jurisdiction to settle any dispute or claim.
              </p>
            </div>

          </div>
        </Container>
      </section>
    </div>
  );
}

export default TermsOfServicePage;
