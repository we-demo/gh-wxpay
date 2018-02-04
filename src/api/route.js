let errorHandler = require('./error-handler')
let conf = require('../../gx.conf')

module.exports = router => {
  router.use(errorHandler)

  // logger
  router.use(async (ctx, next) => {
    const start = new Date()
    console.log(`${ctx.method} ${ctx.url} - ${start.toJSON()}`)
    try {
      await next()
    } finally {
      const ms = Date.now() - start.getTime()
      console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
    }
  })

  require('../gh-auth/route')(router, conf.gh)
  require('../wxpay/route')(router, conf.wx)
}
