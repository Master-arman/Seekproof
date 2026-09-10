import apiClient from '../lib/api';
import { Inquiry, ApiResponse } from '../types';

export interface CreateInquiryDto {
  name: string;
  email: string;
  phone: string;
  case_type: string;
  service_requested: string;
  description: string;
  urgency?: 'routine' | 'time_sensitive' | 'immediate_threat';
}

export const inquiryService = {
  async submitInquiry(data: CreateInquiryDto): Promise<{ message: string; inquiry: Inquiry }> {
    const res = await apiClient.post<ApiResponse<{ inquiry: Inquiry }>>('/inquiries', data);
    return {
      message: res.data.message || 'Inquiry received',
      inquiry: res.data.data!.inquiry,
    };
  },

  async getAllInquiries(): Promise<Inquiry[]> {
    const res = await apiClient.get<ApiResponse<{ inquiries: Inquiry[] }>>('/inquiries');
    return res.data.data?.inquiries || [];
  },

  async updateStatus(id: string, status: string): Promise<Inquiry> {
    const res = await apiClient.patch<ApiResponse<{ inquiry: Inquiry }>>(`/inquiries/${id}/status`, { status });
    return res.data.data!.inquiry;
  }
};
