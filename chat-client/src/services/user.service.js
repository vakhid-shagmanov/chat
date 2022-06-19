import authAccessHeader from '../helpers/auth-headers.js'

export const userService = {
  registration,
  login,
  logout,
  getAll
}

async function registration (username, password) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  }

  return await fetch('/auth/registration', requestOptions)
    .then(handleResponse)
    .then(user => {
      if (user.access && user.refresh) {
        localStorage.setItem('user', JSON.stringify(user))
      }
      return user
    })
}

async function login (username, password) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  }

  return await fetch('/auth/login', requestOptions)
    .then(handleResponse)
    .then(user => {
      if (user.access && user.refresh) {
        localStorage.setItem('user', JSON.stringify(user))
      }
      return user
    })
}

function logout () {
  localStorage.removeItem('user')
  fetch('/auth/logout')
}

async function getAll () {
  const requestOptions = {
    method: 'GET',
    headers: authAccessHeader()
  }

  return await fetch('/users', requestOptions).then(handleResponse)
}

async function handleResponse (response) {
  const responseJson = await response.json()

  if (!response.ok) {
    if (responseJson.status === 401) {
      logout()
      location.reload(true)
    }

    const error = (responseJson && responseJson.message) || response.statusText
    return Promise.reject(error)
  }
  return responseJson
}
