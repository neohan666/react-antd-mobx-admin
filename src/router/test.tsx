/**
 * @Description: test模块路由
 * @Author: Neo
 * @Date: 2021-12-20
 * @LastEditTime: 2022-01-12
 * @LastEditors: Neo
 */
import { RoutesTypeNew } from '@/types/routes'
import { NumberOutlined } from '@ant-design/icons'

const test: RoutesTypeNew = [
  {
    path: 'test',
    component: () => import(/* webpackChunkName: "test" */ '@/views/test/index'),
    meta: {
      title: '测试页',
      icon: <NumberOutlined />,
      accessId: '10009',
    }
  },
]

export default test
