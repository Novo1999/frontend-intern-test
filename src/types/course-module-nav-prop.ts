import { folderDemoData } from '../data/folder-demo-data'

export type CourseModuleNavbarProp = {
  onDelete?: () => void
  folderData: typeof folderDemoData
}
