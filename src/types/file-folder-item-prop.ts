export type FileFolderItemProps = {
  item: {
    id: string
    name: string
    type: 'file' | 'folder'
    size?: string
    children?: FileFolderItemProps['item'][]
  }
  isLast?: boolean
}
