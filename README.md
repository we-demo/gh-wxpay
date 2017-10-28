# gh-wxpay

\[WIP\] 打造一个基于github登录与微信支付，但又不依赖于微信登录（由github登录替代）的创新型支付体系，简称gx。

要求：前端页面、node后端、注册一个github-oauth应用、一个开通微信支付的公众号及商户信息。

### 发起github登录

```js
location.href = 'https://example.com/gx/api/login'
  + `?from=${encodeURIComponent(location.href)}`
```

### 获取用户信息及已付费的项目列表

```js
let { error, user, paid } = await request({
  url: 'https://example.com/gx/api/session'
})
```

### 获取微信支付二维码并展示

```js
let { error, code_url } = await request({
  url: 'https://example.com/gx/api/order',
  query: {
    product_id,
    user_id,
    appid
  }
})
```

### 小程序发起微信支付

```js
let { openid } = await request({
  url: 'https://example.com/gx/api/wx/token',
  query: {
    code,
    appid
  }
})

let { error, prepay_id } = await request({
  url: 'https://example.com/gx/api/order',
  query: {
    trade_type: 'JSAPI',
    openid,
    product_id,
    user_id,
    appid
  }
})
```

### 配置信息

```js
// gx.conf.example.js
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
```

### 参考资料

- [API列表 - 微信支付平台](https://pay.weixin.qq.com/wiki/doc/api/native.php?chapter=9_1)
- [wx.requestPayment - 微信公众平台 | 小程序](https://mp.weixin.qq.com/debug/wxadoc/dev/api/api-pay.html#wxrequestpaymentobject)
- [网站应用微信登录开发指南 - 微信开放平台](https://open.weixin.qq.com/cgi-bin/showdocument?action=dir_list&t=resource/res_list&verify=1&id=open1419316505&token=&lang=zh_CN)
- ~~[微信网页授权 - 微信公众平台](https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421140842)~~
- [教程：教你如何用 React 实现 Github OAuth 验证](http://react-china.org/t/react-github-oauth/4986)
- [使用 GitHub OAuth 第三方验证登录](https://zhuanlan.zhihu.com/p/26754921)
- [Other Authentication Methods - Github](https://developer.github.com/v3/auth/)
