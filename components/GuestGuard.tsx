'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Loader from './Loader';

interface GuestGuardProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  redirectTo?: string;
}

export default function GuestGuard({
  children,
  fallback,
  redirectTo = '/dashboard',
}: GuestGuardProps) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'authenticated') {
      router.push(redirectTo);
    }
  }, [status, router, redirectTo]);

  // Show loading while checking authentication
  if (status === 'loading') {
    return fallback || <Loader />;
  }

  // Don't render anything if authenticated (will redirect)
  if (status === 'authenticated') {
    return null;
  }

  // Render children if not authenticated (guest user)
  return <>{children}</>;
}
