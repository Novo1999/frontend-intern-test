'use client'
import { useState } from 'react'
import { HiArrowLeftCircle } from 'react-icons/hi2'
import { IoIosArrowForward } from 'react-icons/io'
import { folderDemoData } from '../data/folder-demo-data'
import { FileFolderItemProps } from '../types/file-folder-item-prop'
import CourseModuleNavbar from './CourseModuleNavbar'
import ModuleActions from './ModuleActions'
import FileFolderItem from './shared/FileFolderItem'

const CourseModuleSection = () => {
  const [checkedItems, setCheckedItems] = useState<string[]>([])

  const toggleCheck = (id: string, childrenIds: string[] = []) => {
    setCheckedItems((prev) => {
      const isChecked = prev.includes(id)
      return isChecked ? prev.filter((checkedId) => checkedId !== id && !childrenIds.includes(checkedId)) : [...prev, id, ...childrenIds]
    })
  }

  return (
    <div className="card bg-white mt-6 min-h-[65vh] p-4 rounded-md shadow-md">
      <CourseModuleNavbar />
      {/* Breadcrumb */}
      <div className="flex items-center space-x-2 mt-4 text-sm lg:text-xl py-4">
        <button className="text-gray-600">
          <HiArrowLeftCircle className="text-2xl" />
        </button>
        <span className="underline">Chapter 1</span>
        <span>
          <IoIosArrowForward />
        </span>
        <span className="underline">Chapter 1.1</span>
        <span>
          <IoIosArrowForward />
        </span>
        <span className="bg-gray-100 px-2 py-1 rounded flex items-center gap-2">
          <input type="checkbox" className="size-4 cursor-pointer" />
          Chapter 1
        </span>
      </div>

      <section className="overflow-auto h-[50vh] pb-16 border">
        {folderDemoData.map((item, index, self) => (
          <FileFolderItem key={item.id} item={item as FileFolderItemProps['item']} isLast={self.length - 1 === index} checkedItems={checkedItems} onCheck={toggleCheck} />
        ))}
        <ModuleActions />
      </section>
    </div>
  )
}

export default CourseModuleSection
