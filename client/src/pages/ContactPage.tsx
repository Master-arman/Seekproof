import React, { useState } from 'react';
import { 
  Phone, 
  LockKeyhole, 
  Mail, 
  ShieldCheck, 
  CheckCircle2, 
  Building2, 
  MapPin,
  Clock,
  ExternalLink,
  ShieldAlert,
  AlertTriangle,
  MessageSquare
} from 'lucide-react';
import { PageHero } from '../components/ui/PageHero';
import { Container } from '../components/ui/Container';
import { ContactInfoCard } from '../components/ui/ContactInfoCard';
import { ContactForm } from '../components/forms/ContactForm';
import { SEOHead } from '../components/common/SEOHead';
import { Badge } from '../components/ui/badge';
import { PrimaryButton, SecondaryButton } from '../components/ui/button';

export function ContactPage() {
  const primaryPhone = '+91 7304679756';
  const secondaryPhone = '+91 9152695373';
  const contactEmail = 'seekproof47@gmail.com';
  const officeAddress = 'Maker Chambers V, Nariman Point, Mumbai, Maharashtra 400021, India';
  const rawPrimary = '+917304679756';
  const rawSecondary = '+919152695373';
  const encryptionId = 'SP-PGP-90218-SEC';

  // Map interactive state
  const [mapLoaded, setMapLoaded] = useState(false);

  return (
    <div className="space-y-0 min-h-screen bg-[#F8FAFC]">
      <SEOHead
        title="Contact SeekProof | Private Investigation Headquarters Mumbai"
        description="Direct confidential case intake for SeekProof Private Investigations. Headquartered at Maker Chambers V, Nariman Point, Mumbai. Call +91 7304679756 or email seekproof47@gmail.com."
        canonicalUrl="/contact"
        keywords={['contact seekproof', 'detective agency mumbai contact', 'nariman point private investigator', 'private detective phone number mumbai']}
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'ContactPage',
          'name': 'SeekProof Contact & Case Intake Gateway',
          'url': 'https://seekproof.in/contact',
          'mainEntity': {
            '@type': 'LocalBusiness',
            'name': 'SeekProof Private Investigations',
            'telephone': primaryPhone,
            'alternateTelephone': secondaryPhone,
            'email': contactEmail,
            'address': {
              '@type': 'PostalAddress',
              'streetAddress': 'Maker Chambers V, Nariman Point',
              'addressLocality': 'Mumbai',
              'addressRegion': 'Maharashtra',
              'postalCode': '400021',
              'addressCountry': 'IN'
            }
          }
        }}
      />

      {/* 1. Page Hero */}
      <PageHero
        badge="Confidential Intake Gateway"
        title="Contact SeekProof Private Investigation"
        subtitle="Direct secure communications for corporate counsel, commercial clients, and private individuals. Non-disclosure protection applies automatically from initial contact."
        breadcrumbs={[{ label: 'Contact Us' }]}
        actions={
          <div className="flex flex-wrap items-center gap-3">
            <a
              href={`tel:${rawPrimary}`}
              className="inline-flex items-center px-4 py-2 rounded-sm border border-slate-300 hover:bg-slate-100 bg-white text-slate-800 font-mono text-xs font-bold transition-all gap-2 shadow-none"
              aria-label={`Call Duty Hotline: ${primaryPhone}`}
            >
              <Phone className="h-3.5 w-3.5 text-[#0F1E2E]" aria-hidden="true" strokeWidth={2} />
              <span>Duty Hotline: {primaryPhone}</span>
            </a>
            <a
              href={`tel:${rawSecondary}`}
              className="inline-flex items-center px-4 py-2 rounded-sm border border-slate-300 hover:bg-slate-100 bg-white text-slate-800 font-mono text-xs font-bold transition-all gap-2 shadow-none"
              aria-label={`Call Advisory Desk: ${secondaryPhone}`}
            >
              <Phone className="h-3.5 w-3.5 text-[#C5A059]" aria-hidden="true" strokeWidth={2} />
              <span>Advisory Desk: {secondaryPhone}</span>
            </a>
          </div>
        }
      />

      {/* 2. Critical Emergency / Ethical Safety Banner */}
      <section className="bg-amber-50 border-b border-amber-200 py-3">
        <Container size="xl">
          <div className="flex items-center gap-3 text-amber-900 text-xs">
            <AlertTriangle className="h-4 w-4 text-amber-700 shrink-0" />
            <span>
              <strong>Emergency Safety Notice:</strong> If you or a family member are in immediate physical danger, experiencing domestic violence, or witnessing an active felony, please dial emergency police services (<strong>112</strong> / <strong>100</strong>) immediately before engaging private investigators.
            </span>
          </div>
        </Container>
      </section>

      {/* 3. Main Contact Grid */}
      <section className="section-padding">
        <Container size="xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left Column: Direct Tactical Channels */}
            <div className="space-y-6">
              
              {/* Headquarters Facility Card */}
              <div className="rounded-md overflow-hidden border border-slate-200 bg-white shadow-none">
                <div className="aspect-[16/9] w-full relative">
                  <img
                    src="/images/headquarters.jpg"
                    alt="SeekProof Headquarters at Maker Chambers V, Nariman Point, Mumbai"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-2.5 left-3 right-3 text-white">
                    <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-white">
                      <Building2 className="h-3.5 w-3.5 text-[#D4AF37]" aria-hidden="true" strokeWidth={2} />
                      <span>Headquarters & Operational Command</span>
                    </div>
                  </div>
                </div>
                <div className="p-4 space-y-2.5">
                  <div className="flex items-start gap-2 text-xs text-slate-700">
                    <MapPin className="h-4 w-4 text-[#0F1E2E] shrink-0 mt-0.5" aria-hidden="true" strokeWidth={2} />
                    <div>
                      <div className="font-bold text-[#0F1E2E]">Nariman Point Operational Centre</div>
                      <div className="text-slate-600 text-[11px] leading-relaxed font-medium mt-0.5">{officeAddress}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-600 pt-1 border-t border-slate-100">
                    <Clock className="h-3.5 w-3.5 text-[#C5A059] shrink-0" />
                    <span className="text-[11px]">Mon-Fri: 09:00 - 20:00 • Sat: 10:00 - 16:00 (IST)</span>
                  </div>
                  <p className="text-[11px] text-slate-500 font-normal leading-relaxed pt-1">
                    In-person consultations are conducted strictly by confirmed appointment following preliminary conflict check.
                  </p>
                </div>
              </div>

              {/* Direct Phone Cards */}
              <ContactInfoCard
                icon={Phone}
                title="Immediate 24/7 Duty Desk"
                primaryInfo={primaryPhone}
                secondaryInfo="Rapid-response operative desk for emergency tracing, asset preservation, and urgent litigation support."
                badge="24/7 Desk"
                actionHref={`tel:${rawPrimary}`}
                actionText="Call Primary Line"
                isDark={false}
              />

              <ContactInfoCard
                icon={Phone}
                title="Case Advisory & Counsel Desk"
                primaryInfo={secondaryPhone}
                secondaryInfo="Direct consultation line for corporate legal counsel, pre-matrimonial inquiries, and forensic scoping."
                badge="Advisory Line"
                actionHref={`tel:${rawSecondary}`}
                actionText="Call Advisory Desk"
                isDark={false}
              />

              <ContactInfoCard
                icon={Mail}
                title="Confidential Inquiries"
                primaryInfo={contactEmail}
                secondaryInfo="Encrypted mailbox with restricted partner access and strict zero-knowledge retention policies."
                badge="Encrypted"
                actionHref={`mailto:${contactEmail}`}
                actionText="Send Direct Email"
                isDark={false}
              />

              {/* Secure Intake Assurance */}
              <div className="bg-white rounded-md p-6 border border-slate-200 shadow-none space-y-4">
                <div className="text-xs font-mono uppercase font-bold text-[#0F1E2E] flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-[#0F1E2E]" aria-hidden="true" strokeWidth={2} /> Secure Intake Protocols
                </div>
                <ul className="space-y-2.5 text-xs text-slate-600">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-700 shrink-0 mt-0.5" aria-hidden="true" strokeWidth={2} />
                    <span>Automatic NDA protection applied to all preliminary inquiries.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-700 shrink-0 mt-0.5" aria-hidden="true" strokeWidth={2} />
                    <span>Encrypted file handling and restricted investigator access.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-700 shrink-0 mt-0.5" aria-hidden="true" strokeWidth={2} />
                    <span>Zero third-party tracking or advertising telemetry on contact submissions.</span>
                  </li>
                </ul>
              </div>

              {/* PGP Encryption Key Reference */}
              <div className="p-4 rounded-md bg-white text-slate-800 border border-slate-200 space-y-1.5 text-xs shadow-none">
                <div className="flex items-center gap-2 text-[#0F1E2E] font-mono font-bold text-[11px]">
                  <LockKeyhole className="h-3.5 w-3.5 text-[#0F1E2E]" aria-hidden="true" strokeWidth={2} />
                  <span>PGP Vault Fingerprint</span>
                </div>
                <p className="font-mono text-[11px] text-slate-700 break-all bg-slate-50 p-2 rounded-sm border border-slate-200">
                  {encryptionId}
                </p>
                <span className="text-[10px] text-slate-500 font-mono block">
                  Public Key ID: 0x9B42A871 • 4096R/ECDSA
                </span>
              </div>
            </div>

            {/* Right Column: Interactive Intake Form & Lazy Map */}
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-white rounded-md p-6 sm:p-8 border border-slate-200 shadow-none">
                <div className="mb-6 space-y-1">
                  <h3 className="text-lg sm:text-xl font-bold text-[#0F1E2E] font-sans">
                    Send Confidential Message
                  </h3>
                  <p className="text-xs text-slate-500 font-sans">
                    All communications are governed under immediate Non-Disclosure terms.
                  </p>
                </div>
                <ContactForm />
              </div>

              {/* Lazy-Loaded Google Map Section with Privacy Consent */}
              <div className="bg-white rounded-md border border-slate-200 overflow-hidden shadow-none">
                <div className="p-4 sm:p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50/50">
                  <div>
                    <h4 className="text-sm font-bold text-[#0F1E2E] font-mono flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-[#C5A059]" /> Operational Command Location
                    </h4>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Maker Chambers V, Jamnalal Bajaj Marg, Nariman Point, Mumbai 400021
                    </p>
                  </div>
                  <a
                    href="https://maps.google.com/?q=Maker+Chambers+V+Nariman+Point+Mumbai"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-300 rounded-sm text-xs font-mono font-medium text-slate-700 hover:bg-slate-50 shrink-0"
                  >
                    <span>Open in Google Maps</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>

                <div className="relative w-full h-80 bg-slate-100 flex items-center justify-center">
                  {!mapLoaded ? (
                    <div className="text-center p-6 space-y-3 max-w-sm">
                      <MapPin className="h-8 w-8 mx-auto text-[#0F1E2E]" />
                      <p className="text-xs text-slate-600">
                        To protect your privacy and reduce external tracking, interactive Google Maps is loaded on request.
                      </p>
                      <button
                        onClick={() => setMapLoaded(true)}
                        className="px-4 py-2 bg-[#0F1E2E] text-white hover:bg-[#070E18] text-xs font-mono font-semibold rounded-sm transition-colors cursor-pointer"
                      >
                        Load Interactive Map
                      </button>
                    </div>
                  ) : (
                    <iframe
                      title="SeekProof Mumbai Office Location"
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3774.2407285641775!2d72.82087597598816!3d18.928424982247346!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7d1e8c9735d69%3A0x9d4b06b23d91cf3e!2sMaker%20Chambers%20V%2C%20Jamnalal%20Bajaj%20Marg%2C%20Nariman%20Point%2C%20Mumbai%2C%20Maharashtra%20400021!5e0!3m2!1sen!2sin!4v1710000000000!5m2!1sen!2sin"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen={false}
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      className="w-full h-full"
                    />
                  )}
                </div>
              </div>
            </div>

          </div>
        </Container>
      </section>
    </div>
  );
}

export default ContactPage;
