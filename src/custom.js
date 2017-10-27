let _ = require('lodash')
let db = require('./db')

exports.handleOrder = handleOrder
exports.handlePay = handlePay
exports.getSession = getSession
exports.handleLogin = handleLogin

// todo: login/order的时候 保存users
// todo: ratelimit ip安全限制等
async function handleOrder (ctx, conf) {
  let { user_id, product_id } = ctx.query
  if (!user_id || !product_id) {
    return ctx.throw(400, '缺少参数')
  }

  let product = db.get('products').find({ id: product_id }).value()
  if (!product) {
    return ctx.throw(400, '商品不存在')
  }

  // todo: 根据product_id 下单
  let date_str = new Date().toJSON().replace(/[\-:]|T.*/g, '') // 注 世界标准时间
  var params = {
    out_trade_no: `${date_str}-${user_id}-${product_id}`,
    product_id,
    body: product.body,
    attach: product.attach,
    total_fee: Math.ceil(product.price * 100), // 单位从'元'转成'分'
    spbill_create_ip: conf.host_ip,
    trade_type: 'NATIVE'
  }
  return params
}

async function handlePay (res) {
  let exists = db.get('orders').find(r => {
    return r.pay_res.out_trade_no === res.out_trade_no
  }).value()
  if (exists) return

  let record = {}
  record.pay_res = res

  let [date_str, user_id, product_id] = res.out_trade_no.spllit('-')
  _.assign(record, { date_str, user_id, product_id })

  if (res.result_code !== 'SUCCESS') {
    // noop
  } else {
    // todo: 需要预插入订单 并校验返回的订单金额是否一致
    // https://pay.weixin.qq.com/wiki/doc/api/native.php?chapter=9_7
    // if (res.total_fee) {}
  }
  db.get('orders').push(record).write()
}

async function getSession (ctx) {
  let { user } = ctx.session

  // todo: lowdb获取付费项目列表
  let paid = []

  return { user, paid }
}

async function handleLogin (data, ctx) {
  let user = _.pick(data, ['login', 'avatar_url'])
  ctx.session.user = user
}
