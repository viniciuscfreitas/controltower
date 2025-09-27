'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AuthState, LoginCredentials } from '@/types/auth';

interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Mark as client-side to prevent hydration mismatch
    setIsClient(true);
    
    // Check if user is already authenticated
    const auth = localStorage.getItem('auth');
    if (auth) {
      try {
        const { username } = JSON.parse(auth);
        setAuthState({
          isAuthenticated: true,
          username,
        });
      } catch {
        localStorage.removeItem('auth');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (credentials: LoginCredentials): Promise<boolean> => {
    try {
      // Store credentials for API calls
      localStorage.setItem('auth', JSON.stringify(credentials));
      setAuthState({
        isAuthenticated: true,
        username: credentials.username,
      });
      return true;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('auth');
    setAuthState({
      isAuthenticated: false,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        ...authState,
        login,
        logout,
        isLoading: isLoading || !isClient, // Keep loading until client-side hydration is complete
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
