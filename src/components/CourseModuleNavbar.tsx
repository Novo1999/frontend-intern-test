'use client'
import { useState } from 'react'
import { FaPen, FaPlusCircle, FaSearch, FaSlidersH, FaSync, FaTrash } from 'react-icons/fa'
import { CourseModuleNavbarProp } from '../types/course-module-nav-prop'

const tabs = ['content', 'course details', 'revision']

const CourseModuleNavbar = ({ onDelete, folderData }: CourseModuleNavbarProp) => {
  const [selectedTab, setSelectedTab] = useState('content')

  const handleSelectTab = (tab: string) => {
    setSelectedTab(tab)
  }

  return (
    <div className="flex justify-between flex-wrap gap-2 items-center border-b">
      <div className="flex gap-8 items-center *:pb-4">
        {tabs.map((tab) => (
          <button
            onClick={() => handleSelectTab(tab)}
            key={tab}
            className={`capitalize ${tab === selectedTab ? 'border-b-2 font-semibold border-black' : ''} cursor-pointer hover:border-black hover:border-b-2`}
          >
            {tab}
          </button>
        ))}
        <div className="flex items-center gap-2">
          <FaPlusCircle className="text-black" /> <span className="text-gray-400 italic font-thin">Add main Folder</span>
        </div>
      </div>
      <div className="flex flex-wrap gap-2 items-center space-x-4">
        <div className="relative">
          <FaSearch className="absolute left-2 top-2 text-gray-400" />
          <input type="text" placeholder="Search" className="pl-8 border rounded-md py-1 px-2 text-sm" />
        </div>
        <div className="flex space-x-3 text-gray-500 *:cursor-pointer">
          <button className="tooltip" data-tip="Edit">
            <FaPen />
          </button>
          <button className="tooltip" data-tip={`Delete ${folderData.length} Folders`} disabled={!folderData.length} onClick={onDelete}>
            <FaTrash />
          </button>
          <button className="tooltip" data-tip="Refresh">
            <FaSync />
          </button>
          <button className="tooltip" data-tip="Settings">
            <FaSlidersH />
          </button>
        </div>
      </div>
    </div>
  )
}
export default CourseModuleNavbar
