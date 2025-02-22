import ParticipantForm from '@/components/Participant/ParticipantForm'
import { formatLocation } from '@/lib/utils'

const ParticipantEdit = ({ participant }) => {
  return (
    <>
      <h3>Edit your profile</h3>

      <ParticipantForm participant={participant} />

      <p>
        <b>Location</b>:{' '}
        {formatLocation(
          participant.country,
          participant.state,
          participant.city
        )}
      </p>

      <p>
        <b>how researchers will see you:</b>
      </p>
      <p>Researcher/ParticipantSlice participant=participant</p>
    </>
  )
}

export default ParticipantEdit
