main()

async function main () {
  document.querySelector('.login-btn').addEventListener(() => {
    invokeLogin()
  })

  let { user, paid } = await getSession()

}


function invokeLogin () {
  location.href = `${conf.host_url}/ghauth/invoke`
    + `?from=${encodeURIComponent(location.href)}`
}

/**
 * @return {Object} { user, paid }
 */
async function getsession () {
  let res = await request('https://example.com/gx/api/ghauth/session')
  return json.parse(res)
}
