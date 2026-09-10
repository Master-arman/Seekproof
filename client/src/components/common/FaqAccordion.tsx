import React, { useState, useMemo } from 'react';
import { 
  HelpCircle, 
  Search, 
  ShieldCheck, 
  LockKeyhole, 
  BriefcaseBusiness, 
  Clock, 
  ClipboardCheck, 
  UserCheck, 
  CheckCircle2,
  ChevronRight,
  Phone
} from 'lucide-react';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '../ui/accordion';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Link } from 'react-router-dom';

export interface FAQItem {
  id: string;
  category: 'Confidentiality' | 'Services' | 'Process' | 'Reporting';
  question: string;
  answer: string;
  badge?: string;
  icon?: React.ReactNode;
}

export const DEFAULT_FAQS: FAQItem[] = [
  {
    id: 'faq-1',
    category: 'Confidentiality',
    question: 'Are consultations confidential?',
    answer: 'Yes, absolutely. Every consultation, telephone call, written requirement, and active case file is strictly bound by an automatic, legally enforceable Non-Disclosure Agreement (NDA). We implement 256-bit AES encryption across all communications, enforce air-gapped evidence storage, and offer optional zero-knowledge permanent data scrubbing upon case conclusion.',
    badge: 'Confidentiality Guarantee',
    icon: <LockKeyhole className="h-4 w-4 text-[#0F1E2E]" aria-hidden="true" strokeWidth={2} />
  },
  {
    id: 'faq-2',
    category: 'Services',
    question: 'What types of cases do you handle?',
    answer: 'SeekProof handles complex personal, matrimonial, corporate, and forensic inquiries. Our key practice areas include: Corporate Asset Tracing & Due Diligence, High-Net-Worth Pre/Post-Matrimonial Background Checks, Missing Person & Runaway Juvenile Locating, Cyber Forensics & Electronic Fraud Audits, Litigation Support & Evidentiary Synthesis, and Counter-Surveillance (TSCM) Sweeps.',
    badge: 'Scope of Practice',
    icon: <BriefcaseBusiness className="h-4 w-4 text-[#0F1E2E]" aria-hidden="true" strokeWidth={2} />
  },
  {
    id: 'faq-3',
    category: 'Process',
    question: 'How does the consultation process work?',
    answer: 'Our intake process follows four transparent phases: (1) Initial confidential inquiry via our encrypted portal or 24/7 duty desk; (2) Strategy & Feasibility Assessment where senior case directors evaluate objectives and legal boundaries; (3) Transparent Retainer Proposal outlining expected timeline and operative scope; and (4) Operational Activation within 2 to 6 hours of retainer agreement.',
    badge: 'Intake Protocol',
    icon: <CheckCircle2 className="h-4 w-4 text-[#0F1E2E]" aria-hidden="true" strokeWidth={2} />
  },
  {
    id: 'faq-4',
    category: 'Services',
    question: 'Do you provide corporate investigation services?',
    answer: 'Yes. We provide institutional-grade corporate intelligence to multinational corporations, law firms, investment funds, and board directors. Services include: executive pre-appointment vetting, supply-chain procurement fraud detection, intellectual property (IP) counterfeit tracing, competitive intelligence within statutory limits, and forensic accounting investigation.',
    badge: 'Institutional Grade',
    icon: <BriefcaseBusiness className="h-4 w-4 text-[#0F1E2E]" aria-hidden="true" strokeWidth={2} />
  },
  {
    id: 'faq-5',
    category: 'Services',
    question: 'Can you help with background verification?',
    answer: 'Yes. We conduct rigorous, discrete background checks covering criminal record registries, authentic civil litigation history, credential verification, financial solvency audits, corporate directorships, lifestyle assessment, and discreet reputation verification. We strictly verify verifiable public and consenting sources in full compliance with data protection laws.',
    badge: 'Discrete Vetting',
    icon: <UserCheck className="h-4 w-4 text-[#0F1E2E]" aria-hidden="true" strokeWidth={2} />
  },
  {
    id: 'faq-6',
    category: 'Reporting',
    question: 'How are investigation reports delivered?',
    answer: 'Reports are delivered through a password-protected, multi-factor authenticated encrypted client portal or handed over physically in a sealed tamper-evident dossier by a senior case officer. Reports contain high-definition visual evidence, GPS time-stamped operative logs, forensic certificates, and judicial affidavits formatted for litigation admissibility.',
    badge: 'Evidence Delivery',
    icon: <ClipboardCheck className="h-4 w-4 text-[#0F1E2E]" aria-hidden="true" strokeWidth={2} />
  },
  {
    id: 'faq-7',
    category: 'Process',
    question: 'How long does an investigation take?',
    answer: 'Investigation duration is determined by case complexity and geographic footprint. Rapid response surveillance and asset verification can yield preliminary intelligence within 24 to 72 hours. Comprehensive corporate audits, matrimonial asset vetting, or cross-border tracing generally span 7 to 21 operational days, accompanied by milestone progress briefings.',
    badge: 'Operational Timeline',
    icon: <Clock className="h-4 w-4 text-[#0F1E2E]" aria-hidden="true" strokeWidth={2} />
  }
];

