'use client'
import GenericModal from '@/components/shared/GenericModal'
import { createContext, MouseEvent, ReactNode, useCallback, useContext, useState } from 'react'

type ModalContextType = {
  openModal: (
    title: string,
    options: {
      headerIcon?: ReactNode
      body?: ReactNode
      showConfirmBtn?: boolean
      confirmBtnText?: string
      confirmBtnClass?: string
      confirmHandler?: (e: MouseEvent<HTMLButtonElement>) => void
      cancelHandler?: () => void
    }
  ) => void
  closeModal: () => void
}

export const ModalContext = createContext<ModalContextType | undefined>(undefined)

export function useModalContext() {
  const context = useContext(ModalContext)
  if (!context) {
    throw new Error('useModalContext must be used within a ModalProvider')
  }
  return context
}

export default function ModalProvider({ children }: { children: ReactNode }) {
  const [headerText, setHeaderText] = useState('')
  const [headerIcon, setHeaderIcon] = useState<ReactNode | null>(null)
  const [modalBody, setModalBody] = useState<ReactNode | null>(null)

  const [showConfirmBtn, setShowConfirmBtn] = useState(true)
  const [confirmBtnTxt, setConfirmBtnTxt] = useState('Confirm')
  const [confirmBtnClass, setConfirmBtnClass] = useState('')

  const [confirmHandler, setConfirmHandler] = useState<() => void>(() => {})
  const [cancelHandler, setCancelHandler] = useState<() => void>(() => {})

  const openModal: ModalContextType['openModal'] = useCallback((title: string, options = {}) => {
    setHeaderText(title)
    setHeaderIcon(options.headerIcon || null)
    setModalBody(options.body || null)
    setShowConfirmBtn(options.showConfirmBtn || true)
    setConfirmBtnTxt(options.confirmBtnText || 'Confirm')
    setConfirmBtnClass(options.confirmBtnClass || '')
    setConfirmHandler(() => options.confirmHandler || (() => {}))
    setCancelHandler(() => options.cancelHandler || (() => {}))

    const modalElement = document.getElementById('my_modal_2') as HTMLFormElement | null
    modalElement?.showModal()
  }, [])

  const closeModal = useCallback(() => {
    const modalElement = document.getElementById('my_modal_2') as HTMLFormElement | null
    modalElement?.close()
  }, [])

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      <GenericModal
        modalID="my_modal_2"
        headerText={headerText}
        modalBody={modalBody}
        headerIcon={headerIcon || undefined}
        showConfirmBtn={showConfirmBtn}
        confirmBtnText={confirmBtnTxt}
        confirmBtnClass={confirmBtnClass}
        confirmHandler={confirmHandler}
        cancelHandler={cancelHandler}
      />
    </ModalContext.Provider>
  )
}
