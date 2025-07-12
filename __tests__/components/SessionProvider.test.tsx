import React from 'react';
import { render } from '@testing-library/react';
import NextAuthProvider from '@/components/SessionProvider';

// Mock next-auth/react
jest.mock('next-auth/react', () => ({
  SessionProvider: ({ children }: any) => (
    <div data-testid='session-provider'>{children}</div>
  ),
}));

describe('SessionProvider', () => {
  it('renders children correctly', () => {
    render(
      <NextAuthProvider>
        <div data-testid='test-child'>Test Child</div>
      </NextAuthProvider>
    );

    expect(
      document.querySelector('[data-testid="session-provider"]')
    ).toBeInTheDocument();
    expect(
      document.querySelector('[data-testid="test-child"]')
    ).toBeInTheDocument();
  });

  it('renders with multiple children', () => {
    render(
      <NextAuthProvider>
        <div data-testid='child1'>Child 1</div>
        <div data-testid='child2'>Child 2</div>
        <div data-testid='child3'>Child 3</div>
      </NextAuthProvider>
    );

    expect(
      document.querySelector('[data-testid="child1"]')
    ).toBeInTheDocument();
    expect(
      document.querySelector('[data-testid="child2"]')
    ).toBeInTheDocument();
    expect(
      document.querySelector('[data-testid="child3"]')
    ).toBeInTheDocument();
  });
});
