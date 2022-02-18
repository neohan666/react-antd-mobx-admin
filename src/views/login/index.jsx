/*
 * @Description: 登录页
 * @Author: Neo
 * @Date: 2022-02-18
 * @LastEditTime: 2022-02-18
 * @LastEditors: Neo
 */
import './index.less'
import { Button } from 'antd'
import { useStore } from '@/hooks/storeHook'
import { useNavigate } from 'react-router-dom'
import tools from '@/utils/tools'

function Index () {
  const navigate = useNavigate()

  const { userStore } = useStore()

  const query = tools.getQueryObject()
  const redirectUrl = decodeURIComponent(query.redirectUrl || '')

  function onLogin () {
    setTimeout(() => {
      const ticket = 'token123'
      userStore.setTicket(ticket)

      if (redirectUrl) {
        const divideStr = process.env.PUBLIC_URL + '/'
        const divideStart = redirectUrl.indexOf(divideStr)
        const path = redirectUrl.slice(divideStart + divideStr.length - 1)
        navigate(path)
      } else {
        navigate('/index')
      }
    }, 200)
  }

  return (
    <div className="v-login-index">
      <Button onClick={onLogin}>登录</Button>
    </div>
  )
}

export default Index
