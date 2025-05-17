import { Link } from '@inertiajs/react'
import { toast } from 'sonner'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { Button } from '@/components/ui/button'
import { Form, FormMessage } from '@/components/ui/form'
import Select from '@/components/ui/custom/select'
import FormInput from '@/components/ui/custom/formInput'
import LocationTool from '@/components/lib/LocationTool'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { putRequest } from '@/lib/api'
import { isUnderEighteen } from '@/lib/participant'
import ParticipantSchema from '@/schemas/Participant'

const codenameDescription =
  'The name that will be displayed to researchers before you have connected with them'

const formFieldData = [
  {
    name: 'codename',
    placeholder: 'Codename',
    label: 'Codename',
    desc: codenameDescription,
  },
]

const genderValues = [
  { key: 'Female', value: 'f' },
  { key: 'Male', value: 'm' },
]

const ParticipantEdit = ({ participant }) => {
  const form = useForm({
    resolver: zodResolver(ParticipantSchema),
    defaultValues: {
      codename: participant?.codename ?? '',
      birthdate: participant?.birthdate ?? '',
      defaultDistance: participant?.default_distance ?? 100,
      gender: participant?.gender ?? '',
    },
  })

  const watchedBirthdate = form.watch('birthdate')

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

            <div className="py-4">
              <LocationTool
                country={participant.country}
                state={participant.state}
                city={participant.city}
                onSave={locationValues => saveLocationChanges(locationValues)}
              />
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(saveParticipantChanges)}>
                <div className="space-y-6">
                  {formFieldData.map(({ name, label, placeholder, desc }) => (
                    <FormInput
                      key={name}
                      form={form}
                      name={name}
                      label={label}
                      placeholder={placeholder}
                      desc={desc}
                      className="w-full"
                    />
                  ))}
                  <Select
                    form={form}
                    name="gender"
                    label="Biological Gender"
                    placeholder="Gender"
                    options={genderValues}
                    className="w-full"
                  />
                  <FormInput
                    form={form}
                    name="birthdate"
                    label="Date of Birth"
                    placeholder="YYYY-MM-DD"
                    disabled={!!participant.id}
                    className="w-full max-w-[200px]"
                  />
                  {watchedBirthdate && isUnderEighteen(watchedBirthdate) && (
                    <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-md">
                      <p className="text-yellow-800 text-sm">
                        For legal reasons, participants under the age of
                        eighteen must have their accounts managed by their
                        parent or legal guardian.
                        <br />
                        <br />
                        By continuing, you acknolwedge that this account is
                        managed by an adult
                      </p>
                    </div>
                  )}
                </div>

                <FormMessage className="text-red-600 text-sm" />

                <div className="flex items-center gap-4 pt-4 border-t justify-end">
                  <Link
                    href={`/p/participants/${participant.id}/edit`}
                    className="px-6 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                  >
                    Cancel
                  </Link>
                  <Button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md transition-colors"
                  >
                    Save Changes
                  </Button>
                </div>
              </form>
            </Form>
          </div>

          <div className="border-t pt-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">
              How researchers will see you:
            </h2>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="bg-white border border-gray-200 rounded-md p-4">
                <p className="text-gray-600">
                  Researcher/ParticipantSlice participant=participant
                  {/* nickname, age/gender distance from */}
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
