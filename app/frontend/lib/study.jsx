export const displayLocation = ({
  digital_only,
  digital_friendly,
  city,
  state,
}) => {
  if (digital_only) {
    return 'Online'
  }

  const cityState =
    typeof city == 'string'
      ? `${city}, ${state}`
      : `${city.name}, ${state.name}`
  return digital_friendly ? `Online / ${cityState}` : cityState
}

export const displayRemuneration = ({ remuneration }) =>
  remuneration == '0' ? 'Gratis' : `$${remuneration}`

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
