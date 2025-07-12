'use client';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  Shield,
  LayoutDashboard,
  CreditCard,
  Users,
  Settings,
  LogOut,
  Bell,
  Plus,
} from 'lucide-react';
import { useSession, signOut } from 'next-auth/react';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { data: session, status } = useSession();

  const handleLogout = async () => {
    try {
      await signOut({ callbackUrl: '/' });
    } catch (error) {
      console.error('Logout error:', error);
      // Fallback: redirect to home page
      router.push('/');
    }
  };

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Subscriptions', href: '/subscriptions', icon: CreditCard },
    { name: 'Team', href: '/team', icon: Users },
    { name: 'Settings', href: '/settings', icon: Settings },
  ];

  return (
    <TooltipProvider>
      <div className='min-h-screen bg-background'>
        {/* Header */}
        <header className='bg-background border-b border-border fixed w-full top-0 z-50'>
          <div className='px-6 lg:px-8'>
            <div className='flex justify-between items-center h-16'>
              <div className='flex items-center space-x-8'>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link
                      href='/dashboard'
                      className='flex items-center space-x-2 group'
                    >
                      <div className='w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-200'>
                        <Shield className='w-5 h-5 text-white' />
                      </div>
                      <span className='text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'>
                        SubTrackr
                      </span>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Go to Dashboard</p>
                  </TooltipContent>
                </Tooltip>

                <nav className='hidden md:flex space-x-2'>
                  {navigation.map(item => {
                    const isActive = pathname === item.href;
                    return (
                      <Tooltip key={item.name}>
                        <TooltipTrigger asChild>
                          <Link
                            href={item.href}
                            className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                              isActive
                                ? 'bg-gradient-to-r from-blue-500/10 to-purple-500/10 text-blue-300 border border-blue-800/50'
                                : 'text-muted-foreground hover:text-foreground hover:bg-muted/30'
                            }`}
                          >
                            <item.icon className='w-4 h-4' />
                            <span>{item.name}</span>
                          </Link>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{item.name}</p>
                        </TooltipContent>
                      </Tooltip>
                    );
                  })}
                </nav>
              </div>

              <div className='flex items-center space-x-4'>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link href='/subscriptions/add'>
                      <Button
                        size='sm'
                        className='hidden sm:flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-200 font-medium'
                      >
                        <Plus className='w-4 h-4' />
                        <span>Add Subscription</span>
                      </Button>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Add a new subscription</p>
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant='ghost'
                      size='sm'
                      className='relative hover:bg-muted/30 rounded-xl'
                    >
                      <Bell className='w-5 h-5 text-white' />
                      <span className='absolute -top-1 -right-1 w-2 h-2 bg-gradient-to-r from-red-500 to-pink-500 rounded-full animate-pulse'></span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Notifications</p>
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant='ghost'
                          className='relative h-8 w-8 rounded-full hover:ring-2 hover:ring-blue-500/20 transition-all duration-200'
                        >
                          <Avatar className='h-8 w-8'>
                            <AvatarImage
                              src='https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400'
                              alt='User'
                            />
                            <AvatarFallback className='bg-gradient-to-br from-blue-500 to-purple-500 text-white font-semibold'>
                              JD
                            </AvatarFallback>
                          </Avatar>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        className='w-56'
                        align='end'
                        forceMount
                      >
                        <div className='flex flex-col space-y-1 p-2'>
                          <p className='text-sm font-medium leading-none capitalize'>
                            {status === 'loading'
                              ? 'Loading...'
                              : session?.user?.name || 'User'}
                          </p>
                          <p className='text-xs leading-none text-muted-foreground'>
                            {status === 'loading'
                              ? 'Loading...'
                              : session?.user?.email || 'No email'}
                          </p>
                        </div>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                          <Link
                            href='/settings'
                            className='flex items-center space-x-2'
                          >
                            <Settings className='w-4 h-4' />
                            <span>Settings</span>
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={handleLogout}
                          className='flex items-center space-x-2 cursor-pointer'
                        >
                          <LogOut className='w-4 h-4' />
                          <span>Log out</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>User menu</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className='pt-16'>{children}</main>
      </div>
    </TooltipProvider>
  );
}
