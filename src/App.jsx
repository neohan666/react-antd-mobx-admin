/**
 * @Description: 全局入口组件
 * @Author: Neo
 * @Date: 2021-12-27
 * @LastEditTime: 2022-02-17
 * @LastEditors: Neo
 */
import { useRoutes } from 'react-router-dom'
import { routes, onRouteBefore } from '@/router'
import { transformRoutes, setRouteBefore } from '@/components/RouterGuard/fn'

import { useEffect } from 'react'
import { useStore } from '@/hooks/storeHook'

function App () {
  const store = useStore()

  useEffect(() => {
    // 打印服务器文件更新日期
    console.log('---update---', document.lastModified)

    // console.log('store', store)
  }, [])

  setRouteBefore(onRouteBefore)
  const elements = useRoutes(transformRoutes(routes))

  return elements
}

export default App
