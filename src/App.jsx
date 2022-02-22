/**
 * @Description: 全局入口组件
 * @Author: Neo
 * @Date: 2021-12-27
 * @LastEditTime: 2022-02-17
 * @LastEditors: Neo
 */
import { routes, onRouteBefore } from '@/router'
import RouterGuard from '@/components/RouterGuard'
import { useStore } from '@/hooks/storeHook'

function App () {
  const store = useStore()

  console.log('---update---', document.lastModified)
  // console.log('store', store)

  return (
    <RouterGuard
      routes={routes}
      onRouteBefore={onRouteBefore}
    />
  )
}

export default App
