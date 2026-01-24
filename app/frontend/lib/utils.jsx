import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { marked } from 'marked'
import DOMPurify from 'dompurify'

export const camelToReadable = str => capitalize(str.replace(/([A-Z])/g, ' $1').replace('_', ' '))

export const cn = (...inputs) => {
  return twMerge(clsx(inputs))
}

export const capitalize = str => str && str[0].toLocaleUpperCase() + str.substring(1)

// Tue Oct 17
export const formatDate = dateObj => {
  const date = new Date(dateObj)
  const month = date.toLocaleString('default', { month: 'short' })
  const day = date.getDate()
  return `${month} ${day}`
}

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

// Helper function to fix URLs in HTML by adding protocol to links without one
// Prevents links like "google.com" from becoming "https;//ssstutterbuddy.com/google.com"
const fixMarkdownLinks = html => {
  // Use regex to find and fix href attributes that don't have a protocol
  return html.replace(/<a\s+([^>]*\s+)?href=["']([^"']+)["']([^>]*)>/gi, (match, before, href, after) => {
    // If href doesn't start with a protocol, /, or #, add https://
    if (href && !/^(https?|mailto|ftp|#|\/)/i.test(href)) {
      const beforeAttr = before ? before.trim() + ' ' : ''
      const afterAttr = after || ''
      return `<a ${beforeAttr}href="https://${href}"${afterAttr}>`
    }
    return match
  })
}

// Parse markdown to sanitized HTML with fixed links
export const parseMarkdown = markdown => {
  if (!markdown) return ''
  const html = marked(markdown)
  const fixedHtml = fixMarkdownLinks(html)
  return DOMPurify.sanitize(fixedHtml)
}
