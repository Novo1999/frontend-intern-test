'use client'
import { useToast } from '../../context/ToastContext'
import Toast from './Toast'

const ToastContainer = () => {
  const { toasts } = useToast()

  return (
    <div className="fixed top-5 right-5 z-50 space-y-2">
      {toasts.map((toast) => (
        <Toast key={toast.id} text={toast.text} type={toast.type} />
      ))}
    </div>
  )
}

export default ToastContainer
