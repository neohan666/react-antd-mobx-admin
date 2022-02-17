/**
 * @Description: 常规
 * @Author: Neo
 * @Date: 2022-02-15
 * @LastEditTime: 2022-02-15
 * @LastEditors: Neo
 */
import { makeAutoObservable } from 'mobx'

export default class Common {
  constructor () {
    /**
      * state
      */
    this.sideBarCollapsed = !!+window.localStorage.getItem('sideBarCollapsed') || false // 侧边栏是否收起

    makeAutoObservable(this)
  }

  /**
    * computed
    */

  /**
    * action
    */
  setSideBarCollapsed (val) {
    this.sideBarCollapsed = !!val
    window.localStorage.setItem('sideBarCollapsed', +this.sideBarCollapsed)
  }
}
