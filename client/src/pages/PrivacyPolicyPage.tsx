import { PageHero } from '../components/ui/PageHero';
import { Container } from '../components/ui/Container';
import { LockKeyhole, ShieldCheck, KeyRound, Scale, FileText, UserCheck, AlertCircle } from 'lucide-react';
import { SEOHead } from '../components/common/SEOHead';

export function PrivacyPolicyPage() {
  return (
    <div className="space-y-0 min-h-screen bg-[#F8FAFC]">
      <SEOHead
        title="Privacy Policy & Data Protection Protocols | SeekProof"
        description="Review SeekProof's cryptographic data protection, zero-knowledge retention policies, DPDP Act 2023 compliance, and strict Non-Disclosure Agreement standards."
        canonicalUrl="/privacy-policy"
        keywords={['privacy policy', 'data protection', 'confidentiality protocol', 'seekproof privacy', 'dpdp act compliance']}
      />

      {/* Page Hero */}
      <PageHero
        badge="Legal & Privacy Standard"
        title="Privacy Policy & Confidentiality Protocol"
        subtitle="Our commitment to complete cryptographic data security, non-disclosure compliance, and lawful intelligence gathering."
        breadcrumbs={[{ label: 'Privacy Policy' }]}
      />

      {/* Main Content */}
      <section className="section-padding bg-[#F8FAFC]">
        <Container size="md" className="space-y-8">
          <div className="bg-white p-6 sm:p-10 rounded-md border border-slate-200 space-y-6 text-slate-800 text-sm leading-relaxed shadow-none">
            
            <div className="text-xs font-mono text-slate-400">
              Last Updated & Verified: March 2026 • Version 3.4
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2 text-[#0F1E2E] font-bold text-lg border-b border-slate-100 pb-3">
                <LockKeyhole className="h-5 w-5 text-[#0F1E2E]" aria-hidden="true" strokeWidth={2} />
                <span>1. Strict Non-Disclosure & Confidentiality</span>
              </div>
              <p>
                SeekProof operates under a strict Non-Disclosure obligation that applies automatically to all consultations, preliminary briefings, and formal case engagements. All information disclosed during the initial inquiry is treated as strictly privileged attorney-client work product where applicable. We never sell, rent, or distribute personal data or inquiry metadata to third-party brokers or advertisers.
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2 text-[#0F1E2E] font-bold text-lg border-b border-slate-100 pb-3">
                <ShieldCheck className="h-5 w-5 text-[#0F1E2E]" aria-hidden="true" strokeWidth={2} />
                <span>2. Data Retention & Secure Destruction</span>
              </div>
              <p>
                Evidence files and forensic dumps are retained in zero-knowledge encrypted vaults for the duration of the statutory evidentiary period or as contracted by legal counsel. Upon case closure and settlement of accounts, all extraneous working notes and unreferenced preliminary files are wiped using DoD 5220.22-M and NIST SP 800-88 sanitization standards.
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2 text-[#0F1E2E] font-bold text-lg border-b border-slate-100 pb-3">
                <KeyRound className="h-5 w-5 text-[#0F1E2E]" aria-hidden="true" strokeWidth={2} />
                <span>3. Cryptographic Security Standards</span>
              </div>
              <p>
                All digital communications, case attachments, and client portal sessions use 256-bit SSL/TLS encryption in transit and AES-256 encryption at rest. PGP key signatures are provided upon request for ultra-secure transmission. Access to case repositories is protected by hardware Multi-Factor Authentication (MFA) and strict role-based access control (RBAC).
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2 text-[#0F1E2E] font-bold text-lg border-b border-slate-100 pb-3">
                <Scale className="h-5 w-5 text-[#0F1E2E]" aria-hidden="true" strokeWidth={2} />
                <span>4. Regulatory Compliance & Lawful Basis</span>
              </div>
              <p>
                Our investigations strictly adhere to the Digital Personal Data Protection Act 2023 (India), General Data Protection Regulation (GDPR), the Information Technology Act 2000, Section 65B of the Indian Evidence Act, and ISO/IEC 27037 standards governing electronic evidence extraction.
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2 text-[#0F1E2E] font-bold text-lg border-b border-slate-100 pb-3">
                <UserCheck className="h-5 w-5 text-[#0F1E2E]" aria-hidden="true" strokeWidth={2} />
                <span>5. Data Subject Rights & Data Protection Officer</span>
              </div>
              <p>
                Under applicable statutory data protection frameworks, clients and individuals may request access to, correction of, or lawful deletion of non-evidentiary personal records. For inquiries regarding our privacy standards or to exercise statutory privacy rights, contact our Data Protection Desk at <a href="mailto:seekproof47@gmail.com" className="text-[#0F1E2E] font-semibold underline">seekproof47@gmail.com</a>.
              </p>
            </div>

          </div>
        </Container>
      </section>
    </div>
  );
}

export default PrivacyPolicyPage;
