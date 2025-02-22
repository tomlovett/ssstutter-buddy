'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

// import { toast } from "@/components/ui/sonner"
// import { useToast } from "@/hooks/use-toast"

import { Button } from '@/components/ui/button'
import { Form, FormMessage } from '@/components/ui/form'
import Select from '@/components/ui/custom/select'
import TextInput from '@/components/ui/custom/textInput'

const FormSchema = z.object({
  firstName: z.string().min(2, {
    message: 'First Name must be at least 2 characters.',
  }),
  lastName: z.string().min(1, {
    message: 'Last Name must be at least 1 character.',
  }),
  email: z.string().min(1, {
    message: 'Email must be at least 1 character.',
  }),
  codename: z.string().min(1, {
    message: 'Codename must be at least 1 character.',
  }),
  defaultDistance: z.number(),
  gender: z.string(),
  birthdate: z.coerce.date({
    required_error: 'A date of birth is required.',
  }),
})

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

const ParticipantForm = ({ participant }) => {
  // const { toast } = useToast()

  const form = useForm({
    resolver: zodResolver(FormSchema),
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

  const onSubmit = data => {
    console.log(JSON.stringify(data, null, 2))
  }

  const genderValues = [
    { key: 'F', value: 'f' },
    { key: 'M', value: 'm' },
  ]

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
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
        <Button type="submit">Submit</Button>
        <Button>Cancel</Button>
      </form>
    </Form>
  )
}

export default ParticipantForm
