import { Dispatch, SetStateAction } from 'react'

export type FileFolderItemProps = {
  item: FileFolderItem
  isLast?: boolean
  onCheck?: (id: string, childrenIds: string[]) => void
  checkedItems: string[]
  setFolderData?: Dispatch<SetStateAction<FileFolderItem[]>>
}

export type FileFolderItem = {
  id: string
  name: string
  type: 'folder' | 'file'
  size?: string
  kind?: string
  createdOn?: string
  createdBy?: string
  lastModifiedOn?: string
  lastModifiedBy?: string
  children?: FileFolderItem[]
}
