// Invitation statuses
const INVITED = 'invited'
const ACCEPTED = 'accepted'
const DECLINED = 'declined'
const INTERESTED = 'interested'
const NOT_INTERESTED = 'not interested'

// Study statuses
const CONNECTED = 'connected'
const STUDY_BEGAN = 'study began'
const STUDY_COMPLETED = 'study completed'
const ON_HOLD = 'on hold'
const DROPPED_OUT = 'dropped out'
const FOLLOWUP_COMPLETED = 'followup completed'

export const CONNECTION_STATUSES = [
  DECLINED,
  STUDY_COMPLETED,
  ON_HOLD,
  DROPPED_OUT,
  FOLLOWUP_COMPLETED,
  INVITED,
  ACCEPTED,
  INTERESTED,
  STUDY_BEGAN,
]

export const MANAGE_STATUSES = [
  CONNECTED,
  STUDY_BEGAN,
  STUDY_COMPLETED,
  ON_HOLD,
  DROPPED_OUT,
  FOLLOWUP_COMPLETED,
]

export const DECLINED_STATUSES = [NOT_INTERESTED, DECLINED]

export const isConnected = connection =>
  [ACCEPTED, INTERESTED].includes(connection.invitation_status)

// const STATUSES_COMPLETED = [
//   INVITATION_DECLINED,
//   NOT_INTERESTED,
//   STUDY_COMPLETED,
//   DROPPED_OUT,
//   FOLLOWUP_COMPLETED,
// ]
// const STATUSES_IN_PROGRESS = [
//   INVITED,
//   INVITATION_ACCEPTED,
//   INTERESTED,
//   STUDY_BEGAN,
// ]
