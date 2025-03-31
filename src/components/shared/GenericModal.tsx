'use client'

import { MouseEvent, ReactNode, useEffect } from 'react'

const GenericModal = ({
  modalID,
  headerText,
  modalBody,
  confirmHandler,
  showConfirmBtn,
  confirmBtnText,
  cancelHandler,
  headerIcon,
  confirmBtnClass,
}: {
  modalID: string
  headerText: string
  modalBody?: ReactNode
  confirmHandler?: (e: MouseEvent<HTMLButtonElement>) => void
  showConfirmBtn?: boolean
  confirmBtnText?: string
  cancelHandler?: () => void
  headerIcon?: ReactNode
  confirmBtnClass?: string
}) => {
  useEffect(() => {
    const modalElement = document.getElementById(modalID) as HTMLDialogElement | null
    if (!modalElement) return
    const eventListener = () => {
      cancelHandler?.()
    }
    modalElement.addEventListener('close', eventListener)
    return () => {
      modalElement.removeEventListener('close', eventListener)
    }
  }, [cancelHandler, modalID])

  return (
    <dialog id={modalID} className="modal">
      <div className="modal-box">
        <h3 className="text-lg text-black font-thin flex items-center">
          {headerIcon && <span className="mr-2">{headerIcon}</span>}
          {headerText}
        </h3>
        <div className="py-4">{modalBody}</div>
        <form method="dialog">
          <div className="flex justify-end gap-4 mt-4">
            <button className="btn btn-outline">Cancel</button>
            {showConfirmBtn && (
              <button className={'btn text-white ' + confirmBtnClass || ''} onClick={confirmHandler}>
                {confirmBtnText || 'Confirm'}
              </button>
            )}
          </div>
        </form>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  )
}
export default GenericModal
