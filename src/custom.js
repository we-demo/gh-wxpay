let shortid = require('shortid')
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
  // let { to_topic, product_id } = ctx.query
  // if (!to_topic || !product_id) {
  //   return ctx.throw(400, '缺少参数')
  // }

  let product = db.get('products').find({ id: product_id }).value()
  if (!product) {
    return ctx.throw(400, '商品不存在')
  }

  let { trade_type, openid, appid } = ctx.query
  trade_type = trade_type || 'NATIVE'
  if (trade_type !== 'NATIVE' && !openid) {
    return ctx.throw(400, '缺少openid')
  }

  // todo 判断user是否已购买product

  let date_str = new Date().toJSON().replace(/[\-:]|T.*/g, '') // 注 世界标准时间
  var params = {
    // [ 模块store ] 微信支付，out_trade_no参数长度有误
    // https://community.apicloud.com/bbs/thread-87911-1-1.html
    out_trade_no: `${datestr}|${shortid()}`,
    product_id,
    body: product.body,
    attach: product.attach,
    total_fee: Math.ceil(product.price * 100), // 单位从'元'转成'分'
    spbill_create_ip: conf.host_ip,
    appid,
    openid,
    trade_type
  }
  if (product.attach) {
    params.attach = product.attach
  }
  console.log('handleOrder', params)
  return params
}

async function handlePay (res) {
  console.log('handlePay', res)
  let exists = db.get('orders').find(r => {
    return r.pay_res.out_trade_no === res.out_trade_no
  }).value()
  if (exists) return

  let record = {}
  record.pay_res = res

  // github账号允许`-` 但不允许`--` 选作订单号分隔符
  let [date_str, user_id, product_id] = res.out_trade_no.split('--')
  _.assign(record, { date_str, user_id, product_id })
  // let [date_str, to_topic, product_id] = res.out_trade_no.split('--')
  // _.assign(record, { date_str, to_topic, product_id })

  if (res.result_code !== 'SUCCESS') {
    // noop
  } else {
    // todo: 需要预插入订单 并校验返回的订单金额是否一致
    // https://pay.weixin.qq.com/wiki/doc/api/native.php?chapter=9_7
    // if (res.total_fee) {}
  }
  console.log('insert record', record)
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
