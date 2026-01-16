import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { router } from '@inertiajs/react'
import { toast } from 'sonner'
import { CheckCircle2 } from 'lucide-react'

const ConfirmProvisional = () => {
  const [email, setEmail] = useState('')

  const handleRequestNewEmail = () => {
    if (email.trim() === '') {
      toast.error('Please enter a valid email address')
      return
    }

    router.post('/forgot-password', { email }).then(() => {
      toast.success('Email sent! Please check your inbox.')
    })
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="text-center">
        <div className="flex justify-center mb-4">
          <CheckCircle2 className="h-16 w-16 text-green-600" />
        </div>
        <CardTitle className="text-3xl font-extrabold tracking-tight font-display text-slate-900">
          Check your email
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p className="text-lg font-medium leading-6 font-sans text-slate-900">Didn't receive the email?</p>
          <div className="space-y-3">
            <Input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
            <Button onClick={handleRequestNewEmail} className="w-full" size="lg">
              Send new confirmation email
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default ConfirmProvisional
