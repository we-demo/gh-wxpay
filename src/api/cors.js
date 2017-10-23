// [0514] koa-router+koa-cors options方法不灵解决
// https://blog.fritx.me/?weekly/170528

module.exports = router => {
  // api cors
  router.use(async (ctx, next) => {
    ctx.set('Access-Control-Allow-Credentials', 'true')
    ctx.set('Access-Control-Allow-Origin', ctx.get('Origin'))
    await next()
  })

  // api options method
  router.options('*', async (ctx, next) => {
    ctx.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
    ctx.set('Access-Control-Allow-Origin', ctx.get('Origin'))
    ctx.status = 204
    await next()
  })
}
