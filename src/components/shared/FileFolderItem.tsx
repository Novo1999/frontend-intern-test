import { useState } from 'react'
import { FaEye, FaFileAlt, FaFolder } from 'react-icons/fa'
import { IoIosArrowDown } from 'react-icons/io'
import { useFolderContext } from '../../context/FolderContext'
import { useModalContext } from '../../context/ModalContext'
import { type FileFolderItem, FileFolderItemProps } from '../../types/file-folder-item-prop'
import { FileItem } from '../../types/file-item'
import { getAllChildIds } from '../../utils/getAllIds'
import Dropdown from './Dropdown'
import FileDetails from './FileDetails'
import FileFolderEdit from './FileFolderEdit'

export const accessTo = ['students', 'teachers', 'moderators']
export const actions = ['edit', 'delete']

const FileFolderItem = ({ item, isLast, onCheck }: FileFolderItemProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const { checkedItems, editing, setEditing } = useFolderContext()
  const { openModal } = useModalContext()
  const [editValue, setEditValue] = useState('')

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

  const handleAction = (actionType: string) => {
    if (actionType == 'delete') {
      openModal(`Are you sure you want to delete ${name}?`, { confirmHandler: () => handleDelete(id), confirmBtnClass: 'bg-red-500' })
    } else {
      setEditing(id)
      setEditValue(name)
    }
  }

  return (
    <div className={`${!isLast && typeIsFolder ? 'border-b' : ''}`}>
      <div className={`flex justify-between flex-wrap lg:flex-nowrap items-start ${typeIsFile ? 'border-t' : ''}`}>
        <div className={`flex items-center space-x-2 p-4 ${typeIsFile ? 'pl-12' : ''}`}>
          <input type="checkbox" checked={isChecked} onChange={handleCheck} className="size-4 cursor-pointer accent-black" />
          {typeIsFolder ? (
            <div onClick={() => !editing && toggleOpen()} className="flex items-center gap-2 cursor-pointer">
              <FaFolder className="text-gray-600 text-2xl" />
              {editing === id ? <FileFolderEdit editValue={editValue} id={id} setEditValue={setEditValue} /> : <span>{name}</span>}

              <IoIosArrowDown className={`${isOpen ? 'rotate-180' : 'rotate-0'} transition duration-200`} />
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <FaFileAlt className="text-gray-600 text-2xl" />
              {editing === id ? <FileFolderEdit editValue={editValue} id={id} setEditValue={setEditValue} /> : <span>{name}</span>}
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
              <Dropdown onClick={handleAction} triggerClassName="min-h-10" items={actions}>
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
