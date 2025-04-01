import { Dispatch, SetStateAction } from 'react'

export type FileFolderEditProp = {
  editValue: string
  setEditValue: Dispatch<SetStateAction<string>>
  id: string
}
