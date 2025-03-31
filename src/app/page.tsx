import ProgressBar from '../components/ProgressBar'
import Sidebar from '../components/Sidebar'
import TopActions from '../components/TopActions'

export default function Home() {
  return (
    <main>
      <Sidebar>
        <TopActions />
        <ProgressBar />
      </Sidebar>
    </main>
  )
}
