let host_url = 'https://example.com/gx'
let host_ip = '120.11.11.111'

module.exports = {
  gh: {
    client_id: 'xxxxxxxxxxxxxxxxxxxx',
    client_secret: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    callback_url: `${host_url}/ghauth/callback`
  },
  wx: {
    ghid: 'xxxxxxxxxxxxxxx', // 公众号原始ID
    appid: 'xxxxxxxxxxxxxxxxxx', // 公众号开发者ID
    mch_id: 'xxxxxxxxxx', // 商户号
    mch_key: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', // 商户key
    notify_url: `${host_url}/wxpay/notify`, // 通知地址
    host_ip
  },
  app: {
    keys: ['xxxxxx']
  }
}
