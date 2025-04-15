import { useForm } from 'react-hook-form'
import { Link } from '@inertiajs/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { postRequest } from '@/lib/api'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import FormInput from '@/components/ui/custom/formInput'

const ForgotPasswordSchema = z.object({
  email: z.string().email('Invalid email address'),
})

const formFieldData = [
  {
    name: 'email',
    placeholder: 'Email',
    type: 'email',
  },
]

const ForgotPassword = () => {
  const form = useForm({
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  })

  const onSubmit = async data => {
    try {
      await postRequest('/forgot-password', data).then(() => {
        toast(
          'If an account exists with this email, you will receive login instructions.',
          { duration: 5000 }
        )
      })
    } catch (_error) {
      toast('Something went wrong. Please try again.', { duration: 5000 })
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md space-y-8 rounded-lg bg-white p-8 shadow-lg">
        <div>
          <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900">
            Reset your password
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Enter your email address and we&apos;ll send you an email to reset
            your password.
          </p>
        </div>
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

            <div>
              <Button type="submit" className="w-full">
                Send Reset Email
              </Button>
            </div>

            <div className="text-center text-sm">
              <Link
                href="/login"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Back to login
              </Link>
            </div>
          </form>
        </Form>
      </div>
    </div>
  )
}

export default ForgotPassword
