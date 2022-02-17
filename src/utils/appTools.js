/**
 * @Desc: 业务相关公共函数
 * （函数请添加详细注释）
 */
import { routes } from '@/router'

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
 * 获取路由路径和路由名称的映射数据
 */
function getRouteTitleMap () {
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
          [currentPath]: v.meta.title || ''
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

export {
  getH5Env, // 获取h5域名环境
  getRouteTitleMap, // 获取路由名称数据
}
