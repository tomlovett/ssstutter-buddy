import React from 'react'
import { useForm } from 'react-hook-form'

import { putRequest } from '@/lib/api'
import { toast } from 'sonner'
import { Form } from '@/components/ui/form'
import FormInput from '@/components/ui/custom/formInput'
import { Link } from '@inertiajs/react'

const EditUserPage = ({ user }) => {
  const submitData = async formData => {
    try {
      await putRequest(`/u/${user.id}`, formData).then(res => {
        if (res.status === 204) {
          toast.success('Changes saved!')
        } else {
          toast.error('Failed to update profile')
        }
      })
    } catch (_error) {
      toast.error('Failed to update profile')
    }
  }

  const form = useForm({
    defaultValues: {
      firstName: user.first_name || '',
      lastName: user.last_name || '',
      email: user.email || '',
    },
  })

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Edit Profile</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(submitData)} className="space-y-6">
            <FormInput
              key="firstName"
              form={form}
              name="firstName"
              placeholder="First Name"
              label="First Name"
            />

            <FormInput
              key="lastName"
              form={form}
              name="lastName"
              placeholder="Last Name"
              label="Last Name"
            />

            <FormInput
              key="email"
              form={form}
              name="email"
              placeholder="Email"
              type="email"
              disabled
              label="Email"
            />

            <div className="text-sm text-gray-600">
              <div className="flex justify-center">
                <Link
                  href="/change-password"
                  className="text-blue-500 hover:text-blue-600"
                >
                  To change your password, click this link
                </Link>
              </div>
            </div>

            <div className="flex gap-4 mt-8 w-full">
              <Link
                href={`/u/${user.id}/edit`}
                className="flex-1 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold transition-colors text-center"
              >
                Cancel
              </Link>
              <button
                type="submit"
                className="flex-1 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold transition-colors"
              >
                {user.id ? 'Save Changes' : 'Next'}
              </button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  )
}

export default EditUserPage
