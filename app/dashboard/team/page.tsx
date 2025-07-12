'use client';
import { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  UserPlus,
  Mail,
  MoreHorizontal,
  Shield,
  User,
  Trash2,
  Crown,
} from 'lucide-react';

export default function TeamPage() {
  const [inviteEmail, setInviteEmail] = useState('');
  const [isInviteDialogOpen, setIsInviteDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const teamMembers = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      role: 'Owner',
      avatar:
        'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400',
      joinedAt: '2023-01-15',
      subscriptions: 5,
      totalSpend: '$234.56',
    },
    {
      id: 2,
      name: 'Sarah Chen',
      email: 'sarah@example.com',
      role: 'Member',
      avatar:
        'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400',
      joinedAt: '2023-02-20',
      subscriptions: 3,
      totalSpend: '$89.97',
    },
    {
      id: 3,
      name: 'Mike Johnson',
      email: 'mike@example.com',
      role: 'Member',
      avatar:
        'https://images.pexels.com/photos/1674752/pexels-photo-1674752.jpeg?auto=compress&cs=tinysrgb&w=400',
      joinedAt: '2023-03-10',
      subscriptions: 2,
      totalSpend: '$156.78',
    },
    {
      id: 4,
      name: 'Emily Davis',
      email: 'emily@example.com',
      role: 'Member',
      avatar:
        'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=400',
      joinedAt: '2023-04-05',
      subscriptions: 4,
      totalSpend: '$298.45',
    },
  ];

  const handleInvite = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setInviteEmail('');
      setIsInviteDialogOpen(false);
    }, 1000);
  };

  const totalSubscriptions = teamMembers.reduce(
    (sum, member) => sum + member.subscriptions,
    0
  );
  const totalSpend = teamMembers.reduce(
    (sum, member) => sum + parseFloat(member.totalSpend.replace('$', '')),
    0
  );

  return (
    <DashboardLayout>
      <div className='p-6 max-w-7xl mx-auto'>
        <div className='flex justify-between items-center mb-8'>
          <div>
            <h1 className='text-3xl font-bold'>Team Management</h1>
            <p className='text-muted-foreground mt-1'>
              Manage your team members and their access to subscriptions.
            </p>
          </div>
          <Dialog
            open={isInviteDialogOpen}
            onOpenChange={setIsInviteDialogOpen}
          >
            <DialogTrigger asChild>
              <Button className='flex items-center space-x-2'>
                <UserPlus className='w-4 h-4' />
                <span>Invite Member</span>
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Invite Team Member</DialogTitle>
                <DialogDescription>
                  Send an invitation to join your team and manage subscriptions
                  together.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleInvite} className='space-y-4'>
                <div className='space-y-2'>
                  <Label htmlFor='email'>Email Address</Label>
                  <div className='relative'>
                    <Mail className='absolute left-3 top-3 h-4 w-4 text-muted-foreground' />
                    <Input
                      id='email'
                      type='email'
                      placeholder='colleague@example.com'
                      value={inviteEmail}
                      onChange={e => setInviteEmail(e.target.value)}
                      className='pl-10'
                      required
                    />
                  </div>
                </div>
                <div className='flex justify-end space-x-2'>
                  <Button
                    type='button'
                    variant='outline'
                    onClick={() => setIsInviteDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button type='submit' disabled={isLoading}>
                    {isLoading ? 'Sending...' : 'Send Invitation'}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Team Stats */}
        <div className='grid grid-cols-1 md:grid-cols-4 gap-4 mb-8'>
          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>
                Team Members
              </CardTitle>
              <User className='h-4 w-4 text-muted-foreground' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>{teamMembers.length}</div>
              <p className='text-xs text-muted-foreground'>Active members</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>
                Total Subscriptions
              </CardTitle>
              <Shield className='h-4 w-4 text-muted-foreground' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>{totalSubscriptions}</div>
              <p className='text-xs text-muted-foreground'>Managed by team</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>
                Total Spending
              </CardTitle>
              <Shield className='h-4 w-4 text-muted-foreground' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>${totalSpend.toFixed(2)}</div>
              <p className='text-xs text-muted-foreground'>Monthly total</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>
                Average per Member
              </CardTitle>
              <User className='h-4 w-4 text-muted-foreground' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>
                ${(totalSpend / teamMembers.length).toFixed(2)}
              </div>
              <p className='text-xs text-muted-foreground'>Per member</p>
            </CardContent>
          </Card>
        </div>

        {/* Team Members Table */}
        <Card>
          <CardHeader>
            <CardTitle>Team Members</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Member</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Joined</TableHead>
                  <TableHead>Subscriptions</TableHead>
                  <TableHead>Monthly Spend</TableHead>
                  <TableHead className='w-12'></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {teamMembers.map(member => (
                  <TableRow key={member.id}>
                    <TableCell>
                      <div className='flex items-center space-x-3'>
                        <Avatar className='h-8 w-8'>
                          <AvatarImage src={member.avatar} alt={member.name} />
                          <AvatarFallback>
                            {member.name
                              .split(' ')
                              .map(n => n[0])
                              .join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className='font-medium'>{member.name}</p>
                          <p className='text-sm text-muted-foreground'>
                            {member.email}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          member.role === 'Owner' ? 'default' : 'secondary'
                        }
                        className='flex items-center space-x-1 w-fit'
                      >
                        {member.role === 'Owner' && (
                          <Crown className='w-3 h-3' />
                        )}
                        <span>{member.role}</span>
                      </Badge>
                    </TableCell>
                    <TableCell>{member.joinedAt}</TableCell>
                    <TableCell>{member.subscriptions}</TableCell>
                    <TableCell>{member.totalSpend}</TableCell>
                    <TableCell>
                      {member.role !== 'Owner' && (
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant='ghost' size='sm'>
                              <MoreHorizontal className='w-4 h-4' />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align='end'>
                            <DropdownMenuItem>
                              <Crown className='w-4 h-4 mr-2' />
                              Make Owner
                            </DropdownMenuItem>
                            <DropdownMenuItem className='text-red-600'>
                              <Trash2 className='w-4 h-4 mr-2' />
                              Remove Member
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Pending Invitations */}
        <Card className='mt-6'>
          <CardHeader>
            <CardTitle>Pending Invitations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='text-center py-8 text-muted-foreground'>
              <UserPlus className='w-12 h-12 mx-auto mb-4 text-muted-foreground' />
              <p>No pending invitations</p>
              <p className='text-sm'>
                Invite team members to start collaborating
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
