import { server } from '../mocks/server'
import { http, HttpResponse } from 'msw'

/**
 * Helper to create a mock API response
 * @param {string} method - HTTP method
 * @param {string} path - API path (without query params)
 * @param {object} response - Response data
 * @param {number} status - HTTP status code
 */
export const mockApiResponse = (method, path, response, status = 200) => {
  server.use(
    http[method.toLowerCase()](`http://localhost${path}`, () => {
      return HttpResponse.json(response, { status })
    })
  )
}

/**
 * Helper to create a mock API error response
 * @param {string} method - HTTP method
 * @param {string} path - API path (without query params)
 * @param {string} error - Error message
 * @param {number} status - HTTP status code
 */
export const mockApiError = (method, path, error = 'Server error', status = 500) => {
  server.use(
    http[method.toLowerCase()](`http://localhost${path}`, () => {
      return HttpResponse.json({ error }, { status })
    })
  )
}

/**
 * Helper to wait for API calls to complete
 * @param {number} timeout - Timeout in milliseconds
 */
export const waitForApiCall = (timeout = 1000) => {
  return new Promise(resolve => setTimeout(resolve, timeout))
}

/**
 * Helper to create a mock location API response
 * @param {object} params - Location parameters
 */
export const mockLocationApi = (params = {}) => {
  const { country, state, city } = params

  if (country && !state && !city) {
    return mockApiResponse('GET', '/api/location', {
      country: { name: 'United States', symbol: country },
      state: {},
      states_list: [
        { name: 'Maryland', symbol: 'MD' },
        { name: 'California', symbol: 'CA' },
      ],
      city: {},
      cities_list: [],
    })
  }

  if (country && state && !city) {
    return mockApiResponse('GET', '/api/location', {
      country: { name: 'United States', symbol: country },
      state: { name: 'Maryland', symbol: state },
      cities_list: [
        { name: 'Baltimore', symbol: 'BAL' },
        { name: 'Annapolis', symbol: 'ANA' },
      ],
      city: {},
    })
  }

  if (country && state && city) {
    return mockApiResponse('GET', '/api/location', {
      country: { name: 'United States', symbol: country },
      state: { name: 'Maryland', symbol: state },
      city: { name: 'Baltimore', symbol: city },
    })
  }
}

/**
 * Helper to create a mock connections API response
 * @param {Array} connections - Array of connection objects
 */
export const mockConnectionsApi = (connections = []) => {
  return mockApiResponse('GET', '/p/connections', { connections })
}

/**
 * Helper to create a mock studies API response
 * @param {Array} studies - Array of study objects
 */
export const mockStudiesApi = (studies = []) => {
  return mockApiResponse('GET', '/r/studies', { studies })
}

/**
 * Helper to create a mock invitations API response
 * @param {object} invitation - Invitation object
 */
export const mockInvitationsApi = (invitation = {}) => {
  return mockApiResponse('POST', '/p/invitations', invitation)
}

/**
 * Helper to create a mock participants API response
 * @param {object} participant - Participant object
 */
export const mockParticipantsApi = (participant = {}) => {
  return mockApiResponse('PUT', '/p/participants/1', participant)
}

/**
 * Helper to create a mock users API response
 * @param {object} user - User object
 */
export const mockUsersApi = (user = {}) => {
  return mockApiResponse('PUT', '/u/1', user)
}

/**
 * Helper to create a mock authentication API response
 * @param {string} endpoint - Authentication endpoint
 * @param {object} response - Response data
 */
export const mockAuthApi = (endpoint, response = {}) => {
  return mockApiResponse('POST', endpoint, response)
}

/**
 * Helper to create a mock researcher studies API response
 * @param {string} method - HTTP method
 * @param {string} endpoint - API endpoint
 * @param {object} response - Response data
 */
export const mockResearcherStudiesApi = (method, endpoint, response = {}) => {
  return mockApiResponse(method, endpoint, response)
}

/**
 * Helper to create a mock connections API response for researchers
 * @param {object} connection - Connection object
 */
export const mockResearcherConnectionsApi = (connection = {}) => {
  return mockApiResponse('PUT', '/r/connections/1', connection)
}
