import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  X, 
  ArrowUpRight, 
  ShieldAlert, 
  Filter, 
  RefreshCw, 
  FileSearch, 
  CheckCircle2, 
  ChevronRight,
  ShieldCheck,
  Layers
} from 'lucide-react';
import { PageHero } from '../components/ui/PageHero';
import { Container } from '../components/ui/Container';
import { SafeServiceIcon } from '../components/ui/SafeServiceIcon';
import { CardSkeleton } from '../components/ui/LoadingSkeleton';
import { PrimaryButton, SecondaryButton } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { SEOHead } from '../components/common/SEOHead';
import { serviceService } from '../services/serviceService';
import { Service, ServiceCategory } from '../types';
import { cn } from '../lib/utils';
import { servicesData } from '../lib/data/servicesData';

// Available category filter options
const CATEGORIES: { label: string; value: string }[] = [
  { label: 'All Disciplines', value: 'ALL' },
  { label: 'Personal', value: 'Personal' },
  { label: 'Matrimonial', value: 'Matrimonial' },
  { label: 'Corporate', value: 'Corporate' },
  { label: 'Verification', value: 'Verification' },
  { label: 'Security', value: 'Security' },
  { label: 'Legal Support', value: 'Legal Support' },
];

export function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState<number>(0);

  // Search and filter state
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  // Fetch services from the backend API
  const fetchServices = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await serviceService.getAllServices();
      setServices(data);
    } catch (err: any) {
      setError(
        err.message || 
        'Unable to connect to the SeekProof intelligence API gateway. Please verify network connectivity.'
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchServices();
  }, [fetchServices, retryCount]);

  // Handle manual retry action
  const handleRetry = () => {
    setRetryCount((prev) => prev + 1);
  };

  // Reset filters
  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('ALL');
  };

  // Filter services based on category and search query
  const filteredServices = useMemo(() => {
    return services.filter((service) => {
      // Category match
      const categoryMatch =
        selectedCategory === 'ALL' ||
        (service.category &&
          service.category.toLowerCase().trim() === selectedCategory.toLowerCase().trim());

      // Search match across title and short_description
      const query = searchQuery.trim().toLowerCase();
      const titleMatch = service.title?.toLowerCase().includes(query);
      const descMatch = service.short_description?.toLowerCase().includes(query);
      const categoryTextMatch = service.category?.toLowerCase().includes(query);

      const searchMatch = !query || titleMatch || descMatch || categoryTextMatch;

      return categoryMatch && searchMatch;
    });
  }, [services, selectedCategory, searchQuery]);

  // Lookup helper to enrich deliverables from local catalog data if available
  const getDeliverables = (slug: string): string[] => {
    const detail = servicesData.find((s) => s.slug === slug);
    if (detail && detail.keyDeliverables?.length > 0) {
      return detail.keyDeliverables.slice(0, 3);
    }
    return [
      'Chain-of-custody evidence dossier',
      'Discreet field operative reports',
      'Direct partner case debriefing'
    ];
  };

  return (
    <div className="space-y-0 min-h-screen bg-[#F8FAFC]">
      <SEOHead
        title="Private Investigation Services | Corporate, Personal & Forensics | SeekProof"
        description="Explore SeekProof's 14 core private investigation disciplines: corporate fraud probes, asset tracing, pre/post matrimonial vetting, TSCM bug sweeping, and digital forensics."
        canonicalUrl="/services"
        keywords={['investigation services', 'corporate fraud probe', 'matrimonial investigation', 'forensic analysis', 'asset tracing']}
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          'itemListElement': [
            { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': 'https://seekproof.in/' },
            { '@type': 'ListItem', 'position': 2, 'name': 'Investigation Services', 'item': 'https://seekproof.in/services' }
          ]
        }}
      />

      {/* 1. Page Hero */}
      <PageHero
        badge="Investigation Disciplines"
        title="Comprehensive Investigation Services"
        subtitle="Every case is led by licensed investigators adhering to strict evidentiary standards, chain-of-custody protocols, and absolute confidentiality."
        breadcrumbs={[{ label: 'Investigation Services' }]}
        actions={
          <div className="flex flex-wrap items-center gap-3">
            <Link to="/contact">
              <PrimaryButton size="md" className="font-mono text-xs uppercase tracking-wider rounded-sm shadow-none">
                Confidential Case Inquiry
              </PrimaryButton>
            </Link>
            <Link to="/free-consultation">
              <SecondaryButton size="md" className="font-mono text-xs uppercase tracking-wider rounded-sm shadow-none">
                Free Case Assessment
              </SecondaryButton>
            </Link>
          </div>
        }
      />

      {/* 2. Control Bar: Category Filters & Search */}
      <section className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-none transition-all">
        <Container size="xl" className="py-4">
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
            
            {/* Category Pills */}
            <div 
              className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0 scrollbar-none no-scrollbar text-xs font-mono"
              role="tablist"
              aria-label="Filter services by operational category"
            >
              <div className="hidden sm:flex items-center text-slate-500 mr-2 text-[11px] font-semibold uppercase tracking-wider shrink-0">
                <Filter className="h-3.5 w-3.5 mr-1 text-[#0F1E2E]" aria-hidden="true" strokeWidth={2} />
                Filter:
              </div>
              {CATEGORIES.map((cat) => {
                const isActive = selectedCategory === cat.value;
                return (
                  <button
                    key={cat.value}
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setSelectedCategory(cat.value)}
                    className={cn(
                      'px-3 py-1.5 rounded-sm font-semibold whitespace-nowrap transition-colors text-xs cursor-pointer select-none',
                      isActive
                        ? 'bg-[#0F1E2E] text-white shadow-none font-bold'
                        : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-300'
                    )}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>

            {/* Search Input Box */}
            <div className="relative w-full lg:w-80 shrink-0">
              <div className="relative flex items-center">
                <Search className="absolute left-3.5 h-4 w-4 text-slate-400 pointer-events-none" aria-hidden="true" strokeWidth={2} />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search disciplines or keywords..."
                  aria-label="Search investigation services by keyword"
                  className="w-full pl-9 pr-9 py-2 text-xs rounded-sm border border-slate-300 bg-white focus:outline-none focus:ring-1 focus:ring-[#0F1E2E] focus:border-[#0F1E2E] placeholder:text-slate-400 text-slate-900 transition-all shadow-none"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    aria-label="Clear search input"
                    className="absolute right-2.5 p-1 text-slate-400 hover:text-slate-700 rounded-sm hover:bg-slate-100 transition-colors"
                  >
                    <X className="h-3.5 w-3.5" aria-hidden="true" strokeWidth={2} />
                  </button>
                )}
              </div>
            </div>

          </div>

          {/* Active filter / Results meta row */}
          {!loading && !error && (
            <div className="flex items-center justify-between pt-3 mt-3 border-t border-slate-100 text-xs text-slate-500 font-mono">
              <div className="flex items-center gap-2">
                <span>Displaying</span>
                <span className="font-bold text-[#0F1E2E] bg-slate-100 px-2 py-0.5 rounded-sm border border-slate-200">
                  {filteredServices.length}
                </span>
                <span>of {services.length} operational disciplines</span>
                {(selectedCategory !== 'ALL' || searchQuery) && (
                  <span className="text-slate-400">• Filter Active</span>
                )}
              </div>

              {(selectedCategory !== 'ALL' || searchQuery) && (
                <button
                  onClick={handleResetFilters}
                  className="text-[#0F1E2E] hover:underline font-bold text-xs flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <X className="h-3.5 w-3.5" aria-hidden="true" strokeWidth={2} />
                  <span>Reset Filters</span>
                </button>
              )}
            </div>
          )}
        </Container>
      </section>

      {/* 3. Main Content Area */}
      <section className="section-padding">
        <Container size="xl">

          {/* A. Loading Skeleton State */}
          {loading && (
            <div className="space-y-6" aria-live="polite" aria-busy="true">
              <div className="flex items-center justify-between">
                <div className="h-4 w-48 bg-slate-200 rounded animate-pulse" />
                <div className="h-4 w-28 bg-slate-200 rounded animate-pulse" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {Array.from({ length: 6 }).map((_, index) => (
                  <CardSkeleton key={index} className="h-72" />
                ))}
              </div>
            </div>
          )}

          {/* B. Error State with Retry Button */}
          {!loading && error && (
            <div
              role="alert"
              className="max-w-xl mx-auto my-12 p-8 rounded-md bg-white border border-rose-200 shadow-none text-center space-y-5"
            >
              <div className="inline-flex p-3 rounded-sm bg-rose-50 text-rose-700 border border-rose-200">
                <ShieldAlert className="h-8 w-8" aria-hidden="true" strokeWidth={2} />
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-bold text-slate-900 font-mono">
                  Intelligence Gateway Connection Interrupted
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-md mx-auto">
                  {error}
                </p>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={handleRetry}
                  className="inline-flex items-center justify-center px-4 py-2 rounded-sm bg-[#0F1E2E] hover:bg-[#070E18] text-white font-mono text-xs font-bold transition-all shadow-none cursor-pointer"
                >
                  <RefreshCw className="h-3.5 w-3.5 mr-2 animate-spin-hover" aria-hidden="true" strokeWidth={2} />
                  Retry Connection
                </button>
                <Link to="/contact">
                  <SecondaryButton size="sm" className="font-mono text-xs rounded-sm shadow-none">
                    Contact Duty Officer
                  </SecondaryButton>
                </Link>
              </div>
            </div>
          )}

          {/* C. Empty State (No matching services) */}
          {!loading && !error && filteredServices.length === 0 && (
            <div className="max-w-lg mx-auto my-12 p-8 rounded-md bg-white border border-slate-200 shadow-none text-center space-y-4">
              <div className="inline-flex p-3 rounded-sm bg-slate-50 text-[#0F1E2E] border border-slate-200">
                <FileSearch className="h-8 w-8 text-[#0F1E2E]" aria-hidden="true" strokeWidth={2} />
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-bold text-[#0F1E2E] font-mono">
                  No Matching Disciplines Found
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-md mx-auto">
                  No investigation practice areas matched your current filter criteria{' '}
                  {searchQuery && (
                    <span className="font-mono font-bold text-[#0F1E2E]">
                      "{searchQuery}"
                    </span>
                  )}
                  . Try adjusting your search query or view all practice categories.
                </p>
              </div>

              <div className="pt-3">
                <button
                  onClick={handleResetFilters}
                  className="inline-flex items-center justify-center px-4 py-2 rounded-sm bg-[#0F1E2E] text-white hover:bg-[#070E18] font-mono text-xs font-semibold transition-all shadow-none cursor-pointer"
                >
                  <RefreshCw className="h-3.5 w-3.5 mr-1.5" aria-hidden="true" strokeWidth={2} />
                  Reset Search & Filters
                </button>
              </div>
            </div>
          )}

          {/* D. Loaded Services Grid */}
          {!loading && !error && filteredServices.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence mode="popLayout">
                {filteredServices.map((service, index) => {
                  const deliverables = getDeliverables(service.slug);

                  return (
                    <motion.article
                      key={service.slug || service.id}
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.15, ease: 'easeOut' }}
                      className="group flex flex-col justify-between rounded-md bg-white p-6 border border-slate-200 hover:border-slate-400 shadow-none transition-colors relative overflow-hidden"
                    >
                      <div className="space-y-4">
                        {/* Header: Safe Icon & Category Badge */}
                        <div className="flex items-center justify-between gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-sm bg-slate-50 border border-slate-200 text-[#0F1E2E]">
                            <SafeServiceIcon
                              iconName={service.icon_name}
                              className="h-5 w-5 text-[#0F1E2E]"
                            />
                          </div>

                          <div className="flex items-center gap-1.5">
                            {service.is_featured && (
                              <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold px-2 py-0.5 rounded-sm bg-slate-100 text-slate-800 border border-slate-200">
                                <ShieldCheck className="h-2.5 w-2.5 text-slate-600" aria-hidden="true" strokeWidth={2} />
                                Featured
                              </span>
                            )}
                            {service.category && (
                              <span className="text-[10px] font-mono font-semibold uppercase px-2 py-0.5 rounded-sm bg-slate-100 text-slate-700 border border-slate-200">
                                {service.category}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Title & Short Description */}
                        <div className="space-y-2">
                          <h2 className="text-base sm:text-lg font-bold text-[#0F1E2E] group-hover:text-slate-900 transition-colors line-clamp-1 tracking-tight">
                            <Link
                              to={`/services/${service.slug}`}
                              className="focus:outline-none focus:underline"
                              aria-label={`View details for ${service.title}`}
                            >
                              {service.title}
                            </Link>
                          </h2>
                          <p className="text-xs text-slate-600 leading-relaxed line-clamp-3 font-normal">
                            {service.short_description}
                          </p>
                        </div>

                        {/* Deliverables Checklist */}
                        <div className="pt-3 border-t border-slate-100 space-y-1.5">
                          <span className="text-[10px] uppercase font-mono tracking-wider font-bold text-slate-400">
                            Key Deliverables:
                          </span>
                          <ul className="space-y-1 text-xs text-slate-600">
                            {deliverables.map((item, dIdx) => (
                              <li key={dIdx} className="flex items-start gap-2">
                                <CheckCircle2 className="h-3.5 w-3.5 text-slate-500 shrink-0 mt-0.5" aria-hidden="true" strokeWidth={2} />
                                <span className="line-clamp-1">{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Card Footer: Learn More Button & Consultation Link */}
                      <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                        <Link
                          to={`/services/${service.slug}`}
                          className="inline-flex items-center text-xs font-mono font-bold text-[#0F1E2E] hover:underline gap-1.5 py-1.5 px-3 rounded-sm bg-slate-50 hover:bg-slate-100 border border-slate-200"
                          aria-label={`Learn more about ${service.title}`}
                        >
                          <span>Learn More</span>
                          <ArrowUpRight className="h-3.5 w-3.5 text-slate-600" aria-hidden="true" strokeWidth={2} />
                        </Link>

                        <Link
                          to="/contact"
                          className="text-[11px] font-mono text-slate-500 hover:text-[#0F1E2E] transition-colors font-semibold"
                          aria-label={`Request consultation on ${service.title}`}
                        >
                          Inquire
                        </Link>
                      </div>
                    </motion.article>
                  );
                })}
              </AnimatePresence>
            </div>
          )}

        </Container>
      </section>

      {/* 4. Bespoke Mandates Callout Section */}
      <section className="py-16 bg-[#F8FAFC] border-t border-slate-200">
        <Container size="xl">
          <div className="rounded-md p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-8 border border-slate-300 bg-white shadow-none">
            <div className="space-y-3 max-w-2xl">
              <div className="flex items-center gap-2.5 text-[#0F1E2E]">
                <ShieldCheck className="h-6 w-6 text-[#0F1E2E]" aria-hidden="true" strokeWidth={2} />
                <h3 className="text-xl sm:text-2xl font-bold text-[#0F1E2E] font-mono">
                  Require a Dedicated Investigation Team?
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                We assemble dedicated investigative units for commercial litigation, cross-border corporate fraud, asset recovery, and critical business disputes. All operations are executed under strict non-disclosure protection.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 shrink-0 w-full md:w-auto">
              <Link to="/contact" className="w-full sm:w-auto">
                <PrimaryButton size="md" className="w-full font-mono text-xs uppercase tracking-wider rounded-sm shadow-none">
                  Speak with a Senior Investigator
                </PrimaryButton>
              </Link>
              <Link to="/free-consultation" className="w-full sm:w-auto">
                <SecondaryButton size="md" className="w-full font-mono text-xs uppercase tracking-wider rounded-sm shadow-none">
                  Schedule Consultation
                </SecondaryButton>
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}

export default ServicesPage;
