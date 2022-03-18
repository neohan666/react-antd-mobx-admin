import './page404.less'
import { Button } from 'antd'
import { useNavigate } from 'react-router-dom'

function Page404 () {
  const navigate = useNavigate()

  function toPageHome () {
    navigate('/')
  }

  return (
    <div className="v-errorPage-page404">
      404，路由地址错误
      <div className="btnWrap">
        <Button onClick={toPageHome}>回首页</Button>
      </div>
    </div>
  )
}

export default Page404
