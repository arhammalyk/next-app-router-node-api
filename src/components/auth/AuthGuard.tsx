"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Loader from '../ui/Loader';

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAuthChecked, setIsAuthChecked] = useState(false);

  useEffect(() => {
    const accessToken = typeof window !== 'undefined' && localStorage.getItem('accessToken');
    if (!accessToken) {
      router.replace('/login');
    } else {
      setIsAuthenticated(true);
    }
    setIsAuthChecked(true);
  }, [router]);

  if (!isAuthChecked || !isAuthenticated) {
    return <Loader />;
  }

  return <>{children}</>;
};

export default AuthGuard; 