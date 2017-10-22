module.exports = async (ctx, next) => {
  try {
    await next()
  } catch (err) {
    console.error('api errorHandler', err)
    let status = err.status || 500
    let res = { status }

    if (status >= 500) {
      res.error = 'Internal Server Error'
    } else {
      res.error = err.message

      if (process.env.NODE_ENV === 'development') {
        res.stack = err.stack
      }
    }
    ctx.body = res
    ctx.status = status
  }
}
