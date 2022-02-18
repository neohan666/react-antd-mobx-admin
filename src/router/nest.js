/**
 * @Description: nest多级菜单测试路由
 * @Author: Neo
 * @Date: 2022-02-17
 * @LastEditTime: 2022-02-17
 * @LastEditors: Neo
 */
import { BarsOutlined } from '@ant-design/icons'

export default [
  {
    path: 'nest',
    meta: {
      title: '多级菜单',
      icon: <BarsOutlined />,
    },
    children: [
      {
        path: 'nest1',
        meta: {
          title: '二级菜单1',
        },
        children: [
          {
            path: 'nest11',
            component: () => import(/* webpackChunkName: "nest11" */ '@/views/nest/nest1/nest11/index'),
            meta: {
              title: '三级菜单11',
            },
          },
          {
            path: 'nest12',
            component: () => import(/* webpackChunkName: "nest12" */ '@/views/nest/nest1/nest12/index'),
            meta: {
              title: '三级菜单12',
            },
          },
        ]
      },
      {
        path: 'nest2',
        component: () => import(/* webpackChunkName: "nest2" */ '@/views/nest/nest2/index'),
        meta: {
          title: '二级菜单2',
        },
      }
    ]
  },
]
