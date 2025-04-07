import { useState, useEffect } from 'react'
import { Head, router } from '@inertiajs/react'
import { toast } from 'sonner'
import { postRequest } from '@/lib/api'

import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'

export default function Confirm() {
  const [activationPin, setActivationPin] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const pinParam = params.get('pin')

    if (pinParam) {
      setActivationPin(pinParam)
      submitPin()
    }
  }, [])

  const submitPin = async () => {
    setIsSubmitting(true)
    setErrorMessage('')

    try {
      const response = await postRequest('/auth/confirm', { activationPin })

      if (response.status === 200) {
        toast.success('Your account is confirmed! Redirecting you...')
        const { redirect } = await response.json()
        setTimeout(() => {
          router.visit(redirect)
        }, 3000)
      } else {
        setErrorMessage('Invalid or expired activation pin: ' + activationPin)
        setIsSubmitting(false)
      }
    } catch (_error) {
      setErrorMessage('Invalid or expired activation pin: ' + activationPin)
      setIsSubmitting(false)
    }
  }

  const handleSubmit = async e => {
    e.preventDefault()
    submitPin()
  }

  return (
    <>
      <Head title="Confirm Account" />

      <div className="flex min-h-screen items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <div className="p-8">
            <h1 className="mb-8 text-center text-2xl font-bold">
              Confirm Your Account
            </h1>

            <p className="mb-8 text-center text-sm text-gray-600">
              Your account has been created! Check your email for a 6-digit pin.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Input
                  id="activation_pin"
                  type="text"
                  label="Activation Pin"
                  value={activationPin}
                  onChange={e => setActivationPin(e.target.value)}
                  required
                  autoComplete="off"
                  autoFocus
                  className="text-center"
                  maxLength={6}
                  placeholder="Enter your 6-digit pin"
                />
                {errorMessage && (
                  <p className="mt-2 text-center text-sm text-amber-600 italic">
                    {errorMessage}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={isSubmitting || activationPin.length !== 6}
              >
                {isSubmitting ? 'Confirming...' : 'Confirm Account'}
              </Button>
            </form>

            <p className="mt-8 text-center text-sm text-gray-600">
              Can&apos;t find your pin?{' '}
              <a
                href="/forgot-password"
                className="text-blue-600 hover:text-blue-800"
              >
                Request a new confirmation email
              </a>
              <br />
              If all else fails, please{' '}
              <a
                href="mailto:support@ssstutterbuddy.com"
                className="text-blue-600 hover:text-blue-800"
              >
                contact support
              </a>
            </p>
          </div>
        </Card>
      </div>
    </>
  )
}
