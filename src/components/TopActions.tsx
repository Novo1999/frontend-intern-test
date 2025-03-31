'use client'
import av1 from '@/assets/avatar/av1.jpg'
import av2 from '@/assets/avatar/av2.jpg'
import Image from 'next/image'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useEffect } from 'react'
import { GiClassicalKnowledge } from 'react-icons/gi'
import { IoIosArrowDown } from 'react-icons/io'
import { useFolderContext } from '../context/FolderContext'
import { batches, subjects } from '../data/subject-batch-data'
import { FileFolderItem } from '../types/file-folder-item-prop'
import Dropdown from './shared/Dropdown'

const TopActions = () => {
  const { setFolderData, allFolderData } = useFolderContext()
  const searchParams = useSearchParams()
  const { replace } = useRouter()
  const pathname = usePathname()

  const handleSubjectSelect = useCallback(
    (itemId: number, type: 'batch' | 'sub') => {
      const typeIsBatch = type === 'batch'

      const params = new URLSearchParams(searchParams)
      if (itemId) {
        params.set(typeIsBatch ? 'batch' : 'sub_id', itemId.toString())
      } else {
        params.delete(typeIsBatch ? 'batch' : 'sub_id')
      }
      replace(`${pathname}?${params.toString()}`)

      const filterUsingCourse = (items: FileFolderItem[]): FileFolderItem[] => {
        return items
          .map((el) => {
            const filteredChildren = el.children ? filterUsingCourse(el.children) : []

            if (el[typeIsBatch ? 'batchId' : 'subjectId'] === itemId || filteredChildren.length > 0) {
              return { ...el, children: filteredChildren }
            }
            return null
          })
          .filter(Boolean) as FileFolderItem[]
      }

      setFolderData(() => filterUsingCourse(allFolderData))
    },
    [allFolderData, pathname, searchParams, replace, setFolderData]
  )

  const filterType = searchParams.has('sub_id') ? 'sub' : 'batch'
  useEffect(() => {
    if (!searchParams.has('sub_id') || !searchParams.has('batch')) return
    handleSubjectSelect(Number(searchParams.get('sub_id')), filterType)
  }, [searchParams, filterType, handleSubjectSelect])

  return (
    <div className="flex justify-between font-thin mt-10 gap-4 flex-wrap items-center">
      <div className="flex gap-2 flex-wrap">
        <Dropdown isArrayOfRecords onClick={(item) => handleSubjectSelect(Number(item), 'sub')} triggerClassName="min-h-10" wrapperClassName="border-r max-h-10 pr-2" items={subjects}>
          <p>{subjects.find((sub) => sub.id === Number(searchParams.get('sub_id')) || 0)?.name || 'Course For Chemistry'}</p>
          <IoIosArrowDown />
        </Dropdown>
        <Dropdown onClick={(item) => handleSubjectSelect(Number(item), 'batch')} isArrayOfRecords triggerClassName="min-h-10" items={batches}>
          <p>{batches.find((batch) => batch.id === Number(searchParams.get('batch')) || 0)?.name || 'Batch'}</p>
          <IoIosArrowDown />
        </Dropdown>
      </div>
      <div className="flex justify-between gap-4 *:cursor-pointer items-center">
        <button className="bg-black min-h-10 text-white py-2 px-2 flex gap-2 items-center rounded-lg">
          <GiClassicalKnowledge />
          <p className="text-xs">Take Class</p>
        </button>
        <button className="flex items-center min-h-10 relative mb-2">
          <div className="relative z-10 top-1 translate-x-2">
            <Image src={av1} className="rounded-full size-8 relative z-0 object-contain" alt="avatar" width={300} height={300} />
            <Image src={av2} className="rounded-full absolute z-20 object-contain top-0 left-0 size-8 translate-x-3" alt="avatar" width={300} height={300} />
          </div>
          <p className="text-xs bg-white p-2 w-20 rounded-full z-0 top-full transform mt-2">Add TA</p>
        </button>
      </div>
    </div>
  )
}

export default TopActions
