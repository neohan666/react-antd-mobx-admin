/**
 * @Description: store状态管理hook
 * @Author: Neo
 * @Date: 2021-12-21
 * @LastEditTime: 2022-01-06
 * @LastEditors: Neo
 */
import { useContext } from 'react'
import StoreContext from '@/contexts/storeContext'
import { observer } from 'mobx-react-lite'

function useStore () {
  const store = useContext(StoreContext)
  return store
}

export {
  observer, // 用于监听store数据的改变，同步到组件数据中
  useStore, // 用于获取store数据
}
