import { Link } from '@inertiajs/react'
import StudyTable from 'components/Researcher/StudyTable'

const StudiesClosed = ({ studies }) => (
  <div>
    <div className="flex items-center justify-between mb-4">
      <h2>Closed Studies</h2>
      <Link href="/r/studies" className="text-blue-500 hover:text-blue-600">
        ← Back to My Studies
      </Link>
    </div>

    <StudyTable studies={studies} nullStatement="You don't have any closed studies" />
  </div>
)

export default StudiesClosed
