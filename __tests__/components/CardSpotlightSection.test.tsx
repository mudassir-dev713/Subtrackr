import React from 'react';
import { render, screen } from '@testing-library/react';

// Mock the problematic dependencies
jest.mock('@/components/ui/card-spotlight', () => ({
  CardSpotlight: ({ children }: any) => (
    <div data-testid='card-spotlight'>{children}</div>
  ),
}));

jest.mock('@/components/ui/card', () => ({
  Card: ({ children }: any) => <div data-testid='card'>{children}</div>,
  CardContent: ({ children }: any) => (
    <div data-testid='card-content'>{children}</div>
  ),
  CardHeader: ({ children }: any) => (
    <div data-testid='card-header'>{children}</div>
  ),
  CardTitle: ({ children }: any) => (
    <div data-testid='card-title'>{children}</div>
  ),
}));

jest.mock('@/components/ui/tooltip', () => ({
  Tooltip: ({ children }: any) => <div data-testid='tooltip'>{children}</div>,
  TooltipTrigger: ({ children }: any) => (
    <div data-testid='tooltip-trigger'>{children}</div>
  ),
  TooltipContent: ({ children }: any) => (
    <div data-testid='tooltip-content'>{children}</div>
  ),
}));

// Mock lucide-react icons
jest.mock('lucide-react', () => ({
  DollarSign: () => <div data-testid='dollar-sign'>$</div>,
  Calendar: () => <div data-testid='calendar'>📅</div>,
  CreditCard: () => <div data-testid='credit-card'>💳</div>,
  AlertCircle: () => <div data-testid='alert-circle'>⚠️</div>,
  Info: () => <div data-testid='info'>ℹ️</div>,
  TrendingUp: () => <div data-testid='trending-up'>📈</div>,
}));

// Import after mocking
const CardSpotlightSection =
  require('@/components/CardSpotlightSection').default;

describe('CardSpotlightSection', () => {
  it('renders all four cards', () => {
    render(<CardSpotlightSection />);

    expect(screen.getByText('Monthly Cost')).toBeInTheDocument();
    expect(screen.getByText('Annual Cost')).toBeInTheDocument();
    expect(screen.getByText('Active Subscriptions')).toBeInTheDocument();
    expect(screen.getByText('Renewals This Week')).toBeInTheDocument();
  });

  it('displays correct monetary values', () => {
    render(<CardSpotlightSection />);

    expect(screen.getByText('$1,247.32')).toBeInTheDocument();
    expect(screen.getByText('$14,967.84')).toBeInTheDocument();
  });

  it('displays correct subscription counts', () => {
    render(<CardSpotlightSection />);

    expect(screen.getByText('23')).toBeInTheDocument();
    expect(screen.getByText('4')).toBeInTheDocument();
  });

  it('shows trend information', () => {
    render(<CardSpotlightSection />);

    expect(screen.getByText('+12% from last month')).toBeInTheDocument();
  });

  it('displays descriptive text', () => {
    render(<CardSpotlightSection />);

    expect(screen.getByText('Projected yearly spending')).toBeInTheDocument();
    expect(screen.getByText('Across 5 team members')).toBeInTheDocument();
    expect(screen.getByText('Requires attention')).toBeInTheDocument();
  });

  it('renders tooltip information', () => {
    render(<CardSpotlightSection />);

    // Check for tooltip triggers (Info icons)
    const infoIcons = screen.getAllByTestId('info');
    expect(infoIcons.length).toBeGreaterThan(0);
  });

  it('renders all required icons', () => {
    render(<CardSpotlightSection />);

    // Check for various icons by their test IDs
    expect(screen.getByTestId('dollar-sign')).toBeInTheDocument();
    expect(screen.getByTestId('calendar')).toBeInTheDocument();
    expect(screen.getByTestId('credit-card')).toBeInTheDocument();
    expect(screen.getByTestId('alert-circle')).toBeInTheDocument();
    expect(screen.getByTestId('trending-up')).toBeInTheDocument();
  });

  it('displays correct card titles', () => {
    render(<CardSpotlightSection />);

    const monthlyCostTitle = screen.getByText('Monthly Cost');
    const annualCostTitle = screen.getByText('Annual Cost');
    const activeSubsTitle = screen.getByText('Active Subscriptions');
    const renewalsTitle = screen.getByText('Renewals This Week');

    expect(monthlyCostTitle).toBeInTheDocument();
    expect(annualCostTitle).toBeInTheDocument();
    expect(activeSubsTitle).toBeInTheDocument();
    expect(renewalsTitle).toBeInTheDocument();
  });

  it('renders without errors', () => {
    expect(() => {
      render(<CardSpotlightSection />);
    }).not.toThrow();
  });
});
