let { handlePay, handleOrder } = require('../custom')
let { createOrder } = require('./order')
let xmlJs = require('./xml-js')
let wxSign = require('./wxsign')
let KoaBody = require('koa-body')
let _ = require('lodash')

module.exports = (router, conf) => {
  // 用户扫码 发起支付
  router.get('/order', async ctx => {
    let params = await handleOrder(ctx, conf)
    let res = await createOrder(params, conf)
    // todo: 验证签名, return_code, result_code
    ctx.body = _.pick(res, ['code_url'])
  })

  // 支付结果 异步通知
  // res.text: https://github.com/dlau/koa-body/blob/master/test/index.js
  router.post('/wxpay/notify', KoaBody({ multipart: true }), async ctx => {
    let data
    try {
      let xml = ctx.request.text
      let res = xmlJs.toJs(xml)

      let expected = wxSign(res, conf.mch_key)
      if (res.sign !== expected) {
        let err = new Error('签名验证不通过 非法访问')
        err.code = 'WXERR_INVALID_SIGN'
        err.status = 400
        throw err
      }
      if (res.return_code !== 'SUCCESS') {
        let err = new Error(`return_msg: ${res.return_msg}`)
        err.code = `WXERR_RETURN_CODE_${res.return_code}`
        throw err
      }

      res = _.omit(res, ['nonce_str', 'sign', 'sign_type'])
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
