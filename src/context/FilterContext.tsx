'use client'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from 'react'
import { useFolderContext } from '../context/FolderContext'
import { FileFolderItem } from '../types/file-folder-item-prop'
import { FilterPipeline } from '../types/filter'

type FilterContextType = {
  filters: Partial<FilterPipeline>
  setFilters: (filters: Partial<FilterPipeline>) => void
  handleFilter: (filters: Partial<FilterPipeline>) => void
}

const FilterContext = createContext<FilterContextType | undefined>(undefined)

export const FilterProvider = ({ children }: { children: ReactNode }) => {
  const { replace } = useRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { setFolderData, allFolderData } = useFolderContext()

  const [filters, setFilters] = useState<Partial<FilterPipeline>>({})

  const handleFilter = useCallback(
    (newFilters: Partial<FilterPipeline>) => {
      const params = new URLSearchParams(searchParams)

      Object.entries(newFilters).forEach(([key, value]) => {
        if (value) {
          params.set(key, value)
        } else {
          params.delete(key)
        }
      })

      replace(`${pathname}?${params.toString()}`)
      setFilters(newFilters)

      const filterData = (items: FileFolderItem[]): FileFolderItem[] => {
        return items
          .map((el) => {
            const filteredChildren = el.children ? filterData(el.children) : []

            const matchesSearch = newFilters.search ? el.name.toLowerCase().includes(newFilters.search.toLowerCase()) : true
            const matchesBatch = newFilters.batchId ? el.batchId === Number(newFilters.batchId) : true
            const matchesSub = newFilters.subId ? el.subjectId === Number(newFilters.subId) : true

            if ((matchesSearch && matchesBatch && matchesSub) || filteredChildren.length > 0) {
              return { ...el, children: filteredChildren }
            }
            return null
          })
          .filter(Boolean) as FileFolderItem[]
      }

      setFolderData(filterData(allFolderData))
    },
    [allFolderData, pathname, replace, searchParams, setFolderData]
  )

  useEffect(() => {
    if (!searchParams.toString()) return

    handleFilter({
      search: searchParams.get('search') || '',
      subId: searchParams.get('subId') || '',
      batchId: searchParams.get('batchId') || '',
    })
  }, [searchParams.toString(), handleFilter])
  return <FilterContext.Provider value={{ filters, setFilters, handleFilter }}>{children}</FilterContext.Provider>
}

export const useFilterContext = () => {
  const context = useContext(FilterContext)
  if (!context) {
    throw new Error('useFilterContext must be used within a FilterProvider')
  }
  return context
}
