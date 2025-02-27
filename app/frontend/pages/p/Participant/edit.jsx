import { useState } from 'react'
import ParticipantForm from '@/components/Participant/ParticipantForm'
import LocationTool from '@/components/lib/LocationTool'

const ParticipantEdit = ({ participant }) => {
  const [participantValues, setParticipantValues] = useState(participant)

  return (
    <>
      <h3>Edit your profile</h3>

      <ParticipantForm participant={participantValues} />

      <LocationTool
        country={participantValues.country}
        state={participantValues.state}
        city={participantValues.city}
        onSave={locationValues => {
          setParticipantValues(Object.assign(participantValues, locationValues))
        }}
      />

      <p>
        <b>how researchers will see you:</b>
      </p>
      <p>Researcher/ParticipantSlice participant=participant</p>
    </>
  )
}

export default ParticipantEdit
