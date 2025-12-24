import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { router } from '@inertiajs/react'
import { toast } from 'sonner'

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
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 text-center">
        <p className="mt-4 text-xl">Please check your email for a confirmation link.</p>
        <div className="mt-8 max-w-md mx-auto">
          <p className="text-lg font-medium leading-6 text-gray-900">Didn't receive the email?</p>
          <div className="mt-8 mb-5">
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-3 py-4"
              placeholder="Email"
            />
            <Button onClick={handleRequestNewEmail} className="mt-3">
              Send new confirmation email
            </Button>
          </div>
        </div>
      </div>
      <div className="flex-1" />
      <div className="flex justify-center">
        <a href="/" className="text-blue-600 hover:underline">
          Back to Home Page
        </a>
      </div>
    </div>
  )
}

export default ConfirmProvisional
