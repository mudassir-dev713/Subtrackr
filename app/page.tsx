'use client';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Balancer from 'react-wrap-balancer';
import {
  Calendar,
  Users,
  DollarSign,
  Download,
  Shield,
  Bell,
  BarChart3,
  Menu,
  X,
  Star,
  CheckCircle,
  Zap,
  Globe,
} from 'lucide-react';
import { useState } from 'react';
export default function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const features = [
    {
      icon: Calendar,
      title: 'Smart Renewals',
      description:
        'Never miss a subscription renewal with intelligent notifications and calendar integration that adapts to your workflow.',
    },
    {
      icon: Users,
      title: 'Team Collaboration',
      description:
        'Seamlessly collaborate with your team to manage shared subscriptions, split costs, and maintain transparency.',
    },
    {
      icon: BarChart3,
      title: 'Advanced Analytics',
      description:
        'Get deep insights into your spending patterns with beautiful charts and actionable recommendations.',
    },
    {
      icon: Download,
      title: 'Data Export',
      description:
        'Export your subscription data anytime in multiple formats for reporting, analysis, and compliance.',
    },
    {
      icon: Zap,
      title: 'Automation',
      description:
        'Automate routine tasks with smart workflows and integrations that save you time and reduce errors.',
    },
    {
      icon: Globe,
      title: 'Multi-Currency',
      description:
        'Track subscriptions in multiple currencies with real-time exchange rates and localized formatting.',
    },
  ];

  const testimonials = [
    {
      quote:
        'SubTrackr transformed how we manage our SaaS subscriptions. We saved over $2,000 in the first month by identifying unused services.',
      author: 'Sarah Chen',
      role: 'CEO at TechFlow',
      avatar:
        'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 5,
    },
    {
      quote:
        "The team collaboration features are incredible. Finally, we have complete visibility into all our tools and who's using what.",
      author: 'Michael Rodriguez',
      role: 'CTO at DevCorp',
      avatar:
        'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 5,
    },
    {
      quote:
        'Simple, elegant, and powerful. SubTrackr does exactly what it promises with a beautiful interface that our whole team loves.',
      author: 'Emily Johnson',
      role: 'Finance Director',
      avatar:
        'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 5,
    },
  ];

  const plans = [
    {
      name: 'Starter',
      price: '$0',
      period: 'forever',
      description: 'Perfect for individuals and small teams',
      features: [
        'Up to 5 subscriptions',
        'Basic notifications',
        'Personal dashboard',
        'CSV export',
        'Email support',
      ],
      popular: false,
      gradient: 'from-slate-500 to-slate-600',
    },
    {
      name: 'Professional',
      price: '$12',
      period: 'per month',
      description: 'Ideal for growing teams and businesses',
      features: [
        'Unlimited subscriptions',
        'Advanced notifications',
        'Team collaboration',
        'Priority support',
        'Custom categories',
        'Advanced analytics',
        'API access',
        'Multi-currency support',
      ],
      popular: true,
      gradient: 'from-blue-600 to-purple-600',
    },
    {
      name: 'Enterprise',
      price: '$39',
      period: 'per month',
      description: 'For large organizations with advanced needs',
      features: [
        'Everything in Professional',
        'Advanced team management',
        'Custom integrations',
        'Dedicated support',
        'SSO integration',
        'Advanced security',
        'Custom reporting',
        'White-label options',
      ],
      popular: false,
      gradient: 'from-purple-600 to-pink-600',
    },
  ];

  return (
    <div className='min-h-screen bg-background'>
      {/* Header */}
      <header className='border-b border-border bg-background fixed w-full top-0 z-50'>
        <div className='container mx-auto px-6 lg:px-8'>
          <div className='flex justify-between items-center h-16'>
            <div className='flex items-center'>
              <div className='flex items-center space-x-2'>
                <div className='w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg'>
                  <Shield className='w-5 h-5 text-white' />
                </div>
                <span className='text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'>
                  SubTrackr
                </span>
              </div>
            </div>

            <nav className='hidden md:flex space-x-8'>
              <a
                href='#features'
                className='text-muted-foreground hover:text-foreground transition-colors font-medium'
              >
                Features
              </a>
              <a
                href='#pricing'
                className='text-muted-foreground hover:text-foreground transition-colors font-medium'
              >
                Pricing
              </a>
              <a
                href='#testimonials'
                className='text-muted-foreground hover:text-foreground transition-colors font-medium'
              >
                Testimonials
              </a>
              <Link
                href='/login'
                className='text-muted-foreground hover:text-foreground transition-colors font-medium'
              >
                Login
              </Link>
            </nav>

            <div className='hidden md:flex items-center space-x-4'>
              <Link href='/login'>
                <Button variant='ghost' className='font-medium text-white'>
                  Login
                </Button>
              </Link>
              <Link href='/signup'>
                <Button className='bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-200 font-medium'>
                  Get Started
                </Button>
              </Link>
            </div>

            <div className='md:hidden flex items-center'>
              <button
                className='p-2 hover:bg-muted/50 rounded-lg transition-colors'
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? (
                  <X className='w-6 h-6' />
                ) : (
                  <Menu className='w-6 h-6' />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className='md:hidden border-t border-border bg-background'>
            <div className='px-4 py-4 space-y-3'>
              <a
                href='#features'
                className='block py-2 text-muted-foreground hover:text-foreground font-medium'
              >
                Features
              </a>
              <a
                href='#pricing'
                className='block py-2 text-muted-foreground hover:text-foreground font-medium'
              >
                Pricing
              </a>
              <a
                href='#testimonials'
                className='block py-2 text-muted-foreground hover:text-foreground font-medium'
              >
                Testimonials
              </a>
              <Link
                href='/login'
                className='block py-2 text-muted-foreground hover:text-foreground font-medium'
              >
                Login
              </Link>
              <div className='pt-3 border-t border-border'>
                <Link href='/signup' className='block'>
                  <Button className='w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 font-medium'>
                    Get Started
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className='pt-32 pb-20 bg-background'>
        <div className='container mx-auto px-6 lg:px-8'>
          <div className='text-center max-w-5xl mx-auto'>
            <h1 className='text-5xl md:text-7xl font-bold mb-8 leading-tight'>
              <Balancer>
                <span className='bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent'>
                  Track Your Team's Subscriptions.
                </span>
                <br />
                <span className='text-foreground'>
                  Never Miss a Renewal Again.
                </span>
              </Balancer>
            </h1>
            <p className='text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed'>
              <Balancer>
                Keep your team's subscriptions organized, track spending
                patterns, and never get surprised by renewal dates. Simple,
                powerful, and built for modern teams.
              </Balancer>
            </p>
            <div className='flex flex-col sm:flex-row gap-6 justify-center items-center'>
              <Link href='/signup'>
                <Button
                  size='lg'
                  className='px-10 py-4 text-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-xl hover:shadow-2xl transition-all duration-300 font-semibold'
                >
                  Get Started Free
                </Button>
              </Link>
              <Button
                size='lg'
                variant='outline'
                className='px-10 py-4 text-lg border-2 hover:bg-muted/30 font-semibold'
              >
                View Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id='features' className='py-24 bg-background'>
        <div className='container mx-auto px-6 lg:px-8'>
          <div className='text-center mb-20'>
            <h2 className='text-4xl md:text-5xl font-bold mb-6'>
              <Balancer>Everything you need to manage subscriptions</Balancer>
            </h2>
            <p className='text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed'>
              <Balancer>
                Powerful features designed to keep your team organized and your
                budget under control.
              </Balancer>
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto'>
            {features.map((feature, index) => (
              <Card
                key={index}
                className='border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-card hover:scale-105 group'
              >
                <CardHeader className='text-center pb-6'>
                  <div className='w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl transition-all duration-300'>
                    <feature.icon className='w-8 h-8 text-white' />
                  </div>
                  <CardTitle className='text-xl font-bold'>
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className='pt-0'>
                  <CardDescription className='text-center text-muted-foreground text-base leading-relaxed'>
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id='testimonials' className='py-24 bg-background'>
        <div className='container mx-auto px-6 lg:px-8'>
          <div className='text-center mb-20'>
            <h2 className='text-4xl md:text-5xl font-bold mb-6'>
              <Balancer>Loved by teams worldwide</Balancer>
            </h2>
            <p className='text-xl md:text-2xl text-muted-foreground leading-relaxed'>
              See what our customers are saying about SubTrackr
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto'>
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className='border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-card'
              >
                <CardContent className='p-8'>
                  <div className='flex mb-6'>
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className='w-5 h-5 fill-yellow-400 text-yellow-400'
                      />
                    ))}
                  </div>
                  <p className='text-muted-foreground mb-8 italic text-lg leading-relaxed'>
                    "{testimonial.quote}"
                  </p>
                  <div className='flex items-center'>
                    <Avatar className='w-12 h-12 mr-4'>
                      <AvatarImage
                        src={testimonial.avatar}
                        alt={testimonial.author}
                      />
                      <AvatarFallback className='bg-gradient-to-br from-blue-500 to-purple-500 text-white font-semibold'>
                        {testimonial.author.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className='font-semibold text-lg'>
                        {testimonial.author}
                      </p>
                      <p className='text-muted-foreground'>
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id='pricing' className='py-24 bg-background'>
        <div className='container mx-auto px-6 lg:px-8'>
          <div className='text-center mb-20'>
            <h2 className='text-4xl md:text-5xl font-bold mb-6'>
              <Balancer>Simple, transparent pricing</Balancer>
            </h2>
            <p className='text-xl md:text-2xl text-muted-foreground leading-relaxed'>
              Choose the plan that's right for your team
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto'>
            {plans.map((plan, index) => (
              <Card
                key={index}
                className={`relative transition-all duration-300 hover:scale-105 ${
                  plan.popular
                    ? 'border-2 border-blue-500 shadow-2xl'
                    : 'border-0 shadow-lg hover:shadow-xl'
                } bg-card`}
              >
                {plan.popular && (
                  <div className='absolute -top-4 left-1/2 transform -translate-x-1/2'>
                    <Badge
                      className={`bg-gradient-to-r ${plan.gradient} text-white shadow-lg px-4 py-1 text-sm font-semibold`}
                    >
                      Most Popular
                    </Badge>
                  </div>
                )}
                <CardHeader className='text-center pb-6'>
                  <CardTitle className='text-2xl font-bold'>
                    {plan.name}
                  </CardTitle>
                  <CardDescription className='text-muted-foreground mb-6 text-base'>
                    {plan.description}
                  </CardDescription>
                  <div className='mt-6'>
                    <span className='text-5xl font-bold'>{plan.price}</span>
                    <span className='text-muted-foreground ml-2 text-lg'>
                      {plan.period}
                    </span>
                  </div>
                </CardHeader>
                <CardContent className='pt-0'>
                  <ul className='space-y-4 mb-8'>
                    {plan.features.map((feature, featureIndex) => (
                      <li
                        key={featureIndex}
                        className='flex items-center text-base'
                      >
                        <CheckCircle className='w-5 h-5 text-green-500 mr-3 flex-shrink-0' />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link href='/signup'>
                    <Button
                      className={`w-full transition-all duration-200 py-3 text-lg font-semibold ${
                        plan.popular
                          ? `bg-gradient-to-r ${plan.gradient} hover:shadow-lg`
                          : 'hover:bg-muted/30'
                      }`}
                      variant={plan.popular ? 'default' : 'outline'}
                    >
                      Get Started
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className='bg-background border-t border-border py-16'>
        <div className='container mx-auto px-6 lg:px-8'>
          <div className='grid grid-cols-1 md:grid-cols-4 gap-12'>
            <div className='md:col-span-1'>
              <div className='flex items-center space-x-2 mb-6'>
                <div className='w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg'>
                  <Shield className='w-5 h-5 text-white' />
                </div>
                <span className='text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'>
                  SubTrackr
                </span>
              </div>
              <p className='text-muted-foreground leading-relaxed'>
                The easiest way to track and manage your team's subscriptions
                with beautiful insights and powerful automation.
              </p>
            </div>

            <div>
              <h4 className='font-bold mb-6 text-lg'>Product</h4>
              <ul className='space-y-3 text-muted-foreground'>
                <li>
                  <a
                    href='#features'
                    className='hover:text-foreground transition-colors'
                  >
                    Features
                  </a>
                </li>
                <li>
                  <a
                    href='#pricing'
                    className='hover:text-foreground transition-colors'
                  >
                    Pricing
                  </a>
                </li>
                <li>
                  <a
                    href='#'
                    className='hover:text-foreground transition-colors'
                  >
                    API
                  </a>
                </li>
                <li>
                  <a
                    href='#'
                    className='hover:text-foreground transition-colors'
                  >
                    Integrations
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className='font-bold mb-6 text-lg'>Company</h4>
              <ul className='space-y-3 text-muted-foreground'>
                <li>
                  <a
                    href='#'
                    className='hover:text-foreground transition-colors'
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    href='#'
                    className='hover:text-foreground transition-colors'
                  >
                    Contact
                  </a>
                </li>
                <li>
                  <a
                    href='#'
                    className='hover:text-foreground transition-colors'
                  >
                    Careers
                  </a>
                </li>
                <li>
                  <a
                    href='#'
                    className='hover:text-foreground transition-colors'
                  >
                    Blog
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className='font-bold mb-6 text-lg'>Legal</h4>
              <ul className='space-y-3 text-muted-foreground'>
                <li>
                  <a
                    href='#'
                    className='hover:text-foreground transition-colors'
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    href='#'
                    className='hover:text-foreground transition-colors'
                  >
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a
                    href='#'
                    className='hover:text-foreground transition-colors'
                  >
                    Security
                  </a>
                </li>
                <li>
                  <a
                    href='#'
                    className='hover:text-foreground transition-colors'
                  >
                    GDPR
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className='border-t border-border mt-12 pt-8 text-center text-muted-foreground'>
            <p>
              &copy; 2024 SubTrackr. All rights reserved. Made with ❤️ for
              modern teams.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
