import apiClient from '../lib/api';
import { BlogPost, ApiResponse } from '../types';
import { blogPosts as fallbackBlogPosts } from '../lib/data/blogData';

const DEFAULT_BLOG_POSTS: BlogPost[] = fallbackBlogPosts.map((p, index) => ({
  id: index + 1,
  title: p.title,
  slug: p.slug,
  excerpt: p.excerpt,
  content: Array.isArray(p.content) ? p.content.join('\n\n') : String(p.content),
  category: p.category,
  author_name: p.author.name,
  read_time_minutes: parseInt(p.readTime) || 5,
  status: 'published',
  published_at: p.publishedAt,
  meta_title: p.title,
  meta_description: p.excerpt
}));

export const blogService = {
  /**
   * Fetch all published blog posts for public view
   */
  async getPublishedPosts(params?: { category?: string; page?: number; limit?: number }): Promise<BlogPost[]> {
    try {
      const res = await apiClient.get<ApiResponse<BlogPost[]>>('/v1/blog', { params });
      if (res.data.success && Array.isArray(res.data.data) && res.data.data.length > 0) {
        return res.data.data;
      }
      return DEFAULT_BLOG_POSTS;
    } catch {
      return DEFAULT_BLOG_POSTS;
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
      const fallback = DEFAULT_BLOG_POSTS.find(p => p.slug === slug);
      if (fallback) return fallback;
      throw new Error(`Intelligence dispatch '${slug}' not found.`);
    } catch {
      const fallback = DEFAULT_BLOG_POSTS.find(p => p.slug === slug);
      if (fallback) return fallback;
      return DEFAULT_BLOG_POSTS[0];
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
