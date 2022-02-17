/**
 * @Description: test模块路由
 * @Author: Neo
 * @Date: 2021-12-20
 * @LastEditTime: 2022-01-12
 * @LastEditors: Neo
 */
import {
  NumberOutlined,
} from '@ant-design/icons'

export default [
  {
    path: 'test',
    component: () => import(/* webpackChunkName: "test" */ '@/views/test/index'),
    meta: {
      title: '测试页',
      noLogin: true,
      icon: <NumberOutlined />,
    }
  },
]
