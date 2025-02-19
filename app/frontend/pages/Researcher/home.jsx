import ConnectionsTable from 'components/Researcher/ConnectionsTable'
import StudyTable from 'components/Researcher/StudyTable'
import { Button } from '@/components/ui/button'

const ResearcherHome = ({ researcher, studies, active_connections }) => (
  <div>
    <h3>Researcher Home Page</h3>

    <Button onClick={() => {}}>New Study</Button>

    <h5>Active Studies</h5>
    <StudyTable
      studies={studies}
      nullStatement="You don't have any active studies"
    />
    <br />

    <h5>Active Connections</h5>
    <ConnectionsTable
      connections={active_connections}
      nullStatement="You don't have any active connections"
    />
  </div>
)

export default ResearcherHome
