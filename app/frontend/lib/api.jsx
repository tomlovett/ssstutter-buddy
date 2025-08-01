import { toast } from 'sonner'

export const sendRequest = async (path, method, body = {}, headers = {}) => {
  const options = {
    method,
    headers: Object.assign({ 'Content-Type': 'application/json' }, headers),
    body: JSON.stringify(formatOutgoingBody(body)),
    redirect: 'follow',
  }

  if (method === 'GET' || method === 'DELETE') {
    // Convert body object to query parameters for GET/DELETE requests
    const queryParams = new URLSearchParams()
    Object.entries(body).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        queryParams.append(key, value)
      }
    })

    if (queryParams.toString()) {
      path = `${path}?${queryParams.toString()}`
    }

    delete options.body
  }

  return await fetch(`${window.location.origin}${path}`, options).then(
    response => {
      if (response.ok) {
        toast.success('Success!', { duration: 7000 })
      } else {
        toast.error(
          'Uh oh, there was an error! Be careful, your changes were not saved.',
          { duration: 10000 }
        )
      }

      if (response.redirected) {
        window.location.href = response.url
      }
      return response
    }
  )
}

export const getRequest = async (path, body = {}, headers = {}) =>
  await sendRequest(path, 'GET', body, headers)

export const putRequest = async (path, body = {}, headers = {}) =>
  await sendRequest(path, 'PUT', body, headers)

export const postRequest = async (path, body = {}, headers = {}) =>
  await sendRequest(path, 'POST', body, headers)

// convert camelCase keys to snake_case keys
const formatOutgoingBody = body =>
  Object.fromEntries(
    Object.entries(body).map(([key, value]) => [
      key.replace(/([A-Z])/g, '_$1').toLowerCase(),
      value,
    ])
  )
