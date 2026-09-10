import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  X, 
  Shield, 
  FileText, 
  Cpu, 
  Scale, 
  Fingerprint, 
  Eye, 
  Building2, 
  Phone, 
  MessageCircle, 
  LockKeyhole, 
  ArrowRight,
  ShieldCheck,
  Camera
} from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface SearchItem {
  id: string;
  title: string;
  category: 'Services' | 'Navigation' | 'Direct Action';
  description: string;
  path?: string;
  action?: () => void;
  icon: React.ReactNode;
}

const SEARCH_ITEMS: SearchItem[] = [
  {
    id: 'srv-1',
    title: 'Digital Forensics & Incident Attribution',
    category: 'Services',
    description: 'ISO/IEC 27037 compliant analysis, exfiltration source attribution, and artifact recovery.',
    path: '/services/digital-forensics',
    icon: <Cpu className="h-4 w-4 text-[#D4AF37]" aria-hidden="true" strokeWidth={2} />
  },
  {
    id: 'srv-2',
    title: 'Corporate Fraud & Internal Embezzlement',
    category: 'Services',
    description: 'Forensic accounting audits, shell company de-cloaking, and breach of fiduciary inquiry.',
    path: '/services/corporate-fraud',
    icon: <Building2 className="h-4 w-4 text-[#D4AF37]" aria-hidden="true" strokeWidth={2} />
  },
  {
    id: 'srv-3',
    title: 'Cross-Border Asset Tracing & Enforcement',
    category: 'Services',
    description: 'Offshore entity discovery, bank account discovery support, and debtor evasion tracking.',
    path: '/services/asset-recovery',
    icon: <Fingerprint className="h-4 w-4 text-[#D4AF37]" aria-hidden="true" strokeWidth={2} />
  },
  {
    id: 'srv-4',
    title: 'TSCM & Counter-Surveillance Sweeps',
    category: 'Services',
    description: 'RF spectrum analysis, boardroom electronic sweeps, and GPS tracker detection.',
    path: '/services/counter-surveillance',
    icon: <Eye className="h-4 w-4 text-[#D4AF37]" aria-hidden="true" strokeWidth={2} />
  },
  {
    id: 'srv-5',
    title: 'Strategic Executive & M&A Due Diligence',
    category: 'Services',
    description: 'Integrity vetting, regulatory sanction checks, and reputational risk assessment.',
    path: '/services/due-diligence',
    icon: <Scale className="h-4 w-4 text-[#D4AF37]" aria-hidden="true" strokeWidth={2} />
  },
  {
    id: 'srv-6',
    title: 'Covert Field Surveillance & Evidence Capture',
    category: 'Services',
    description: '4K time-stamped video evidence, operative field logs, and observer affidavits.',
    path: '/services/field-surveillance',
    icon: <Camera className="h-4 w-4 text-[#D4AF37]" aria-hidden="true" strokeWidth={2} />
  },
  {
    id: 'nav-home',
    title: 'Home Page',
    category: 'Navigation',
    description: 'Main intelligence briefing, credential overview, and investigative capabilities.',
    path: '/',
    icon: <Shield className="h-4 w-4 text-slate-400" aria-hidden="true" strokeWidth={2} />
  },
  {
    id: 'nav-about',
    title: 'About SeekProof Agency',
    category: 'Navigation',
    description: 'Agency history, forensic accreditation, leadership, and operational standards.',
    path: '/about',
    icon: <Building2 className="h-4 w-4 text-slate-400" aria-hidden="true" strokeWidth={2} />
  },
  {
    id: 'nav-services',
    title: 'All Capabilities & Services',
    category: 'Navigation',
    description: 'Complete directory of corporate, digital, financial, and field investigative solutions.',
    path: '/services',
    icon: <Cpu className="h-4 w-4 text-slate-400" aria-hidden="true" strokeWidth={2} />
  },
  {
    id: 'nav-cases',
    title: 'Verified Case Studies',
    category: 'Navigation',
    description: 'De-identified briefs of past operations, asset recoveries, and corporate inquiries.',
    path: '/case-studies',
    icon: <FileText className="h-4 w-4 text-slate-400" aria-hidden="true" strokeWidth={2} />
  },
  {
    id: 'nav-contact',
    title: 'Confidential Contact & Briefing',
    category: 'Navigation',
    description: 'Encrypted intake form and direct channels for confidential briefing requests.',
    path: '/contact',
    icon: <LockKeyhole className="h-4 w-4 text-slate-400" aria-hidden="true" strokeWidth={2} />
  },
  {
    id: 'nav-consultation',
    title: 'Free Case Consultation',
    category: 'Navigation',
    description: 'Preliminary zero-cost assessment protected under strict non-disclosure.',
    path: '/free-consultation',
    icon: <ShieldCheck className="h-4 w-4 text-[#D4AF37]" aria-hidden="true" strokeWidth={2} />
  },
  {
    id: 'act-call',
    title: 'Direct Hotline (+91 7304679756)',
    category: 'Direct Action',
    description: 'Immediate connection to the 24/7 SeekProof duty investigator.',
    action: () => {
      window.location.href = 'tel:+917304679756';
    },
    icon: <Phone className="h-4 w-4 text-[#D4AF37]" aria-hidden="true" strokeWidth={2} />
  },
  {
    id: 'act-whatsapp',
    title: 'Encrypted WhatsApp Channel',
    category: 'Direct Action',
    description: 'Initiate an end-to-end encrypted direct WhatsApp consultation (+91 7304679756).',
    action: () => {
      window.open('https://wa.me/917304679756', '_blank', 'noopener,noreferrer');
    },
    icon: <MessageCircle className="h-4 w-4 text-emerald-400" aria-hidden="true" strokeWidth={2} />
  }
];

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsContainerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Filter items based on query
  const filteredItems = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return SEARCH_ITEMS;
    return SEARCH_ITEMS.filter((item) => 
      item.title.toLowerCase().includes(q) ||
      item.description.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q)
    );
  }, [query]);

  // Reset index when query changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  // Handle focus and body scroll lock
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
      return () => {
        clearTimeout(timer);
        document.body.style.overflow = 'unset';
      };
    } else {
      document.body.style.overflow = 'unset';
      setQuery('');
    }
  }, [isOpen]);

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      onClose();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < filteredItems.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : filteredItems.length - 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const item = filteredItems[selectedIndex];
      if (item) {
        handleSelectItem(item);
      }
    }
  };

  const handleSelectItem = (item: SearchItem) => {
    onClose();
    if (item.action) {
      item.action();
    } else if (item.path) {
      navigate(item.path);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 pb-4"
          role="dialog"
          aria-modal="true"
          aria-label="Search SeekProof Intelligence & Services"
          onKeyDown={handleKeyDown}
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 bg-slate-900/40"
            onClick={onClose}
          />

          {/* Search Box Card */}
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="relative z-10 w-full max-w-2xl bg-white border border-slate-300 rounded-md shadow-xl overflow-hidden flex flex-col max-h-[80vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Search Input Bar */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-slate-200 bg-[#F8FAFC]">
              <Search className="h-4.5 w-4.5 text-[#0F1E2E] shrink-0" aria-hidden="true" strokeWidth={2} />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search services, practice areas, or quick actions..."
                className="w-full bg-transparent text-slate-900 placeholder-slate-400 text-xs sm:text-sm font-sans focus:outline-none"
                aria-label="Search input"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  className="p-1 text-slate-400 hover:text-slate-800 rounded-sm transition-colors cursor-pointer"
                  aria-label="Clear search input"
                >
                  <X className="h-4 w-4" aria-hidden="true" strokeWidth={2} />
                </button>
              )}
              <button
                type="button"
                onClick={onClose}
                className="hidden sm:inline-flex items-center justify-center px-1.5 py-0.5 text-[10px] font-mono uppercase tracking-wider text-slate-500 bg-white border border-slate-300 rounded-sm hover:text-slate-900 transition-colors cursor-pointer"
                aria-label="Close search"
              >
                ESC
              </button>
            </div>

            {/* Quick Filters / Tags */}
            <div className="px-4 py-2 border-b border-slate-200 bg-white flex items-center gap-1.5 overflow-x-auto text-[10px] font-mono">
              <span className="text-slate-400 shrink-0 uppercase font-semibold">Suggestions:</span>
              <button 
                type="button" 
                onClick={() => setQuery('forensics')}
                className="px-2 py-0.5 rounded-sm bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200 transition-colors shrink-0 cursor-pointer"
              >
                Forensics
              </button>
              <button 
                type="button" 
                onClick={() => setQuery('fraud')}
                className="px-2 py-0.5 rounded-sm bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200 transition-colors shrink-0 cursor-pointer"
              >
                Corporate Fraud
              </button>
              <button 
                type="button" 
                onClick={() => setQuery('asset')}
                className="px-2 py-0.5 rounded-sm bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200 transition-colors shrink-0 cursor-pointer"
              >
                Asset Tracing
              </button>
              <button 
                type="button" 
                onClick={() => setQuery('surveillance')}
                className="px-2 py-0.5 rounded-sm bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200 transition-colors shrink-0 cursor-pointer"
              >
                Surveillance
              </button>
              <button 
                type="button" 
                onClick={() => setQuery('consultation')}
                className="px-2 py-0.5 rounded-sm bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200 transition-colors shrink-0 cursor-pointer"
              >
                Consultation
              </button>
            </div>

            {/* Results List */}
            <div 
              ref={resultsContainerRef}
              className="flex-1 overflow-y-auto p-2 space-y-1"
            >
              {filteredItems.length === 0 ? (
                <div className="py-10 text-center space-y-2">
                  <Shield className="h-7 w-7 text-slate-400 mx-auto opacity-60" aria-hidden="true" strokeWidth={1.5} />
                  <p className="text-xs sm:text-sm font-semibold text-slate-700">No intelligence assets matched your query</p>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto font-normal">
                    Try searching for "forensics", "corporate fraud", "asset tracing", or contact our duty operatives directly.
                  </p>
                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() => {
                        onClose();
                        navigate('/free-consultation');
                      }}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-semibold text-[#0F1E2E] bg-slate-100 border border-slate-300 rounded-sm hover:bg-slate-200 transition-colors cursor-pointer"
                    >
                      <span>Request Case Consultation</span>
                      <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" strokeWidth={2} />
                    </button>
                  </div>
                </div>
              ) : (
                filteredItems.map((item, index) => {
                  const isSelected = index === selectedIndex;
                  return (
                    <div
                      key={item.id}
                      onClick={() => handleSelectItem(item)}
                      onMouseEnter={() => setSelectedIndex(index)}
                      className={`flex items-center justify-between p-2.5 rounded-sm cursor-pointer transition-colors ${
                        isSelected 
                          ? 'bg-slate-100 border border-slate-300 text-slate-900' 
                          : 'hover:bg-slate-50 text-slate-800 border border-transparent'
                      }`}
                      role="option"
                      aria-selected={isSelected}
                    >
                      <div className="flex items-center gap-2.5 min-w-0 pr-2">
                        <div className={`flex h-8 w-8 items-center justify-center rounded-sm shrink-0 border ${
                          isSelected ? 'bg-white border-slate-300 text-[#0F1E2E]' : 'bg-[#F8FAFC] border-slate-200 text-[#0F1E2E]'
                        }`}>
                          {item.icon}
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-xs truncate text-[#0F1E2E]">
                              {item.title}
                            </span>
                            <span className="text-[9px] font-mono uppercase px-1 py-0.2 rounded-sm bg-slate-100 text-slate-600 border border-slate-200 shrink-0">
                              {item.category}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5 font-normal">
                            {item.description}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-1 shrink-0 text-slate-600">
                        <span className="hidden sm:inline text-[10px] font-mono">Select</span>
                        <ArrowRight className="h-3 w-3" aria-hidden="true" strokeWidth={2} />
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Modal Footer Hotkeys Bar */}
            <div className="px-4 py-2 bg-[#F8FAFC] border-t border-slate-200 flex items-center justify-between text-[10px] font-mono text-slate-500">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <kbd className="px-1 py-0.2 bg-white border border-slate-200 rounded-sm text-slate-700">↑</kbd>
                  <kbd className="px-1 py-0.2 bg-white border border-slate-200 rounded-sm text-slate-700">↓</kbd>
                  <span className="hidden sm:inline">Navigate</span>
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="px-1 py-0.2 bg-white border border-slate-200 rounded-sm text-slate-700">↵</kbd>
                  <span className="hidden sm:inline">Open</span>
                </span>
              </div>
              <div className="flex items-center gap-1 text-slate-600 font-semibold">
                <LockKeyhole className="h-3 w-3 text-[#0F1E2E]" aria-hidden="true" strokeWidth={2} />
                <span>Encrypted Index Search</span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>

  );
}

export default SearchModal;
