import { useEffect, useState } from 'react'
import { useForm, router } from '@inertiajs/react'
import { Head } from '@inertiajs/react'
import { putRequest } from '@/lib/api'
import { toast } from 'sonner'

export default function ResetPassword({ user, redirect }) {
  const [errors, setErrors] = useState({})
  const { data, setData, processing } = useForm({
    password: '',
    password_confirmation: '',
    activation_pin: user.activation_pin,
  })

  useEffect(() => {
    if (redirect) {
      router.visit(redirect)
    }
  }, [redirect])

  const handleSubmit = e => {
    e.preventDefault()

    if (data.password !== data.password_confirmation) {
      setErrors({ password_confirmation: 'Passwords do not match' })
      return
    }

    if (data.password.length < 8) {
      setErrors({ password: 'Password must be at least 8 characters' })
      return
    }

    putRequest(`/user/${user.id}`, data)
      .then(res => {
        if (res.status === 200) {
          toast.success('Password saved! successfully, logging you in...')

          setTimeout(() => {
            router.visit(redirect)
          }, 3000)
        } else {
          showError()
        }
      })
      .catch(() => showError())
  }

  const showError = () =>
    toast.error('There was an error resetting your password. Please try again.')

  return (
    <>
      <Head title="Reset Password" />
      <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Change your password
          </h2>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm border border-gray-200 shadow-md">
              <div>
                <label htmlFor="password" className="sr-only">
                  New Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={data.password}
                  onChange={e => setData('password', e.target.value)}
                  className="appearance-none rounded-t-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="New Password"
                />
                {errors.password && (
                  <p className="mt-2 text-sm text-red-600">{errors.password}</p>
                )}
              </div>
              <div>
                <label htmlFor="password_confirmation" className="sr-only">
                  Confirm New Password
                </label>
                <input
                  id="password_confirmation"
                  name="password_confirmation"
                  type="password"
                  required
                  value={data.password_confirmation}
                  onChange={e =>
                    setData('password_confirmation', e.target.value)
                  }
                  className="appearance-none rounded-b-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Confirm Password"
                />
                {errors.password_confirmation && (
                  <p className="mt-2 text-sm text-red-600">
                    {errors.password_confirmation}
                  </p>
                )}
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={processing}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
              >
                Change Password
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
