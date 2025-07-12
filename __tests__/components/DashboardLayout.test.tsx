import React from 'react';
import { render, screen } from '@testing-library/react';
import DashboardLayout from '@/components/DashboardLayout';

// Mock next/navigation
const mockPush = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
  usePathname: () => '/dashboard',
}));

// Mock next-auth/react
const mockUseSession = jest.fn();
const mockSignOut = jest.fn();
jest.mock('next-auth/react', () => ({
  useSession: () => mockUseSession(),
  signOut: () => mockSignOut(),
}));

describe('DashboardLayout', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseSession.mockReturnValue({
      data: { user: { name: 'Test User', email: 'test@example.com' } },
      status: 'authenticated',
    });
  });

  it('renders children correctly', () => {
    render(
      <DashboardLayout>
        <div data-testid='dashboard-content'>Dashboard Content</div>
      </DashboardLayout>
    );

    expect(screen.getByTestId('dashboard-content')).toBeInTheDocument();
  });

  it('renders the SubTrackr logo and title', () => {
    render(
      <DashboardLayout>
        <div>Content</div>
      </DashboardLayout>
    );

    expect(screen.getByText('SubTrackr')).toBeInTheDocument();
  });

  it('renders navigation menu items', () => {
    render(
      <DashboardLayout>
        <div>Content</div>
      </DashboardLayout>
    );

    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Subscriptions')).toBeInTheDocument();
    expect(screen.getByText('Team')).toBeInTheDocument();
    expect(screen.getByText('Settings')).toBeInTheDocument();
  });

  it('renders Add Subscription button', () => {
    render(
      <DashboardLayout>
        <div>Content</div>
      </DashboardLayout>
    );

    expect(screen.getByText('Add Subscription')).toBeInTheDocument();
  });

  it('renders notification bell icon', () => {
    render(
      <DashboardLayout>
        <div>Content</div>
      </DashboardLayout>
    );

    // Look for the bell icon by finding a button with a bell SVG
    const buttons = screen.getAllByRole('button');
    const notificationButton = buttons.find(button =>
      button.querySelector('svg')?.classList.contains('lucide-bell')
    );
    expect(notificationButton).toBeInTheDocument();
  });

  it('renders user avatar and dropdown', () => {
    render(
      <DashboardLayout>
        <div>Content</div>
      </DashboardLayout>
    );

    // Look for user menu button by the avatar text "JD"
    const userMenuButton = screen.getByRole('button', { name: 'JD' });
    expect(userMenuButton).toBeInTheDocument();
  });

  it('has proper header structure', () => {
    render(
      <DashboardLayout>
        <div>Content</div>
      </DashboardLayout>
    );

    const header = document.querySelector('header');
    expect(header).toBeInTheDocument();
    expect(header).toHaveClass(
      'bg-background',
      'border-b',
      'border-border',
      'fixed',
      'w-full',
      'top-0',
      'z-50'
    );
  });

  it('has proper main content structure', () => {
    render(
      <DashboardLayout>
        <div data-testid='dashboard-content'>Dashboard Content</div>
      </DashboardLayout>
    );

    const main = document.querySelector('main');
    expect(main).toBeInTheDocument();
    expect(main).toHaveClass('pt-16');
  });

  it('renders with authenticated user data', () => {
    render(
      <DashboardLayout>
        <div>Content</div>
      </DashboardLayout>
    );

    // Check that the component renders without errors
    expect(screen.getByText('SubTrackr')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'JD' })).toBeInTheDocument();
  });

  it('renders with loading session state', () => {
    mockUseSession.mockReturnValue({
      data: null,
      status: 'loading',
    });

    render(
      <DashboardLayout>
        <div>Content</div>
      </DashboardLayout>
    );

    // Check that the component renders without errors even when loading
    expect(screen.getByText('SubTrackr')).toBeInTheDocument();
  });

  it('renders with unauthenticated session state', () => {
    mockUseSession.mockReturnValue({
      data: null,
      status: 'unauthenticated',
    });

    render(
      <DashboardLayout>
        <div>Content</div>
      </DashboardLayout>
    );

    // Check that the component renders without errors even when unauthenticated
    expect(screen.getByText('SubTrackr')).toBeInTheDocument();
  });
});
