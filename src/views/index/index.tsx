/**
 * @Description: 首页
 * @Author: Neo
 * @Date: 2021-12-20
 * @LastEditTime: 2022-01-19
 * @LastEditors: Neo
 */
import './index.less'
import { observer, useStore } from '@/hooks/storeHook'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, DatePicker } from 'antd'
import tools from '@/utils/tools'

function Index (props: any) {
  const navigate = useNavigate()

  const { userStore } = useStore()

  useEffect(() => {
    console.log('index props', props)
    initData()
  }, [])

  async function initData () {
    // get index data from api
  }

  function toPage () {
    const query = tools.objToUrlParams({ id: '123' })
    navigate(`/test?${query}`)
  }

  return (
    <div className="v-index-index">
      <div className='wrap'>
        <Button onClick={toPage}>去测试页</Button>
      </div>
      <div className='wrap'>
        <DatePicker />
      </div>
      <div className='wrap'>
        {userStore.ticket}
      </div>
    </div>
  )
}

export default observer(Index)
