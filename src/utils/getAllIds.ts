import { FileFolderItemProps } from '../types/file-folder-item-prop'

export const getAllChildIds = (children: FileFolderItemProps['item']['children']) => {
  return (children || []).reduce<string[]>((acc, child) => {
    acc.push(child.id)
    if (child.children) {
      acc.push(...getAllChildIds(child.children))
    }
    return acc
  }, [])
}

export const getAllIds = (items: FileFolderItemProps['item'][]): string[] => {
  return items.reduce<string[]>((acc, item) => {
    acc.push(item.id)
    if (item.children) {
      acc.push(...getAllIds(item.children))
    }
    return acc
  }, [])
}
