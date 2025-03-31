'use client'
import { useState } from 'react'
import { BsDownload, BsThreeDots, BsTrash } from 'react-icons/bs'
import Dropdown from './Dropdown'

type ModuleNavbarProp = {
  items: string[]
  showCount: number
}

const ModuleNavbar = ({ items, showCount = 6 }: ModuleNavbarProp) => {
  const [navItems, setNavItems] = useState(items)
  const [isSelected, setIsSelected] = useState('')

  const handleSelected = (item: string) => {
    setIsSelected(item)
  }

  const handleDropdownClick = (item: string, index: number) => {
    setNavItems((prev) => {
      const updatedNavItems = [...prev]
      const prevLastItem = updatedNavItems[showCount - 1]
      updatedNavItems[showCount + index] = prevLastItem
      updatedNavItems[showCount - 1] = item
      setIsSelected(item)
      return updatedNavItems
    })
  }

  return (
    <nav className="flex justify-between w-full mt-6 border-b border-black">
      <ul className="flex gap-6 *:cursor-pointer font-thin capitalize flex-wrap items-center">
        {navItems.slice(0, showCount).map((item) => {
          const selected = isSelected === item
          return (
            <li className={`py-4 px-2 ${selected ? 'border-blue-800 border-b-4 font-semibold' : ''} text-blue-600`} onClick={() => handleSelected(item)} key={item}>
              {item}
            </li>
          )
        })}
        <Dropdown onClick={handleDropdownClick} triggerClassName="border-0 bg-gray-100 hover:shadow-none" items={navItems.slice(6)}>
          <button className="rounded-full border size-8 flex cursor-pointer justify-center items-center hover:bg-slate-200 tooltip" data-tip="More">
            <BsThreeDots />
          </button>
        </Dropdown>
      </ul>
      <div className="flex gap-4">
        <button className="text-xl cursor-pointer tooltip" data-tip="Delete">
          <BsTrash />
        </button>
        <button className="text-xl cursor-pointer tooltip-left tooltip z-50" data-tip="Download">
          <BsDownload />
        </button>
      </div>
    </nav>
  )
}

export default ModuleNavbar
