import { toast } from 'sonner'

import ParticipantForm from '@/components/Participant/ParticipantForm'
import LocationTool from '@/components/lib/LocationTool'
import { putRequest } from '@/lib/api'

const ParticipantEdit = ({ participant }) => {
  const saveLocationChanges = locationData => {
    const parsedData = {
      country: locationData.country.symbol,
      state: locationData.state.symbol,
      city: locationData.city.symbol,
    }

    saveParticipantChanges(parsedData)
  }

  const saveParticipantChanges = async changedValues =>
    await putRequest(`/p/participants/${participant.id}`, changedValues).then(
      res => {
        const msg =
          res.status == '200'
            ? 'Changes saved!'
            : 'Uh oh, there was an error! Please refresh the page and try again.'

        toast(msg)
      }
    )

  return (
    <>
      <h3>Edit your profile</h3>

      <ParticipantForm
        participant={participant}
        onSave={particpantValues => saveParticipantChanges(particpantValues)}
      />

      <LocationTool
        country={participant.country}
        state={participant.state}
        city={participant.city}
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
