import { useForm } from 'react-hook-form'
import { Link } from '@inertiajs/react'
import { zodResolver } from '@hookform/resolvers/zod'

import { Button } from '@/components/ui/button'
import { Form, FormMessage } from '@/components/ui/form'
import Select from '@/components/ui/custom/select'
import FormInput from '@/components/ui/custom/formInput'
import { isUnderEighteen } from '@/lib/participant'
import ParticipantSchema from '@/schemas/Participant'

const codenameDescription =
  'The name that will be displayed to researchers before you have connected with them'
// const defaultDistanceDescription =
//   'The distance at which studies will be shown to you. It is best to set a longer distance than a shorter one'
const underEighteenWarning =
  'Warning: For legal reasons, participants under the age of eighteen must have their accounts managed by their parent or legal guardian. By continuing, you acknolwedge that this account is managed by an adult'

const formFieldData = [
  {
    name: 'codename',
    placeholder: 'Codename',
    label: 'Codename',
    desc: codenameDescription,
  },
  // {
  //   name: 'defaultDistance',
  //   placeholder: 'Default study distance',
  //   label: 'Default study distance',
  //   desc: defaultDistanceDescription,
  // },
]

const dateRegex = /^\d{4}-\d{2}-\d{2}$/ // YYYY-MM-DD

const genderValues = [
  { key: 'Female', value: 'f' },
  { key: 'Male', value: 'm' },
]

const ParticipantForm = ({ participant, onSave }) => {
  const form = useForm({
    resolver: zodResolver(ParticipantSchema),
    defaultValues: {
      codename: participant.codename || '',
      birthdate: participant.birthdate || '',
      defaultDistance: participant.default_distance || 50,
      gender: participant.gender || '',
    },
  })

  const watchedBirthdate = form.watch('birthdate')

  const validateBirthdate = birthdate => dateRegex.test(birthdate)

  const onSubmit = data => {
    if (!validateBirthdate(data.birthdate)) {
      form.setError('birthdate', {
        message: 'Birthdate must be in YYYY-MM-DD format',
      })
      return
    }
    onSave(data)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
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
              <p className="text-yellow-800 text-sm">{underEighteenWarning}</p>
            </div>
          )}
        </div>

        <div className="flex items-center gap-4 pt-4 border-t">
          <Button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md transition-colors"
          >
            Save Changes
          </Button>
          <Link
            href={`/p/participants/${participant.id}/edit`}
            className="px-6 py-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            Cancel
          </Link>
        </div>

        <FormMessage className="text-red-600 text-sm" />
      </form>
    </Form>
  )
}

export default ParticipantForm
