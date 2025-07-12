import { useState } from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '@/components/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  MoreHorizontal,
  CreditCard,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export default function SubscriptionsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState('all');
  const [selectedFrequency, setSelectedFrequency] = useState('all');

  const subscriptions = [
    {
      id: 1,
      name: 'Adobe Creative Cloud',
      assignedTo: 'John Doe',
      amount: '$52.99',
      frequency: 'Monthly',
      nextBilling: '2024-01-15',
      tag: 'Design',
      status: 'active',
    },
    {
      id: 2,
      name: 'GitHub Pro',
      assignedTo: 'Sarah Chen',
      amount: '$4.00',
      frequency: 'Monthly',
      nextBilling: '2024-01-18',
      tag: 'Development',
      status: 'active',
    },
    {
      id: 3,
      name: 'Slack Premium',
      assignedTo: 'Team',
      amount: '$6.67',
      frequency: 'Monthly',
      nextBilling: '2024-01-20',
      tag: 'Communication',
      status: 'active',
    },
    {
      id: 4,
      name: 'Figma Professional',
      assignedTo: 'Design Team',
      amount: '$12.00',
      frequency: 'Monthly',
      nextBilling: '2024-01-22',
      tag: 'Design',
      status: 'active',
    },
    {
      id: 5,
      name: 'AWS',
      assignedTo: 'Dev Team',
      amount: '$89.32',
      frequency: 'Monthly',
      nextBilling: '2024-01-25',
      tag: 'Infrastructure',
      status: 'active',
    },
    {
      id: 6,
      name: 'Netflix',
      assignedTo: 'Office',
      amount: '$15.99',
      frequency: 'Monthly',
      nextBilling: '2024-01-28',
      tag: 'Entertainment',
      status: 'active',
    },
    {
      id: 7,
      name: 'Microsoft Office 365',
      assignedTo: 'Team',
      amount: '$299.99',
      frequency: 'Yearly',
      nextBilling: '2024-03-15',
      tag: 'Productivity',
      status: 'active',
    },
    {
      id: 8,
      name: 'Zoom Pro',
      assignedTo: 'HR Team',
      amount: '$14.99',
      frequency: 'Monthly',
      nextBilling: '2024-02-01',
      tag: 'Communication',
      status: 'cancelled',
    },
  ];

  const filteredSubscriptions = subscriptions.filter(sub => {
    const matchesSearch =
      sub.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sub.assignedTo.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTag = selectedTag === 'all' || sub.tag === selectedTag;
    const matchesFrequency =
      selectedFrequency === 'all' || sub.frequency === selectedFrequency;

    return matchesSearch && matchesTag && matchesFrequency;
  });

  const tags = [
    'all',
    'Design',
    'Development',
    'Communication',
    'Infrastructure',
    'Entertainment',
    'Productivity',
  ];
  const frequencies = ['all', 'Monthly', 'Yearly'];

  return (
    <DashboardLayout>
      <div className='p-6 max-w-7xl mx-auto'>
        <div className='flex justify-between items-center mb-8'>
          <div>
            <h1 className='text-3xl font-bold'>Subscriptions</h1>
            <p className='text-muted-foreground mt-1'>
              Manage all your team's subscriptions in one place.
            </p>
          </div>
          <Link to='/subscriptions/add'>
            <Button className='flex items-center space-x-2'>
              <Plus className='w-4 h-4' />
              <span>Add Subscription</span>
            </Button>
          </Link>
        </div>

        {/* Stats Cards */}
        <div className='grid grid-cols-1 md:grid-cols-4 gap-4 mb-8'>
          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>
                Total Subscriptions
              </CardTitle>
              <CreditCard className='h-4 w-4 text-muted-foreground' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>
                {subscriptions.filter(s => s.status === 'active').length}
              </div>
              <p className='text-xs text-muted-foreground'>
                Active subscriptions
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>
                Monthly Total
              </CardTitle>
              <CreditCard className='h-4 w-4 text-muted-foreground' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>$1,247</div>
              <p className='text-xs text-muted-foreground'>Per month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>
                Yearly Total
              </CardTitle>
              <CreditCard className='h-4 w-4 text-muted-foreground' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>$14,968</div>
              <p className='text-xs text-muted-foreground'>Per year</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>
                Next Renewal
              </CardTitle>
              <CreditCard className='h-4 w-4 text-muted-foreground' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>3 days</div>
              <p className='text-xs text-muted-foreground'>
                Adobe Creative Cloud
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className='mb-6'>
          <CardContent className='pt-6'>
            <div className='flex flex-col sm:flex-row gap-4'>
              <div className='flex-1 relative'>
                <Search className='absolute left-3 top-3 h-4 w-4 text-muted-foreground' />
                <Input
                  placeholder='Search subscriptions...'
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className='pl-10'
                />
              </div>
              <Select value={selectedTag} onValueChange={setSelectedTag}>
                <SelectTrigger className='w-full sm:w-48'>
                  <SelectValue placeholder='Filter by tag' />
                </SelectTrigger>
                <SelectContent>
                  {tags.map(tag => (
                    <SelectItem key={tag} value={tag}>
                      {tag === 'all' ? 'All Tags' : tag}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select
                value={selectedFrequency}
                onValueChange={setSelectedFrequency}
              >
                <SelectTrigger className='w-full sm:w-48'>
                  <SelectValue placeholder='Filter by frequency' />
                </SelectTrigger>
                <SelectContent>
                  {frequencies.map(freq => (
                    <SelectItem key={freq} value={freq}>
                      {freq === 'all' ? 'All Frequencies' : freq}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Subscriptions Table */}
        <Card>
          <CardHeader>
            <CardTitle>All Subscriptions</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Service Name</TableHead>
                  <TableHead>Assigned To</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Frequency</TableHead>
                  <TableHead>Next Billing</TableHead>
                  <TableHead>Tag</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className='w-12'></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSubscriptions.map(subscription => (
                  <TableRow key={subscription.id}>
                    <TableCell className='font-medium'>
                      {subscription.name}
                    </TableCell>
                    <TableCell>{subscription.assignedTo}</TableCell>
                    <TableCell>{subscription.amount}</TableCell>
                    <TableCell>{subscription.frequency}</TableCell>
                    <TableCell>{subscription.nextBilling}</TableCell>
                    <TableCell>
                      <Badge variant='secondary'>{subscription.tag}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          subscription.status === 'active'
                            ? 'default'
                            : 'destructive'
                        }
                      >
                        {subscription.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant='ghost' size='sm'>
                            <MoreHorizontal className='w-4 h-4' />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align='end'>
                          <DropdownMenuItem asChild>
                            <Link
                              to={`/subscriptions/edit/${subscription.id}`}
                              className='flex items-center'
                            >
                              <Edit className='w-4 h-4 mr-2' />
                              Edit
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem className='text-red-600'>
                            <Trash2 className='w-4 h-4 mr-2' />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
