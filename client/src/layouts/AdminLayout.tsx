import { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  ShieldCheck, 
  LayoutDashboard, 
  Inbox, 
  FileText, 
  BriefcaseBusiness, 
  Settings, 
  LogOut, 
  ArrowLeft, 
  ShieldAlert, 
  Menu, 
  X, 
  ChevronRight,
  Bell
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { useAuth } from '../hooks/useAuth';

export function AdminLayout() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const role = user?.role || 'staff';
  const isSuperAdmin = role === 'super_admin' || role === 'admin';
  const isManagerOrAbove = isSuperAdmin || role === 'manager';

  const allNavItems = [
    { label: 'Intelligence Overview', path: '/admin', icon: <LayoutDashboard className="h-4 w-4" aria-hidden="true" strokeWidth={2} />, minRole: 'staff' },
    { label: 'Inbound Inquiries & Leads', path: '/admin/leads', icon: <Inbox className="h-4 w-4" aria-hidden="true" strokeWidth={2} />, minRole: 'staff' },
    { label: 'Client Testimonials', path: '/admin/testimonials', icon: <FileText className="h-4 w-4" aria-hidden="true" strokeWidth={2} />, minRole: 'manager' },
    { label: 'Investigation Services', path: '/admin/services', icon: <BriefcaseBusiness className="h-4 w-4" aria-hidden="true" strokeWidth={2} />, minRole: 'manager' },
    { label: 'Briefings & Articles', path: '/admin/blog', icon: <FileText className="h-4 w-4" aria-hidden="true" strokeWidth={2} />, minRole: 'manager' },
    { label: 'Agency & Security Settings', path: '/admin/settings', icon: <Settings className="h-4 w-4" aria-hidden="true" strokeWidth={2} />, minRole: 'super_admin' },
  ];

  const navItems = allNavItems.filter(item => {
    if (item.minRole === 'super_admin') return isSuperAdmin;
    if (item.minRole === 'manager') return isManagerOrAbove;
    return true;
  });

  const getRoleBadge = (roleName: string) => {
    switch (roleName) {
      case 'super_admin':
        return { label: 'SUPER ADMIN', color: 'bg-amber-100 text-amber-900 border-amber-300' };
      case 'manager':
        return { label: 'OPERATIONS MANAGER', color: 'bg-blue-100 text-blue-900 border-blue-300' };
      case 'staff':
        return { label: 'INTELLIGENCE STAFF', color: 'bg-emerald-100 text-emerald-900 border-emerald-300' };
      default:
        return { label: 'CHIEF INVESTIGATOR', color: 'bg-slate-100 text-[#0F1E2E] border-slate-300' };
    }
  };

  const roleInfo = getRoleBadge(role);

  return (
    <div className="flex min-h-screen bg-[#F8FAFC] text-slate-800">
      {/* Sidebar Desktop */}
      <aside className="w-64 border-r border-slate-200 bg-white flex flex-col justify-between p-4 shrink-0 hidden md:flex">
        <div className="space-y-6">
          {/* Logo Header */}
          <Link to="/admin" className="flex items-center gap-2.5 px-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-sm bg-[#0F1E2E] text-white">
              <ShieldCheck className="h-4 w-4 text-[#D4AF37]" aria-hidden="true" strokeWidth={2} />
            </div>
            <div>
              <span className="text-sm font-bold text-[#0F1E2E] font-mono tracking-tight">
                SEEK<span className="text-[#D4AF37]">PROOF</span>
              </span>
              <span className="block text-[9px] uppercase font-mono tracking-widest text-slate-500 font-semibold">
                Command Console
              </span>
            </div>
          </Link>

          {/* Operator Badge with Role Clearances */}
          <div className="p-3 rounded-sm border border-slate-200 bg-[#F8FAFC] space-y-1.5">
            <div className="text-[10px] uppercase font-mono tracking-wider text-slate-500 font-semibold">Officer Clearance</div>
            <div className="font-semibold text-sm text-[#0F1E2E] truncate">{user?.name || 'Authorized Officer'}</div>
            <div className="flex items-center gap-1.5">
              <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded-sm text-[10px] font-mono font-bold border ${roleInfo.color}`}>
                <ShieldAlert className="h-3 w-3" aria-hidden="true" strokeWidth={2} />
                {roleInfo.label}
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            {navItems.map((item) => {
              const active = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-3 py-2 rounded-sm text-xs font-semibold font-mono tracking-wide transition-colors ${
                    active
                      ? 'bg-slate-100 text-[#0F1E2E] border border-slate-300'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  {item.icon}
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Actions */}
        <div className="space-y-2 pt-4 border-t border-slate-200">
          <Link to="/">
            <Button variant="ghost" size="sm" className="w-full justify-start gap-2 text-xs text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-sm">
              <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" strokeWidth={2} /> View Public Site
            </Button>
          </Link>
          <Button
            variant="outline"
            size="sm"
            onClick={handleLogout}
            className="w-full justify-start gap-2 text-xs text-rose-700 border-rose-200 hover:bg-rose-50 rounded-sm"
          >
            <LogOut className="h-3.5 w-3.5" aria-hidden="true" strokeWidth={2} /> Terminate Session
          </Button>
        </div>
      </aside>

      {/* Main Column */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="h-16 border-b border-slate-200 bg-white flex items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              aria-label="Toggle navigation menu"
              className="md:hidden p-2 rounded-sm text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            >
              <Menu className="h-5 w-5" aria-hidden="true" strokeWidth={2} />
            </button>
            <div className="flex items-center gap-2 text-xs font-mono text-slate-500">
              <span className="hidden sm:inline">SeekProof Intelligence</span>
              <ChevronRight className="h-3 w-3 text-slate-400 hidden sm:inline" aria-hidden="true" strokeWidth={2} />
              <span className="text-[#0F1E2E] font-semibold uppercase">
                {location.pathname.replace('/admin', '') || 'Dashboard'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Badge variant="outline" className="hidden sm:inline-flex text-[10px] rounded-sm">
              Encrypted Session
            </Badge>
            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              className="text-xs text-slate-700 border-slate-300 hover:bg-slate-100 rounded-sm"
            >
              Sign Out
            </Button>
          </div>
        </header>

        {/* Content Body */}
        <main className="flex-1 p-6 sm:p-8 overflow-y-auto bg-[#F8FAFC]">
          <Outlet />
        </main>
      </div>

      {/* Mobile Drawer */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          <div className="fixed inset-0 bg-black/40" onClick={() => setSidebarOpen(false)} />
          <div className="relative w-72 bg-white border-r border-slate-200 p-4 flex flex-col justify-between z-10">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-base font-bold text-[#0F1E2E] font-mono">
                  SEEK<span className="text-slate-500">PROOF</span>
                </span>
                <button
                  onClick={() => setSidebarOpen(false)}
                  aria-label="Close navigation menu"
                  className="p-1 text-slate-500 hover:text-slate-900"
                >
                  <X className="h-5 w-5" aria-hidden="true" strokeWidth={2} />
                </button>
              </div>

              <nav className="space-y-1">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setSidebarOpen(false)}
                    className="flex items-center gap-3 px-3 py-2 rounded-sm text-xs font-mono text-slate-700 hover:text-slate-900 hover:bg-slate-100"
                  >
                    {item.icon}
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>

            <div className="pt-4 border-t border-slate-200 space-y-2">
              <Link to="/" onClick={() => setSidebarOpen(false)}>
                <Button variant="ghost" size="sm" className="w-full justify-start text-xs text-slate-600 rounded-sm">
                  Main Site
                </Button>
              </Link>
              <Button variant="outline" size="sm" onClick={handleLogout} className="w-full justify-start text-xs text-rose-700 border-rose-200 rounded-sm">
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminLayout;
