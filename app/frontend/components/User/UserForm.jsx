import { useForm } from 'react-hook-form'
import { Link } from '@inertiajs/react'
import { zodResolver } from '@hookform/resolvers/zod'

import { Form } from '@/components/ui/form'
import { Label } from '@/components/ui/label'
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
  {
    name: 'password',
    placeholder: 'Password',
    type: 'password',
  },
  {
    name: 'passwordConfirmation',
    placeholder: 'Confirm Password',
    type: 'password',
  },
]

const UserForm = ({ user, onSave }) => {
  const form = useForm({
    resolver: zodResolver(UserSchema),
    defaultValues: {
      firstName: user.first_name || '',
      lastName: user.last_name || '',
      email: user.email || '',
      password: '',
      passwordConfirmation: '',
    },
  })

  const onSubmit = data => onSave(data)

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

        {user.id ? (
          <div className="text-sm text-gray-600">
            <div className="flex justify-center">
              <Link
                href="/reset-password"
                className="text-blue-500 hover:text-blue-600"
              >
                To change your password, click this link
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-4 text-sm text-gray-600">
            <div>
              <Label>
                If you plan to sign up as both researcher <b>and</b>{' '}
                participant, use two separate email addresses to create two
                separate accounts.
              </Label>
              <br />
              <br />
              <Label>
                If you are signing up as a researcher, please use the email
                address from your institution.
              </Label>
            </div>
          </div>
        )}

        <div className="flex gap-4 mt-8 w-full">
          <Link
            href={`/u/${user.id}/edit`}
            className="flex-1 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold transition-colors text-center"
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="flex-1 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold transition-colors"
          >
            {user.id ? 'Save Changes' : 'Next'}
          </button>
        </div>
      </form>
    </Form>
  )
}

export default UserForm
