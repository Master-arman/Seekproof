import { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Shield, ArrowRight, ShieldAlert } from 'lucide-react';
import { Input } from '../../components/ui/input';
import { PrimaryButton } from '../../components/ui/button';
import { Alert } from '../../components/ui/alert';
import { useAuth } from '../../hooks/useAuth';

const adminLoginSchema = z.object({
  email: z.string().email('Please enter a valid administrator email'),
  password: z.string().min(1, 'Password is required'),
});

type AdminLoginFormValues = z.infer<typeof adminLoginSchema>;

export function AdminLoginPage() {
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const { login, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/admin';

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<AdminLoginFormValues>({
    resolver: zodResolver(adminLoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: AdminLoginFormValues) => {
    setErrorMsg(null);
    try {
      const result = await login(data);
      const allowedAdminRoles = ['super_admin', 'manager', 'staff', 'admin', 'investigator'];
      if (!allowedAdminRoles.includes(result.user.role)) {
        setErrorMsg('Access denied: Your account lacks administrative clearance privileges.');
        return;
      }
      navigate(from, { replace: true });
    } catch (err: any) {
      setErrorMsg(err.message || 'Authentication failed: Invalid security credentials.');
    }
  };

  const fillRole = (email: string) => {
    setValue('email', email);
    setValue('password', 'Investigate2026!');
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col justify-center items-center px-4 py-16 text-slate-900 relative">
      <div className="w-full max-w-md space-y-6 relative z-10">
        {/* Header Branding */}
        <div className="text-center space-y-3">
          <Link to="/" className="inline-flex items-center gap-3 group">
            <div className="flex h-12 w-12 items-center justify-center rounded-sm bg-[#0F1E2E] text-white shadow-none">
              <Shield className="h-6 w-6 text-[#D4AF37]" />
            </div>
          </Link>
          <div>
            <h1 className="text-2xl font-bold font-mono tracking-tight text-[#0F1E2E]">
              SEEK<span className="text-[#D4AF37]">PROOF</span>
            </h1>
            <div className="text-xs font-mono uppercase tracking-widest text-[#0F1E2E] flex items-center justify-center gap-1.5 mt-1 font-bold">
              <ShieldAlert className="h-3.5 w-3.5 text-[#D4AF37]" />
              <span>Administrative Command Console</span>
            </div>
          </div>
        </div>

        {/* Card */}
        <div className="rounded-md p-6 sm:p-8 space-y-5 bg-white border border-slate-200">
          <div className="space-y-1 text-center">
            <h2 className="text-lg font-bold text-[#0F1E2E]">Officer Authentication</h2>
            <p className="text-xs text-slate-500">
              Enter clearance credentials to access intake leads, services & agency consoles
            </p>
          </div>

          {errorMsg && (
            <Alert variant="destructive" title="Security Access Rejected">
              {errorMsg}
            </Alert>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input
              label="Investigator ID / Email"
              type="email"
              placeholder="officer@seekproof.com"
              error={errors.email?.message}
              {...register('email')}
            />

            <Input
              label="Security Access Key"
              type="password"
              placeholder="••••••••••••"
              error={errors.password?.message}
              {...register('password')}
            />

            <PrimaryButton
              type="submit"
              size="md"
              isLoading={loading}
              className="w-full font-mono text-xs uppercase tracking-wider mt-2"
            >
              Authorize Terminal <ArrowRight className="h-4 w-4 ml-1.5" />
            </PrimaryButton>
          </form>

          {/* Quick Demo Credentials for Role-Based Access Control */}
          <div className="pt-3 border-t border-slate-200 space-y-2">
            <div className="text-[11px] font-mono text-slate-500 text-center uppercase tracking-wider">
              Test Security Roles:
            </div>
            <div className="grid grid-cols-3 gap-1.5">
              <button
                type="button"
                onClick={() => fillRole('superadmin@seekproof.com')}
                className="py-1.5 px-2 rounded-sm text-[11px] font-mono bg-slate-50 border border-slate-200 text-[#0F1E2E] hover:bg-slate-100 transition-colors cursor-pointer font-bold truncate"
                title="Super Admin (Full Access)"
              >
                Super Admin
              </button>
              <button
                type="button"
                onClick={() => fillRole('manager@seekproof.com')}
                className="py-1.5 px-2 rounded-sm text-[11px] font-mono bg-slate-50 border border-slate-200 text-[#0F1E2E] hover:bg-slate-100 transition-colors cursor-pointer font-bold truncate"
                title="Manager (Leads & Services)"
              >
                Manager
              </button>
              <button
                type="button"
                onClick={() => fillRole('staff@seekproof.com')}
                className="py-1.5 px-2 rounded-sm text-[11px] font-mono bg-slate-50 border border-slate-200 text-[#0F1E2E] hover:bg-slate-100 transition-colors cursor-pointer font-bold truncate"
                title="Staff (View Only)"
              >
                Staff
              </button>
            </div>
          </div>
        </div>

        <div className="text-center text-xs text-slate-500 font-mono">
          <Link to="/" className="hover:text-slate-800 transition-colors">
            ← Return to Public Website
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AdminLoginPage;
