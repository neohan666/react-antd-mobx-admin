import './index.less'
import { useNavigate } from 'react-router-dom'
import { Button } from 'antd'
import tools from '@/utils/tools'

function Index () {
  const navigate = useNavigate()

  const query = tools.getQueryObject()
  console.log(query)

  function toPage () {
    navigate('/index')
  }

  return (
    <div className="v-test-index">
      <div className="content">
        <div>
          <Button color='primary' onClick={toPage}>去首页</Button>
        </div>
      </div>
    </div>
  )
}

export default Index
