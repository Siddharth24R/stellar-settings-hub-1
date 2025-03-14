import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Settings, Power, Home as HomeIcon, Film } from 'lucide-react';
const Dashboard = () => {
  const [isLive, setIsLive] = React.useState(true);
  return <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white p-4">
      <div className="max-w-6xl mx-auto">
        <header className="bg-black/40 border border-blue-400/30 backdrop-blur-sm rounded-lg shadow-lg p-4 mb-6 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-white">Home</h1>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/settings">
              <Button variant="ghost" className="text-blue-300 hover:text-blue-200 hover:bg-black/40">
                <Settings className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </header>
        
        <div className="space-y-6">
          <Card className="bg-black/40 border border-blue-400/30 backdrop-blur-sm text-white rounded-sm">
            <Link to="/home">
              <div className="p-4 aspect-video relative bg-gray-900 rounded-lg overflow-hidden cursor-pointer transition-all hover:opacity-90">
                {isLive ? <>
                    <div className="absolute top-4 left-4 bg-red-600 rounded-full w-3 h-3 animate-pulse"></div>
                    <div className="absolute top-4 right-4 bg-black/60 text-white text-xs px-2 py-1 rounded-md">
                      LIVE
                    </div>
                    <div className="flex items-center justify-center h-full rounded-md mx-0">
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
                  </> : <div className="flex flex-col items-center justify-center h-full space-y-2">
                    <Power className="h-12 w-12 text-red-500" />
                    <p className="text-red-400">System Armed - Live View Disabled</p>
                  </div>}
              </div>
            </Link>
          </Card>
        </div>
      </div>
    </div>;
};
export default Dashboard;