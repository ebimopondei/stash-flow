import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { UserSidebar } from '@/components/layout/UserSidebar';

const Settings = () => {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(false);

  return (
    <SidebarProvider>
        <div className="min-h-screen flex w-full">
            <UserSidebar />
            <main className='flex-1  p-6 bg-gray-50'>
                <div className="max-w-4xl ">
                <div className="mb-8 flex items-center space-x-4">
                    <SidebarTrigger />
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
                        <p className="text-gray-600">Manage your account preferences</p>
                    </div>

                </div>

                <div className="space-y-6">
                {/* Notifications */}
                <Card className="bg-white shadow-sm">
                    <CardHeader>
                    <CardTitle>Notifications</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div>
                        <Label className="text-sm font-medium">Email Notifications</Label>
                        <p className="text-sm text-gray-600">Receive email updates about your goals</p>
                        </div>
                        <Switch 
                        checked={emailNotifications}
                        onCheckedChange={setEmailNotifications}
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <div>
                        <Label className="text-sm font-medium">Push Notifications</Label>
                        <p className="text-sm text-gray-600">Receive push notifications on your device</p>
                        </div>
                        <Switch 
                        checked={pushNotifications}
                        onCheckedChange={setPushNotifications}
                        />
                    </div>
                    </CardContent>
                </Card>

                {/* Security */}
                <Card className="bg-white shadow-sm">
                    <CardHeader>
                    <CardTitle>Security</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="current-password">Current Password</Label>
                        <Input
                        id="current-password"
                        type="password"
                        placeholder="Enter current password"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="new-password">New Password</Label>
                        <Input
                        id="new-password"
                        type="password"
                        placeholder="Enter new password"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="confirm-password">Confirm New Password</Label>
                        <Input
                        id="confirm-password"
                        type="password"
                        placeholder="Confirm new password"
                        />
                    </div>
                    <Button className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600">
                        Update Password
                    </Button>
                    </CardContent>
                </Card>

                {/* PIN Settings */}
                <Card className="bg-white shadow-sm">
                    <CardHeader>
                    <CardTitle>Transaction PIN</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="current-pin">Current PIN</Label>
                        <Input
                        id="current-pin"
                        type="password"
                        placeholder="Enter current PIN"
                        maxLength={4}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="new-pin">New PIN</Label>
                        <Input
                        id="new-pin"
                        type="password"
                        placeholder="Enter new PIN"
                        maxLength={4}
                        />
                    </div>
                    <Button className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600">
                        Update PIN
                    </Button>
                    </CardContent>
                </Card>
                </div>
            </div>
            </main>
            </div>
    </SidebarProvider>
  );
};

export default Settings;