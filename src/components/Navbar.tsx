import av1 from '@/assets/avatar/av1.jpg'
import Image from 'next/image'
import { LuBellRing } from 'react-icons/lu'
import { RiCustomerService2Fill } from 'react-icons/ri'

const Navbar = () => {
  return (
    <nav className="min-h-16 md:min-h-20 shadow flex items-center justify-between px-2 md:px-12 border-b border-slate-300 bg-gray-50 relative">
      <p className="text-xs md:text-sm lg:text-lg">Teacher&apos;s Center</p>
      <div className="flex gap-4 md:gap-6 items-center">
        <div className="flex gap-4 md:gap-6 *:text-xl">
          <button className='cursor-pointer'>
            <RiCustomerService2Fill />
          </button>
          <button className='cursor-pointer'>
            <LuBellRing />
          </button>
        </div>
        <div className="flex gap-4 border-l pl-4 md:pl-6 items-center cursor-pointer">
          <Image src={av1} width={500} height={500} alt="avatar" className="size-8 xl:size-11 rounded-full object-contain" />
          <div className="text-xs md:text-sm xl:text-base">
            <p className="font-bold">Sir 1</p>
            <p title="Chemistry | Level 3" className="line-clamp-1 tracking-wide">
              Chemistry | Level 3
            </p>
          </div>
        </div>
      </div>
    </nav>
  )
}
export default Navbar
