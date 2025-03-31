import { useState } from 'react'
import { FaEye, FaFileAlt, FaFolder } from 'react-icons/fa'
import { IoIosArrowDown } from 'react-icons/io'
import { FileFolderItemProps } from '../../types/file-folder-item-prop'
import Dropdown from './Dropdown'

const accessTo = ['Students', 'Teachers', 'Moderators']
const actions = ['Edit', 'Delete']

const FileFolderItem = ({ item, isLast }: FileFolderItemProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const { name, type, children } = item

  const toggleOpen = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className={`${!isLast ? 'border-b' : ''} p-4`}>
      <div className="flex justify-between items-center mt-2">
        <div className="flex items-center space-x-2">
          <input type="checkbox" className="size-4 cursor-pointer" />
          {type === 'folder' ? (
            <button onClick={toggleOpen} className="flex items-center gap-2 cursor-pointer">
              <FaFolder className="text-gray-600" />
              <span>{name}</span>
              <IoIosArrowDown className={`${isOpen ? 'rotate-180' : 'rotate-0'}`} />
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <FaFileAlt className="text-gray-600" />
              <span>{name}</span>
            </div>
          )}
        </div>
        <div className="flex justify-between font-thin gap-4 flex-wrap items-center">
          <div className="flex gap-2 flex-wrap">
            <Dropdown triggerClassName="min-h-10" wrapperClassName="max-h-10" items={accessTo}>
              <FaEye /> <span>Access to</span> <IoIosArrowDown />
            </Dropdown>
            <Dropdown triggerClassName="min-h-10" items={actions}>
              <p>Actions</p> <IoIosArrowDown />
            </Dropdown>
          </div>
        </div>
      </div>
      {isOpen && type === 'folder' && children?.map((child, index, self) => <FileFolderItem key={child.id} isLast={self.length - 1 === index} item={child} />)}
    </div>
  )
}

export default FileFolderItem
