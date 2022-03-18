import './page403.less'
import { Button } from 'antd'
import { useNavigate } from 'react-router-dom'
import tools from '@/utils/tools'

function Page403 () {
  const query = tools.getQueryObject()
  const message = decodeURIComponent(query.message || '')

  const navigate = useNavigate()

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
