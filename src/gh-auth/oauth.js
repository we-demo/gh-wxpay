exports.getOauthUrl = getOauthUrl

function getOauthUrl (from, conf) {
  let url = 'https://github.com/login/oauth/authorize'
  let params = {
    client_id: conf.client_id,
    redirect_uri: `?target=${encodeURIComponent(from)}`
  }
  url += getQueryStr(params)
  return url
}

function getQueryStr (params) {
  let str = ''
  Object.keys(params).forEach((k, i) => {
    let p = i ? '&' : '?'
    str += `${p}${k}=${encodeURIComponent(params[k])}`
  })
  return str
}
