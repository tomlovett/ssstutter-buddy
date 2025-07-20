import { z } from 'zod'

const ParticipantSchema = z.object({
  codename: z.string().min(1, {
    message: 'Codename must be at least 1 character.',
  }),
  defaultDistance: z.coerce.number(),
  gender: z.string(),
  birthdate: z.coerce.date({
    required_error: 'A date of birth is required.',
  }),
  weekly_digest_opt_out: z.boolean().default(false),
  location: z.object({
    id: z.string().optional(),
    country: z.string(),
    state: z.string(),
    city: z.string(),
  }),
})

export default ParticipantSchema
