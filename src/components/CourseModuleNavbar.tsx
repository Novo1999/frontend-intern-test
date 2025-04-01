'use client'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { FaCheck, FaPen, FaPlusCircle, FaSearch, FaSlidersH, FaSync, FaTimes, FaTrash, FaTrashRestore } from 'react-icons/fa'
import { RiListSettingsLine } from 'react-icons/ri'
import { useFilterContext } from '../context/FilterContext'
import { useFolderContext } from '../context/FolderContext'
import useFileFolderAdd from '../hooks/use-add-file-folder'
import { CourseModuleNavbarProp } from '../types/course-module-nav-prop'

const tabs = ['content', 'course details', 'revision']

const CourseModuleNavbar = ({ onDelete }: CourseModuleNavbarProp) => {
  const [selectedTab, setSelectedTab] = useState('content')
  const { folderData, setFolderData, allFolderData } = useFolderContext()
  const { replace } = useRouter()
  const { handleFilter } = useFilterContext()
  const searchParams = useSearchParams()
  const { handleAddMainFolder } = useFileFolderAdd()
  const [search, setSearch] = useState('')
  const [addingMain, setAddingMain] = useState(false)
  const [mainFolderName, setMainFolderName] = useState('')

  useEffect(() => {
    if (!searchParams.toString) return
    if (!searchParams.has('search')) return
    setSearch(searchParams.get('search') || '')
  }, [searchParams.toString()])

  const handleSelectTab = (tab: string) => setSelectedTab(tab)

  const handleConfirmAddMain = () => {
    if (mainFolderName.trim()) {
      handleAddMainFolder(mainFolderName)
      setMainFolderName('')
      setAddingMain(false)
    }
  }

  return (
    <div className="flex justify-between flex-wrap gap-2 items-center border-b pb-4 lg:pb-0">
      <div className="flex gap-8 items-center *:pb-4 flex-wrap">
        {tabs.map((tab) => (
          <button
            onClick={() => handleSelectTab(tab)}
            key={tab}
            className={`capitalize ${tab === selectedTab ? 'border-b-2 font-semibold border-black' : ''} cursor-pointer hover:border-black hover:border-b-2`}
          >
            {tab}
          </button>
        ))}
        {addingMain ? (
          <div className="flex items-center gap-2 border !pb-0 mb-3 border-black rounded-lg">
            <input value={mainFolderName} onChange={(e) => setMainFolderName(e.target.value)} placeholder="Add Main Folder" autoFocus type="text" className="outline-none placeholder:text-sm pl-2" />
            <button onClick={handleConfirmAddMain} className="text-green-600 cursor-pointer">
              <FaCheck />
            </button>
            <button onClick={() => setAddingMain(false)} className="text-red-600 cursor-pointer">
              <FaTimes />
            </button>
          </div>
        ) : (
          <button onClick={() => setAddingMain(true)} className="cursor-pointer flex items-center gap-2 italic hover:underline">
            <FaPlusCircle className="text-black" /> Add Main Folder
          </button>
        )}
      </div>
      <div className="flex flex-wrap gap-2 items-center space-x-4">
        <div className="relative">
          <FaSearch className="absolute left-2 top-2 text-gray-400" />
          <input
            value={search}
            onChange={(e) => {
              setSearch(e.target.value)
              handleFilter({ search: e.target.value.toLowerCase(), subId: searchParams.get('subId') || '', batchId: searchParams.get('batchId') || '' })
            }}
            type="text"
            placeholder="Search"
            className="pl-8 border rounded-md py-1 px-2 text-sm"
          />
        </div>
        <div className="flex space-x-3 text-gray-500 *:cursor-pointer">
          <button className="tooltip group" data-tip="Edit">
            <FaPen className="group-hover:-rotate-90 transition duration-300" />
          </button>
          <button className="tooltip group" data-tip={`Delete ${folderData.length} Folders`} disabled={!folderData.length} onClick={onDelete}>
            <FaTrash className="group-hover:hidden block" />
            <FaTrashRestore className="group-hover:block hidden" />
          </button>
          <button
            onClick={() => {
              setFolderData(allFolderData)
              replace('/')
            }}
            className="tooltip group"
            data-tip="Reset"
          >
            <FaSync className="group-hover:rotate-180 transition duration-300" />
          </button>
          <button className="tooltip tooltip-left group" data-tip="Settings">
            <FaSlidersH className="group-hover:hidden block" />
            <RiListSettingsLine className="group-hover:block hidden" />
          </button>
        </div>
      </div>
    </div>
  )
}
export default CourseModuleNavbar
