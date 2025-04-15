export const sendRequest = async (path, method, body = {}, headers = {}) =>
  await fetch(`http://localhost:3001${path}`, {
    method: method,
    headers: Object.assign({ 'Content-Type': 'application/json' }, headers),
    body: JSON.stringify(body),
    redirect: 'follow',
  }).then(response => {
    if (response.redirected) {
      window.location.href = response.url
    }
    return response
  })

export const getRequest = async (path, body = {}, headers = {}) =>
  await sendRequest(path, 'GET', body, headers)

export const putRequest = async (path, body = {}, headers = {}) =>
  await sendRequest(path, 'PUT', body, headers)

export const postRequest = async (path, body = {}, headers = {}) =>
  await sendRequest(path, 'POST', body, headers)
