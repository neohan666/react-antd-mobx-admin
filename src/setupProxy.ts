/**
 * @Description: proxy本地代理配置
 * @Author: Neo
 * @Date: 2022-01-11
 * @LastEditTime: 2022-01-11
 * @LastEditors: Neo
 */
const { createProxyMiddleware } = require('http-proxy-middleware')

const proxyConfig = {
  '/proxy': {
    target: 'http://test.api.com/',
    changeOrigin: true,
    secure: false,
    pathRewrite: { '^/proxy': '' }
  },
}

module.exports = function setupProxy (app: any) {
  Object.keys(proxyConfig).forEach(key => {
    app.use(key, createProxyMiddleware({
      logLevel: 'warn',
      ...(proxyConfig as any)[key],
    }))
  })
}

export {}
