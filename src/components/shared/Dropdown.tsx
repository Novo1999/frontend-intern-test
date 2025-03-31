'use client'

import { FaCheck } from 'react-icons/fa'
import { DropdownProps } from '../../types/dropdown-props'

const Dropdown = ({ items, onClick, children, className, wrapperClassName, triggerClassName, showCheck = false, checked }: DropdownProps) => {
  return (
    <div className={'dropdown ' + wrapperClassName}>
      <div tabIndex={0} role="button" className={'btn font-thin ' + triggerClassName}>
        {children}
      </div>
      <ul tabIndex={0} className={'dropdown-content menu bg-base-100 rounded-box z-1 w-fit min-w-32 p-2 shadow-sm capitalize ' + className}>
        {items.map((item, index) => (
          <li className="flex justify-start w-full px-2 py-1" onClick={() => onClick?.(item, index)} key={index}>
            <p className="flex-1 justify-start">
              {showCheck && checked?.includes(item) && <FaCheck />}
              {item}
            </p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Dropdown
