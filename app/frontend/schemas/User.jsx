import { z } from 'zod'

const UserSchema = z.object({
  firstName: z.string().min(2, {
    message: 'First Name must be at least 2 characters.',
  }),
  lastName: z.string().min(1, {
    message: 'Last Name must be at least 1 character.',
  }),
  email: z.string().email().min(3, {
    message: 'Email must be a valid email address.',
  }),
  password: z.optional(
    z.string().min(8, {
      message: 'Password must be at least 8 characters.',
    })
  ),
  passwordConfirmation: z.optional(
    z.string().min(8, {
      message: 'Password Confirmation must be at least 8 characters.',
    })
  ),
})

export default UserSchema
