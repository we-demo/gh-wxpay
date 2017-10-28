let { handlePay, handleOrder } = require('../custom')
let { createOrder } = require('./order')
let xmlJs = require('./xml-js')
let wxSign = require('./wxsign')
let FormData = require('form-data')
let fetch = require('node-fetch')
let raw = require('raw-body')
let _ = require('lodash')

module.exports = (router, conf) => {
  // 微信oauth/小程序 code换取openid
  router.get('/wx/token', async ctx => {
    let { code, appid } = ctx.query
    if (!code || !appid) {
      return ctx.throw(400, '缺少参数')
    }

    let mp = _.find(conf.mps, { appid })
    if (!mp) {
      return ctx.throw(400, 'mp不存在')
    }

    let form = new FormData()
    form.append('grant_type', 'authorization_code')
    form.append('code', code)
    form.append('appid', mp.appid)
    form.append('secret', mp.secret)

    let url = 'https://api.weixin.qq.com/sns/oauth2/access_token'
    let res = await fetch(url, {
      method: 'POST',
      body: form
    })
    res = await res.json()
    ctx.body = _.pick(res, ['openid', 'scope'])
  })

  // 用户扫码 发起支付
  router.get('/order', async ctx => {
    let params = await handleOrder(ctx, conf)
    let res = await createOrder(params, conf)
    // todo: 验证签名, return_code, result_code
    ctx.body = _.pick(res, ['prepay_id', 'code_url'])
  })

  // 支付结果 异步通知
  // res.text: https://github.com/dlau/koa-body/blob/master/test/index.js
  router.post('/wxpay/notify', async ctx => {
    let data
    try {
      // https://github.com/creeperyang/koa-xml-body/blob/master/lib/xml-parser.js
      const length = ctx.get('content-length')
      let xmlBuf = await raw(ctx.req, { length })
      let xml = xmlBuf.toString()
      let res = xmlJs.toJs(xml).xml
      console.log('xml res', res)

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
