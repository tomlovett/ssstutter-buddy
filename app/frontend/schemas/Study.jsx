import { z } from 'zod'

const StudySchema = z.object({
  title: z.string(),
  short_desc: z.string(),
  long_desc: z.string(),
  methodologies: z.any(),
  min_age: z.coerce.number().optional(),
  max_age: z.coerce.number().optional(),
  country: z.string(),
  state: z.string(),
  city: z.string(),
  total_hours: z.coerce.number(),
  total_sessions: z.coerce.number(),
  sessions: z.coerce.number().optional(),
  duration: z.string(),
  remuneration: z.coerce.number(),
  digital_friendly: z.boolean(),
  digital_only: z.boolean(),
})

export default StudySchema
