import { useState } from 'react'
import ParticipantForm from '@/components/Participant/ParticipantForm'
import LocationTool from '@/components/lib/LocationTool'

import { putRequest } from '@/lib/api'

const ParticipantEdit = ({ participant }) => {
  const [participantValues, setParticipantValues] = useState(participant)

  const saveLocationChanges = locationData => {
    const parsedData = {
      country: locationData.country.symbol,
      state: locationData.state.symbol,
      city: locationData.city.symbol,
    }

    saveParticipantChanges(parsedData)
  }

  const saveParticipantChanges = async newValues => await putRequest(`/p/participants/${participant.id}`, newValues)

  return (
    <>
      <h3>Edit your profile</h3>

      <ParticipantForm
        participant={participantValues}
        onSave={modifiedParticpantValues =>
          saveParticipantChanges(modifiedParticpantValues)
        }
      />

      <LocationTool
        country={participantValues.country}
        state={participantValues.state}
        city={participantValues.city}
        onSave={locationValues => saveLocationChanges(locationValues)}
      />

      <p>
        <b>how researchers will see you:</b>
      </p>
      <p>Researcher/ParticipantSlice participant=participant</p>
    </>
  )
}

export default ParticipantEdit
