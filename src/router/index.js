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
// 导入模块路由
import test from './test'
import nest from './nest'

/**
 * @description: 全局路由配置
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
          noLogin: true,
          icon: <HomeOutlined />,
        },
      },
      ...test, // test模块
      ...nest, // nest模块
    ]
  },
  {
    path: '*',
    component: () => import(/* webpackChunkName: "404" */ '@/views/errorPage/page404'),
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

  // 请求获取用户信息
  if (!meta.noLogin) {
    if (!userStore.isGotUserInfo) {
      api.getConsumer().then(res => {
        const data = res.data || {}
        userStore.setUserInfo(data)
      })
    }
  }
}

export {
  routes,
  onRouteBefore,
}
