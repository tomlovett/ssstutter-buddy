import { useForm } from 'react-hook-form'
import { Link } from '@inertiajs/react'
import { zodResolver } from '@hookform/resolvers/zod'

import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { Label } from '@/components/ui/label'
import Select from '@/components/ui/custom/select'
import FormInput from '@/components/ui/custom/formInput'
import UserSchema from '@/schemas/User'

const formFieldData = [
  {
    name: 'firstName',
    placeholder: 'First Name',
  },
  {
    name: 'lastName',
    placeholder: 'Last Name',
  },
  {
    name: 'email',
    placeholder: 'Email',
    type: 'email',
  },
]

const UserForm = ({ user, onSave }) => {
  const form = useForm({
    resolver: zodResolver(UserSchema),
    defaultValues: {
      firstName: user.first_name || '',
      lastName: user.last_name || '',
      email: user.email || '',
    },
  })

  const onSubmit = data => onSave(data)

  const SaveNextButtons = () =>
    user.id ? (
      <div className="flex justify-between space-x-4">
        <Button key="submit" type="submit" className="flex-1">
          Save Changes
        </Button>
        <Link href={`/u/${user.id}/edit`} as="button" className="flex-1">
          Cancel
        </Link>
      </div>
    ) : (
      <Button key="submit" type="submit" className="w-full">
        Next
      </Button>
    )

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {formFieldData.map(({ name, placeholder, type }) => (
          <FormInput
            key={name}
            form={form}
            name={name}
            placeholder={placeholder}
            type={type}
          />
        ))}
        <div className="space-y-4 text-sm text-gray-600">
          <div>
            <Label>
              If you are signing up as a researcher, please use the email
              address associated with your institution.
            </Label>
          </div>
          {!user.id && (
            <div>
              <Label>
                If you will be signing up as a researcher and a participant, use
                two separate email addresses to create two separate accounts.
              </Label>
            </div>
          )}
        </div>
        <SaveNextButtons />
      </form>
    </Form>
  )
}

export default UserForm
