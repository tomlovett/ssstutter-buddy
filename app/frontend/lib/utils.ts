import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Tue Oct 17
export const formatDate = dateObj =>
  new Date(dateObj).toDateString().slice(0, -4)

//  Oct 17 , 1995
export const formatBirthday = dateObj => {
  const date = new Date(dateObj)

  return date.toDateString().slice(4, -5) + ', ' + date.getUTCFullYear()
}

export const formatLocation = (country, state, city) =>
  `${city}, ${state.name || state}, ${country.name || country}`
