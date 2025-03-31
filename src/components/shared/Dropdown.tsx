'use client'

import { ReactNode } from 'react'

type DropdownProps = {
  items: string[]
  children: ReactNode
  className?: string
  wrapperClassName?: string
  triggerClassName?: string
  onClick?: (item: string, index: number) => void
}

const Dropdown = ({ items, onClick, children, className, wrapperClassName, triggerClassName }: DropdownProps) => {
  return (
    <div className={'dropdown ' + wrapperClassName}>
      <div tabIndex={0} role="button" className={'btn font-thin ' + triggerClassName}>
        {children}
      </div>
      <ul tabIndex={0} className={'dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm ' + className}>
        {items.map((item, index) => (
          <li onClick={() => onClick?.(item, index)} key={index}>
            <a>{item}</a>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Dropdown
