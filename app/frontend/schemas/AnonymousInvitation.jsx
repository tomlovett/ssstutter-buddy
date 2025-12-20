import { z } from 'zod'
import { INVITATION_STATUSES } from '@/lib/invitations'

const AnonymousInvitationSchema = z.object({
  study_id: z.coerce.number(),
  status: z.enum(INVITATION_STATUSES),
  status_explanation: z.string().optional(),
  anonymous: z.boolean(),
  first_name: z.string().min(1, {
    message: 'First Name must be at least 1 character.',
  }),
  last_name: z.string().min(1, {
    message: 'Last Name must be at least 1 character.',
  }),
  email: z.string().email().optional(),
  send_new_studies_emails: z.boolean().optional(),
})

export default AnonymousInvitationSchema
