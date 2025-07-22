"use client";

import { AuthProvider } from './AuthContext';
import { ToastProvider } from '../components/ui/Toaster';
import { Header } from '../components/layout/Header';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <ToastProvider>
        <Header />
        {children}
      </ToastProvider>
    </AuthProvider>
  );
} 