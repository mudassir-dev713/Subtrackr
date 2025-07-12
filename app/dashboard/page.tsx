'use client';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import Balancer from 'react-wrap-balancer';
import {
  DollarSign,
  Calendar,
  CreditCard,
  TrendingUp,
  AlertCircle,
  Plus,
  ArrowRight,
  TrendingDown,
} from 'lucide-react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const upcomingRenewals = [
    {
      id: 1,
      name: 'Adobe Creative Cloud',
      assignedTo: 'John Doe',
      amount: '$52.99',
      date: '2024-01-15',
      daysUntil: 3,
      status: 'warning',
    },
    {
      id: 2,
      name: 'GitHub Pro',
      assignedTo: 'Sarah Chen',
      amount: '$4.00',
      date: '2024-01-18',
      daysUntil: 6,
      status: 'info',
    },
    {
      id: 3,
      name: 'Slack Premium',
      assignedTo: 'Team',
      amount: '$6.67',
      date: '2024-01-20',
      daysUntil: 8,
      status: 'info',
    },
    {
      id: 4,
      name: 'Figma Professional',
      assignedTo: 'Design Team',
      amount: '$12.00',
      date: '2024-01-22',
      daysUntil: 10,
      status: 'success',
    },
  ];

  const recentActivity = [
    {
      action: 'Added Netflix subscription',
      user: 'John Doe',
      time: '2 hours ago',
    },
    { action: 'Updated Slack billing', user: 'Sarah Chen', time: '1 day ago' },
    {
      action: 'Cancelled Adobe subscription',
      user: 'Mike Johnson',
      time: '3 days ago',
    },
    { action: 'Added team member', user: 'John Doe', time: '1 week ago' },
  ];

  return (
    <DashboardLayout>
      <div className='p-6 max-w-7xl mx-auto'>
        <div className='flex justify-between items-center mb-8'>
          <div>
            <h1 className='text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'>
              Dashboard
            </h1>
            <p className='text-muted-foreground mt-2 text-lg capitalize'>
              <Balancer>
                Welcome back,{' '}
                {status === 'loading' ? '...' : session?.user?.name || 'User'}!
                Here's your subscription overview.
              </Balancer>
            </p>
          </div>
          <Link href='/subscriptions/add'>
            <Button className='flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-200 font-medium'>
              <Plus className='w-4 h-4' />
              <span>Add Subscription</span>
            </Button>
          </Link>
        </div>

        {/* Overview Cards */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8'>
          <Card className='border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white dark:bg-card'>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium text-muted-foreground'>
                Monthly Cost
              </CardTitle>
              <div className='w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center shadow-md'>
                <DollarSign className='h-5 w-5 text-white' />
              </div>
            </CardHeader>
            <CardContent>
              <div className='text-3xl font-bold mb-2'>$1,247.32</div>
              <p className='text-xs text-green-600 flex items-center'>
                <TrendingUp className='w-3 h-3 mr-1' />
                +12% from last month
              </p>
            </CardContent>
          </Card>

          <Card className='border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white dark:bg-card'>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium text-muted-foreground'>
                Annual Cost
              </CardTitle>
              <div className='w-10 h-10 bg-gradient-to-br from-purple-500 to-violet-500 rounded-xl flex items-center justify-center shadow-md'>
                <Calendar className='h-5 w-5 text-white' />
              </div>
            </CardHeader>
            <CardContent>
              <div className='text-3xl font-bold mb-2'>$14,967.84</div>
              <p className='text-xs text-muted-foreground'>
                Projected yearly spending
              </p>
            </CardContent>
          </Card>

          <Card className='border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white dark:bg-card'>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium text-muted-foreground'>
                Active Subscriptions
              </CardTitle>
              <div className='w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-md'>
                <CreditCard className='h-5 w-5 text-white' />
              </div>
            </CardHeader>
            <CardContent>
              <div className='text-3xl font-bold mb-2'>23</div>
              <p className='text-xs text-muted-foreground'>
                Across 5 team members
              </p>
            </CardContent>
          </Card>

          <Card className='border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white dark:bg-card'>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium text-muted-foreground'>
                Renewals This Week
              </CardTitle>
              <div className='w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center shadow-md'>
                <AlertCircle className='h-5 w-5 text-white' />
              </div>
            </CardHeader>
            <CardContent>
              <div className='text-3xl font-bold mb-2'>4</div>
              <p className='text-xs text-orange-600'>Requires attention</p>
            </CardContent>
          </Card>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
          {/* Upcoming Renewals */}
          <div className='lg:col-span-2'>
            <Card className='border-0 shadow-lg bg-white dark:bg-card'>
              <CardHeader className='flex flex-row items-center justify-between'>
                <CardTitle className='flex items-center space-x-2 text-xl'>
                  <div className='w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center shadow-md'>
                    <Calendar className='w-4 h-4 text-white' />
                  </div>
                  <span>Upcoming Renewals</span>
                </CardTitle>
                <Link href='/subscriptions'>
                  <Button
                    variant='ghost'
                    size='sm'
                    className='flex items-center space-x-1 hover:bg-muted/30 font-medium'
                  >
                    <span>View all</span>
                    <ArrowRight className='w-4 h-4' />
                  </Button>
                </Link>
              </CardHeader>
              <CardContent>
                <div className='space-y-4'>
                  {upcomingRenewals.map(subscription => (
                    <div
                      key={subscription.id}
                      className='flex items-center justify-between p-4 bg-gradient-to-r from-muted/20 to-muted/10 rounded-xl border border-border/30 hover:shadow-md transition-all duration-200'
                    >
                      <div className='flex items-center space-x-4'>
                        <div className='w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center shadow-md'>
                          <CreditCard className='w-6 h-6 text-white' />
                        </div>
                        <div>
                          <p className='font-semibold text-base'>
                            {subscription.name}
                          </p>
                          <p className='text-sm text-muted-foreground'>
                            Assigned to {subscription.assignedTo}
                          </p>
                        </div>
                      </div>
                      <div className='text-right'>
                        <p className='font-semibold text-base'>
                          {subscription.amount}
                        </p>
                        <div className='flex items-center space-x-2'>
                          <p className='text-sm text-muted-foreground'>
                            {subscription.date}
                          </p>
                          <Badge
                            variant={
                              subscription.status === 'warning'
                                ? 'destructive'
                                : 'secondary'
                            }
                            className='font-medium'
                          >
                            {subscription.daysUntil} days
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className='space-y-6'>
            {/* Spending Progress */}
            <Card className='border-0 shadow-lg bg-white dark:bg-card'>
              <CardHeader>
                <CardTitle className='text-lg flex items-center space-x-2'>
                  <div className='w-6 h-6 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center shadow-md'>
                    <DollarSign className='w-4 h-4 text-white' />
                  </div>
                  <span>Monthly Budget</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className='space-y-4'>
                  <div className='flex justify-between items-center'>
                    <span className='text-sm text-muted-foreground font-medium'>
                      Used
                    </span>
                    <span className='text-sm font-semibold'>
                      $1,247 / $1,500
                    </span>
                  </div>
                  <Progress value={83} className='h-3' />
                  <p className='text-xs text-muted-foreground'>
                    You've used 83% of your monthly budget
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className='border-0 shadow-lg bg-white dark:bg-card'>
              <CardHeader>
                <CardTitle className='text-lg'>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className='space-y-4'>
                  {recentActivity.map((activity, index) => (
                    <div key={index} className='flex items-start space-x-3'>
                      <div className='w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mt-2 flex-shrink-0'></div>
                      <div className='flex-1'>
                        <p className='text-sm font-medium'>{activity.action}</p>
                        <p className='text-xs text-muted-foreground'>
                          {activity.user} • {activity.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
