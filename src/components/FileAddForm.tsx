'use client'

import { useState } from 'react'
import useFileFolderAdd from '../hooks/use-add-file-folder'

const FileAddForm = () => {
  const { parentId, setParentId, selectedSubject, setSelectedSubject, selectedBatch, setSelectedBatch, flattenedFolders, subjects, batches, handleSubmit } = useFileFolderAdd()
  const [file, setFile] = useState<File | null>(null)

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (file) handleSubmit('file', file)
    const modalElement = document.getElementById('file') as HTMLFormElement | null
    modalElement?.close()
  }

  return (
    <form onSubmit={handleFormSubmit} className="p-4 rounded-lg w-full max-w-md bg-white">
      <h2 className="text-lg font-semibold mb-4">Add New File</h2>

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
          <span className="label-text">File</span>
        </label>
        <input
          type="file"
          className="file-input file-input-bordered w-full"
          onChange={(e) => {
            setFile(e.target.files?.[0] || null)
          }}
        />
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
        Add File
      </button>
    </form>
  )
}

export default FileAddForm
