import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { UserRole } from '../../types';

interface AdminProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: UserRole[];
}

const DEFAULT_ADMIN_ROLES: UserRole[] = ['super_admin', 'manager', 'staff', 'admin', 'investigator'];

export function AdminProtectedRoute({ children, allowedRoles = DEFAULT_ADMIN_ROLES }: AdminProtectedRouteProps) {
  const { user, isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center space-y-3 text-slate-800 font-mono text-xs">
        <div className="h-6 w-6 rounded-full border-2 border-[#0F1E2E] border-t-transparent animate-spin" />
        <div>Verifying Administrative Security Clearance...</div>
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  // Super admin always bypasses specific sub-role restrictions
  if (user.role === 'super_admin') {
    return <>{children}</>;
  }

  // Check if user's role is permitted
  if (!allowedRoles.includes(user.role)) {
    // If authenticated as client, redirect to client portal; otherwise to dashboard
    if (user.role === 'client') {
      return <Navigate to="/portal" replace />;
    }
    return <Navigate to="/admin" replace />;
  }

  return <>{children}</>;
}

