let conf = require('../config')
let session = require('koa-session')
let Router = require('koa-router')
let Koa = require('koa')
let app = new Koa()
let apiRouter = new Router({ prefix: '/api' })
let port = process.env.PORT || 8333

// https://github.com/koajs/session#example
app.keys = conf.app.keys
app.use(session(app))

require('./api/route')(apiRouter)

app.use(apiRouter.routes())

app.listen(port, err => {
  if (err) throw err
  console.log(`Listening at port ${port}`)
})
