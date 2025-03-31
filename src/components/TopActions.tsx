import { IoIosArrowDown } from 'react-icons/io'
import Dropdown from './shared/Dropdown'

const TopActions = () => {
  return (
    <div className="flex justify-between mt-10">
      <div className="flex gap-2">
        <Dropdown items={['Item 1', 'Item 2']}>
          <p>Course For Chemistry</p>
          <IoIosArrowDown />
        </Dropdown>
        <Dropdown items={['Item 3', 'Item 4']}>
          <p>All Batches</p>
          <IoIosArrowDown />
        </Dropdown>
      </div>
      <div></div>
    </div>
  )
}
export default TopActions
