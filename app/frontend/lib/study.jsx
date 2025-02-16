export const shortAddr = ({ fully_digital, city, state }) =>
  fully_digital ? 'Online' : `${city}, ${state}`

export const displayRemuneration = ({ remuneration }) =>
  remuneration == '0' ? 'Gratis' : `$${remuneration}`

export const timeline = ({ total_hours, total_sessions, duration }) =>
  total_sessions == 1
    ? `${total_hours} ${total_hours == 1 ? 'hour' : 'hours'} in one session`
    : `${total_hours} ${total_hours == 1 ? 'hour' : 'total hours'} in ${total_sessions} sessions \
	over the course of ${duration}`

export const ageRange = ({ min_age, max_age }) => {
  if (!min_age && !max_age) {
    return 'All ages'
  } else if (min_age) {
    return max_age ? `${min_age}-${max_age}` : `${min_age} and up`
  } else {
    return `${max_age} and under`
  }
}
