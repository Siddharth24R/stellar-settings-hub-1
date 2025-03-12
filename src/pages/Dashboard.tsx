
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { Home, Film, Settings, Switch } from 'lucide-react';
import { Switch as UISwitch } from '@/components/ui/switch';

const Dashboard = () => {
  const [isArmed, setIsArmed] = React.useState(false);
  const [isLive, setIsLive] = React.useState(true);

  const handleArmSystem = (checked: boolean) => {
    setIsArmed(checked);
    setIsLive(!checked);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white p-4">
      <div className="max-w-6xl mx-auto">
        <header className="bg-black/40 border border-blue-400/30 backdrop-blur-sm rounded-lg shadow-lg p-4 mb-6 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-white">IoT_Stellar</h1>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <span className="text-blue-300">{isArmed ? 'Armed' : 'Disarmed'}</span>
              <UISwitch 
                checked={isArmed} 
                onCheckedChange={handleArmSystem}
              />
            </div>
            <Link to="/settings">
              <Button variant="ghost" className="text-blue-300 hover:text-blue-200 hover:bg-black/40">
                <Settings className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </header>
        
        <div className="space-y-6">
          <Card className="bg-black/40 border border-blue-400/30 backdrop-blur-sm text-white">
            <Link to="/home">
              <div className="p-4 aspect-video relative bg-gray-900 rounded-lg overflow-hidden">
                {isLive ? (
                  <>
                    <div className="absolute top-4 left-4 bg-red-600 rounded-full w-3 h-3 animate-pulse"></div>
                    <div className="absolute top-4 right-4 bg-black/60 text-white text-xs px-2 py-1 rounded-md">
                      LIVE
                    </div>
                    <div className="flex items-center justify-center h-full">
                      <p className="text-gray-400">Camera stream connecting to Python backend...</p>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4 flex justify-between">
                      <div className="bg-black/60 text-white text-xs px-2 py-1 rounded-md">
                        Front Door Camera
                      </div>
                      <div className="bg-black/60 text-white text-xs px-2 py-1 rounded-md">
                        {new Date().toLocaleTimeString()}
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full space-y-2">
                    <Switch className="h-12 w-12 text-red-500" />
                    <p className="text-red-400">System Armed - Live View Disabled</p>
                  </div>
                )}
              </div>
            </Link>
          </Card>

          <div className="grid grid-cols-2 gap-4">
            <Card className="bg-black/40 border border-blue-400/30 backdrop-blur-sm text-white">
              <div className="p-4">
                <h3 className="text-lg font-semibold text-blue-300 mb-2">Python Integration</h3>
                <p className="text-sm text-blue-100/70">
                  This camera feed is processed by a Python backend that analyzes video frames for motion detection 
                  and person identification.
                </p>
              </div>
            </Card>
            
            <Card className="bg-black/40 border border-blue-400/30 backdrop-blur-sm text-white">
              <div className="p-4">
                <h3 className="text-lg font-semibold text-blue-300 mb-2">System Status</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-blue-100/70">Connection:</span>
                    <span className="text-sm text-green-400">Online</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-blue-100/70">Battery:</span>
                    <span className="text-sm text-blue-100">87%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-blue-100/70">Storage:</span>
                    <span className="text-sm text-blue-100">64% Free</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
