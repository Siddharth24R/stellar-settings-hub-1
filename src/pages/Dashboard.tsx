
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { Settings, Bell, LogOut, Home, Film, HelpCircle } from 'lucide-react';

const Dashboard = () => {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white p-4">
      <div className="max-w-6xl mx-auto">
        <header className="bg-black/40 border border-blue-400/30 backdrop-blur-sm rounded-lg shadow-lg p-4 mb-6 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-white">IoT_Stellar Dashboard</h1>
            <p className="text-blue-300 text-sm">Welcome back, {user?.name || 'User'}</p>
          </div>
          <div className="flex gap-2">
            <Button asChild variant="ghost" size="icon" className="text-blue-300 hover:text-blue-200 hover:bg-black/40">
              <Link to="/settings">
                <Settings className="h-5 w-5" />
              </Link>
            </Button>
            <Button variant="ghost" size="icon" className="text-blue-300 hover:text-blue-200 hover:bg-black/40">
              <Bell className="h-5 w-5" />
            </Button>
          </div>
        </header>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="bg-black/40 border border-blue-400/30 backdrop-blur-sm text-white hover:shadow-lg hover:shadow-blue-500/20 transition-all">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xl font-medium text-blue-300">Home</CardTitle>
              <Home className="h-6 w-6 text-blue-300" />
            </CardHeader>
            <CardContent>
              <p className="text-sm text-blue-100/70 mb-6">Control your smart home devices</p>
              <Button asChild className="w-full bg-blue-600 hover:bg-blue-700">
                <Link to="/home">Go to Home</Link>
              </Button>
            </CardContent>
          </Card>
          
          <Card className="bg-black/40 border border-blue-400/30 backdrop-blur-sm text-white hover:shadow-lg hover:shadow-blue-500/20 transition-all">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xl font-medium text-blue-300">Clips</CardTitle>
              <Film className="h-6 w-6 text-blue-300" />
            </CardHeader>
            <CardContent>
              <p className="text-sm text-blue-100/70 mb-6">View your recorded clips</p>
              <Button asChild className="w-full bg-blue-600 hover:bg-blue-700">
                <Link to="/clips">View Clips</Link>
              </Button>
            </CardContent>
          </Card>
          
          <Card className="bg-black/40 border border-blue-400/30 backdrop-blur-sm text-white hover:shadow-lg hover:shadow-blue-500/20 transition-all">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xl font-medium text-blue-300">Help & Support</CardTitle>
              <HelpCircle className="h-6 w-6 text-blue-300" />
            </CardHeader>
            <CardContent>
              <p className="text-sm text-blue-100/70 mb-6">Get help with your devices</p>
              <Button asChild className="w-full bg-blue-600 hover:bg-blue-700">
                <Link to="/help">Get Help</Link>
              </Button>
            </CardContent>
          </Card>
          
          <Card className="bg-black/40 border border-blue-400/30 backdrop-blur-sm text-white hover:shadow-lg hover:shadow-blue-500/20 transition-all">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xl font-medium text-blue-300">Account Settings</CardTitle>
              <Settings className="h-6 w-6 text-blue-300" />
            </CardHeader>
            <CardContent>
              <p className="text-sm text-blue-100/70 mb-6">Manage your account settings</p>
              <Button asChild className="w-full bg-blue-600 hover:bg-blue-700">
                <Link to="/settings">Settings</Link>
              </Button>
            </CardContent>
          </Card>
          
          <Card className="bg-black/40 border border-blue-400/30 backdrop-blur-sm text-white hover:shadow-lg hover:shadow-blue-500/20 transition-all">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xl font-medium text-red-300">Logout</CardTitle>
              <LogOut className="h-6 w-6 text-red-300" />
            </CardHeader>
            <CardContent>
              <p className="text-sm text-blue-100/70 mb-6">Sign out of your account</p>
              <Button 
                onClick={logout} 
                className="w-full bg-red-600 hover:bg-red-700"
              >
                Logout
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
