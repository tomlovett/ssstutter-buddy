export const isUnderEighteen = dateObj => {
  const birthdate = new Date(dateObj)

  if (birthdate.toString() == 'Invalid Date') {
    return false
  }

  const today = new Date()
  const eighteenYearsAgo = new Date()
  eighteenYearsAgo.setFullYear(today.getUTCFullYear() - 18)

  return birthdate > eighteenYearsAgo
}
