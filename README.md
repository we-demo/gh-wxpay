# gh-wxpay

\[WIP\] 打造一个基于github登录与微信支付，但又不依赖于微信登录（由github登录替代）的创新型支付体系，简称gx。

要求：前端页面、node后端、注册一个github-oauth应用、一个开通微信支付的公众号及商户信息。

### 发起Github登录

```js
location.href = 'https://example.com/ghauth/invoke'
  + `?from=${encodeURIComponent(location.href)}`
```

### 获取用户信息及已付费的项目列表

```js
let res = await fetch('https://example.com/ghauth/session')
let { user, paid } = await res.json()
```

### Server启动

```plain
PORT=8333 npm run dev
```

### 配置信息

```js
// config.example.js => config.js
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
```

### 参考资料

- [API列表 - 微信支付](https://pay.weixin.qq.com/wiki/doc/api/native.php?chapter=9_1)
- [教程：教你如何用 React 实现 Github OAuth 验证](http://react-china.org/t/react-github-oauth/4986)
- [使用 GitHub OAuth 第三方验证登录](https://zhuanlan.zhihu.com/p/26754921)
- [Other Authentication Methods - Github](https://developer.github.com/v3/auth/)
