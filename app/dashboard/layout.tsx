'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
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
  Router,
} from 'lucide-react';
import { useSession, signOut } from 'next-auth/react';
import Loader from '@/components/Loader';
import { useEffect } from 'react';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, status } = useSession();

  const handleLogout = async () => {
    try {
      await signOut({ callbackUrl: '/login' });
    } catch (error) {
      console.error('Logout error:', error);
      router.push('/login');
    }
  };

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    {
      name: 'Subscriptions',
      href: '/dashboard/subscriptions',
      icon: CreditCard,
    },
    { name: 'Team', href: '/dashboard/team', icon: Users },
    { name: 'Settings', href: '/dashboard/settings', icon: Settings },
  ];

  // Handle authentication states
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  // Show loading while checking authentication
  if (status === 'loading') {
    return <Loader />;
  }

  // Don't render anything if not authenticated (middleware should handle this, but extra safety)
  if (status === 'unauthenticated') {
    return null;
  }

  return (
    <TooltipProvider>
      <div className='min-h-screen bg-background'>
        {/* Header */}
        <header className='fixed top-0 z-50 w-full border-b bg-background border-border'>
          <div className='px-6 lg:px-8'>
            <div className='flex items-center justify-between h-16'>
              <div className='flex items-center space-x-8'>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link
                      href='/dashboard'
                      className='flex items-center space-x-2 group'
                    >
                      <div className='flex items-center justify-center w-8 h-8 transition-all duration-200 shadow-lg bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl group-hover:shadow-xl'>
                        <Shield className='w-5 h-5 text-white' />
                      </div>
                      <span className='text-xl font-bold text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text'>
                        SubTrackr
                      </span>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Go to Dashboard</p>
                  </TooltipContent>
                </Tooltip>

                <nav className='hidden space-x-2 md:flex'>
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
                    <Link href='/dashboard/subscriptions/new'>
                      <Button
                        size='sm'
                        className='items-center hidden space-x-2 font-medium transition-all duration-200 shadow-lg sm:flex bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 hover:shadow-xl'
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
                      <span className='absolute w-2 h-2 rounded-full -top-1 -right-1 bg-gradient-to-r from-red-500 to-pink-500 animate-pulse'></span>
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
                          className='relative w-8 h-8 transition-all duration-200 rounded-full hover:ring-2 hover:ring-blue-500/20'
                        >
                          <Avatar className='w-8 h-8'>
                            <AvatarImage
                              src='https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400'
                              alt='User'
                            />
                            <AvatarFallback className='font-semibold text-white bg-gradient-to-br from-blue-500 to-purple-500'>
                              {session?.user?.name?.charAt(0)?.toUpperCase() ||
                                'U'}
                            </AvatarFallback>
                          </Avatar>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        className='w-56'
                        align='end'
                        forceMount
                      >
                        <div className='flex flex-col p-2 space-y-1'>
                          <p className='text-sm font-medium leading-none capitalize'>
                            {session?.user?.name || 'User'}
                          </p>
                          <p className='text-xs leading-none text-muted-foreground'>
                            {session?.user?.email || 'No email'}
                          </p>
                        </div>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                          <Link
                            href='/dashboard/settings'
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
