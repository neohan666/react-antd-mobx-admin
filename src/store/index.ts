/**
 * @Description: 全局状态管理
 * @Author: Neo
 * @Date: 2021-12-21
 * @LastEditTime: 2021-12-27
 * @LastEditors: Neo
 */
import User from './modules/user'
import Common from './modules/common'

export default {
  userStore: new User(),
  commonStore: new Common(),
}
