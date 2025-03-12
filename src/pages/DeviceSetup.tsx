
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Loader2, QrCode, Wifi, Lock } from 'lucide-react';

const DeviceSetup = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [deviceId, setDeviceId] = useState('');
  const [wifiName, setWifiName] = useState('');
  const [wifiPassword, setWifiPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1);

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      handleDeviceSetup();
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleDeviceSetup = async () => {
    try {
      setIsLoading(true);
      
      // Simulate API call to Python backend
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Device Setup Complete",
        description: "Your device has been successfully configured.",
      });
      
      navigate('/dashboard');
    } catch (error) {
      toast({
        title: "Setup Failed",
        description: "There was an error setting up your device. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <div className="rounded-lg overflow-hidden border-2 border-blue-400 w-full max-w-xs mx-auto mb-4">
                <img 
                  src="/lovable-uploads/328c0f12-0d4e-43e1-a18e-f01b5d06a8f0.png" 
                  alt="IoT Device"
                  className="w-full object-cover"
                />
              </div>
              <p className="text-blue-100">Power on your IoT_Stellar device and wait for the status light to blink blue.</p>
            </div>
            <Button 
              className="w-full bg-blue-600 hover:bg-blue-700"
              onClick={handleNext}
            >
              Device is Powered On
            </Button>
          </div>
        );
      
      case 2:
        return (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <QrCode className="h-24 w-24 text-blue-300 mb-4 mx-auto" />
              <p className="text-blue-100">Scan the QR code on the back of your device to get the device ID.</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="device-id" className="text-white">Device ID</Label>
              <Input
                id="device-id"
                type="text"
                placeholder="Enter Device ID (e.g., IOT-12345)"
                value={deviceId}
                onChange={(e) => setDeviceId(e.target.value)}
                className="bg-black/50 text-white border-blue-400/50"
                required
              />
            </div>
            <div className="flex space-x-2">
              <Button 
                variant="outline" 
                className="flex-1 border-blue-400/50 text-blue-300"
                onClick={handleBack}
              >
                Back
              </Button>
              <Button 
                className="flex-1 bg-blue-600 hover:bg-blue-700"
                onClick={handleNext}
                disabled={!deviceId}
              >
                Next
              </Button>
            </div>
          </div>
        );
      
      case 3:
        return (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <Wifi className="h-24 w-24 text-blue-300 mb-4 mx-auto" />
              <p className="text-blue-100">Connect your device to your home Wi-Fi network.</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="wifi-name" className="text-white">Wi-Fi Network Name</Label>
              <Input
                id="wifi-name"
                type="text"
                placeholder="Enter your Wi-Fi name"
                value={wifiName}
                onChange={(e) => setWifiName(e.target.value)}
                className="bg-black/50 text-white border-blue-400/50"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="wifi-password" className="text-white">Wi-Fi Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-blue-300" />
                <Input
                  id="wifi-password"
                  type="password"
                  placeholder="Enter your Wi-Fi password"
                  value={wifiPassword}
                  onChange={(e) => setWifiPassword(e.target.value)}
                  className="pl-10 bg-black/50 text-white border-blue-400/50"
                  required
                />
              </div>
            </div>
            <div className="flex space-x-2">
              <Button 
                variant="outline" 
                className="flex-1 border-blue-400/50 text-blue-300"
                onClick={handleBack}
              >
                Back
              </Button>
              <Button 
                className="flex-1 bg-blue-600 hover:bg-blue-700"
                onClick={handleNext}
                disabled={!wifiName || !wifiPassword}
              >
                Next
              </Button>
            </div>
          </div>
        );
      
      case 4:
        return (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <div className="rounded-full h-24 w-24 bg-blue-600/20 flex items-center justify-center mx-auto mb-4">
                <div className="rounded-full h-16 w-16 bg-blue-500/30 flex items-center justify-center">
                  <div className="rounded-full h-8 w-8 bg-blue-400" />
                </div>
              </div>
              <p className="text-blue-100">We're ready to connect to your device. Press the button below to complete setup.</p>
            </div>
            <div className="flex space-x-2">
              <Button 
                variant="outline" 
                className="flex-1 border-blue-400/50 text-blue-300"
                onClick={handleBack}
                disabled={isLoading}
              >
                Back
              </Button>
              <Button 
                className="flex-1 bg-blue-600 hover:bg-blue-700"
                onClick={handleDeviceSetup}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Connecting...
                  </>
                ) : (
                  "Connect Device"
                )}
              </Button>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center px-4 bg-cover bg-center"
      style={{ backgroundImage: 'url("/lovable-uploads/7d64b9bf-202a-484f-aead-0441172275be.png")' }}
    >
      <Card className="w-full max-w-md shadow-2xl bg-black/40 backdrop-blur-sm border border-blue-400/30">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold text-white">Device Setup</CardTitle>
          <CardDescription className="text-blue-200">
            Configure your IoT_Stellar device
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <div className="flex justify-between mb-2">
              {[1, 2, 3, 4].map(i => (
                <div 
                  key={i} 
                  className={`w-10 h-10 rounded-full flex items-center justify-center
                    ${step === i ? 'bg-blue-600 text-white' : 
                      step > i ? 'bg-blue-900/50 text-blue-200' : 'bg-gray-800/50 text-gray-400'}`}
                >
                  {i}
                </div>
              ))}
            </div>
            <div className="relative h-2 bg-gray-700 rounded-full mb-4">
              <div 
                className="absolute top-0 left-0 h-2 bg-blue-600 rounded-full"
                style={{ width: `${(step / 4) * 100}%` }}
              />
            </div>
          </div>
          
          {renderStepContent()}
        </CardContent>
      </Card>
    </div>
  );
};

export default DeviceSetup;
