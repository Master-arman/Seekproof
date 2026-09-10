import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Shield, 
  LockKeyhole, 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  MessageCircle, 
  ArrowUpRight, 
  Send, 
  CheckCircle2, 
  ExternalLink,
  Linkedin,
  Twitter,
  Facebook,
  Instagram,
  Compass
} from 'lucide-react';
import { Container } from '../ui/Container';

export function Footer() {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim() && newsletterEmail.includes('@')) {
      setIsSubscribed(true);
      setNewsletterEmail('');
    }
  };

  const servicesLinks = [
    { name: 'Missing Persons', path: '/services/missing-persons' },
    { name: 'Corporate Security', path: '/services/corporate-fraud' },
    { name: 'Background Checks', path: '/services/due-diligence' },
    { name: 'Surveillance', path: '/services/field-surveillance' },
    { name: 'Private Investigations', path: '/services/personal-investigation' },
    { name: 'Marital Investigations', path: '/services/marital-investigations' },
  ];

  const companyLinks = [
    { name: 'About Us', path: '/about' },
    { name: 'Contact', path: '/contact' },
    { name: 'Careers', path: '/careers' },
    { name: 'Privacy Policy', path: '/privacy-policy' },
    { name: 'Terms of Service', path: '/terms-of-service' },
    { name: 'Blog', path: '/blog' },
  ];

  const socialLinks = [
    { name: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com/company/seekproof', label: 'Follow SeekProof on LinkedIn' },
    { name: 'Twitter / X', icon: Twitter, href: 'https://twitter.com/seekproof', label: 'Follow SeekProof on X' },
    { name: 'Facebook', icon: Facebook, href: 'https://facebook.com/seekproof', label: 'Visit SeekProof Facebook page' },
    { name: 'Instagram', icon: Instagram, href: 'https://instagram.com/seekproof', label: 'Follow SeekProof on Instagram' },
  ];

  const MUMBAI_ADDRESS = 'Maker Chambers V, Nariman Point, Mumbai, Maharashtra 400021, India';
  const GOOGLE_MAPS_URL = 'https://maps.google.com/?q=Maker+Chambers+V+Nariman+Point+Mumbai+Maharashtra+400021';

  return (
    <footer 
      className="border-t border-slate-200 bg-[#F8FAFC] text-slate-600 text-xs sm:text-sm"
      aria-labelledby="footer-heading"
    >
      <h2 id="footer-heading" className="sr-only">SeekProof Footer</h2>

      {/* Top Banner: Direct Action & WhatsApp Bar */}
      <div className="border-b border-slate-200 bg-[#F1F5F9] py-5">
        <Container size="xl" className="flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-sm bg-[#0F1E2E] text-[#D4AF37]">
              <LockKeyhole className="h-4.5 w-4.5" aria-hidden="true" strokeWidth={2} />
            </div>
            <div>
              <p className="text-xs sm:text-sm font-bold text-[#0F1E2E] font-mono">
                Immediate Urgent Assistance or Confidential Case Inquiries?
              </p>
              <p className="text-xs text-slate-500">
                Senior case officers available 24/7 with zero-breach confidentiality.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2.5">
            {/* Click to Call */}
            <a
              href="tel:+917304679756"
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-sm bg-white border border-slate-300 text-slate-800 hover:bg-slate-50 transition-colors font-mono text-xs font-semibold"
              aria-label="Call Direct Confidential Hotline: +91 7304679756"
            >
              <Phone className="h-3.5 w-3.5 text-[#D4AF37]" aria-hidden="true" strokeWidth={2.5} />
              <span>Call: +91 7304679756</span>
            </a>

            {/* WhatsApp CTA */}
            <a
              href="https://wa.me/917304679756"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-sm bg-white border border-emerald-300 text-emerald-700 hover:bg-emerald-50 transition-colors font-mono text-xs font-semibold"
              aria-label="Start Encrypted WhatsApp Consultation on +91 7304679756"
            >
              <MessageCircle className="h-3.5 w-3.5 text-emerald-600" aria-hidden="true" strokeWidth={2} />
              <span>Encrypted WhatsApp</span>
              <ArrowUpRight className="h-3 w-3 text-emerald-600" aria-hidden="true" />
            </a>
          </div>
        </Container>
      </div>

      {/* Main 4-Column Grid */}
      <Container size="xl" className="py-12 sm:py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-8">
          {/* Column 1: Company Introduction */}
          <div className="space-y-3.5">
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 group focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#0F1E2E] rounded-sm p-0.5"
              aria-label="SeekProof Home"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-sm bg-[#0F1E2E] text-[#D4AF37]">
                <Shield className="h-5 w-5" aria-hidden="true" strokeWidth={2} />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold text-[#0F1E2E] font-mono tracking-tight leading-tight">
                  SEEK<span className="text-[#D4AF37]">PROOF</span>
                </span>
                <span className="text-[9px] uppercase font-mono tracking-widest text-slate-500 font-semibold">
                  Private Intelligence
                </span>
              </div>
            </Link>

            <div className="inline-block px-2 py-0.5 rounded-sm bg-slate-100 border border-slate-200 text-[10px] font-mono text-slate-700 font-semibold">
              Professional Investigation Services
            </div>

            <p className="text-xs text-slate-600 leading-relaxed font-sans">
              Discreet corporate intelligence, digital forensics, personal inquiries, and evidence collection. Conducted under strict mutual NDA protocols and statutory compliance.
            </p>

            {/* Newsletter Subscription Field */}
            <div className="pt-2 space-y-2">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#0F1E2E]">
                Intelligence Briefing Dispatch
              </h4>
              {isSubscribed ? (
                <div className="flex items-center gap-2 p-2 rounded-sm bg-[#F0FDF4] border border-[#BBF7D0] text-[#16803C] text-xs font-medium">
                  <CheckCircle2 className="h-4 w-4 shrink-0" aria-hidden="true" strokeWidth={2} />
                  <span>Subscribed to quarterly briefs.</span>
                </div>
              ) : (
                <form onSubmit={handleNewsletterSubmit} className="flex items-center gap-1.5">
                  <div className="relative flex-1">
                    <label htmlFor="newsletter-email" className="sr-only">
                      Email Address for Intelligence Briefings
                    </label>
                    <input
                      id="newsletter-email"
                      type="email"
                      required
                      value={newsletterEmail}
                      onChange={(e) => setNewsletterEmail(e.target.value)}
                      placeholder="Enter email address..."
                      className="w-full rounded-sm bg-white border border-slate-300 px-3 py-1.5 text-xs text-slate-900 placeholder-slate-400 focus:border-[#0F1E2E] focus:outline-none focus:ring-1 focus:ring-[#0F1E2E]"
                    />
                  </div>
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center p-2 rounded-sm bg-[#0F1E2E] text-white hover:bg-[#070E18] transition-colors shrink-0 font-semibold cursor-pointer"
                    aria-label="Subscribe to intelligence briefs"
                  >
                    <Send className="h-3.5 w-3.5" aria-hidden="true" strokeWidth={2} />
                  </button>
                </form>
              )}
              <span className="text-[10px] text-slate-500 font-mono block">
                Zero spam. Guaranteed confidential communications.
              </span>
            </div>
          </div>

          {/* Column 2: Services */}
          <div className="space-y-3.5">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#0F1E2E] font-mono">
                Investigation Services
              </h3>
              <div className="gold-divider w-8 mt-1" />
            </div>

            <ul className="space-y-2 text-xs">
              {servicesLinks.map((service) => (
                <li key={service.name}>
                  <Link
                    to={service.path}
                    className="group inline-flex items-center gap-2 text-slate-600 hover:text-[#0F1E2E] transition-colors"
                  >
                    <span className="h-1 w-1 rounded-full bg-slate-300 group-hover:bg-[#0F1E2E] transition-colors" aria-hidden="true" />
                    <span>{service.name}</span>
                  </Link>
                </li>
              ))}
            </ul>

            <div className="pt-1">
              <Link
                to="/services"
                className="inline-flex items-center gap-1 text-xs font-mono font-semibold text-[#0F1E2E] hover:text-[#D4AF37] transition-colors"
              >
                <span>View Full Service Catalog</span>
                <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
              </Link>
            </div>
          </div>

          {/* Column 3: Company */}
          <div className="space-y-3.5">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#0F1E2E] font-mono">
                Company & Legal
              </h3>
              <div className="gold-divider w-8 mt-1" />
            </div>

            <ul className="space-y-2 text-xs">
              {companyLinks.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className="group inline-flex items-center gap-2 text-slate-600 hover:text-[#0F1E2E] transition-colors"
                  >
                    <span className="h-1 w-1 rounded-full bg-slate-300 group-hover:bg-[#0F1E2E] transition-colors" aria-hidden="true" />
                    <span>{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>

            {/* Social Media Links */}
            <div className="pt-2 space-y-1.5">
              <span className="text-[10px] font-mono text-slate-500 block uppercase tracking-wider font-semibold">
                Official Channels
              </span>
              <div className="flex items-center gap-1.5">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-7 w-7 items-center justify-center rounded-sm bg-white border border-slate-200 text-slate-600 hover:text-[#0F1E2E] hover:border-slate-400 transition-colors"
                      aria-label={social.label}
                      title={social.name}
                    >
                      <Icon className="h-3.5 w-3.5" aria-hidden="true" strokeWidth={2} />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Column 4: Contact Information */}
          <div className="space-y-3.5">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#0F1E2E] font-mono">
                Contact & Headquarters
              </h3>
              <div className="gold-divider w-8 mt-1" />
            </div>

            <div className="space-y-2.5 text-xs">
              {/* Phone 1 */}
              <div className="flex items-start gap-2">
                <Phone className="h-3.5 w-3.5 text-[#D4AF37] shrink-0 mt-0.5" aria-hidden="true" strokeWidth={2.5} />
                <div>
                  <a
                    href="tel:+917304679756"
                    className="font-mono text-slate-800 hover:text-[#0F1E2E] transition-colors block font-bold"
                  >
                    +91 7304679756
                  </a>
                  <span className="text-[10px] text-slate-500 font-mono">Primary Duty Officer (24/7)</span>
                </div>
              </div>

              {/* Phone 2 */}
              <div className="flex items-start gap-2">
                <Phone className="h-3.5 w-3.5 text-[#D4AF37] shrink-0 mt-0.5" aria-hidden="true" strokeWidth={2.5} />
                <div>
                  <a
                    href="tel:+919152695373"
                    className="font-mono text-slate-800 hover:text-[#0F1E2E] transition-colors block font-bold"
                  >
                    +91 9152695373
                  </a>
                  <span className="text-[10px] text-slate-500 font-mono">Secondary Support Desk</span>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-2">
                <Mail className="h-3.5 w-3.5 text-[#D4AF37] shrink-0 mt-0.5" aria-hidden="true" strokeWidth={2.5} />
                <div>
                  <a
                    href="mailto:seekproof47@gmail.com"
                    className="text-slate-800 hover:text-[#0F1E2E] transition-colors break-all font-mono font-medium"
                  >
                    seekproof47@gmail.com
                  </a>
                  <span className="text-[10px] text-slate-500 font-mono block">PGP Encrypted Intake</span>
                </div>
              </div>

              {/* Mumbai Office Address */}
              <div className="flex items-start gap-2">
                <MapPin className="h-3.5 w-3.5 text-[#D4AF37] shrink-0 mt-0.5" aria-hidden="true" strokeWidth={2.5} />
                <div>
                  <span className="text-slate-800 font-semibold block">Mumbai Headquarters:</span>
                  <p className="text-slate-600 text-xs leading-relaxed mt-0.5">
                    {MUMBAI_ADDRESS}
                  </p>
                  <a
                    href={GOOGLE_MAPS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] font-mono text-[#0F1E2E] hover:text-[#D4AF37] mt-0.5 transition-colors font-semibold"
                    aria-label="Open SeekProof Mumbai Office on Google Maps"
                  >
                    <span>View on Google Maps</span>
                    <ExternalLink className="h-3 w-3" aria-hidden="true" />
                  </a>
                </div>
              </div>

              {/* Hours */}
              <div className="flex items-start gap-2 pt-0.5">
                <Clock className="h-3.5 w-3.5 text-slate-500 shrink-0 mt-0.5" aria-hidden="true" strokeWidth={2} />
                <div className="text-[10px] text-slate-500 font-mono">
                  <span>Operative Operations: 24 Hours / 7 Days</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Embedded Location Map Banner */}
        <div className="mt-10 rounded-md border border-slate-200 bg-white p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-center sm:text-left">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-sm bg-[#F8FAFC] border border-slate-200 text-[#0F1E2E]">
              <Compass className="h-5 w-5" aria-hidden="true" strokeWidth={2} />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-[#0F1E2E] font-mono">SeekProof Field Office & Forensics Lab</h4>
              <p className="text-xs text-slate-500 mt-0.5">
                Nariman Point Financial District, Mumbai, Maharashtra 400021
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={GOOGLE_MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm bg-[#F8FAFC] border border-slate-300 text-xs font-mono text-slate-800 hover:bg-slate-100 transition-colors font-semibold"
            >
              <span>Get Driving Directions</span>
              <ExternalLink className="h-3 w-3" aria-hidden="true" />
            </a>
          </div>
        </div>

        {/* Legal Disclaimer Box */}
        <div className="mt-8 p-3.5 rounded-sm bg-[#F1F5F9] border border-slate-200 text-[11px] text-slate-600 leading-relaxed font-sans">
          <p>
            <strong className="text-slate-800 font-mono">Confidentiality & Compliance Disclaimer:</strong> All preliminary consultations, case assessments, and investigative inquiries with SeekProof are strictly confidential, governed by binding Non-Disclosure Agreements (NDA), and subject to applicable statutory law. We adhere strictly to evidentiary admissibility standards and data protection practices.
          </p>
        </div>

        {/* Bottom Bar: Copyright & Protocol Links */}
        <div className="mt-6 pt-5 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 font-mono">
          <p>© 2026 SeekProof. All rights reserved.</p>
          <div className="flex flex-wrap items-center justify-center gap-4 text-slate-600">
            <Link to="/privacy-policy" className="hover:text-[#0F1E2E] transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms-of-service" className="hover:text-[#0F1E2E] transition-colors">
              Terms of Service
            </Link>
            <Link to="/cookie-policy" className="hover:text-[#0F1E2E] transition-colors">
              Cookie Policy
            </Link>
            <Link to="/disclaimer" className="hover:text-[#0F1E2E] transition-colors">
              Disclaimer
            </Link>
            <Link to="/contact" className="hover:text-[#0F1E2E] transition-colors">
              Chain of Custody Protocol
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;

