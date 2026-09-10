import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ArrowRight } from 'lucide-react';
import { PrimaryButton } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Alert } from '../components/ui/alert';
import { useAuth } from '../hooks/useAuth';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export function LoginPage() {
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const { login, loading } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    setErrorMsg(null);
    try {
      await login(data);
      navigate('/portal');
    } catch (err: any) {
      setErrorMsg(err.message || 'Authentication failed. Invalid credentials.');
    }
  };

  const fillDemoClient = () => {
    setValue('email', 'client@seekproof.com');
    setValue('password', 'ClientPass2026!');
  };

  const fillDemoAdmin = () => {
    setValue('email', 'demo@seekproof.com');
    setValue('password', 'Investigate2026!');
  };

  return (
    <div className="rounded-md p-6 sm:p-8 space-y-5 bg-white border border-slate-300 shadow-none text-slate-800">
      <div className="space-y-1 text-center">
        <h3 className="text-xl font-bold text-[#0F1E2E]">Client Portal Authentication</h3>
        <p className="text-xs text-slate-500">
          Enter credentials to access active case evidence & logs
        </p>
      </div>

      {errorMsg && (
        <Alert variant="destructive" title="Authentication Rejected">
          {errorMsg}
        </Alert>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          label="Client / Investigator Email"
          type="email"
          placeholder="name@agency.com"
          theme="light"
          error={errors.email?.message}
          {...register('email')}
        />

        <Input
          label="Secure Access Key / Password"
          type="password"
          placeholder="••••••••••••"
          theme="light"
          error={errors.password?.message}
          {...register('password')}
        />

        <PrimaryButton
          type="submit"
          size="md"
          isLoading={loading}
          className="w-full font-mono text-xs uppercase tracking-wider mt-2 rounded-sm shadow-none"
        >
          Authenticate Session <ArrowRight className="h-4 w-4 ml-1.5" aria-hidden="true" strokeWidth={2} />
        </PrimaryButton>
      </form>

      {/* Demo Credential Quick-Fill */}
      <div className="pt-3 border-t border-slate-200 space-y-2">
        <div className="text-[11px] font-mono text-slate-500 text-center uppercase tracking-wider font-semibold">
          Quick Test Credentials (Dev Mode):
        </div>
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={fillDemoClient}
            className="px-2.5 py-1.5 rounded-sm text-[11px] font-mono bg-slate-50 border border-slate-200 text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            Demo Client
          </button>
          <button
            type="button"
            onClick={fillDemoAdmin}
            className="px-2.5 py-1.5 rounded-sm text-[11px] font-mono bg-slate-50 border border-slate-200 text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            Demo Investigator
          </button>
        </div>
      </div>

      <div className="pt-2 text-center text-xs text-slate-500 font-mono">
        <span>Need new client access? </span>
        <Link to="/register" className="text-[#0F1E2E] hover:underline font-semibold">
          Register Account
        </Link>
      </div>
    </div>
  );
}

export default LoginPage;
