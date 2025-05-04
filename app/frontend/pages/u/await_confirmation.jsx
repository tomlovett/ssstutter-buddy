import { useState } from 'react'
import { toast } from 'sonner'

import PublicFooter from '@/components/Layout/PublicFooter'

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
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900">Account created!</h1>
          <p className="mt-4 text-xl text-gray-600">
            Please check your email to complete your registration
          </p>
          <div className="mt-8 max-w-md mx-auto">
            <div className="bg-white shadow sm:rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  Didn't receive the email?
                </h3>
                <div className="mt-5">
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-3 py-4"
                    placeholder="Email"
                  />
                  <button
                    onClick={handleResend}
                    className="mt-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Resend confirmation email
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <PublicFooter />
    </div>
  )
}

export default AwaitConfirmation
