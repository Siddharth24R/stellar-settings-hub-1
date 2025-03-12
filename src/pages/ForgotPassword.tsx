
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Mail, ArrowLeft, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast({
        title: "Error",
        description: "Please enter your email address",
        variant: "destructive",
      });
      return;
    }
    
    try {
      setIsSubmitting(true);
      // In a real app, we would call an API to send a password reset email
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API call
      
      setSubmitted(true);
      toast({
        title: "Reset Email Sent",
        description: "Check your inbox for password reset instructions",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center px-4 bg-cover bg-center"
      style={{ backgroundImage: 'url("/lovable-uploads/7d64b9bf-202a-484f-aead-0441172275be.png")' }}
    >
      <Card className="w-full max-w-md shadow-2xl bg-black/40 backdrop-blur-sm border border-blue-400/30">
        <CardHeader className="space-y-1 text-center">
          <div className="flex items-center justify-center">
            <Button 
              onClick={() => navigate('/login')} 
              variant="ghost" 
              size="icon"
              className="absolute left-4 top-4 text-blue-300 hover:text-blue-200 hover:bg-black/40"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <CardTitle className="text-2xl font-bold text-white">Reset Password</CardTitle>
          </div>
          
          <div className="flex justify-center my-6">
            <div className="rounded-full overflow-hidden border-4 border-blue-400 shadow-lg shadow-blue-500/50 w-32 h-32 flex items-center justify-center bg-black/30">
              <img 
                src="/lovable-uploads/ae4c8c1a-19a1-46a8-b684-1b0b6b6f4933.png" 
                alt="IoT Logo"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          
          <CardDescription className="text-blue-200">
            {submitted 
              ? "We've sent you an email with password reset instructions." 
              : "Enter your email address and we'll send you a link to reset your password."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {submitted ? (
            <div className="bg-blue-900/20 text-blue-200 p-4 rounded-md mb-4 text-sm border border-blue-500/50 text-center">
              <p className="mb-2">Password reset email sent to:</p>
              <p className="font-medium">{email}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-white">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-blue-300" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 bg-black/50 text-white border-blue-400/50 focus:border-blue-400 focus:ring-blue-400"
                    required
                  />
                </div>
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-blue-600 hover:bg-blue-700 text-white h-12 text-lg" 
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  'Send Reset Link'
                )}
              </Button>
            </form>
          )}
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-blue-200">
            Remember your password?{' '}
            <Link to="/login" className="text-blue-300 hover:text-blue-200 hover:underline font-medium">
              Back to login
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ForgotPassword;
