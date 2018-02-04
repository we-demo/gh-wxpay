let products = []
let paid = []
let user = null

main()
  .catch(err => {
    console.error('err', err)
  })

function main () {
  document.querySelector('.login-btn').addEventListener('click', () => {
    invokeLogin()
  })
  document.querySelector('.logout-btn').addEventListener('click', () => {
    logoutSession()
      .then(() => {
        location.reload()
      })
  })

  return getSession()
    .then(res => {
      user = res.user
      paid = res.paid
      renderUser()
      renderProducts()
    })
}

function renderProducts () {
  document.querySelector('.product-tab ul').innerHTML = products
    .map(v => {
      let title = `${v.body}`
      return `<li>${title}</li>`
    })
}

function renderUser () {
  if (user) {
    document.querySelector('.user-view').classList.add('active')
    document.querySelector('.user-title').textContent = user.login
    document.querySelector('.user-avatar').src = user.avatar_url
  } else {
    document.querySelector('.login-view').classList.add('active')
  }
}

function invokeLogin () {
  location.href = `${conf.host_url}/api/login`
    + `?from=${encodeURIComponent(location.href)}`
}

function logoutSession () {
  return request({
    method: 'POST',
    url: `${conf.host_url}/api/logout`
  })
}

/**
 * @return {Object} { user, paid }
 */
function getSession () {
  return request({
      method: 'GET',
      url: `${conf.host_url}/api/session`
    })
    .then(res => JSON.parse(res))
}
