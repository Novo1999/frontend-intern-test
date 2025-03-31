'use client'
import { FaEye } from 'react-icons/fa'
import { HiArrowLeftCircle } from 'react-icons/hi2'
import { IoIosArrowDown, IoIosArrowForward } from 'react-icons/io'
import { useFolderContext } from '../context/FolderContext'
import { useModalContext } from '../context/ModalContext'
import { FileFolderItemProps } from '../types/file-folder-item-prop'
import CourseModuleNavbar from './CourseModuleNavbar'
import ModuleActions from './ModuleActions'
import Dropdown from './shared/Dropdown'
import FileFolderItem, { accessTo, actions } from './shared/FileFolderItem'

const CourseModuleSection = () => {
  const { folderData, checkedItems, setCheckedItems, toggleCheck, showDeleteModal, checkAll, handleDelete } = useFolderContext()
  const { openModal } = useModalContext()

  return (
    <div className="card bg-white mt-6 min-h-[65vh] p-4 rounded-md shadow-md">
      <CourseModuleNavbar onDelete={showDeleteModal} />
      {/* Breadcrumb */}
      <div className="flex items-center justify-between space-x-2 mt-4 text-sm lg:text-xl py-4">
        <div className="flex gap-2 items-center flex-wrap">
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
            <input onChange={checkAll} type="checkbox" className="size-4 cursor-pointer accent-black" />
            Chapter 1
          </span>
        </div>
        <div className="flex justify-between font-thin gap-4 flex-wrap items-start">
          <div className="flex gap-2 flex-wrap p-4">
            <Dropdown triggerClassName="min-h-10" wrapperClassName="max-h-10" items={accessTo}>
              <FaEye /> <span>Access to</span> <IoIosArrowDown />
            </Dropdown>
            <Dropdown
              onClick={(item) =>
                item === 'delete'
                  ? openModal(`Are you sure you want to delete ${checkedItems.length} item${checkedItems.length > 1 ? 's' : ''}?`, {
                      confirmHandler: () => {
                        checkedItems.forEach((id) => {
                          handleDelete(id)
                          setCheckedItems((prevItems) => prevItems.filter((prevId) => prevId !== id))
                        })
                      },
                      confirmBtnClass: 'bg-red-500',
                    })
                  : null
              }
              triggerClassName="min-h-10"
              items={actions}
            >
              <p>Actions</p> <IoIosArrowDown />
            </Dropdown>
          </div>
        </div>
      </div>

      <section className="overflow-auto h-[50vh] pb-16 border">
        {folderData.map((item, index, self) => (
          <FileFolderItem key={item.id} item={item as FileFolderItemProps['item']} isLast={self.length - 1 === index} onCheck={toggleCheck} />
        ))}
        <ModuleActions />
      </section>
    </div>
  )
}

export default CourseModuleSection
