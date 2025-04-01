'use client'

import { useCallback, useMemo, useState } from 'react'
import { useFolderContext } from '../context/FolderContext'
import { useModalContext } from '../context/ModalContext'
import { useToast } from '../context/ToastContext'
import { batches, subjects } from '../data/subject-batch-data'
import { FileFolderItem } from '../types/file-folder-item-prop'

const FolderAddForm = () => {
  const [parentId, setParentId] = useState('')
  const [folderName, setFolderName] = useState('')
  const { closeModal } = useModalContext()
  const [selectedSubject, setSelectedSubject] = useState<string>('')
  const [selectedBatch, setSelectedBatch] = useState<string>('')
  const { allFolderData, setFolderData, folderData, setVisibility } = useFolderContext()
  console.log('🚀 ~ FolderAddForm ~ folderData:', folderData)
  const { addToast } = useToast()

  const parentFolders = useMemo(() => {
    const filterParentFolders = (items: FileFolderItem[]): FileFolderItem[] => {
      return items.reduce((acc, el) => {
        if (el.type === 'folder') {
          const newItem = {
            ...el,
            children: el.children ? filterParentFolders(el.children) : [],
          }
          acc.push(newItem)
        }
        return acc
      }, [] as FileFolderItem[])
    }
    return filterParentFolders(allFolderData)
  }, [allFolderData])

  const flattenFolders = useCallback((folders: FileFolderItem[]): FileFolderItem[] => {
    return folders.reduce((acc, folder) => {
      acc.push({ ...folder, children: [] })

      if (folder.children && folder.children.length > 0) {
        const flattenedChildren = flattenFolders(folder.children)
        acc.push(...flattenedChildren)
      }

      return acc
    }, [] as FileFolderItem[])
  }, [])

  const flattenedFolders = useMemo(() => flattenFolders(parentFolders), [parentFolders, flattenFolders])

  const handleSubmitAddFolder = (parentId: string, folderName: string) => {
    const addFolder = (items: FileFolderItem[]): FileFolderItem[] => {
      return items
        .map((el) => {
          if (el.id === parentId) {
            const newParentId = `${parentId}-${crypto.randomUUID()}`
            const folder: Partial<FileFolderItem> = {
              id: newParentId,
              name: folderName,
              subjectId: parseInt(selectedSubject),
              batchId: parseInt(selectedBatch),
              type: 'folder',
              children: [],
            }
            el?.children?.push(folder as FileFolderItem)
            setVisibility((prev) => [...prev, { id: newParentId, visibleTo: [] }])
          }
          return el
        })
        .map((el) => ({
          ...el,
          children: el.children ? addFolder(el.children) : el.children,
        }))
    }

    setFolderData((prev) => addFolder(prev))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!folderName.trim() || !selectedSubject || !selectedBatch) return
    handleSubmitAddFolder(parentId, folderName)
    closeModal()
    setFolderName('')
    setSelectedSubject('')
    setSelectedBatch('')
    addToast('Added new folder', 'success')
  }

  return (
    <form onSubmit={handleSubmit} className="p-4 rounded-lg w-full max-w-md bg-white">
      <h2 className="text-lg font-semibold mb-4">Add New Folder</h2>

      <div className="form-control">
        <label className="label">
          <span className="label-text">Parent Folder</span>
        </label>
        <select value={parentId} onChange={(e) => setParentId(e.target.value)} className="select select-bordered w-full">
          <option value="">Select Parent Folder</option>
          {flattenedFolders.map((folder) => (
            <option key={folder.id} value={folder.id}>
              {folder.name}
            </option>
          ))}
        </select>
      </div>

      <div className="form-control mt-4">
        <label className="label">
          <span className="label-text">Folder Name</span>
        </label>
        <input type="text" value={folderName} onChange={(e) => setFolderName(e.target.value)} placeholder="Enter folder name" className="input input-bordered w-full" />
      </div>

      <div className="form-control mt-4">
        <label className="label">
          <span className="label-text">Select Subject</span>
        </label>
        <select value={selectedSubject} onChange={(e) => setSelectedSubject(e.target.value)} className="select select-bordered w-full">
          <option value="">Select Subject</option>
          {subjects.map((subject) => (
            <option key={subject.id} value={subject.id}>
              {subject.name}
            </option>
          ))}
        </select>
      </div>

      <div className="form-control mt-4">
        <label className="label">
          <span className="label-text">Select Batch</span>
        </label>
        <select value={selectedBatch} onChange={(e) => setSelectedBatch(e.target.value)} className="select select-bordered w-full">
          <option value="">Select Batch</option>
          {batches.map((batch) => (
            <option key={batch.id} value={batch.id}>
              {batch.name}
            </option>
          ))}
        </select>
      </div>

      <button type="submit" className="btn bg-black text-white mt-4 w-full">
        Add Folder
      </button>
    </form>
  )
}

export default FolderAddForm
