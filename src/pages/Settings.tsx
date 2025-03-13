import React, { useState, useRef } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Bell, Shield, Eye, EyeOff, User, LogOut, Camera } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Link } from 'react-router-dom';
import { HomeIcon, Film } from 'lucide-react';

const Settings = () => {
  const { user, logout, updateUserProfile } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [notifications, setNotifications] = useState(user?.notifications || false);
  const [isNotificationSaved, setIsNotificationSaved] = useState(true);
  const [activeSection, setActiveSection] = useState('account'); // Default to account section
  const fileInputRef = useRef<HTMLInputElement>(null);

  // User profile state
  const [profile, setProfile] = useState({
    name: user?.name || '',
    email: user?.email || '',
    password: '••••••••', // Placeholder password (uneditable)
    phone: user?.phone || '',
    dob: user?.dob || '',
    photo: user?.photo || '/lovable-uploads/7196715f-e658-4a40-8e49-3bd25b1192e8.png'
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleGoBack = () => {
    navigate('/dashboard');
  };

  const handleNotificationChange = (checked: boolean) => {
    setNotifications(checked);
    setIsNotificationSaved(false);
  };

  const handleSaveNotifications = () => {
    updateUserProfile({ notifications });
    setIsNotificationSaved(true);
  };

  const handleSaveProfile = () => {
    setIsEditing(false);
    updateUserProfile({
      name: profile.name,
      phone: profile.phone,
      dob: profile.dob
    });
    
    toast({
      title: "Profile Updated",
      description: "Your profile information has been saved successfully.",
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

  const handlePhotoClick = () => {
    if (isEditing && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      
      reader.onload = (event) => {
        if (event.target && event.target.result) {
          setProfile(prev => ({
            ...prev,
            photo: event.target?.result as string
          }));
          
          toast({
            title: "Photo Updated",
            description: "Your profile photo has been updated. Save your profile to apply changes.",
          });
        }
      };
      
      reader.readAsDataURL(file);
    }
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
                  <div 
                    className="relative cursor-pointer"
                    onClick={handlePhotoClick}
                  >
                    <Avatar className="h-20 w-20 border-2 border-blue-400 mb-2">
                      <AvatarImage src={profile.photo} alt={profile.name} />
                      <AvatarFallback className="bg-blue-900 text-blue-200 text-xl">
                        {profile.name ? profile.name.charAt(0).toUpperCase() : 'U'}
                      </AvatarFallback>
                    </Avatar>
                    {isEditing && (
                      <div className="absolute bottom-2 right-0 bg-blue-500 rounded-full p-1">
                        <Camera className="h-4 w-4 text-white" />
                      </div>
                    )}
                  </div>
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    className="hidden"
                    accept="image/*"
                    onChange={handlePhotoChange}
                  />
                  {isEditing && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="mt-2 bg-black/30 border-blue-400/50 text-blue-300 hover:bg-black/40"
                      onClick={handlePhotoClick}
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
                    onCheckedChange={handleNotificationChange}
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
                  disabled={isNotificationSaved}
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
                      className="bg-black/30 border-blue-400/30 text-blue-100 pr-10"
                      readOnly={true}
                    />
                    <button 
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-300 hover:text-blue-100"
                    >
                      {passwordVisible ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                  <p className="text-xs text-blue-100/70 mt-1">For security reasons, password cannot be changed directly.</p>
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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white p-4 pb-24" 
         style={{ backgroundImage: `url('/lovable-uploads/24864662-74cf-48bb-8c67-8791e6431f8b.png')`, backgroundSize: 'cover' }}>
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
        
        {/* Bottom Navigation Buttons */}
        <div className="fixed bottom-0 left-0 right-0 bg-black/80 border-t border-blue-400/30 p-4 flex justify-around">
          <Link to="/dashboard">
            <Button variant="ghost" className="text-blue-300 hover:text-blue-200 hover:bg-black/40 flex flex-col items-center">
              <HomeIcon className="h-6 w-6 mb-1" />
              <span className="text-xs">Home</span>
            </Button>
          </Link>
          <Link to="/clips">
            <Button variant="ghost" className="text-blue-300 hover:text-blue-200 hover:bg-black/40 flex flex-col items-center">
              <Film className="h-6 w-6 mb-1" />
              <span className="text-xs">Clips</span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Settings;
