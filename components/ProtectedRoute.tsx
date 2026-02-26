import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@/contexts/AuthContext';
import SciFiLoader from '@/components/SciFiLoader';

interface ProtectedRouteProps {
  children: React.ReactNode;
  /** If set, only users with this project in visibleProjects (or admin) can access */
  projectSlug?: string;
  /** If set, only this role can access (e.g. 'admin') */
  requiredRole?: 'admin' | 'user';
}

export default function ProtectedRoute({ children, projectSlug, requiredRole }: ProtectedRouteProps) {
  const { isAuthenticated, loading, user, isAdmin, visibleProjects } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;
    if (!isAuthenticated) {
      router.push('/');
      return;
    }
    if (requiredRole === 'admin' && !isAdmin) {
      router.push('/');
      return;
    }
    if (projectSlug && !isAdmin) {
      const allowed = Array.isArray(visibleProjects) && visibleProjects.includes(projectSlug);
      if (!allowed) {
        router.push('/');
        return;
      }
    }
  }, [isAuthenticated, loading, router, requiredRole, isAdmin, projectSlug, visibleProjects]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <SciFiLoader label="VERIFYING ACCESS" size="lg" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  if (requiredRole === 'admin' && !isAdmin) {
    return null;
  }

  if (projectSlug && !isAdmin) {
    const allowed = Array.isArray(visibleProjects) && visibleProjects.includes(projectSlug);
    if (!allowed) return null;
  }

  return <>{children}</>;
}
