let { getSession, handleLogin } = require('../custom')
let { getOauthUrl } = require('./oauth')
let { fetchUser } = require('./fetch')

module.exports = (router, conf) => {
  // 获取session
  router.get('/session', async ctx => {
    let sess = await getSession(ctx)
    ctx.body = sess
  })

  // 登录成功 写入session
  router.get('/oauth/callback', async ctx => {
    let { code, target } = ctx.query
    let data = await fetchUser(code, conf)
    await handleLogin(data, ctx)
    ctx.redirect(target)
  })

  // 发起oauth登录
  router.get('/oauth/invoke', async ctx => {
    let from = ctx.query.from || ctx.get('referer')
    let authUrl = getOauthUrl(from, conf)
    ctx.redirect(authUrl)
  })
}
