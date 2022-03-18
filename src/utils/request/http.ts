/**
 * @Description: 通用接口请求封装
 * @Author: Neo
 * @Date: 2021-12-20
 * @LastEditTime: 2022-01-18
 * @LastEditors: Neo
 */
import { Method } from 'axios'
import request from './axios'

/**
  * 请求拦截 config配置项
  * @params {string} url 接口名
  * @params {object} data 传参数据
  * @params {string} method 可选，请求方式，默认
  * @params {boolean} codeList 可选，控制自行处理接口响应异常的code码列表，默认为空数组
  */
function http (method: Method, host: string, apiUrl: string, data: any, {
  codeList,
  headers,
  baseURL,
  withCredentials,
}: any = {}) {
  // 默认值
  method = method || 'get'
  codeList = codeList || []
  baseURL = baseURL || ''
  headers = headers || {
    'Content-Type': 'application/json; charset=utf-8',
  }
  withCredentials = withCredentials === undefined ? true : !!withCredentials

  // url
  let url = ''
  if (process.env.NODE_ENV === 'development') {
    // 本地开发
    url = apiUrl
  } else {
    // 生产服务器
    let origin = ''
    if (host.match(/^http/)) {
      origin = host
    } else {
      if (host.match(/^\/\//)) {
        host = host.slice(2)
      }
      origin = `${window.location.protocol}//${host}`
    }
    if (apiUrl.match(/\/proxy\//)) {
      apiUrl = ''
    }
    url = origin + apiUrl
  }

  // 返回promise
  return new Promise((resolve, reject) => {
    request({
      url,
      data,
      method,
      codeList,
      headers,
      baseURL,
      withCredentials,
    })
      .then(res => {
        resolve(res)
      })
      .catch(error => {
        reject(error)
      })
  })
}

export default http
