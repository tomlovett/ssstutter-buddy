import { Link } from '@inertiajs/react'
import { toast } from 'sonner'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardContent } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Form } from '@/components/ui/form'
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
      <h2 className="text-center text-3xl font-extrabold tracking-tight font-display text-slate-900">
        Create your account
      </h2>
      <p className="mt-2 text-center text-sm font-sans text-slate-600">
        Prefer to view studies anonymously?{' '}
        <Link href="/p/digital-studies" className="font-medium text-blue-600 hover:text-blue-500">
          Click here
        </Link>
      </p>
    </div>
  )

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <ModalHeader />
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(sendCreateRequest)} className="space-y-6">
            {formFieldData.map(({ name, placeholder, type }) => (
              <FormInput key={name} form={form} name={name} placeholder={placeholder} type={type} />
            ))}

            <Alert variant="info">
              <AlertDescription className="font-sans text-slate-600">
                <div className="space-y-2">
                  <p>
                    If you are signing up as a <strong>researcher</strong>, please use an email address
                    associated with your institution.
                  </p>
                  <p>
                    If you plan to sign up as both <strong>researcher</strong> and{' '}
                    <strong>participant</strong>, use two separate email addresses to create two separate
                    accounts.
                  </p>
                </div>
              </AlertDescription>
            </Alert>

            <div className="flex gap-4 mt-8 w-full">
              <Button variant="outline" asChild className="flex-1">
                <Link href={`/u/${user.id}/edit`}>Cancel</Link>
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-blue-600 hover:bg-blue-700"
                size="lg"
                disabled={form.formState.isSubmitting}
              >
                Next
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

export default Signup
