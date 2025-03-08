import { z } from 'zod'

const ResearcherSchema = z.object({
  titles: z.string().min(1),
  institution: z.string(),
  research_interests: z.string().min(1),
  university_profile_url: z.string().min(1),
  bio: z.string().min(1),
})

export default ResearcherSchema
