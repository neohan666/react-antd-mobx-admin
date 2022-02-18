/**
 * @Description: 路由工具函数
 * @Author: Neo
 * @Date: 2021-12-30
 * @LastEditTime: 2022-02-17
 * @LastEditors: Neo
 */
import React from 'react'
import { Navigate } from 'react-router-dom'
import Guard from './guard'

let handleRouteBefore = null

/**
 * @description: 设置路由导航守卫函数
 */
function setRouteBefore (fn) {
  handleRouteBefore = fn
}

/**
 * @description: 路由懒加载
 */
function lazyLoad (importFn, meta) {
  meta = meta || {}
  const Element = React.lazy(importFn)
  const lazyElement = (
    <React.Suspense fallback={<div></div>}>
      <Element _meta={meta}/>
    </React.Suspense>
  )
  return (
    <Guard
      element={lazyElement}
      meta={meta}
      handleRouteBefore={handleRouteBefore}
    />
  )
}

/**
 * @description: 路由配置列表数据转换
 */
function transformRoutes (routes) {
  const list = []
  routes.forEach(route => {
    const obj = { ...route }
    if (obj.redirect) {
      obj.element = <Navigate to={obj.redirect} replace={true}/>
    }
    if (obj.component) {
      obj.element = lazyLoad(obj.component, obj.meta)
    }
    delete obj.redirect
    delete obj.component
    delete obj.meta
    if (obj.children) {
      obj.children = transformRoutes(obj.children)
    }
    list.push(obj)
  })
  return list
}

export {
  setRouteBefore,
  transformRoutes,
}
