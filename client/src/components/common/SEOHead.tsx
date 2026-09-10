import React, { useEffect } from 'react';

export interface SEOHeadProps {
  title?: string;
  description?: string;
  canonicalUrl?: string;
  ogType?: 'website' | 'article' | 'business.business';
  ogImage?: string;
  keywords?: string[];
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  jsonLd?: Record<string, any> | Array<Record<string, any>>;
}

const DEFAULT_TITLE = 'SeekProof | Private Investigation & Corporate Intelligence Services';
const DEFAULT_DESCRIPTION = 'Confidential, certified private investigation and corporate intelligence agency based in Nariman Point, Mumbai. ISO/IEC 27037 compliant forensics, background verification, due diligence, and surveillance.';
const DEFAULT_OG_IMAGE = 'https://seekproof.in/assets/og-image.jpg';
const SITE_URL = 'https://seekproof.in';

/**
 * Universal Technical SEO & Structured Data Head Controller
 * Dynamically updates document title, OpenGraph tags, Twitter Cards, canonical links, and Schema.org JSON-LD scripts.
 */
export const SEOHead: React.FC<SEOHeadProps> = ({
  title,
  description = DEFAULT_DESCRIPTION,
  canonicalUrl,
  ogType = 'website',
  ogImage = DEFAULT_OG_IMAGE,
  keywords,
  publishedTime,
  modifiedTime,
  author,
  jsonLd
}) => {
  const fullTitle = title 
    ? (title.includes('SeekProof') ? title : `${title} | SeekProof Investigations`)
    : DEFAULT_TITLE;

  const currentCanonical = canonicalUrl 
    ? (canonicalUrl.startsWith('http') ? canonicalUrl : `${SITE_URL}${canonicalUrl.startsWith('/') ? '' : '/'}${canonicalUrl}`)
    : typeof window !== 'undefined' ? window.location.href : SITE_URL;

  useEffect(() => {
    // 1. Update Title
    document.title = fullTitle;

    // Helper to update or create meta tags
    const setMetaTag = (attrName: string, attrVal: string, contentVal: string) => {
      let element = document.querySelector(`meta[${attrName}="${attrVal}"]`) as HTMLMetaElement | null;
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attrName, attrVal);
        document.head.appendChild(element);
      }
      element.setAttribute('content', contentVal);
    };

    // 2. Standard Meta Tags
    setMetaTag('name', 'description', description);
    if (keywords && keywords.length > 0) {
      setMetaTag('name', 'keywords', keywords.join(', '));
    }
    setMetaTag('name', 'robots', 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1');
    setMetaTag('name', 'author', author || 'SeekProof Private Intelligence Agency');

    // 3. OpenGraph Meta Tags
    setMetaTag('property', 'og:title', fullTitle);
    setMetaTag('property', 'og:description', description);
    setMetaTag('property', 'og:type', ogType);
    setMetaTag('property', 'og:url', currentCanonical);
    setMetaTag('property', 'og:image', ogImage);
    setMetaTag('property', 'og:site_name', 'SeekProof Private Investigations');
    setMetaTag('property', 'og:locale', 'en_IN');

    if (publishedTime) {
      setMetaTag('property', 'article:published_time', publishedTime);
    }
    if (modifiedTime) {
      setMetaTag('property', 'article:modified_time', modifiedTime);
    }
    if (author) {
      setMetaTag('property', 'article:author', author);
    }

    // 4. Twitter Card Meta Tags
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:title', fullTitle);
    setMetaTag('name', 'twitter:description', description);
    setMetaTag('name', 'twitter:image', ogImage);

    // 5. Canonical Link
    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', currentCanonical);

    // 6. Inject Schema.org JSON-LD
    const jsonLdId = 'seekproof-dynamic-jsonld';
    let scriptTag = document.getElementById(jsonLdId) as HTMLScriptElement | null;
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = jsonLdId;
      scriptTag.type = 'application/ld+json';
      document.head.appendChild(scriptTag);
    }

    // Base Organization / LocalBusiness Schema
    const baseOrgSchema = {
      '@context': 'https://schema.org',
      '@type': ['ProfessionalService', 'LocalBusiness'],
      '@id': 'https://seekproof.in/#organization',
      name: 'SeekProof Private Investigations & Corporate Intelligence',
      legalName: 'SeekProof Private Intelligence Services',
      url: 'https://seekproof.in',
      logo: 'https://seekproof.in/assets/logo.png',
      image: 'https://seekproof.in/assets/og-image.jpg',
      description: 'Confidential, licensed private investigation and corporate risk mitigation agency operating with judicial evidentiary rigor.',
      telephone: '+917304679756',
      alternateTelephone: '+919152695373',
      email: 'seekproof47@gmail.com',
      priceRange: '$$$$',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Maker Chambers V, Nariman Point',
        addressLocality: 'Mumbai',
        addressRegion: 'Maharashtra',
        postalCode: '400021',
        addressCountry: 'IN'
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 18.9284,
        longitude: 72.8228
      },
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          opens: '09:00',
          closes: '20:00'
        },
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Saturday'],
          opens: '10:00',
          closes: '16:00'
        }
      ],
      areaServed: [
        { '@type': 'City', name: 'Mumbai' },
        { '@type': 'City', name: 'Delhi NCR' },
        { '@type': 'City', name: 'Bengaluru' },
        { '@type': 'City', name: 'Pune' },
        { '@type': 'City', name: 'Hyderabad' },
        { '@type': 'Country', name: 'India' }
      ],
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Private Investigation Services',
        itemListElement: [
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Corporate Fraud Investigation' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Digital Forensics & OSINT' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Asset Tracing & Recovery' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Pre & Post Matrimonial Inquiries' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'TSCM Bug Sweeping & Counter-Surveillance' } }
        ]
      }
    };

    let fullJsonLdPayload: any;
    if (jsonLd) {
      if (Array.isArray(jsonLd)) {
        fullJsonLdPayload = [baseOrgSchema, ...jsonLd];
      } else {
        fullJsonLdPayload = [baseOrgSchema, jsonLd];
      }
    } else {
      fullJsonLdPayload = baseOrgSchema;
    }

    scriptTag.textContent = JSON.stringify(fullJsonLdPayload);

    return () => {
      // Cleanup on unmount if needed
    };
  }, [fullTitle, description, currentCanonical, ogType, ogImage, keywords, publishedTime, modifiedTime, author, jsonLd]);

  return null;
};

export default SEOHead;
