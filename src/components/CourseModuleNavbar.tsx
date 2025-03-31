'use client'
import { ChangeEvent, useState } from 'react'
import { FaPen, FaPlusCircle, FaSearch, FaSlidersH, FaSync, FaTrash } from 'react-icons/fa'
import { useFolderContext } from '../context/FolderContext'
import { CourseModuleNavbarProp } from '../types/course-module-nav-prop'
import { FileFolderItem } from '../types/file-folder-item-prop'

const tabs = ['content', 'course details', 'revision']

const CourseModuleNavbar = ({ onDelete }: CourseModuleNavbarProp) => {
  const [selectedTab, setSelectedTab] = useState('content')
  const { folderData, setFolderData } = useFolderContext()
  const [allFolderData] = useState(folderData)

  const handleSelectTab = (tab: string) => {
    setSelectedTab(tab)
  }

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase()

    const searchData = (items: FileFolderItem[]): FileFolderItem[] => {
      return items
        .map((el) => {
          const filteredChildren = el.children ? searchData(el.children) : []

          if (el.name.toLowerCase().includes(value) || filteredChildren.length > 0) {
            return { ...el, children: filteredChildren }
          }

          return null
        })
        .filter(Boolean) as FileFolderItem[]
    }

    setFolderData(() => searchData(allFolderData))
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
          <input onChange={handleSearch} type="text" placeholder="Search" className="pl-8 border rounded-md py-1 px-2 text-sm" />
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
          <button className="tooltip tooltip-left" data-tip="Settings">
            <FaSlidersH />
          </button>
        </div>
      </div>
    </div>
  )
}
export default CourseModuleNavbar
