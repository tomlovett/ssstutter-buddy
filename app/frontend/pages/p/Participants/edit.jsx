import { Link } from '@inertiajs/react'
import { toast } from 'sonner'

import ParticipantForm from '@/components/Participant/ParticipantForm'
import LocationTool from '@/components/lib/LocationTool'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { putRequest } from '@/lib/api'

const ParticipantEdit = ({ participant }) => {
  const saveLocationChanges = locationData => {
    const parsedData = {
      country: locationData.country?.symbol,
      state: locationData.state?.symbol,
      city: locationData.city?.symbol,
    }

    saveParticipantChanges(parsedData)
  }

  const saveParticipantChanges = async changedValues =>
    await putRequest(`/p/participants/${participant.id}`, changedValues).then(
      res => {
        const msg =
          res.status == '200'
            ? 'Changes saved!'
            : 'Uh oh, there was an error! Be careful, your changes were not saved.'

        toast(msg)
      }
    )

  return (
    <div className="ml-0 w-4/5 px-4 space-y-8">
      <div className="p-6 space-y-6">
        <div className="border-b pb-4">
          <h1 className="text-2xl mb-2 font-semibold text-gray-900">
            Edit Participant Profile
          </h1>
          <p className="text-gray-600 ml-2">
            To edit your name or email, go to your{' '}
            <Link
              href={`/u/${participant.user_id}/edit`}
              className="text-blue-600 hover:text-blue-800 underline"
            >
              user profile
            </Link>
          </p>
        </div>

        <div className="grid gap-6">
          <div className="space-y-4">
            <div>
              <Label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Name
              </Label>
              <Input
                key="name"
                disabled
                value={`${participant.first_name} ${participant.last_name}`}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md text-gray-600"
              />
            </div>

            <div>
              <Label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email
              </Label>
              <Input
                key="email"
                disabled
                value={participant.email}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md text-gray-600"
              />
            </div>
          </div>

          <div className="border-t pt-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">
              Participant Information
            </h2>
            <ParticipantForm
              participant={participant}
              onSave={participantValues =>
                saveParticipantChanges(participantValues)
              }
            />
          </div>

          <div className="border-t pt-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">
              Location Information
            </h2>
            <LocationTool
              country={participant.country}
              state={participant.state}
              city={participant.city}
              onSave={locationValues => saveLocationChanges(locationValues)}
            />
          </div>

          <div className="border-t pt-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">
              How researchers will see you:
            </h2>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="bg-white border border-gray-200 rounded-md p-4">
                <p className="text-gray-600">
                  Researcher/ParticipantSlice participant=participant
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ParticipantEdit
