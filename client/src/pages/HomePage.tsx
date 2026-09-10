import React from 'react';
import { SEOHead } from '../components/common/SEOHead';
import { HeroSection } from '../components/home/HeroSection';
import { TrustStatsSection } from '../components/home/TrustStatsSection';
import { FeaturedServicesSection } from '../components/home/FeaturedServicesSection';
import { WhyChooseSection } from '../components/home/WhyChooseSection';
import { ProcessSection } from '../components/home/ProcessSection';
import { TestimonialsSection } from '../components/home/TestimonialsSection';
import { FaqSection } from '../components/home/FaqSection';
import { CtaBannerSection } from '../components/home/CtaBannerSection';

export function HomePage() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': [
      {
        '@type': 'Question',
        'name': 'Is my consultation and case strictly confidential?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'Yes. All inquiries and operational case files are protected under strict Non-Disclosure Agreements (NDAs), encrypted with AES-256 storage, and zero data leakage policies.'
        }
      },
      {
        '@type': 'Question',
        'name': 'Are investigation reports admissible in Indian courts?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'All digital and physical evidence gathered by SeekProof strictly complies with Section 65B of the Indian Evidence Act and ISO/IEC 27037 forensic standards.'
        }
      },
      {
        '@type': 'Question',
        'name': 'How fast can an emergency field operative deploy?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'Our rapid response field operatives in Mumbai and major metro locations can mobilize within 2 to 4 hours of formal retainer authorization.'
        }
      }
    ]
  };

  return (
    <div className="space-y-0">
      <SEOHead
        title="SeekProof | Private Investigation & Corporate Intelligence Agency Mumbai"
        description="India's leading private investigation agency headquartered in Nariman Point, Mumbai. Expert corporate fraud probes, pre/post matrimonial vetting, asset tracing, and TSCM bug sweeps."
        canonicalUrl="/"
        keywords={[
          'private investigator mumbai',
          'detective agency nariman point',
          'corporate intelligence india',
          'matrimonial background check',
          'asset recovery forensics',
          'tscm bug sweeping services'
        ]}
        jsonLd={faqSchema}
      />

      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Trust Statistics */}
      <TrustStatsSection />

      {/* 3. Featured Services Preview (6 Core Disciplines) */}
      <FeaturedServicesSection />

      {/* 4. Why Choose SeekProof (6 Key Pillars) */}
      <WhyChooseSection />

      {/* 5. 5-Step Operational Process */}
      <ProcessSection />

      {/* 6. Testimonials & Client Endorsements */}
      <TestimonialsSection />

      {/* 7. Frequently Asked Questions (Interactive Accordion) */}
      <FaqSection />

      {/* 8. Final High-Conversion Consultation CTA */}
      <CtaBannerSection />
    </div>
  );
}

export default HomePage;
