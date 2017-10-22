let { handlePay } = require('../custom')
let { createOrder } = require('./order')
let xmlJs = require('./xml-js')
let wxSign = require('./wxsign')
let KoaBody = require('koa-body')
let koaBody = KoaBody()

module.exports = (router, conf) => {
  router.post('/wxpay/order', async ctx => {
    // todo: 根据product_id 下单
    var params = {
      body: '吮指原味鸡 * 1',
      attach: '{"部位":"三角"}',
      out_trade_no: 'kfc' + Date.now(),
      total_fee: 1,
      spbill_create_ip: conf.host_ip,
      product_id: 'test-kfc',
      trade_type: 'NATIVE'
    }
    let order = await createOrder(params, conf)
    ctx.body = order
  })
  
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
