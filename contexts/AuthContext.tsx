import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import apiClient, { ApiClientError } from '@/lib/apiClient';
import { useVisibilitySync } from '@/hooks/useVisibilitySync';

export interface User {
  id: string;
  username: string;
  role: string;
  visibleProjects?: string[];
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (username: string, password: string) => Promise<void>;
  signup: (username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  refreshUser: () => Promise<void>;
  isAuthenticated: boolean;
  isAdmin: boolean;
  visibleProjects: string[];
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const checkAuth = useCallback(async () => {
    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null;
      if (!token) {
        setUser(null);
        setLoading(false);
        return;
      }

      const res = await apiClient.get<{ success: boolean; user?: User }>('/api/auth/me');
      const data = res.data;
      if (data?.success && data.user) {
        setUser(data.user);
      } else {
        localStorage.removeItem('auth_token');
        setUser(null);
      }
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Auth check failed:', error);
      }
      localStorage.removeItem('auth_token');
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // PWA/bfcache fix: when page is restored from back-forward cache or tab becomes visible,
  // re-validate auth against localStorage so we don't show stale "logged in" state after logout
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleRevalidate = () => checkAuth();

    const onPageShow = (e: PageTransitionEvent) => {
      if (e.persisted) handleRevalidate(); // restored from bfcache
    };

    const onVisibilityChange = () => {
      if (document.visibilityState === 'visible') handleRevalidate();
    };

    window.addEventListener('pageshow', onPageShow);
    document.addEventListener('visibilitychange', onVisibilityChange);
    return () => {
      window.removeEventListener('pageshow', onPageShow);
      document.removeEventListener('visibilitychange', onVisibilityChange);
    };
  }, [checkAuth]);

  const login = async (username: string, password: string) => {
    try {
      const res = await apiClient.post<{ token: string; user: User }>('/api/auth/login', {
        username,
        password,
      });
      const data = res.data;
      if (data?.token) {
        localStorage.setItem('auth_token', data.token);
        setUser(data.user ?? null);
        await checkAuth();
      } else {
        throw new Error('Login failed');
      }
    } catch (e) {
      throw new Error(e instanceof ApiClientError ? e.message : 'Login failed');
    }
  };

  const signup = async (username: string, email: string, password: string) => {
    try {
      const res = await apiClient.post<{ token: string; user: User }>('/api/auth/signup', {
        username,
        email,
        password,
      });
      const data = res.data;
      if (data?.token) {
        localStorage.setItem('auth_token', data.token);
        setUser(data.user ?? null);
        await checkAuth();
      } else {
        throw new Error('Signup failed');
      }
    } catch (e) {
      throw new Error(e instanceof ApiClientError ? e.message : 'Signup failed');
    }
  };

  const logout = () => {
    localStorage.removeItem('auth_token');
    setUser(null);
    router.push('/');
  };

  const refreshUser = useCallback(async () => {
    await checkAuth();
  }, [checkAuth]);

  const token =
    typeof window !== 'undefined' && user ? localStorage.getItem('auth_token') : null;
  useVisibilitySync(refreshUser, token);

  const isAdmin = user?.role === 'admin';
  const visibleProjects = user?.visibleProjects ?? [];

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        signup,
        logout,
        refreshUser,
        isAuthenticated: !!user,
        isAdmin,
        visibleProjects,
      }}
    >
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
