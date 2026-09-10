import { useState, useEffect } from 'react';
import { 
  Plus, 
  Search, 
  FolderKanban, 
  Activity, 
  CheckCircle2, 
  RefreshCw,
  FileSearch
} from 'lucide-react';
import { Button, PrimaryButton } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Dialog } from '../components/ui/dialog';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { EmptyState } from '../components/ui/EmptyState';
import { CardSkeleton } from '../components/ui/LoadingSkeleton';
import { useAuth } from '../hooks/useAuth';
import { caseService, CreateCaseDto } from '../services/caseService';
import { Case } from '../types';
import { formatDate, getStatusBadgeVariant } from '../lib/utils';

export function DashboardPage() {
  const { user } = useAuth();
  const [cases, setCases] = useState<Case[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // New case form state
  const [newCaseTitle, setNewCaseTitle] = useState('');
  const [newCaseType, setNewCaseType] = useState('corporate_fraud');
  const [newCasePriority, setNewCasePriority] = useState<'standard' | 'high' | 'urgent' | 'critical'>('standard');
  const [newCaseDesc, setNewCaseDesc] = useState('');
  const [newCaseLocation, setNewCaseLocation] = useState('');

  const fetchCases = async () => {
    setLoading(true);
    try {
      const data = await caseService.getCases();
      setCases(data);
    } catch {
      // Handled via state
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCases();
  }, []);

  const handleCreateCase = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCaseTitle || !newCaseDesc) return;

    setIsSubmitting(true);
    try {
      const payload: CreateCaseDto = {
        title: newCaseTitle,
        description: newCaseDesc,
        case_type: newCaseType,
        priority: newCasePriority,
        confidentiality_level: 'confidential',
        location: newCaseLocation || undefined,
      };
      await caseService.createCase(payload);
      setIsModalOpen(false);
      setNewCaseTitle('');
      setNewCaseDesc('');
      setNewCaseLocation('');
      fetchCases();
    } catch (err: any) {
      alert(err.message || 'Error initializing case');
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredCases = cases.filter((c) => {
    const matchesSearch =
      c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.case_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.case_type.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filterStatus === 'all') return matchesSearch;
    return matchesSearch && c.status === filterStatus;
  });

  return (
    <div className="space-y-8 max-w-7xl mx-auto text-slate-900">
      {/* Top Banner / Welcome */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl font-bold text-[#0F1E2E] tracking-tight">
              Investigation Operations Console
            </h1>
            <Badge variant="navy">
              Live Feed
            </Badge>
          </div>
          <p className="text-xs text-slate-500 mt-1 font-mono">
            Authorized Account: <span className="text-slate-900 font-semibold">{user?.name}</span> ({user?.role?.toUpperCase()})
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={fetchCases}
            isLoading={loading}
            className="border-slate-300 text-slate-700 hover:bg-slate-100"
          >
            <RefreshCw className="h-3.5 w-3.5 mr-1 text-[#997B24]" aria-hidden="true" strokeWidth={2} /> Refresh
          </Button>
          <PrimaryButton size="sm" onClick={() => setIsModalOpen(true)} className="font-mono text-xs">
            <Plus className="h-4 w-4 mr-1" aria-hidden="true" strokeWidth={2} /> Open New Case File
          </PrimaryButton>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-md p-5 border border-slate-200 flex items-center justify-between">
          <div>
            <div className="text-[11px] font-mono uppercase text-slate-500 font-semibold">Total Assigned Cases</div>
            <div className="text-2xl font-bold text-[#0F1E2E] font-mono mt-1">{cases.length}</div>
          </div>
          <div className="p-3 rounded-sm bg-slate-100 text-[#0F1E2E] border border-slate-200">
            <FolderKanban className="h-5 w-5" aria-hidden="true" strokeWidth={2} />
          </div>
        </div>

        <div className="bg-white rounded-md p-5 border border-slate-200 flex items-center justify-between">
          <div>
            <div className="text-[11px] font-mono uppercase text-slate-500 font-semibold">Active Field Ops</div>
            <div className="text-2xl font-bold text-[#0F1E2E] font-mono mt-1">
              {cases.filter(c => c.status === 'active_investigation' || c.status === 'evidence_gathering').length}
            </div>
          </div>
          <div className="p-3 rounded-sm bg-slate-100 text-sky-700 border border-slate-200">
            <Activity className="h-5 w-5" aria-hidden="true" strokeWidth={2} />
          </div>
        </div>

        <div className="bg-white rounded-md p-5 border border-slate-200 flex items-center justify-between">
          <div>
            <div className="text-[11px] font-mono uppercase text-slate-500 font-semibold">Resolved & Evidenced</div>
            <div className="text-2xl font-bold text-[#0F1E2E] font-mono mt-1">
              {cases.filter(c => c.status === 'closed').length}
            </div>
          </div>
          <div className="p-3 rounded-sm bg-slate-100 text-emerald-700 border border-slate-200">
            <CheckCircle2 className="h-5 w-5" aria-hidden="true" strokeWidth={2} />
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" aria-hidden="true" strokeWidth={2} />
          <input
            type="text"
            placeholder="Search dossier # or title..."
            aria-label="Search dossier number or title"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs rounded-sm bg-white border border-slate-300 text-slate-900 placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#0F1E2E]"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          {['all', 'active_investigation', 'evidence_gathering', 'under_review', 'closed'].map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-3 py-1.5 rounded-sm text-xs font-mono uppercase transition-colors cursor-pointer whitespace-nowrap ${
                filterStatus === status
                  ? 'bg-[#0F1E2E] text-white font-bold'
                  : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-100'
              }`}
            >
              {status.replace(/_/g, ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Cases List */}
      <div className="space-y-4">
        {loading ? (
          <div className="grid grid-cols-1 gap-4">
            <CardSkeleton className="bg-white border-slate-200" />
            <CardSkeleton className="bg-white border-slate-200" />
          </div>
        ) : filteredCases.length === 0 ? (
          <EmptyState
            icon={FileSearch}
            title="No Case Files Found"
            description="No active or archived investigation records match your current search query or filter selection."
            actionText="Initialize New Case"
            onAction={() => setIsModalOpen(true)}
          />
        ) : (
          filteredCases.map((item) => {
            const badge = getStatusBadgeVariant(item.status);
            return (
              <div
                key={item.id}
                className="rounded-md p-5 sm:p-6 space-y-4 border border-slate-200 bg-white"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono font-bold text-[#0F1E2E]">
                      {item.case_number}
                    </span>
                    <h3 className="text-base font-bold text-[#0F1E2E] hover:text-[#997B24] transition-colors">
                      {item.title}
                    </h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`inline-flex items-center rounded-sm border px-2.5 py-0.5 text-[10px] font-mono font-bold uppercase ${badge.bg} ${badge.text} ${badge.border}`}>
                      {item.status.replace(/_/g, ' ')}
                    </span>
                    <Badge variant="outline" className="text-[10px] font-mono border-slate-300 text-slate-700">
                      {item.priority}
                    </Badge>
                  </div>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {item.description}
                </p>

                {/* Progress Bar & Footer */}
                <div className="space-y-2 pt-2">
                  <div className="flex items-center justify-between text-[11px] font-mono text-slate-500">
                    <span>Evidentiary Milestone Progress</span>
                    <span className="text-[#0F1E2E] font-bold">{item.progress_percentage}%</span>
                  </div>
                  <div className="h-2 w-full bg-slate-100 rounded-sm overflow-hidden border border-slate-200">
                    <div
                      className="h-full bg-[#0F1E2E] rounded-sm transition-all duration-500"
                      style={{ width: `${item.progress_percentage}%` }}
                    />
                  </div>
                </div>

                <div className="pt-2 flex flex-wrap items-center justify-between gap-3 text-[11px] font-mono text-slate-500">
                  <div className="flex items-center gap-4">
                    {item.location && <span>Location: <span className="text-slate-900 font-semibold">{item.location}</span></span>}
                    <span>Category: <span className="text-slate-900 font-semibold">{item.case_type.replace(/_/g, ' ')}</span></span>
                  </div>
                  <span>Opened: {formatDate(item.created_at)}</span>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Modal Dialog for New Case */}
      <Dialog
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Initialize New Case Dossier"
        description="Provide preliminary facts for your assigned Senior Investigator."
        className="bg-white border-slate-200 text-slate-900"
      >
        <form onSubmit={handleCreateCase} className="space-y-4">
          <Input
            label="Case Title / Operational Identifier"
            placeholder="e.g. Operation Sentinel: Server Intrusion Audit"
            value={newCaseTitle}
            onChange={(e) => setNewCaseTitle(e.target.value)}
            required
          />

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700">
                Investigation Type
              </label>
              <select
                className="flex h-10 w-full rounded-sm border border-slate-300 bg-white px-3.5 py-2 text-xs text-slate-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#0F1E2E]"
                value={newCaseType}
                onChange={(e) => setNewCaseType(e.target.value)}
              >
                <option value="corporate_fraud">Corporate Fraud</option>
                <option value="digital_forensics">Digital Forensics</option>
                <option value="surveillance">Covert Surveillance</option>
                <option value="counter_surveillance">TSCM / Sweeping</option>
                <option value="asset_recovery">Asset Recovery</option>
                <option value="background_intelligence">Due Diligence</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700">
                Priority Tier
              </label>
              <select
                className="flex h-10 w-full rounded-sm border border-slate-300 bg-white px-3.5 py-2 text-xs text-slate-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#0F1E2E]"
                value={newCasePriority}
                onChange={(e) => setNewCasePriority(e.target.value as any)}
              >
                <option value="standard">Standard</option>
                <option value="high">High</option>
                <option value="urgent">Urgent</option>
                <option value="critical">Critical</option>
              </select>
            </div>
          </div>

          <Input
            label="Target Jurisdiction / Location"
            placeholder="e.g. London / Zurich"
            value={newCaseLocation}
            onChange={(e) => setNewCaseLocation(e.target.value)}
          />

          <Textarea
            label="Confidential Case Summary"
            placeholder="Provide facts, suspicious activity, and investigative goals..."
            rows={3}
            value={newCaseDesc}
            onChange={(e) => setNewCaseDesc(e.target.value)}
            required
          />

          <div className="flex justify-end gap-2 pt-2">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setIsModalOpen(false)}
              className="text-slate-600 hover:text-slate-900"
            >
              Cancel
            </Button>
            <PrimaryButton type="submit" size="sm" isLoading={isSubmitting}>
              Open Case File
            </PrimaryButton>
          </div>
        </form>
      </Dialog>
    </div>
  );
}

export default DashboardPage;
