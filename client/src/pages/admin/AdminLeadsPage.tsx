import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
  Inbox, 
  Search, 
  RefreshCw, 
  Eye, 
  Trash2, 
  Download, 
  Filter, 
  Calendar, 
  UserCheck, 
  Phone, 
  Mail, 
  MapPin, 
  X, 
  Plus, 
  ShieldCheck, 
  AlertTriangle, 
  Check, 
  ChevronLeft, 
  ChevronRight, 
  FileText,
  User
} from 'lucide-react';
import { Badge } from '../../components/ui/badge';
import { Button, PrimaryButton } from '../../components/ui/button';
import { Dialog } from '../../components/ui/dialog';
import { CardSkeleton } from '../../components/ui/LoadingSkeleton';
import { EmptyState } from '../../components/ui/EmptyState';
import { leadService, Lead, LeadStatus, StaffMember, LeadNote } from '../../services/leadService';
import { serviceService } from '../../services/serviceService';
import { Service } from '../../types';
import { formatDate } from '../../lib/utils';

const LEAD_STATUSES: LeadStatus[] = [
  'New',
  'Contacted',
  'In Progress',
  'Converted',
  'Closed',
  'Spam'
];

type DatePreset = 'all' | 'today' | '7days' | '30days' | 'custom';

export function AdminLeadsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const urlStatus = searchParams.get('status');
  const urlLeadId = searchParams.get('id');

  // Core Data State
  const [leads, setLeads] = useState<Lead[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [staffList, setStaffList] = useState<StaffMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filter & Search State
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>(urlStatus || 'all');
  const [selectedServiceId, setSelectedServiceId] = useState<string>('all');
  const [datePreset, setDatePreset] = useState<DatePreset>('all');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Drawer & Modal State
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [leadToDelete, setLeadToDelete] = useState<Lead | null>(null);
  const [newNoteText, setNewNoteText] = useState('');
  const [isAddingNote, setIsAddingNote] = useState(false);
  const [updatingId, setUpdatingId] = useState<number | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [isExporting, setIsExporting] = useState(false);

  // Fetch initial leads, services, and staff
  const loadData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [leadsData, servicesData, staffData] = await Promise.all([
        leadService.getAllLeads(),
        serviceService.getAllServices(),
        leadService.getStaffList().catch(() => [])
      ]);
      setLeads(leadsData);
      setServices(servicesData);
      setStaffList(staffData);

      // If URL has an ID param, open that lead in drawer
      if (urlLeadId) {
        const target = leadsData.find((l: Lead) => String(l.id) === String(urlLeadId));
        if (target) {
          setSelectedLead(target);
          setIsDrawerOpen(true);
        }
      }
    } catch (err: any) {
      setError(err.message || 'Failed to fetch consultation leads dataset.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Update status filter if URL changes
  useEffect(() => {
    if (urlStatus) {
      setSelectedStatus(urlStatus);
    }
  }, [urlStatus]);

  // Date Range Calculation
  const dateRangeBounds = useMemo(() => {
    const now = new Date();
    if (datePreset === 'today') {
      const start = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      return { start: start.toISOString(), end: new Date().toISOString() };
    }
    if (datePreset === '7days') {
      const start = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      return { start: start.toISOString(), end: new Date().toISOString() };
    }
    if (datePreset === '30days') {
      const start = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
      return { start: start.toISOString(), end: new Date().toISOString() };
    }
    if (datePreset === 'custom') {
      return {
        start: startDate ? new Date(startDate).toISOString() : null,
        end: endDate ? new Date(endDate + 'T23:59:59').toISOString() : null
      };
    }
    return { start: null, end: null };
  }, [datePreset, startDate, endDate]);

  // Filter Leads
  const filteredLeads = useMemo(() => {
    return leads.filter((lead) => {
      // 1. Search filter
      if (searchTerm.trim()) {
        const query = searchTerm.toLowerCase().trim();
        const matchesName = lead.full_name?.toLowerCase().includes(query);
        const matchesEmail = lead.email?.toLowerCase().includes(query);
        const matchesPhone = lead.phone?.toLowerCase().includes(query);
        const matchesCity = lead.city?.toLowerCase().includes(query);
        const matchesService = lead.service_type?.toLowerCase().includes(query);
        const matchesMessage = lead.message?.toLowerCase().includes(query);
        const matchesNotes = lead.notes?.some((n) => n.note.toLowerCase().includes(query));
        const matchesId = String(lead.id).includes(query) || `sp-2026-${lead.id}`.includes(query);

        if (!matchesName && !matchesEmail && !matchesPhone && !matchesCity && !matchesService && !matchesMessage && !matchesNotes && !matchesId) {
          return false;
        }
      }

      // 2. Status filter
      if (selectedStatus !== 'all') {
        if (lead.status.toLowerCase() !== selectedStatus.toLowerCase()) {
          return false;
        }
      }

      // 3. Service filter
      if (selectedServiceId !== 'all') {
        if (String(lead.service_id) !== String(selectedServiceId)) {
          return false;
        }
      }

      // 4. Date filter
      if (dateRangeBounds.start) {
        const leadTime = new Date(lead.created_at).getTime();
        const startTime = new Date(dateRangeBounds.start).getTime();
        if (leadTime < startTime) return false;
      }
      if (dateRangeBounds.end) {
        const leadTime = new Date(lead.created_at).getTime();
        const endTime = new Date(dateRangeBounds.end).getTime();
        if (leadTime > endTime) return false;
      }

      return true;
    });
  }, [leads, searchTerm, selectedStatus, selectedServiceId, dateRangeBounds]);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedStatus, selectedServiceId, datePreset, startDate, endDate]);

  // Pagination calculation
  const totalPages = Math.ceil(filteredLeads.length / pageSize) || 1;
  const paginatedLeads = useMemo(() => {
    const startIdx = (currentPage - 1) * pageSize;
    return filteredLeads.slice(startIdx, startIdx + pageSize);
  }, [filteredLeads, currentPage, pageSize]);

  // Handlers
  const handleUpdateStatus = async (id: number, newStatus: LeadStatus) => {
    setUpdatingId(id);
    try {
      await leadService.updateLeadStatus(id, newStatus);
      setLeads((prev) =>
        prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
      );
      if (selectedLead && selectedLead.id === id) {
        setSelectedLead({ ...selectedLead, status: newStatus });
      }
    } catch (err: any) {
      alert(err.message || 'Failed to update lead status');
    } finally {
      setUpdatingId(null);
    }
  };

  const handleAssignStaff = async (leadId: number, staffId: number | null) => {
    setUpdatingId(leadId);
    try {
      const updated = await leadService.assignLead(leadId, staffId);
      setLeads((prev) =>
        prev.map((item) => (item.id === leadId ? { ...item, assigned_to: updated.assigned_to, assigned_admin_name: updated.assigned_admin_name } : item))
      );
      if (selectedLead && selectedLead.id === leadId) {
        setSelectedLead({ ...selectedLead, assigned_to: updated.assigned_to, assigned_admin_name: updated.assigned_admin_name });
      }
    } catch (err: any) {
      alert(err.message || 'Failed to assign staff member.');
    } finally {
      setUpdatingId(null);
    }
  };

  const handleAddNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedLead || !newNoteText.trim()) return;

    setIsAddingNote(true);
    try {
      const note = await leadService.addLeadNote(selectedLead.id, newNoteText.trim());
      const updatedNotes = [note, ...(selectedLead.notes || [])];
      const updatedLead = { ...selectedLead, notes: updatedNotes };
      
      setSelectedLead(updatedLead);
      setLeads((prev) =>
        prev.map((l) => (l.id === selectedLead.id ? updatedLead : l))
      );
      setNewNoteText('');
    } catch (err: any) {
      alert(err.message || 'Failed to add internal note.');
    } finally {
      setIsAddingNote(false);
    }
  };

  const handleOpenDrawer = (lead: Lead) => {
    setSelectedLead(lead);
    setIsDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
    setSelectedLead(null);
  };

  const confirmDeleteLead = async () => {
    if (!leadToDelete) return;
    setDeletingId(leadToDelete.id);
    try {
      await leadService.deleteLead(leadToDelete.id);
      setLeads((prev) => prev.filter((item) => item.id !== leadToDelete.id));
      if (selectedLead && selectedLead.id === leadToDelete.id) {
        handleCloseDrawer();
      }
      setLeadToDelete(null);
    } catch (err: any) {
      alert(err.message || 'Failed to permanently delete lead.');
    } finally {
      setDeletingId(null);
    }
  };

  const handleExportCsv = async () => {
    try {
      setIsExporting(true);
      const filters = {
        search: searchTerm || undefined,
        status: selectedStatus !== 'all' ? selectedStatus : undefined,
        serviceId: selectedServiceId !== 'all' ? Number(selectedServiceId) : undefined,
        startDate: dateRangeBounds.start ? dateRangeBounds.start.split('T')[0] : undefined,
        endDate: dateRangeBounds.end ? dateRangeBounds.end.split('T')[0] : undefined,
      };

      const blob = await leadService.exportLeadsCsv(filters);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `seekproof-leads-export-${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (err: any) {
      alert(err.message || 'Failed to export leads.');
    } finally {
      setIsExporting(false);
    }
  };

  const resetAllFilters = () => {
    setSearchTerm('');
    setSelectedStatus('all');
    setSelectedServiceId('all');
    setDatePreset('all');
    setStartDate('');
    setEndDate('');
    setSearchParams({});
  };

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case 'new':
        return <Badge variant="gold" className="text-[10px] font-mono">New</Badge>;
      case 'in progress':
      case 'in_progress':
        return <Badge variant="navy" className="text-[10px] font-mono">In Progress</Badge>;
      case 'contacted':
        return <Badge variant="subtle" className="text-[10px] font-mono">Contacted</Badge>;
      case 'converted':
        return <Badge variant="success" className="text-[10px] font-mono">Converted</Badge>;
      case 'closed':
        return <Badge variant="default" className="text-[10px] font-mono">Closed</Badge>;
      case 'spam':
        return <Badge variant="danger" className="text-[10px] font-mono">Spam</Badge>;
      default:
        return <Badge variant="outline" className="text-[10px] font-mono">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto text-slate-900">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-[#0F1E2E] font-mono tracking-tight">
              Consultation Dossiers & Leads
            </h1>
            <Badge variant="outline" className="font-mono text-[10px]">
              {leads.length} Records
            </Badge>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Encrypted client intake management with NDA verification, investigator assignment, and timeline tracking.
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <Button
            variant="outline"
            size="sm"
            onClick={loadData}
            isLoading={loading}
            className="border-slate-300 text-slate-700 hover:bg-slate-100 font-mono text-xs"
          >
            <RefreshCw className="h-3.5 w-3.5 mr-1 text-[#997B24]" aria-hidden="true" strokeWidth={2} /> Refresh
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={handleExportCsv}
            isLoading={isExporting}
            className="border-slate-300 text-slate-700 hover:bg-slate-100 font-mono text-xs"
          >
            <Download className="h-3.5 w-3.5 mr-1 text-slate-600" aria-hidden="true" strokeWidth={2} /> Export CSV
          </Button>
        </div>
      </div>

      {/* Error State Banner */}
      {error && (
        <div className="p-4 rounded-md bg-rose-50 border border-rose-200 text-rose-800 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-mono">
            <AlertTriangle className="h-4 w-4 text-rose-600 shrink-0" aria-hidden="true" />
            <span>{error}</span>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={loadData}
            className="text-xs border-rose-300 text-rose-800 hover:bg-rose-100"
          >
            Retry
          </Button>
        </div>
      )}

      {/* Filter Control Bar */}
      <div className="bg-white rounded-md p-4 border border-slate-200 space-y-3.5">
        {/* Row 1: Search & Status Pills */}
        <div className="flex flex-col lg:flex-row gap-3 items-stretch lg:items-center justify-between">
          {/* Search Box */}
          <div className="relative flex-1 max-w-lg">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" aria-hidden="true" strokeWidth={2} />
            <input
              type="text"
              placeholder="Search leads by name, email, phone, city, notes, or #ID..."
              aria-label="Search leads by keyword"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-8 py-2 text-xs rounded-sm bg-slate-50 border border-slate-300 text-slate-900 placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#0F1E2E] focus-visible:bg-white transition-colors"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-700"
                aria-label="Clear search"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Status Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0 scrollbar-none">
            <button
              onClick={() => setSelectedStatus('all')}
              className={`px-3 py-1.5 rounded-sm text-xs font-mono uppercase transition-colors cursor-pointer whitespace-nowrap ${
                selectedStatus === 'all'
                  ? 'bg-[#0F1E2E] text-white font-bold'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              All ({leads.length})
            </button>
            {LEAD_STATUSES.map((status) => {
              const count = leads.filter((l) => l.status.toLowerCase() === status.toLowerCase()).length;
              const isSelected = selectedStatus.toLowerCase() === status.toLowerCase();
              return (
                <button
                  key={status}
                  onClick={() => setSelectedStatus(status)}
                  className={`px-2.5 py-1.5 rounded-sm text-xs font-mono uppercase transition-colors cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-[#0F1E2E] text-white font-bold'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  <span>{status}</span>
                  <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${isSelected ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-600'}`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Row 2: Secondary Dropdown Filters (Service & Date Range) */}
        <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-slate-100 text-xs">
          {/* Service Discipline Filter */}
          <div className="flex items-center gap-1.5">
            <span className="text-slate-500 font-mono text-[11px] whitespace-nowrap">Service:</span>
            <select
              value={selectedServiceId}
              onChange={(e) => setSelectedServiceId(e.target.value)}
              className="bg-slate-50 border border-slate-300 text-slate-800 rounded-sm px-2.5 py-1.5 text-xs font-mono focus-visible:ring-1 focus-visible:ring-[#0F1E2E] cursor-pointer"
            >
              <option value="all">All Investigative Services ({services.length})</option>
              {services.map((srv) => (
                <option key={srv.id} value={String(srv.id)}>
                  {srv.title}
                </option>
              ))}
            </select>
          </div>

          {/* Date Range Preset Selector */}
          <div className="flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5 text-slate-400" />
            <span className="text-slate-500 font-mono text-[11px] whitespace-nowrap">Intake Date:</span>
            <select
              value={datePreset}
              onChange={(e) => setDatePreset(e.target.value as DatePreset)}
              className="bg-slate-50 border border-slate-300 text-slate-800 rounded-sm px-2.5 py-1.5 text-xs font-mono focus-visible:ring-1 focus-visible:ring-[#0F1E2E] cursor-pointer"
            >
              <option value="all">All Time</option>
              <option value="today">Today</option>
              <option value="7days">Last 7 Days</option>
              <option value="30days">Last 30 Days</option>
              <option value="custom">Custom Range...</option>
            </select>
          </div>

          {/* Custom Date Pickers (Shown only when 'custom' is selected) */}
          {datePreset === 'custom' && (
            <div className="flex items-center gap-2 bg-slate-50 p-1 rounded-sm border border-slate-200">
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="bg-white border border-slate-300 rounded-sm px-2 py-1 text-[11px] font-mono text-slate-800"
                aria-label="Start date"
              />
              <span className="text-slate-400 text-xs">to</span>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="bg-white border border-slate-300 rounded-sm px-2 py-1 text-[11px] font-mono text-slate-800"
                aria-label="End date"
              />
            </div>
          )}

          {/* Active Filter Clear Helper */}
          {(searchTerm || selectedStatus !== 'all' || selectedServiceId !== 'all' || datePreset !== 'all') && (
            <button
              onClick={resetAllFilters}
              className="text-[11px] font-mono text-[#997B24] hover:underline cursor-pointer ml-auto flex items-center gap-1"
            >
              <X className="h-3 w-3" /> Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* Leads Table Card */}
      <div className="bg-white rounded-md border border-slate-200 overflow-hidden shadow-sm">
        {loading ? (
          <div className="p-6 space-y-3">
            <CardSkeleton className="bg-slate-50 border-slate-200" />
            <CardSkeleton className="bg-slate-50 border-slate-200" />
            <CardSkeleton className="bg-slate-50 border-slate-200" />
          </div>
        ) : filteredLeads.length === 0 ? (
          <div className="p-12 text-center">
            <EmptyState
              icon={Inbox}
              title="No Consultation Leads Found"
              description="No intake submissions match your specified search keywords or active filter criteria."
            />
            {(searchTerm || selectedStatus !== 'all' || selectedServiceId !== 'all' || datePreset !== 'all') && (
              <div className="mt-4">
                <Button variant="outline" size="sm" onClick={resetAllFilters} className="text-xs font-mono">
                  Clear All Filters
                </Button>
              </div>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-slate-200 text-slate-500 font-mono uppercase text-[10px] bg-slate-50 tracking-wider">
                <tr>
                  <th className="py-3 px-4">Ref & Client Details</th>
                  <th className="py-3 px-3">Service & Requirement</th>
                  <th className="py-3 px-3">Location & Channel</th>
                  <th className="py-3 px-3">Assigned Officer</th>
                  <th className="py-3 px-3">Status Control</th>
                  <th className="py-3 px-3">Received</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {paginatedLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-slate-50/80 transition-colors group">
                    {/* Client Details */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-1.5">
                        <span className="font-mono text-[10px] font-bold text-slate-400">#SP-2026-{lead.id}</span>
                        {lead.notes && lead.notes.length > 0 && (
                          <span className="inline-flex items-center text-[9px] font-mono px-1 py-0.2 rounded bg-amber-50 text-amber-800 border border-amber-200">
                            {lead.notes.length} notes
                          </span>
                        )}
                      </div>
                      <div className="font-bold text-[#0F1E2E] text-sm mt-0.5">{lead.full_name}</div>
                      <div className="text-slate-500 font-mono text-[11px] truncate max-w-[200px]">{lead.email}</div>
                      <div className="text-slate-400 font-mono text-[10px]">{lead.phone}</div>
                    </td>

                    {/* Service & Requirement */}
                    <td className="py-3.5 px-3 max-w-xs">
                      <div className="text-slate-800 font-semibold">{lead.service_type || 'General Consultation'}</div>
                      <div className="text-[11px] text-slate-500 font-sans line-clamp-2 mt-0.5 leading-snug">
                        {lead.message}
                      </div>
                    </td>

                    {/* Location & Channel */}
                    <td className="py-3.5 px-3 whitespace-nowrap">
                      <div className="text-slate-700 font-medium flex items-center gap-1">
                        <MapPin className="h-3 w-3 text-slate-400" />
                        {lead.city || 'Undisclosed'}
                      </div>
                      <div className="text-[10px] text-[#997B24] font-mono uppercase font-bold mt-1">
                        via {lead.preferred_contact_method}
                      </div>
                    </td>

                    {/* Assigned Officer */}
                    <td className="py-3.5 px-3">
                      <select
                        value={lead.assigned_to || ''}
                        disabled={updatingId === lead.id}
                        onChange={(e) => {
                          const val = e.target.value ? Number(e.target.value) : null;
                          handleAssignStaff(lead.id, val);
                        }}
                        className="bg-slate-50 border border-slate-200 text-slate-800 rounded-sm px-2 py-1 text-[11px] font-mono focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#0F1E2E] cursor-pointer max-w-[150px]"
                        aria-label={`Assign officer for ${lead.full_name}`}
                      >
                        <option value="">Unassigned</option>
                        {staffList.map((staff) => (
                          <option key={staff.id} value={staff.id}>
                            {staff.name}
                          </option>
                        ))}
                      </select>
                    </td>

                    {/* Status Select Control */}
                    <td className="py-3.5 px-3">
                      <select
                        className="bg-white border border-slate-300 text-slate-800 rounded-sm px-2.5 py-1 text-[11px] font-mono font-semibold focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#0F1E2E] cursor-pointer"
                        value={lead.status}
                        disabled={updatingId === lead.id}
                        onChange={(e) => handleUpdateStatus(lead.id, e.target.value as LeadStatus)}
                        aria-label={`Update status for ${lead.full_name}`}
                      >
                        {LEAD_STATUSES.map((st) => (
                          <option key={st} value={st}>
                            {st}
                          </option>
                        ))}
                      </select>
                    </td>

                    {/* Date */}
                    <td className="py-3.5 px-3 font-mono text-slate-500 text-[11px] whitespace-nowrap">
                      {formatDate(lead.created_at)}
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5">
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => handleOpenDrawer(lead)}
                          className="text-xs h-7 border-slate-300 font-mono"
                        >
                          <Eye className="h-3 w-3 mr-1 text-[#997B24]" aria-hidden="true" strokeWidth={2} /> Dossier
                        </Button>
                        <button
                          onClick={() => setLeadToDelete(lead)}
                          disabled={deletingId === lead.id}
                          className="p-1.5 rounded-sm text-rose-600 hover:bg-rose-50 cursor-pointer transition-colors"
                          title="Delete Lead Record"
                          aria-label={`Delete lead for ${lead.full_name}`}
                        >
                          <Trash2 className="h-3.5 w-3.5" aria-hidden="true" strokeWidth={2} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination Controls */}
        {filteredLeads.length > 0 && (
          <div className="p-4 border-t border-slate-200 bg-slate-50/50 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono text-slate-600">
            <div className="flex items-center gap-2">
              <span>Rows per page:</span>
              <select
                value={pageSize}
                onChange={(e) => setPageSize(Number(e.target.value))}
                className="bg-white border border-slate-300 rounded-sm px-2 py-1 text-xs cursor-pointer focus-visible:outline-none"
              >
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
              </select>
              <span className="text-slate-400">|</span>
              <span>
                Showing {Math.min((currentPage - 1) * pageSize + 1, filteredLeads.length)} - {Math.min(currentPage * pageSize, filteredLeads.length)} of {filteredLeads.length} leads
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              <Button
                variant="outline"
                size="sm"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                className="h-7 px-2 border-slate-300 text-xs"
              >
                <ChevronLeft className="h-3.5 w-3.5" /> Previous
              </Button>

              <span className="px-2 py-1 text-xs font-bold text-[#0F1E2E]">
                Page {currentPage} of {totalPages}
              </span>

              <Button
                variant="outline"
                size="sm"
                disabled={currentPage >= totalPages}
                onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                className="h-7 px-2 border-slate-300 text-xs"
              >
                Next <ChevronRight className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* LEAD DETAILS SLIDE-OVER DRAWER */}
      {isDrawerOpen && selectedLead && (
        <div className="fixed inset-0 z-50 overflow-hidden flex justify-end">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-slate-900/50 transition-opacity animate-in fade-in duration-200"
            onClick={handleCloseDrawer}
          />

          {/* Sliding Drawer Container */}
          <div className="relative w-full max-w-2xl bg-white h-full shadow-2xl z-10 flex flex-col border-l border-slate-200 overflow-hidden animate-in slide-in-from-right duration-250">
            {/* Drawer Header */}
            <div className="p-5 border-b border-slate-200 bg-[#0F1E2E] text-white flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-[#D4AF37]">
                    DOSSIER REF: #SP-2026-{selectedLead.id}
                  </span>
                  {getStatusBadge(selectedLead.status)}
                </div>
                <h2 className="text-lg font-bold text-white mt-1 font-mono tracking-tight">
                  {selectedLead.full_name}
                </h2>
              </div>
              <button
                onClick={handleCloseDrawer}
                className="p-1.5 rounded-sm text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Close dossier drawer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Drawer Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 text-xs font-mono">
              {/* Client Contact Grid */}
              <div className="p-4 rounded-sm bg-slate-50 border border-slate-200 space-y-3">
                <div className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">
                  Confidential Client Intake Profile
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-slate-800">
                  <div className="flex items-center gap-2">
                    <Mail className="h-3.5 w-3.5 text-[#997B24] shrink-0" />
                    <div>
                      <span className="text-slate-500 block text-[9px] uppercase">Email</span>
                      <a href={`mailto:${selectedLead.email}`} className="font-bold text-[#0F1E2E] hover:underline break-all">
                        {selectedLead.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Phone className="h-3.5 w-3.5 text-[#997B24] shrink-0" />
                    <div>
                      <span className="text-slate-500 block text-[9px] uppercase">Phone / Contact</span>
                      <a href={`tel:${selectedLead.phone}`} className="font-bold text-[#0F1E2E] hover:underline">
                        {selectedLead.phone}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <MapPin className="h-3.5 w-3.5 text-[#997B24] shrink-0" />
                    <div>
                      <span className="text-slate-500 block text-[9px] uppercase">City / Jurisdiction</span>
                      <span className="font-bold text-slate-800">{selectedLead.city || 'Undisclosed'}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <ShieldCheck className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                    <div>
                      <span className="text-slate-500 block text-[9px] uppercase">NDA Consent</span>
                      <span className="font-bold text-emerald-700">Verified & Encrypted</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Status & Staff Assignment Controls */}
              <div className="p-4 rounded-sm bg-amber-50/50 border border-amber-200/60 space-y-3">
                <div className="text-[10px] uppercase font-bold text-amber-900 tracking-wider">
                  Case Workflow & Officer Assignment
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] text-slate-600 uppercase block mb-1">Dossier Status:</label>
                    <select
                      className="w-full bg-white border border-slate-300 text-slate-900 rounded-sm px-2.5 py-1.5 text-xs font-mono font-bold"
                      value={selectedLead.status}
                      disabled={updatingId === selectedLead.id}
                      onChange={(e) => handleUpdateStatus(selectedLead.id, e.target.value as LeadStatus)}
                    >
                      {LEAD_STATUSES.map((st) => (
                        <option key={st} value={st}>
                          {st}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-[10px] text-slate-600 uppercase block mb-1">Lead Investigator:</label>
                    <select
                      className="w-full bg-white border border-slate-300 text-slate-900 rounded-sm px-2.5 py-1.5 text-xs font-mono font-bold"
                      value={selectedLead.assigned_to || ''}
                      disabled={updatingId === selectedLead.id}
                      onChange={(e) => {
                        const val = e.target.value ? Number(e.target.value) : null;
                        handleAssignStaff(selectedLead.id, val);
                      }}
                    >
                      <option value="">Unassigned</option>
                      {staffList.map((staff) => (
                        <option key={staff.id} value={staff.id}>
                          {staff.name} ({staff.role})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Requirement Brief Synopsis */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-slate-600 uppercase text-[10px] font-bold">Investigation Requirement:</span>
                  <Badge variant="outline" className="text-[10px]">
                    {selectedLead.service_type || 'General Consultation'}
                  </Badge>
                </div>
                <div className="p-4 rounded-sm bg-slate-50 border border-slate-200 text-slate-800 leading-relaxed font-sans text-xs">
                  {selectedLead.message}
                </div>
              </div>

              {/* Internal Confidential Notes Section */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                  <div className="flex items-center gap-1.5">
                    <FileText className="h-4 w-4 text-[#997B24]" />
                    <span className="text-xs font-bold text-[#0F1E2E] font-mono">
                      Internal Investigator Notes ({selectedLead.notes?.length || 0})
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono">Confidential Audit Trail</span>
                </div>

                {/* Add Note Form */}
                <form onSubmit={handleAddNote} className="space-y-2">
                  <textarea
                    rows={3}
                    placeholder="Enter confidential investigator notes, initial reconnaissance findings, or case milestones..."
                    value={newNoteText}
                    onChange={(e) => setNewNoteText(e.target.value)}
                    className="w-full p-2.5 text-xs rounded-sm bg-slate-50 border border-slate-300 text-slate-900 placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#0F1E2E] focus-visible:bg-white font-sans"
                  />
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-slate-400 font-mono">
                      {newNoteText.length} / 3000 chars
                    </span>
                    <Button
                      type="submit"
                      size="sm"
                      isLoading={isAddingNote}
                      disabled={!newNoteText.trim()}
                      className="text-xs font-mono h-7"
                    >
                      <Plus className="h-3 w-3 mr-1" /> Add Note
                    </Button>
                  </div>
                </form>

                {/* Notes List */}
                <div className="space-y-2.5 mt-3">
                  {!selectedLead.notes || selectedLead.notes.length === 0 ? (
                    <div className="p-4 rounded-sm bg-slate-50 border border-dashed border-slate-200 text-center text-slate-400 text-xs">
                      No internal notes recorded on this dossier yet.
                    </div>
                  ) : (
                    selectedLead.notes.map((note: LeadNote) => (
                      <div key={note.id} className="p-3 rounded-sm bg-slate-50 border border-slate-200 space-y-1">
                        <div className="flex items-center justify-between text-[10px] text-slate-500">
                          <span className="font-bold text-[#0F1E2E] flex items-center gap-1">
                            <User className="h-3 w-3 text-slate-400" />
                            {note.admin_name || 'Intelligence Officer'}
                          </span>
                          <span>{formatDate(note.created_at)}</span>
                        </div>
                        <div className="text-slate-800 font-sans text-xs whitespace-pre-wrap leading-relaxed">
                          {note.note}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Attribution & Telemetry Card */}
              <div className="p-3 rounded-sm bg-slate-100 border border-slate-200 text-[10px] text-slate-600 space-y-1">
                <div className="font-bold uppercase text-slate-500 text-[9px]">Intake Telemetry:</div>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                  <span>Source: <strong className="text-slate-900">{selectedLead.source}</strong></span>
                  {selectedLead.utm_campaign && (
                    <span>Campaign: <strong className="text-slate-900">{selectedLead.utm_campaign}</strong></span>
                  )}
                  {selectedLead.ip_address && (
                    <span>Client IP: <strong className="text-slate-900">{selectedLead.ip_address}</strong></span>
                  )}
                  <span>Created: <strong className="text-slate-900">{formatDate(selectedLead.created_at)}</strong></span>
                </div>
              </div>
            </div>

            {/* Drawer Footer Actions */}
            <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setLeadToDelete(selectedLead)}
                className="text-xs text-rose-700 border-rose-300 hover:bg-rose-50 font-mono"
              >
                <Trash2 className="h-3.5 w-3.5 mr-1" /> Delete Dossier
              </Button>

              <Button
                variant="secondary"
                size="sm"
                onClick={handleCloseDrawer}
                className="text-xs font-mono"
              >
                Close Drawer
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* CONFIRMATION DIALOG BEFORE DELETION */}
      <Dialog
        isOpen={!!leadToDelete}
        onClose={() => setLeadToDelete(null)}
        title="Confirm Permanent Lead Deletion"
        description="Warning: This action will permanently remove this confidential consultation lead and its associated internal notes from the database. This action cannot be undone."
        className="max-w-md"
      >
        {leadToDelete && (
          <div className="space-y-4 pt-2">
            <div className="p-3 rounded-sm bg-rose-50 border border-rose-200 text-xs font-mono space-y-1">
              <div>Record ID: <strong className="text-[#0F1E2E]">#SP-2026-{leadToDelete.id}</strong></div>
              <div>Client Name: <strong className="text-[#0F1E2E]">{leadToDelete.full_name}</strong></div>
              <div>Email: <span className="text-slate-700">{leadToDelete.email}</span></div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-200">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setLeadToDelete(null)}
                className="text-xs font-mono"
              >
                Cancel
              </Button>

              <Button
                variant="default"
                size="sm"
                onClick={confirmDeleteLead}
                isLoading={deletingId === leadToDelete.id}
                className="text-xs font-mono bg-rose-700 hover:bg-rose-800 text-white"
              >
                <Trash2 className="h-3.5 w-3.5 mr-1" /> Permanently Delete
              </Button>
            </div>
          </div>
        )}
      </Dialog>
    </div>
  );
}

export default AdminLeadsPage;
