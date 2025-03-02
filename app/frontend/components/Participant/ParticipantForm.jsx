import { useForm } from 'react-hook-form'
import { Link } from '@inertiajs/react'
import { zodResolver } from '@hookform/resolvers/zod'

import { Button } from '@/components/ui/button'
import { Form, FormMessage } from '@/components/ui/form'
import Select from '@/components/ui/custom/select'
import TextInput from '@/components/ui/custom/textInput'
import UserSchema from '@/schemas/User'

const codenameDescription =
  'The name that will be displayed to researchers before you have connected with them'
const defaultDistanceDescription =
  'The distance at which studies will be shown to you. It is best to set a longer distance than a shorter one'

const formFieldData = [
  { name: 'firstName', placeholder: 'First Name', desc: '' },
  {
    name: 'lastName',
    placeholder: 'Last Name',
    desc: 'You may use your last initial if you prefer, i.e. "L."',
  },
  { name: 'email', placeholder: 'Email', desc: '' },
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
    resolver: zodResolver(UserSchema),
    defaultValues: {
      firstName: participant.first_name || '',
      lastName: participant.last_name || '',
      email: participant.email || '',
      codename: participant.codename || '',
      birthdate: participant.birthdate || '',
      defaultDistance: participant.default_distance || 50,
      gender: participant.gender || '',
    },
  })

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
          <TextInput
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
        <TextInput
          form={form}
          name="birthdate"
          placeholder="Birthdate (YYYY-MM-DD)"
        />
        <FormMessage />
      </form>
    </Form>
  )
}

export default ParticipantForm
