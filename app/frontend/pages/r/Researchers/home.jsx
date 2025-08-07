import StudyTable from 'components/Researcher/StudyTable'
import ConnectionsTable from 'components/Researcher/ConnectionsTable'
import { CreateStudyModal } from 'components/Researcher/CreateStudyModal'

const ResearcherHome = ({ researcher, studies, in_progress_connections }) => (
  <div>
    <div className="flex items-center justify-between mb-4">
      <h3>Welcome, {researcher.first_name}</h3>

      <CreateStudyModal />
    </div>

    <h5>Active Studies</h5>
    <StudyTable studies={studies} nullStatement="You don't have any active studies" />

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
