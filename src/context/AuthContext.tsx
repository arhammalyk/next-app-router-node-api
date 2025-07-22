"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { getStoredAuth } from "../utils/localStorage";

export interface User {
  _id: string;
  id: string;
  name: string;
  email: string;
  [key: string]: unknown;
}

interface AuthContextType {
  user: User | null;
  logout: () => void;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUserState] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const setUser = (user: User | null) => {
    setUserState(user);
  };

  const logout = () => {
    setUserState(null);
    localStorage.removeItem("userId");
    localStorage.removeItem("accessToken");
  };

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const authData = await getStoredAuth();
        if (authData && authData.user) {
          setUser(authData.user);
        }
      } catch (error) {
        console.error('Error checking auth:', error);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, logout, isAuthenticated, setUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
