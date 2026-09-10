import apiClient from '../lib/api';
import { ApiResponse, Lead, LeadNote, StaffMember, LeadStatus } from '../types';

export type { Lead, LeadNote, StaffMember, LeadStatus };

export interface CreateLeadPayload {
  fullName: string;
  phone: string;
  email: string;
  city?: string;
  serviceId?: number;
  serviceType?: string;
  preferredDate?: string;
  preferredContactMethod: 'phone' | 'email' | 'whatsapp' | 'encrypted_portal';
  message: string;
  consentGiven: boolean;
  source?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
}

export interface CreateContactPayload {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  consent?: boolean;
}

export interface LeadFilters {
  search?: string;
  status?: string;
  serviceId?: number;
  startDate?: string;
  endDate?: string;
}

export const leadService = {
  /**
   * Public: Submit lead / consultation request to /api/v1/leads
   */
  async submitLead(payload: CreateLeadPayload): Promise<{ leadId?: number; message: string }> {
    try {
      const res = await apiClient.post<ApiResponse<{ leadId: number }>>('/v1/leads', payload);
      if (res.data.success) {
        return {
          leadId: res.data.data?.leadId,
          message: res.data.message || 'Consultation request received securely under full NDA protection.'
        };
      }
      throw new Error(res.data.error || 'Failed to submit consultation request.');
    } catch (err: any) {
      const message = err.response?.data?.error || err.message || 'Secure transmission error. Please try again.';
      throw new Error(message);
    }
  },

  /**
   * Admin: List all leads (/api/v1/leads) with optional filters
   */
  async getAllLeads(filters?: LeadFilters): Promise<Lead[]> {
    try {
      const params = new URLSearchParams();
      if (filters?.search) params.append('search', filters.search);
      if (filters?.status && filters.status !== 'all') params.append('status', filters.status);
      if (filters?.serviceId) params.append('serviceId', String(filters.serviceId));
      if (filters?.startDate) params.append('startDate', filters.startDate);
      if (filters?.endDate) params.append('endDate', filters.endDate);

      const queryStr = params.toString();
      const url = queryStr ? `/v1/leads?${queryStr}` : '/v1/leads';

      const res = await apiClient.get<ApiResponse<Lead[]>>(url);
      return res.data.data || [];
    } catch (err: any) {
      const message = err.response?.data?.error || err.message || 'Failed to fetch leads.';
      throw new Error(message);
    }
  },

  /**
   * Admin: Get single lead by ID (/api/v1/leads/:id)
   */
  async getLeadById(id: number): Promise<Lead> {
    try {
      const res = await apiClient.get<ApiResponse<Lead>>(`/v1/leads/${id}`);
      if (res.data.success && res.data.data) {
        return res.data.data;
      }
      throw new Error(res.data.error || `Lead #${id} not found.`);
    } catch (err: any) {
      const message = err.response?.data?.error || err.message || `Failed to fetch lead #${id}.`;
      throw new Error(message);
    }
  },

  /**
   * Admin: Update lead status (/api/v1/leads/:id/status)
   */
  async updateLeadStatus(id: number, status: LeadStatus): Promise<boolean> {
    try {
      const res = await apiClient.patch<ApiResponse<{ id: number; status: string }>>(`/v1/leads/${id}/status`, { status });
      return res.data.success;
    } catch (err: any) {
      const message = err.response?.data?.error || err.message || `Failed to update lead #${id} status.`;
      throw new Error(message);
    }
  },

  /**
   * Admin: Assign lead to staff member (/api/v1/leads/:id/assign)
   */
  async assignLead(id: number, assignedTo: number | null): Promise<Lead> {
    try {
      const res = await apiClient.patch<ApiResponse<Lead>>(`/v1/leads/${id}/assign`, { assignedTo });
      if (res.data.success && res.data.data) {
        return res.data.data;
      }
      throw new Error(res.data.error || 'Failed to update lead assignment.');
    } catch (err: any) {
      const message = err.response?.data?.error || err.message || `Failed to assign lead #${id}.`;
      throw new Error(message);
    }
  },

  /**
   * Admin: Add internal note (/api/v1/leads/:id/notes)
   */
  async addLeadNote(id: number, note: string): Promise<LeadNote> {
    try {
      const res = await apiClient.post<ApiResponse<LeadNote>>(`/v1/leads/${id}/notes`, { note });
      if (res.data.success && res.data.data) {
        return res.data.data;
      }
      throw new Error(res.data.error || 'Failed to add internal note.');
    } catch (err: any) {
      const message = err.response?.data?.error || err.message || 'Failed to record internal note.';
      throw new Error(message);
    }
  },

  /**
   * Admin: Get list of active staff members for assignment (/api/v1/admin/staff)
   */
  async getStaffList(): Promise<StaffMember[]> {
    try {
      const res = await apiClient.get<ApiResponse<StaffMember[]>>('/v1/admin/staff');
      return res.data.data || [];
    } catch (err: any) {
      const message = err.response?.data?.error || err.message || 'Failed to fetch staff list.';
      throw new Error(message);
    }
  },

  /**
   * Admin: Export leads CSV directly
   */
  async exportLeadsCsv(filters?: LeadFilters): Promise<Blob> {
    try {
      const params = new URLSearchParams();
      params.append('format', 'csv');
      if (filters?.search) params.append('search', filters.search);
      if (filters?.status && filters.status !== 'all') params.append('status', filters.status);
      if (filters?.serviceId) params.append('serviceId', String(filters.serviceId));
      if (filters?.startDate) params.append('startDate', filters.startDate);
      if (filters?.endDate) params.append('endDate', filters.endDate);

      const res = await apiClient.get(`/v1/leads/export?${params.toString()}`, {
        responseType: 'blob'
      });
      return res.data;
    } catch (err: any) {
      const message = err.response?.data?.error || err.message || 'Failed to export leads.';
      throw new Error(message);
    }
  },

  /**
   * Admin: Delete lead record (/api/v1/leads/:id)
   */
  async deleteLead(id: number): Promise<boolean> {
    try {
      const res = await apiClient.delete<ApiResponse<null>>(`/v1/leads/${id}`);
      return res.data.success;
    } catch (err: any) {
      const message = err.response?.data?.error || err.message || `Failed to delete lead #${id}.`;
      throw new Error(message);
    }
  },

  /**
   * Public: Submit general contact inquiry to /api/v1/contact
   */
  async submitContactMessage(payload: CreateContactPayload): Promise<{ messageId?: number; message: string }> {
    try {
      const res = await apiClient.post<ApiResponse<{ messageId: number }>>('/v1/contact', payload);
      if (res.data.success) {
        return {
          messageId: res.data.data?.messageId,
          message: res.data.message || 'Inquiry received securely. A case officer will respond via encrypted channel.'
        };
      }
      throw new Error(res.data.error || 'Failed to submit contact message.');
    } catch (err: any) {
      const message = err.response?.data?.error || err.message || 'Secure transmission error. Please try again.';
      throw new Error(message);
    }
  }
};

export default leadService;

