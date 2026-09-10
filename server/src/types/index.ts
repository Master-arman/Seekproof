import { Request } from 'express';

export type AdminRole = 'super_admin' | 'manager' | 'staff' | 'admin';
export type UserRole = AdminRole | 'client' | 'investigator';

export interface User {
  id: string;
  email: string;
  password?: string;
  name: string;
  phone?: string;
  role: UserRole;
  is_active?: boolean;
  last_login_at?: Date | null;
  agency_tier?: 'standard' | 'priority' | 'vip_corporate';
  created_at?: Date;
  updated_at?: Date;
}

export interface AuditLog {
  id: string | number;
  event?: 'login_success' | 'login_failure' | 'logout' | 'unauthorized_access' | 'data_mutation' | string;
  action?: string;
  entity_type?: string;
  entity_id?: string | number | null;
  admin_id?: number | string | null;
  user_id?: string | null;
  email?: string;
  ip_address?: string | null;
  user_agent?: string | null;
  status?: 'success' | 'failure' | string;
  metadata?: Record<string, any>;
  created_at: Date;
}

export type CaseStatus = 'inquiry' | 'under_review' | 'active_investigation' | 'evidence_gathering' | 'reporting' | 'closed';
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
  created_at?: Date;
  updated_at?: Date;
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
  created_at?: Date;
}

export interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    email: string;
    role: UserRole;
    name: string;
  };
}

export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
  errors?: any[];
  meta?: Record<string, any>;
}

// ============================================================================
// Phase 4: Database Models & Schemas
// ============================================================================

export interface Admin {
  id: number;
  name: string;
  email: string;
  password_hash?: string;
  role: string;
  is_active: boolean;
  last_login_at?: Date | null;
  created_at: Date;
  updated_at: Date;
}

export interface Service {
  id: number;
  title: string;
  slug: string;
  category?: string;
  short_description: string;
  full_description: string;
  icon_name?: string | null;
  featured_image?: string | null;
  is_featured: boolean;
  is_active: boolean;
  display_order: number;
  meta_title?: string | null;
  meta_description?: string | null;
  created_at: Date;
  updated_at: Date;
}

export type LeadStatus = 'New' | 'Contacted' | 'In Progress' | 'Converted' | 'Closed' | 'Spam' | string;

export interface LeadNote {
  id: number;
  lead_id: number;
  admin_id?: number | null;
  admin_name: string;
  note: string;
  created_at: Date;
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
  created_at: Date;
  updated_at: Date;
}

export interface Testimonial {
  id: number;
  client_name: string;
  designation: string;
  testimonial_text: string;
  rating: number;
  image_url?: string | null;
  is_published: boolean;
  display_order: number;
  created_at: Date;
  updated_at: Date;
}

export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  category?: string | null;
  excerpt: string;
  content: string;
  featured_image?: string | null;
  author_id?: number | null;
  author_name?: string | null;
  read_time?: string | null;
  status: 'draft' | 'published' | 'archived';
  meta_title?: string | null;
  meta_description?: string | null;
  published_at?: Date | null;
  created_at: Date;
  updated_at: Date;
}

export interface ContactMessage {
  id: number;
  name: string;
  email: string;
  phone?: string | null;
  subject: string;
  message: string;
  status: 'unread' | 'read' | 'replied' | 'archived';
  created_at: Date;
}

export interface SiteSetting {
  id: number;
  setting_key: string;
  setting_value?: string | null;
  created_at: Date;
  updated_at: Date;
}

