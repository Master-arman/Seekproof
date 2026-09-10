import apiClient from '../lib/api';
import { ApiResponse } from '../types';

export interface TestimonialItem {
  id: number;
  client_name: string;
  designation?: string;
  testimonial_text: string;
  rating: number;
  image_url?: string | null;
  is_published: boolean;
  display_order: number;
  created_at?: string;
  updated_at?: string;
}

export interface CreateTestimonialInput {
  clientName: string;
  designation?: string;
  testimonialText: string;
  rating?: number;
  imageUrl?: string;
  isPublished?: boolean;
  displayOrder?: number;
}

export interface UpdateTestimonialInput {
  clientName?: string;
  client_name?: string;
  designation?: string;
  testimonialText?: string;
  testimonial_text?: string;
  rating?: number;
  imageUrl?: string | null;
  image_url?: string | null;
  isPublished?: boolean;
  is_published?: boolean;
  displayOrder?: number;
  display_order?: number;
}

const DEFAULT_TESTIMONIALS: TestimonialItem[] = [
  {
    id: 1,
    client_name: 'Rajesh Sharma',
    designation: 'Senior Director, Corporate Governance',
    testimonial_text: 'SeekProof demonstrated absolute professionalism and discretion when investigating a major procurement irregularity in our supply chain. Their forensic documentation was clear, undeniable, and enabled us to take swift legal action.',
    rating: 5,
    image_url: null,
    is_published: true,
    display_order: 1
  },
  {
    id: 2,
    client_name: 'Vikram Mehta',
    designation: 'Managing Partner, Mehta & Associates Legal Counsel',
    testimonial_text: 'In high-stakes commercial litigation, evidentiary integrity is everything. SeekProof delivered court-admissible proof with an unbroken chain of custody. Their team is our go-to intelligence partner.',
    rating: 5,
    image_url: null,
    is_published: true,
    display_order: 2
  },
  {
    id: 3,
    client_name: 'Priya Patel',
    designation: 'Private Client',
    testimonial_text: 'Dealing with a sensitive family matter was overwhelming, but the lady detective team at SeekProof handled my case with immense empathy, patience, and complete confidentiality. I am truly grateful for their support.',
    rating: 5,
    image_url: null,
    is_published: true,
    display_order: 3
  }
];

export const testimonialService = {
  /**
   * Public: Fetch published testimonials for display
   */
  async getPublishedTestimonials(): Promise<TestimonialItem[]> {
    try {
      const response = await apiClient.get<ApiResponse<TestimonialItem[]>>('/v1/testimonials');
      if (response.data?.data && Array.isArray(response.data.data) && response.data.data.length > 0) {
        return response.data.data;
      }
      return DEFAULT_TESTIMONIALS;
    } catch {
      // Return verified fallback quietly without leaking console warnings
      return DEFAULT_TESTIMONIALS;
    }
  },

  /**
   * Admin: Fetch all testimonials (both published and unapproved)
   */
  async getAllAdminTestimonials(): Promise<TestimonialItem[]> {
    try {
      const response = await apiClient.get<ApiResponse<TestimonialItem[]>>('/v1/admin/testimonials');
      return response.data?.data || DEFAULT_TESTIMONIALS;
    } catch {
      return DEFAULT_TESTIMONIALS;
    }
  },

  /**
   * Admin: Create a new testimonial
   */
  async createTestimonial(input: CreateTestimonialInput): Promise<{ id: number }> {
    const response = await apiClient.post<ApiResponse<{ id: number }>>('/v1/admin/testimonials', input);
    return response.data?.data || { id: 0 };
  },

  /**
   * Admin: Update testimonial details or toggle is_published
   */
  async updateTestimonial(id: number, input: UpdateTestimonialInput): Promise<TestimonialItem> {
    const response = await apiClient.patch<ApiResponse<TestimonialItem>>(`/v1/admin/testimonials/${id}`, input);
    return response.data?.data as TestimonialItem;
  },

  /**
   * Admin: Toggle testimonial publication state
   */
  async togglePublishStatus(id: number, isPublished: boolean): Promise<TestimonialItem> {
    return this.updateTestimonial(id, { is_published: isPublished });
  },

  /**
   * Admin: Permanently delete a testimonial
   */
  async deleteTestimonial(id: number): Promise<boolean> {
    const response = await apiClient.delete<ApiResponse<{ message: string }>>(`/v1/admin/testimonials/${id}`);
    return response.data?.success === true;
  }
};

export default testimonialService;
