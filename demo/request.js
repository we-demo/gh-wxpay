// [0720] 手写web-xhr的轻量promise封装
// https://blog.fritx.me/?weekly/170730

function request (opts) {
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest()
    let url = opts.url
    let params = opts.query
    // We'll need to stringify if we've been given an object
    // If we have a string, this is skipped.
    if (params && typeof params === 'object') {
      params = Object.keys(params).map(key => {
        return encodeURIComponent(key) + '=' + encodeURIComponent(params[key])
      }).join('&')
    }
    if (params) url += '?' + params
    xhr.open(opts.method || 'GET', url)
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve(xhr.response)
      } else {
        reject({
          status: xhr.status,
          statusText: xhr.statusText
        })
      }
    }
    xhr.onerror = () => {
      reject({
        status: xhr.status,
        statusText: xhr.statusText
      })
    }
    if (opts.headers) {
      Object.keys(opts.headers).forEach(key => {
        xhr.setRequestHeader(key, opts.headers[key])
      })
    }
    xhr.send(opts.body || null)
  })
}
