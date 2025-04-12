import { Link } from '@inertiajs/react'
import { toast } from 'sonner'

import ParticipantForm from '@/components/Participant/ParticipantForm'
import LocationTool from '@/components/lib/LocationTool'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { putRequest } from '@/lib/api'

const ParticipantEdit = ({ participant, token }) => {
  const saveLocationChanges = locationData => {
    const parsedData = {
      country: locationData.country?.symbol,
      state: locationData.state?.symbol,
      city: locationData.city?.symbol,
    }

    saveParticipantChanges(parsedData)
  }

  const saveParticipantChanges = async changedValues =>
    await putRequest(`/p/participants/${participant.id}`, changedValues, {
      token,
    }).then(res => {
      const msg =
        res.status == '200'
          ? 'Changes saved!'
          : 'Uh oh, there was an error! Be careful, your changes were not saved.'

      toast(msg)
    })

  return (
    <>
      <h3>Edit your participant profile</h3>

      <p>
        To edit your name or email, go to your{' '}
        <Link href={`/u/edit/${participant.user_id}`}>user profile</Link>
      </p>

      <Label htmlFor="name">Name</Label>
      <Input
        key="name"
        disabled
        value={`${participant.first_name} ${participant.last_name}`}
      />
      <Label htmlFor="email">Email</Label>
      <Input key="email" disabled value={participant.email} />

      <ParticipantForm
        participant={participant}
        onSave={participantValues => saveParticipantChanges(participantValues)}
      />

      <LocationTool
        country={participant.country}
        state={participant.state}
        city={participant.city}
        onSave={locationValues => saveLocationChanges(locationValues)}
      />

      <p>
        <b>How researchers will see you:</b>
      </p>
      <p>Researcher/ParticipantSlice participant=participant</p>
    </>
  )
}

export default ParticipantEdit
