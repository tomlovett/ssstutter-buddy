import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from '@inertiajs/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { postRequest } from '@/lib/api'
import { MailCheck } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
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
  const [isSubmitted, setIsSubmitted] = useState(false)
  const form = useForm({
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  })

  const onSubmit = async data => {
    try {
      await postRequest('/forgot-password', data).then(() => {
        setIsSubmitted(true)
      })
    } catch (_error) {
      // Error handling can be added here if needed
    }
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-center text-3xl font-extrabold tracking-tight font-display text-slate-900">
          Forgot your password?
        </CardTitle>
        <p className="mt-4 font-sans text-slate-600">
          Enter your email address and we'll send you an email to reset your password.
        </p>
      </CardHeader>
      <CardContent>
        {isSubmitted ? (
          <Alert variant="info" className="mb-6">
            <MailCheck className="h-4 w-4" />
            <AlertDescription className="font-sans text-slate-600">
              If an account exists with this email, you will receive login instructions.
            </AlertDescription>
          </Alert>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {formFieldData.map(({ name, placeholder, type }) => (
                <FormInput key={name} form={form} name={name} placeholder={placeholder} type={type} />
              ))}

              <div className="flex justify-center">
                <Button
                  type="submit"
                  className="w-1/2 bg-blue-600 hover:bg-blue-700"
                  size="lg"
                  disabled={form.formState.isSubmitting}
                >
                  Send Reset Email
                </Button>
              </div>
            </form>
          </Form>
        )}

        <div className="text-center text-sm mt-6">
          <Button variant="link" asChild>
            <Link href="/login" className="font-medium text-blue-600">
              Back to login
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default ForgotPassword
