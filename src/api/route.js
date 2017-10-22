let errorHandler = require('./error-handler')
let conf = require('../../config')

module.exports = router => {
  router.use(errorHandler)
  
  require('../gh-auth/route')(router, conf.gh)
  require('../wxpay/route')(router, conf.wx)
}
