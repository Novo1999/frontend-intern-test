import { useState } from 'react'
import { FaEye, FaFileAlt, FaFolder } from 'react-icons/fa'
import { IoIosArrowDown } from 'react-icons/io'
import { FileFolderItemProps } from '../../types/file-folder-item-prop'
import { FileItem } from '../../types/file-item'
import { getAllChildIds } from '../../utils/getAllIds'
import Dropdown from './Dropdown'

export const accessTo = ['Students', 'Teachers', 'Moderators']
export const actions = ['Edit', 'Delete']

const FileFolderItem = ({ item, isLast, onCheck, checkedItems }: FileFolderItemProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const { id, name, type, children } = item

  const toggleOpen = () => setIsOpen(!isOpen)
  const isChecked = checkedItems.includes(id)

  const handleCheck = () => {
    setIsOpen(true)
    const childrenIds = children ? getAllChildIds(children) : []
    onCheck?.(id, childrenIds)
  }

  return (
    <div className={`${!isLast && type === 'folder' ? 'border-b' : ''}`}>
      <div className={`flex justify-between items-start ${type === 'file' ? 'border-t' : ''}`}>
        <div className={`flex items-center space-x-2 p-4 ${type === 'file' ? 'pl-8' : ''}`}>
          <input type="checkbox" checked={isChecked} onChange={handleCheck} className="size-4 cursor-pointer accent-black" />
          {type === 'folder' ? (
            <button onClick={toggleOpen} className="flex items-center gap-2 cursor-pointer">
              <FaFolder className="text-gray-600" />
              <span>{name}</span>
              <IoIosArrowDown className={`${isOpen ? 'rotate-180' : 'rotate-0'} transition duration-200`} />
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <FaFileAlt className="text-gray-600" />
              <span>{name}</span>
            </div>
          )}
        </div>
        <div className="flex justify-between font-thin gap-4 flex-wrap items-start">
          <div className="flex gap-2 flex-wrap p-4">
            <Dropdown triggerClassName="min-h-10" wrapperClassName="max-h-10" items={accessTo}>
              <FaEye /> <span>Access to</span> <IoIosArrowDown />
            </Dropdown>
            <Dropdown triggerClassName="min-h-10" items={actions}>
              <p>Actions</p> <IoIosArrowDown />
            </Dropdown>
          </div>
          {type === 'file' && <FileDetails details={item as FileItem} />}
        </div>
      </div>
      {isOpen &&
        type === 'folder' &&
        children?.map((child, index, self) => <FileFolderItem key={child.id} isLast={self.length - 1 === index} item={child} checkedItems={checkedItems} onCheck={onCheck} />)}
    </div>
  )
}

export default FileFolderItem

const FileDetails = ({ details }: { details: FileItem }) => {
  const { createdOn, createdBy, lastModifiedOn, lastModifiedBy, kind, size } = details

  return (
    <div className="border-l p-2">
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
