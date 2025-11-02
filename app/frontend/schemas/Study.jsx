import { z } from 'zod'

const StudySchema = z.object({
  title: z.string(),
  short_desc: z.string(),
  long_desc: z.string(),
  methodologies: z.any(),
  min_age: z.coerce.number().optional(),
  max_age: z.coerce.number().optional(),
  total_hours: z.coerce.number(),
  total_sessions: z.coerce.number(),
  sessions: z.coerce.number().optional(),
  duration: z.string(),
  remuneration: z.coerce.number(),
  location_type: z.string(),
  flyer: z.any().optional(),
  location: z.object({
    country: z.string(),
    state: z.string(),
    city: z.string(),
  }),
})

export default StudySchema
