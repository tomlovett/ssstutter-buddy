import { Link } from '@inertiajs/react'

import ConnectionsTable from 'components/Researcher/ConnectionsTable'
import StudyTable from 'components/Researcher/StudyTable'
import { Button } from '@/components/ui/button'

const ResearcherHome = ({ researcher, studies, active_connections, token }) => (
  <div>
    <h3>Welcome, {researcher.first_name}</h3>
    <p>
      {researcher.professional_name} of {researcher.institution}
    </p>

    <Button>
      <Link href="/r/studies/new">New Study</Link>
    </Button>

    <h5>Active Studies</h5>
    <StudyTable
      studies={studies}
      nullStatement="You don't have any active studies"
    />
    <br />

    {/*<h5>Active Connections</h5>
    <ConnectionsTable
      connections={active_connections}
      nullStatement="You don't have any active connections"
    /> */}
  </div>
)

export default ResearcherHome
