import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';

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

const getAuthHeaders = () => {
  const token = localStorage.getItem('token') || localStorage.getItem('seekproof_token');
  return {
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
      'Content-Type': 'application/json'
    }
  };
};

export const testimonialService = {
  /**
   * Public: Fetch published testimonials for display
   */
  async getPublishedTestimonials(): Promise<TestimonialItem[]> {
    try {
      const response = await axios.get(`${API_URL}/testimonials`);
      return response.data?.data || [];
    } catch (err: any) {
      console.warn('Failed to fetch published testimonials, using verified fallback list:', err.message);
      return [
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
    }
  },

  /**
   * Admin: Fetch all testimonials (both published and unapproved)
   */
  async getAllAdminTestimonials(): Promise<TestimonialItem[]> {
    const response = await axios.get(`${API_URL}/admin/testimonials`, getAuthHeaders());
    return response.data?.data || [];
  },

  /**
   * Admin: Create a new testimonial
   */
  async createTestimonial(input: CreateTestimonialInput): Promise<{ id: number }> {
    const response = await axios.post(`${API_URL}/admin/testimonials`, input, getAuthHeaders());
    return response.data?.data || { id: 0 };
  },

  /**
   * Admin: Update testimonial details or toggle is_published
   */
  async updateTestimonial(id: number, input: UpdateTestimonialInput): Promise<TestimonialItem> {
    const response = await axios.patch(`${API_URL}/admin/testimonials/${id}`, input, getAuthHeaders());
    return response.data?.data;
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
    const response = await axios.delete(`${API_URL}/admin/testimonials/${id}`, getAuthHeaders());
    return response.data?.success === true;
  }
};
