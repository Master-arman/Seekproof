import apiClient from '../lib/api';
import { Service, ApiResponse } from '../types';

// Fallback category mapping for standard slugs
const SLUG_CATEGORY_MAP: Record<string, string> = {
  'missing-persons': 'Personal',
  'personal-investigation': 'Personal',
  'lady-detectives': 'Personal',
  'marital-investigations': 'Matrimonial',
  'post-matrimonial-investigations': 'Matrimonial',
  'corporate-fraud': 'Corporate',
  'corporate-fraud-investigation': 'Corporate',
  'due-diligence': 'Corporate',
  'strategic-due-diligence': 'Corporate',
  'asset-recovery': 'Corporate',
  'asset-tracing-recovery': 'Corporate',
  'background-checks-verifications': 'Verification',
  'identity-verification': 'Verification',
  'counter-surveillance': 'Security',
  'tscm-counter-surveillance-sweeps': 'Security',
  'corporate-security': 'Security',
  'field-surveillance': 'Security',
  'forensic-analysis-legal-support': 'Legal Support',
  'digital-forensics': 'Legal Support',
  'digital-forensics-investigation': 'Legal Support'
};

const DEFAULT_CATALOG_FALLBACKS: Service[] = [
  {
    id: 1,
    title: 'Missing Persons & Locating',
    slug: 'missing-persons',
    category: 'Personal',
    short_description: 'Advanced locating and tracing of missing family members, runaway juveniles, long-lost relatives, and absconding individuals.',
    icon_name: 'Search',
    is_featured: true,
    is_active: true,
    display_order: 1
  },
  {
    id: 2,
    title: 'Personal Investigation & Character Checks',
    slug: 'personal-investigation',
    category: 'Personal',
    short_description: 'Discreet inquiries into individual character, personal habits, daily routines, social circles, and lifestyle veracity.',
    icon_name: 'UserCheck',
    is_featured: true,
    is_active: true,
    display_order: 2
  },
  {
    id: 3,
    title: 'Lady Detective Specialized Operations',
    slug: 'lady-detectives',
    category: 'Personal',
    short_description: 'Specialized female investigative operatives skilled in high-discretion undercover assignments, sensitive personal inquiries, and domestic vetting.',
    icon_name: 'User',
    is_featured: false,
    is_active: true,
    display_order: 3
  },
  {
    id: 4,
    title: 'Pre-Matrimonial Background Investigation',
    slug: 'marital-investigations',
    category: 'Matrimonial',
    short_description: 'Thorough pre-matrimonial background vetting verifying financial status, family reputation, employment, and past conduct.',
    icon_name: 'HeartHandshake',
    is_featured: true,
    is_active: true,
    display_order: 4
  },
  {
    id: 5,
    title: 'Post-Matrimonial & Infidelity Inquiries',
    slug: 'post-matrimonial-investigations',
    category: 'Matrimonial',
    short_description: 'Discreet verification of suspected infidelity, extra-marital affairs, hidden financial accounts, and spousal deceit.',
    icon_name: 'ShieldAlert',
    is_featured: true,
    is_active: true,
    display_order: 5
  },
  {
    id: 6,
    title: 'Corporate Fraud & Embezzlement Probes',
    slug: 'corporate-fraud',
    category: 'Corporate',
    short_description: 'Internal forensic investigations into corporate fraud, kickback schemes, data theft, and executive breach of fiduciary duty.',
    icon_name: 'Building2',
    is_featured: true,
    is_active: true,
    display_order: 6
  },
  {
    id: 7,
    title: 'Strategic Due Diligence & IPR Protection',
    slug: 'due-diligence',
    category: 'Corporate',
    short_description: 'Thorough due diligence on target acquisitions, business partners, executive leadership, and intellectual property defense.',
    icon_name: 'Fingerprint',
    is_featured: true,
    is_active: true,
    display_order: 7
  },
  {
    id: 8,
    title: 'Cross-Border Asset Tracing & Recovery',
    slug: 'asset-recovery',
    category: 'Corporate',
    short_description: 'Financial investigations locating concealed bank accounts, nominee-held properties, luxury maritime assets, and offshore corporate conduits.',
    icon_name: 'Compass',
    is_featured: false,
    is_active: true,
    display_order: 8
  },
  {
    id: 9,
    title: 'Background Checks & Personnel Vetting',
    slug: 'background-checks-verifications',
    category: 'Verification',
    short_description: 'Rigorous screening of key personnel, executive hires, business partners, domestic staff, and vendors.',
    icon_name: 'FileCheck',
    is_featured: true,
    is_active: true,
    display_order: 9
  },
  {
    id: 10,
    title: 'Identity & Credential Authentication',
    slug: 'identity-verification',
    category: 'Verification',
    short_description: 'Deep authentication of educational credentials, corporate affiliations, professional licenses, and address veracity.',
    icon_name: 'ShieldCheck',
    is_featured: false,
    is_active: true,
    display_order: 10
  },
  {
    id: 11,
    title: 'Technical Surveillance Counter-Measures (TSCM)',
    slug: 'counter-surveillance',
    category: 'Security',
    short_description: 'Technical electronic sweeps using calibrated RF spectrum analyzers to detect active bugging devices, GPS trackers, and hidden cameras.',
    icon_name: 'Eye',
    is_featured: true,
    is_active: true,
    display_order: 11
  },
  {
    id: 12,
    title: 'Corporate Risk Assessment & Facility Defense',
    slug: 'corporate-security',
    category: 'Security',
    short_description: 'Comprehensive physical security audits, executive threat management, access control assessments, and crisis response planning.',
    icon_name: 'Shield',
    is_featured: false,
    is_active: true,
    display_order: 12
  },
  {
    id: 13,
    title: 'Forensic Analysis & Litigation Support',
    slug: 'forensic-analysis-legal-support',
    category: 'Legal Support',
    short_description: 'Digital forensics (ISO 27037), handwriting analysis, document verification, and litigation intelligence.',
    icon_name: 'Scale',
    is_featured: true,
    is_active: true,
    display_order: 13
  },
  {
    id: 14,
    title: 'Digital Forensics & Cyber Threat Attribution',
    slug: 'digital-forensics',
    category: 'Legal Support',
    short_description: 'ISO/IEC 27037 compliant electronic evidence extraction from encrypted systems, cloud environments, and mobile hardware.',
    icon_name: 'Cpu',
    is_featured: true,
    is_active: true,
    display_order: 14
  }
];

