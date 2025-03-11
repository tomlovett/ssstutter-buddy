import { z } from 'zod'

const StudyInProgressSchema = z.object({
  title: z.string().optional(),
  short_desc: z.string().optional(),
  long_desc: z.string().optional(),
  study_type: z.any().optional(),
  min_age: z.coerce.number().optional(),
  max_age: z.coerce.number().optional(),
  country: z.any().optional(),
  state: z.any().optional(),
  city: z.any().optional(),
  total_hours: z.coerce.number().optional(),
  total_sessions: z.coerce.number().optional(),
  sessions: z.coerce.number().optional(),
  duration: z.string().optional(),
  remuneration: z.coerce.number().optional(),
  digital_friendly: z.coerce.boolean().optional(),
  digital_only: z.coerce.boolean().optional(),
})

export default StudyInProgressSchema
