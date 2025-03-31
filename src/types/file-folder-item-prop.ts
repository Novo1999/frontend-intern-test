export type FileFolderItemProps = {
  item: FileFolderItem
  isLast?: boolean
  onCheck?: (id: string, childrenIds: string[]) => void
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
  subjectId: number
  batchId: number
}
