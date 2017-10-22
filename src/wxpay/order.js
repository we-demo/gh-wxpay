let xmlJs = require('./xml-js')
let wxSign = require('./wxsign')
let fetch = require('node-fetch')
let baseUrl = 'https://api.mch.weixin.qq.com/pay'

exports.createOrder = createOrder

/**
 * 统一下单
 * @param {Object} data
 *   @param {String} trade_type *交易类型
 *   @param {String} spbill_create_ip *终端IP APP和网页支付提交用户端ip，Native支付填调用微信支付API的机器IP
 *   @param {String} out_trade_no *商户订单号
 *   @param {Integer} total_fee *标价金额 单位为分
 *   @param {String} body *商品描述
 *   @param {String} detail 商品详情
 *   @param {String} attach 附加数据
 *   @param {String} device_info 设备号 PC网页或公众号内支付可以传"WEB"
 *   @param {String} product_id 商品ID trade_type=NATIVE时（即扫码支付），此参数必传
 *   @param {String} openid 用户标识 trade_type=JSAPI时（即公众号支付），此参数必传
 * @return {Object} trade_type, prepay_id, code_url 有效期为2小时
 * @see https://pay.weixin.qq.com/wiki/doc/api/native.php?chapter=9_1
 */
async function createOrder (data, conf) {
  let params = {}
  Object.assign(params, {
    appid: conf.appid,
    mch_id: conf.mch_id,
    notify_url: conf.notify_url,
    nonce_str: `${Math.random()}`.substr(2, 32)
  }, data)

  let sign = wxSign(params, conf.mch_key)
  params.sign = sign

  let xml = xmlJs.toXml('xml', params)
  console.log('xml', xml)
  let res = await fetch(`${baseUrl}/unifiedorder`, {
    method: 'POST',
    body: xml
  })
  res = await res.text()
  console.log('res', res)
  res = xmlJs.toJs(res).xml
  if (res) {
    // todo throw
  }
  return res
}
