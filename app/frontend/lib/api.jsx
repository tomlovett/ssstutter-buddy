export const sendRequest = async (path, method, body = {}, options = {}) => {
  if (options.token) {
    options.headers = {
      ...options.headers,
      Authorization: `Bearer ${options.token}`,
    }
  }

  return await fetch(`http://localhost:3001${path}`, {
    method: method,
    headers: Object.assign(
      { 'Content-Type': 'application/json' },
      options.headers
    ),
    body: JSON.stringify(body),
  })
}

export const getRequest = async (path, body = {}, headers = {}, options = {}) =>
  await sendRequest(path, 'GET', body, headers, options)

export const putRequest = async (path, body = {}, headers = {}, options = {}) =>
  await sendRequest(path, 'PUT', body, headers, options)

export const postRequest = async (path, body = {}, headers = {}, options = {}) =>
  await sendRequest(path, 'POST', body, headers, options)
