import { Link } from '@inertiajs/react'
import { toast } from 'sonner'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { Form } from '@/components/ui/form'
import { Label } from '@/components/ui/label'
import FormInput from '@/components/ui/custom/formInput'
import UserSchema from '@/schemas/User'

import { postRequest } from '@/lib/api'

const sendCreateRequest = async userValues => {
  if (userValues.password !== userValues.passwordConfirmation) {
    toast('Passwords do not match')
    return
  }

  postRequest('/signup', userValues)
    .then(res => res.json())
    .then(jsonData => {
      toast(JSON.stringify(jsonData))
    })
}

const formFieldData = [
  { name: 'firstName', placeholder: 'First Name' },
  { name: 'lastName', placeholder: 'Last Name' },
  { name: 'email', placeholder: 'Email', type: 'email' },
  { name: 'password', placeholder: 'Password', type: 'password' },
  {
    name: 'passwordConfirmation',
    placeholder: 'Confirm Password',
    type: 'password',
  },
]

const Signup = ({ user }) => {
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

  const ModalHeader = () => (
    <div>
      <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900">Create your account</h2>
      <p className="mt-2 text-center text-sm text-gray-600">
        Already have an account?{' '}
        <Link href="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
          Sign in
        </Link>
      </p>
      <p className="mt-2 text-center text-sm text-gray-600">
        Prefer to view studies anonymously?{' '}
        <Link href="/p/digital-studies" className="font-medium text-indigo-600 hover:text-indigo-500">
          Click here
        </Link>
      </p>
    </div>
  )

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md space-y-8 rounded-lg bg-white p-8 shadow-lg">
        <ModalHeader />
        <Form {...form}>
          <form onSubmit={form.handleSubmit(sendCreateRequest)} className="space-y-6">
            {formFieldData.map(({ name, placeholder, type }) => (
              <FormInput key={name} form={form} name={name} placeholder={placeholder} type={type} />
            ))}

            <div className="space-y-4 text-sm text-gray-600">
              <div>
                <Label>
                  If you plan to sign up as both researcher <b>and</b> participant, use two separate email
                  addresses to create two separate accounts.
                </Label>
                <br />
                <br />
                <Label>
                  If you are signing up as a researcher, please use an email address associated with your
                  institution.
                </Label>
              </div>
            </div>

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
                Next
              </button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  )
}

export default Signup
