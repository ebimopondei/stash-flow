import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { UserSidebar } from '@/components/layout/UserSidebar';

const Profile = () => {
  const [profileData, setProfileData] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    dob: '1995-06-15',
    phone: '+234 806 123 4567'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    // For MVP, just show success message
    alert('Profile updated successfully!');
  };

  return (
    <SidebarProvider>
        <div className="min-h-screen flex w-full">
            <UserSidebar />

            <main className='flex-1 p-6 by-gray-50'>
                <div className="max-w-4xl">
        <div className="mb-8 flex items-center space-x-4">
          <SidebarTrigger />
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Profile</h1>
            <p className="text-gray-600">Manage your personal information</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Picture */}
          <Card className="bg-white shadow-sm">
            <CardHeader>
              <CardTitle>Profile Picture</CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <Avatar className="h-32 w-32 mx-auto">
                <AvatarImage src="" alt="Profile" />
                <AvatarFallback className="bg-secondary text-primary text-2xl font-medium">
                  JD
                </AvatarFallback>
              </Avatar>
              <Button variant="outline" className="w-full">
                Change Picture
              </Button>
            </CardContent>
          </Card>

          {/* Personal Information */}
          <Card className="bg-white shadow-sm lg:col-span-2">
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={profileData.name}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={profileData.email}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dob">Date of Birth</Label>
                  <Input
                    id="dob"
                    name="dob"
                    type="date"
                    value={profileData.dob}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={profileData.phone}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="flex gap-4 pt-4">
                <Button 
                  onClick={handleSave}
                  className="bg-gradient-to-r from-primary to-teal-500 hover:from-primary hover:to-teal-600"
                >
                  Save Changes
                </Button>
                <Button variant="outline">
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
            </main>
    </div>
    </SidebarProvider>
  );
};

export default Profile;