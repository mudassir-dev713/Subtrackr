# 🔒 AuthGuard Usage Guide

## Overview

The AuthGuard components provide authentication and authorization protection for your React components and pages. There are three main components:

1. **AuthGuard** - Basic authentication protection (requires login)
2. **GuestGuard** - Guest-only protection (prevents logged-in users)
3. **RoleBasedAuthGuard** - Authentication + role-based authorization

## GuestGuard Usage (NEW!)

### 1. Basic Guest Protection

```tsx
import GuestGuard from '@/components/GuestGuard';

function LoginPage() {
  return (
    <GuestGuard>
      <div>This content is only visible to non-authenticated users</div>
    </GuestGuard>
  );
}
```

### 2. With Custom Redirect

```tsx
<GuestGuard redirectTo='/dashboard'>
  <div>Login form</div>
</GuestGuard>
```

### 3. With Custom Loading State

```tsx
<GuestGuard
  fallback={
    <div className='flex items-center justify-center p-8'>
      <p>Checking authentication...</p>
    </div>
  }
>
  <div>Signup form</div>
</GuestGuard>
```

### 4. Login/Signup Page Protection

```tsx
// app/login/page.tsx
'use client';

import GuestGuard from '@/components/GuestGuard';

export default function LoginPage() {
  return (
    <GuestGuard>
      <div className='min-h-screen bg-background'>
        {/* Your login form content */}
        <h1>Login</h1>
        <form>...</form>
      </div>
    </GuestGuard>
  );
}
```

## Basic AuthGuard Usage

### 1. Simple Component Protection

```tsx
import AuthGuard from '@/components/AuthGuard';

function MyProtectedComponent() {
  return (
    <AuthGuard>
      <div>This content is only visible to authenticated users</div>
    </AuthGuard>
  );
}
```

### 2. With Custom Loading State

```tsx
import AuthGuard from '@/components/AuthGuard';

function MyComponent() {
  return (
    <AuthGuard
      fallback={
        <div className='flex items-center justify-center p-8'>
          <p>Checking authentication...</p>
        </div>
      }
    >
      <div>Protected content</div>
    </AuthGuard>
  );
}
```

### 3. Page-Level Protection

```tsx
// app/dashboard/settings/page.tsx
'use client';

import AuthGuard from '@/components/AuthGuard';

export default function SettingsPage() {
  return (
    <div className='container mx-auto p-6'>
      <h1>Settings</h1>

      <AuthGuard>
        <div className='mt-6'>
          {/* All your settings content here */}
          <p>Settings content...</p>
        </div>
      </AuthGuard>
    </div>
  );
}
```

### 4. Conditional Content

```tsx
function HomePage() {
  return (
    <div>
      <h1>Welcome to SubTrackr</h1>

      {/* Public content */}
      <p>This is visible to everyone</p>

      {/* Protected content */}
      <AuthGuard>
        <div className='mt-6'>
          <h2>Your Dashboard</h2>
          <p>Only authenticated users see this</p>
        </div>
      </AuthGuard>
    </div>
  );
}
```

## Role-Based AuthGuard Usage

### 1. Require Specific Role

```tsx
import RoleBasedAuthGuard from '@/components/RoleBasedAuthGuard';

function AdminOnlyComponent() {
  return (
    <RoleBasedAuthGuard requiredRole='admin'>
      <div>Only admins can see this</div>
    </RoleBasedAuthGuard>
  );
}
```

### 2. Allow Multiple Roles

```tsx
import RoleBasedAuthGuard from '@/components/RoleBasedAuthGuard';

function ManagerOrAdminComponent() {
  return (
    <RoleBasedAuthGuard allowedRoles={['admin', 'manager']}>
      <div>Only managers and admins can see this</div>
    </RoleBasedAuthGuard>
  );
}
```

### 3. Admin Settings Page Example

