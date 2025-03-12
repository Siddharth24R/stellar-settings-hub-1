
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white p-4">
      <div className="max-w-6xl mx-auto">
        <header className="bg-black/40 border border-blue-400/30 backdrop-blur-sm rounded-lg shadow-lg p-4 mb-6 flex justify-between items-center">
          <div className="flex items-center">
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
            <h1 className="text-2xl font-bold text-white">Home</h1>
          </div>
        </header>

        <div className="text-center py-10">
          <h2 className="text-3xl font-bold text-blue-300 mb-6">Smart Home Control</h2>
          <p className="text-lg text-blue-100 mb-10 max-w-md mx-auto">
            This page will contain smart home device controls once implemented.
          </p>
          
          <Card className="max-w-lg mx-auto bg-black/40 border border-blue-400/30 backdrop-blur-sm text-white">
            <CardHeader>
              <CardTitle className="text-blue-300">Coming Soon</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-blue-100/70">
                Smart home device controls will be available in a future update.
              </p>
              <Button 
                className="mt-6 bg-blue-600 hover:bg-blue-700"
                asChild
              >
                <Link to="/dashboard">
                  Return to Dashboard
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Home;
