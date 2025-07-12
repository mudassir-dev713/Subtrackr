import React from 'react';
import { render, screen } from '@testing-library/react';
import Loader from '@/components/Loader';

describe('Loader', () => {
  it('renders with default props', () => {
    render(<Loader />);

    const loader = screen.getByRole('status');
    expect(loader).toBeInTheDocument();
    expect(loader).toHaveAttribute('aria-label', 'Loading');
  });

  it('renders with custom text', () => {
    render(<Loader text='Custom loading text' />);

    expect(screen.getByText('Custom loading text')).toBeInTheDocument();
  });

  it('renders without text when text prop is empty', () => {
    render(<Loader text='' />);

    expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
  });

  it('applies small size classes', () => {
    render(<Loader size='sm' />);

    const spinner = screen.getByRole('status');
    expect(spinner).toHaveClass('w-8', 'h-8');
  });

  it('applies medium size classes (default)', () => {
    render(<Loader />);

    const spinner = screen.getByRole('status');
    expect(spinner).toHaveClass('w-16', 'h-16');
  });

  it('applies large size classes', () => {
    render(<Loader size='lg' />);

    const spinner = screen.getByRole('status');
    expect(spinner).toHaveClass('w-24', 'h-24');
  });

  it('applies custom className', () => {
    render(<Loader className='custom-class' />);

    const container = document.querySelector('.custom-class');
    expect(container).toBeInTheDocument();
  });

  it('has proper accessibility attributes', () => {
    render(<Loader />);

    const spinner = screen.getByRole('status');
    expect(spinner).toHaveAttribute('aria-label', 'Loading');
  });

  it('has proper CSS classes for styling', () => {
    render(<Loader />);

    const spinner = screen.getByRole('status');
    expect(spinner).toHaveClass(
      'border-4',
      'border-blue-500',
      'rounded-full',
      'border-t-transparent',
      'animate-spin'
    );
  });

  it('renders text with proper styling', () => {
    render(<Loader text='Test loading' />);

    const text = screen.getByText('Test loading');
    expect(text).toHaveClass(
      'text-sm',
      'text-muted-foreground',
      'animate-pulse'
    );
  });

  it('renders container with proper styling', () => {
    render(<Loader />);

    const container = document.querySelector(
      '.flex.items-center.justify-center.min-h-screen.bg-background'
    );
    expect(container).toBeInTheDocument();
  });
});
