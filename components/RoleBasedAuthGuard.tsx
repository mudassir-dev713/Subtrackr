'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Loader from './Loader';

interface RoleBasedAuthGuardProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  requiredRole?: string;
  allowedRoles?: string[];
}

export default function RoleBasedAuthGuard({
  children,
  fallback,
  requiredRole,
  allowedRoles,
}: RoleBasedAuthGuardProps) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  // Show loading while checking authentication
  if (status === 'loading') {
    return fallback || <Loader />;
  }

  // Don't render anything if not authenticated
  if (status === 'unauthenticated') {
    return null;
  }

  // Check role-based access
  if (session?.user?.role) {
    const userRole = session.user.role;

    // Check for specific required role
    if (requiredRole && userRole !== requiredRole) {
      return (
        <div className='flex items-center justify-center min-h-screen'>
          <div className='text-center'>
            <h2 className='text-2xl font-bold text-red-600 mb-2'>
              Access Denied
            </h2>
            <p className='text-muted-foreground'>
              You don't have permission to access this page.
            </p>
          </div>
        </div>
      );
    }

    // Check for allowed roles array
    if (allowedRoles && !allowedRoles.includes(userRole)) {
      return (
        <div className='flex items-center justify-center min-h-screen'>
          <div className='text-center'>
            <h2 className='text-2xl font-bold text-red-600 mb-2'>
              Access Denied
            </h2>
            <p className='text-muted-foreground'>
              You don't have permission to access this page.
            </p>
          </div>
        </div>
      );
    }
  }

  // Render children if authenticated and authorized
  return <>{children}</>;
}
