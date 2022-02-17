/**
 * @Description: proxy本地代理配置
 * @Author: Neo
 * @Date: 2022-01-11
 * @LastEditTime: 2022-01-11
 * @LastEditors: Neo
 */
const { createProxyMiddleware } = require('http-proxy-middleware')

const proxyData = {
  '/proxy': {
    target: 'http://test.api.com/',
    changeOrigin: true,
    secure: false,
  },
}

module.exports = function setupProxy (app) {
  Object.keys(proxyData).forEach(key => {
    app.use(key, createProxyMiddleware(proxyData[key]))
  })
}
