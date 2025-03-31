import { useState } from 'react'
import { FaEye, FaFileAlt, FaFolder } from 'react-icons/fa'
import { IoIosArrowDown } from 'react-icons/io'
import { useFolderContext } from '../../context/FolderContext'
import { useModalContext } from '../../context/ModalContext'
import { type FileFolderItem, FileFolderItemProps } from '../../types/file-folder-item-prop'
import { FileItem } from '../../types/file-item'
import { getAllChildIds } from '../../utils/getAllIds'
import Dropdown from './Dropdown'

export const accessTo = ['students', 'teachers', 'moderators']
export const actions = ['edit', 'delete']

const FileFolderItem = ({ item, isLast, onCheck }: FileFolderItemProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const { checkedItems } = useFolderContext()
  const { openModal } = useModalContext()

  const { id, name, type, children } = item

  const toggleOpen = () => setIsOpen(!isOpen)
  const isChecked = checkedItems.includes(id)

  const handleCheck = () => {
    setIsOpen(true)
    const childrenIds = children ? getAllChildIds(children) : []
    onCheck?.(id, childrenIds)
  }
  const { visibility, handleDelete, handleVisibility } = useFolderContext()

  const typeIsFolder = type === 'folder'
  const typeIsFile = type === 'file'

  const visibilities = visibility.find((vD) => vD.id === id)?.visibleTo

  return (
    <div className={`${!isLast && typeIsFolder ? 'border-b' : ''}`}>
      <div className={`flex justify-between flex-wrap lg:flex-nowrap items-start ${typeIsFile ? 'border-t' : ''}`}>
        <div className={`flex items-center space-x-2 p-4 ${typeIsFile ? 'pl-12' : ''}`}>
          <input type="checkbox" checked={isChecked} onChange={handleCheck} className="size-4 cursor-pointer accent-black" />
          {typeIsFolder ? (
            <button onClick={toggleOpen} className="flex items-center gap-2 cursor-pointer">
              <FaFolder className="text-gray-600 text-2xl" />
              <span>{name}</span>
              <IoIosArrowDown className={`${isOpen ? 'rotate-180' : 'rotate-0'} transition duration-200`} />
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <FaFileAlt className="text-gray-600 text-2xl" />
              <span>{name}</span>
            </div>
          )}
        </div>
        <div className="flex justify-between font-thin gap-4 flex-wrap items-start">
          <div className="flex gap-2 flex-col flex-wrap p-4">
            <div className="flex gap-2 flex-wrap p-4">
              <Dropdown
                onClick={(item) => handleVisibility(id, item)}
                triggerClassName="min-h-10"
                showCheck
                wrapperClassName="max-h-10"
                checked={accessTo.filter((aT) => visibilities?.includes(aT))}
                items={accessTo}
              >
                <FaEye /> <span>Access to</span> <IoIosArrowDown />
              </Dropdown>
              <Dropdown
                onClick={(action) => (action === 'delete' ? openModal(`Are you sure you want to delete ${name}?`, { confirmHandler: () => handleDelete(id), confirmBtnClass: 'bg-red-500' }) : null)}
                triggerClassName="min-h-10"
                items={actions}
              >
                <p>Actions</p> <IoIosArrowDown />
              </Dropdown>
            </div>
            <p className="italic capitalize">
              <strong>Visible to: </strong>
              {visibilities?.join(', ') || 'Nobody'}
            </p>
          </div>
          {typeIsFile && <FileDetails details={item as FileItem} />}
        </div>
      </div>
      {isOpen && typeIsFolder && children?.map((child, index, self) => <FileFolderItem key={child.id} isLast={self.length - 1 === index} item={child} onCheck={onCheck} />)}
    </div>
  )
}

export default FileFolderItem

const FileDetails = ({ details }: { details: FileItem }) => {
  const { createdOn, createdBy, lastModifiedOn, lastModifiedBy, kind, size } = details ?? {}

  return (
    <div className="lg:border-l border-t w-full lg:w-fit lg:border-t-0 p-2 *:text-sm">
      <p>
        <strong>Created On:</strong> {createdOn}
      </p>
      <p>
        <strong>Created By:</strong> {createdBy}
      </p>
      <p>
        <strong>Last Modified On:</strong> {lastModifiedOn}
      </p>
      <p>
        <strong>Last Modified By:</strong> {lastModifiedBy}
      </p>
      <p>
        <strong>Kind:</strong> {kind}
      </p>
      <p>
        <strong>Size:</strong> {size}
      </p>
    </div>
  )
}
