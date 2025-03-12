
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

interface User {
  id: string;
  email: string;
  name?: string;
  notifications?: boolean;
  phone?: string;
  dob?: string;
  photo?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name?: string) => Promise<void>;
  googleLogin: () => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  updateUserProfile: (updatedData: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Check localStorage for user session
    const storedUser = localStorage.getItem('iot_stellar_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const updateUserProfile = (updatedData: Partial<User>) => {
    if (!user) return;
    
    const updatedUser = { ...user, ...updatedData };
    setUser(updatedUser);
    localStorage.setItem('iot_stellar_user', JSON.stringify(updatedUser));
    
    toast({
      title: "Profile Updated",
      description: "Your profile information has been updated successfully.",
    });
  };

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // In a real implementation, you would validate credentials with a backend
      if (password.length < 6) {
        throw new Error('Invalid credentials');
      }
      
      const newUser = { 
        id: Date.now().toString(), 
        email,
        notifications: true,
        photo: '/lovable-uploads/7196715f-e658-4a40-8e49-3bd25b1192e8.png'
      };
      setUser(newUser);
      localStorage.setItem('iot_stellar_user', JSON.stringify(newUser));
      
      toast({
        title: "Login Successful",
        description: "Welcome back to IoT_Stellar!",
      });
    } catch (error) {
      toast({
        title: "Login Failed",
        description: error instanceof Error ? error.message : "Please check your credentials and try again",
        variant: "destructive",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (email: string, password: string, name?: string) => {
    try {
      setLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // In a real implementation, you would register with a backend
      if (password.length < 6) {
        throw new Error('Password must be at least 6 characters');
      }
      
      const newUser = { 
        id: Date.now().toString(), 
        email, 
        name,
        notifications: true,
        photo: '/lovable-uploads/7196715f-e658-4a40-8e49-3bd25b1192e8.png'
      };
      setUser(newUser);
      localStorage.setItem('iot_stellar_user', JSON.stringify(newUser));
      
      toast({
        title: "Registration Successful",
        description: "Your account has been created successfully!",
      });
    } catch (error) {
      toast({
        title: "Registration Failed",
        description: error instanceof Error ? error.message : "Please try again with different credentials",
        variant: "destructive",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const googleLogin = async () => {
    try {
      setLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // In a real implementation, you would use a proper OAuth flow
      const googleUser = { 
        id: 'google-' + Date.now().toString(), 
        email: 'user@gmail.com',
        name: 'Google User',
        notifications: true,
        photo: '/lovable-uploads/7196715f-e658-4a40-8e49-3bd25b1192e8.png'
      };
      
      setUser(googleUser);
      localStorage.setItem('iot_stellar_user', JSON.stringify(googleUser));
      
      toast({
        title: "Google Login Successful",
        description: "Welcome to IoT_Stellar!",
      });
    } catch (error) {
      toast({
        title: "Google Login Failed",
        description: "Unable to login with Google. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('iot_stellar_user');
    toast({
      title: "Logged Out",
      description: "You have been logged out successfully.",
    });
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading, 
      login, 
      register, 
      googleLogin, 
      logout,
      isAuthenticated: !!user,
      updateUserProfile
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
