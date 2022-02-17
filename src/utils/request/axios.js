/**
 * @Description: 接口请求基础封装
 * @Author: Neo
 * @Date: 2021-12-20
 * @LastEditTime: 2022-01-18
 * @LastEditors: Neo
 */
import axios from 'axios'
import tools from '@/utils/tools'
import { message } from 'antd'
import store from '@/store'

// 创建axios实例
const service = axios.create()

// 定义额外配置
let configMore

const { userStore } = store

/**
   * 数据请求 配置项
   * @params {object} data 传参数据
   * @params {boolean} codeList 可选，控制自行处理接口响应异常的code码列表(resolve且不弹出toast)，默认为空数组
   * ......
   */
function request (config) {
  // 获取额外配置参数
  const { codeList } = config
  configMore = {
    codeList: codeList || []
  }
  return service(config)
}

// 请求拦截
service.interceptors.request.use(
  (config) => {
    // 全局统一参数
    const commonData = {
      ticket: userStore.ticket,
    }
    config.data = {
      ...commonData,
      ...config.data,
    }

    // 超时时间
    config.timeout = config.timeout || 60000
    // baseURL
    config.baseURL = config.baseURL || ''
    // 请求方法
    config.method = config.method?.toLowerCase() || 'get'
    // 请求头
    config.headers = config.headers || {}
    // 请求参数
    if (config.method === 'post') {
      // post请求
      config.data = config.data || {}
      const contentType = config.headers['Content-Type'] || ''
      if (contentType.includes('json')) {
        // json传参
        config.transformRequest = [(data) => data && JSON.stringify(tools.filterObject(data))]
      } else if (contentType.includes('urlencoded')) {
        // 表单传参
        config.transformRequest = [(data) => data && tools.objToUrlParams(data)]
      }
    } else if (config.method === 'get') {
      // get请求
      config.params = { ...config.params, ...config.data }
      config.paramsSerializer = (data) => data && tools.objToUrlParams(data)
    }
    // 跨域时是否允许携带cookie
    config.withCredentials = !!config.withCredentials

    return config
  },
  err => {
    Promise.reject(err)
  }
)

// 响应拦截
service.interceptors.response.use(
  response => {
    const res = response.data
    // 没有errorCode字段，直接返回数据
    if (res.errorCode === undefined) {
      return res
    }
    // 自行控制返回数据
    if (configMore.codeList && configMore.codeList.length > 0) {
      const myCodeList = configMore.codeList.map(v => (v + ''))
      if (myCodeList.includes(res.errorCode + '')) {
        return res
      }
    }
    // code为0，正常返回数据
    if (res.errorCode + '' === '0') {
      return res
    }
    // 登录失败，唤起登录页
    /* if ([].includes(+res.errorCode)) {

    } */
    // code不为0，不符合预期，toast提示
    message.warning('Err：' + (res.errorMessage || ''), 3000)
    // 抛出错误信息
    return Promise.reject(res)
  },
  err => {
    message.error('Error：' + err.message, 3000)
    return Promise.reject(err)
  }
)

export default request
