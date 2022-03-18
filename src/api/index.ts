/**
 * @Description: 公共api接口集合
 * @Author: Neo
 * @Date: 2021-12-20
 * @LastEditTime: 2021-12-28
 * @LastEditors: Neo
 */
// import http from '@/utils/request/http'

const api = {
  // 获取用户信息
  // getUserInfo: (data) => http('get', '', '/proxy/getUserInfo', data),
  // 模拟从接口获取用户信息
  getUserInfo () {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('got userInfo')
        resolve({
          data: {
            userId: '666',
            nickName: 'Neo',
            accessIdList: ['10000', '10001', '10002']
          },
          errorCode: 0,
        })
      }, 200)
    })
  },
}

export default api
