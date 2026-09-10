import React, { useState, useEffect } from 'react';
import { 
  MessageSquareQuote, 
  Plus, 
  Search, 
  CheckCircle2, 
  EyeOff, 
  Eye, 
  Edit3, 
  Trash2, 
  Star, 
  AlertCircle,
  RefreshCw,
  X
} from 'lucide-react';
import { Badge } from '../../components/ui/badge';
import { Button, PrimaryButton } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Textarea } from '../../components/ui/textarea';
import { testimonialService, TestimonialItem } from '../../services/testimonialService';

export function AdminTestimonialsPage() {
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'published' | 'hidden'>('all');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<TestimonialItem | null>(null);
  const [modalFormData, setModalFormData] = useState({
    clientName: '',
    designation: '',
    testimonialText: '',
    rating: 5,
    isPublished: true,
    displayOrder: 1
  });
  const [modalSaving, setModalSaving] = useState(false);

  const fetchTestimonials = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await testimonialService.getAllAdminTestimonials();
      setTestimonials(data);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to fetch testimonial records.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const handleTogglePublish = async (item: TestimonialItem) => {
    const newStatus = !item.is_published;
    try {
      await testimonialService.togglePublishStatus(item.id, newStatus);
      setTestimonials(prev => prev.map(t => t.id === item.id ? { ...t, is_published: newStatus } : t));
      setSuccessMsg(`Testimonial for ${item.client_name} is now ${newStatus ? 'Approved & Published' : 'Hidden / Unpublished'}.`);
      setTimeout(() => setSuccessMsg(null), 4000);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to update publication status.');
    }
  };

  const handleDelete = async (item: TestimonialItem) => {
    if (!window.confirm(`Permanently remove testimonial by ${item.client_name}?`)) return;
    try {
      await testimonialService.deleteTestimonial(item.id);
      setTestimonials(prev => prev.filter(t => t.id !== item.id));
      setSuccessMsg(`Testimonial #${item.id} permanently deleted.`);
      setTimeout(() => setSuccessMsg(null), 4000);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to delete testimonial.');
    }
  };

  const handleOpenCreateModal = () => {
    setEditingItem(null);
    setModalFormData({
      clientName: '',
      designation: '',
      testimonialText: '',
      rating: 5,
      isPublished: true,
      displayOrder: testimonials.length + 1
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (item: TestimonialItem) => {
    setEditingItem(item);
    setModalFormData({
      clientName: item.client_name,
      designation: item.designation || '',
      testimonialText: item.testimonial_text,
      rating: item.rating || 5,
      isPublished: item.is_published,
      displayOrder: item.display_order || 1
    });
    setIsModalOpen(true);
  };

  const handleSaveModal = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!modalFormData.clientName.trim() || !modalFormData.testimonialText.trim()) {
      setError('Please provide client name and testimonial text.');
      return;
    }

    setModalSaving(true);
    setError(null);

    try {
      if (editingItem) {
        // Update
        const updated = await testimonialService.updateTestimonial(editingItem.id, {
          clientName: modalFormData.clientName,
          designation: modalFormData.designation,
          testimonialText: modalFormData.testimonialText,
          rating: modalFormData.rating,
          isPublished: modalFormData.isPublished,
          displayOrder: modalFormData.displayOrder
        });
        setTestimonials(prev => prev.map(t => t.id === editingItem.id ? { ...t, ...updated } : t));
        setSuccessMsg(`Testimonial for ${modalFormData.clientName} updated successfully.`);
      } else {
        // Create
        await testimonialService.createTestimonial({
          clientName: modalFormData.clientName,
          designation: modalFormData.designation,
          testimonialText: modalFormData.testimonialText,
          rating: modalFormData.rating,
          isPublished: modalFormData.isPublished,
          displayOrder: modalFormData.displayOrder
        });
        setSuccessMsg(`Testimonial for ${modalFormData.clientName} created successfully.`);
        await fetchTestimonials();
      }
      setIsModalOpen(false);
      setTimeout(() => setSuccessMsg(null), 4000);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to save testimonial record.');
    } finally {
      setModalSaving(false);
    }
  };

  const filteredTestimonials = testimonials.filter(t => {
    const matchesStatus = filterStatus === 'all' 
      ? true 
      : filterStatus === 'published' 
      ? t.is_published 
      : !t.is_published;

    const query = searchQuery.toLowerCase().trim();
    const matchesSearch = !query || 
      t.client_name.toLowerCase().includes(query) ||
      (t.designation && t.designation.toLowerCase().includes(query)) ||
      t.testimonial_text.toLowerCase().includes(query);

    return matchesStatus && matchesSearch;
  });

  const publishedCount = testimonials.filter(t => t.is_published).length;
  const hiddenCount = testimonials.filter(t => !t.is_published).length;

  return (
    <div className="space-y-6 max-w-7xl mx-auto text-slate-900">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-[#0F1E2E] font-mono tracking-tight">
              Testimonials & Endorsements Management
            </h1>
            <Badge variant="navy" className="text-[10px]">
              CONFIDENTIAL VAULT
            </Badge>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Review, approve, hide, or author verified client endorsements prior to public display.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={fetchTestimonials}
            className="text-xs border-slate-300 text-slate-700 hover:bg-slate-100"
          >
            <RefreshCw className={`h-3.5 w-3.5 mr-1.5 ${loading ? 'animate-spin' : ''}`} aria-hidden="true" strokeWidth={2} /> Refresh
          </Button>
          <PrimaryButton
            size="sm"
            onClick={handleOpenCreateModal}
            className="font-mono text-xs"
          >
            <Plus className="h-4 w-4 mr-1" aria-hidden="true" strokeWidth={2} /> Add Testimonial
          </PrimaryButton>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-md bg-white border border-slate-200">
          <div className="text-[11px] font-mono uppercase text-slate-500">Total Testimonials</div>
          <div className="text-2xl font-bold text-[#0F1E2E] font-mono mt-1">{testimonials.length}</div>
        </div>
        <div className="p-4 rounded-md bg-white border border-slate-200">
          <div className="text-[11px] font-mono uppercase text-emerald-700">Published / Approved</div>
          <div className="text-2xl font-bold text-emerald-700 font-mono mt-1">{publishedCount}</div>
        </div>
        <div className="p-4 rounded-md bg-white border border-slate-200">
          <div className="text-[11px] font-mono uppercase text-amber-700">Hidden / Under Review</div>
          <div className="text-2xl font-bold text-amber-700 font-mono mt-1">{hiddenCount}</div>
        </div>
      </div>

      {/* Notification Banners */}
      {error && (
        <div className="p-3.5 rounded-sm bg-red-50 border border-red-200 text-red-800 text-xs flex items-center gap-2">
          <AlertCircle className="h-4 w-4 shrink-0" aria-hidden="true" strokeWidth={2} />
          <span>{error}</span>
        </div>
      )}
      {successMsg && (
        <div className="p-3.5 rounded-sm bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 shrink-0" aria-hidden="true" strokeWidth={2} />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Filters Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-md bg-white border border-slate-200">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" aria-hidden="true" strokeWidth={2} />
          <Input
            type="text"
            placeholder="Search by client or keywords..."
            aria-label="Search testimonials"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 pr-3 py-1.5 text-xs bg-white border-slate-300 text-slate-900 placeholder:text-slate-400 rounded-sm"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            type="button"
            onClick={() => setFilterStatus('all')}
            className={`px-3 py-1.5 rounded-sm text-xs font-mono transition-colors cursor-pointer ${
              filterStatus === 'all'
                ? 'bg-[#0F1E2E] text-white font-bold'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-300'
            }`}
          >
            All ({testimonials.length})
          </button>
          <button
            type="button"
            onClick={() => setFilterStatus('published')}
            className={`px-3 py-1.5 rounded-sm text-xs font-mono transition-colors cursor-pointer ${
              filterStatus === 'published'
                ? 'bg-[#0F1E2E] text-white font-bold'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-300'
            }`}
          >
            Published ({publishedCount})
          </button>
          <button
            type="button"
            onClick={() => setFilterStatus('hidden')}
            className={`px-3 py-1.5 rounded-sm text-xs font-mono transition-colors cursor-pointer ${
              filterStatus === 'hidden'
                ? 'bg-[#0F1E2E] text-white font-bold'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-300'
            }`}
          >
            Hidden ({hiddenCount})
          </button>
        </div>
      </div>

      {/* Testimonials Table */}
      <div className="rounded-md border border-slate-200 bg-white overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-slate-500 font-mono text-xs">
            <RefreshCw className="h-6 w-6 animate-spin mx-auto text-[#0F1E2E] mb-2" aria-hidden="true" strokeWidth={2} />
            Loading testimonial repository...
          </div>
        ) : filteredTestimonials.length === 0 ? (
          <div className="p-12 text-center text-slate-500 font-mono text-xs">
            No testimonials match the selected filters.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-slate-200 bg-slate-50 text-slate-500 font-mono uppercase text-[10px]">
                <tr>
                  <th className="py-3 px-4">Client Name & Designation</th>
                  <th className="py-3 px-4">Testimonial Content</th>
                  <th className="py-3 px-4">Rating</th>
                  <th className="py-3 px-4">Approval / Status</th>
                  <th className="py-3 px-4 text-right">Admin Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredTestimonials.map((t) => (
                  <tr key={t.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-4 px-4 align-top w-56">
                      <div className="font-bold text-[#0F1E2E] text-sm">{t.client_name}</div>
                      <div className="text-[11px] text-[#997B24] font-semibold mt-0.5">{t.designation || 'Verified Client'}</div>
                      <div className="text-[10px] text-slate-500 font-mono mt-1">
                        Order #{t.display_order} • ID #{t.id}
                      </div>
                    </td>

                    <td className="py-4 px-4 align-top max-w-md">
                      <p className="text-slate-700 leading-relaxed italic text-xs">
                        "{t.testimonial_text}"
                      </p>
                    </td>

                    <td className="py-4 px-4 align-top whitespace-nowrap">
                      <div className="flex items-center gap-0.5 text-[#D4AF37]">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            aria-hidden="true"
                            strokeWidth={2}
                            className={`h-3.5 w-3.5 ${
                              i < (t.rating || 5) ? 'fill-[#D4AF37]' : 'text-slate-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-[10px] text-slate-500 font-mono mt-1 block">
                        {t.rating || 5} / 5 Stars
                      </span>
                    </td>

                    <td className="py-4 px-4 align-top whitespace-nowrap">
                      {t.is_published ? (
                        <Badge variant="success" className="text-[10px] flex items-center gap-1 w-fit">
                          <Eye className="h-3 w-3" aria-hidden="true" strokeWidth={2} />
                          <span>Approved & Public</span>
                        </Badge>
                      ) : (
                        <Badge variant="subtle" className="text-[10px] flex items-center gap-1 w-fit">
                          <EyeOff className="h-3 w-3" aria-hidden="true" strokeWidth={2} />
                          <span>Hidden / Under Review</span>
                        </Badge>
                      )}
                    </td>

                    <td className="py-4 px-4 align-top text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-2">
                        {/* Approval Toggle Button */}
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleTogglePublish(t)}
                          title={t.is_published ? 'Hide / Unpublish' : 'Approve & Publish'}
                          aria-label={t.is_published ? `Hide testimonial for ${t.client_name}` : `Approve testimonial for ${t.client_name}`}
                          className={`text-xs px-2.5 py-1 h-8 ${
                            t.is_published
                              ? 'border-amber-300 text-amber-800 hover:bg-amber-50'
                              : 'border-emerald-300 text-emerald-800 hover:bg-emerald-50'
                          }`}
                        >
                          {t.is_published ? (
                            <>
                              <EyeOff className="h-3.5 w-3.5 mr-1" aria-hidden="true" strokeWidth={2} /> Hide
                            </>
                          ) : (
                            <>
                              <Eye className="h-3.5 w-3.5 mr-1" aria-hidden="true" strokeWidth={2} /> Approve
                            </>
                          )}
                        </Button>

                        {/* Edit Button */}
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleOpenEditModal(t)}
                          title="Edit Endorsement"
                          aria-label={`Edit testimonial for ${t.client_name}`}
                          className="h-8 w-8 p-0 text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                        >
                          <Edit3 className="h-3.5 w-3.5" aria-hidden="true" strokeWidth={2} />
                        </Button>

                        {/* Delete Button */}
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleDelete(t)}
                          title="Delete Record"
                          aria-label={`Delete testimonial for ${t.client_name}`}
                          className="h-8 w-8 p-0 text-red-600 hover:text-red-800 hover:bg-red-50"
                        >
                          <Trash2 className="h-3.5 w-3.5" aria-hidden="true" strokeWidth={2} />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Create / Edit Testimonial Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white border border-slate-200 rounded-md max-w-xl w-full p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <div className="flex items-center gap-2">
                <MessageSquareQuote className="h-5 w-5 text-[#997B24]" aria-hidden="true" strokeWidth={2} />
                <h3 className="text-lg font-bold text-[#0F1E2E] font-mono">
                  {editingItem ? 'Edit Client Endorsement' : 'Author Client Endorsement'}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                aria-label="Close modal"
                className="text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <X className="h-5 w-5" aria-hidden="true" strokeWidth={2} />
              </button>
            </div>

            <form onSubmit={handleSaveModal} className="space-y-4">
              <div>
                <label className="block text-xs font-mono uppercase text-slate-600 mb-1">
                  Client / Author Name *
                </label>
                <Input
                  type="text"
                  placeholder="e.g. Rajesh Sharma, Vikram Mehta, Priya Patel"
                  value={modalFormData.clientName}
                  onChange={(e) => setModalFormData({ ...modalFormData, clientName: e.target.value })}
                  required
                  className="bg-white border-slate-300 text-slate-900 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-slate-600 mb-1">
                  Designation / Practice Area
                </label>
                <Input
                  type="text"
                  placeholder="e.g. Senior Director, Corporate Governance / Legal Counsel"
                  value={modalFormData.designation}
                  onChange={(e) => setModalFormData({ ...modalFormData, designation: e.target.value })}
                  className="bg-white border-slate-300 text-slate-900 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-slate-600 mb-1">
                  Endorsement / Review Text *
                </label>
                <Textarea
                  placeholder="Enter the verifiable testimonial text (avoid exaggerated or guaranteed outcome claims)..."
                  value={modalFormData.testimonialText}
                  onChange={(e) => setModalFormData({ ...modalFormData, testimonialText: e.target.value })}
                  required
                  rows={4}
                  className="bg-white border-slate-300 text-slate-900 text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-slate-600 mb-1">
                    Rating (1 to 5 Stars)
                  </label>
                  <select
                    value={modalFormData.rating}
                    onChange={(e) => setModalFormData({ ...modalFormData, rating: parseInt(e.target.value, 10) })}
                    className="w-full bg-white border border-slate-300 rounded-sm px-3 py-2 text-slate-900 text-sm"
                  >
                    <option value={5}>⭐⭐⭐⭐⭐ (5 Stars)</option>
                    <option value={4}>⭐⭐⭐⭐ (4 Stars)</option>
                    <option value={3}>⭐⭐⭐ (3 Stars)</option>
                    <option value={2}>⭐⭐ (2 Stars)</option>
                    <option value={1}>⭐ (1 Star)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-slate-600 mb-1">
                    Display Priority Order
                  </label>
                  <Input
                    type="number"
                    min="1"
                    value={modalFormData.displayOrder}
                    onChange={(e) => setModalFormData({ ...modalFormData, displayOrder: parseInt(e.target.value, 10) || 1 })}
                    className="bg-white border-slate-300 text-slate-900 text-sm"
                  />
                </div>
              </div>

              <div className="pt-2">
                <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-700">
                  <input
                    type="checkbox"
                    checked={modalFormData.isPublished}
                    onChange={(e) => setModalFormData({ ...modalFormData, isPublished: e.target.checked })}
                    className="rounded-sm bg-white border-slate-300 text-[#0F1E2E] focus:ring-[#0F1E2E]"
                  />
                  <span>Approve for Public Display Immediately</span>
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setIsModalOpen(false)}
                  className="border-slate-300 text-slate-600 hover:text-slate-900"
                >
                  Cancel
                </Button>
                <PrimaryButton
                  type="submit"
                  size="sm"
                  disabled={modalSaving}
                  className="font-mono text-xs"
                >
                  {modalSaving ? 'Saving...' : editingItem ? 'Update Endorsement' : 'Save Endorsement'}
                </PrimaryButton>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminTestimonialsPage;
