import { useState, useEffect, useCallback } from 'react';
import { User } from '../types';
import { authService, LoginDto, RegisterDto } from '../services/authService';

export function useAuth() {
  const [user, setUser] = useState<User | null>(() => authService.getStoredUser());
  const [loading, setLoading] = useState<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => authService.isAuthenticated());

  const checkAuth = useCallback(async () => {
    if (!authService.isAuthenticated()) {
      setUser(null);
      setIsAuthenticated(false);
      setLoading(false);
      return;
    }

    try {
      const currentUser = await authService.getCurrentUser();
      setUser(currentUser);
      setIsAuthenticated(true);
    } catch {
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const login = async (credentials: LoginDto) => {
    setLoading(true);
    try {
      const data = await authService.login(credentials);
      setUser(data.user);
      setIsAuthenticated(true);
      return data;
    } finally {
      setLoading(false);
    }
  };

  const register = async (dto: RegisterDto) => {
    setLoading(true);
    try {
      const data = await authService.register(dto);
      setUser(data.user);
      setIsAuthenticated(true);
      return data;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
    setIsAuthenticated(false);
  };

  return {
    user,
    loading,
    isAuthenticated,
    login,
    register,
    logout,
    refreshUser: checkAuth,
  };
}
