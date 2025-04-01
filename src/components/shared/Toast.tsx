import { ToastProp } from '../../types/toast-prop'

const Toast = ({ text, type }: ToastProp) => {
  const alertClassName = type === 'error' ? 'alert-error' : 'alert-success'

  return (
    <div className="toast toast-top toast-center">
      <div className={`alert ${alertClassName}`}>
        <span>{text}</span>
      </div>
    </div>
  )
}
export default Toast
