/**
 * @Description: 路由容器组件
 * @Author: Neo
 * @Date: 2021-12-30
 * @LastEditTime: 2022-01-06
 * @LastEditors: Neo
 */
import { Navigate, useLocation } from 'react-router-dom'

let temp = null

function Guard ({ element, meta, handleRouteBefore }) {
  const location = useLocation()
  const { pathname } = location
  meta = meta || {}

  if (handleRouteBefore) {
    if (temp === element) {
      return element
    }
    const newPath = handleRouteBefore({ pathname, meta })
    if (newPath && newPath !== pathname) {
      element = <Navigate to={newPath} />
    }
  }

  temp = element
  return element
}

export default Guard
