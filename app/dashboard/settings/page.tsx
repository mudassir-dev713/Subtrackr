import { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import {
  Lock,
  Bell,
  CreditCard,
  Download,
  Shield,
  Mail,
  Calendar,
  DollarSign,
  Trash2,
  Edit,
} from 'lucide-react';

export default function SettingsPage() {
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    renewalAlerts: true,
    budgetAlerts: true,
    teamUpdates: false,
    marketingEmails: false,
  });

  const [isLoading, setIsLoading] = useState(false);

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setPasswordForm({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
    }, 1000);
  };

  const handleNotificationChange = (key: string, value: boolean) => {
    setNotifications(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleExportData = () => {
    // Simulate CSV export
    const csvData =
      'data:text/csv;charset=utf-8,Service,Amount,Frequency,Next Billing\nAdobe Creative Cloud,$52.99,Monthly,2024-01-15\nGitHub Pro,$4.00,Monthly,2024-01-18';
    const link = document.createElement('a');
    link.setAttribute('href', encodeURI(csvData));
    link.setAttribute('download', 'subscriptions-export.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const paymentMethods = [
    {
      id: 1,
      type: 'Visa',
      last4: '4242',
      expiry: '12/25',
      isDefault: true,
    },
    {
      id: 2,
      type: 'Mastercard',
      last4: '8888',
      expiry: '08/26',
      isDefault: false,
    },
  ];

  return (
    <DashboardLayout>
      <div className='p-6 max-w-4xl mx-auto'>
        <div className='mb-8'>
          <h1 className='text-3xl font-bold'>Settings</h1>
          <p className='text-muted-foreground mt-1'>
            Manage your account settings and preferences.
          </p>
        </div>

        <div className='space-y-6'>
          {/* Change Password */}
          <Card>
            <CardHeader>
              <CardTitle className='flex items-center space-x-2'>
                <Lock className='w-5 h-5' />
                <span>Change Password</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handlePasswordChange} className='space-y-4'>
                <div className='space-y-2'>
                  <Label htmlFor='currentPassword'>Current Password</Label>
                  <Input
                    id='currentPassword'
                    type='password'
                    value={passwordForm.currentPassword}
                    onChange={e =>
                      setPasswordForm({
                        ...passwordForm,
                        currentPassword: e.target.value,
                      })
                    }
                    required
                  />
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='newPassword'>New Password</Label>
                  <Input
                    id='newPassword'
                    type='password'
                    value={passwordForm.newPassword}
                    onChange={e =>
                      setPasswordForm({
                        ...passwordForm,
                        newPassword: e.target.value,
                      })
                    }
                    required
                  />
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='confirmPassword'>Confirm New Password</Label>
                  <Input
                    id='confirmPassword'
                    type='password'
                    value={passwordForm.confirmPassword}
                    onChange={e =>
                      setPasswordForm({
                        ...passwordForm,
                        confirmPassword: e.target.value,
                      })
                    }
                    required
                  />
                </div>
                <Button type='submit' disabled={isLoading}>
                  {isLoading ? 'Updating...' : 'Update Password'}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Notification Preferences */}
          <Card>
            <CardHeader>
              <CardTitle className='flex items-center space-x-2'>
                <Bell className='w-5 h-5' />
                <span>Notification Preferences</span>
              </CardTitle>
            </CardHeader>
            <CardContent className='space-y-6'>
              <div className='flex items-center justify-between'>
                <div className='space-y-0.5'>
                  <Label className='text-base'>Email Notifications</Label>
                  <p className='text-sm text-muted-foreground'>
                    Receive email notifications about your subscriptions
                  </p>
                </div>
                <Switch
                  checked={notifications.emailNotifications}
                  onCheckedChange={value =>
                    handleNotificationChange('emailNotifications', value)
                  }
                />
              </div>

              <Separator />

              <div className='flex items-center justify-between'>
                <div className='space-y-0.5'>
                  <Label className='text-base flex items-center space-x-2'>
                    <Calendar className='w-4 h-4' />
                    <span>Renewal Alerts</span>
                  </Label>
                  <p className='text-sm text-muted-foreground'>
                    Get notified before subscriptions renew
                  </p>
                </div>
                <Switch
                  checked={notifications.renewalAlerts}
                  onCheckedChange={value =>
                    handleNotificationChange('renewalAlerts', value)
                  }
                />
              </div>

              <div className='flex items-center justify-between'>
                <div className='space-y-0.5'>
                  <Label className='text-base flex items-center space-x-2'>
                    <DollarSign className='w-4 h-4' />
                    <span>Budget Alerts</span>
                  </Label>
                  <p className='text-sm text-muted-foreground'>
                    Receive alerts when approaching budget limits
                  </p>
                </div>
                <Switch
                  checked={notifications.budgetAlerts}
                  onCheckedChange={value =>
                    handleNotificationChange('budgetAlerts', value)
                  }
                />
              </div>

              <div className='flex items-center justify-between'>
                <div className='space-y-0.5'>
                  <Label className='text-base'>Team Updates</Label>
                  <p className='text-sm text-muted-foreground'>
                    Get notified about team member activities
                  </p>
                </div>
                <Switch
                  checked={notifications.teamUpdates}
                  onCheckedChange={value =>
                    handleNotificationChange('teamUpdates', value)
                  }
                />
              </div>

              <div className='flex items-center justify-between'>
                <div className='space-y-0.5'>
                  <Label className='text-base'>Marketing Emails</Label>
                  <p className='text-sm text-muted-foreground'>
                    Receive product updates and tips
                  </p>
                </div>
                <Switch
                  checked={notifications.marketingEmails}
                  onCheckedChange={value =>
                    handleNotificationChange('marketingEmails', value)
                  }
                />
              </div>
            </CardContent>
          </Card>

          {/* Payment Methods */}
          <Card>
            <CardHeader>
              <CardTitle className='flex items-center space-x-2'>
                <CreditCard className='w-5 h-5' />
                <span>Payment Methods</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className='space-y-4'>
                {paymentMethods.map(method => (
                  <div
                    key={method.id}
                    className='flex items-center justify-between p-4 border rounded-lg'
                  >
                    <div className='flex items-center space-x-3'>
                      <div className='w-10 h-10 bg-muted rounded-lg flex items-center justify-center'>
                        <CreditCard className='w-5 h-5 text-muted-foreground' />
                      </div>
                      <div>
                        <p className='font-medium'>
                          {method.type} •••• {method.last4}
                        </p>
                        <p className='text-sm text-muted-foreground'>
                          Expires {method.expiry}
                        </p>
                      </div>
                      {method.isDefault && (
                        <Badge variant='secondary'>Default</Badge>
                      )}
                    </div>
                    <div className='flex items-center space-x-2'>
                      <Button variant='ghost' size='sm'>
                        <Edit className='w-4 h-4' />
                      </Button>
                      <Button variant='ghost' size='sm'>
                        <Trash2 className='w-4 h-4' />
                      </Button>
                    </div>
                  </div>
                ))}
                <Button variant='outline' className='w-full'>
                  <CreditCard className='w-4 h-4 mr-2' />
                  Add Payment Method
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Export Data */}
          <Card>
            <CardHeader>
              <CardTitle className='flex items-center space-x-2'>
                <Download className='w-5 h-5' />
                <span>Export Data</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className='space-y-4'>
                <p className='text-muted-foreground'>
                  Export your subscription data for backup or analysis purposes.
                </p>
                <Button
                  onClick={handleExportData}
                  className='flex items-center space-x-2'
                >
                  <Download className='w-4 h-4' />
                  <span>Download CSV</span>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Security */}
          <Card>
            <CardHeader>
              <CardTitle className='flex items-center space-x-2'>
                <Shield className='w-5 h-5' />
                <span>Security</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className='space-y-4'>
                <div className='flex items-center justify-between'>
                  <div>
                    <p className='font-medium'>Two-Factor Authentication</p>
                    <p className='text-sm text-muted-foreground'>
                      Add an extra layer of security to your account
                    </p>
                  </div>
                  <Button variant='outline'>Enable 2FA</Button>
                </div>
                <Separator />
                <div className='flex items-center justify-between'>
                  <div>
                    <p className='font-medium'>Active Sessions</p>
                    <p className='text-sm text-muted-foreground'>
                      Manage your active login sessions
                    </p>
                  </div>
                  <Button variant='outline'>View Sessions</Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Danger Zone */}
          <Card className='border-red-200'>
            <CardHeader>
              <CardTitle className='flex items-center space-x-2 text-red-600'>
                <Trash2 className='w-5 h-5' />
                <span>Danger Zone</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className='space-y-4'>
                <p className='text-muted-foreground'>
                  Once you delete your account, there is no going back. Please
                  be certain.
                </p>
                <Button variant='destructive'>Delete Account</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
