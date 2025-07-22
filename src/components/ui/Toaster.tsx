// ToastProvider.tsx
"use client"
import React, { createContext, useContext, useState, useCallback } from "react"

type ToastType = 'success' | 'error' | 'info'

interface ToastContextType {
  showToast: (message: string, type?: ToastType, duration?: number) => void
}

const ToastContext = createContext<ToastContextType | null>(null)

export function useToast() {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider")
  }
  return context
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toast, setToast] = useState<{ message: string; type: ToastType } | null>(null)

  const showToast = useCallback((message: string, type: ToastType = 'info', duration = 6000) => {
    setToast({ message, type })
    setTimeout(() => setToast(null), duration)
  }, [])

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast && (
        <div
          style={{
            position: 'fixed',
            top: 20,
            right: 20,
            zIndex: 9999,
            padding: '16px 24px',
            borderRadius: 8,
            color: '#fff',
            background:
              toast.type === 'success'
                ? '#22c55e'
                : toast.type === 'error'
                  ? '#ef4444'
                  : '#2563eb',
            boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
            minWidth: 200,
            fontWeight: 500,
            fontSize: 16,
            transition: 'all 0.3s',
          }}
        >
          {toast.message}
        </div>
      )}
    </ToastContext.Provider>
  )
}
