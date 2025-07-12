import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl;
    const token = req.nextauth.token;

    // If user is authenticated and trying to access login/signup pages, redirect to dashboard
    if (token && (pathname === '/login' || pathname === '/signup')) {
      return NextResponse.redirect(new URL('/dashboard', req.url));
    }

    // Add any additional middleware logic here if needed
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl;

        // For login/signup pages, allow access regardless of authentication status
        // The middleware function above will handle redirects for authenticated users
        if (pathname === '/login' || pathname === '/signup') {
          return true;
        }

        // For protected routes, require authentication
        return !!token;
      },
    },
    pages: {
      signIn: '/login',
    },
  }
);

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/api/subscriptions/:path*',
    '/api/reminders/:path*',
    '/api/settings/:path*',
    '/api/team/:path*',
    '/login',
    '/signup',
  ],
};
