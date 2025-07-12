import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import DashboardLayout from '@/components/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { format } from 'date-fns';
import { CalendarIcon, Save, X } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function AddSubscriptionPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = Boolean(id);

  const [formData, setFormData] = useState({
    serviceName: '',
    amount: '',
    frequency: '',
    nextBilling: undefined as Date | undefined,
    tag: '',
    assignedTo: '',
    paymentMethod: '',
    notes: '',
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      navigate('/subscriptions');
    }, 1000);
  };

  const handleCancel = () => {
    navigate('/subscriptions');
  };

  const frequencies = ['Monthly', 'Yearly', 'Weekly', 'Quarterly'];
  const tags = [
    'Design',
    'Development',
    'Communication',
    'Infrastructure',
    'Entertainment',
    'Productivity',
    'Marketing',
  ];
  const teamMembers = [
    'John Doe',
    'Sarah Chen',
    'Mike Johnson',
    'Emily Davis',
    'Team',
    'Design Team',
    'Dev Team',
  ];
  const paymentMethods = [
    'Company Card (*1234)',
    'Business Account (*5678)',
    'Petty Cash',
    'Personal (Reimbursed)',
  ];

  return (
    <DashboardLayout>
      <div className='p-6 max-w-4xl mx-auto'>
        <div className='flex items-center justify-between mb-8'>
          <div>
            <h1 className='text-3xl font-bold'>
              {isEditing ? 'Edit Subscription' : 'Add New Subscription'}
            </h1>
            <p className='text-muted-foreground mt-1'>
              {isEditing
                ? 'Update subscription details'
                : 'Add a new subscription to track'}
            </p>
          </div>
          <Button
            variant='outline'
            onClick={handleCancel}
            className='flex items-center space-x-2'
          >
            <X className='w-4 h-4' />
            <span>Cancel</span>
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Subscription Details</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className='space-y-6'>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <div className='space-y-2'>
                  <Label htmlFor='serviceName'>Service Name *</Label>
                  <Input
                    id='serviceName'
                    placeholder='e.g., Adobe Creative Cloud'
                    value={formData.serviceName}
                    onChange={e =>
                      setFormData({ ...formData, serviceName: e.target.value })
                    }
                    required
                  />
                </div>

                <div className='space-y-2'>
                  <Label htmlFor='amount'>Amount *</Label>
                  <Input
                    id='amount'
                    type='number'
                    step='0.01'
                    placeholder='0.00'
                    value={formData.amount}
                    onChange={e =>
                      setFormData({ ...formData, amount: e.target.value })
                    }
                    required
                  />
                </div>

                <div className='space-y-2'>
                  <Label htmlFor='frequency'>Frequency *</Label>
                  <Select
                    value={formData.frequency}
                    onValueChange={value =>
                      setFormData({ ...formData, frequency: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder='Select frequency' />
                    </SelectTrigger>
                    <SelectContent>
                      {frequencies.map(freq => (
                        <SelectItem key={freq} value={freq}>
                          {freq}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className='space-y-2'>
                  <Label>Next Billing Date *</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant='outline'
                        className={cn(
                          'w-full justify-start text-left font-normal',
                          !formData.nextBilling && 'text-muted-foreground'
                        )}
                      >
                        <CalendarIcon className='mr-2 h-4 w-4' />
                        {formData.nextBilling
                          ? format(formData.nextBilling, 'PPP')
                          : 'Pick a date'}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className='w-auto p-0'>
                      <Calendar
                        mode='single'
                        selected={formData.nextBilling}
                        onSelect={date =>
                          setFormData({ ...formData, nextBilling: date })
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className='space-y-2'>
                  <Label htmlFor='tag'>Tag</Label>
                  <Select
                    value={formData.tag}
                    onValueChange={value =>
                      setFormData({ ...formData, tag: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder='Select a tag' />
                    </SelectTrigger>
                    <SelectContent>
                      {tags.map(tag => (
                        <SelectItem key={tag} value={tag}>
                          {tag}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className='space-y-2'>
                  <Label htmlFor='assignedTo'>Assigned To</Label>
                  <Select
                    value={formData.assignedTo}
                    onValueChange={value =>
                      setFormData({ ...formData, assignedTo: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder='Select team member' />
                    </SelectTrigger>
                    <SelectContent>
                      {teamMembers.map(member => (
                        <SelectItem key={member} value={member}>
                          {member}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className='space-y-2 md:col-span-2'>
                  <Label htmlFor='paymentMethod'>Payment Method</Label>
                  <Select
                    value={formData.paymentMethod}
                    onValueChange={value =>
                      setFormData({ ...formData, paymentMethod: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder='Select payment method' />
                    </SelectTrigger>
                    <SelectContent>
                      {paymentMethods.map(method => (
                        <SelectItem key={method} value={method}>
                          {method}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className='space-y-2 md:col-span-2'>
                  <Label htmlFor='notes'>Notes</Label>
                  <Textarea
                    id='notes'
                    placeholder='Additional notes about this subscription...'
                    value={formData.notes}
                    onChange={e =>
                      setFormData({ ...formData, notes: e.target.value })
                    }
                    rows={3}
                  />
                </div>
              </div>

              <div className='flex justify-end space-x-4 pt-6 border-t'>
                <Button type='button' variant='outline' onClick={handleCancel}>
                  Cancel
                </Button>
                <Button
                  type='submit'
                  disabled={isLoading}
                  className='flex items-center space-x-2'
                >
                  <Save className='w-4 h-4' />
                  <span>{isLoading ? 'Saving...' : 'Save Subscription'}</span>
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
