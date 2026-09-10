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

const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain an uppercase letter')
    .regex(/[0-9]/, 'Password must contain a number'),
  phone: z.string().optional(),
});

type RegisterFormValues = z.infer<typeof registerSchema>;

export function RegisterPage() {
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const { register: signup, loading } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormValues) => {
    setErrorMsg(null);
    try {
      await signup({
        name: data.name,
        email: data.email,
        password: data.password,
        phone: data.phone,
        role: 'client',
      });
      navigate('/portal');
    } catch (err: any) {
      setErrorMsg(err.message || 'Registration failed. Please review fields.');
    }
  };

  return (
    <div className="rounded-md p-6 sm:p-8 space-y-5 bg-white border border-slate-300 shadow-none text-slate-800">
      <div className="space-y-1 text-center">
        <h3 className="text-xl font-bold text-[#0F1E2E]">Register Client Profile</h3>
        <p className="text-xs text-slate-500">
          Create an encrypted client account to manage active investigation dossiers
        </p>
      </div>

      {errorMsg && (
        <Alert variant="destructive" title="Registration Error">
          {errorMsg}
        </Alert>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          label="Full Name / Legal Representative"
          placeholder="Eleanor Vance, Legal Counsel"
          theme="light"
          error={errors.name?.message}
          {...register('name')}
        />

        <Input
          label="Confidential Email"
          type="email"
          placeholder="client@enterprise.com"
          theme="light"
          error={errors.email?.message}
          {...register('email')}
        />

        <Input
          label="Secure Phone (Optional)"
          placeholder="+1 (555) 012-3456"
          theme="light"
          error={errors.phone?.message}
          {...register('phone')}
        />

        <Input
          label="Access Password (Min 8 chars, 1 uppercase, 1 number)"
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
          Create Encrypted Profile <ArrowRight className="h-4 w-4 ml-1.5" aria-hidden="true" strokeWidth={2} />
        </PrimaryButton>
      </form>

      <div className="pt-2 text-center text-xs text-slate-500 font-mono">
        <span>Already registered? </span>
        <Link to="/login" className="text-[#0F1E2E] hover:underline font-semibold">
          Log In
        </Link>
      </div>
    </div>
  );
}

export default RegisterPage;
