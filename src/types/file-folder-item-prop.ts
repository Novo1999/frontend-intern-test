export type FileFolderItemProps = {
  item: {
    id: string
    name: string
    type: 'file' | 'folder'
    size?: string
    children?: FileFolderItemProps['item'][]
  }
  isLast?: boolean
  onCheck?: (id: string, childrenIds: string[]) => void
  checkedItems: string[]
}
