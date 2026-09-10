import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000,
});

// Request interceptor to automatically attach JWT auth token
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('seekproof_token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for unified error formatting
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError<{ message?: string; error?: string; errors?: any[] }>) => {
    if (error.response?.status === 401) {
      // Clear token if expired/unauthorized
      localStorage.removeItem('seekproof_token');
      localStorage.removeItem('seekproof_user');
    }
    
    const errorMessage = 
      error.response?.data?.error || 
      error.response?.data?.message || 
      error.message || 
      'An unexpected network error occurred';
      
    return Promise.reject(new Error(errorMessage));
  }
);

export default apiClient;