```tsx
// app/dashboard/admin/page.tsx
'use client';

import RoleBasedAuthGuard from '@/components/RoleBasedAuthGuard';

export default function AdminPage() {
  return (
    <RoleBasedAuthGuard requiredRole='admin'>
      <div className='container mx-auto p-6'>
        <h1>Admin Dashboard</h1>
        <p>This page is only accessible to administrators</p>

        {/* Admin-specific content */}
        <div className='mt-6'>
          <h2>User Management</h2>
          <p>Manage all users in the system</p>
        </div>
      </div>
    </RoleBasedAuthGuard>
  );
}
```

## Protection Layers

Your app now has multiple layers of protection:

### 1. **Middleware** (Server-side)

- Protects all `/dashboard/*` routes
- Protects all `/api/*` routes
- **NEW**: Redirects authenticated users away from `/login` and `/signup`
- Automatic redirects to `/login` for unauthenticated users

### 2. **Layout Protection** (Client-side)

- Dashboard layout checks authentication
- Shows loading states
- Handles logout functionality

### 3. **AuthGuard** (Component-level)

- Additional protection for specific components
- Custom loading states
- Conditional rendering

### 4. **GuestGuard** (Component-level) - NEW!

- Prevents authenticated users from accessing guest-only pages
- Custom loading states
- Automatic redirects to dashboard

### 5. **API Protection** (Server-side)

- All API routes are protected
- Role-based access control
- Proper error responses

## Best Practices

### 1. **Use Middleware for Route Protection**

```tsx
// This is handled automatically by middleware.ts
// No need to wrap every page with AuthGuard
```

### 2. **Use GuestGuard for Login/Signup Pages**

```tsx
// app/login/page.tsx
export default function LoginPage() {
  return (
    <GuestGuard>
      <div>Login form content</div>
    </GuestGuard>
  );
}
```

### 3. **Use AuthGuard for Conditional Content**

```tsx
function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>

      {/* Always show */}
      <p>Welcome message</p>

      {/* Conditionally show based on auth */}
      <AuthGuard>
        <div>Premium features</div>
      </AuthGuard>
    </div>
  );
}
```

### 4. **Use RoleBasedAuthGuard for Admin Features**

```tsx
function SettingsPage() {
  return (
    <div>
      <h1>Settings</h1>

      {/* Regular settings */}
      <div>User settings</div>

      {/* Admin-only settings */}
      <RoleBasedAuthGuard requiredRole='admin'>
        <div>Admin settings</div>
      </RoleBasedAuthGuard>
    </div>
  );
}
```

### 5. **Custom Loading States**

```tsx
<AuthGuard
  fallback={
    <div className='flex items-center justify-center p-8'>
      <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600'></div>
      <span className='ml-2'>Loading...</span>
    </div>
  }
>
  <YourComponent />
</AuthGuard>
```

## Error Handling

The AuthGuard components handle these scenarios:

1. **Loading**: Shows loading state while checking auth
2. **Unauthenticated**: Redirects to login page (AuthGuard)
3. **Authenticated**: Redirects to dashboard (GuestGuard)
4. **Unauthorized**: Shows access denied message (RoleBasedAuthGuard)
5. **Network errors**: Falls back gracefully

## API Route Protection

For API routes, use the utility functions:

```tsx
// app/api/admin/users/route.ts
import { requireRole } from '@/lib/auth-utils';

export async function GET(req: NextRequest) {
  const user = await requireRole(req, 'admin');

  // If we get here, user is authenticated and has admin role
  return NextResponse.json({ users: [] });
}
```

## Summary

- **Middleware**: Protects routes at the server level
- **AuthGuard**: Protects components that require authentication
- **GuestGuard**: Protects components that should only be accessible to guests
- **RoleBasedAuthGuard**: Adds role-based authorization
- **API Utils**: Protects API routes with authentication and roles

This multi-layered approach ensures your app is secure at every level! 🔐
