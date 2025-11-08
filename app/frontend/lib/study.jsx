import { camelToReadable, capitalize } from '@/lib/utils'

export const LOCATION_TYPES = {
  DIGITAL: 'digital',
  IN_PERSON: 'in_person',
  HYBRID: 'hybrid',
}

export const validateStudy = study => {
  const errors = []

  const requiredFields = ['title', 'short_desc', 'long_desc', 'remuneration', 'total_hours', 'methodologies']

  requiredFields.forEach(field => {
    if (study[field] === null || study[field] === undefined) {
      errors.push(`${camelToReadable(field)} is required`)
    }
  })

  if (!study.total_sessions) {
    errors.push('Number of sessions is required')
  } else if (study.total_sessions > 1 && !study.duration) {
    errors.push('Duration is required if study requires multiple sessions')
  }

  if (study.location_type !== LOCATION_TYPES.DIGITAL && (!study.location || !study.location?.city)) {
    errors.push('A location must be set if the study can be completed in person')
  }

  return {
    isValid: errors.length === 0,
    errors,
  }
}

export const displayLocationShort = ({ location_type, location }) => {
  if (location_type === LOCATION_TYPES.DIGITAL) {
    return 'Online'
  }

  if (!location || !location.city || !location.state) {
    return 'To be assigned'
  }

  return location_type === LOCATION_TYPES.HYBRID
    ? `Online / ${location.city}, ${location.state}`
    : `${location.city}, ${location.state}`
}

export const displayRemuneration = ({ remuneration }) =>
  !remuneration || remuneration == '0' ? 'Gratis' : `$${remuneration}`

export const displayMethodologies = ({ methodologies }) =>
  methodologies
    .split(',')
    .map(m => capitalize(m))
    .join(', ')

export const displayHours = total_hours => {
  if (total_hours == 1) {
    return '1 hour'
  }

  return total_hours < 1 ? `${Number.parseInt(total_hours * 60)} minutes` : `${total_hours} hours`
}

export const timeline = ({ total_hours, total_sessions, duration }) =>
  total_sessions == 1
    ? `${displayHours(total_hours)} in one session`
    : `${displayHours(total_hours)} in ${total_sessions} sessions over the course of ${duration}`

export const ageRange = ({ min_age, max_age }) => {
  if (!min_age && !max_age) {
    return 'All ages'
  } else if (min_age) {
    return max_age ? `${min_age}-${max_age}` : `${min_age} and up`
  } else {
    return `${max_age} and under`
  }
}

export const status = study => {
  if (study.paused_at) {
    return 'paused'
  } else if (!study.published_at) {
    return 'draft'
  } else if (study.closed_at) {
    return 'closed'
  }
  return 'active'
}

export const statusText = study => {
  switch (status(study)) {
    case 'draft':
      return 'Study is in private draft mode.'
    case 'active':
      return 'Study is actively accepting participants.'
    case 'closed':
      return 'Study has been closed.'
    case 'paused':
      return 'Study is paused.'
  }
}
