import apiClient from '../lib/api';
import { ApiResponse, AdminOverviewData } from '../types';

export const adminService = {
  /**
   * Fetch complete command center telemetry overview
   */
  async getOverview(): Promise<AdminOverviewData> {
    try {
      const res = await apiClient.get<ApiResponse<AdminOverviewData>>('/v1/admin/overview');
      if (res.data.success && res.data.data) {
        return res.data.data;
      }
      throw new Error(res.data.error || 'Failed to retrieve command center telemetry.');
    } catch (err: any) {
      const message = err.response?.data?.error || err.message || 'Telemetry connection error.';
      throw new Error(message);
    }
  },

  /**
   * Fetch immutable security audit logs
   */
  async getAuditLogs(): Promise<any[]> {
    try {
      const res = await apiClient.get<ApiResponse<any[]>>('/v1/admin/audit-logs');
      return res.data.data || [];
    } catch (err: any) {
      const message = err.response?.data?.error || err.message || 'Failed to fetch audit logs.';
      throw new Error(message);
    }
  }
};

export default adminService;
