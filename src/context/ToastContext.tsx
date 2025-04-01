'use client'
import { createContext, ReactNode, useContext, useState } from 'react'
import { ToastProp } from '../types/toast-prop'

type ToastWithId = ToastProp & { id: number }

type ToastContextType = {
  toasts: ToastWithId[]
  addToast: (text: string, type?: 'success' | 'error') => void
  removeToast: (id: number) => void
}

const ToastContext = createContext<ToastContextType | null>(null)

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toasts, setToasts] = useState<ToastWithId[]>([])

  const addToast = (text: string, type: 'success' | 'error' = 'success') => {
    const id = Date.now()
    setToasts((prev) => [...prev, { id, text, type }])

    setTimeout(() => removeToast(id), 3000)
  }

  const removeToast = (id: number) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }

  return <ToastContext.Provider value={{ toasts, addToast, removeToast }}>{children}</ToastContext.Provider>
}

export const useToast = () => {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider')
  }
  return context
}
