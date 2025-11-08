import { z } from 'zod'

const StudyInProgressSchema = z.object({
  id: z.string().optional(),
  title: z.string().optional(),
  short_desc: z.string().optional(),
  long_desc: z.string().optional(),
  irb_number: z.string().optional(),
  methodologies: z.any().optional(),
  location_type: z.string().optional(),
  location: z
    .object({
      id: z.string().optional(),
      country: z.string().optional(),
      state: z.string().optional(),
      city: z.string().optional(),
    })
    .optional(),
  min_age: z.coerce.number().optional(),
  max_age: z.coerce.number().optional(),
  total_hours: z.coerce.number().optional(),
  total_sessions: z.coerce.number().optional(),
  sessions: z.coerce.number().optional(),
  duration: z.string().optional(),
  remuneration: z.coerce.number().optional(),
})

export default StudyInProgressSchema
