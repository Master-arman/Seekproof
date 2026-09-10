import React from 'react';
import { PageHero } from '../components/ui/PageHero';
import { Container } from '../components/ui/Container';
import { ShieldCheck, Cookie, Sliders, Lock, Info } from 'lucide-react';
import { SEOHead } from '../components/common/SEOHead';

export function CookiePolicyPage() {
  return (
    <div className="space-y-0 min-h-screen bg-[#F8FAFC]">
      <SEOHead
        title="Cookie Policy & Tracking Transparency | SeekProof"
        description="Learn how SeekProof manages cookies, essential session tokens, and privacy-preserving analytics with zero third-party advertising tracking."
        canonicalUrl="/cookie-policy"
        keywords={['cookie policy', 'privacy tracking', 'essential cookies', 'seekproof security']}
      />

      {/* Page Hero */}
      <PageHero
        badge="Privacy Transparency"
        title="Cookie Policy & Tracking Transparency"
        subtitle="Our approach to minimal data collection, essential session cookies, and zero commercial tracking."
        breadcrumbs={[{ label: 'Cookie Policy' }]}
      />

      {/* Main Content */}
      <section className="section-padding bg-[#F8FAFC]">
        <Container size="md" className="space-y-8">
          <div className="bg-white p-6 sm:p-10 rounded-md border border-slate-200 space-y-6 text-slate-800 text-sm leading-relaxed shadow-none">
            
            <div className="text-xs font-mono text-slate-400">
              Last Revised: March 2026
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2 text-[#0F1E2E] font-bold text-lg border-b border-slate-100 pb-3">
                <Cookie className="h-5 w-5 text-[#0F1E2E]" aria-hidden="true" strokeWidth={2} />
                <span>1. What Are Cookies?</span>
              </div>
              <p>
                Cookies are small text files stored on your browser or device when you visit web applications. They allow websites to remember user preferences, maintain secure login sessions, and optimize performance.
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2 text-[#0F1E2E] font-bold text-lg border-b border-slate-100 pb-3">
                <ShieldCheck className="h-5 w-5 text-[#0F1E2E]" aria-hidden="true" strokeWidth={2} />
                <span>2. Our Zero-Adware Commitment</span>
              </div>
              <p>
                As a confidential private intelligence firm, SeekProof maintains a strict anti-tracking policy. We do NOT deploy third-party advertising retargeting pixels (such as Facebook Pixel, Google Ads remarketing, or third-party behavioral trackers). Your visit to this website is private.
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2 text-[#0F1E2E] font-bold text-lg border-b border-slate-100 pb-3">
                <Sliders className="h-5 w-5 text-[#0F1E2E]" aria-hidden="true" strokeWidth={2} />
                <span>3. Categories of Cookies We Use</span>
              </div>
              <ul className="space-y-2 list-disc list-inside text-slate-700">
                <li>
                  <strong>Strictly Necessary Cookies:</strong> Required for secure authentication, CSRF token validation, and administrative portal session state.
                </li>
                <li>
                  <strong>Functional Cookies:</strong> Preserve your UI preferences, such as theme modes or dismissed notice banners.
                </li>
                <li>
                  <strong>Anonymized Telemetry:</strong> Aggregated, privacy-preserving server logs used exclusively to detect DDoS attacks, brute force attempts, and maintain gateway health.
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2 text-[#0F1E2E] font-bold text-lg border-b border-slate-100 pb-3">
                <Lock className="h-5 w-5 text-[#0F1E2E]" aria-hidden="true" strokeWidth={2} />
                <span>4. Managing Your Cookie Preferences</span>
              </div>
              <p>
                You can block or delete cookies through your browser settings at any time. However, disabling strictly necessary authentication cookies may prevent access to the Client Case Portal.
              </p>
            </div>

          </div>
        </Container>
      </section>
    </div>
  );
}

export default CookiePolicyPage;
