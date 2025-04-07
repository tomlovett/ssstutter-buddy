import { router, Link } from '@inertiajs/react'
import { toast } from 'sonner'

import UserForm from '@/components/User/UserForm'
import { postRequest } from '@/lib/api'

const sendCreateRequest = async userValues => {
  const body = Object.assign({}, userValues)
  console.log(body)

  postRequest('/signup', body)
    .then(res => res.json())
    .then(user => {
      if (user.id) {
        toast('Success! Redirecting you in a second...')
        setTimeout(() => {
          router.visit(`/signup/${user.id}/role`)
        }, 2500)
      } else {
        console.log(user)
        // dsplay errors on page, because toast is too short
        // but realistically, the backend does not currently validate this
        toast(JSON.stringify(user))
      }
    })
}

const Signup = ({ user }) => (
  <div className="flex min-h-screen items-center justify-center">
    <div className="w-full max-w-md space-y-8 rounded-lg bg-white p-8 shadow-lg">
      <div>
        <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900">
          Create your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link
            href="/login"
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            Sign in
          </Link>
        </p>
      </div>
      <UserForm user={user} onSave={sendCreateRequest} />
    </div>
  </div>
)

export default Signup
