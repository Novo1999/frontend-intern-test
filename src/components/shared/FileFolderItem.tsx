import { useState } from 'react'
import { FaFileAlt, FaFolder } from 'react-icons/fa'
import { IoIosArrowDown } from 'react-icons/io'
import { FileFolderItemProps } from '../../types/file-folder-item-prop'

const FileFolderItem = ({ item, isLast, onCheck, checkedItems }: FileFolderItemProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const { id, name, type, children } = item

  const toggleOpen = () => setIsOpen(!isOpen)
  const isChecked = checkedItems.includes(id)

  const getAllChildIds = (children: FileFolderItemProps['item']['children']) => {
    return (children || []).reduce<string[]>((acc, child) => {
      acc.push(child.id)
      if (child.children) {
        acc.push(...getAllChildIds(child.children))
      }
      return acc
    }, [])
  }

  const handleCheck = () => {
    const childrenIds = children ? getAllChildIds(children) : []
    onCheck?.(id, childrenIds)
  }

  return (
    <div className={`${!isLast ? 'border-b' : ''} p-4`}>
      <div className="flex justify-between items-center mt-2">
        <div className="flex items-center space-x-2">
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
      </div>
      {isOpen &&
        type === 'folder' &&
        children?.map((child, index, self) => <FileFolderItem key={child.id} isLast={self.length - 1 === index} item={child} checkedItems={checkedItems} onCheck={onCheck} />)}
    </div>
  )
}

export default FileFolderItem
