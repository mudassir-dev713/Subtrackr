'use client';

import AuthGuard from '@/components/AuthGuard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import Link from 'next/link';

export default function SubscriptionsPage() {
  return (
    <div className='p-6 max-w-7xl mx-auto'>
      <div className='flex justify-between items-center mb-8'>
        <div>
          <h1 className='text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'>
            Subscriptions
          </h1>
          <p className='text-muted-foreground mt-2'>
            Manage your subscriptions and track renewals
          </p>
        </div>
        <Link href='/dashboard/subscriptions/new'>
          <Button className='flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700'>
            <Plus className='w-4 h-4' />
            <span>Add Subscription</span>
          </Button>
        </Link>
      </div>

      {/* Wrap the main content with AuthGuard for additional protection */}
      <AuthGuard>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          <Card className='border-0 shadow-lg hover:shadow-xl transition-all duration-300'>
            <CardHeader>
              <CardTitle className='flex items-center space-x-2'>
                <div className='w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center'>
                  <span className='text-white font-bold'>N</span>
                </div>
                <span>Netflix</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className='space-y-2'>
                <p className='text-2xl font-bold'>$15.99</p>
                <p className='text-sm text-muted-foreground'>Monthly</p>
                <p className='text-sm text-muted-foreground'>
                  Renews on Jan 15, 2024
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className='border-0 shadow-lg hover:shadow-xl transition-all duration-300'>
            <CardHeader>
              <CardTitle className='flex items-center space-x-2'>
                <div className='w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center'>
                  <span className='text-white font-bold'>S</span>
                </div>
                <span>Spotify</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className='space-y-2'>
                <p className='text-2xl font-bold'>$9.99</p>
                <p className='text-sm text-muted-foreground'>Monthly</p>
                <p className='text-sm text-muted-foreground'>
                  Renews on Jan 20, 2024
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className='border-0 shadow-lg hover:shadow-xl transition-all duration-300'>
            <CardHeader>
              <CardTitle className='flex items-center space-x-2'>
                <div className='w-8 h-8 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center'>
                  <span className='text-white font-bold'>A</span>
                </div>
                <span>Adobe CC</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className='space-y-2'>
                <p className='text-2xl font-bold'>$52.99</p>
                <p className='text-sm text-muted-foreground'>Monthly</p>
                <p className='text-sm text-muted-foreground'>
                  Renews on Jan 25, 2024
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </AuthGuard>
    </div>
  );
}
