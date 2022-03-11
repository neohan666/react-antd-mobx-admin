/**
 * @Desc: 业务相关公共函数
 * （函数请添加详细注释）
 */
import { routes } from '@/router'
import store from '@/store'

/**
 * 获取h5域名环境
 */
function getH5Env (url = '') {
  const origin = url || window.location.origin
  let env = ''
  if (origin.match(/\/\/(prod)/)) {
    env = 'prod'
  } else if (origin.match(/\/\/(test)/)) {
    env = 'test'
  } else {
    env = 'dev'
  }
  return env
}

/**
 * 获取路由路径和路由meta字段的映射数据
 */
function getRouteMetaMap () {
  const getMap = (routeList = [], prePath = '') => {
    let map = {}
    routeList.forEach(v => {
      v.meta = v.meta || {}
      if (v.redirect || v.path === '*') {
        return
      }
      let currentPath = prePath + v.path
      if (v.path === '/') {
        currentPath = ''
      } else {
        map = {
          ...map,
          [currentPath]: v.meta || {}
        }
      }
      if (v.children) {
        map = {
          ...map,
          ...getMap(v.children, currentPath + '/')
        }
      }
    })
    return map
  }
  return getMap(routes)
}

/**
 * @description: 获取是否具有权限
 * @param {object} meta 路由配置中自定义meta数据
 * @param {string} message 跳转403无权限页面的额外说明
 * @return {boolean}
 */
function getIsCanAccess (accessId) {
  if (!accessId) {
    return true
  }
  const { userStore } = store
  const { accessIdList } = userStore
  if (!accessIdList.includes(accessId)) {
    return false
  } else {
    return true
  }
}

/**
 * @description: 根据url解析出路由path路径
 * @param {string} url 默认取当前页面地址
 * @param {boolean} isIncludeParams 是否需要包含路由参数，便于路由跳转携带数据
 * @return {string}
 */
function getRoutePath (url, isIncludeParams) {
  url = url || window.location.href
  const divideStr = process.env.PUBLIC_URL + '/'
  const reg = new RegExp(`//[\\w-\\.:]+${divideStr}(.*)*`)
  const match = url.match(reg) || []
  const pathWithParams = '/' + (match[1] || '')
  if (!isIncludeParams) {
    return pathWithParams
  } else {
    const path = pathWithParams.split('?')[0]
    return path
  }
}

export {
  getH5Env, // 获取h5域名环境
  getRouteMetaMap, // 获取路由路径和路由名称的映射数据
  getIsCanAccess, // 获取是否具有权限
  getRoutePath, // 根据url解析出路由path路径
}
