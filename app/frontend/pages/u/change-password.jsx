import React from 'react'
import { useForm } from 'react-hook-form'
import { Head } from '@inertiajs/react'
import { putRequest } from '@/lib/api'
import { Form } from '@/components/ui/form'
import FormInput from '@/components/ui/custom/formInput'
import { Link } from '@inertiajs/react'

const ChangePasswordPage = ({ user }) => {
  const submitData = formData => putRequest('/change-password', formData)

  const form = useForm({
    defaultValues: {
      password: '',
      password_confirmation: '',
    },
  })

  return (
    <>
      <Head title="Change Password" />
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-md">
          <h1 className="text-2xl font-bold mb-6 text-center">Change Password</h1>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(submitData)} className="space-y-6">
              <FormInput
                key="password"
                form={form}
                name="password"
                type="password"
                placeholder="New Password"
                label="New Password"
              />

              <FormInput
                key="password_confirmation"
                form={form}
                name="password_confirmation"
                type="password"
                placeholder="Confirm New Password"
                label="Confirm New Password"
              />

              <div className="flex gap-4 mt-8 w-full">
                <Link
                  href={`/u/${user.id}/edit`}
                  className="flex-1 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-900 rounded-lg font-semibold transition-colors text-center"
                >
                  Cancel
                </Link>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold transition-colors"
                >
                  Change Password
                </button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </>
  )
}

export default ChangePasswordPage
