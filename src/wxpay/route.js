let { handlePay, handleOrder } = require('../custom')
let { createOrder } = require('./order')
let xmlJs = require('./xml-js')
let wxSign = require('./wxsign')
let KoaBody = require('koa-body')
let koaBody = KoaBody()
let _ = require('lodash')

module.exports = (router, conf) => {
  // 用户扫码 发起支付
  router.get('/wxpay/order', async ctx => {
    let params = await handleOrder(ctx, conf)
    let res = await createOrder(params, conf)
    // todo: 验证签名, return_code, result_code
    ctx.body = _.pick(res, ['code_url'])
  })

  // 支付结果 异步通知
  router.post('/wxpay/notify', koaBody, async ctx => {
    let data
    try {
      let xml = ctx.request.body
      let res = xmlJs.toJson(xml)

      let expected = wxSign(res, conf.mch_key)
      if (res.sign !== expected) {
        throw new Error('签名验证不通过 非法访问')
      }

      if (res.return_code !== 'SUCCESS') {
        throw new Error(`return_msg: ${res.return_msg}`)
      }

      await handlePay(res)
      data = {
        return_code: 'SUCCESS'
      }
    } catch (err) {
      data = {
        return_code: 'FAIL',
        return_msg: String(err)
      }
    }
    let xml = xmlJs.toXml('xml', data)
    ctx.body = xml
  })
}
