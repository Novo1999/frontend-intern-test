import { BsUpload } from 'react-icons/bs'
import { FaFileAlt, FaFolder, FaPaste } from 'react-icons/fa'
import { HiDocument } from 'react-icons/hi2'

const ModuleActions = () => {
  return (
    <div className="mt-4 grid grid-cols-2 lg:grid-cols- xl:grid-cols-5 gap-4 p-4 *:cursor-pointer *:hover:bg-slate-100 *:transition *:duration-300 *:border-dotted *:border *:rounded-xl  *:text-xs *:lg:text-xl max-w-6xl mx-auto *:w-full">
      <button className="px-6 py-4 flex items-center space-x-2">
        <FaFolder /> <span>Add Folder</span>
      </button>
      <button className="px-6 py-4 flex items-center space-x-2">
        <FaFileAlt /> <span>Upload File</span>
      </button>
      <button className="px-6 py-4 flex items-center space-x-2">
        <BsUpload /> <span>Upload Folder</span>
      </button>
      <button className="px-6 py-4 flex items-center space-x-2">
        <span>
          <HiDocument />
        </span>
        <span>Add Text</span>
      </button>
      <button className="px-6 py-4 flex items-center space-x-2">
        <span>
          <FaPaste />
        </span>{' '}
        <span>Paste</span>
      </button>
    </div>
  )
}
export default ModuleActions
