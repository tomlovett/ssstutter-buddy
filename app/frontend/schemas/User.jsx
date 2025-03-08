import { z } from 'zod'

const UserSchema = z.object({
  firstName: z.string().min(2, {
    message: 'First Name must be at least 2 characters.',
  }),
  lastName: z.string().min(1, {
    message: 'Last Name must be at least 1 character.',
  }),
  email: z.string().min(1, {
    message: 'Email must be at least 1 character.',
  }),
})

export default UserSchema
