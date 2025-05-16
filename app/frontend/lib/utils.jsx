import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export const camelToReadable = str =>
  capitalize(str.replace(/([A-Z])/g, ' $1').replace('_', ' '))

export const cn = (...inputs) => {
  return twMerge(clsx(inputs))
}

export const capitalize = str =>
  str && str[0].toLocaleUpperCase() + str.substring(1)

// Tue Oct 17
export const formatDate = dateObj =>
  new Date(dateObj).toDateString().slice(0, -4)

//  Oct 17 , 1995
export const formatBirthday = dateObj => {
  const date = new Date(dateObj)

  return date.toDateString().slice(4, -5) + ', ' + date.getUTCFullYear()
}

export const formatLocation = (country, state, city) => {
  if (!country) {
    return 'No Location Selected'
  }

  return `${city.name || city}, ${state.name || state}, ${country.name || country}`
}
