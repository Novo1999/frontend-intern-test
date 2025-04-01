import { FaCheck } from 'react-icons/fa'
import { MdCancel } from 'react-icons/md'
import { useFolderContext } from '../../context/FolderContext'
import { FileFolderEditProp } from '../../types/file-folder-edit-prop'

const FileFolderEdit = ({ editValue, setEditValue, id }: FileFolderEditProp) => {
  const { handleEdit, setEditing } = useFolderContext()

  return (
    <div className="flex gap-2">
      <input autoFocus className="input" type="text" value={editValue} onChange={(e) => setEditValue(e.target.value)} />
      <button
        className="btn"
        onClick={() => {
          handleEdit(id, editValue)
          setEditing('')
          setEditValue('')
        }}
      >
        <FaCheck />
      </button>
      <button
        className="btn"
        onClick={() => {
          setEditing('')
          setEditValue('')
        }}
      >
        <MdCancel />
      </button>
    </div>
  )
}
export default FileFolderEdit
