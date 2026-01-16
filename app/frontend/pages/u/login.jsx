import { useForm } from 'react-hook-form'
import { Link } from '@inertiajs/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { postRequest } from '@/lib/api'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Form } from '@/components/ui/form'
import FormInput from '@/components/ui/custom/formInput'

const LoginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

const formFieldData = [
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
]

const Login = () => {
  const form = useForm({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = async data => {
    await postRequest('/login', data).then(res => {
      if (res.status === 401) {
        toast.error('Invalid email or password', { duration: 10000 })
      }
    })
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-center text-3xl font-extrabold tracking-tight font-display text-slate-900">
          Sign in to your account
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {formFieldData.map(({ name, placeholder, type }) => (
              <FormInput key={name} form={form} name={name} placeholder={placeholder} type={type} />
            ))}

            <div className="flex items-center justify-end">
              <div className="text-sm">
                <Link href="/forgot-password" className="font-medium text-blue-600 hover:text-blue-500">
                  Forgot your password?
                </Link>
              </div>
            </div>

            <div>
              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700"
                size="lg"
                disabled={form.formState.isSubmitting}
              >
                Sign in
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

export default Login
