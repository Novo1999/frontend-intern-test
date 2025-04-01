import { FileItem } from '../../types/file-item'

const FileDetails = ({ details }: { details: FileItem }) => {
  const { createdOn, createdBy, lastModifiedOn, lastModifiedBy, kind, size } = details ?? {}

  return (
    <div className="lg:border-l border-t w-full lg:w-fit lg:border-t-0 p-2 *:text-sm">
      <p>
        <strong>Created On:</strong> {createdOn}
      </p>
      <p>
        <strong>Created By:</strong> {createdBy}
      </p>
      <p>
        <strong>Last Modified On:</strong> {lastModifiedOn}
      </p>
      <p>
        <strong>Last Modified By:</strong> {lastModifiedBy}
      </p>
      <p>
        <strong>Kind:</strong> <span className='max-w-36 line-clamp-1'>{kind}</span>
      </p>
      <p>
        <strong>Size:</strong> {size}
      </p>
    </div>
  )
}

export default FileDetails
