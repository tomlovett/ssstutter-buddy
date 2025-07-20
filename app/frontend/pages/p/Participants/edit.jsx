import { Link } from '@inertiajs/react'
import { toast } from 'sonner'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import ParticipantPreview from '@/components/Participant/ParticipantPreview'
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
import {
  FormField,
  FormItem,
  FormControl,
  FormLabel,
} from '@/components/ui/form'
import { Checkbox } from '@/components/ui/checkbox'

const genderValues = [
  { key: 'Female', value: 'f' },
  { key: 'Male', value: 'm' },
]

const ParticipantEdit = ({ participant, is_complete }) => {
  const form = useForm({
    resolver: zodResolver(ParticipantSchema),
    defaultValues: {
      codename: participant?.codename ?? '',
      birthdate: participant?.birthdate ?? '',
      defaultDistance: participant?.default_distance ?? 100,
      gender: participant?.gender ?? '',
      weekly_digest_opt_out: participant?.weekly_digest_opt_out ?? false,
    },
  })

  const watchedParticipant = form.watch()

  const saveLocationChanges = locationData => {
    const parsedData = {
      participant: {
        location_attributes: {
          id: participant.location.id,
          country: locationData.country?.symbol,
          state: locationData.state?.symbol,
          city: locationData.city?.symbol,
        },
      },
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
        {!is_complete && (
          <div className="flex text-center justify-center items-center mb-4 bg-yellow-100 p-4 rounded-md">
            <p className="text-md">
              Please complete your profile in order to start participating in
              studies.
            </p>
          </div>
        )}
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
                country={participant.location.country}
                state={participant.location.state}
                city={participant.location.city}
                onSave={locationValues => saveLocationChanges(locationValues)}
              />
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(saveParticipantChanges)}>
                <div className="space-y-6">
                  <FormInput
                    form={form}
                    name="codename"
                    label="Codename"
                    placeholder="Codename"
                    desc="The name that will be displayed to researchers before you have connected with them"
                    className="w-1/2"
                  />
                  <div className="flex gap-4 mb-4">
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
                      className="w-full max-w-[200px]"
                    />
                  </div>
                  {isUnderEighteen(watchedParticipant.birthdate) && (
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

                <div className="flex items-center gap-2 mt-4 mb-4">
                  <FormField
                    control={form.control}
                    name="weekly_digest_opt_out"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <FormLabel>
                          Opt me out of the weekly digest emails
                        </FormLabel>
                      </FormItem>
                    )}
                  />
                </div>

                <FormMessage className="text-red-600 text-sm" />

                <div className="flex items-center gap-4 pt-4 border-t justify-end">
                  <Link
                    href={`/p/participants/${participant.id}/edit`}
                    className="px-6 py-2 text-gray-600 hover:text-gray-800 transition-colors border border-gray-300 rounded-md"
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
            <ParticipantPreview
              participant={Object.assign(participant, watchedParticipant)}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ParticipantEdit
