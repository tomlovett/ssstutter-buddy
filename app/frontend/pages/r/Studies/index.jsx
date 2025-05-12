import { Link } from '@inertiajs/react'
import StudyTable from 'components/Researcher/StudyTable'
import { Button } from '@/components/ui/button'

const StudiesIndex = ({
  active_studies,
  draft_studies,
  paused_studies,
  closed_count,
}) => (
  <div>
    <div className="flex items-center justify-between mb-4">
      <h2>Your Studies</h2>
      <Button className="bg-blue-500 hover:bg-blue-600">
        <Link href="/r/studies/new" className="text-white">
          Post New Study
        </Link>
      </Button>
    </div>

    <div className="space-y-8">
      <section>
        <div className="flex items-center justify-between mb-2">
          <h3>Active Studies</h3>
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

      <hr className="border-gray-400" />

      <section>
        <h3>Draft Studies</h3>
        <StudyTable
          studies={draft_studies}
          nullStatement="You don't have any draft studies"
        />
      </section>

      <hr className="border-gray-400" />

      <section>
        <h3>Paused Studies</h3>
        <StudyTable
          studies={paused_studies}
          nullStatement="You don't have any paused studies"
        />
      </section>
    </div>
  </div>
)

export default StudiesIndex