export interface FaqAccordionProps {
  items?: FAQItem[];
  theme?: 'dark' | 'light';
  showSearch?: boolean;
  showCategories?: boolean;
  showCta?: boolean;
  className?: string;
  defaultOpenId?: string;
}

export function FaqAccordion({
  items = DEFAULT_FAQS,
  theme = 'light',
  showSearch = true,
  showCategories = true,
  showCta = true,
  className = '',
  defaultOpenId = 'faq-1'
}: FaqAccordionProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = useMemo(() => {
    const cats = Array.from(new Set(items.map(item => item.category)));
    return ['All', ...cats];
  }, [items]);

  const filteredItems = useMemo(() => {
    return items.filter(item => {
      const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch = !query || 
        item.question.toLowerCase().includes(query) || 
        item.answer.toLowerCase().includes(query) ||
        (item.badge && item.badge.toLowerCase().includes(query));
      return matchesCategory && matchesSearch;
    });
  }, [items, selectedCategory, searchQuery]);

  return (
    <div className={`w-full ${className}`}>
      {/* Search & Category Filter Bar */}
      {(showSearch || showCategories) && (
        <div className="mb-8 space-y-4">
          {showSearch && (
            <div className="relative max-w-xl mx-auto">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" aria-hidden="true" strokeWidth={2} />
              <Input
                type="text"
                placeholder="Search questions (e.g. confidentiality, corporate, timeline)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 rounded-sm text-sm bg-white border-slate-300 text-slate-900 placeholder:text-slate-400 focus:border-[#0F1E2E] shadow-none"
                aria-label="Search questions"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-700 cursor-pointer"
                  aria-label="Clear search"
                >
                  Clear
                </button>
              )}
            </div>
          )}

          {showCategories && (
            <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1 rounded-sm text-xs font-semibold transition-colors cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-[#0F1E2E] text-white font-bold shadow-none'
                      : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-300'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Accordion Component */}
      {filteredItems.length === 0 ? (
        <div className="text-center py-12 rounded-md border bg-white border-slate-200 text-slate-500 shadow-none">
          <HelpCircle className="h-8 w-8 mx-auto text-slate-400 mb-2" aria-hidden="true" strokeWidth={2} />
          <p className="font-semibold text-sm">No matching questions found for "{searchQuery}".</p>
          <p className="text-xs mt-1 font-normal text-slate-500">Please try refining your search term or contact our duty desk directly.</p>
          <Button
            variant="outline"
            size="sm"
            onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
            className="mt-4 rounded-sm"
          >
            Reset Filters
          </Button>
        </div>
      ) : (
        <Accordion
          type="single"
          defaultValue={defaultOpenId}
          collapsible={true}
          className="space-y-3"
        >
          {filteredItems.map((item) => (
            <AccordionItem
              key={item.id}
              value={item.id}
              className="border border-slate-200 hover:border-slate-300 rounded-md overflow-hidden bg-white shadow-none"
            >
              <AccordionTrigger
                icon={item.icon || <HelpCircle className="h-4 w-4 text-[#0F1E2E]" aria-hidden="true" strokeWidth={2} />}
                className="text-[#0F1E2E] hover:text-[#0F1E2E]"
              >
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 text-left">
                  <span>{item.question}</span>
                  {item.badge && (
                    <span className="inline-block text-[10px] font-mono px-2 py-0.5 rounded-sm bg-slate-100 text-slate-700 border border-slate-200 self-start sm:self-auto font-semibold">
                      {item.badge}
                    </span>
                  )}
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-slate-600">
                <p className="pt-1 font-normal leading-relaxed">{item.answer}</p>
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-mono text-slate-500">
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="h-3.5 w-3.5 text-emerald-700" aria-hidden="true" strokeWidth={2} />
                    Verified Legal Protocol
                  </span>
                  <Link
                    to="/free-consultation"
                    className="text-[#0F1E2E] hover:underline flex items-center gap-1 font-semibold"
                  >
                    Discuss Case <ChevronRight className="h-3 w-3" aria-hidden="true" strokeWidth={2} />
                  </Link>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      )}

      {/* Optional Consultation Footer Callout */}
      {showCta && (
        <div className="mt-10 p-5 rounded-md border border-slate-200 bg-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-none">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-sm bg-slate-50 border border-slate-200 flex items-center justify-center text-[#0F1E2E] shrink-0">
              <Phone className="h-4 w-4" aria-hidden="true" strokeWidth={2} />
            </div>
            <div>
              <h4 className="text-sm font-bold text-[#0F1E2E]">
                Have a specific or time-sensitive question?
              </h4>
              <p className="text-xs text-slate-500 font-normal">
                Our senior case directors are available 24/7 for zero-cost confidential assessment.
              </p>
            </div>
          </div>
          <Link to="/free-consultation">
            <Button variant="default" size="sm" className="whitespace-nowrap font-semibold shadow-none rounded-sm">
              Book Confidential Assessment
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default FaqAccordion;
