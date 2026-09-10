import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { ShieldCheck, LayoutDashboard, FileSearch, ShieldAlert, LogOut, ArrowLeft, LockKeyhole } from 'lucide-react';
import { Button } from '../components/ui/button';
import { useAuth } from '../hooks/useAuth';

export function DashboardLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navItems = [
    { label: 'Active Dossiers', path: '/portal', icon: <LayoutDashboard className="h-4 w-4" aria-hidden="true" strokeWidth={2} /> },
    { label: 'Submit New Brief', path: '/contact', icon: <FileSearch className="h-4 w-4" aria-hidden="true" strokeWidth={2} /> },
  ];

  return (
    <div className="flex min-h-screen bg-[#F8FAFC] text-slate-800">
      {/* Sidebar */}
      <aside className="w-64 border-r border-slate-200 bg-white flex flex-col justify-between p-4 shrink-0 hidden md:flex">
        <div className="space-y-6">
          <Link to="/" className="flex items-center gap-2.5 px-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-sm bg-slate-50 border border-slate-300">
              <ShieldCheck className="h-4 w-4 text-[#0F1E2E]" aria-hidden="true" strokeWidth={2} />
            </div>
            <div>
              <span className="text-sm font-bold text-[#0F1E2E] font-mono tracking-tight">
                SEEK<span className="text-slate-500">PROOF</span>
              </span>
              <span className="block text-[9px] uppercase font-mono tracking-widest text-slate-500">
                Client Portal
              </span>
            </div>
          </Link>

          <div className="p-3 rounded-sm border border-slate-200 bg-[#F8FAFC]">
            <div className="text-[10px] uppercase font-mono tracking-wider text-slate-500 font-semibold">Authorized Profile</div>
            <div className="font-semibold text-sm text-[#0F1E2E] truncate mt-0.5">{user?.name || 'Authorized Client'}</div>
            <div className="text-xs text-slate-600 font-mono flex items-center gap-1 mt-1">
              <LockKeyhole className="h-3 w-3 text-slate-500" aria-hidden="true" strokeWidth={2} /> Tier: {user?.agency_tier || 'Priority'}
            </div>
          </div>

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

        <div className="space-y-2 pt-4 border-t border-slate-200">
          <Link to="/">
            <Button variant="ghost" size="sm" className="w-full justify-start gap-2 text-xs text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-sm">
              <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" strokeWidth={2} /> Back to Main Site
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

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 border-b border-slate-200 bg-white flex items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <ShieldAlert className="h-4 w-4 text-[#0F1E2E]" aria-hidden="true" strokeWidth={2} />
            <span className="text-xs font-mono uppercase tracking-wider text-slate-700 font-semibold">
              Encrypted Investigation Workspace
            </span>
          </div>
          <div className="flex items-center gap-4 text-xs font-mono text-slate-500">
            <span className="hidden sm:inline">User ID: <span className="text-slate-800 font-semibold">{user?.id?.substring(0, 12) || 'SEC-092'}</span></span>
            <Link to="/" className="md:hidden">
              <Button variant="ghost" size="sm" className="rounded-sm text-xs">Main Site</Button>
            </Link>
          </div>
        </header>

        <main className="flex-1 p-6 md:p-8 overflow-y-auto bg-[#F8FAFC]">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;
