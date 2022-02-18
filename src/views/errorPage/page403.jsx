import './page403.less'
import { Button } from 'antd'
import { useNavigate } from 'react-router-dom'
import tools from '@/utils/tools'
import { useState, useEffect } from 'react'

function Page403 () {
  const navigate = useNavigate()

  const [message, setMessage] = useState('')

  useEffect(() => {
    const query = tools.getQueryObject()
    const msg = decodeURIComponent(query.message || '')
    setMessage(msg)
  }, [])

  function toPageHome () {
    navigate('/')
  }

  return (
    <div className="v-errorPage-page403">
      403，没有访问权限（{message}）
      <div className="btnWrap">
        <Button onClick={toPageHome}>回首页</Button>
      </div>
    </div>
  )
}

export default Page403
