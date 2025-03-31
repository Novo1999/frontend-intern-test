import { ReactNode } from 'react'

export type DropdownProps = {
  items: string[]
  children: ReactNode
  className?: string
  wrapperClassName?: string
  triggerClassName?: string
  onClick?: (item: string, index: number) => void
  showCheck?: boolean
  checked?: string[]
}
