import { z } from 'zod'
import { INVITATION_STATUSES } from '@/lib/invitations'

const InvitationSchema = z.object({
  id: z.string().optional(),
  study_id: z.coerce.number(),
  participant_id: z.coerce.number(),
  status: z.enum(INVITATION_STATUSES),
  status_explanation: z.string().optional(),
  created_at: z.string().optional(),
  updated_at: z.string().optional(),
})

export default InvitationSchema
