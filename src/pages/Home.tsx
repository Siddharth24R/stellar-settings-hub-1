
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Switch } from '@/components/ui/switch';

const Home = () => {
  const [isArmed, setIsArmed] = useState(false);
  const [isStreaming, setIsStreaming] = useState(true);
  const { toast } = useToast();

  const toggleArmed = (checked: boolean) => {
    setIsArmed(checked);
    
    if (checked) {
      setIsStreaming(false);
      toast({
        title: "System Armed",
        description: "Your security system is now active.",
      });
    } else {
      setIsStreaming(true);
      toast({
        title: "System Disarmed",
        description: "Your security system has been deactivated.",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white p-4">
      <div className="max-w-6xl mx-auto">
        <header className="bg-black/40 border border-blue-400/30 backdrop-blur-sm rounded-lg shadow-lg p-4 mb-6 flex justify-between items-center">
          <Button 
            asChild
            variant="ghost" 
            size="icon"
            className="mr-2 text-blue-300 hover:text-blue-200 hover:bg-black/40"
          >
            <Link to="/dashboard">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
        </header>

        <div className="grid grid-cols-1 gap-6">
          {isStreaming ? (
            <Card className="bg-black/40 border border-blue-400/30 backdrop-blur-sm text-white">
              <CardContent className="p-4">
                <div className="aspect-video relative bg-gray-900 rounded-lg overflow-hidden">
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
                </div>
                
                <div className="flex items-center justify-between mt-4 bg-black/40 rounded-lg p-3 border border-blue-400/30">
                  <span className="text-blue-300">{isArmed ? 'Armed' : 'Disarmed'}</span>
                  <Switch 
                    checked={isArmed} 
                    onCheckedChange={toggleArmed}
                  />
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="bg-black/40 border border-red-400/30 backdrop-blur-sm text-white">
              <CardContent className="p-4">
                <div className="aspect-video bg-gray-900 rounded-lg overflow-hidden flex flex-col items-center justify-center">
                  <h3 className="text-xl font-bold text-white mb-2">System Armed</h3>
                  <p className="text-gray-400 text-center max-w-md">
                    Live camera streaming is paused while the system is armed.
                    <br />
                    The system will automatically record any detected motion.
                  </p>
                </div>
                
                <div className="flex items-center justify-between mt-4 bg-black/40 rounded-lg p-3 border border-blue-400/30">
                  <span className="text-blue-300">{isArmed ? 'Armed' : 'Disarmed'}</span>
                  <Switch 
                    checked={isArmed} 
                    onCheckedChange={toggleArmed}
                  />
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
