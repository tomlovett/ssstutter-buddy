import React from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { postRequest } from '@/lib/api'
import { Form } from '@/components/ui/form'
import FormInput from '@/components/ui/custom/formInput'

const InvitePage = ({ user }) => {
  const submitData = async formData => {
    await postRequest('/invite', formData).then(res => {
      if (res.ok) {
        toast.success('Invitation sent successfully!')
        form.reset()
      }
    })
  }

  const form = useForm({
    defaultValues: {
      email: '',
      invited_by_id: user.id,
    },
  })

  return (
    <div className="min-h-screen flex flex-col items-center p-4 w-full mx-auto mt-32">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Invite a {user.researcher ? 'Colleague' : 'Friend'}
      </h1>
      <p className="text-gray-600 mb-8 text-center w-1/3 mx-auto">
        Help us advance the pace of stuttering research!
        <br />
        <br />
        Enter a {user.researcher ? 'colleague' : 'friend'}'s email and we will
        send them an invitation on your behalf.
        <br />
        <br />
        {user.participant &&
          'Invite as many people as you think would enjoy the platform. '}
        We will only send one invitation per email address.
      </p>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(submitData)}
          className="space-y-6 w-1/4 mx-auto"
        >
          <FormInput
            key="email"
            form={form}
            name="email"
            type="email"
            placeholder="Email address"
          />

          <div className="flex gap-4 mt-8 w-1/2 mx-auto">
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold transition-colors"
            >
              Send
            </button>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default InvitePage
