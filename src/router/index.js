/**
 * @Description: 路由统一配置
 * @Author: Neo
 * @Date: 2021-12-20
 * @LastEditTime: 2021-12-31
 * @LastEditors: Neo
 */
import store from '@/store'
import api from '@/api/index'
import PageLayout from '@/components/PageLayout'
import { HomeOutlined } from '@ant-design/icons' // meta.icon设置菜单图标，仅设置一级菜单即可
import { getIsCanAccess } from '@/utils/appTools'
// 导入模块路由
import test from './test'
import nest from './nest'

/**
 * @description: 全局路由配置
 * @param {string} title // 路由页面标题，以及侧边栏菜单中的标题
 * @param {element} icon // 侧边栏该路由菜单显示的图标
 * @param {string} accessId // 路由页面权限id
 * @param {boolean} noLogin // 路由页面是否需要登录访问
 * @param {boolean} hideMenu // 是否在侧边栏中隐藏该路由菜单
 */
const routes = [
  {
    path: '/',
    redirect: '/index',
  },
  {
    path: '/',
    element: <PageLayout />,
    children: [
      {
        path: 'index',
        component: () => import(/* webpackChunkName: "index" */ '@/views/index/index'),
        meta: {
          title: '首页',
          icon: <HomeOutlined />,
          accessId: '10000',
        },
      },
      ...test, // test模块
      ...nest, // nest模块
    ]
  },
  {
    path: '/403',
    component: () => import(/* webpackChunkName: "errorPage" */ '@/views/errorPage/page403'),
    meta: {
      title: '403',
      noLogin: true,
      hideMenu: true,
    },
  },
  {
    path: '*',
    component: () => import(/* webpackChunkName: "errorPage" */ '@/views/errorPage/page404'),
    meta: {
      title: '404',
      noLogin: true,
      hideMenu: true,
    },
  },
]

/**
 * @description: 全局路由拦截
 * @param {string} pathname 当前路由路径
 * @param {object} meta 当前路由自定义meta字段
 * @return {string} 需要跳转到其他页时就return一个该页的path路径
 */
const onRouteBefore = ({ pathname, meta }) => {
  const { userStore } = store

  // 动态修改页面title
  if (meta.title !== undefined) {
    document.title = meta.title
  }

  // 登录及权限判断
  if (!meta.noLogin) { // 路由是否需要登录
    if (userStore.isLogin) { // 用户是否已登录
      const { accessId } = meta
      const message = `${pathname}，${meta.title || ''}`
      const path403 = `/403?message=${encodeURIComponent(message)}`

      if (!userStore.isGotUserInfo) { // 是否已获取到用户（权限）信息
        return api.getConsumer().then(res => {
          const data = res.data || {}
          userStore.setUserInfo(data)
          if (!getIsCanAccess(accessId)) {
            return path403
          } else {
            return null
          }
        })
      } else {
        if (!getIsCanAccess(accessId)) {
          return path403
        }
      }
    } else {
      return `/login?redirectUrl=${pathname}`
    }
  }
}

export {
  routes,
  onRouteBefore,
}
