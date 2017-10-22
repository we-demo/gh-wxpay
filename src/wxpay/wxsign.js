let crypto = require('crypto')

module.exports = wxSign

/**
 * 微信支付 微信支付接口 签名校验算法
 * @param {Object} params 收发数据
 * @param {String} key 商户key
 * @see https://pay.weixin.qq.com/wiki/doc/api/native.php?chapter=20_1
 */
function wxSign (params, key) {
  let stringA = Object.keys(params)
    .filter(k => {
      return k !== 'sign' &&
        params[k] !== '' && params[k] != null
    })
    .sort()
    .map(k => `${k}=${params[k]}`)
    .join('&')
  let stringSignTemp = `${stringA}&key=${key}`
  let sign = md5(stringSignTemp).toUpperCase()
  return sign
}

function md5 (str, type) {
  return crypto.createHash('md5').update(str).digest(type || 'hex')
}
