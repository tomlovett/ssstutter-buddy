import { Link } from '@inertiajs/react'
import StudyTable from 'components/Researcher/StudyTable'
import { CreateStudyModal } from 'components/Researcher/CreateStudyModal'

const StudiesIndex = ({
  active_studies,
  draft_studies,
  paused_studies,
  closed_count,
}) => (
  <div className="container mx-auto py-6">
    <div className="flex items-center justify-between mb-6">
      <h1 className="text-2xl font-semibold">Your Studies</h1>
      <CreateStudyModal />
    </div>

    <section className="space-y-8">
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-medium">Active Studies</h2>
          <Link
            href="/r/studies/closed"
            className="text-blue-500 hover:text-blue-600"
          >
            View Closed Studies ({closed_count})
          </Link>
        </div>
        <StudyTable
          studies={active_studies}
          nullStatement="You don't have any active studies"
        />
      </section>

      <section>
        <h2 className="text-xl font-medium mb-4">Draft Studies</h2>
        <StudyTable
          studies={draft_studies}
          nullStatement="You don't have any draft studies"
        />
      </section>

      <section>
        <h2 className="text-xl font-medium mb-4">Paused Studies</h2>
        <StudyTable
          studies={paused_studies}
          nullStatement="You don't have any paused studies"
        />
      </section>
    </section>
  </div>
)

export default StudiesIndex
