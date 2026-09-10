import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Check, 
  ChevronRight, 
  ChevronDown, 
  ShieldAlert, 
  HelpCircle, 
  ArrowLeft, 
  Phone, 
  LockKeyhole,
  FileText,
  ShieldCheck,
  Scale,
  Users,
  MessageCircle,
  RefreshCw,
  FileSearch,
  CheckCircle2,
  ArrowUpRight,
  Clock
} from 'lucide-react';
import { PageHero } from '../components/ui/PageHero';
import { Container } from '../components/ui/Container';
import { Badge } from '../components/ui/badge';
import { PrimaryButton, SecondaryButton } from '../components/ui/button';
import { SEOHead } from '../components/common/SEOHead';
import { getServiceBySlug, ServiceDetail, servicesData } from '../lib/data/servicesData';
import { serviceService } from '../services/serviceService';
import { Service } from '../types';
import { cn } from '../lib/utils';

// FAQ Accordion Item Component with smooth animation
function FaqAccordionItem({
  question,
  answer,
  isOpen,
  onToggle
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border border-slate-200 rounded-md overflow-hidden bg-white transition-colors">
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        className="w-full p-4 sm:p-5 flex items-center justify-between gap-4 text-left font-bold text-sm sm:text-base text-[#0F1E2E] hover:text-[#997B24] transition-colors focus:outline-none cursor-pointer"
      >
        <span className="flex items-center gap-2.5">
          <HelpCircle className="h-4 w-4 text-[#997B24] shrink-0" aria-hidden="true" strokeWidth={2} />
          <span>{question}</span>
        </span>
        <ChevronDown
          className={cn(
            'h-4 w-4 text-slate-400 shrink-0 transition-transform duration-200',
            isOpen ? 'rotate-180 text-[#997B24]' : ''
          )}
          aria-hidden="true"
          strokeWidth={2}
        />
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
            <motion.div
              key="content"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.15, ease: 'easeInOut' }}
            >
            <div className="px-4 pb-5 sm:px-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function ServiceDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [apiService, setApiService] = useState<Service | null>(null);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [retryCount, setRetryCount] = useState<number>(0);

  // Verified Mumbai Office Numbers
  const hotline = '+91 7304679756';
  const alternatePhone = '+91 9152695373';
  const rawPhone = '+917304679756';
  const whatsappNumber = '917304679756';

  // Fetch service details from API or local fallback
  const fetchServiceData = useCallback(async () => {
    if (!slug) return;
    setLoading(true);
    setError(null);

    try {
      const fetched = await serviceService.getServiceBySlug(slug);
      setApiService(fetched);
    } catch (err: any) {
      // If API fails, check if we have local rich data for this slug
      const localFallback = getServiceBySlug(slug);
      if (localFallback) {
        setApiService({
          id: slug,
          title: localFallback.title,
          slug: localFallback.slug,
          category: localFallback.category,
          short_description: localFallback.shortDesc,
          full_description: localFallback.overview,
          is_active: true
        });
      } else {
        setError(err.message || `Unable to load details for discipline '${slug}'.`);
      }
    } finally {
      setLoading(false);
    }
  }, [slug]);

  useEffect(() => {
    fetchServiceData();
  }, [fetchServiceData, retryCount]);

  // Combine fetched API data with rich details template
  const detailData: ServiceDetail | undefined = slug ? getServiceBySlug(slug) : undefined;
  const currentTitle = apiService?.title || detailData?.title || 'Investigation Service';
  const currentCategory = apiService?.category || detailData?.category || 'Specialized Practice';
  const currentOverview = detailData?.overview || apiService?.full_description || apiService?.short_description || '';
  const currentTagline = detailData?.heroTagline || apiService?.short_description || 'Rigorous private intelligence gathering led by veteran operatives.';

  // Target Audiences (Who needs this service)
  const whoNeedsThisList: string[] = detailData?.whoNeedsThis || [
    'Corporate General Counsel & In-House Legal Teams',
    'Special Audit Committees & Board of Directors',
    'High-Net-Worth Individuals & Family Offices',
    'Litigation Attorneys & Judicial Counsel',
    'Risk & Compliance Officers'
  ];

  // Key Deliverables
  const deliverablesList: string[] = detailData?.keyDeliverables || [
    'Court-admissible chronological evidence dossier',
    'Time-stamped photographic and optical video documentation',
    'Sworn investigator affidavits with unbroken chain-of-custody',
    'Direct confidential partner case debriefing',
    'Strategic remediation and risk avoidance advisory'
  ];

  // Methodology Steps
  const methodologyList = detailData?.methodology || [
    {
      step: '01',
      title: 'Confidential Intake & Conflict Review',
      description: 'Executing mutual non-disclosure agreements, establishing strict communications security, and defining lawful scope.'
    },
    {
      step: '02',
      title: 'Multi-Source Intelligence Collection',
      description: 'Deploying matched operative field units, digital forensic extractions, and lawful registry cross-referencing.'
    },
    {
      step: '03',
      title: 'Evidentiary Corroboration',
      description: 'Validating collected logs against statutory legal standards to ensure court admissibility and veracity.'
    },
    {
      step: '04',
      title: 'Admissible Dossier Handover',
      description: 'Delivering an encrypted final dossier, sworn investigator brief, and partner-level consultation.'
    }
  ];

  // FAQs
  const faqsList = detailData?.faqs || [
    {
      question: 'How quickly can an investigation commence?',
      answer: 'Initial case triage and conflict checks commence within hours of intake. Field operatives or forensic extraction units can deploy within 24 to 48 hours.'
    },
    {
      question: 'Are your investigative reports admissible in court proceedings?',
      answer: 'Yes. All inquiries follow statutory rules of evidence and ISO 27037 standards, accompanied by sworn affidavits and an unbroken chain of custody.'
    },
    {
      question: 'How is client confidentiality guaranteed?',
      answer: 'All client information is protected under binding non-disclosure agreements, end-to-end PGP encryption, and zero-knowledge data retention policies.'
    }
  ];

  // Related Services (excluding current slug)
  const relatedServices = servicesData.filter((s) => s.slug !== slug).slice(0, 3);

  // WhatsApp Pre-filled URL
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    `Hello SeekProof Duty Officer, I would like to inquire confidentially regarding the "${currentTitle}" service.`
  )}`;

  // --------------------------------------------------------------------------
  // Loading Skeleton State
  // --------------------------------------------------------------------------
  if (loading) {
    return (
      <div className="space-y-0 min-h-screen bg-[#F8FAFC] animate-pulse">
        <div className="bg-slate-100 py-16 sm:py-24 border-b border-slate-200">
          <Container size="xl" className="space-y-4">
            <div className="h-4 w-32 bg-slate-300 rounded-sm" />
            <div className="h-8 w-2/3 bg-slate-300 rounded-sm" />
            <div className="h-4 w-1/2 bg-slate-300 rounded-sm" />
          </Container>
        </div>

        <section className="section-padding py-12">
          <Container size="xl">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              <div className="lg:col-span-2 space-y-8">
                <div className="h-48 bg-white rounded-md border border-slate-200 p-6" />
                <div className="h-64 bg-white rounded-md border border-slate-200 p-6" />
                <div className="h-72 bg-white rounded-md border border-slate-200 p-6" />
              </div>
              <div className="space-y-6">
                <div className="h-60 bg-white rounded-md border border-slate-200 p-6" />
                <div className="h-48 bg-white rounded-md border border-slate-200 p-6" />
              </div>
            </div>
          </Container>
        </section>
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // Error State with Retry Button
  // --------------------------------------------------------------------------
  if (error && !apiService && !detailData) {
    return (
      <div className="min-h-[75vh] flex items-center justify-center bg-[#F8FAFC] px-4 py-16">
        <div className="max-w-md w-full bg-white rounded-md p-8 border border-red-200 text-center space-y-4">
          <div className="inline-flex p-3 rounded-sm bg-red-50 text-red-600 border border-red-100">
            <ShieldAlert className="h-8 w-8" aria-hidden="true" strokeWidth={2} />
          </div>
          <h2 className="text-lg font-bold text-slate-900 font-mono">
            Intelligence Dossier Unavailable
          </h2>
          <p className="text-xs text-slate-600 leading-relaxed">
            {error}
          </p>
          <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-2">
            <button
              onClick={() => setRetryCount((c) => c + 1)}
              className="w-full sm:w-auto px-4 py-2 bg-[#0F1E2E] text-[#D4AF37] hover:bg-[#16283D] text-xs font-mono font-bold rounded-sm transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <RefreshCw className="h-3.5 w-3.5" aria-hidden="true" strokeWidth={2} /> Retry Request
            </button>
            <Link to="/services" className="w-full sm:w-auto">
              <SecondaryButton size="sm" className="w-full text-xs font-mono">
                Browse All Services
              </SecondaryButton>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // Not Found State
  // --------------------------------------------------------------------------
  if (!detailData && !apiService) {
    return (
      <div className="min-h-[75vh] flex items-center justify-center bg-[#F8FAFC] px-4 py-16">
        <div className="max-w-md w-full bg-white rounded-md p-8 border border-slate-200 text-center space-y-4">
          <div className="inline-flex p-3 rounded-sm bg-slate-100 text-[#0F1E2E] border border-slate-200">
            <FileSearch className="h-8 w-8 text-[#997B24]" aria-hidden="true" strokeWidth={2} />
          </div>
          <h2 className="text-lg font-bold text-[#0F1E2E] font-mono">
            Discipline Not Found
          </h2>
          <p className="text-xs text-slate-600 leading-relaxed">
            The requested investigation discipline <span className="font-mono font-bold">"{slug}"</span> could not be located in the operational registry.
          </p>
          <div className="pt-2">
            <Link to="/services">
              <PrimaryButton size="sm" className="font-mono text-xs">
                <ArrowLeft className="h-3.5 w-3.5 mr-1" aria-hidden="true" strokeWidth={2} /> Return to Services Catalog
              </PrimaryButton>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // Render Main Dynamic Service Detail Page
  // --------------------------------------------------------------------------
  return (
    <div className="space-y-0 min-h-screen bg-[#F8FAFC]">
      <SEOHead
        title={`${currentTitle} | SeekProof Investigation Services`}
        description={apiService?.short_description || detailData?.shortDesc || `${currentTitle} private investigation services by SeekProof Mumbai.`}
        canonicalUrl={`/services/${slug}`}
        keywords={[currentTitle.toLowerCase(), 'investigation services mumbai', 'detective agency nariman point', currentCategory.toLowerCase()]}
        jsonLd={[
          {
            '@context': 'https://schema.org',
            '@type': 'Service',
            'name': currentTitle,
            'serviceType': currentCategory,
            'provider': {
              '@type': 'LocalBusiness',
              'name': 'SeekProof Private Investigations',
              'telephone': '+917304679756',
              'address': {
                '@type': 'PostalAddress',
                'streetAddress': 'Maker Chambers V, Nariman Point',
                'addressLocality': 'Mumbai',
                'postalCode': '400021',
                'addressCountry': 'IN'
              }
            },
            'description': apiService?.short_description || detailData?.shortDesc
          },
          {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            'itemListElement': [
              { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': 'https://seekproof.in/' },
              { '@type': 'ListItem', 'position': 2, 'name': 'Services', 'item': 'https://seekproof.in/services' },
              { '@type': 'ListItem', 'position': 3, 'name': currentTitle, 'item': `https://seekproof.in/services/${slug}` }
            ]
          }
        ]}
      />

      {/* 1. Reusable Service Hero Banner */}
      <PageHero
        badge={currentCategory}
        title={currentTitle}
        subtitle={currentTagline}
        breadcrumbs={[
          { label: 'Investigation Services', path: '/services' },
          { label: currentTitle }
        ]}
        actions={
          <div className="flex flex-wrap items-center gap-3">
            <Link to="/free-consultation">
              <PrimaryButton size="md" className="font-mono text-xs uppercase tracking-wider">
                Schedule Case Consultation
              </PrimaryButton>
            </Link>
            <a
              href={`tel:${rawPhone}`}
              className="inline-flex items-center px-4 py-2.5 rounded-sm border border-slate-300 hover:border-[#0F1E2E] bg-white text-[#0F1E2E] font-mono text-xs font-bold transition-all gap-2"
            >
              <Phone className="h-3.5 w-3.5 text-[#997B24]" aria-hidden="true" strokeWidth={2} />
              <span>Call Now: {hotline}</span>
            </a>
          </div>
        }
      />

      {/* 2. Main Content Layout */}
      <section className="section-padding">
        <Container size="xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            
            {/* Left Content (2 Columns) */}
            <div className="lg:col-span-2 space-y-10">
              
              {/* A. Operational Description & Overview */}
              <div className="bg-white p-6 sm:p-8 rounded-md border border-slate-200 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-[#0F1E2E] font-mono tracking-tight">
                    Operational Overview & Scope
                  </h3>
                  <Badge variant="navy" className="text-[10px]">
                    Evidentiary Standard
                  </Badge>
                </div>
                <div className="gold-divider w-12" />
                <p className="text-sm text-slate-700 leading-relaxed pt-1 font-normal">
                  {currentOverview}
                </p>
              </div>

              {/* Photographic Evidentiary Exhibit Banner */}
              <div className="rounded-md overflow-hidden border border-slate-200 bg-slate-100 relative">
                <div className="aspect-[16/9] sm:aspect-[21/9] w-full relative">
                  <img
                    src={detailData?.category === 'Forensic & Cyber Intelligence' ? '/images/forensics-lab.jpg' : '/images/corporate-intelligence.jpg'}
                    alt="Evidentiary investigation dossier and chain-of-custody verification"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent pointer-events-none" />
                  <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded-sm bg-[#0F1E2E]/90 border border-slate-600 font-mono text-[10px] text-[#D4AF37] font-semibold">
                        Field Intelligence & Chain of Custody
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-slate-200 hidden sm:inline">
                      ISO/IEC 27037 Compliant Protocol
                    </span>
                  </div>
                </div>
              </div>

              {/* B. Who May Need This Service */}
              <div className="bg-white p-6 sm:p-8 rounded-md border border-slate-200 space-y-5">
                <div className="flex items-center gap-2 text-[#0F1E2E]">
                  <Users className="h-5 w-5 text-[#997B24]" aria-hidden="true" strokeWidth={2} />
                  <h3 className="text-xl font-bold font-mono tracking-tight">
                    Who Needs This Service
                  </h3>
                </div>
                <div className="gold-divider w-12" />
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {whoNeedsThisList.map((audience, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-sm bg-[#F8FAFC] border border-slate-200 flex items-start gap-3 hover:border-slate-400 transition-colors"
                    >
                      <CheckCircle2 className="h-4 w-4 text-[#997B24] shrink-0 mt-0.5" aria-hidden="true" strokeWidth={2.5} />
                      <span className="text-xs font-semibold text-slate-800 leading-snug">
                        {audience}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* C. Step-by-Step Investigation Process */}
              <div className="bg-white p-6 sm:p-8 rounded-md border border-slate-200 space-y-6">
                <div>
                  <div className="flex items-center gap-2 text-[#0F1E2E]">
                    <Clock className="h-5 w-5 text-[#997B24]" aria-hidden="true" strokeWidth={2} />
                    <h3 className="text-xl font-bold font-mono tracking-tight">
                      Investigation Methodology
                    </h3>
                  </div>
                  <div className="gold-divider w-12 mt-1" />
                  <p className="text-xs text-slate-500 mt-2 font-normal">
                    Every operational mandate follows a disciplined 4-stage process ensuring legal compliance and chain-of-custody integrity.
                  </p>
                </div>

                <div className="space-y-4">
                  {methodologyList.map((m, idx) => (
                    <div
                      key={idx}
                      className="p-4 sm:p-5 rounded-sm bg-[#F8FAFC] border border-slate-200 flex flex-col sm:flex-row items-start gap-4 hover:border-slate-400 transition-colors"
                    >
                      <div className="h-10 w-10 rounded-sm bg-[#0F1E2E] text-[#D4AF37] border border-[#223852] flex items-center justify-center font-mono text-base font-bold shrink-0">
                        {m.step}
                      </div>
                      <div className="space-y-1">
                        <h4 className="text-sm font-bold text-[#0F1E2E] font-mono">
                          {m.title}
                        </h4>
                        <p className="text-xs text-slate-600 leading-relaxed font-normal">
                          {m.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* D. Expected Deliverables */}
              <div className="bg-white p-6 sm:p-8 rounded-md border border-slate-200 space-y-4">
                <div className="flex items-center gap-2 text-[#0F1E2E]">
                  <FileText className="h-5 w-5 text-[#997B24]" aria-hidden="true" strokeWidth={2} />
                  <h3 className="text-xl font-bold font-mono tracking-tight">
                    Key Deliverables & Evidence Package
                  </h3>
                </div>
                <div className="gold-divider w-12" />
                <p className="text-xs text-slate-500">
                  Clients receive a standardized, tamper-evident investigation dossier structured for executive review or judicial proceedings.
                </p>

                <ul className="space-y-2.5 pt-2">
                  {deliverablesList.map((item, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-3 p-3 rounded-sm bg-[#F8FAFC] border border-slate-200 text-xs sm:text-sm text-slate-700"
                    >
                      <CheckCircle2 className="h-4 w-4 text-[#997B24] shrink-0 mt-0.5" aria-hidden="true" strokeWidth={2.5} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* E. Confidentiality Statement */}
              <div className="rounded-md p-6 sm:p-8 space-y-4 bg-slate-50 border border-slate-200">
                <div className="flex items-center gap-2.5 text-[#0F1E2E]">
                  <LockKeyhole className="h-5 w-5 text-[#997B24]" aria-hidden="true" strokeWidth={2} />
                  <h3 className="text-lg font-bold text-[#0F1E2E] font-mono">
                    Absolute Confidentiality & Non-Disclosure Protocol
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {detailData?.confidentialityStatement || 
                    'All inquiries and active cases are bound by mutual Non-Disclosure Agreements (NDA) prior to data intake. Communications utilize 256-bit PGP encryption, and all evidentiary records are stored in air-gapped, access-controlled cryptographic vaults. SeekProof maintains zero-knowledge metadata policies and strictly enforces operational compartmentation.'}
                </p>
                <div className="pt-2 flex flex-wrap items-center gap-2 text-[11px] font-mono text-slate-700">
                  <span className="px-2.5 py-1 rounded-sm bg-white border border-slate-200 flex items-center gap-1.5">
                    <LockKeyhole className="h-3 w-3 text-[#997B24]" aria-hidden="true" strokeWidth={2} />
                    <span>Strict Mutual NDA</span>
                  </span>
                  <span className="px-2.5 py-1 rounded-sm bg-white border border-slate-200 flex items-center gap-1.5">
                    <ShieldCheck className="h-3 w-3 text-[#997B24]" aria-hidden="true" strokeWidth={2} />
                    <span>ISO/IEC 27037 Evidence Handling</span>
                  </span>
                  <span className="px-2.5 py-1 rounded-sm bg-white border border-slate-200 flex items-center gap-1.5">
                    <LockKeyhole className="h-3 w-3 text-[#997B24]" aria-hidden="true" strokeWidth={2} />
                    <span>256-Bit Vault Storage</span>
                  </span>
                </div>
              </div>

              {/* F. Legal & Ethical Limitations (Crucial Compliance Guardrail) */}
              <div className="rounded-md p-6 sm:p-8 bg-amber-50/80 border border-amber-200/90 text-amber-950 space-y-3">
                <div className="flex items-center gap-2 text-amber-800">
                  <Scale className="h-5 w-5 shrink-0" aria-hidden="true" strokeWidth={2} />
                  <h4 className="text-sm font-bold font-mono uppercase tracking-wider">
                    Legal Boundaries, Ethical Standards & Compliance Notice
                  </h4>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed">
                  {detailData?.legalLimitations ||
                    'SeekProof strictly adheres to applicable federal, state, and international privacy statutes. We do NOT perform unauthorized wiretapping, illegal electronic phone spyware installations, unlawful physical trespassing, extortion, or harassment. Evidence is gathered exclusively through lawful open-source intelligence, consented records, and non-intrusive observation in public domains. We deliver objective, verified facts without promising guaranteed speculative judicial outcomes.'}
                </p>
              </div>

              {/* G. Frequently Asked Questions */}
              {faqsList.length > 0 && (
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-bold text-[#0F1E2E] font-mono tracking-tight flex items-center gap-2">
                      <HelpCircle className="h-5 w-5 text-[#997B24]" aria-hidden="true" strokeWidth={2} /> Frequently Asked Questions
                    </h3>
                    <div className="gold-divider w-12 mt-1" />
                  </div>

                  <div className="space-y-3 pt-2">
                    {faqsList.map((faq, i) => (
                      <FaqAccordionItem
                        key={i}
                        question={faq.question}
                        answer={faq.answer}
                        isOpen={openFaqIndex === i}
                        onToggle={() => setOpenFaqIndex(openFaqIndex === i ? null : i)}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* H. Related Investigation Services */}
              {relatedServices.length > 0 && (
                <div className="space-y-5 pt-4 border-t border-slate-200">
                  <div>
                    <h3 className="text-xl font-bold text-[#0F1E2E] font-mono tracking-tight">
                      Related Investigation Disciplines
                    </h3>
                    <div className="gold-divider w-12 mt-1" />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {relatedServices.map((rel) => (
                      <Link
                        key={rel.slug}
                        to={`/services/${rel.slug}`}
                        className="p-4 rounded-md bg-white border border-slate-200 hover:border-[#0F1E2E] transition-all group flex flex-col justify-between"
                      >
                        <div className="space-y-2">
                          <span className="text-[10px] font-mono font-semibold uppercase px-2 py-0.5 rounded-sm bg-slate-100 text-slate-600">
                            {rel.category}
                          </span>
                          <h4 className="text-xs font-bold text-[#0F1E2E] group-hover:text-[#997B24] transition-colors line-clamp-1">
                            {rel.title}
                          </h4>
                          <p className="text-[11px] text-slate-500 line-clamp-2">
                            {rel.shortDesc}
                          </p>
                        </div>
                        <div className="pt-3 flex items-center text-[11px] font-mono font-bold text-[#0F1E2E] group-hover:text-[#997B24] gap-1">
                          <span>View Dossier</span>
                          <ArrowUpRight className="h-3 w-3" aria-hidden="true" strokeWidth={2} />
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

            </div>

            {/* Right Sidebar (Action & Booking Hub) */}
            <div className="space-y-6">
              
              {/* 1. Free Consultation CTA Card */}
              <div className="bg-white rounded-md p-6 sm:p-7 space-y-4 text-slate-900 border border-slate-200 sticky top-24">
                <div className="flex items-center gap-2 text-[#0F1E2E]">
                  <ShieldCheck className="h-5 w-5 text-[#997B24]" aria-hidden="true" strokeWidth={2} />
                  <h4 className="text-base font-bold text-[#0F1E2E] font-mono">
                    Schedule Case Consultation
                  </h4>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Every inquiry begins with a confidential preliminary evaluation and an immediate conflict-of-interest check.
                </p>

                {/* Direct Action Buttons */}
                <div className="space-y-2.5 pt-2">
                  <Link to="/free-consultation" className="block w-full">
                    <PrimaryButton size="md" className="w-full font-mono text-xs uppercase tracking-wider">
                      Schedule Consultation
                    </PrimaryButton>
                  </Link>
                  <Link to="/contact" className="block w-full">
                    <SecondaryButton size="md" className="w-full font-mono text-xs uppercase tracking-wider text-slate-700 border-slate-300 hover:bg-slate-50">
                      Send Secure Inquiry
                    </SecondaryButton>
                  </Link>
                </div>

                {/* Call Now Action */}
                <div className="pt-4 border-t border-slate-200 space-y-2">
                  <div className="text-[11px] font-mono text-slate-500 uppercase tracking-wider">
                    24/7 Priority Emergency Line:
                  </div>
                  <a
                    href={`tel:${rawPhone}`}
                    className="flex items-center justify-between p-3 rounded-sm bg-slate-50 border border-slate-200 hover:border-slate-400 text-slate-900 transition-colors group"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="p-2 rounded-sm bg-[#0F1E2E] text-[#D4AF37]">
                        <Phone className="h-4 w-4" aria-hidden="true" strokeWidth={2} />
                      </div>
                      <div>
                        <div className="text-xs font-mono font-bold text-[#0F1E2E]">{hotline}</div>
                        <div className="text-[10px] text-slate-500">Direct Duty Desk</div>
                      </div>
                    </div>
                    <ChevronRight className="h-4 w-4 text-slate-400 group-hover:text-[#0F1E2E] transition-colors" aria-hidden="true" strokeWidth={2} />
                  </a>
                </div>

                {/* WhatsApp Action */}
                <div className="pt-2">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-sm bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 text-emerald-800 font-mono text-xs font-bold transition-colors"
                  >
                    <MessageCircle className="h-4 w-4" aria-hidden="true" strokeWidth={2} />
                    <span>WhatsApp Encrypted Chat</span>
                  </a>
                </div>

                {/* Confidentiality Footer */}
                <div className="pt-2 text-center text-[10px] font-mono text-slate-500 flex items-center justify-center gap-1.5">
                  <LockKeyhole className="h-3 w-3 text-[#997B24]" aria-hidden="true" strokeWidth={2} />
                  <span>Strict NDA & 256-Bit PGP Protected</span>
                </div>
              </div>

              {/* 2. Direct Navigation Back to All Services */}
              <div className="bg-white rounded-md p-6 border border-slate-200 text-center space-y-3">
                <h5 className="text-xs font-mono uppercase tracking-wider font-bold text-[#0F1E2E]">
                  Explore Other Disciplines
                </h5>
                <p className="text-xs text-slate-500">
                  Review our full spectrum of corporate, personal, and forensic capabilities.
                </p>
                <Link to="/services" className="inline-block w-full">
                  <button className="w-full py-2 px-3 text-xs font-mono font-semibold rounded-sm bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors flex items-center justify-center gap-1 cursor-pointer">
                    <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" strokeWidth={2} />
                    <span>All Investigation Services</span>
                  </button>
                </Link>
              </div>

            </div>

          </div>
        </Container>
      </section>
    </div>
  );
}

export default ServiceDetailPage;
