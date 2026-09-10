import { Outlet, Link } from 'react-router-dom';
import { ShieldCheck, LockKeyhole } from 'lucide-react';
import { Container } from '../components/ui/Container';

export function AuthLayout() {
  return (
    <div className="flex min-h-screen flex-col justify-center bg-[#F8FAFC] py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden text-slate-800">
      <Container size="sm" className="relative z-10 text-center space-y-4">
        <Link to="/" className="inline-flex items-center gap-3 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-sm bg-white border border-slate-300 shadow-none">
            <ShieldCheck className="h-5 w-5 text-[#0F1E2E]" aria-hidden="true" strokeWidth={2} />
          </div>
        </Link>
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-[#0F1E2E] font-mono">
            SEEK<span className="text-slate-600">PROOF</span>
          </h2>
          <div className="flex items-center justify-center gap-1.5 text-xs text-slate-500 font-mono mt-1">
            <LockKeyhole className="h-3.5 w-3.5 text-slate-500" aria-hidden="true" strokeWidth={2} />
            <span>Encrypted Investigation Portal Access</span>
          </div>
        </div>
      </Container>

      <Container size="sm" className="mt-6 relative z-10">
        <Outlet />
      </Container>

      <Container size="sm" className="mt-8 text-center text-xs text-slate-500 font-mono relative z-10 space-y-1">
        <p className="font-semibold text-slate-700">Authorized Clients & Operatives Only</p>
        <p className="text-slate-500 text-[11px]">All session attempts are logged under cryptographic security protocols.</p>
      </Container>
    </div>
  );
}

export default AuthLayout;
