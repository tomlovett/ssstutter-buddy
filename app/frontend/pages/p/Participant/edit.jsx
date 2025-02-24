import ParticipantForm from '@/components/Participant/ParticipantForm'
import LocationTool from '@/components/lib/LocationTool'
import { formatLocation } from '@/lib/utils'

const ParticipantEdit = ({ participant }) => {
  return (
    <>
      <h3>Edit your profile</h3>

      <ParticipantForm participant={participant} />

      <p>
        <b>Your Location</b>:{' '}
        {formatLocation(
          participant.country,
          participant.state,
          participant.city
        )}
      </p>

      <LocationTool
        country={participant.country}
        state={participant.state}
        city={participant.city}
      />

      <p>
        <b>how researchers will see you:</b>
      </p>
      <p>Researcher/ParticipantSlice participant=participant</p>
    </>
  )
}

export default ParticipantEdit
