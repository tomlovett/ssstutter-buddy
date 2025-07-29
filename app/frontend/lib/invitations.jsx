// Invitation statuses
const INVITED = 'invited'
const ACCEPTED = 'accepted'
const DECLINED = 'declined'
const INTERESTED = 'interested'
const NOT_INTERESTED = 'not interested'

export const INVITATION_STATUSES = [
  INVITED,
  ACCEPTED,
  DECLINED,
  INTERESTED,
  NOT_INTERESTED,
]

export const DECLINED_INVITATION_STATUSES = [NOT_INTERESTED, DECLINED]

export const hasMadeDecision = ({ status }) => status !== INVITED

export { INVITED, ACCEPTED, DECLINED, INTERESTED, NOT_INTERESTED }
