import { Link } from '@inertiajs/react'
import StudyTable from 'components/Participant/StudyTable'

const ParticipantHome = ({
  participant,
  study_invitations,
  connections,
  nearby_studies,
}) => {
  return (
    <>
      <h3>Welcome, {participant.first_name}!</h3>

      {/* TODO: your badges */}

      <h4 className="underline">Your Invitations</h4>
      <StudyTable
        studies={study_invitations.map(c => c.study)}
        nullStatement="You have no pending invitations"
      />
      <br />

      <h4 className="underline">Your Connections</h4>
      <StudyTable
        studies={connections.map(c => c.study)}
        nullStatement="You have no active connections"
      />
      <br />

      <h4 className="underline">Studies Near You</h4>
      <StudyTable
        studies={nearby_studies}
        nullStatement="There are currently no active studies near you."
      />
      <br />

      <Link href="/p/digital-studies">View Fully-Online Studies</Link>
    </>
  )
}

export default ParticipantHome
