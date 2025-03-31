import { useState } from 'react'
import { IoMdWarning } from 'react-icons/io'
import { useModalContext } from '../context/ModalContext'
import { folderDemoData } from '../data/folder-demo-data'
import { visibilityData } from '../data/visibility-data'
import { FileFolderItem, FileFolderItemProps } from '../types/file-folder-item-prop'
import { getAllIds } from '../utils/getAllIds'

const useFolder = () => {
  const [checkedItems, setCheckedItems] = useState<string[]>([])
  const [folderData, setFolderData] = useState<FileFolderItemProps['item'][]>(folderDemoData)
  const { openModal } = useModalContext()
  const [visibility, setVisibility] = useState(visibilityData)

  const toggleCheck = (id: string, childrenIds: string[] = []) => {
    setCheckedItems((prev) => {
      const isChecked = prev.includes(id)
      return isChecked ? prev.filter((checkedId) => checkedId !== id && !childrenIds.includes(checkedId)) : [...prev, id, ...childrenIds]
    })
  }

  const checkAll = () => {
    const allIds = getAllIds(folderDemoData as FileFolderItemProps['item'][])
    setCheckedItems((prev) => (prev.length > 0 ? [] : allIds))
  }

  const showDeleteModal = () =>
    openModal('Are you sure you want to delete everything?', { confirmBtnClass: 'bg-red-500', confirmBtnText: 'Delete', headerIcon: <IoMdWarning />, confirmHandler: () => setFolderData([]) })

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
  }

  const handleVisibility = (id: string, item: string) => {
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

  return { folderData, setFolderData, setCheckedItems, checkedItems, toggleCheck, showDeleteModal, checkAll, handleDelete, handleVisibility, visibility }
}
export default useFolder
