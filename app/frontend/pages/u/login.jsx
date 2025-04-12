import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Link, router } from '@inertiajs/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'sonner'

import { postRequest } from '@/lib/api'
import { Button } from '@/components/ui/button'
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
  useEffect(() => {
    const sb_token  = localStorage.getItem('sb_token')
    if (sb_token) {
      postRequest('/auth/validate-token', { sb_token })  
        .then(res => res.json())
        .then(({ user, token, redirect }) => {
          // toast('Success! Redirecting you...')

        }).catch(_error => {
          localStorage.removeItem('sb_token')
        })
    }
  }, [])

  const form = useForm({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = async data => {
    try {
      await postRequest('/auth/login', data)
        .then(res => res.json())
        .then(({ user, token, redirect }) => {
          localStorage.setItem('sb_token', token)
          toast('Success! Redirecting you...')

          console.log('redirect', redirect)
          // setTimeout(() => {
          //   router.visit(redirect, { options: { token } })
          // }, 200)
        })
    } catch (_error) {
      toast('Invalid email or password', { duration: 5000 })
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md space-y-8 rounded-lg bg-white p-8 shadow-lg">
        <div>
          <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{' '}
            <Link
              href="/signup"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              create a new account
            </Link>
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

            <div className="flex items-center justify-end">
              <div className="text-sm">
                <Link
                  href="/forgot-password"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Forgot your password?
                </Link>
              </div>
            </div>

            <div>
              <Button type="submit" className="w-full">
                Sign in
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  )
}

export default Login
