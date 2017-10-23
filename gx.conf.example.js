let host_url = 'https://example.com/gx'
let host_ip = '120.11.11.111'

module.exports = {
  gh: {
    client_id: 'xxxxxxxxxxxxxxxxxxxx',
    client_secret: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    callback_url: `${host_url}/api/ghauth/callback`
  },
  wx: {
    appid: 'xxxxxxxxxxxxxxxxxx', // 公众号开发者ID
    mch_id: 'xxxxxxxxxx', // 商户号
    mch_key: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', // 商户key
    notify_url: `${host_url}/api/wxpay/notify`, // 通知地址
    host_ip
  },
  app: {
    keys: ['xxxxxx']
  }
}
