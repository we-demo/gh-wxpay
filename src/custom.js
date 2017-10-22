let _ = require('lodash')

exports.handlePay = handlePay
exports.getSession = getSession
exports.handleLogin = handleLogin

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
