/**
 * @Description: 入口文件index.js的一些函数集合
 * @Author: Neo
 * @Date: 2022-02-10
 * @LastEditTime: 2022-02-10
 * @LastEditors: Neo
 */

/**
 * @description: 本地开发禁用referer（规避图片防盗链）
 */
function setNoReferer () {
  if (process.env.NODE_ENV !== 'development') {
    return
  }
  const headEle = document.querySelector('head')
  const metaEle = document.createElement('meta')
  metaEle.name = 'referrer'
  metaEle.content = 'no-referrer'
  headEle && headEle.appendChild(metaEle)
}

export default {
  setNoReferer,
}
