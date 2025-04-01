'use client'

import { useCallback, useMemo, useState } from 'react'
import { useFolderContext } from '../context/FolderContext'
import { useModalContext } from '../context/ModalContext'
import { useToast } from '../context/ToastContext'
import { batches, subjects } from '../data/subject-batch-data'
import { FileFolderItem } from '../types/file-folder-item-prop'
import { bytesToMb } from '../utils/fileUtil'

const useFileFolderAdd = () => {
  const [parentId, setParentId] = useState('')
  const [name, setName] = useState('')
  const [selectedSubject, setSelectedSubject] = useState('')
  const [selectedBatch, setSelectedBatch] = useState('')
  const { setFolderData, setVisibility, folderData, setAllFolderData } = useFolderContext()
  const { closeModal } = useModalContext()
  const { addToast } = useToast()

  const parentFolders = useMemo(() => {
    const filterParentFolders = (items: FileFolderItem[]): FileFolderItem[] => {
      return items.reduce((acc, el) => {
        if (el.type === 'folder') {
          acc.push({ ...el, children: el.children ? filterParentFolders(el.children) : [] })
        }
        return acc
      }, [] as FileFolderItem[])
    }
    return filterParentFolders(folderData)
  }, [folderData])

  const flattenFolders = useCallback((folders: FileFolderItem[]): FileFolderItem[] => {
    return folders.reduce((acc, folder) => {
      acc.push({ ...folder, children: [] })
      if (folder.children && folder.children.length > 0) {
        acc.push(...flattenFolders(folder.children))
      }
      return acc
    }, [] as FileFolderItem[])
  }, [])

  const flattenedFolders = useMemo(() => flattenFolders(parentFolders), [folderData, flattenFolders])

  const handleSubmit = (type: 'folder' | 'file', file?: File) => {
    if (type === 'file' && (!file || !selectedSubject || !selectedBatch)) return addToast('Add all necessary information', 'error')
    if (type === 'folder' && (!name.trim() || !selectedSubject || !selectedBatch)) return addToast('Add all necessary information', 'error')

    const addItem = (items: FileFolderItem[]): FileFolderItem[] => {
      return items.map((el) => {
        if (el.id === parentId) {
          const newId = `${parentId}-${crypto.randomUUID()}`
          const newItem: FileFolderItem = {
            id: newId,
            name: type === 'file' ? file?.name || '' : name,
            subjectId: parseInt(selectedSubject),
            batchId: parseInt(selectedBatch),
            type,
            children: type === 'folder' ? [] : undefined,
            ...(type === 'file' && {
              kind: file?.type,
              createdOn: new Date().toISOString().split('T')[0],
              createdBy: 'Sir 1',
              lastModifiedOn: '',
              size: bytesToMb(file?.size || 0).toString() || '0',
              lastModifiedBy: '',
            }),
          }
          el.children?.push(newItem as FileFolderItem)
          setVisibility((prev) => [...prev, { id: newId, visibleTo: [] }])
        }
        return { ...el, children: el.children ? addItem(el.children) : el.children }
      })
    }

    setFolderData((prev) => addItem(prev))
    setAllFolderData((prev) => addItem(prev))
    closeModal()
    setName('')
    setSelectedSubject('')
    setSelectedBatch('')
    addToast(`Added new ${type}`, 'success')
  }

  const handleAddMainFolder = () => {
    setFolderData((prev) => [...prev, { batchId: 1, id: (Number(prev[prev.length - 1].id) + 1).toString(), children: [], name: 'test', subjectId: 1, type: 'folder' }])
    setAllFolderData((prev) => [...prev, { batchId: 1, id: (Number(prev[prev.length - 1].id) + 1).toString(), children: [], name: 'test', subjectId: 1, type: 'folder' }])
  }

  return {
    parentId,
    setParentId,
    name,
    setName,
    selectedSubject,
    setSelectedSubject,
    selectedBatch,
    setSelectedBatch,
    flattenedFolders,
    subjects,
    batches,
    handleSubmit,
    handleAddMainFolder,
  }
}

export default useFileFolderAdd
