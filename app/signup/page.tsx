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
import { ThemeToggle } from '@/components/ThemeToggle';
import Balancer from 'react-wrap-balancer';
import {
  Shield,
  Mail,
  Lock,
  CheckCircle,
  Star,
  Users,
  User,
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Toaster } from '@/components/ui/toaster';
import GuestGuard from '@/components/GuestGuard';

export default function SignupPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const router = useRouter();
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value,
    }));
    // Clear error when user starts typing
    if (errors[id]) {
      setErrors(prev => ({
        ...prev,
        [id]: '',
      }));
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (!validateForm()) {
      setIsLoading(false);
      toast({
        title: 'Validation Error',
        description: 'Please fix the errors in the form.',
        variant: 'destructive',
      });
      return;
    }

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.firstName,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error('Registration error:');
        throw new Error(data.error || 'Registration failed');
      }

      // Registration successful
      toast({
        title: 'Account Created!',
        description: 'Welcome to SubTrackr. You can now log in.',
      });
      router.push('/login');
    } catch (error) {
      console.error('Signup error:', error);
      toast({
        title: 'Signup Error',
        description:
          error instanceof Error ? error.message : 'Registration failed',
        variant: 'destructive',
      });
      setErrors({
        submit: error instanceof Error ? error.message : 'Registration failed',
      });
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
      <div className='min-h-screen bg-background flex'>
        {/* Left side - Illustration */}
        <div className='hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 p-12 flex-col justify-center items-center text-white relative overflow-hidden'>
          {/* Background Pattern */}
          <div className='absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-indigo-700/20 backdrop-blur-3xl'></div>
          <div className='absolute inset-0 bg-[url(&apos;data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E&apos;)] opacity-30'></div>

          <div className='max-w-md text-center relative z-10'>
            <div className='w-24 h-24 bg-white/20 backdrop-blur-md rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl'>
              <Shield className='w-12 h-12' />
            </div>
            <h1 className='text-4xl font-bold mb-6'>
              <Balancer>Join SubTrackr Today</Balancer>
            </h1>
            <p className='text-xl text-blue-100 mb-8 leading-relaxed'>
              <Balancer>
                Join thousands of teams who trust SubTrackr to manage their
                subscriptions efficiently and save money.
              </Balancer>
            </p>
            <div className='space-y-4'>
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className='flex items-center space-x-3 bg-white/10 backdrop-blur-md rounded-xl p-4'
                >
                  <benefit.icon className='w-5 h-5 text-green-300' />
                  <span className='text-blue-100 font-medium'>
                    {benefit.text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right side - Signup form */}
        <div className='flex-1 flex items-center justify-center p-8 bg-background relative'>
          <div className='w-full max-w-md'>
            <div className='text-center mb-8'>
              <Link
                href='/'
                className='inline-flex items-center space-x-2 mb-8 group'
              >
                <div className='w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-200'>
                  <Shield className='w-6 h-6 text-white' />
                </div>
                <span className='text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'>
                  SubTrackr
                </span>
              </Link>
            </div>

            <Card className='border-0 shadow-xl bg-card/80 backdrop-blur-md hover:shadow-2xl transition-all duration-300'>
              <CardHeader className='text-center pb-6'>
                <CardTitle className='text-2xl font-bold'>
                  Create your account
                </CardTitle>
                <CardDescription className='text-base'>
                  Get started with SubTrackr today
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSignup} className='space-y-6'>
                  {/* No need to show toast in render, handled in logic above */}
                  <div className='grid grid-cols-2 gap-4'>
                    <div className='space-y-2'>
                      <Label htmlFor='firstName' className='font-medium'>
                        First name
                      </Label>
                      <div className='relative'>
                        <User className='absolute left-3 top-3 h-4 w-4 text-muted-foreground' />
                        <Input
                          id='firstName'
                          value={formData.firstName}
                          onChange={handleInputChange}
                          placeholder='John'
                          className={`pl-10 h-12 border-0 bg-muted/30 focus:bg-background focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 ${
                            errors.firstName ? 'ring-2 ring-red-500/20' : ''
                          }`}
                          required
                        />
                      </div>
                      {errors.firstName && (
                        <p className='text-red-500 text-sm'>
                          {errors.firstName}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className='space-y-2'>
                    <Label htmlFor='email' className='font-medium'>
                      Email
                    </Label>
                    <div className='relative'>
                      <Mail className='absolute left-3 top-3 h-4 w-4 text-muted-foreground' />
                      <Input
                        id='email'
                        type='email'
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder='john@example.com'
                        className={`pl-10 h-12 border-0 bg-muted/30 focus:bg-background focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 ${
                          errors.email ? 'ring-2 ring-red-500/20' : ''
                        }`}
                        required
                      />
                    </div>
                    {errors.email && (
                      <p className='text-red-500 text-sm'>{errors.email}</p>
                    )}
                  </div>
                  <div className='space-y-2'>
                    <Label htmlFor='password' className='font-medium'>
                      Password
                    </Label>
                    <div className='relative'>
                      <Lock className='absolute left-3 top-3 h-4 w-4 text-muted-foreground' />
                      <Input
                        id='password'
                        type='password'
                        value={formData.password}
                        onChange={handleInputChange}
                        placeholder='Create a password'
                        className={`pl-10 h-12 border-0 bg-muted/30 focus:bg-background focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 ${
                          errors.password ? 'ring-2 ring-red-500/20' : ''
                        }`}
                        required
                      />
                    </div>
                    {errors.password && (
                      <p className='text-red-500 text-sm'>{errors.password}</p>
                    )}
                  </div>
                  <div className='space-y-2'>
                    <Label htmlFor='confirmPassword' className='font-medium'>
                      Confirm Password
                    </Label>
                    <div className='relative'>
                      <Lock className='absolute left-3 top-3 h-4 w-4 text-muted-foreground' />
                      <Input
                        id='confirmPassword'
                        type='password'
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        placeholder='Confirm your password'
                        className={`pl-10 h-12 border-0 bg-muted/30 focus:bg-background focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 ${
                          errors.confirmPassword ? 'ring-2 ring-red-500/20' : ''
                        }`}
                        required
                      />
                    </div>
                    {errors.confirmPassword && (
                      <p className='text-red-500 text-sm'>
                        {errors.confirmPassword}
                      </p>
                    )}
                  </div>
                  <Button
                    type='submit'
                    className='w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-200 font-semibold text-base hover:scale-[1.02] active:scale-[0.98]'
                    disabled={isLoading}
                  >
                    {isLoading ? 'Creating account...' : 'Create account'}
                  </Button>
                </form>
              </CardContent>
            </Card>

            <div className='mt-8 text-center'>
              <p className='text-sm text-muted-foreground'>
                Already have an account?{' '}
                <Link
                  href='/login'
                  className='font-medium text-blue-600 hover:underline'
                >
                  Sign in here
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
