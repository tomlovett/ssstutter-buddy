import React from 'react'
import UserForm from '@/components/User/UserForm'
import { putRequest } from '@/lib/api'
import { toast } from 'sonner'

const EditUserPage = ({ user, token }) => {
  const submitData = async formData => {
    try {
      await putRequest(`/u/${user.id}`, formData, { token })
      toast.success('Changes saved!')
    } catch (_error) {
      toast.error('Failed to update profile')
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Edit Profile</h1>
        <UserForm user={user} token={token} onSave={submitData} />
      </div>
    </div>
  )
}

export default EditUserPage
