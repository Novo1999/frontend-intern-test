'use client'
import av1 from '@/assets/avatar/av1.jpg'
import av2 from '@/assets/avatar/av2.jpg'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import { GiClassicalKnowledge } from 'react-icons/gi'
import { IoIosArrowDown } from 'react-icons/io'
import { useFilterContext } from '../context/FilterContext'
import { batches, subjects } from '../data/subject-batch-data'
import Dropdown from './shared/Dropdown'

const TopActions = () => {
  const searchParams = useSearchParams()
  const { handleFilter } = useFilterContext()

  return (
    <div className="flex justify-between font-thin mt-10 gap-4 flex-wrap items-center">
      <div className="flex gap-2 flex-wrap">
        <Dropdown
          isArrayOfRecords
          onClick={(item) => handleFilter({ search: searchParams.get('search') || '', subId: item || '', batchId: searchParams.get('batch') || '' })}
          triggerClassName="min-h-10"
          wrapperClassName="border-r max-h-10 pr-2"
          items={subjects}
        >
          <p>{subjects.find((sub) => sub.id === Number(searchParams.get('subId')) || 0)?.name || 'Course For Chemistry'}</p>
          <IoIosArrowDown />
        </Dropdown>
        <Dropdown
          onClick={(item) => handleFilter({ search: searchParams.get('search') || '', subId: searchParams.get('subId') || '', batchId: item || '' })}
          isArrayOfRecords
          triggerClassName="min-h-10"
          items={batches}
        >
          <p>{batches.find((batch) => batch.id === Number(searchParams.get('batchId')) || 0)?.name || 'Batch'}</p>
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
