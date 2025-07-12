'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Balancer from 'react-wrap-balancer';
import { Shield, Mail, Lock, CheckCircle, Star, Users } from 'lucide-react';
import { signIn } from 'next-auth/react';
import { useToast } from '@/hooks/use-toast';
import { Toaster } from '@/components/ui/toaster';
import GuestGuard from '@/components/GuestGuard';

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const router = useRouter();
  const [form, setform] = useState({
    email: '',
    password: '',
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await signIn('credentials', {
        email: form.email,
        password: form.password,
        redirect: false,
      });
      if (res?.error) {
        toast.toast({
          title: 'Login Failed',
          description: res.error,
          variant: 'destructive',
        });
        console.error('Login failed:', res.error);
        return;
      }
      if (!res?.ok) {
        toast.toast({
          title: 'Login Failed',
          description: 'Invalid credentials or unknown error.',
          variant: 'destructive',
        });
        console.error('Login failed: Unknown error', res);
        return;
      }
      router.push('/dashboard');
    } catch (error: any) {
      toast.toast({
        title: 'Login Error',
        description:
          error?.message ||
          'An error occurred while trying to log you in. Please try again.',
        variant: 'destructive',
      });
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const benefits = [
    { icon: CheckCircle, text: 'Track unlimited subscriptions' },
    { icon: Star, text: 'Get smart renewal notifications' },
    { icon: Users, text: 'Collaborate with your team' },
    { icon: Shield, text: 'Enterprise-grade security' },
  ];

  return (
    <GuestGuard>
      <div className='flex min-h-screen bg-background'>
        {/* Left side - Illustration */}
        <div className='relative flex-col items-center justify-center hidden p-12 overflow-hidden text-white lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700'>
          {/* Background Pattern */}
          <div className='absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-indigo-700/20 backdrop-blur-3xl'></div>
          <div className='absolute inset-0 bg-[url(&apos;data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E&apos;)] opacity-30'></div>

          <div className='relative z-10 max-w-md text-center'>
            <div className='flex items-center justify-center w-24 h-24 mx-auto mb-8 shadow-2xl bg-white/20 backdrop-blur-md rounded-3xl'>
              <Shield className='w-12 h-12' />
            </div>
            <h1 className='mb-6 text-4xl font-bold'>
              <Balancer>Welcome back to SubTrackr</Balancer>
            </h1>
            <p className='mb-8 text-xl leading-relaxed text-blue-100'>
              <Balancer>
                Sign in to access your subscription dashboard and manage your
                services efficiently.
              </Balancer>
            </p>
            <div className='space-y-4'>
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className='flex items-center p-4 space-x-3 bg-white/10 backdrop-blur-md rounded-xl'
                >
                  <benefit.icon className='w-5 h-5 text-green-300' />
                  <span className='font-medium text-blue-100'>
                    {benefit.text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right side - Login form */}
        <div className='relative flex items-center justify-center flex-1 p-8 bg-background'>
          <div className='w-full max-w-md'>
            <div className='mb-8 text-center'>
              <Link
                href='/'
                className='inline-flex items-center mb-8 space-x-2 group'
              >
                <div className='flex items-center justify-center w-10 h-10 transition-all duration-200 shadow-lg bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl group-hover:shadow-xl'>
                  <Shield className='w-6 h-6 text-white' />
                </div>
                <span className='text-2xl font-bold text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text'>
                  SubTrackr
                </span>
              </Link>
            </div>

            <Card className='transition-all duration-300 border-0 shadow-xl bg-card/80 backdrop-blur-md hover:shadow-2xl'>
              <CardHeader className='pb-6 text-center'>
                <CardTitle className='text-2xl font-bold'>
                  Welcome back
                </CardTitle>
                <CardDescription className='text-base'>
                  Enter your credentials to access your account
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleLogin} className='space-y-6'>
                  <div className='space-y-2'>
                    <Label htmlFor='email' className='font-medium'>
                      Email
                    </Label>
                    <div className='relative'>
                      <Mail className='absolute w-4 h-4 left-3 top-3 text-muted-foreground' />
                      <Input
                        id='email'
                        type='email'
                        value={form.email}
                        onChange={e =>
                          setform({ ...form, email: e.target.value })
                        }
                        placeholder='your@email.com'
                        className='h-12 pl-10 transition-all duration-200 border-0 bg-muted/30 focus:bg-background focus:ring-2 focus:ring-blue-500/20'
                        required
                      />
                    </div>
                  </div>
                  <div className='space-y-2'>
                    <Label htmlFor='password' className='font-medium'>
                      Password
                    </Label>
                    <div className='relative'>
                      <Lock className='absolute w-4 h-4 left-3 top-3 text-muted-foreground' />
                      <Input
                        value={form.password}
                        onChange={e =>
                          setform({ ...form, password: e.target.value })
                        }
                        id='password'
                        type='password'
                        placeholder='Enter your password'
                        className='h-12 pl-10 transition-all duration-200 border-0 bg-muted/30 focus:bg-background focus:ring-2 focus:ring-blue-500/20'
                        required
                      />
                    </div>
                  </div>
                  <div className='flex items-center justify-between'>
                    <Link
                      href='#'
                      className='text-sm font-medium text-blue-600 hover:underline'
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <Button
                    type='submit'
                    className='w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-200 font-semibold text-base hover:scale-[1.02] active:scale-[0.98]'
                    disabled={isLoading}
                  >
                    {isLoading ? 'Signing in...' : 'Sign in'}
                  </Button>
                </form>
              </CardContent>
            </Card>

            <div className='mt-8 text-center'>
              <p className='text-sm text-muted-foreground'>
                Don't have an account?{' '}
                <Link
                  href='/signup'
                  className='font-medium text-blue-600 hover:underline'
                >
                  Sign up here
                </Link>
              </p>
            </div>
          </div>
        </div>
        <Toaster />
      </div>
    </GuestGuard>
  );
}
