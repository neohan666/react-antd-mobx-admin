/**
 * @Description: 用户模块
 * @Author: Neo
 * @Date: 2021-12-21
 * @LastEditTime: 2021-12-27
 * @LastEditors: Neo
 */
import { makeAutoObservable } from 'mobx'
import jsCookie from 'js-cookie'

export default class User {
  constructor () {
    /**
     * state
     */
    this.ticket = 'token123' // 登录ticket
    this.userInfo = {} // 用户信息

    makeAutoObservable(this)
  }

  /**
   * computed
   */
  // 是否已登录
  get isLogin () {
    return !!this.ticket
  }

  // 是否已获取到userInfo
  get isGotUserInfo () {
    return this.userInfo.userId !== undefined
  }

  // userId
  get userId () {
    return this.userInfo.userId
  }

  // 用户所有权限id数组
  get accessIdList () {
    return this.userInfo.accessIdList || []
  }

  /**
   * action
   */
  setTicket (val) {
    this.ticket = val || ''
  }

  async setUserInfo (userInfo) {
    this.userInfo = userInfo || {}
  }
}
