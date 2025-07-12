'use client';

import { CardSpotlight } from '@/components/ui/card-spotlight';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  DollarSign,
  Calendar,
  CreditCard,
  AlertCircle,
  Info,
  TrendingUp,
} from 'lucide-react';
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from '@/components/ui/tooltip';

const CardSpotlightSection = () => {
  return (
    <div className='grid grid-cols-1 gap-6 mb-8 md:grid-cols-2 lg:grid-cols-4'>
      <CardSpotlight
        color=''
        radius={200}
        className='shadow-lg hover:shadow-xl'
      >
        <Card className='bg-transparent border-0 shadow-none'>
          <CardHeader className='flex flex-row items-center justify-between pb-2 space-y-0'>
            <div className='flex items-center space-x-2'>
              <CardTitle className='text-sm font-medium text-muted-foreground'>
                Monthly Cost
              </CardTitle>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className='w-4 h-4 text-muted-foreground cursor-help' />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Total monthly subscription expenses</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <div className='flex items-center justify-center w-10 h-10 shadow-md bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl'>
              <DollarSign className='w-5 h-5 text-white' />
            </div>
          </CardHeader>
          <CardContent>
            <div className='mb-2 text-3xl font-bold'>$1,247.32</div>
            <p className='flex items-center text-xs text-green-600'>
              <TrendingUp className='w-3 h-3 mr-1' />
              +12% from last month
            </p>
          </CardContent>
        </Card>
      </CardSpotlight>

      <CardSpotlight radius={200} className='shadow-lg hover:shadow-xl'>
        <Card className='bg-transparent border-0 shadow-none '>
          <CardHeader className='flex flex-row items-center justify-between pb-2 space-y-0'>
            <CardTitle className='text-sm font-medium text-muted-foreground'>
              Annual Cost
            </CardTitle>
            <div className='flex items-center justify-center w-10 h-10 shadow-md bg-gradient-to-br from-purple-500 to-violet-500 rounded-xl'>
              <Calendar className='w-5 h-5 text-white' />
            </div>
          </CardHeader>
          <CardContent>
            <div className='mb-2 text-3xl font-bold'>$14,967.84</div>
            <p className='text-xs text-muted-foreground'>
              Projected yearly spending
            </p>
          </CardContent>
        </Card>
      </CardSpotlight>

      <CardSpotlight radius={200} className='shadow-lg hover:shadow-xl'>
        <Card className='bg-transparent border-0 shadow-none'>
          <CardHeader className='flex flex-row items-center justify-between pb-2 space-y-0'>
            <div className='flex items-center space-x-2'>
              <CardTitle className='text-sm font-medium text-muted-foreground'>
                Active Subscriptions
              </CardTitle>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className='w-4 h-4 text-muted-foreground cursor-help' />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Number of active subscriptions across your team</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <div className='flex items-center justify-center w-10 h-10 shadow-md bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl'>
              <CreditCard className='w-5 h-5 text-white' />
            </div>
          </CardHeader>
          <CardContent>
            <div className='mb-2 text-3xl font-bold'>23</div>
            <p className='text-xs text-muted-foreground'>
              Across 5 team members
            </p>
          </CardContent>
        </Card>
      </CardSpotlight>

      <CardSpotlight radius={200} className='shadow-lg hover:shadow-xl'>
        <Card className='bg-transparent border-0 shadow-none'>
          <CardHeader className='flex flex-row items-center justify-between pb-2 space-y-0'>
            <div className='flex items-center space-x-2'>
              <CardTitle className='text-sm font-medium text-muted-foreground'>
                Renewals This Week
              </CardTitle>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className='w-4 h-4 text-muted-foreground cursor-help' />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Subscriptions renewing in the next 7 days</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <div className='flex items-center justify-center w-10 h-10 shadow-md bg-gradient-to-br from-orange-500 to-red-500 rounded-xl'>
              <AlertCircle className='w-5 h-5 text-white' />
            </div>
          </CardHeader>
          <CardContent>
            <div className='mb-2 text-3xl font-bold'>4</div>
            <p className='text-xs text-orange-600'>Requires attention</p>
          </CardContent>
        </Card>
      </CardSpotlight>
    </div>
  );
};

export default CardSpotlightSection;
