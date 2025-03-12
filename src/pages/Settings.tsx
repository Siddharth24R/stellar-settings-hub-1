
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Bell, Shield, Eye, EyeOff, User, LogOut } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const Settings = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [activeSection, setActiveSection] = useState('account'); // Default to account section

  // User profile state
  const [profile, setProfile] = useState({
    name: user?.name || '',
    email: user?.email || '',
    password: '••••••••', // Placeholder password
    phone: '',
    dob: '',
    photo: '/lovable-uploads/ae4c8c1a-19a1-46a8-b684-1b0b6b6f4933.png' // Default avatar
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleGoBack = () => {
    navigate('/dashboard');
  };

  const handleSaveNotifications = () => {
    if (notifications !== user?.notifications) {
      toast({
        title: "Notification Preferences Saved",
        description: `Notifications are now ${notifications ? 'enabled' : 'disabled'}.`,
      });
    }
  };

  const handleSaveSecurity = () => {
    toast({
      title: "Security Settings Saved",
      description: "Your security information has been updated successfully.",
    });
  };

  const handleSaveProfile = () => {
    setIsEditing(false);
    toast({
      title: "Profile Updated",
      description: "Your profile information has been updated successfully.",
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Render section based on active tab
  const renderSection = () => {
    switch (activeSection) {
      case 'account':
        return (
          <Card className="bg-black/40 border border-blue-400/30 backdrop-blur-sm text-white">
            <CardHeader>
              <CardTitle className="text-blue-300">Account Information</CardTitle>
              <CardDescription className="text-blue-100/70">
                Manage your personal information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-blue-900/20 border border-blue-500/30 rounded-lg space-y-6">
                <div className="flex flex-col items-center mb-4">
                  <Avatar className="h-24 w-24 border-2 border-blue-400 mb-2">
                    <AvatarImage src={profile.photo} alt={profile.name} />
                    <AvatarFallback className="bg-blue-900 text-blue-200 text-xl">
                      {profile.name ? profile.name.charAt(0).toUpperCase() : 'U'}
                    </AvatarFallback>
                  </Avatar>
                  {isEditing && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="mt-2 bg-black/30 border-blue-400/50 text-blue-300 hover:bg-black/40"
                    >
                      Change Photo
                    </Button>
                  )}
                </div>

                <div>
                  <Label htmlFor="name" className="font-medium text-blue-200 block mb-1">Full Name:</Label>
                  <Input 
                    id="name"
                    name="name"
                    value={profile.name}
                    onChange={handleInputChange}
                    className="bg-black/30 border-blue-400/30 text-blue-100"
                    readOnly={!isEditing}
                  />
                </div>
                
                <div>
                  <Label htmlFor="email" className="font-medium text-blue-200 block mb-1">Email:</Label>
                  <Input 
                    id="email"
                    name="email"
                    value={profile.email}
                    onChange={handleInputChange}
                    className="bg-black/30 border-blue-400/30 text-blue-100"
                    readOnly={!isEditing || user?.id.startsWith('google-')}
                  />
                </div>
                
                <div>
                  <Label htmlFor="phone" className="font-medium text-blue-200 block mb-1">Phone Number:</Label>
                  <Input 
                    id="phone"
                    name="phone"
                    type="tel"
                    value={profile.phone}
                    onChange={handleInputChange}
                    className="bg-black/30 border-blue-400/30 text-blue-100"
                    readOnly={!isEditing}
                    placeholder={!isEditing && !profile.phone ? "Not set" : ""}
                  />
                </div>
                
                <div>
                  <Label htmlFor="dob" className="font-medium text-blue-200 block mb-1">Date of Birth:</Label>
                  <Input 
                    id="dob"
                    name="dob"
                    type="date"
                    value={profile.dob}
                    onChange={handleInputChange}
                    className="bg-black/30 border-blue-400/30 text-blue-100"
                    readOnly={!isEditing}
                  />
                </div>
                
                <Button 
                  onClick={isEditing ? handleSaveProfile : () => setIsEditing(true)}
                  variant="outline" 
                  size="sm" 
                  className="w-full mt-4 bg-black/20 border-blue-400/50 text-blue-300 hover:bg-black/40"
                >
                  {isEditing ? "Save Profile" : "Edit Profile"}
                </Button>
              </div>
            </CardContent>
          </Card>
        );
      case 'notifications':
        return (
          <Card className="bg-black/40 border border-blue-400/30 backdrop-blur-sm text-white">
            <CardHeader>
              <CardTitle className="text-blue-300">Notification Settings</CardTitle>
              <CardDescription className="text-blue-100/70">
                Manage how and when you receive notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-blue-900/20 border border-blue-500/30 rounded-lg space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Bell className="h-5 w-5 text-blue-300" />
                    <Label htmlFor="notifications" className="text-blue-200">Enable Notifications</Label>
                  </div>
                  <Switch 
                    id="notifications"
                    checked={notifications} 
                    onCheckedChange={setNotifications}
                  />
                </div>
                <p className="text-blue-100/70 text-sm mt-2">
                  {notifications 
                    ? "You will receive notifications about important events." 
                    : "You will not receive any notifications."}
                </p>
                <Button 
                  onClick={handleSaveNotifications}
                  variant="outline" 
                  size="sm" 
                  className="mt-4 bg-black/20 border-blue-400/50 text-blue-300 hover:bg-black/40"
                  disabled={notifications === user?.notifications}
                >
                  Save Preferences
                </Button>
              </div>
            </CardContent>
          </Card>
        );
      case 'security':
        return (
          <Card className="bg-black/40 border border-blue-400/30 backdrop-blur-sm text-white">
            <CardHeader>
              <CardTitle className="text-blue-300">Security Settings</CardTitle>
              <CardDescription className="text-blue-100/70">
                Manage your account security settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-blue-900/20 border border-blue-500/30 rounded-lg space-y-4">
                <div>
                  <Label htmlFor="security-email" className="font-medium text-blue-200 block mb-1">Email:</Label>
                  <Input 
                    id="security-email"
                    name="email"
                    value={profile.email}
                    className="bg-black/30 border-blue-400/30 text-blue-100"
                    readOnly
                  />
                </div>
                
                <div className="relative">
                  <Label htmlFor="password" className="font-medium text-blue-200 block mb-1">Password:</Label>
                  <div className="relative">
                    <Input 
                      id="password"
                      name="password"
                      type={passwordVisible ? "text" : "password"}
                      value={profile.password}
                      onChange={handleInputChange}
                      className="bg-black/30 border-blue-400/30 text-blue-100 pr-10"
                    />
                    <button 
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-300 hover:text-blue-100"
                    >
                      {passwordVisible ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white p-4">
      <div className="max-w-6xl mx-auto">
        <header className="bg-black/40 border border-blue-400/30 backdrop-blur-sm rounded-lg shadow-lg p-4 mb-6 flex justify-between items-center">
          <div className="flex items-center">
            <Button 
              onClick={handleGoBack} 
              variant="ghost" 
              size="icon"
              className="mr-2 text-blue-300 hover:text-blue-200 hover:bg-black/40"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-2xl font-bold text-white">Settings</h1>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Navigation Sidebar */}
          <div className="md:col-span-1">
            <Card className="bg-black/40 border border-blue-400/30 backdrop-blur-sm text-white">
              <CardContent className="p-4">
                <div className="space-y-1 mt-2">
                  <Button 
                    variant="ghost" 
                    className={`w-full justify-start ${activeSection === 'account' ? 'bg-blue-900/30' : ''} text-blue-300 hover:bg-blue-900/30`}
                    onClick={() => setActiveSection('account')}
                  >
                    <User className="mr-2 h-5 w-5" />
                    Account
                  </Button>
                  <Button 
                    variant="ghost" 
                    className={`w-full justify-start ${activeSection === 'notifications' ? 'bg-blue-900/30' : ''} text-blue-300 hover:bg-blue-900/30`}
                    onClick={() => setActiveSection('notifications')}
                  >
                    <Bell className="mr-2 h-5 w-5" />
                    Notifications
                  </Button>
                  <Button 
                    variant="ghost" 
                    className={`w-full justify-start ${activeSection === 'security' ? 'bg-blue-900/30' : ''} text-blue-300 hover:bg-blue-900/30`}
                    onClick={() => setActiveSection('security')}
                  >
                    <Shield className="mr-2 h-5 w-5" />
                    Security
                  </Button>
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start text-blue-300 hover:bg-blue-900/30"
                    onClick={() => navigate('/help')}
                  >
                    <div className="rounded-full bg-gray-800 p-1 mr-2">
                      <span className="text-blue-300">?</span>
                    </div>
                    Help & Support
                  </Button>
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start text-red-300 hover:bg-red-900/30 mt-6"
                    onClick={handleLogout}
                  >
                    <LogOut className="mr-2 h-5 w-5" />
                    Logout
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Settings Content Area */}
          <div className="md:col-span-2">
            {renderSection()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
