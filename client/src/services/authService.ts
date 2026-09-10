import apiClient from '../lib/api';
import { User, ApiResponse } from '../types';

export interface RegisterDto {
  name: string;
  email: string;
  password: string;
  phone?: string;
  role?: 'client' | 'investigator';
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface AuthResponseData {
  user: User;
  token: string;
}

export const authService = {
  async register(data: RegisterDto): Promise<AuthResponseData> {
    const res = await apiClient.post<ApiResponse<AuthResponseData>>('/auth/register', data);
    if (res.data.data) {
      localStorage.setItem('seekproof_token', res.data.data.token);
      localStorage.setItem('seekproof_user', JSON.stringify(res.data.data.user));
      return res.data.data;
    }
    throw new Error(res.data.error || 'Registration failed');
  },

  async login(data: LoginDto): Promise<AuthResponseData> {
    const res = await apiClient.post<ApiResponse<AuthResponseData>>('/auth/login', data);
    if (res.data.data) {
      localStorage.setItem('seekproof_token', res.data.data.token);
      localStorage.setItem('seekproof_user', JSON.stringify(res.data.data.user));
      return res.data.data;
    }
    throw new Error(res.data.error || 'Login failed');
  },

  async getCurrentUser(): Promise<User> {
    const res = await apiClient.get<ApiResponse<{ user: User }>>('/auth/me');
    if (res.data.data?.user) {
      localStorage.setItem('seekproof_user', JSON.stringify(res.data.data.user));
      return res.data.data.user;
    }
    throw new Error(res.data.error || 'Failed to get current user');
  },

  logout(): void {
    localStorage.removeItem('seekproof_token');
    localStorage.removeItem('seekproof_user');
  },

  getStoredUser(): User | null {
    const userStr = localStorage.getItem('seekproof_user');
    if (!userStr) return null;
    try {
      return JSON.parse(userStr);
    } catch {
      return null;
    }
  },

  isAuthenticated(): boolean {
    return !!localStorage.getItem('seekproof_token');
  }
};
