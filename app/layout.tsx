import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import NextAuthProvider from '../components/SessionProvider';
import '../styles/global.css';

// Font optimization
const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap',
  preload: true,
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
  preload: true,
});

// Enhanced metadata
export const metadata: Metadata = {
  title: {
    default: 'SubTrackr - Subscription Management Platform',
    template: '%s | SubTrackr',
  },
  description:
    'Efficiently manage and track your subscriptions with SubTrackr. Get smart renewal notifications, team collaboration, and cost optimization insights.',
  keywords: [
    'subscription management',
    'renewal tracking',
    'team collaboration',
    'cost optimization',
    'SaaS management',
  ],
  authors: [{ name: 'SubTrackr Team' }],
  creator: 'SubTrackr',
  publisher: 'SubTrackr',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
  ),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    title: 'SubTrackr - Subscription Management Platform',
    description:
      'Efficiently manage and track your subscriptions with SubTrackr. Get smart renewal notifications, team collaboration, and cost optimization insights.',
    siteName: 'SubTrackr',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'SubTrackr - Subscription Management Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SubTrackr - Subscription Management Platform',
    description:
      'Efficiently manage and track your subscriptions with SubTrackr.',
    images: ['/og-image.png'],
    creator: '@subtrackr',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
  },
};

// Viewport configuration
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <head>
        {/* Preconnect to external domains for performance */}
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link
          rel='preconnect'
          href='https://fonts.gstatic.com'
          crossOrigin='anonymous'
        />

        {/* DNS prefetch for performance */}
        <link rel='dns-prefetch' href='//fonts.googleapis.com' />
        <link rel='dns-prefetch' href='//fonts.gstatic.com' />

        {/* Security headers */}
        <meta httpEquiv='X-Content-Type-Options' content='nosniff' />
        <meta httpEquiv='X-Frame-Options' content='DENY' />
        <meta httpEquiv='X-XSS-Protection' content='1; mode=block' />

        {/* PWA manifest */}
        <link rel='manifest' href='/manifest.json' />
        <meta name='application-name' content='SubTrackr' />
        <meta name='apple-mobile-web-app-capable' content='yes' />
        <meta name='apple-mobile-web-app-status-bar-style' content='default' />
        <meta name='apple-mobile-web-app-title' content='SubTrackr' />
        <meta name='mobile-web-app-capable' content='yes' />

        {/* Icons */}
        <link rel='icon' href='/favicon.ico' sizes='any' />
        <link rel='icon' href='/favicon.svg' type='image/svg+xml' />
        <link rel='apple-touch-icon' href='/apple-touch-icon.png' />

        {/* Structured data */}
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebApplication',
              name: 'SubTrackr',
              description: 'Subscription Management Platform',
              url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
              applicationCategory: 'BusinessApplication',
              operatingSystem: 'Web Browser',
            }),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased dark`}
        suppressHydrationWarning
      >
        <NextAuthProvider>{children}</NextAuthProvider>
      </body>
    </html>
  );
}
