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
  codename: z.string().min(1, {
    message: 'Codename must be at least 1 character.',
  }),
  defaultDistance: z.coerce.number(),
  gender: z.string(),
  birthdate: z.coerce.date({
    required_error: 'A date of birth is required.',
  }),
})

export default UserSchema
