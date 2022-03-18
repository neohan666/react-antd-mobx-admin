/**
 * @Description: 用户模块
 * @Author: Neo
 * @Date: 2021-12-21
 * @LastEditTime: 2021-12-27
 * @LastEditors: Neo
 */
import { makeAutoObservable } from 'mobx'

interface UserInfoType {
  [propName: string]: any;
}

export default class User {
  ticket = ''
  userInfo: UserInfoType = {}

  constructor () {
    /**
     * state
     */
    this.ticket = window.localStorage.getItem('ticket') || '' // 登录ticket
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
  setTicket (val: string) {
    this.ticket = val || ''
    window.localStorage.setItem('ticket', this.ticket)
  }

  async setUserInfo (userInfo: UserInfoType) {
    this.userInfo = userInfo || {}
  }
}
