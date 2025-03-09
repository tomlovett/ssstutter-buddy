import { z } from 'zod'

const StudySchema = z.object({
  title: z.string(),
  short_desc: z.string(),
  long_desc: z.string(),
  study_type: z.string(),
  total_hours: z.coerce.number(),
  sessions: z.coerce.number(),
  duration: z.string(),
  remuneration: z.coerce.number(),
  digital_friendly: z.boolean(),
  digital_only: z.boolean(),
})

export default StudySchema
