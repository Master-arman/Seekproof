import apiClient from '../lib/api';
import { BlogPost, ApiResponse } from '../types';

export const blogService = {
  /**
   * Fetch all published blog posts for public view
   */
  async getPublishedPosts(params?: { category?: string; page?: number; limit?: number }): Promise<BlogPost[]> {
    try {
      const res = await apiClient.get<ApiResponse<BlogPost[]>>('/v1/blog', { params });
      if (res.data.success && Array.isArray(res.data.data)) {
        return res.data.data;
      }
      throw new Error(res.data.error || 'Failed to retrieve published intelligence briefs.');
    } catch (err: any) {
      const message = err.response?.data?.error || err.message || 'Unable to connect to intelligence dispatch feed.';
      throw new Error(message);
    }
  },

  /**
   * Fetch single blog post by slug
   */
  async getPostBySlug(slug: string): Promise<BlogPost> {
    try {
      const res = await apiClient.get<ApiResponse<BlogPost>>(`/v1/blog/${slug}`);
      if (res.data.success && res.data.data) {
        return res.data.data;
      }
      throw new Error(res.data.error || `Intelligence dispatch '${slug}' not found.`);
    } catch (err: any) {
      const message = err.response?.data?.error || err.message || `Unable to retrieve dispatch '${slug}'.`;
      throw new Error(message);
    }
  },

  /**
   * Admin: Fetch all blog posts (published, drafts, archived)
   */
  async getAdminPosts(params?: { status?: string; search?: string }): Promise<BlogPost[]> {
    const res = await apiClient.get<ApiResponse<BlogPost[]>>('/v1/admin/blog', { params });
    if (res.data.success && Array.isArray(res.data.data)) {
      return res.data.data;
    }
    throw new Error(res.data.error || 'Failed to retrieve administrative blog posts.');
  },

  /**
   * Admin: Create a new blog post
   */
  async createPost(data: Partial<BlogPost>): Promise<BlogPost> {
    const res = await apiClient.post<ApiResponse<BlogPost>>('/v1/admin/blog', data);
    if (res.data.success && res.data.data) {
      return res.data.data;
    }
    throw new Error(res.data.error || 'Failed to create blog post.');
  },

  /**
   * Admin: Update blog post by ID
   */
  async updatePost(id: number | string, data: Partial<BlogPost>): Promise<BlogPost> {
    const res = await apiClient.put<ApiResponse<BlogPost>>(`/v1/admin/blog/${id}`, data);
    if (res.data.success && res.data.data) {
      return res.data.data;
    }
    throw new Error(res.data.error || 'Failed to update blog post.');
  },

  /**
   * Admin: Delete blog post by ID
   */
  async deletePost(id: number | string): Promise<void> {
    const res = await apiClient.delete<ApiResponse<{ message: string }>>(`/v1/admin/blog/${id}`);
    if (!res.data.success) {
      throw new Error(res.data.error || 'Failed to delete blog post.');
    }
  }
};

export default blogService;
