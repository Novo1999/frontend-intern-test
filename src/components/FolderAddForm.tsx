'use client'

import useFileFolderAdd from '../hooks/use-add-file-folder'

const FolderAddForm = () => {
  const { parentId, setParentId, name, setName, selectedSubject, setSelectedSubject, selectedBatch, setSelectedBatch, flattenedFolders, subjects, batches, handleSubmit } = useFileFolderAdd()

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleSubmit('folder')
    const modalElement = document.getElementById('folder') as HTMLFormElement | null
    modalElement?.close()
    setParentId('')
    setName('')
    setSelectedBatch('')
    setSelectedSubject('')
  }

  return (
    <form onSubmit={handleFormSubmit} className="p-4 rounded-lg w-full max-w-md bg-white">
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
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter folder name" className="input input-bordered w-full" />
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
