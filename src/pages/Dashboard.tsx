
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { Home, Film, Settings, LogOut } from 'lucide-react';

const Dashboard = () => {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white p-4">
      <div className="max-w-6xl mx-auto">
        <header className="bg-black/40 border border-blue-400/30 backdrop-blur-sm rounded-lg shadow-lg p-4 mb-6 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-white">IoT_Stellar</h1>
            <p className="text-blue-300 text-sm">Welcome, {user?.name || 'User'}</p>
          </div>
          <Button 
            onClick={logout} 
            className="bg-red-600 hover:bg-red-700 text-white"
          >
            <LogOut className="h-5 w-5 mr-2" />
            Logout
          </Button>
        </header>
        
        <div className="flex justify-center mb-8">
          <div className="bg-black/40 border border-blue-400/30 backdrop-blur-sm rounded-full p-2 flex space-x-2">
            <button className="bg-green-500 text-black py-2 px-8 rounded-full font-semibold">
              Disarmed
            </button>
            <button className="bg-gray-600 text-white py-2 px-8 rounded-full font-semibold">
              Armed
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-6 max-w-xl mx-auto">
          <Card className="bg-black/40 border border-green-400/30 backdrop-blur-sm text-white hover:shadow-lg hover:shadow-green-500/20 transition-all">
            <CardContent className="p-6 flex flex-col items-center justify-center">
              <Link to="/home" className="w-full flex flex-col items-center">
                <Home className="h-12 w-12 text-green-400 mb-2" />
                <span className="text-green-400 font-medium">Home</span>
              </Link>
            </CardContent>
          </Card>
          
          <Card className="bg-black/40 border border-orange-400/30 backdrop-blur-sm text-white hover:shadow-lg hover:shadow-orange-500/20 transition-all relative">
            <CardContent className="p-6 flex flex-col items-center justify-center">
              <Link to="/clips" className="w-full flex flex-col items-center">
                <Film className="h-12 w-12 text-white mb-2" />
                <span className="text-white font-medium">Clips</span>
              </Link>
              <div className="absolute -top-2 -right-2 bg-orange-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">
                67
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-black/40 border border-gray-400/30 backdrop-blur-sm text-white hover:shadow-lg hover:shadow-gray-500/20 transition-all">
            <CardContent className="p-6 flex flex-col items-center justify-center">
              <Link to="/settings" className="w-full flex flex-col items-center">
                <Settings className="h-12 w-12 text-white mb-2" />
                <span className="text-white font-medium">Settings</span>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
