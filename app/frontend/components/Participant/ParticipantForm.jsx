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
const defaultDistanceDescription =
  'The distance at which studies will be shown to you. It is best to set a longer distance than a shorter one'
const underEighteenWarning =
  'Warning: For legal reasons, participants under the age of eighteen must have their accounts managed by their parent or legal guardian. By continuing, you acknolwedge that this account is managed by an adult'

const formFieldData = [
  {
    name: 'codename',
    placeholder: 'Codename',
    desc: codenameDescription,
  },
  {
    name: 'defaultDistance',
    placeholder: 'Default study distance',
    desc: defaultDistanceDescription,
  },
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

  const onSubmit = data => onSave(data)

  const genderValues = [
    { key: 'F', value: 'f' },
    { key: 'M', value: 'm' },
  ]

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <Button key="submit" type="submit">
          Save Changes
        </Button>
        <Link href={`/p/participants/${participant.id}/edit`} as="button">
          Cancel
        </Link>
        {formFieldData.map(({ name, placeholder, desc }) => (
          <FormInput
            key={name}
            form={form}
            name={name}
            placeholder={placeholder}
            desc={desc}
          />
        ))}
        <Select
          form={form}
          name="gender"
          placeholder="Biological Gender"
          options={genderValues}
        />
        <FormInput
          form={form}
          name="birthdate"
          placeholder="Birthdate (YYYY-MM-DD)"
          disabled={!!participant.id}
        />
        {watchedBirthdate && isUnderEighteen(watchedBirthdate) && (
          <p>{underEighteenWarning}</p>
        )}
        <FormMessage />
      </form>
    </Form>
  )
}

export default ParticipantForm
