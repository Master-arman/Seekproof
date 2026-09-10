import apiClient from '../lib/api';
import { Case, ApiResponse } from '../types';

export interface CreateCaseDto {
  title: string;
  description: string;
  case_type: string;
  priority?: 'standard' | 'high' | 'urgent' | 'critical';
  confidentiality_level?: 'confidential' | 'secret' | 'top_secret';
  target_subject?: string;
  location?: string;
}

export const caseService = {
  async getCases(): Promise<Case[]> {
    const res = await apiClient.get<ApiResponse<{ cases: Case[] }>>('/cases');
    return res.data.data?.cases || [];
  },

  async getCaseById(id: string): Promise<Case> {
    const res = await apiClient.get<ApiResponse<{ case: Case }>>(`/cases/${id}`);
    if (res.data.data?.case) {
      return res.data.data.case;
    }
    throw new Error(res.data.error || 'Case not found');
  },

  async createCase(data: CreateCaseDto): Promise<Case> {
    const res = await apiClient.post<ApiResponse<{ case: Case }>>('/cases', data);
    if (res.data.data?.case) {
      return res.data.data.case;
    }
    throw new Error(res.data.error || 'Failed to create case');
  },

  async updateStatus(id: string, status: string, progress_percentage?: number): Promise<Case> {
    const res = await apiClient.patch<ApiResponse<{ case: Case }>>(`/cases/${id}/status`, {
      status,
      progress_percentage,
    });
    if (res.data.data?.case) {
      return res.data.data.case;
    }
    throw new Error(res.data.error || 'Failed to update case status');
  }
};
