'use client'
import { createContext, ReactNode, useContext } from 'react'
import useFolder from '../hooks/use-folder'

const FolderContext = createContext<ReturnType<typeof useFolder> | null>(null)

export const FolderProvider = ({ children }: { children: ReactNode }) => {
  const folder = useFolder()
  return <FolderContext.Provider value={folder}>{children}</FolderContext.Provider>
}

export const useFolderContext = () => {
  const context = useContext(FolderContext)
  if (!context) {
    throw new Error('useFolderContext must be used within a FolderProvider')
  }
  return context
}
