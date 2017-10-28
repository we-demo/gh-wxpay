let host_url = 'https://example.com/gx'
let host_ip = '120.11.11.111'

module.exports = {
  gh: {
    client_id: 'xxxxxxxxxxxxxxxxxxxx',
    client_secret: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    callback_url: `${host_url}/api/oauth/callback`
  },
  wx: {
    mps: [ // 公众号/小程序
      {
        oid: 'xxxxxxxxxxxxxxx', // 原始id
        appid: 'xxxxxxxxxxxxxxxxxx', // 开发者id
        secret: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx' // 秘钥
      }
    ],
    mch_id: 'xxxxxxxxxx', // 商户号
    mch_key: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', // 商户key
    notify_url: `${host_url}/api/wxpay/notify`, // 通知地址
    host_ip
  },
  app: {
    keys: ['xxxxxx']
  }
}
