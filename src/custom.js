let _ = require('lodash')

exports.handleOrder = handleOrder
exports.handlePay = handlePay
exports.getSession = getSession
exports.handleLogin = handleLogin

// todo: ratelimit ip安全限制等
async function handleOrder (ctx, conf) {
  let { user_id, product_id } = ctx.query
  if (!user_id || !product_id) {
    return ctx.throw(400, '缺少参数')
  }

   // todo: 根据product_id 下单
   let dateStr = new Date().toJSON().replace(/[\-:]|T.*/g, '')
   var params = {
    body: '吮指原味鸡 * 1',
    attach: '{"部位":"三角"}',
    out_trade_no: `${dateStr}-${user_id}-${product_id}`,
    total_fee: 1,
    spbill_create_ip: conf.host_ip,
    product_id: 'test-kfc',
    trade_type: 'NATIVE'
  }
  return params
}

async function handlePay (res) {
  // todo lowdb 写入支付结果数据
  res.out_trade_no
  res.total_fee
  res.open_id
  res.is_subscribe

  if (res.result_code !== 'SUCCESS') {

  } else {
    res.err_code
    res.err_code_des
  }
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
