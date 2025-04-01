import { Suspense } from 'react'
import { LuLoaderCircle } from 'react-icons/lu'
import CourseModuleSection from '../components/CourseModuleSection'
import ProgressBar from '../components/ProgressBar'
import ModuleNavbar from '../components/shared/ModuleNavbar'
import Sidebar from '../components/Sidebar'
import TopActions from '../components/TopActions'

const moduleNavItems = ['Students', 'Announcements', 'Materials', 'Homework', 'Attendance', 'Discussion', 'Learning', 'Coursework']

export default function Home() {
  return (
    <main>
      <Suspense fallback={<LuLoaderCircle className="animate-spin" />}>
        <Sidebar>
          <TopActions />
          <ProgressBar />
          <ModuleNavbar showCount={6} items={moduleNavItems} />
          <CourseModuleSection />
        </Sidebar>
      </Suspense>
    </main>
  )
}
