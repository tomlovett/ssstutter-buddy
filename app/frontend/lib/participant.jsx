export const isUnderEighteen = dateObj => {
  const today = new Date()
  const eighteenYearsAgo = new Date()
  eighteenYearsAgo.setFullYear(today.getUTCFullYear() - 18)

  return dateObj > eighteenYearsAgo
}
