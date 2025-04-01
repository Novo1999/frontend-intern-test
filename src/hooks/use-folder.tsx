import { useState } from 'react'
import { IoMdWarning } from 'react-icons/io'
import { useModalContext } from '../context/ModalContext'
import { useToast } from '../context/ToastContext'
import { folderDemoData } from '../data/folder-demo-data'
import { visibilityData } from '../data/visibility-data'
import { FileFolderItem, FileFolderItemProps } from '../types/file-folder-item-prop'
import { getAllIds } from '../utils/getAllIds'

const useFolder = () => {
  const [checkedItems, setCheckedItems] = useState<string[]>([])
  const [folderData, setFolderData] = useState<FileFolderItemProps['item'][]>(folderDemoData)
  const [allFolderData] = useState(folderData)
  const { openModal } = useModalContext()
  const [visibility, setVisibility] = useState(visibilityData)
  const [editing, setEditing] = useState('')
  const { addToast } = useToast()

  const toggleCheck = (id: string, childrenIds: string[] = []) => {
    if (editing) setEditing('')
    setCheckedItems((prev) => {
      const isChecked = prev.includes(id)
      return isChecked ? prev.filter((checkedId) => checkedId !== id && !childrenIds.includes(checkedId)) : [...prev, id, ...childrenIds]
    })
  }

  const checkAll = () => {
    if (editing) setEditing('')

    const allIds = getAllIds(folderDemoData as FileFolderItemProps['item'][])
    setCheckedItems((prev) => (prev.length > 0 ? [] : allIds))
  }

  const showDeleteModal = () => {
    if (editing) setEditing('')

    openModal('Are you sure you want to delete everything?', {
      confirmBtnClass: 'bg-red-500',
      confirmBtnText: 'Delete',
      headerIcon: <IoMdWarning />,
      confirmHandler: () => {
        setFolderData([])
        addToast('All Files and Folder Deleted', 'success')
      },
    })
  }

  const handleDelete = (itemId: string) => {
    const removeItem = (items: FileFolderItem[]): FileFolderItem[] => {
      return items
        .filter((el) => el.id !== itemId)
        .map((el) => ({
          ...el,
          children: el.children ? removeItem(el.children) : el.children,
        }))
    }

    setFolderData?.((prev) => removeItem(prev))
    addToast('Item has been Deleted', 'success')
  }

  const handleEdit = (itemId: string, value: string) => {
    const editItem = (items: FileFolderItem[]): FileFolderItem[] => {
      return items
        .map((el) => {
          if (el.id === itemId) {
            el.name = value
          }
          return el
        })
        .map((el) => ({
          ...el,
          children: el.children ? editItem(el.children) : el.children,
        }))
    }
    setFolderData?.((prev) => editItem(prev))
  }

  const handleVisibility = (id: string, item: string) => {
    if (editing) setEditing('')

    setVisibility((prev) => {
      return prev.map((prevItem) => {
        if (prevItem.id === id) {
          if (prevItem.visibleTo.includes(item)) {
            return { ...prevItem, visibleTo: prevItem.visibleTo.filter((vT) => vT !== item) }
          } else {
            return { ...prevItem, visibleTo: [...prevItem.visibleTo, item] }
          }
        } else {
          return prevItem
        }
      })
    })
  }

  return {
    folderData,
    setFolderData,
    setCheckedItems,
    checkedItems,
    toggleCheck,
    showDeleteModal,
    checkAll,
    handleDelete,
    handleVisibility,
    visibility,
    allFolderData,
    handleEdit,
    editing,
    setEditing,
    setVisibility
  }
}
export default useFolder
