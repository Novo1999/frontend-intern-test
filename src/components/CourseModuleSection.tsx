'use client'
import { BsEmojiFrownFill } from 'react-icons/bs'
import { useFolderContext } from '../context/FolderContext'
import { FileFolderItemProps } from '../types/file-folder-item-prop'
import CourseBreadCrumb from './CourseBreadCrumb'
import CourseModuleNavbar from './CourseModuleNavbar'
import ModuleActions from './ModuleActions'
import FileFolderItem from './shared/FileFolderItem'

const CourseModuleSection = () => {
  const { folderData, toggleCheck, showDeleteModal } = useFolderContext()

  return (
    <div className="card bg-white mt-6 min-h-[65vh] p-4 rounded-md shadow-md">
      <CourseModuleNavbar onDelete={showDeleteModal} />
      <CourseBreadCrumb />
      <section className="overflow-auto h-[40vh] pb-16 border mb-36 lg:mb-0">
        {folderData.length > 0 ? (
          folderData.map((item, index, self) => <FileFolderItem key={item.id} item={item as FileFolderItemProps['item']} isLast={self.length - 1 === index} onCheck={toggleCheck} />)
        ) : (
          <div className="min-h-[20vh] text-center flex items-center justify-center gap-2">
            <BsEmojiFrownFill />
            No Items
          </div>
        )}
        <ModuleActions />
      </section>
    </div>
  )
}

export default CourseModuleSection
