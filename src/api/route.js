let errorHandler = require('./error-handler')
let conf = require('../../gx.conf')

module.exports = router => {
  router.use(errorHandler)

  require('./cors')(router)
  require('../gh-auth/route')(router, conf.gh)
  require('../wxpay/route')(router, conf.wx)
}
