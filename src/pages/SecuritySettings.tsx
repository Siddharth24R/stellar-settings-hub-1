
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Eye, EyeOff } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const SecuritySettings = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [passwordVisible, setPasswordVisible] = useState(false);
  
  const handleGoBack = () => {
    navigate('/settings');
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white p-4 pb-24">
      <div className="max-w-6xl mx-auto">
        <header className="bg-black/40 border border-blue-400/30 backdrop-blur-sm rounded-lg shadow-lg p-4 mb-6 flex items-center">
          <Button 
            onClick={handleGoBack} 
            variant="ghost" 
            size="icon"
            className="mr-2 text-blue-300 hover:text-blue-200 hover:bg-black/40"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold text-white">Security Settings</h1>
        </header>

        <Card className="bg-black/40 border border-blue-400/30 backdrop-blur-sm text-white">
          <CardHeader className="flex flex-col items-center">
            <div className="rounded-full overflow-hidden border-4 border-blue-400 shadow-lg shadow-blue-500/50 w-24 h-24 flex items-center justify-center bg-black/30 mb-4">
              {user?.photo ? (
                <img 
                  src={user.photo} 
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-blue-300 text-2xl">
                  {user?.name?.charAt(0) || user?.email?.charAt(0) || '?'}
                </div>
              )}
            </div>
            <CardTitle className="text-blue-300">{user?.name || 'User'}'s Security Settings</CardTitle>
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
                  value={user?.email || ''}
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
                    value="••••••••"
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
      </div>
    </div>
  );
};

export default SecuritySettings;
