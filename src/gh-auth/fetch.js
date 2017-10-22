let FormData = require('form-data')
let fetch = require('node-fetch')

exports.fetchUser = fetchUser

async function fetchUser (code, conf) {
  let form = new FormData()
  form.append('code', code)
  form.append('client_id', conf.client_id)
  form.append('client_secret', conf.client_secret)

  let url = 'https://github.com/login/oauth/access_token'
  let res = await fetch(url, {
    headers: {
      'Accept': 'application/json'
    },
    method: 'POST',
    body: form
  })
  res = await res.json()

  if (res.error) {
    let err = new Error(res.error_description || res.error)
    err.status = 400
    throw err
  }

  // https://developer.github.com/v3/#rate-limiting
  // 带上clientId clientSecret 提高ratelimit
  url = `https://api.github.com/user?client_id=${conf.client_id}`
    + `&client_secret=${conf.client_secret}`
  res = await fetch(url, {
    headers: {
      'Authorization': `token ${res.access_token}`,
      'Accept': 'application/json'
    }
  })
  res = await res.json()
  return res
}