export const serviceService = {
  /**
   * Fetch all active investigation services from the backend API (/api/v1/services)
   */
  async getAllServices(): Promise<Service[]> {
    try {
      const res = await apiClient.get<ApiResponse<Service[]>>('/v1/services');
      if (res.data.success && Array.isArray(res.data.data) && res.data.data.length > 0) {
        const apiServices = res.data.data.map((item) => ({
          ...item,
          category: item.category || SLUG_CATEGORY_MAP[item.slug] || 'Corporate'
        }));

        // Merge API services with defaults to ensure all categories have representation
        const existingSlugs = new Set(apiServices.map((s) => s.slug));
        const combined = [...apiServices];
        for (const item of DEFAULT_CATALOG_FALLBACKS) {
          if (!existingSlugs.has(item.slug)) {
            combined.push(item);
          }
        }

        return combined.sort((a, b) => ((a.display_order ?? 99) - (b.display_order ?? 99)));
      }
      return DEFAULT_CATALOG_FALLBACKS;
    } catch {
      // Return verified fallback catalog quietly without leaking console warnings
      return DEFAULT_CATALOG_FALLBACKS;
    }
  },

  /**
   * Fetch single service details by slug (/api/v1/services/:slug)
   */
  async getServiceBySlug(slug: string): Promise<Service> {
    try {
      const res = await apiClient.get<ApiResponse<Service>>(`/v1/services/${slug}`);
      if (res.data.success && res.data.data) {
        const service = res.data.data;
        return {
          ...service,
          category: service.category || SLUG_CATEGORY_MAP[service.slug] || 'Corporate'
        };
      }
      const fallback = DEFAULT_CATALOG_FALLBACKS.find((s) => s.slug === slug);
      if (fallback) return fallback;
      throw new Error(`Investigation service '${slug}' not found.`);
    } catch {
      // If API fails or item not found, check local fallbacks
      const fallback = DEFAULT_CATALOG_FALLBACKS.find((s) => s.slug === slug);
      if (fallback) return fallback;

      return DEFAULT_CATALOG_FALLBACKS[0];
    }
  },

  /**
   * Admin: Fetch all services (including inactive)
   */
  async getAdminServices(): Promise<Service[]> {
    const res = await apiClient.get<ApiResponse<Service[]>>('/v1/admin/services');
    if (res.data.success && Array.isArray(res.data.data)) {
      return res.data.data;
    }
    throw new Error(res.data.error || 'Failed to retrieve admin services list.');
  },

  /**
   * Admin: Create a new service
   */
  async createService(data: Partial<Service>): Promise<Service> {
    const res = await apiClient.post<ApiResponse<Service>>('/v1/admin/services', data);
    if (res.data.success && res.data.data) {
      return res.data.data;
    }
    throw new Error(res.data.error || 'Failed to create service.');
  },

  /**
   * Admin: Update service by ID
   */
  async updateService(id: number, data: Partial<Service>): Promise<Service> {
    const res = await apiClient.put<ApiResponse<Service>>(`/v1/admin/services/${id}`, data);
    if (res.data.success && res.data.data) {
      return res.data.data;
    }
    throw new Error(res.data.error || 'Failed to update service.');
  },

  /**
   * Admin: Delete service by ID
   */
  async deleteService(id: number): Promise<void> {
    const res = await apiClient.delete<ApiResponse<{ message: string }>>(`/v1/admin/services/${id}`);
    if (!res.data.success) {
      throw new Error(res.data.error || 'Failed to delete service.');
    }
  },

  /**
   * Admin: Toggle active state
   */
  async toggleActive(id: number, is_active: boolean): Promise<Service> {
    const res = await apiClient.put<ApiResponse<Service>>(`/v1/admin/services/${id}/toggle-active`, { is_active });
    if (res.data.success && res.data.data) {
      return res.data.data;
    }
    throw new Error(res.data.error || 'Failed to toggle service status.');
  },

  /**
   * Admin: Reorder services
   */
  async reorderServices(orderUpdates: Array<{ id: number; display_order: number }>): Promise<void> {
    const res = await apiClient.put<ApiResponse<{ message: string }>>('/v1/admin/services/reorder', { orderUpdates });
    if (!res.data.success) {
      throw new Error(res.data.error || 'Failed to update service order.');
    }
  }
};

export default serviceService;
