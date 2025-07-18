import { camelToReadable, capitalize } from '@/lib/utils'

export const validateStudy = study => {
  const errors = []

  const requiredFields = [
    'title',
    'short_desc',
    'long_desc',
    'remuneration',
    'total_hours',
    'methodologies',
  ]

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

  const { digital_only, digital_friendly, city, state, country } = study

  if (digital_friendly) {
    if (!city || !state || !country) {
      errors.push(
        'Physical location must be set if the study is digital friendly'
      )
    }
  } else if (!digital_only) {
    if (!city || !state || !country) {
      errors.push(
        'Physical location must be set if the study is not digital only or digital friendly'
      )
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
  }
}

const calcNullCityState = (city, state) => {
  if (typeof city == 'string') {
    return !city && !state
  }

  return !city?.name && !state?.name
}

export const displayLocationShort = ({
  digital_only,
  digital_friendly,
  city,
  state,
}) => {
  const nullCityState = calcNullCityState(city, state)
  if (digital_only || (digital_friendly && nullCityState)) {
    return 'Online'
  }

  if (!digital_only && !digital_friendly && nullCityState) {
    return 'Not set'
  }

  const cityState =
    typeof city == 'string'
      ? `${city}, ${state}`
      : `${city.name}, ${state.name}`
  return digital_friendly ? `Online / ${cityState}` : cityState
}

export const displayRemuneration = ({ remuneration }) =>
  !remuneration || remuneration == '0' ? 'Gratis' : `$${remuneration}`

export const displayMethodologies = ({ methodologies }) =>
  methodologies
    .split(', ')
    .map(m => capitalize(m))
    .join(', ')

export const displayHours = total_hours => {
  if (total_hours == 1) {
    return '1 hour'
  }

  return total_hours < 1
    ? `${Number.parseInt(total_hours * 60)} minutes`
    : `${total_hours} hours`
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
  if (!study.published_at) {
    return 'draft'
  } else if (study.closed_at) {
    return 'closed'
  } else if (study.paused_at) {
    return 'paused'
  } else {
    return 'active'
  }
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
