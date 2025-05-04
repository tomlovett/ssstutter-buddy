import { Link } from '@inertiajs/react'

import StudyTable from 'components/Researcher/StudyTable'
import { Button } from '@/components/ui/button'

const ResearcherHome = ({ researcher, studies }) => (
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
  </div>
)

export default ResearcherHome
