import { useState } from 'react'
import { toast } from 'sonner'
import { MailOpen } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

const AwaitConfirmation = () => {
  const [email, setEmail] = useState('')

  const handleResend = () => {
    if (email.trim() === '') {
      toast.error('Please enter a valid email address')
      return
    }

    fetch('/await-confirmation/resend-confirmation?email=' + email).then(() => {
      toast.success('Email sent!')
    })
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="text-center">
        <div className="flex justify-center mb-4">
          <MailOpen className="h-16 w-16 text-blue-600" />
        </div>
        <CardTitle className="text-3xl font-extrabold tracking-tight font-display text-slate-900">
          Account created!
        </CardTitle>
        <p className="mt-4 text-xl font-sans text-slate-600">
          Please check your email to complete your registration
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <h3 className="text-lg font-medium leading-6 font-sans text-slate-900">
            Didn't receive the email?
          </h3>
          <div className="space-y-3">
            <Input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
            <Button onClick={handleResend} variant="outline" className="w-full">
              Resend confirmation email
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default AwaitConfirmation
