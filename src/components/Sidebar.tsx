'use client'
import Link from 'next/link'
import { ReactNode, useState } from 'react'
import { HiArrowLeftCircle, HiBars3BottomLeft } from 'react-icons/hi2'
import { IoIosArrowUp } from 'react-icons/io'
import { type SidebarItem } from '../types/sidebar-item'

const sidebarData = [
  {
    header: true,
    item: 'teach',
  },
  {
    item: 'dashboard',
  },
  {
    item: 'manage Batch',
    childs: [
      {
        item: 'all batches',
      },
      {
        item: 'resources',
      },
    ],
  },
  {
    item: 'my earnings',
  },
  {
    item: 'timetable',
  },
  {
    item: 'analytics',
  },
]

const Sidebar = ({ children }: { children: ReactNode }) => {
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content bg-gray-100 h-screen pl-4 overflow-scroll">
        <label htmlFor="my-drawer" className="absolute left-0 p-2 bg-white border cursor-pointer drawer-button lg:hidden">
          <HiBars3BottomLeft />
        </label>
        {children}
      </div>
      <div className="drawer-side z-[99] bg-white">
        <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
        <ul className="menu flex-col justify-between bg-white relative text-base-content min-h-full lg:min-h-[90vh] w-48 pr-4 py-4 *:capitalize *:font-thin lg:text-lg">
          <div>
            {sidebarData.map((data) => (
              <SidebarItem key={data.item} data={data as SidebarItem} />
            ))}
          </div>
          <div>
            <li>
              <Link href="/profile">Manage Profile</Link>
            </li>
            <li>
              <Link href="/profile">Settings</Link>
            </li>
          </div>
        </ul>
      </div>
    </div>
  )
}
export default Sidebar

const SidebarItem = ({ data }: { data: SidebarItem }) => {
  const [isOpen, setIsOpen] = useState(false)
  const hasChild = data.childs?.length
  const url = '/' + data.item.replace(/ /g, '')

  return (
    <>
      <li onClick={() => hasChild && setIsOpen(!isOpen)} className={hasChild ? 'cursor-pointer' : ''}>
        {hasChild ? (
          <div>
            {data.item}
            <IoIosArrowUp className={`${isOpen ? 'rotate-0' : 'rotate-180'} transition duration-200`} />
          </div>
        ) : data.header ? (
          <div className="flex justify-between mb-6">
            {data.item}
            <label htmlFor="my-drawer" aria-label="close sidebar">
              <HiArrowLeftCircle className="text-2xl" />
            </label>
          </div>
        ) : (
          <Link href={url}>{data.item}</Link>
        )}
      </li>
      {isOpen && hasChild && (
        <ul className="pl-4">
          {data.childs.map((child: SidebarItem) => (
            <SidebarItem key={child.item} data={child} />
          ))}
        </ul>
      )}
    </>
  )
}
