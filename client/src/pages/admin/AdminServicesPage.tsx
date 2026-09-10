import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Plus, Edit2, Trash2, ExternalLink, Search, 
  ArrowUp, ArrowDown, Eye, CheckCircle2, 
  XCircle, AlertTriangle, RefreshCw, X 
} from 'lucide-react';
import { Badge } from '../../components/ui/badge';
import { Button, PrimaryButton } from '../../components/ui/button';
import { Service } from '../../types';
import serviceService from '../../services/serviceService';
import { getServiceIcon } from '../../lib/iconMap';

export function AdminServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all');

  // Preview Modal
  const [previewService, setPreviewService] = useState<Service | null>(null);

  // Delete Confirmation Modal
  const [serviceToDelete, setServiceToDelete] = useState<Service | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  // Notification Banner
  const [toastMessage, setToastMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const fetchServices = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await serviceService.getAdminServices();
      setServices(data.sort((a, b) => ((a.display_order ?? 0) - (b.display_order ?? 0))));
    } catch (err: any) {
      setError(err.message || 'Unable to load services catalog.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const showToast = (type: 'success' | 'error', text: string) => {
    setToastMessage({ type, text });
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleToggleActive = async (service: Service) => {
    const updatedStatus = !service.is_active;
    try {
      await serviceService.toggleActive(Number(service.id), updatedStatus);
      setServices(prev =>
        prev.map(s => s.id === service.id ? { ...s, is_active: updatedStatus } : s)
      );
      showToast('success', `Service "${service.title}" ${updatedStatus ? 'activated' : 'deactivated'}.`);
    } catch (err: any) {
      showToast('error', err.message || 'Failed to update service status.');
    }
  };

  const handleMoveOrder = async (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= services.length) return;

    const newServices = [...services];
    const temp = newServices[index];
    newServices[index] = newServices[targetIndex];
    newServices[targetIndex] = temp;

    // Update display_order values
    const orderUpdates = newServices.map((s, idx) => ({
      id: Number(s.id),
      display_order: idx + 1
    }));

    setServices(newServices.map((s, idx) => ({ ...s, display_order: idx + 1 })));

    try {
      await serviceService.reorderServices(orderUpdates);
      showToast('success', 'Service display order updated successfully.');
    } catch (err: any) {
      showToast('error', 'Failed to persist new display order.');
      fetchServices();
    }
  };

  const confirmDelete = async () => {
    if (!serviceToDelete) return;
    setDeleteLoading(true);
    try {
      await serviceService.deleteService(Number(serviceToDelete.id));
      setServices(prev => prev.filter(s => s.id !== serviceToDelete.id));
      showToast('success', `Service "${serviceToDelete.title}" permanently deleted.`);
      setServiceToDelete(null);
    } catch (err: any) {
      showToast('error', err.message || 'Failed to delete service.');
    } finally {
      setDeleteLoading(false);
    }
  };

  // Filtered list
  const filteredServices = services.filter(s => {
    const matchesSearch = 
      s.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.short_description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.slug.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = categoryFilter === 'All' || s.category === categoryFilter;

    const matchesStatus = 
      statusFilter === 'all' ? true :
      statusFilter === 'active' ? s.is_active :
      !s.is_active;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  const categories = ['All', ...Array.from(new Set(services.map(s => s.category).filter(Boolean)))];

  return (
    <div className="space-y-6 max-w-7xl mx-auto text-slate-900 pb-12">
      {/* Toast Notification */}
      {toastMessage && (
        <div 
          className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-lg shadow-xl border text-sm font-medium transition-all ${
            toastMessage.type === 'success' 
              ? 'bg-[#0F1E2E] text-white border-[#C5A059]' 
              : 'bg-red-900 text-white border-red-500'
          }`}
          role="alert"
        >
          {toastMessage.type === 'success' ? (
            <CheckCircle2 className="h-4 w-4 text-[#C5A059]" />
          ) : (
            <XCircle className="h-4 w-4 text-red-400" />
          )}
          <span>{toastMessage.text}</span>
          <button 
            onClick={() => setToastMessage(null)}
            className="ml-2 text-slate-400 hover:text-white"
            aria-label="Close notification"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#0F1E2E] font-mono tracking-tight flex items-center gap-2">
            Investigation Services Management
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Configure catalog offerings, active status, Lucide iconography, SEO metadata, and display hierarchy.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={fetchServices} 
            disabled={loading}
            className="text-xs border-slate-300 text-slate-700"
          >
            <RefreshCw className={`h-3.5 w-3.5 mr-1.5 ${loading ? 'animate-spin' : ''}`} /> Refresh
          </Button>
          <Link to="/admin/services/new">
            <PrimaryButton size="sm" className="font-mono text-xs shadow-sm">
              <Plus className="h-4 w-4 mr-1" aria-hidden="true" strokeWidth={2} /> Add New Service
            </PrimaryButton>
          </Link>
        </div>
      </div>

      {/* Filter and Search Controls */}
      <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm flex flex-col md:flex-row gap-3 items-center justify-between">
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by title, keyword, or slug..."
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-md text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-[#0F1E2E]"
          />
          {searchTerm && (
            <button 
              onClick={() => setSearchTerm('')} 
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              aria-label="Clear search"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-slate-500 font-medium">Category:</span>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="text-xs bg-slate-50 border border-slate-200 rounded-md px-2.5 py-1.5 text-slate-700 focus:outline-none focus:ring-1 focus:ring-[#0F1E2E]"
            >
              {categories.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-xs text-slate-500 font-medium">Status:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="text-xs bg-slate-50 border border-slate-200 rounded-md px-2.5 py-1.5 text-slate-700 focus:outline-none focus:ring-1 focus:ring-[#0F1E2E]"
            >
              <option value="all">All Statuses</option>
              <option value="active">Active Only</option>
              <option value="inactive">Inactive Only</option>
            </select>
          </div>
        </div>
      </div>

      {/* Services Table */}
      <div className="rounded-lg border border-slate-200 bg-white shadow-sm overflow-hidden">
        {loading ? (
          <div className="py-20 text-center text-slate-500">
            <RefreshCw className="h-8 w-8 mx-auto animate-spin text-[#C5A059] mb-3" />
            <p className="text-xs font-mono uppercase tracking-wider">Loading investigation services...</p>
          </div>
        ) : error ? (
          <div className="p-8 text-center text-red-600">
            <AlertTriangle className="h-8 w-8 mx-auto mb-2 text-red-500" />
            <p className="font-semibold text-sm">{error}</p>
            <Button size="sm" onClick={fetchServices} className="mt-4 text-xs">Try Again</Button>
          </div>
        ) : filteredServices.length === 0 ? (
          <div className="p-12 text-center text-slate-500">
            <Search className="h-10 w-10 mx-auto text-slate-300 mb-3" />
            <h3 className="text-sm font-semibold text-slate-700">No Services Found</h3>
            <p className="text-xs text-slate-500 mt-1">Try refining your search query or category filters.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-slate-200 text-slate-500 font-mono uppercase text-[10px] bg-slate-50">
                <tr>
                  <th className="py-3.5 px-4 w-16 text-center">Order</th>
                  <th className="py-3.5 px-4">Service Details</th>
                  <th className="py-3.5 px-4">Category</th>
                  <th className="py-3.5 px-4">Icon & Deliverables</th>
                  <th className="py-3.5 px-4 text-center">Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredServices.map((service, index) => {
                  const IconComponent = getServiceIcon(service.icon_name || service.slug);
                  return (
                    <tr key={service.id} className="hover:bg-slate-50/80 transition-colors">
                      {/* Order Controls */}
                      <td className="py-3.5 px-4 text-center">
                        <div className="flex flex-col items-center justify-center gap-0.5">
                          <button
                            onClick={() => handleMoveOrder(index, 'up')}
                            disabled={index === 0}
                            className={`p-1 rounded text-slate-400 hover:text-slate-800 disabled:opacity-25 disabled:cursor-not-allowed`}
                            title="Move Up"
                            aria-label={`Move ${service.title} up`}
                          >
                            <ArrowUp className="h-3.5 w-3.5" />
                          </button>
                          <span className="font-mono text-[11px] text-slate-500 font-bold">
                            {service.display_order ?? index + 1}
                          </span>
                          <button
                            onClick={() => handleMoveOrder(index, 'down')}
                            disabled={index === filteredServices.length - 1}
                            className={`p-1 rounded text-slate-400 hover:text-slate-800 disabled:opacity-25 disabled:cursor-not-allowed`}
                            title="Move Down"
                            aria-label={`Move ${service.title} down`}
                          >
                            <ArrowDown className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </td>

                      {/* Service Details */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-md bg-[#0F1E2E]/5 flex items-center justify-center text-[#0F1E2E] border border-slate-200 shrink-0">
                            <IconComponent className="h-5 w-5 text-[#C5A059]" />
                          </div>
                          <div>
                            <div className="font-bold text-[#0F1E2E] text-sm flex items-center gap-2">
                              {service.title}
                              {service.is_featured && (
                                <Badge variant="gold" className="text-[9px] py-0 px-1.5">Featured</Badge>
                              )}
                            </div>
                            <div className="text-[11px] text-slate-500 line-clamp-1 max-w-md mt-0.5">
                              {service.short_description}
                            </div>
                            <span className="font-mono text-[10px] text-slate-400 mt-0.5 inline-block">
                              /services/{service.slug}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="py-3.5 px-4">
                        <Badge variant="navy" className="text-[10px]">
                          {service.category}
                        </Badge>
                      </td>

                      {/* Deliverables & Icon */}
                      <td className="py-3.5 px-4">
                        <div className="text-slate-700 font-mono text-xs">
                          {service.features ? `${service.features.length} Deliverables` : 'Core Deliverables'}
                        </div>
                        <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                          Icon: {service.icon_name || 'Default'}
                        </div>
                      </td>

                      {/* Status Toggle */}
                      <td className="py-3.5 px-4 text-center">
                        <button
                          onClick={() => handleToggleActive(service)}
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium transition-colors cursor-pointer border ${
                            service.is_active !== false
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                              : 'bg-slate-100 text-slate-500 border-slate-200 hover:bg-slate-200'
                          }`}
                          title={`Click to ${service.is_active !== false ? 'Deactivate' : 'Activate'}`}
                        >
                          <span className={`h-1.5 w-1.5 rounded-full ${service.is_active !== false ? 'bg-emerald-500' : 'bg-slate-400'}`} />
                          {service.is_active !== false ? 'Active' : 'Inactive'}
                        </button>
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => setPreviewService(service)}
                            className="p-1.5 rounded-md text-slate-500 hover:text-[#0F1E2E] hover:bg-slate-100 transition-colors"
                            title="Quick Preview"
                            aria-label={`Preview ${service.title}`}
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                          <Link
                            to={`/services/${service.slug}`}
                            target="_blank"
                            className="p-1.5 rounded-md text-slate-500 hover:text-[#0F1E2E] hover:bg-slate-100 transition-colors"
                            title="View Public Page"
                            aria-label={`View public page for ${service.title}`}
                          >
                            <ExternalLink className="h-4 w-4" />
                          </Link>
                          <Link to={`/admin/services/${service.id}/edit`}>
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-7 text-[10px] border-slate-300 text-slate-700 hover:bg-slate-100 px-2"
                            >
                              <Edit2 className="h-3 w-3 mr-1" /> Edit
                            </Button>
                          </Link>
                          <button
                            onClick={() => setServiceToDelete(service)}
                            className="p-1.5 rounded-md text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                            title="Delete Service"
                            aria-label={`Delete service ${service.title}`}
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Quick Preview Modal */}
      {previewService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full border border-slate-200 overflow-hidden text-slate-900 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50">
              <div className="flex items-center gap-2">
                <Badge variant="navy">{previewService.category}</Badge>
                <span className="text-xs text-slate-500 font-mono">Catalog Live Preview</span>
              </div>
              <button 
                onClick={() => setPreviewService(null)} 
                className="text-slate-400 hover:text-slate-700 p-1"
                aria-label="Close preview"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-[#0F1E2E] text-[#C5A059] flex items-center justify-center shrink-0 shadow-sm">
                  {React.createElement(getServiceIcon(previewService.icon_name || previewService.slug), { className: 'h-6 w-6' })}
                </div>
                <div>
                  <h2 className="text-xl font-bold text-[#0F1E2E]">{previewService.title}</h2>
                  <p className="text-xs text-slate-500 font-mono mt-0.5">Slug: /services/{previewService.slug}</p>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-mono uppercase text-slate-400 font-semibold tracking-wider">Executive Overview</h4>
                <p className="text-sm text-slate-700 mt-1 leading-relaxed">{previewService.short_description}</p>
              </div>

              {previewService.full_description && (
                <div>
                  <h4 className="text-xs font-mono uppercase text-slate-400 font-semibold tracking-wider">Methodology & Scope</h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed bg-slate-50 p-3 rounded-md border border-slate-100">
                    {previewService.full_description}
                  </p>
                </div>
              )}

              {previewService.features && previewService.features.length > 0 && (
                <div>
                  <h4 className="text-xs font-mono uppercase text-slate-400 font-semibold tracking-wider mb-2">Key Deliverables</h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {previewService.features.map((feat, i) => (
                      <li key={i} className="flex items-center gap-2 text-xs text-slate-700 bg-slate-50 px-2.5 py-1.5 rounded border border-slate-100">
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {previewService.meta_title && (
                <div className="border-t border-slate-100 pt-3">
                  <h4 className="text-[11px] font-mono uppercase text-slate-400 font-semibold">SEO Meta Preview</h4>
                  <div className="text-xs text-blue-700 font-medium mt-1">{previewService.meta_title}</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">{previewService.meta_description}</div>
                </div>
              )}
            </div>

            <div className="px-6 py-3 bg-slate-50 border-t border-slate-200 flex justify-end gap-2">
              <Button variant="ghost" size="sm" onClick={() => setPreviewService(null)}>
                Close Preview
              </Button>
              <Link to={`/admin/services/${previewService.id}/edit`}>
                <PrimaryButton size="sm">
                  <Edit2 className="h-3.5 w-3.5 mr-1" /> Edit This Service
                </PrimaryButton>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {serviceToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full border border-slate-200 p-6 text-slate-900 animate-in fade-in zoom-in-95 duration-200">
            <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold text-center text-slate-900">Delete Investigation Service?</h3>
            <p className="text-xs text-center text-slate-500 mt-2">
              Are you sure you want to delete <strong className="text-slate-800">"{serviceToDelete.title}"</strong>? 
              This will remove the service from public catalog listings and SEO routing.
            </p>

            <div className="flex justify-center gap-3 mt-6">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setServiceToDelete(null)}
                disabled={deleteLoading}
              >
                Cancel
              </Button>
              <Button
                variant="danger"
                size="sm"
                onClick={confirmDelete}
                disabled={deleteLoading}
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                {deleteLoading ? 'Deleting...' : 'Confirm Permanent Deletion'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminServicesPage;
