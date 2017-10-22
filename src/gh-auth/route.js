let { getSession, handleLogin } = require('../custom')
let { getOauthUrl } = require('./oauth')
let { fetchUser } = require('./fetch')

module.exports = (router, conf) => {
  router.get('/ghauth/invoke', async ctx => {
    let from = ctx.query.from || ctx.get('referer')
    let authUrl = getOauthUrl(from, conf)
    ctx.redirect(authUrl)
  })
  
  router.get('/ghauth/session', async ctx => {
    let sess = await getSession(ctx)
    ctx.body = sess
  })
  
  router.get('/ghauth/callback', async ctx => {
    let { code, target } = ctx.query
    let data = await fetchUser(code, conf)
    await handleLogin(data, ctx)
    ctx.redirect(target)
  })
}
