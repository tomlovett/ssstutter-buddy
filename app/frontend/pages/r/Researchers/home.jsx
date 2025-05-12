import { Link } from '@inertiajs/react'

import StudyTable from 'components/Researcher/StudyTable'
import ConnectionsTable from 'components/Researcher/ConnectionsTable'
import { Button } from '@/components/ui/button'

const ResearcherHome = ({
  researcher,
  studies,
  new_connections,
  in_progress_connections,
}) => (
  <div>
    <div className="flex items-center justify-between mb-4">
      <h3>Welcome, {researcher.first_name}</h3>
      <Button className="bg-blue-500 hover:bg-blue-600">
        <Link href="/r/studies/new" className="text-white">
          Post New Study
        </Link>
      </Button>
    </div>

    <h5>Active Studies</h5>
    <StudyTable
      studies={studies}
      nullStatement="You don't have any active studies"
    />

    <hr className="my-4 border-gray-400" />

    <h5>New Connections</h5>
    <ConnectionsTable
      connections={new_connections}
      nullStatement="You don't have any new connections"
    />

    <hr className="my-4 border-gray-400" />

    <h5>In-Progress Connections</h5>
    <ConnectionsTable
      connections={in_progress_connections}
      nullStatement="You don't have any in-progress connections"
    />
  </div>

  // View open invitations
  // View completed connections
)

export default ResearcherHome
