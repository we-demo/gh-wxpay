let errorHandler = require('./error-handler')
let conf = require('../../gx.conf')

module.exports = router => {
  router.use(errorHandler)

  // logger
  router.use(async (ctx, next) => {
    const start = Date.now()
    await next()
    const ms = Date.now() - start
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
  })

  require('./cors')(router)
  require('../gh-auth/route')(router, conf.gh)
  require('../wxpay/route')(router, conf.wx)
}
