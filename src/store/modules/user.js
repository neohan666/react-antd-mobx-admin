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
    this.ticket = '' // 登录ticket
    this.userInfo = {} // 用户信息

    makeAutoObservable(this)
  }

  /**
   * computed
   */
  // 是否已登录
  get isLogin () {
    return !!(this.ticket || jsCookie.get('JESSIONID'))
  }

  // 是否已获取到userInfo
  get isGotUserInfo () {
    return this.userInfo.consumerId !== undefined
  }

  // consumerId
  get consumerId () {
    return this.userInfo.consumerId
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
