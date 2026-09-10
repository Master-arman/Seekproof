export type AdminRole = 'super_admin' | 'manager' | 'staff' | 'admin';
export type UserRole = AdminRole | 'client' | 'investigator';

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: UserRole;
  is_active?: boolean;
  last_login_at?: string;
  agency_tier?: 'standard' | 'priority' | 'vip_corporate';
  created_at?: string;
}

export type CaseStatus = 
  | 'inquiry' 
  | 'under_review' 
  | 'active_investigation' 
  | 'evidence_gathering' 
  | 'reporting' 
  | 'closed';

export type CasePriority = 'standard' | 'high' | 'urgent' | 'critical';

export type CaseType = 
  | 'corporate_fraud' 
  | 'background_intelligence' 
  | 'surveillance' 
  | 'digital_forensics' 
  | 'asset_recovery' 
  | 'infidelity_marital' 
  | 'counter_surveillance' 
  | 'other';

export interface Case {
  id: string;
  case_number: string;
  title: string;
  description: string;
  case_type: CaseType;
  status: CaseStatus;
  priority: CasePriority;
  client_id: string;
  lead_investigator_id?: string;
  progress_percentage: number;
  confidentiality_level: 'confidential' | 'secret' | 'top_secret';
  target_subject?: string;
  location?: string;
  created_at?: string;
  updated_at?: string;
}

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  case_type: CaseType;
  service_requested: string;
  description: string;
  urgency: 'routine' | 'time_sensitive' | 'immediate_threat';
  status: 'pending' | 'reviewed' | 'converted_to_case' | 'declined';
  created_at?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
  count?: number;
  error?: string;
}

export type ServiceCategory = 
  | 'Personal'
  | 'Matrimonial'
  | 'Corporate'
  | 'Verification'
  | 'Security'
  | 'Legal Support';

export interface Service {
  id: number | string;
  title: string;
  slug: string;
  category: ServiceCategory | string;
  short_description: string;
  full_description?: string;
  icon_name?: string | null;
  featured_image?: string | null;
  is_featured?: boolean;
  is_active?: boolean;
  display_order?: number;
  features?: string[];
  meta_title?: string | null;
  meta_description?: string | null;
  created_at?: string;
  updated_at?: string;
}

export type LeadStatus = 'New' | 'Contacted' | 'In Progress' | 'Converted' | 'Closed' | 'Spam';

export interface LeadNote {
  id: number;
  lead_id: number;
  admin_id?: number | null;
  admin_name: string;
  note: string;
  created_at: string;
}

export interface StaffMember {
  id: number;
  name: string;
  email: string;
  role: string;
}

export interface Lead {
  id: number;
  full_name: string;
  phone: string;
  email: string;
  city?: string | null;
  service_id?: number | null;
  service_type?: string | null;
  preferred_date?: string | null;
  preferred_contact_method: string;
  message: string;
  consent_given: boolean;
  status: LeadStatus;
  assigned_to?: number | null;
  assigned_admin_name?: string | null;
  assigned_admin_email?: string | null;
  notes?: LeadNote[];
  source: string;
  utm_source?: string | null;
  utm_medium?: string | null;
  utm_campaign?: string | null;
  ip_address?: string | null;
  user_agent?: string | null;
  created_at: string;
  updated_at: string;
}

export interface AdminOverviewMetrics {
  new_leads: number;
  total_leads: number;
  in_progress_leads: number;
  converted_leads: number;
  contact_messages: number;
  published_services: number;
  contacted_leads?: number;
  closed_leads?: number;
  spam_leads?: number;
  total_services?: number;
}

export interface AdminOverviewData {
  metrics: AdminOverviewMetrics;
  recent_leads: Lead[];
  recent_audit_logs: any[];
}

export type BlogPostStatus = 'draft' | 'published' | 'archived';

export interface BlogPost {
  id: number | string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  author_name: string;
  author_avatar?: string | null;
  featured_image?: string | null;
  read_time_minutes?: number;
  status: BlogPostStatus;
  published_at?: string | null;
  meta_title?: string | null;
  meta_description?: string | null;
  tags?: string[];
  created_at?: string;
  updated_at?: string;
}

