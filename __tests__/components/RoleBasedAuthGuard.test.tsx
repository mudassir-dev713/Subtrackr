import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import RoleBasedAuthGuard from '@/components/RoleBasedAuthGuard';

// Mock next/navigation
const mockPush = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

// Mock next-auth/react
const mockUseSession = jest.fn();
jest.mock('next-auth/react', () => ({
  useSession: () => mockUseSession(),
}));

// Mock Loader component
jest.mock('@/components/Loader', () => {
  return function MockLoader() {
    return <div data-testid='loader'>Loading...</div>;
  };
});

describe('RoleBasedAuthGuard', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders children when authenticated and authorized', () => {
    mockUseSession.mockReturnValue({
      data: { user: { name: 'Test User', role: 'admin' } },
      status: 'authenticated',
    });

    render(
      <RoleBasedAuthGuard requiredRole='admin'>
        <div data-testid='protected-content'>Protected Content</div>
      </RoleBasedAuthGuard>
    );

    expect(screen.getByTestId('protected-content')).toBeInTheDocument();
  });

  it('shows loader when loading', () => {
    mockUseSession.mockReturnValue({
      data: null,
      status: 'loading',
    });

    render(
      <RoleBasedAuthGuard>
        <div data-testid='protected-content'>Protected Content</div>
      </RoleBasedAuthGuard>
    );

    expect(screen.getByTestId('loader')).toBeInTheDocument();
    expect(screen.queryByTestId('protected-content')).not.toBeInTheDocument();
  });

  it('shows custom fallback when loading', () => {
    mockUseSession.mockReturnValue({
      data: null,
      status: 'loading',
    });

    render(
      <RoleBasedAuthGuard
        fallback={<div data-testid='custom-loader'>Custom Loading</div>}
      >
        <div data-testid='protected-content'>Protected Content</div>
      </RoleBasedAuthGuard>
    );

    expect(screen.getByTestId('custom-loader')).toBeInTheDocument();
    expect(screen.queryByTestId('loader')).not.toBeInTheDocument();
  });

  it('redirects to login when unauthenticated', async () => {
    mockUseSession.mockReturnValue({
      data: null,
      status: 'unauthenticated',
    });

    render(
      <RoleBasedAuthGuard>
        <div data-testid='protected-content'>Protected Content</div>
      </RoleBasedAuthGuard>
    );

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/login');
    });
  });

  it('shows access denied when required role does not match', () => {
    mockUseSession.mockReturnValue({
      data: { user: { name: 'Test User', role: 'user' } },
      status: 'authenticated',
    });

    render(
      <RoleBasedAuthGuard requiredRole='admin'>
        <div data-testid='protected-content'>Protected Content</div>
      </RoleBasedAuthGuard>
    );

    expect(screen.getByText('Access Denied')).toBeInTheDocument();
    expect(
      screen.getByText("You don't have permission to access this page.")
    ).toBeInTheDocument();
    expect(screen.queryByTestId('protected-content')).not.toBeInTheDocument();
  });

  it('shows access denied when user role is not in allowed roles', () => {
    mockUseSession.mockReturnValue({
      data: { user: { name: 'Test User', role: 'user' } },
      status: 'authenticated',
    });

    render(
      <RoleBasedAuthGuard allowedRoles={['admin', 'moderator']}>
        <div data-testid='protected-content'>Protected Content</div>
      </RoleBasedAuthGuard>
    );

    expect(screen.getByText('Access Denied')).toBeInTheDocument();
    expect(
      screen.getByText("You don't have permission to access this page.")
    ).toBeInTheDocument();
    expect(screen.queryByTestId('protected-content')).not.toBeInTheDocument();
  });

  it('allows access when user role is in allowed roles', () => {
    mockUseSession.mockReturnValue({
      data: { user: { name: 'Test User', role: 'moderator' } },
      status: 'authenticated',
    });

    render(
      <RoleBasedAuthGuard allowedRoles={['admin', 'moderator']}>
        <div data-testid='protected-content'>Protected Content</div>
      </RoleBasedAuthGuard>
    );

    expect(screen.getByTestId('protected-content')).toBeInTheDocument();
    expect(screen.queryByText('Access Denied')).not.toBeInTheDocument();
  });

  it('allows access when no role requirements are specified', () => {
    mockUseSession.mockReturnValue({
      data: { user: { name: 'Test User', role: 'user' } },
      status: 'authenticated',
    });

    render(
      <RoleBasedAuthGuard>
        <div data-testid='protected-content'>Protected Content</div>
      </RoleBasedAuthGuard>
    );

    expect(screen.getByTestId('protected-content')).toBeInTheDocument();
  });

  it('allows access when user has no role but no role requirements', () => {
    mockUseSession.mockReturnValue({
      data: { user: { name: 'Test User' } },
      status: 'authenticated',
    });

    render(
      <RoleBasedAuthGuard>
        <div data-testid='protected-content'>Protected Content</div>
      </RoleBasedAuthGuard>
    );

    expect(screen.getByTestId('protected-content')).toBeInTheDocument();
  });

  it('allows access when user has no role but role requirements are specified', () => {
    mockUseSession.mockReturnValue({
      data: { user: { name: 'Test User' } },
      status: 'authenticated',
    });

    render(
      <RoleBasedAuthGuard requiredRole='admin'>
        <div data-testid='protected-content'>Protected Content</div>
      </RoleBasedAuthGuard>
    );

    expect(screen.getByTestId('protected-content')).toBeInTheDocument();
  });

  it('handles both requiredRole and allowedRoles (requiredRole takes precedence)', () => {
    mockUseSession.mockReturnValue({
      data: { user: { name: 'Test User', role: 'moderator' } },
      status: 'authenticated',
    });

    render(
      <RoleBasedAuthGuard
        requiredRole='admin'
        allowedRoles={['moderator', 'user']}
      >
        <div data-testid='protected-content'>Protected Content</div>
      </RoleBasedAuthGuard>
    );

    expect(screen.getByText('Access Denied')).toBeInTheDocument();
    expect(screen.queryByTestId('protected-content')).not.toBeInTheDocument();
  });
});
