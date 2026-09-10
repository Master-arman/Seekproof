import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Inbox, 
  Users, 
  Clock, 
  CheckCircle2, 
  Mail, 
  BriefcaseBusiness, 
  ArrowUpRight, 
  RefreshCw, 
  ShieldCheck, 
  AlertTriangle,
  Download,
  PlusCircle,
  History,
  TrendingUp,
  FileCheck
} from 'lucide-react';
import { Badge } from '../../components/ui/badge';
import { Button, PrimaryButton } from '../../components/ui/button';
import { CardSkeleton } from '../../components/ui/LoadingSkeleton';
import { adminService } from '../../services/adminService';
import { leadService } from '../../services/leadService';
import { AdminOverviewData, Lead } from '../../types';
import { formatDate } from '../../lib/utils';

export function AdminDashboardPage() {
  const [data, setData] = useState<AdminOverviewData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isExporting, setIsExporting] = useState(false);

  const fetchDashboardData = async () => {
    setLoading(true);
    setError(null);
    try {
      const overview = await adminService.getOverview();
      setData(overview);
    } catch (err: any) {
      setError(err.message || 'Failed to connect to administrative telemetry server.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const handleExportCsv = async () => {
    try {
      setIsExporting(true);
      const blob = await leadService.exportLeadsCsv();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `seekproof-intake-leads-${new Date().toISOString().split('T')[0]}.csv`;
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

  const metrics = data?.metrics || {
    new_leads: 0,
    total_leads: 0,
    in_progress_leads: 0,
    converted_leads: 0,
    contact_messages: 0,
    published_services: 0,
    contacted_leads: 0,
    closed_leads: 0,
    spam_leads: 0,
    total_services: 0
  };

  const conversionRate = metrics.total_leads > 0 
    ? ((metrics.converted_leads / metrics.total_leads) * 100).toFixed(1)
    : '0.0';

  const getStatusBadgeVariant = (status: string): 'default' | 'gold' | 'navy' | 'success' | 'danger' | 'outline' | 'subtle' => {
    switch (status.toLowerCase()) {
      case 'new': return 'gold';
      case 'in progress':
      case 'in_progress': return 'navy';
      case 'converted': return 'success';
      case 'contacted': return 'subtle';
      case 'closed': return 'default';
      case 'spam': return 'danger';
      default: return 'outline';
    }
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto text-slate-900">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-[#0F1E2E] tracking-tight font-mono">
              Operations & Intelligence Command
            </h1>
            <Badge variant="gold" className="text-[10px] font-mono">
              CONFIDENTIAL
            </Badge>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Real-time telemetry on confidential intake leads, active dossiers, and public service assets.
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <Button
            variant="outline"
            size="sm"
            onClick={fetchDashboardData}
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

          <Link to="/admin/leads">
            <PrimaryButton size="sm" className="font-mono text-xs">
              <Inbox className="h-4 w-4 mr-1.5" aria-hidden="true" strokeWidth={2} /> Review Leads ({metrics.new_leads})
            </PrimaryButton>
          </Link>
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
            onClick={fetchDashboardData}
            className="text-xs border-rose-300 text-rose-800 hover:bg-rose-100"
          >
            Retry Connection
          </Button>
        </div>
      )}

      {/* 6 OVERVIEW METRIC CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* 1. New Leads */}
        <Link 
          to="/admin/leads?status=New" 
          className="group block bg-white rounded-md p-5 border border-slate-200 hover:border-[#D4AF37] hover:shadow-sm transition-all relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-1 h-full bg-[#D4AF37]" />
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase text-slate-500 font-semibold tracking-wider">New Leads</span>
            <div className="p-2 rounded-sm bg-amber-50 text-[#997B24] border border-amber-200 group-hover:scale-105 transition-transform">
              <Inbox className="h-4 w-4" aria-hidden="true" strokeWidth={2} />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-3xl font-bold font-mono text-[#0F1E2E]">
              {loading ? '-' : metrics.new_leads}
            </div>
            <div className="text-[11px] text-[#997B24] font-mono font-semibold mt-1 flex items-center justify-between">
              <span>Pending triage & initial contact</span>
              <ArrowUpRight className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </div>
        </Link>

        {/* 2. Total Leads */}
        <Link 
          to="/admin/leads" 
          className="group block bg-white rounded-md p-5 border border-slate-200 hover:border-slate-400 hover:shadow-sm transition-all relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-1 h-full bg-[#0F1E2E]" />
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase text-slate-500 font-semibold tracking-wider">Total Leads</span>
            <div className="p-2 rounded-sm bg-slate-100 text-[#0F1E2E] border border-slate-200 group-hover:scale-105 transition-transform">
              <Users className="h-4 w-4" aria-hidden="true" strokeWidth={2} />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-3xl font-bold font-mono text-[#0F1E2E]">
              {loading ? '-' : metrics.total_leads}
            </div>
            <div className="text-[11px] text-slate-500 font-mono font-semibold mt-1 flex items-center justify-between">
              <span>Lifetime client intake volume</span>
              <ArrowUpRight className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </div>
        </Link>

        {/* 3. Leads In Progress */}
        <Link 
          to="/admin/leads?status=In Progress" 
          className="group block bg-white rounded-md p-5 border border-slate-200 hover:border-sky-400 hover:shadow-sm transition-all relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-1 h-full bg-sky-600" />
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase text-slate-500 font-semibold tracking-wider">Leads In Progress</span>
            <div className="p-2 rounded-sm bg-sky-50 text-sky-700 border border-sky-200 group-hover:scale-105 transition-transform">
              <Clock className="h-4 w-4" aria-hidden="true" strokeWidth={2} />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-3xl font-bold font-mono text-[#0F1E2E]">
              {loading ? '-' : metrics.in_progress_leads}
            </div>
            <div className="text-[11px] text-sky-700 font-mono font-semibold mt-1 flex items-center justify-between">
              <span>Under active investigator engagement</span>
              <ArrowUpRight className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </div>
        </Link>

        {/* 4. Converted Leads */}
        <Link 
          to="/admin/leads?status=Converted" 
          className="group block bg-white rounded-md p-5 border border-slate-200 hover:border-emerald-400 hover:shadow-sm transition-all relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-1 h-full bg-emerald-600" />
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase text-slate-500 font-semibold tracking-wider">Converted Leads</span>
            <div className="p-2 rounded-sm bg-emerald-50 text-emerald-700 border border-emerald-200 group-hover:scale-105 transition-transform">
              <CheckCircle2 className="h-4 w-4" aria-hidden="true" strokeWidth={2} />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-3xl font-bold font-mono text-[#0F1E2E]">
              {loading ? '-' : metrics.converted_leads}
            </div>
            <div className="text-[11px] text-emerald-700 font-mono font-semibold mt-1 flex items-center justify-between">
              <span>{conversionRate}% Conversion Rate</span>
              <ArrowUpRight className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </div>
        </Link>

        {/* 5. Contact Messages */}
        <div className="bg-white rounded-md p-5 border border-slate-200 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full bg-indigo-600" />
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase text-slate-500 font-semibold tracking-wider">Contact Messages</span>
            <div className="p-2 rounded-sm bg-indigo-50 text-indigo-700 border border-indigo-200">
              <Mail className="h-4 w-4" aria-hidden="true" strokeWidth={2} />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-3xl font-bold font-mono text-[#0F1E2E]">
              {loading ? '-' : metrics.contact_messages}
            </div>
            <div className="text-[11px] text-indigo-700 font-mono font-semibold mt-1 flex items-center justify-between">
              <span>General inquiries & briefings</span>
            </div>
          </div>
        </div>

        {/* 6. Published Services */}
        <Link 
          to="/admin/services" 
          className="group block bg-white rounded-md p-5 border border-slate-200 hover:border-slate-400 hover:shadow-sm transition-all relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-1 h-full bg-[#0F1E2E]" />
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase text-slate-500 font-semibold tracking-wider">Published Services</span>
            <div className="p-2 rounded-sm bg-slate-100 text-[#0F1E2E] border border-slate-200 group-hover:scale-105 transition-transform">
              <BriefcaseBusiness className="h-4 w-4" aria-hidden="true" strokeWidth={2} />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-3xl font-bold font-mono text-[#0F1E2E]">
              {loading ? '-' : metrics.published_services}
            </div>
            <div className="text-[11px] text-slate-600 font-mono font-semibold mt-1 flex items-center justify-between">
              <span>Disciplines in active catalog</span>
              <ArrowUpRight className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </div>
        </Link>
      </div>

      {/* Funnel Pipeline & Quick Operations Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pipeline Distribution Card */}
        <div className="lg:col-span-2 bg-white rounded-md p-6 border border-slate-200 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="text-sm font-bold text-[#0F1E2E] font-mono">Intake Lifecycle & Pipeline Distribution</h3>
              <p className="text-xs text-slate-500">Live breakdown of consultation intake by workflow stage</p>
            </div>
            <Badge variant="outline" className="text-[10px] font-mono">
              {metrics.total_leads} Total
            </Badge>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
            <div className="p-3 rounded-sm bg-amber-50/50 border border-amber-200/60">
              <div className="text-[10px] font-mono uppercase text-amber-800 font-semibold">New Unassigned</div>
              <div className="text-xl font-bold font-mono text-[#0F1E2E] mt-1">{metrics.new_leads}</div>
              <div className="text-[10px] text-slate-500 font-mono">
                {metrics.total_leads > 0 ? ((metrics.new_leads / metrics.total_leads) * 100).toFixed(0) : 0}% of intake
              </div>
            </div>

            <div className="p-3 rounded-sm bg-slate-50 border border-slate-200">
              <div className="text-[10px] font-mono uppercase text-slate-600 font-semibold">Contacted</div>
              <div className="text-xl font-bold font-mono text-[#0F1E2E] mt-1">{metrics.contacted_leads || 0}</div>
              <div className="text-[10px] text-slate-500 font-mono">Initial brief sent</div>
            </div>

            <div className="p-3 rounded-sm bg-sky-50/50 border border-sky-200/60">
              <div className="text-[10px] font-mono uppercase text-sky-800 font-semibold">In Progress</div>
              <div className="text-xl font-bold font-mono text-[#0F1E2E] mt-1">{metrics.in_progress_leads}</div>
              <div className="text-[10px] text-slate-500 font-mono">Active evaluation</div>
            </div>

            <div className="p-3 rounded-sm bg-emerald-50/50 border border-emerald-200/60">
              <div className="text-[10px] font-mono uppercase text-emerald-800 font-semibold">Converted / Retained</div>
              <div className="text-xl font-bold font-mono text-[#0F1E2E] mt-1">{metrics.converted_leads}</div>
              <div className="text-[10px] text-emerald-700 font-mono font-semibold">{conversionRate}% success</div>
            </div>

            <div className="p-3 rounded-sm bg-slate-50 border border-slate-200">
              <div className="text-[10px] font-mono uppercase text-slate-600 font-semibold">Closed Cases</div>
              <div className="text-xl font-bold font-mono text-[#0F1E2E] mt-1">{metrics.closed_leads || 0}</div>
              <div className="text-[10px] text-slate-500 font-mono">Completed dossiers</div>
            </div>

            <div className="p-3 rounded-sm bg-rose-50/50 border border-rose-200/60">
              <div className="text-[10px] font-mono uppercase text-rose-800 font-semibold">Spam Filtered</div>
              <div className="text-xl font-bold font-mono text-[#0F1E2E] mt-1">{metrics.spam_leads || 0}</div>
              <div className="text-[10px] text-rose-700 font-mono">Automated shield</div>
            </div>
          </div>
        </div>

        {/* Security & System Readiness Card */}
        <div className="bg-white rounded-md p-6 border border-slate-200 space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-[#0F1E2E]">
              <ShieldCheck className="h-5 w-5 text-[#D4AF37]" />
              <h3 className="text-sm font-bold font-mono">Security & Operations Protocol</h3>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Antigravity active encryption and verified chain-of-custody logging.
            </p>

            <div className="mt-4 space-y-2 text-xs font-mono">
              <div className="flex items-center justify-between p-2 rounded-sm bg-slate-50 border border-slate-200">
                <span className="text-slate-600">NDA Enforceability:</span>
                <span className="text-emerald-700 font-bold">100% Active</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-sm bg-slate-50 border border-slate-200">
                <span className="text-slate-600">Audit Trail:</span>
                <span className="text-[#0F1E2E] font-bold">SHA-256 Immutable</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-sm bg-slate-50 border border-slate-200">
                <span className="text-slate-600">Intake Latency SLA:</span>
                <span className="text-emerald-700 font-bold">&lt; 15 mins</span>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
            <Link to="/admin/settings" className="text-xs font-mono font-bold text-[#0F1E2E] hover:text-[#997B24] flex items-center gap-1 transition-colors">
              Security Settings <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
            <Link to="/admin/services/new">
              <Button variant="secondary" size="sm" className="text-xs font-mono">
                <PlusCircle className="h-3 w-3 mr-1" /> New Service
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Recent Leads Preview Table */}
      <div className="bg-white rounded-md p-6 border border-slate-200 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-[#0F1E2E] font-mono">Latest Inbound Consultation Dossiers</h3>
            <p className="text-xs text-slate-500">Recently logged confidential submissions</p>
          </div>
          <Link to="/admin/leads" className="text-xs font-mono font-bold text-[#0F1E2E] hover:text-[#997B24] flex items-center gap-1 transition-colors">
            Manage All Leads <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" strokeWidth={2} />
          </Link>
        </div>

        {loading ? (
          <div className="space-y-3">
            <CardSkeleton className="bg-slate-50 border-slate-200" />
            <CardSkeleton className="bg-slate-50 border-slate-200" />
          </div>
        ) : !data?.recent_leads || data.recent_leads.length === 0 ? (
          <div className="p-8 text-center text-slate-500 font-mono text-xs border border-dashed border-slate-200 rounded-sm">
            No recent consultation leads recorded.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-slate-200 text-slate-500 font-mono uppercase text-[10px] bg-slate-50">
                <tr>
                  <th className="py-2.5 px-3">Lead / Client</th>
                  <th className="py-2.5 px-3">Discipline</th>
                  <th className="py-2.5 px-3">Location</th>
                  <th className="py-2.5 px-3">Status</th>
                  <th className="py-2.5 px-3">Assigned Officer</th>
                  <th className="py-2.5 px-3">Logged Date</th>
                  <th className="py-2.5 px-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {data.recent_leads.map((lead: Lead) => (
                  <tr key={lead.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-3">
                      <div className="font-bold text-[#0F1E2E]">{lead.full_name}</div>
                      <div className="text-[11px] text-slate-500 font-mono">{lead.email}</div>
                    </td>
                    <td className="py-3 px-3">
                      <div className="text-slate-800 font-semibold">{lead.service_type || 'General Consultation'}</div>
                      <div className="text-[10px] text-slate-500 font-mono line-clamp-1">{lead.message}</div>
                    </td>
                    <td className="py-3 px-3 text-slate-700 font-mono text-xs">
                      {lead.city || 'N/A'}
                    </td>
                    <td className="py-3 px-3">
                      <Badge variant={getStatusBadgeVariant(lead.status)} className="text-[10px] font-mono">
                        {lead.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-3 font-mono text-xs text-slate-700">
                      {lead.assigned_admin_name || <span className="text-slate-400 italic">Unassigned</span>}
                    </td>
                    <td className="py-3 px-3 font-mono text-slate-500 text-[11px]">
                      {formatDate(lead.created_at)}
                    </td>
                    <td className="py-3 px-3 text-right">
                      <Link to={`/admin/leads?id=${lead.id}`}>
                        <Button variant="outline" size="sm" className="text-[10px] h-7 border-slate-300 text-slate-700 hover:bg-slate-100 font-mono">
                          Review
                        </Button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Audit Log Activity Feed */}
      {data?.recent_audit_logs && data.recent_audit_logs.length > 0 && (
        <div className="bg-white rounded-md p-6 border border-slate-200 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <History className="h-4 w-4 text-[#997B24]" />
              <h3 className="text-sm font-bold text-[#0F1E2E] font-mono">Recent Audit Trail</h3>
            </div>
            <span className="text-[10px] font-mono text-slate-500 uppercase">Tamper-Proof Log</span>
          </div>

          <div className="space-y-2">
            {data.recent_audit_logs.slice(0, 5).map((log: any, idx: number) => (
              <div key={log.id || idx} className="p-2.5 rounded-sm bg-slate-50 border border-slate-200 flex items-center justify-between text-xs font-mono">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-[10px] uppercase">
                    {log.action || log.event || 'ACTION'}
                  </Badge>
                  <span className="text-slate-700">Entity: <strong>{log.entity_type || 'SYSTEM'} #{log.entity_id || ''}</strong></span>
                </div>
                <div className="text-slate-500 text-[11px]">
                  {formatDate(log.created_at)}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminDashboardPage;
